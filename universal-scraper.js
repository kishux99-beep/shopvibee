import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });

// 🧠 Gemini AI Universal Parser & Vibee Guidance Generator
async function parseWithAI(rawPageData, category, dealId, productUrl) {
    try {
        const domain = new URL(productUrl).hostname.replace('www.', '').split('.')[0];
        const storeName = domain.charAt(0).toUpperCase() + domain.slice(1);

        const prompt = `
Aap ShopVibee.in ke Senior Product Data & Buying Expert hain.
Neeche di gayi raw e-commerce webpage information ko analyze karein aur structured product details ke sath high-value buying guide generate karein.

Webpage URL: ${productUrl}
Store Name: ${storeName}
Category: ${category}

Raw Webpage Text:
${rawPageData.cleanText.substring(0, 5000)}

Extracted Product Images:
${JSON.stringify(rawPageData.candidateImages.slice(0, 8))}

KAAM (Tasks):
1. Page ke text se exact Product Title, Current Selling Price (with ₹), Original MRP (with ₹), aur Discount % nikalo.
2. Sabse clear aur high-resolution main image select karo.
3. Top 4-6 product features/specifications nikalo.
4. "vibeeGuidance" (Rich Buying Guide Hinglish mein) generate karo.

STRICT JSON OUTPUT FORMAT (Koi markdown ya extra text mat dena, sirf valid JSON):
{
  "id": ${dealId},
  "title": "Exact clean product title",
  "category": "${category}",
  "price": "₹...",
  "originalPrice": "₹...",
  "discount": "...% off",
  "image": "Sabse best single image URL",
  "images": ["image1", "image2", "image3"],
  "store": "${storeName}",
  "link": "${productUrl}",
  "expiresIn": "",
  "description": "Short clean 2-line summary of product specifications",
  "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  "vibeeGuidance": {
    "whyBuy": "2-3 detailed lines on why to buy at this price.",
    "deepReview": "1 detailed paragraph (4-5 lines) analyzing build, quality, performance.",
    "expertTips": "Practical styling, usage, ya sizing/dosage tip.",
    "verdict": "1-line sharp buying recommendation.",
    "bestFor": "Specific target users"
  }
}`;

        const interaction = await ai.interactions.create({
            model: "gemini-3.6-flash",
            input: prompt,
        });

        const rawText = interaction.output_text.trim();
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);

        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        } else {
            throw new Error("AI JSON Parse Failed");
        }
    } catch (err) {
        console.error("⚠️ AI Parsing Error:", err.message);
        return null;
    }
}

// 🌐 Puppeteer Universal Page Fetcher
async function scrapeAnyProduct(productUrl, category, dealId) {
    const browser = await puppeteer.launch({
        headless: "new",
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-blink-features=AutomationControlled'
        ]
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

    console.log(`\nFetching page data from: ${productUrl}...`);
    await page.goto(productUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    try {
        // Dynamic images aur pricing load karne ke liye smooth scroll
        await page.evaluate(() => window.scrollBy(0, 500));
        await new Promise(r => setTimeout(r, 2000));

        // Page ka raw context extract karna
        const rawPageData = await page.evaluate(() => {
            // Unwanted elements hatana
            const unwanted = document.querySelectorAll('script, style, noscript, svg, nav, footer, header');
            unwanted.forEach(el => el.remove());

            // Clean text nikalna
            const bodyText = document.body.innerText || '';
            const cleanText = bodyText.replace(/\n\s*\n/g, '\n').trim();

            // Product images dhoondna
            const imgs = [];
            document.querySelectorAll('img').forEach(img => {
                const src = img.getAttribute('src') || img.getAttribute('data-src') || '';
                const width = img.naturalWidth || img.width || 0;
                const height = img.naturalHeight || img.height || 0;

                // Icons, logos aur choti images ko filter out karna
                if (src.startsWith('http') && !src.includes('logo') && !src.includes('icon') && !src.includes('sprite')) {
                    if ((width === 0 || width > 200) && (height === 0 || height > 200)) {
                        if (!imgs.includes(src)) imgs.push(src);
                    }
                }
            });

            return {
                cleanText,
                candidateImages: imgs
            };
        });

        await browser.close();

        console.log("Analyzing page with Gemini AI & Generating ShopVibee JSON...");
        const result = await parseWithAI(rawPageData, category, dealId, productUrl);
        return result;

    } catch (error) {
        console.error("Error loading page:", error);
        await browser.close();
        return null;
    }
}

// 🎯 Configuration (Yahan koi bhi Myntra, Wellcore, MuscleBlaze, Ajio ka link daalein)
const TARGET_URL = "https://store.wellversed.in/collections/wellcore/products/wellcore-micronised-creatine-monohydrate-for-women-134-5g-33-servings-cranberry-crush?utm_source=google&utm_medium=cpc&utm_campaign=24209587086&utm_term=wellcore+female+creatine&campaign_id=24209587086&adgroup_id=202934369267&assetgroup=&network=g&matchtype=p&creative=823343527320&campaigntype=&gad_source=1&gad_campaignid=24209587086&gbraid=0AAAAACbglEZxKzhQ_dnMV06V6_PZYFByS&gclid=CjwKCAjwoOjVBhArEiwAUwDak5H3SUjp4p6JzqjgqHocXilu-AP9OI-ETOpq6MGS0jRLSoCfvgQ5lRoCXuUQAvD_BwE&pclid=JTdCJTIycmVmZXJyZXIlMjIlM0ElMjJodHRwcyUzQSUyRiUyRnd3dy5nb29nbGUuY29tJTJGJTIyJTdE";
const CATEGORY = "Fashion";
const NEXT_ID = 20;

async function run() {
    const data = await scrapeAnyProduct(TARGET_URL, CATEGORY, NEXT_ID);
    if (data) {
        console.log("\n--- COPY & PASTE THIS IN YOUR DATABASE OR ARRAY ---\n");
        console.log(JSON.stringify(data, null, 2) + ",");
    }
}

run();