import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

// 1. Fast Amazon Price Extractor
async function fetchLiveAmazonPrice(page, url) {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 35000 });

    const data = await page.evaluate(() => {
      let price = document.querySelector('.a-price .a-offscreen')?.innerText.trim() || '';
      let originalPrice = document.querySelector('.basisPrice .a-offscreen, .a-text-price .a-offscreen')?.innerText.trim() || '';

      if (!price) {
        price = document.querySelector('.a-price-whole')?.innerText.trim() || '';
        if (price && !price.includes('₹')) price = '₹' + price;
      }

      if (!originalPrice) originalPrice = price;

      let discount = '';
      const numPrice = parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
      const numOriginal = parseFloat(originalPrice.replace(/[^0-9.]/g, '')) || numPrice;

      if (numOriginal > numPrice && numOriginal > 0) {
        discount = `${Math.round(((numOriginal - numPrice) / numOriginal) * 100)}% OFF`;
      }

      return { price, originalPrice, discount };
    });

    return data.price ? data : null;
  } catch (err) {
    return null;
  }
}

// 2. Helper to Parse and Update TypeScript Data Files
function extractArrayFromTs(filePath, arrayName) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const regex = new RegExp(`export const ${arrayName}\\s*(?::\\s*[^=]+)?\\s*=\\s*(\\[[\\s\\S]*?\\]);`, 'm');
  const match = content.match(regex);
  if (match) {
    try {
      // Evaluate array safely
      return { array: eval(match[1]), fullContent: content, matchText: match[0] };
    } catch (e) {
      console.error(`Failed to parse ${arrayName}:`, e.message);
    }
  }
  return null;
}

// 3. Master Runner
async function syncAllPrices() {
  console.log('🔄 Starting Live Amazon Price Synchronization...\n');

  const dealsPath = path.join(process.cwd(), 'data', 'deals.ts');
  const flashPath = path.join(process.cwd(), 'data', 'flashDeals.ts');

  if (!fs.existsSync(dealsPath)) {
    console.error('❌ Error: data/deals.ts not found!');
    return;
  }

  const dealsData = extractArrayFromTs(dealsPath, 'initialDeals');
  if (!dealsData) {
    console.error('❌ Could not read initialDeals from data/deals.ts');
    return;
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  console.log(`Checking ${dealsData.array.length} Main Deals from deals.ts...`);
  let updatedCount = 0;

  for (let deal of dealsData.array) {
    if (deal.link && deal.link.includes('amazon')) {
      process.stdout.write(`Checking: ${deal.title.substring(0, 30)}... `);
      const live = await fetchLiveAmazonPrice(page, deal.link);
      
      if (live && live.price) {
        if (live.price !== deal.price) {
          console.log(`\n⚡ Price Changed: ${deal.price} ➜ ${live.price} (${live.discount})`);
          deal.price = live.price;
          deal.originalPrice = live.originalPrice;
          deal.discount = live.discount;
          updatedCount++;
        } else {
          console.log(`✓ Up-to-date (${deal.price})`);
        }
      } else {
        console.log(`⚠️ (Could not fetch live)`);
      }
    }
  }

  await browser.close();

  // Save changes back to deals.ts
  const newDealsCode = `export const initialDeals: Deal[] = ${JSON.stringify(dealsData.array, null, 2)};`;
  const updatedFileContent = dealsData.fullContent.replace(dealsData.matchText, newDealsCode);
  fs.writeFileSync(dealsPath, updatedFileContent, 'utf-8');

  console.log(`\n✅ Done! Updated ${updatedCount} product prices in data/deals.ts.`);
}

syncAllPrices();