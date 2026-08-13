import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const AFFILIATE_TAG = 'Kishuxfit-21';
const apiKey = process.env.GEMINI_API_KEY;

// Initialize SDK with key from .env
const ai = new GoogleGenAI({ apiKey: apiKey });

async function generateVibeeGuidance(title, price, features, category) {
    try {
        const prompt = `
Aap ShopVibee.in ke Senior Shopping Expert hain. Is product details ko padhen aur ek original, convincing aur deeply-researched buying recommendation likhen (Hinglish/Hindi + English mein).

Product Name: ${title}
Category: ${category}
Price: ${price}
Key Features: ${features.join(' | ')}

STRICT RULES:
1. "Great value product" ya "Verified by team" jaise generic/robotic AI sentences BILKUL MAT LIKHO.
2. Product ke SPECIFIC highlights (jaise 45W Fast Charging, Compact Size, Short-circuit protection) par direct baat karo.
3. Aisa lagna chahiye ki kisi expert ne actual use ke baad ye advice di hai.

Output Format MUST be strict JSON:
{
  "whyBuy": "2-3 detailed lines. Batayein ki is price drop par ye product lene se user ki kya problem solve hoti hai.",
  "verdict": "1-line sharp & natural buying recommendation summary.",
  "bestFor": "Specific Target Users (e.g. Frequent Travelers & Heavy Smartphone Users)"
}
Sirf valid JSON return karein.`;

        // 🚀 OFFICIAL NEW INTERACTION SYNTAX (As per official docs)
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
        const mainFeature = features[0] ? features[0] : "Fast Charging Tech";
        return {
            whyBuy: `${title.substring(0, 45)}... ke saath ${mainFeature} milna is deal ko kafi value-for-money banata hai.`,
            verdict: "Everyday utility aur daily backup ke liye practical choice.",
            bestFor: `${category} Users`
        };
    }
}

async function scrapeAmazonProduct(productUrl, category, dealId) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    console.log("Fetching Amazon Product Details...");
    await page.goto(productUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    try {
        const productData = await page.evaluate((category, dealId, tag) => {
            const getText = (selector) => document.querySelector(selector)?.innerText.trim() || '';
            
            const getImages = () => {
                const imgs = [];
                document.querySelectorAll('#altImages img, #landingImage').forEach(img => {
                    let src = img.getAttribute('data-old-hires') || img.getAttribute('src') || '';
                    if (src && !src.includes('media-amazon.com/images/S/sash/') && !src.includes('sprite')) {
                        let hdSrc = src.replace(/\._[A-Z0-9_,-]+_\./g, '._AC_SL1500_.');
                        if (!imgs.includes(hdSrc)) imgs.push(hdSrc);
                    }
                });
                return imgs.length > 0 ? imgs : ['https://via.placeholder.com/500'];
            };

            const getFeatures = () => {
                const features = [];
                document.querySelectorAll('#feature-bullets ul li span.a-list-item').forEach(el => {
                    const text = el.innerText.trim();
                    if (text && !text.includes('More information') && text.length > 5) {
                        features.push(text);
                    }
                });
                return features;
            };

            const title = getText('#productTitle');
            let price = document.querySelector('.a-price .a-offscreen')?.innerText.trim() || '';
            let originalPrice = document.querySelector('.basisPrice .a-offscreen, .a-text-price .a-offscreen')?.innerText.trim() || '';
            
            if (!price) {
                price = document.querySelector('.a-price-whole')?.innerText.trim() || '₹0';
                if (price && !price.includes('₹')) price = '₹' + price;
            }

            const images = getImages();
            const features = getFeatures();
            const description = getText('#productDescription') || features.join('. ');

            let discount = '';
            if (price && originalPrice) {
                const p = parseFloat(price.replace(/[^0-9.]/g, ''));
                const op = parseFloat(originalPrice.replace(/[^0-9.]/g, ''));
                if (op > p) {
                    discount = `${Math.round(((op - p) / op) * 100)}% OFF`;
                }
            }

            const urlObj = new URL(window.location.href);
            const asinMatch = urlObj.pathname.match(/(?:dp|gp\/product)\/([A-Z0-9]{10})/);
            const asin = asinMatch ? asinMatch[1] : '';
            const cleanLink = asin ? `https://www.amazon.in/dp/${asin}?tag=${tag}` : window.location.href;

            return {
                id: dealId,
                title,
                category,
                price,
                originalPrice,
                discount,
                image: images[0] || '',
                images,
                store: 'Amazon',
                link: cleanLink,
                expiresIn: '',
                description: description.substring(0, 300) + '...',
                features: features.slice(0, 6)
            };
        }, category, dealId, AFFILIATE_TAG);

        console.log("Generating Researched Human Guidance...");
        const guidance = await generateVibeeGuidance(productData.title, productData.price, productData.features, category);
        productData.vibeeGuidance = guidance;

        await browser.close();
        return productData;

    } catch (error) {
        console.error("Error scraping product:", error);
        await browser.close();
        return null;
    }
}

const AMAZON_URL = "https://www.amazon.in/dp/B0GL6ZMSX3"; 
const CATEGORY = "Electronics"; 
const NEXT_ID = 17;

async function run() {
    const data = await scrapeAmazonProduct(AMAZON_URL, CATEGORY, NEXT_ID);
    if (data) {
        console.log("\n--- COPY & PASTE THIS IN YOUR INITIALDEALS ARRAY ---\n");
        console.log(JSON.stringify(data, null, 2) + ",");
    }
}

run();