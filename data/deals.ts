export interface VibeeGuidance {
  whyBuy: string;         // Is deal mein value kyun hai
  deepReview?: string;    // In-depth editorial breakdown
  expertTips?: string;    // Pro tips / Usage advice
  verdict: string;        // Quick decision guide
  bestFor?: string;       // Target audience
}

export interface Deal {
  id: number;
  title: string;
  category: string;
  price: string;
  originalPrice?: string;
  discount: string;
  couponDiscount?: string;   // 👈 Yeh add karein
  image: string;
  images?: string[];      // Multiple images array support
  store: string;
  link: string;
  expiresIn: string;
  promoCode?: string;
  description: string;
  features: string[];
  vibeeGuidance?: VibeeGuidance;
}

// 🚀 Expanded Categories List
export const categories = [
  'All',
  'Supplements',
  'Electronics',
  'TOYS & GAMES',
  'Wearables',
  'Furniture',
  'Laptops',
  'Smartwatches',
  'Audio',
  'Home',
  'Fashion',
  'Shoes',
  'Gaming',
  'Kitchen',
  'Beauty'
];

export const initialDeals: Deal[] = [
  {
    "id": 1,
    "title": "Wellcore - Pure Micronised Creatine Monohydrate (122g, 33 Servings) Fruit Fusion Lab Tested | Supports Athletic Performance and Power",
    "category": "Supplements",
    "price": "₹610",
    "originalPrice": "₹699.00",
    "discount": "13% OFF",
    "image": "https://i.ibb.co/Hf8nZC2S/imageqy-TWkaqh-RGKVzbovwpk-Ndy-Tshej.jpg",
    "images": [
      "https://i.ibb.co/Hf8nZC2S/imageqy-TWkaqh-RGKVzbovwpk-Ndy-Tshej.jpg",
      "https://i.ibb.co/FbPpjDHd/image-Mx-KBSz-ZLih-Ftyu-Uq-Ux-VUiplt-LJa.png",
      "https://i.ibb.co/rKschnc0/imaged-Gwdr-Itz-IXNDKPpc-ELqv-JPGCw-Ru.jpg",
      "https://i.ibb.co/Q7ZR8SCq/imageepzu-DMmf-Wxe-ETLlk-HTa-RUi-GVq-Eq.png",
      "https://i.ibb.co/p6GsHFL2/imagee-Js-WWum-TEXpg-IMQLJj-NLh-FJYud-O.jpg",
      "https://i.ibb.co/RkYrKtdy/image-GEk-Sdl-OWam-OBo-SQZn-QMkl-OJizp-Z.jpg",
      "https://i.ibb.co/yFq8KhMp/image-Tcqc-QNXkks-Kfw-Gs-Daz-PIuirujz-H.png"
    ],
    "store": "Wellversed",
    "link": "https://store.wellversed.in/products/wellcore-pure-micronised-creatine-monohydrate-122g-33-servings-lab-tested-fruit-fusion-supports-athletic-performance-and-power",
    "expiresIn": "",
    "promoCode": "KRISH",
    "couponDiscount": "10%",
    "description": "HELPS BUILD MUSCLE & STRENGTH: Every scoop of Wellcore Creatine Monohydrate delivers the fuel for your physical performance. It helps you train harder, lift heavier, and recover faster.",
    "features": [
      "Weight : 122g",
      "Servings : 33 ",
      "Lab Tested",
      "Supports Athletic Performance and Power",
      "Fruit Fusion Flavor"
    ],
    "vibeeGuidance": {
      "whyBuy": "Unflavored creatine ke comparison mein Fruit Fusion flavor lena difficult nahi hota. Lab-tested formula aur pure micronised form strength building ke liye solid choice hai.",
      "verdict": "Agar aap beginners level workout kar rahe hain aur flavored creatine chahte hain, toh ye budget-friendly option hai.",
      "bestFor": "Gym-goers & Strength Athletes"
    }
  },
  {
    "id": 2,
    "title": "JBL Tune 520BT Wireless On Ear Headphones with Mic, Upto 57H Battery, Speed Charge : 5 Min Charge Gives Up to 3H of Playback, Multipoint Connect, Customizable Bass with Headphones App, BT 5.3 (Black)",
    "category": "Electronics",
    "price": "₹2,999.00",
    "originalPrice": "₹4,999",
    "discount": "40% OFF",
    "image": "https://i.ibb.co/Y7SXD7WG/RECIa-Dy-LSXEd-ETVPa-SXCyb-Us-Qxa-Zj-Byo.jpg",
    "images": [
      "https://i.ibb.co/Y7SXD7WG/RECIa-Dy-LSXEd-ETVPa-SXCyb-Us-Qxa-Zj-Byo.jpg",
      "https://i.ibb.co/TBBdxM9y/q-JHs-Oj-LSXJIOng-Pj-ZOJjd-IOGa-TKt-Sgn-L.jpg",
      "https://i.ibb.co/fVzxBpT0/Tlx-VSLSXc-Zdk-Et-Gis-Mx-Sge-Rq-Pq-AIwx-IG.jpg",
      "https://i.ibb.co/4nGC3RG7/rabekv-PLSXUPnc-Jf-SIil-FRAXj-Ldrpx-Mb.jpg",
      "https://i.ibb.co/LXBL6M0p/cf-Fi-ERLSXWUIbia-UQtu-Cm-UWLMLNKpau-K.jpg",
      "https://i.ibb.co/wF5VcWsP/h-XUoe-Nl-KLSXFm-Iw-Xbdftuxtt-Ya-NCn-WYf.jpg"
    ],
    "store": "Amazon",
    "link": "https://link.amazon/B0ayX6mS3",
    "expiresIn": "",
    "promoCode": "",
    "couponDiscount": "",
    "description": "With up to 57-hour battery life and quick charging of 5min gives 3Hrs playback, you’ ll have enough power for multi-day road trips and long festival weekends JBL Tune 520BT feature the renowned JBL Pure Bass sound, the same that powers the most famous venues all around the world Customize your listening experience with JBL Headphones App to tailor the sound to your taste with the EQ.",
    "features": [
      "Brand : JBL",
      "Connectivity : Technology Wireless",
      "Communication Technology : Bluetooth",
      "Included Components : 1 x JBL Tune 520BT headphones 1 x USB-C Charging Cable 1 x Warranty",
      "Colour Black"
    ],
    "vibeeGuidance": {
      "whyBuy": "₹3,000 ke andar 57 Hours ka massive battery backup aur Fast Speed Charging milna mushkil hai. JBL App support se EQ customize bhi kar sakte hain.",
      "verdict": "Long battery, reliable brand aur deep bass ke liye ₹2,799 par bilkul paisa vasool deal hai.",
      "bestFor": "Daily Commuters, Music Lovers & Online Classes"
    }
  },
  {
    "id": 7,
    "title": "Bluetooth Calling Smart Watch for Men & Women | HD Touch Display | Heart Rate Monitor | Fitness Tracker | Sports Modes",
    "category": "Wearables",
    "price": "₹489.00",
    "originalPrice": "₹489.00",
    "discount": "",
    "image": "https://i.ibb.co/S7vc4d9H/61y-Rx-Moh-ZVL-SL1500.jpg",
    "images": [
      "https://i.ibb.co/S7vc4d9H/61y-Rx-Moh-ZVL-SL1500.jpg",
      "https://i.ibb.co/35rmFpQY/71a5k6-NFAz-L-SL1500.jpg",
      "https://i.ibb.co/vx9pyHR4/61twp-Nyk-Zg-L-SL1500.jpg",
      "https://i.ibb.co/GvzD5zDy/61-J22i5-COJL-SL1500.jpg",
      "https://i.ibb.co/HTg1LLJd/61-Vvr2-Uxo8-L-SL1500.jpg"
    ],
    "store": "Amazon",
    "link": "https://link.amazon/B00rOKtoE",
    "expiresIn": "",
    "promoCode": "",
    "description": "Bluetooth Calling Smart Watch for Men & Women | HD Touch Display | Heart Rate Monitor | Fitness Tracker | Sports Modes",
    "features": [
      "Operating System : Android Wear 2.8",
      "Special Feature : Lightweight",
      "Communication Technology : Bluetooth",
      "Battery Capacity : 180 Milliamp Hours",
      "Wireless Communication Standard : Bluetooth"
    ],
    "vibeeGuidance": {
      "whyBuy": "₹500 se kam price mein Bluetooth calling feature aur HD display milna bohot rare hai.",
      "verdict": "Super budget category mein entry-level smartwatch lene ke liye best option.",
      "bestFor": "First-time Smartwatch Users & Gifting"
    }
  },
  {
    "id": 3,
    "title": "Digitek DWM-010 Mic Wireless with Type-C, Mic for YouTube Wireless Recording, 2.4GHz Wireless Microphone with Noise Reduction, 40m Range, 7H Battery, LED Light Indicator",
    "category": "Electronics",
    "price": "₹799.00",
    "originalPrice": "₹79,900.00",
    "discount": "99% OFF",
    "image": "https://i.ibb.co/JFvwdxg5/ULzvmj-YLSXkq-ZFUp-Tb-Tfj-VHx-OSMs-OHul.jpg",
    "images": [
      "https://i.ibb.co/JFvwdxg5/ULzvmj-YLSXkq-ZFUp-Tb-Tfj-VHx-OSMs-OHul.jpg",
      "https://i.ibb.co/RThdjnHG/OWchee-LSXUFw-Tt-Oo-QFj-Shn-Lk-Ytrm-CCHe.jpg",
      "https://i.ibb.co/pHH3QbV/QVHPd-BOy-LSXv-Oqsym-JQBwamj-SNTJFPhh.jpg",
      "https://i.ibb.co/QvwW1B8w/Ov-Jbey-BLSXt-Iu-EZVCLBifx-PSfh-TMNc-Aq.jpg",
      "https://i.ibb.co/8DLkvVhN/Kkx-Emv-GLSXPCax-Zoay-WWggiwcij-Ec-MJq.jpg",
      "https://i.ibb.co/Y4HTjVTd/h-UAe-Emr-LSXKMETmwi-Jl-LZucpstz-PLc-NU.jpg",
      "https://i.ibb.co/mFrwbfpG/ezl-FGLSXh-Ms-Eg-CLe-Mahdl-Nde-WFGOIw-Zl.jpg"
    ],
    "store": "Amazon",
    "link": "https://link.amazon/B0ilLfheW",
    "expiresIn": "",
    "promoCode": "",
    "description": "Digitek DWM-010 Mic Wireless with Type-C, Mic for YouTube Wireless Recording, 2.4GHz Wireless Microphone with Noise Reduction, 40m Range, 7H Battery, LED Light Indicator",
    "features": [
      "Recommended Uses For Product : Reels, Streaming, Video Conference, Vlogging",
      "Brand : Digitek",
      "Model Name : DWM 010",
      "Connectivity Technology : Wireless",
      "Connector Type : USB Type-C"
    ],
    "vibeeGuidance": {
      "whyBuy": "Content creators ke liye high audio clarity noise reduction ke sath mil rahi hai, aur 40 meter range is price range mein impressive hai.",
      "verdict": "Reels aur YouTube videos start karne ke liye plug-and-play Type-C wireless mic ideal hai.",
      "bestFor": "YouTubers, Vloggers & Instagram Creators"
    }
  },
  {
    "id": 16,
    "title": "GRENARO Mic for YouTube Wireless, 3-Level Adjustable Noise Reduction Mic Wireless,S12 Wireless Microphone for Youtubers with LED Indicator Light (Single Channel Type-C Port Version)",
    "category": "Electronics",
    "price": "₹785.00",
    "originalPrice": "₹1,999",
    "discount": "61% OFF",
    "image": "https://m.media-amazon.com/images/I/41MhjOOnxLL._AC_SL1500_.jpg",
    "images": [
      "https://m.media-amazon.com/images/I/71dhDqkgHPL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/51Be35DQQrL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/512r9owy1hL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/51TZTyUngYL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/510W+4ZUKKL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/41thEoXmHOL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71dhDqkgHPL._AC_SL1500_.jpg"
    ],
    "store": "Amazon",
    "link": "https://link.amazon/B02tSUbih",
    "expiresIn": "",
    "description": "[ Experience the Upgrade with 3 Exciting Enhancements ] - ① Brighter, clearer LED indicators for easier mode selection.② Customizable 3-level noise reduction to suit every environment.③ Effortlessly switch between the sponge filter head and windproof plush filter head for optimal sound in any settin...",
    "features": [
      "[ Experience the Upgrade with 3 Exciting Enhancements ] - ① Brighter, clearer LED indicators for easier mode selection.② Customizable 3-level noise reduction to suit every environment.③ Effortlessly switch between the sponge filter head and windproof plush filter head for optimal sound in any setting—perfect for mic for YouTube wireless and wireless mic for YouTubers.",
      "[ Clear LED Indicators ] - This wireless mic for YouTubers offers 4 mode settings—Original Sound, Noise Reduction, Reverb, and Mute. The clear LED indicators make it easy to switch to the perfect mode, ensuring a hassle-free setup every time, whether you're using your mic for YouTube wireless for vlogging or recording content.",
      "[ Adjustable 3-Level Noise Reduction ] - The perfect solution for every scenario. Use Level 1 for quiet home settings, Level 2 on the streets, and Level 3 in noisy environments. Tailor the noise reduction to your surroundings for the best sound quality every time, making this wireless mic for YouTubers ideal for diverse recording environments.",
      "[ Two Types of Filter Heads ] - Equipped with a sponge filter head and a windproof plush filter head, this mic for YouTube wireless effectively reduces noise in any environment. The sponge filter head clears indoor noise, while the windproof plush head filters out outdoor wind noise, ensuring crystal-clear audio for both indoor and outdoor recordings, perfect for wireless mic for YouTubers.",
      "[ Long Working Time ] - With a built-in 65mAh rechargeable battery, the microphone can operate for up to 6 hours. It comes with a charging cable so you can charge both the microphone and connected devices simultaneously, extending battery life and usability for extended recording sessions, making it a reliable mic for YouTube wireless.",
      "[ 98FT Ultra-Long Receiving Distance ] - Enjoy unparalleled freedom with a 30-meter reception range, allowing you to move around while capturing high-quality audio seamlessly. Perfect for YouTubers and vloggers who need a reliable wireless mic for YouTubers for both indoor and outdoor use."
    ],
    "vibeeGuidance": {
      "whyBuy": "Agar aap outdoor vlogging ya reels banate waqt background noise aur hawa ki aawaz (wind noise) se pareshan hain, toh ₹738 par ye mic aapki audio quality instantly upgrade kar dega. Isme milne wala 3-Level adjustable noise reduction aur saath mein dedicated plush windproof filter (deadcat) har environment mein clear voice capture karta hai. Saath hi, Type-C passthrough charging support karta hai jisse long shoot ke waqt phone ki battery khatam hone ka darr nahi rehta.",
      "verdict": "Sub-₹800 budget mein dedicated 3-level noise cancellation aur windproof plush cover ke saath aane wala ye sabse practical Type-C wireless mic hai.",
      "bestFor": "Budget YouTubers, Outdoor Reel Creators & Mobile Vloggers (Type-C Users)"
    }
  },
  {
    "id": 17,
    "title": "Zebronics Thunder Pro (2026 Upgrade) Wireless Headphones, BT v6.0, Up to 60h Playback, Dual Pairing, 40mm Drivers, ENC, Gaming Mode, Deep Bass, AUX & microSD, Rapid Charging (Beige)",
    "category": "Electronics",
    "price": "₹899.00",
    "originalPrice": "₹1,899",
    "discount": "53% OFF",
    "image": "https://m.media-amazon.com/images/I/41+hPuACLJL._AC_SL1500_.jpg",
    "images": [
      "https://m.media-amazon.com/images/I/41+hPuACLJL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/412SmC7JcRL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/51SSefbIA1L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/51vXHYzsalL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/41JyAybM3QL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/41Hl-B+W0qL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61cNnP0I1xL._AC_SL1500_.jpg"
    ],
    "store": "Amazon",
    "link": "https://link.amazon/B06zxX2zx",
    "expiresIn": "",
    "description": "LONG PLAYBACK: Enjoy up to 60hrs* of wireless entertainment on a single charge, making it ideal for travel, work, and extended listening sessions.. RAPID CHARGING: Get up to 6hrs* of usage with just a 10-minute charge, ensuring quick power whenever you need it.. POWERFUL SOUND: Equipped with 40mm dr...",
    "features": [
      "LONG PLAYBACK: Enjoy up to 60hrs* of wireless entertainment on a single charge, making it ideal for travel, work, and extended listening sessions.",
      "RAPID CHARGING: Get up to 6hrs* of usage with just a 10-minute charge, ensuring quick power whenever you need it.",
      "POWERFUL SOUND: Equipped with 40mm drivers that deliver deep bass, clear vocals, and an immersive audio experience for music and movies.",
      "ENC CALLING: Environmental Noise Cancellation helps reduce surrounding noise for clearer voice calls and better communication quality.",
      "LOW LATENCY GAMING: Gaming mode minimizes audio delay for a more synchronized and responsive gaming experience.",
      "MULTIPLE CONNECTIVITY: Supports BT v6.0, AUX, and microSD playback, offering flexible listening options across different devices."
    ],
    "vibeeGuidance": {
      "whyBuy": "₹749 ke budget mein 60 ghante ka continuous playback aur BT v6.0 ki stable connectivity milna ek real upgrade hai, jo daily charging ke jhanjhat ko poori tarah khatam kar deta hai. 10-minute ki rapid charge par 6 ghante ka backup, punchy 40mm deep bass aur SD card/AUX support ise travel aur daily use ke liye ek complete all-rounder banata hai.",
      "verdict": "Under ₹800 price bracket mein insane battery life aur triple-connectivity (BT/AUX/MicroSD) ke saath aane wala ye sabse reliable over-ear option hai.",
      "bestFor": "Daily Commuters, Music Lovers on a Budget & Casual Gamers"
    }
  },
  {
    "id": 8,
    "title": "FireBees Modern Wooden Bedside Table with 3 Shelves | Compact Side Table for Bedroom & Living Room | Bed Side Table Organizer, End Table & Home Furniture | Dark Brown (40.6x25.4x50.8 cm)",
    "category": "Furniture",
    "price": "₹799.00",
    "originalPrice": "₹1,500",
    "discount": "47% OFF",
    "image": "https://i.ibb.co/TqFN8Gnt/61m-KGRj0-i-L-SL1024.jpg",
    "images": [
      "https://i.ibb.co/TqFN8Gnt/61m-KGRj0-i-L-SL1024.jpg",
      "https://i.ibb.co/tkR5kRF/514-GXCbjva-L-SL1024.jpg",
      "https://i.ibb.co/hk4GSfT/510-C1-Xey0b-L-SL1024.jpg",
      "https://i.ibb.co/Q4kQcY8/61-HNnz45-Tt-L-SL1280.jpg",
      "https://i.ibb.co/Ps7qxGpd/41-H-Dsp6ft-L-SL1024.jpg",
      "https://i.ibb.co/RkkBsP51/41l-Hox12n7-L-SL1024.jpg"
    ],
    "store": "Amazon",
    "link": "https://link.amazon/B019apDpf",
    "expiresIn": "",
    "promoCode": "",
    "description": "FireBees Modern Wooden Bedside Table with 3 Shelves | Compact Side Table for Bedroom & Living Room | Bed Side Table Organizer, End Table & Home Furniture | Dark Brown (40.6x25.4x50.8 cm)",
    "features": [
      "Brand : FireBees",
      "Product Dimensions : 26D x 41W x 51H Centimeters",
      "Indoor/Outdoor Usage : Indoor",
      "Style : Modern",
      "Colour : Dark Brown"
    ],
    "vibeeGuidance": {
      "whyBuy": "3 tiers space-saving design ke sath aesthetic dark brown finish bedroom ya living room ke look ko instantly elevate karta hai.",
      "verdict": "Compact spaces mein storage aur decor dono ke liye value-for-money furniture pick.",
      "bestFor": "Bedrooms, Hostels & Compact Living Rooms"
    }
  },
  {
    "id": 9,
    "title": "EBook 11.6\" HD Laptop | Best Student & Office Work Laptop | Celeron N4020 | 4GB DDR4 | 128GB eMMC + M.2 SSD Expandable Slot | Win 11 Home |31Wh Battery | UHD Graphics 600 | Black",
    "category": "Laptops",
    "price": "₹11,990.00",
    "originalPrice": "₹25,000",
    "discount": "52% OFF",
    "image": "https://i.ibb.co/PsVX2Tg8/71-F8-TUSryh-L-SL1500.jpg",
    "images": [
      "https://i.ibb.co/PsVX2Tg8/71-F8-TUSryh-L-SL1500.jpg",
      "https://i.ibb.co/5g6v3b4k/81-Zs5-JUo05-L-SL1500.jpg",
      "https://i.ibb.co/q34BK8kY/81-Z1p4py7f-L-SL1500.jpg",
      "https://i.ibb.co/Ps87Ckm6/71iod-Q5-Jbi-L-SL1500.jpg",
      "https://i.ibb.co/nqncVBm1/710f-Dv-MLVHL-SL1500.jpg",
      "https://i.ibb.co/DgSZ3MhG/71-QED5a-T43-L-SL1500.jpg",
      "https://i.ibb.co/tMTzfkfN/71-BYBEZQk-LL-SL1500.jpg"
    ],
    "store": "Amazon",
    "link": "https://link.amazon/B01mSfL84",
    "expiresIn": "",
    "promoCode": "",
    "description": "EBook 11.6\" HD Laptop powered by Celeron N4020, Windows 11 Home, 4GB RAM, and expandable M.2 SSD slot. Perfect for basic web browsing, online classes, and daily office documentation.",
    "features": [
      "Brand : Neopticon",
      "Model Name : EBook",
      "Screen Size : 11.6 Inches",
      "Hard Disk Size : 128 GB",
      "Colour : Black",
      "CPU Model : Celeron N4020",
      "RAM Memory Installed Size : 4 GB",
      "Operating System : Windows 11 Home",
      "Special Feature : HD Audio, Memory Card Slot",
      "Graphics Card Description : Integrated"
    ],
    "vibeeGuidance": {
      "whyBuy": "Under ₹10,000 mein Genuine Windows 11 aur SSD Expansion slot waala laptop milna highly economical hai.",
      "verdict": "Basic Ms-Office work, browsing aur online classes ke liye ultimate budget laptop.",
      "bestFor": "Students & Light Office Work"
    }
  },
  {
    "id": 4,
    "title": "Noise Pulse 2 Max 1.85\" Display, Bluetooth Calling Smart Watch, 10 Days Battery, 550 NITS Brightness, Smart DND, 100 Sports Modes, Smartwatch for Men and Women (Deep Wine)",
    "category": "Smartwatches",
    "price": "₹1,499.00",
    "originalPrice": "₹5,999",
    "discount": "75% OFF",
    "image": "https://i.ibb.co/7dZqtCJ2/BFKQBZ-1.jpg",
    "images": [
      "https://i.ibb.co/7dZqtCJ2/BFKQBZ-1.jpg",
      "https://i.ibb.co/YBNgcHWr/GQRFZS-1.jpg",
      "https://i.ibb.co/r2GPhKRm/QNKNFL-1.jpg",
      "https://i.ibb.co/XZ6KgD1r/REBYOZ-1.jpg",
      "https://i.ibb.co/qKTNXhd/SMLBSD-1.jpg",
      "https://i.ibb.co/tMkL1vz9/VOKZMC-1.jpg"
    ],
    "store": "Amazon",
    "link": "https://link.amazon/B0fT0zGiD",
    "expiresIn": "",
    "promoCode": "",
    "description": "Noise Pulse 2 Max is a feature-packed smartwatch that combines style and functionality. With a large 1.85\" display, Bluetooth calling, and a long-lasting battery, it keeps you connected and on top of your fitness goals.",
    "features": [
      "Operating System : android, ios",
      "Display Size : 1.85 Inches",
      "Battery Life : 10 Days",
      "Bluetooth Calling : Yes",
      "Sports Modes : 100",
      "Brightness : 550 NITS"
    ],
    "vibeeGuidance": {
      "whyBuy": "550 NITS outdoor display brightness aur Noise ki proprietary calling clarity is budget mein stand-out feature hain.",
      "verdict": "Brand value + Massive display 82% discount par ek killer deal hai.",
      "bestFor": "Fitness Enthusiasts & Daily Outdoor Use"
    }
  },
  {
    "id": 10,
    "title": "Dubstep Pop 1400 Portable Bluetooth Speaker | 14W Loud Sound, Deep Bass with XBASS, 16 Hrs Playtime, TWS Stereo Pairing, 52mm Driver, Splash-Resistant, Carry Strap (Black)",
    "category": "Audio",
    "price": "₹699.00",
    "originalPrice": "₹6,999",
    "discount": "90% OFF",
    "image": "https://i.ibb.co/7xJXDPNj/71-Agwyf-Ss-L-SL1500.jpg",
    "images": [
      "https://i.ibb.co/7xJXDPNj/71-Agwyf-Ss-L-SL1500.jpg",
      "https://i.ibb.co/VYTjH2Z8/81-Fsq-C26-EEL-SL1500.jpg",
      "https://i.ibb.co/gMZg4v0B/81kyb-Pb-YBML-SL1500.jpg",
      "https://i.ibb.co/LsJcf5g/91-Nkv-K9-YVk-L-SL1500.jpg",
      "https://i.ibb.co/B2mqd1Gx/71t-RJ-EX8-XL-SL1500.jpg",
      "https://i.ibb.co/tM5Nkx27/81t-Xfz-YOBUL-SL1500.jpg",
      "https://i.ibb.co/nqp0pX62/81-Z7-Oz2p7-WL-SL1500.jpg",
      "https://i.ibb.co/PZvL6P3b/71-UMAAVSi-UL-SL1500.jpg",
      "https://i.ibb.co/SbV76d9/81-T3ld9-EOL-SL1500.jpg",
      "https://i.ibb.co/r2wS3xRD/81j-FCi-Dnnf-L-SL1500.jpg",
      "https://i.ibb.co/WvkKGkTc/816-Yj1-S0-Xf-L-SL1500.jpg",
      "https://i.ibb.co/fz9y2H91/81-Hh-NTRf-Zw-L-SL1500.jpg",
      "https://i.ibb.co/Y4d8W1yv/71w4b-Vr-Kbn-L-SL1500.jpg",
      "https://i.ibb.co/twmdy3qQ/7156jk6-SHZL-SL1500.jpg",
      "https://i.ibb.co/SDvwwSxy/81iby-K7c8b-L-SL1500.jpg"
    ],
    "store": "Amazon",
    "link": "https://link.amazon/B0h69MWhS",
    "expiresIn": "",
    "description": "Dubstep Pop 1400 Portable Bluetooth Speaker | 14W Loud Sound, Deep Bass with XBASS, 16 Hrs Playtime, TWS Stereo Pairing, 52mm Driver, Splash-Resistant, Carry Strap (Black)",
    "features": [
      "Brand : Dubstep",
      "Speaker Maximum Output Power : 14 Watts",
      "Frequency Response : 20 Hz",
      "Connectivity Technology : Bluetooth",
      "Audio Output Mode : Stereo"
    ],
    "vibeeGuidance": {
      "whyBuy": "14W output aur 16 Hrs battery backup sound level ke hisaab se ₹699 par steep discount mark karti hai.",
      "verdict": "Room sound aur small outdoor trips ke liye loud bass speaker.",
      "bestFor": "Outdoor Trips & Room Music Sessions"
    }
  },
  {
    "id": 5,
    "title": "Gun Pistol Lighter Heavy Weight Metal Body Real and Original Like Gun Pistol for Decorative, Smoking Filled with Gas",
    "category": "Home",
    "price": "₹1,399.00",
    "originalPrice": "₹2,999",
    "discount": "53% OFF",
    "image": "https://i.ibb.co/qMgZb5Kg/r-Sn-Rn-ILSLDgd-MZry-ZINf-Tk-Ow-Czrxbvt-K.jpg",
    "images": [
      "https://i.ibb.co/qMgZb5Kg/r-Sn-Rn-ILSLDgd-MZry-ZINf-Tk-Ow-Czrxbvt-K.jpg",
      "https://i.ibb.co/QFWRhFZD/Jv-NUy-Bq-LSXbtu-DCg-Ouv-SQh-AIn-Rmae-Wd-E.jpg",
      "https://i.ibb.co/rKBScv5q/rh-Qlq-Xc-DLSXVy-Jqbfrd-NEMrlhx-Pfx-VLf.jpg",
      "https://i.ibb.co/C3nwByfd/ege-Wa-KPPLSXNy-Ja-Od-GWFs-KGjacpzbq-Ad.jpg",
      "https://i.ibb.co/GSSPgsx/b-Sk-YBt-GLSXUi-Ut-RHvq-Tj-Mhl-DIaa-ZVi-RZ.jpg",
      "https://i.ibb.co/fYL7S0M8/oteo-LSXHf-OZHg-ZLe-GJgyfjurm-JIDl-OXO.jpg"
    ],
    "store": "Amazon",
    "link": "https://link.amazon/B0b50YOCH",
    "expiresIn": "2 days left",
    "description": "Made from high quality Allow Metal Having a high-grade and high-quality lighter is the first smokers should take into consideration. Designed for convenience, this classic shaped refillable gas lighter is long lasting and sharp flamed. Antique design revolver pistol gun lighter.",
    "features": [
      "Colour : Z83 BLACK",
      "Material : Metal",
      "Style : Pistol",
      "Item Weight : 450 Grams",
      "Fuel Type : Butane",
      "Product Dimensions : 10L x 15W x 5Th Centimeters",
      "Number of Items : 1",
      "Net Quantity : 1.0 Count"
    ],
    "vibeeGuidance": {
      "whyBuy": "Real metal alloy build body collectible decor ke liye kaafi aesthetic look deti hai.",
      "verdict": "Unique collectible item ya showpiece gift option.",
      "bestFor": "Gifting & Home Decor Collectors"
    }
  },
  {
    "id": 11,
    "title": "NETCLICK® Men’s Sleeveless Round Neck Polycotton Tank Top Vest for Gym, Workout, Running & Casual Wear",
    "category": "Fashion",
    "price": "₹297",
    "originalPrice": "₹999",
    "discount": "70% OFF",
    "image": "https://i.ibb.co/2Y7JCHX0/41-Zt-Um-Ks9-L-SY550.jpg",
    "images": [
      "https://i.ibb.co/2Y7JCHX0/41-Zt-Um-Ks9-L-SY550.jpg",
      "https://i.ibb.co/pBwv2Ppp/71t-E5ek-I8-LL-SY741.jpg",
      "https://i.ibb.co/tT7K8Hrf/61kr-Eri2o-L-SY741.jpg",
      "https://i.ibb.co/SWJpYtN/41v0cw-Gi67-L.jpg"
    ],
    "store": "Amazon",
    "link": "https://link.amazon/B0dXMnGyq",
    "expiresIn": "",
    "description": "NETCLICK® Men’s Sleeveless Round Neck Polycotton Tank Top Vest for Gym, Workout, Running & Casual Wear",
    "features": [
      "Manufacturer : NETCLICK",
      "Packer : NETCLICK",
      "Item Weight : 200 g",
      "Item Dimensions : 24 x 20 x 20 Cm",
      "Net Quantity : 1.0 Count",
      "Generic Name : Vest",
      "Colour : Black"
    ],
    "vibeeGuidance": {
      "whyBuy": "Breathable polycotton blend workouts ke time sweat control ke liye light weight rehne mein help karta hai.",
      "verdict": "Everyday gym wear ke liye sabse affordable tank top option.",
      "bestFor": "Gym, Running & Daily Active Wear"
    }
  },
  {
    "id": 12,
    "title": "Kraasa Men’s Running Shoes | Breathable Mesh Upper | Lightweight Phylon Sole | Cushioned EVA Insole | Comfortable Sports & Casual Sneakers for Gym, Walking & Daily Use",
    "category": "Shoes",
    "price": "₹997",
    "originalPrice": "₹2,999",
    "discount": "67% OFF",
    "image": "https://i.ibb.co/4ZY2c4ds/71-GDiyx-QF-L-SX500.jpg",
    "images": [
      "https://i.ibb.co/4ZY2c4ds/71-GDiyx-QF-L-SX500.jpg",
      "https://i.ibb.co/DDVNmp6Z/71-GTg-Crm2-PL-SX500.jpg",
      "https://i.ibb.co/PGLz6Prn/71-Vh-K23ra-L-SX625.jpg",
      "https://i.ibb.co/NdL0n1Bh/71ocz-Qo-Wt-KL-SX625.jpg",
      "https://i.ibb.co/Y4GWgFJG/610a-NXla-Zh-L-SX500.jpg",
      "https://i.ibb.co/cKRG0CpF/71vdh-WAFp2-L-SX500.jpg",
      "https://i.ibb.co/3mdn4YdC/715-J-s9-ZCPL-SX625.jpg"
    ],
    "store": "Amazon",
    "link": "https://link.amazon/B089gkTtH",
    "expiresIn": "",
    "description": "Kraasa Men’s Running Shoes | Breathable Mesh Upper | Lightweight Phylon Sole | Cushioned EVA Insole | Comfortable Sports & Casual Sneakers for Gym, Walking & Daily Use",
    "features": [
      "Country of Origin : India",
      "Style : Running Shoes",
      "Material type : Knit Fabric",
      "Closure type : Lace-Up",
      "Heel type : Flat",
      "Water resistance level : Not Water Resistant",
      "Sole material : Phylon"
    ],
    "vibeeGuidance": {
      "whyBuy": "Phylon Sole + EVA Insole combo steps ko soft cushioning deta hai lightweight design ke saath.",
      "verdict": "Under ₹1,000 mein solid daily-wear running sneakers.",
      "bestFor": "Morning Walks, Gym & Daily Casual Use"
    }
  },
  {
    "id": 13,
    "title": "EvoFox One S V2 Universal 3-Mode Wireless Gaming Controller, HallSense™ Precision Joysticks, Bluetooth 5.0, 2.4GHz, Fast Type-C Charging for PC, Mobile, Android TV - Black",
    "category": "Gaming",
    "price": "₹1,599.00",
    "originalPrice": "₹2,299",
    "discount": "30% OFF",
    "image": "https://i.ibb.co/krNLRZq/617-Izh-Xu87-L-SL1500.jpg",
    "images": [
      "https://i.ibb.co/krNLRZq/617-Izh-Xu87-L-SL1500.jpg",
      "https://i.ibb.co/jk84xj4X/71s8la-Q1-YLL-SL1500.jpg",
      "https://i.ibb.co/hRv8jypJ/61-mw-Jmj1w-L-SL1500.jpg",
      "https://i.ibb.co/tPMnxKrG/71czp-Lo8-Gh-L-SL1500.jpg",
      "https://i.ibb.co/V0MPMtC3/71erl-LPs6-QL-SL1500.jpg",
      "https://i.ibb.co/7thNHFgw/71-Dy-JL-OXDL-SL1500.jpg",
      "https://i.ibb.co/HfkfvHZR/71v-Xec-QD-h-L-SL1500.jpg",
      "https://i.ibb.co/ymSy8ZYL/71un-Qm-i2b-L-SL1500.jpg",
      "https://i.ibb.co/5WmNKw22/71v-AHXQq5l-L-SL1500.jpg"
    ],
    "store": "Amazon",
    "link": "https://link.amazon/B0bmokIHl",
    "expiresIn": "",
    "description": "EvoFox One S V2 Universal 3-Mode Wireless Gaming Controller with HallSense™ Joysticks, Bluetooth 5.0, 2.4GHz, and Type-C Fast Charging.",
    "features": [
      "Batteries : 1 Lithium Ion required",
      "Item model number : One S - Black",
      "Item Weight : 220 g",
      "Dimensions : 15.5 x 11 x 7 Cm",
      "Net Quantity : 1 Count",
      "Generic Name : Gamepad"
    ],
    "vibeeGuidance": {
      "whyBuy": "Is price segment mein HallSense™ Magnetic Joysticks zero stick drift issue guarantee karte hain.",
      "verdict": "PC, Mobile aur Android TV gaming ke liye multi-device wireless controller.",
      "bestFor": "PC & Mobile Gamers"
    }
  },
  {
    "id": 14,
    "title": "DDN_R_ Portable Blender Mixer Juicer for Home | Mini Blender for Smoothies & Juices | 2-Jar Capacity (400ml*2) | 40 Watts Fruit Mixers 1500 Mah USB Rechargeable Battery | Auto Stop 40 Seconds",
    "category": "Kitchen",
    "price": "₹898.00",
    "originalPrice": "null",
    "discount": "",
    "image": "https://i.ibb.co/sJk1mgzP/61n-p-R879d-L-SL1024.jpg",
    "images": [
      "https://i.ibb.co/sJk1mgzP/61n-p-R879d-L-SL1024.jpg",
      "https://i.ibb.co/9Hy6dPSs/61skp-Pk3c0-L-SL1500.jpg",
      "https://i.ibb.co/NdJZJr2x/71e-POa-R5z-AL-SL1500.jpg",
      "https://i.ibb.co/CKrdXGj1/61m-Zp-UFyr-FL-SL1024.jpg",
      "https://i.ibb.co/236cnRGr/61r-U321-JIBL-SL1024.jpg",
      "https://i.ibb.co/Z1NZq4wJ/416-Qtv4fer-L.jpg"
    ],
    "store": "Amazon",
    "link": "https://link.amazon/B07NVxBvY",
    "expiresIn": "",
    "description": "DDN_R_ Portable Blender Mixer Juicer for Home | Mini Blender for Smoothies & Juices | 2-Jar Capacity (400ml*2) | 40 Watts Fruit Mixers 1500 Mah USB Rechargeable Battery",
    "features": [
      "Brand : DDN_R_",
      "Colour : Multicolour",
      "Special Feature : Auto Shut Off",
      "Capacity : 400 Milliliters",
      "Dimensions : 7D x 7W x 18H Centimeters",
      "Material : ABS Plastic",
      "Power Source : Battery Powered"
    ],
    "vibeeGuidance": {
      "whyBuy": "2 dual jars ke sath USB rechargeable design gym protein shakes aur travel smoothies ke liye best portablity deta hai.",
      "verdict": "On-the-go fresh juice aur protein shakes ke liye travel-friendly blender.",
      "bestFor": "Fitness Enthusiasts, Office Travelers & Daily Juicing"
    }
  },
  {
    "id": 15,
    "title": "Minimalist Marula Oil 5% Face Moisturizer For Dry Skin With Hyaluronic Acid For Deep Nourishment & Hydration, For Men & Women | 30 gm",
    "category": "Beauty",
    "price": "₹189.00",
    "originalPrice": "₹630.00",
    "discount": "70% OFF",
    "image": "https://i.ibb.co/KjGsdRjG/61-R-7-CQz-XKL-SL1500.jpg",
    "images": [
      "https://i.ibb.co/KjGsdRjG/61-R-7-CQz-XKL-SL1500.jpg"
    ],
    "store": "Amazon",
    "link": "https://link.amazon/B0cneyzdK",
    "expiresIn": "",
    "description": "Minimalist Marula Oil 5% Face Moisturizer For Dry Skin With Hyaluronic Acid For Deep Nourishment & Hydration, For Men & Women | 30 gm",
    "features": [
      "Brand : Minimalist",
      "Item Volume : 0.03 Kilograms",
      "Age Range : Adult",
      "Special Feature : Unscented",
      "Skin Type : All / Dry",
      "Net Quantity : 30.0 Grams"
    ],
    "vibeeGuidance": {
      "whyBuy": "Marula Oil + Hyaluronic Acid combination dry skin barrier ko repair karne mein effectively work karta hai.",
      "verdict": "Fragrance-free safe ingredient formulation for intense hydration.",
      "bestFor": "Dry Skin Care & Daily Hydration"
    }
  },
  {
    "id": 6,
    "title": "GRAPHENE 1:32 Scale DieCast Metal Toy Car Pull Back Action Openable Doors 4x4 Thar/Jeep Premium Car Toy Light Music for Kids Realistic Miniature Model Best Gift 2+yrs Girls Boys Random Colors",
    "category": "TOYS & GAMES",
    "price": "₹329.00",
    "originalPrice": "₹999",
    "discount": "67% OFF",
    "image": "https://i.ibb.co/Fqyv3jBr/51p-Git1u-TFL-SL1280.jpg",
    "images": [
      "https://i.ibb.co/Fqyv3jBr/51p-Git1u-TFL-SL1280.jpg",
      "https://i.ibb.co/fbfRrdt/71f-PAa-If77-L-SL1500.jpg",
      "https://i.ibb.co/JR4X9sgn/81n9-KSRat-UL-SL1500.jpg",
      "https://i.ibb.co/HpBbjZrv/711-Zriyn-NBL-SL1500.jpg",
      "https://i.ibb.co/Vcsm3j66/71-Ih5-LQe-WL-SL1500.jpg",
      "https://i.ibb.co/7xHcJJWj/61g-Ehh-U2dt-L-SL1280.jpg",
      "https://i.ibb.co/MDFbWj0L/612kj-G6h-QRL-SL1080.jpg",
      "https://i.ibb.co/zhvfVQTy/815vn37-Y4-TL-SL1500.jpg",
      "https://i.ibb.co/Z62zmsqF/81-NZC97-Al2-L-SL1500.jpg"
    ],
    "store": "Amazon",
    "link": "https://link.amazon/B03Cg6I2d",
    "expiresIn": "",
    "promoCode": "",
    "description": "GRAPHENE 1:32 Scale DieCast Metal Toy Car Pull Back Action Openable Doors 4x4 Thar/Jeep Premium Car Toy Light Music for Kids Realistic Miniature Model Best Gift 2+yrs Girls Boys Random Colors",
    "features": [
      "Brand : GRAPHENE",
      "Age Range Description : 2+ Kid and toddlers",
      "Country of Origin : India",
      "Unit Count : 1 Count"
    ],
    "vibeeGuidance": {
      "whyBuy": "DieCast metal body build + lights aur sound effects 69% discount price par super sturdy feel dete hain.",
      "verdict": "Kids ke birthday gift ya desk die-cast collectible ke liye ideal.",
      "bestFor": "Kids Gifting & Die-cast Model Collectors"
    }
  },
  {
    "id": 18,
    "title": "AGARO Spark 20000 mAh Compact Power Bank, 45W PD & 22.5W QC Output for Smartphones, Portable, USB A & PD Output, USB C Input, Superfast Charge Technology for Android, iPhones, Tablets & Headphones",
    "category": "Electronics",
    "price": "₹2,399.00",
    "originalPrice": "₹4,599",
    "discount": "48% OFF",
    "image": "https://m.media-amazon.com/images/I/41jTxMHqYYL._AC_SL1500_.jpg",
    "images": [
      "https://m.media-amazon.com/images/I/41jTxMHqYYL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/41HpVo9aFdL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/41+K8eyA1oL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/41y0QIIu3GL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/41rZRPrY9jL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/51YJA8hsqvL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81vQsBZAA7L._AC_SL1500_.jpg"
    ],
    "store": "Amazon",
    "link": "https://www.amazon.in/dp/B0GL6ZMSX3?tag=Kishuxfit-21",
    "expiresIn": "",
    "description": "Protect From Short Circuit, Over Temperature, Over Voltage, Over Current. Can Charger three devices Simultaneously. 45W Quick Charging...",
    "features": [
      "Protect From Short Circuit, Over Temperature, Over Voltage, Over Current",
      "Can Charger three devices Simultaneously",
      "45W Quick Charging"
    ],
    "vibeeGuidance": {
      "whyBuy": "Aaj kal ke fast-paced lifestyle mein multiple power-hungry devices (laptops, flagship phones) ko ek saath charge karna sabse badi dikkat hai. ₹2,399 mein 45W PD support milna rare hai—is price point par yeh aapko travel ya power cuts ke waqt bina wall socket ke laptop aur phone dono ko fast-charge karne ki freedom deta hai.",
      "deepReview": "20000mAh ki massive battery capacity ke bawajood AGARO Spark ka physical footprint kaafi compact hai, jo ise backpack ya side-pocket mein easily fit kar deta hai. Iska 45W Power Delivery (PD) Type-C port MacBooks, iPads aur flagship Type-C devices ko fast power surge deta hai, jabki 22.5W QC USB-A port secondary devices ko Quick Charge karta hai. Multi-layer safety architecture over-heating aur voltage fluctuation se aapke mehenge gadgets ko safeguard karta hai, aur simultanous 3-device charging feature multi-device setups ke liye ek solid performer hai.",
      "expertTips": "Is power bank se 45W ki full speed lene ke liye humesha E-Marker rated Type-C to Type-C cable ka istemaal karein. Saath hi, power bank ko khud jaldi recharge karne ke liye kam se kam 30W ya usse upar ka PD wall charger use karein.",
      "verdict": "Agar aapko eklauti compact device chahiye jo aapke laptop, tablet aur phone teeno ko ek saath rapid-charge kar sake, toh yeh segment-best buy hai.",
      "bestFor": "Frequent Business Travelers, Remote Working Professionals, Tech Enthusiasts & Daily Commuters"
    }
  }
];