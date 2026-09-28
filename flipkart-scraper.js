import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

// फ्लिपकार्ट एफिलिएट ट्रैकिंग आईडी (यदि उपलब्ध हो)
const FLIPKART_AFFILIATE_ID = 'YOUR_FLIPKART_AFFID'; 
const apiKey = process.env.GEMINI_API_KEY;

// Google GenAI SDK इनिशियलाइज़ेशन
const ai = new GoogleGenAI({ apiKey: apiKey });

async function generateVibeeGuidance(title, price, features, category) {
    try {
        const prompt = `
Aap ShopVibee.in ke Senior Product Research & Buying Expert hain. Is product details ko padhen aur ek rich, detailed, aur high-value buying guide generate karein (Hinglish/Hindi + English mix mein). 
Yeh guide affiliate content standards (No "Thin Content") ko meet karni chahiye.

Product Name: ${title}
Category: ${category}
Price: ${price}
Key Features: ${features.join(' | ')}

STRICT RULES:
1. Koi bhi generic ya robotic AI sentence ("Great value product", "Verified by team") bilkul mat likho.
2. Product ke actual specifications aur utility par baat karo.
3. Category ke hisaab se practical insights do (Jaise agar Fashion hai toh Fabric/Styling/Fit tips do, Electronics hai toh Performance/Use-case do, Kitchen/Fitness hai toh daily practicality batao).

Output Format MUST be strict JSON matching this exact structure:
{
  "whyBuy": "2-3 detailed lines batayein ki is price drop par ye product lene se user ki kya real-world problem solve hoti hai.",
  "deepReview": "1 detailed paragraph (4-5 lines) ka expert analysis jisme product ki build quality, performance aur overall value par gehrai se baat ho.",
  "expertTips": "Practical styling, usage, ya sizing/fit tip (e.g., 'True to size, best paired with casual denim' ya 'Ideal for heavy multi-tasking setup').",
  "verdict": "1-line sharp & natural buying recommendation summary.",
  "bestFor": "Specific Target Users (e.g., Working Professionals, Home Chefs, Tech Enthusiasts, Fitness Beginners)"
}
Sirf valid JSON return karein, koi extra text nahi.`;

        const interaction = await ai.interactions.create({
            model: "gemini-3.6-flash",
            input: prompt,
        });

        const rawText = interaction.output_text.trim();
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        } else {
            throw new Error("JSON Parse Failed");
        }

    } catch (err) {
        console.error("⚠️ AI Guidance Error:", err.message);
        const mainFeature = features[0] ? features[0] : "Premium Build Quality";
        return {
            whyBuy: `${title.substring(0, 40)}... ke features aur ${mainFeature} isse is price point par ek behtareen choice banate hain.`,
            deepReview: "Yeh product daily utility aur long-term durability ke liye design kiya gaya hai. Iski build quality aur performance segment mein kaafi strong hai.",
            expertTips: "Check user manual and specifications properly before initial setup for best results.",
            verdict: "A reliable pick for everyday use.",
            bestFor: `${category} Users`
        };
    }
}

async function scrapeFlipkartProduct(productUrl, category, dealId) {
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

    console.log("Fetching Flipkart Product Details...");
    
    // Page load & wait for content
    await page.goto(productUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    try {
        // Flipkart ke dynamic pricing aur images load hone ke liye 2 second scroll wait
        await page.evaluate(() => window.scrollBy(0, 400));
        await new Promise(r => setTimeout(r, 2000));

        const productData = await page.evaluate((category, dealId, affid) => {
            // Helper function to extract text
            const getText = (selector) => document.querySelector(selector)?.innerText?.trim() || '';

            // 1. 🏷️ Title
            let title = getText('h1 span') || getText('h1') || getText('span.B_NuCI');
            if (title.endsWith('...more')) {
                title = title.replace(/\.\.\.more$/, '').trim();
            }

            // 2. 💰 Price & MRP (Flipkart ke latest aur legacy sabhi classes cover hain)
            let price = '';
            const allElements = Array.from(document.querySelectorAll('*'));
            
            // Sabse pehle class based try karte hain
            const priceEl = document.querySelector('div.Nx9bqj.CxhGGd') || 
                            document.querySelector('div.Nx9bqj') || 
                            document.querySelector('div._30jeq3._16Jk6d');

            if (priceEl) {
                price = priceEl.innerText.trim();
            } else {
                // Agar class badal gayi ho toh direct ₹ symbol match
                const rupeeEl = allElements.find(el => el.children.length === 0 && /^₹[0-9,]+$/.test(el.innerText?.trim() || ''));
                if (rupeeEl) price = rupeeEl.innerText.trim();
            }

            let originalPrice = '';
            const origPriceEl = document.querySelector('div.yRaY8j.A68aAq') || 
                                document.querySelector('div.yRaY8j') || 
                                document.querySelector('div._3I9_wc._2p6lqe');

            if (origPriceEl) {
                originalPrice = origPriceEl.innerText.trim();
            }

            let discount = '';
            const discountEl = document.querySelector('div.UkUFwK span') || 
                               document.querySelector('div._3Ay6Sb span');
            if (discountEl) {
                discount = discountEl.innerText.trim();
            } else if (price && originalPrice) {
                const p = parseFloat(price.replace(/[^0-9.]/g, ''));
                const op = parseFloat(originalPrice.replace(/[^0-9.]/g, ''));
                if (op > p) {
                    discount = `${Math.round(((op - p) / op) * 100)}% off`;
                }
            }

            // 3. 🖼️ Images (High Quality Extraction)
            const imgs = [];
            const imgEls = document.querySelectorAll('img');
            imgEls.forEach(img => {
                let src = img.getAttribute('src') || '';
                // Sirf product images ko capture karo (icons aur banners ko chhodkar)
                if (src.includes('/image/') && !src.includes('/rukminim1/fk-p-flap/')) {
                    // Resolution 128x128 ya 416x416 ko high-res (832x832) me convert karna
                    let hdSrc = src.replace(/(\/image\/)[0-9]+\/[0-9]+(\/)/, '$1832/832$2')
                                   .replace(/\?q=[0-9]+/, '?q=90');
                    if (!imgs.includes(hdSrc)) imgs.push(hdSrc);
                }
            });

            // 4. 📝 Features & Specifications
            const features = [];
            document.querySelectorAll('div._21Ahn- ul li, div.xFVion ul li, div._2c2kV- li, li._21Ahn-').forEach(el => {
                const t = el.innerText.trim();
                if (t && t.length > 3) features.push(t);
            });

            // Agar bullet highlights na mile toh details table se keys nikalo
            if (features.length === 0) {
                document.querySelectorAll('tr._1s_Smc, tr.WJdYP6, tr.row').forEach(row => {
                    const key = row.querySelector('td:first-child')?.innerText?.trim();
                    const val = row.querySelector('td:last-child')?.innerText?.trim();
                    if (key && val && key.length < 30) features.push(`${key}: ${val}`);
                });
            }

            // 5. Description
            const description = getText('div._1mXcCf') || getText('div._3la3Fn') || features.slice(0, 3).join('. ');

            // 6. Clean Deal Link
            let cleanLink = window.location.href.split('?')[0];
            if (affid && affid !== 'YOUR_FLIPKART_AFFID') {
                cleanLink += `?affid=${affid}`;
            }

            return {
                id: dealId,
                title,
                category,
                price: price || '₹0',
                originalPrice: originalPrice || price,
                discount: discount || '',
                image: imgs[0] || 'https://via.placeholder.com/500',
                images: imgs.length > 0 ? imgs.slice(0, 5) : ['https://via.placeholder.com/500'],
                store: 'Flipkart',
                link: cleanLink,
                expiresIn: '',
                description: description ? description.substring(0, 300) + '...' : '',
                features: features.slice(0, 6)
            };
        }, category, dealId, FLIPKART_AFFILIATE_ID);

        console.log("Generating Deep Researched AI Buying Guide for Flipkart Product...");
        const guidance = await generateVibeeGuidance(productData.title, productData.price, productData.features, category);
        productData.vibeeGuidance = guidance;

        await browser.close();
        return productData;

    } catch (error) {
        console.error("Error scraping Flipkart product:", error);
        await browser.close();
        return null;
    }
}

// टेस्ट कॉन्फ़िगरेशन
const FLIPKART_URL = "https://dl.flipkart.com/s/1EJQPqNNNN";
const CATEGORY = "Electronics";
const NEXT_ID = 18;

async function run() {
    const data = await scrapeFlipkartProduct(FLIPKART_URL, CATEGORY, NEXT_ID);
    if (data) {
        console.log("\n--- COPY & PASTE THIS IN YOUR DATABASE OR ARRAY ---\n");
        console.log(JSON.stringify(data, null, 2) + ",");
    }
}

run();