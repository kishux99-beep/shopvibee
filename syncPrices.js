import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

// 1. Fast Amazon Price Extractor (Puppeteer Headless)
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
      return { array: eval(match[1]), fullContent: content, matchText: match[0] };
    } catch (e) {
      console.error(`Failed to parse ${arrayName}:`, e.message);
    }
  }
  return null;
}

// 3. Single Section Processor
async function processSection(page, filePath, arrayName, typeAnnotation, sectionTitle) {
  const fullPath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️ Skipped: ${filePath} not found.`);
    return;
  }

  const fileData = extractArrayFromTs(fullPath, arrayName);
  if (!fileData) {
    console.log(`⚠️ Skipped: Could not read ${arrayName} from ${filePath}`);
    return;
  }

  console.log(`\n📂 Checking ${fileData.array.length} ${sectionTitle} from ${filePath}...`);
  let updatedCount = 0;

  for (let deal of fileData.array) {
    if (deal.link && deal.link.includes('amazon')) {
      const shortTitle = deal.title ? deal.title.substring(0, 30) : `Item ID ${deal.id}`;
      process.stdout.write(`Checking: ${shortTitle}... `);
      
      const live = await fetchLiveAmazonPrice(page, deal.link);

      if (live && live.price) {
        if (live.price !== deal.price) {
          console.log(`\n⚡ Price Changed: ${deal.price} ➜ ${live.price} (${live.discount})`);
          deal.price = live.price;
          if (live.originalPrice) deal.originalPrice = live.originalPrice;
          if (live.discount) deal.discount = live.discount;
          updatedCount++;
        } else {
          console.log(`✓ Up-to-date (${deal.price})`);
        }
      } else {
        console.log(`⚠️ (Could not fetch live)`);
      }
    }
  }

  // Save changes back to ts file
  const newCode = `export const ${arrayName}: ${typeAnnotation} = ${JSON.stringify(fileData.array, null, 2)};`;
  const updatedFileContent = fileData.fullContent.replace(fileData.matchText, newCode);
  fs.writeFileSync(fullPath, updatedFileContent, 'utf-8');

  console.log(`✅ Finished ${sectionTitle}: ${updatedCount} items updated.`);
}

// 4. Master Runner
async function syncAllPrices() {
  console.log('🔄 Starting Live Multi-Section Amazon Price Synchronization...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  // 1. Main Deals Section
  await processSection(page, 'data/deals.ts', 'initialDeals', 'Deal[]', 'Main Deals');

  // 2. Flash Deals Section
  await processSection(page, 'data/flashDeals.ts', 'flashDealsData', 'FlashDeal[]', 'Flash Deals');

  // 3. Top Deals Carousel Section
  await processSection(page, 'data/topDeals.ts', 'topDealsData', 'TopDeal[]', "Today's Top Deals");

  await browser.close();
  console.log('\n🎉 Complete Multi-Section Price Synchronization Finished Successfully!');
}

syncAllPrices();