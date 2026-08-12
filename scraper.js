import puppeteer from 'puppeteer';
import { GoogleGenAI } from '@google/genai';

// ⚙️ CONFIGURATION
const AFFILIATE_TAG = 'Kishuxfit-21';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// 💡 🚀 REAL HUMAN-TOUCH & RESEARCHED BUYING GUIDANCE GENERATOR
async function generateVibeeGuidance(title, price, features, category) {
    try {
        // Advanced System Prompt for High-Converting Human Copy
        const prompt = `
Aap ShopVibee ke Senior Shopping Expert hain. Is product ko achhe se analyze karke ek super engaging, natural, Hindi-English (Hinglish) shopping advice likhein.

Product Title: ${title}
Category: ${category}
Price: ${price}
Key Features: ${features.join('. ')}

INSTRUCTIONS:
- Aisa lagna chahiye ki kisi real bande ne ye product khud test karke practical experience share kiya hai.
- Generic AI lines ("Is price segment mein product achha hai") BILKUL MAT LIKHNA.
- Title aur features mein se specific points uthao (jaise builtin USB-C cable, fast charging, portability).

OUTPUT FORMAT (Strictly JSON, No Markdown):
{
  "whyBuy": "2-3 solid lines. Batayein ki builtin cable ya fast charging se user ki kaunsi problem solve hoti hai aur ye deal kyu missed nahi honi chahiye.",
  "verdict": "1 catchy verdict line (e.g., Alag se cable carry karne ka jhanjhat khatam, travel aur daily office commute ke liye perfect powerbank).",
  "bestFor": "Specific Target Audience (e.g. Frequent Travelers & iPhone/Type-C Users)"
}`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        // Debug Log to check raw response in terminal
        const rawText = response.text.trim();
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        } else {
            throw new Error("JSON parsing failed from AI response");
        }

    } catch (err) {
        console.error("⚠️ AI API Failed! Error details:", err.message);
        
        // Smart Fallback using Actual Scraped Features instead of generic boring message
        const featureHighlight = features[0] ? features[0].substring(0, 90) : "Solid build quality";
        return {
            whyBuy: `${title.substring(0, 40)}... ke saath ${featureHighlight} milna is deal ko value-for-money banata hai.`,
            verdict: "Everyday utility aur travel purpose ke liye practical choice.",
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
            
            // Extract HD Images
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

// 🚀 USAGE EXAMPLE:
const AMAZON_URL = "https://link.amazon/B02J9ZicB";
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