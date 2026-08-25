import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const AFFILIATE_TAG = 'Kishuxfit-21';
const apiKey = process.env.GEMINI_API_KEY;

// Initialize Google GenAI SDK
const ai = new GoogleGenAI({ apiKey: apiKey });

// Helper: Scrape Individual Product from Amazon
async function scrapeProductPiece(browser, url, categoryName, pieceId) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    console.log(`Scraping [${categoryName}] ...`);
    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        const pieceData = await page.evaluate((categoryName, pieceId, tag) => {
            const getText = (selector) => document.querySelector(selector)?.innerText.trim() || '';

            // Extract HD Image
            const imgEl = document.querySelector('#landingImage') || document.querySelector('#imgBlkFront') || document.querySelector('#altImages img');
            let rawImg = imgEl?.getAttribute('data-old-hires') || imgEl?.getAttribute('src') || '';
            let image = rawImg ? rawImg.replace(/\._[A-Z0-9_,-]+_\./g, '._AC_SL1500_.') : 'https://via.placeholder.com/500';

            // Extract Brand
            let brand = getText('#bylineInfo') || getText('.po-brand .a-span9') || 'PREMIUM BRAND';
            brand = brand.replace(/^(Brand:|Visit the store|Visit the)/i, '').trim();

            const fullTitle = getText('#productTitle');
            const shortName = fullTitle ? fullTitle.split(',')[0].substring(0, 35).trim() : categoryName;

            // Extract Prices
            let price = document.querySelector('.a-price .a-offscreen')?.innerText.trim() || '';
            let originalPrice = document.querySelector('.basisPrice .a-offscreen, .a-text-price .a-offscreen')?.innerText.trim() || '';

            if (!price) {
                price = document.querySelector('.a-price-whole')?.innerText.trim() || '₹0';
                if (price && !price.includes('₹')) price = '₹' + price;
            }
            if (!originalPrice) {
                originalPrice = price;
            }

            // Calculate Discount
            let discount = '0% OFF';
            const numPrice = parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
            const numOriginal = parseFloat(originalPrice.replace(/[^0-9.]/g, '')) || numPrice;
            if (numOriginal > numPrice) {
                discount = `${Math.round(((numOriginal - numPrice) / numOriginal) * 100)}% OFF`;
            }

            // Clean Affiliate Link
            const urlObj = new URL(window.location.href);
            const asinMatch = urlObj.pathname.match(/(?:dp|gp\/product)\/([A-Z0-9]{10})/);
            const asin = asinMatch ? asinMatch[1] : '';
            const affiliateUrl = asin ? `https://www.amazon.in/dp/${asin}?tag=${tag}` : window.location.href;

            return {
                id: pieceId,
                name: shortName,
                brand: brand.toUpperCase(),
                price,
                originalPrice,
                discount,
                category: categoryName,
                image,
                affiliateUrl,
                numPrice,
                numOriginal
            };
        }, categoryName, pieceId, AFFILIATE_TAG);

        await page.close();
        return pieceData;
    } catch (err) {
        console.error(`Error scraping ${categoryName}:`, err.message);
        await page.close();
        return null;
    }
}

// Helper: AI Editorial Metadata Generator
async function generateLookEditorial(vibe, pieces) {
    try {
        const pieceSummary = pieces.map(p => `${p.category}: ${p.brand} ${p.name} (${p.price})`).join(' | ');

        const prompt = `
Aap ShopVibee ke Celebrity Fashion Stylist & Editorial Curator hain. 
Neeche diye gaye 4 outfit pieces aur vibe ko padhein aur ek cohesive, high-end editorial look title aur aesthetic description generate karein.

Target Vibe: ${vibe}
Pieces in Outfit: ${pieceSummary}

STRICT JSON Output Format:
{
  "title": "Short, ultra-catchy editorial look title (e.g. 'Old Money Suede Fit', 'Monochrome Street Aesthetic', 'Urban Classic Minimalist')",
  "vibe": "Refined aesthetic tag (e.g. 'Smart Casual / Luxury', 'Streetwear / Casual', 'Minimalist Elegance')",
  "description": "1 single natural line describing how to style these 4 pieces together (e.g., 'Tan brown zip suede jacket paired with black tailored pleated trousers, leather Chelsea boots, and minimalist black timepiece.')"
}
Output ONLY valid JSON.`;

        const interaction = await ai.interactions.create({
            model: "gemini-3.6-flash",
            input: prompt,
        });

        const rawText = interaction.output_text.trim();
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error("Editorial JSON Parse Failed");
    } catch (err) {
        console.error("AI Editorial Warning:", err.message);
        return {
            title: `${vibe} Combo Look`,
            vibe: vibe,
            description: `Curated combination of ${pieces.map(p => p.name).join(', ')}.`
        };
    }
}

// Master Function
async function generateFashionLook(config) {
    const browser = await puppeteer.launch({ headless: true });
    console.log(`\n🚀 Curating Look: "${config.vibe}"...\n`);

    const pieces = [];
    const pieceConfigs = [
        { key: 'topwear', category: 'Outerwear / Top', id: 'p-1' },
        { key: 'bottomwear', category: 'Bottomwear', id: 'p-2' },
        { key: 'footwear', category: 'Footwear', id: 'p-3' },
        { key: 'accessory', category: 'Accessory', id: 'p-4' }
    ];

    for (const item of pieceConfigs) {
        if (config.links[item.key]) {
            const piece = await scrapeProductPiece(browser, config.links[item.key], item.category, item.id);
            if (piece) pieces.push(piece);
        }
    }

    await browser.close();

    if (pieces.length === 0) {
        console.error("No products could be scraped.");
        return;
    }

    // Calculate Total Pricing
    const totalPriceNum = pieces.reduce((acc, p) => acc + (p.numPrice || 0), 0);
    const totalOriginalNum = pieces.reduce((acc, p) => acc + (p.numOriginal || p.numPrice || 0), 0);
    const totalSavingsPct = totalOriginalNum > totalPriceNum 
        ? `${Math.round(((totalOriginalNum - totalPriceNum) / totalOriginalNum) * 100)}% OFF` 
        : '0% OFF';

    // Determine Budget Category
    let budgetCategory = 'premium';
    if (totalPriceNum <= 3000) {
        budgetCategory = 'under-3k';
    } else if (totalPriceNum <= 5000) {
        budgetCategory = 'under-5k';
    }

    console.log("Generating AI Stylist Editorial metadata...");
    const editorial = await generateLookEditorial(config.vibe, pieces);

    // Clean pieces array for output (remove temporary math numbers)
    const cleanPieces = pieces.map(({ numPrice, numOriginal, ...rest }) => rest);

    const fashionLookObject = {
        id: config.lookId,
        title: editorial.title,
        vibe: editorial.vibe,
        totalPrice: `₹${totalPriceNum.toLocaleString('en-IN')}`,
        totalOriginalPrice: `₹${totalOriginalNum.toLocaleString('en-IN')}`,
        totalSavings: totalSavingsPct,
        budgetCategory,
        modelImage: config.modelImage || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
        description: editorial.description,
        pieces: cleanPieces
    };

    console.log("\n================ COPY & PASTE IN data/looks.ts ================\n");
    console.log(JSON.stringify(fashionLookObject, null, 2) + ",");
}

// ================= INPUT YOUR 4 PRODUCT LINKS HERE =================
const LOOK_INPUT = {
    lookId: "look-2",
    vibe: "Old Money Casual / Quiet Luxury",
    modelImage: "https://i.ibb.co/CXZPQtP/Whats-App-Image-2026-08-18-at-9-52-53-AM.jpg", // Model photo URL
    links: {
        topwear: "https://www.amazon.in/dp/B0CKW8X972",    // 1. Shirt/Jacket
        bottomwear: "https://www.amazon.in/dp/B0D5Y7G8N5", // 2. Trousers/Jeans
        footwear: "https://www.amazon.in/dp/B0B5G8N9PQ",   // 3. Shoes/Loafers
        accessory: "https://www.amazon.in/Fastrack-Display-Silicone-Calling-Smartwatch/dp/B0F5HNW218/ref=pd_rhf_gw_s_pd_crcd_d_sccl_1_6/261-0137262-3380647?pd_rd_w=79FLv&content-id=amzn1.sym.7edc8fe7-49c8-4837-acf4-779a8e8647e2&pf_rd_p=7edc8fe7-49c8-4837-acf4-779a8e8647e2&pf_rd_r=XQW7GD3PJ76J7ANE5DHZ&pd_rd_wg=8K2Yc&pd_rd_r=a7b300e4-3367-4866-b96f-ba2cd2be74f7&pd_rd_i=B0F5HNW218&th=1"   // 4. Watch/Sunglasses
    }
};

generateFashionLook(LOOK_INPUT);