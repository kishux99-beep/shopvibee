import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/logo-dark.png';
import { FaShieldAlt, FaCheckCircle, FaAward, FaUserCheck, FaArrowLeft, FaLightbulb, FaDumbbell, FaBookOpen, FaChartLine, FaHandshake } from 'react-icons/fa';

export default function ExpertsPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col justify-between">
      <div>
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <Image src={logo} alt="ShopVibee Logo" className="h-10 sm:h-12 w-auto object-contain" priority />
            </Link>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3.5 py-2 rounded-xl transition"
            >
              <FaArrowLeft /> Back to Home
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          
          {/* Top Badge & Title */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full border border-indigo-100 inline-flex items-center gap-1.5 shadow-xs">
              <FaAward className="text-indigo-600" /> Editorial Leadership, Transparency & Research Standards
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mt-4 tracking-tight leading-tight">
              Meet the Expert Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">ShopVibee</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-4 leading-relaxed">
              Transparency, rigorous technical evaluation, and uncompromised consumer value. Discover how ShopVibee is redefining smart shopping through expert-led curation and strict editorial integrity.
            </p>
          </div>

          {/* Founder Profile Card with Circular Photo */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="flex flex-col items-center text-center md:border-r border-gray-100 md:pr-8">
              <div className="relative w-36 h-36 rounded-full overflow-hidden shadow-2xl mb-4 border-4 border-indigo-600/20 bg-gray-100 flex items-center justify-center">
                <img 
                  src="https://i.ibb.co/HDrRc79w/Whats-App-Image-2026-09-18-at-10-22-46-PM.jpg" 
                  alt="Krish Singhaniya (KishuxFit)" 
                  className="w-full h-full object-cover object-top hover:scale-105 transition duration-500"
                />
              </div>
              <h3 className="text-lg font-black text-gray-900">Krish Singhaniya🔱</h3>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3.5 py-1 rounded-full mt-1">
                KishuxFit (Founder & Lead Curator)
              </span>
            </div>

            <div className="md:col-span-2 space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
              <p>
                Hello! Main hoon <strong className="text-gray-900 font-bold">Krish Singhaniya</strong>, jise online digital community aur fitness circles mein <strong className="text-indigo-600">KishuxFit</strong> ke naam se jaana jata hai. Main ek active online fitness content creator, supplement researcher, aur consumer e-commerce curator hoon.
              </p>
              <p>
                Maine fitness supplements aur consumer tech ki duniya mein saalo ki gehri field research ke baad <strong className="text-gray-900 font-bold">ShopVibee.in</strong> ki neev rakhi. Mera mukhy uddeshya aam online shoppers ko un fuzul, misleading aur over-hyped advertisements se bachana hai jahan log kam quality ke products par apni mehnat ki kamayi zaya kar dete hain.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <span className="bg-gray-50 border border-gray-200 px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1">
                  <FaUserCheck className="text-emerald-600" /> Verified Expert
                </span>
                <span className="bg-gray-50 border border-gray-200 px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1">
                  <FaShieldAlt className="text-indigo-600" /> 100% Unbiased Curation
                </span>
              </div>
            </div>
          </div>

          {/* Comprehensive 1000+ Words Professional Article Section */}
          <article className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-10 space-y-8 text-gray-800 leading-relaxed text-xs sm:text-sm">
            
            <div className="border-b border-gray-100 pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md">
                In-Depth Editorial Manifesto
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-3">
                The Journey of Krish Singhaniya (KishuxFit) & The Philosophy Behind ShopVibee
              </h2>
            </div>

            {/* Section 1 */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                <FaBookOpen className="text-indigo-600" /> 1. The Genesis: From Fitness Content Creation to Consumer Advocacy
              </h3>
              <p>
                Digital content creation aur fitness coaching ke safar ke dauran, <strong className="text-gray-900 font-bold">Krish Singhaniya (KishuxFit)</strong> ne yeh mehsoos kiya ki aaj ke waqt mein internet par information ki kami nahi hai—balki asal samasya yeh hai ki authentic, un-biased aur reliable jankari kahan mile. Jab ek fitness enthusiast apna pehla Whey Protein, Creatine, ya pre-workout kharidne nikalta hai, ya jab ek student apna pehla budget laptop ya audio gear talashta hai, toh use hazaron sponsored ads aur paid reviews ka samna karna padta hai.
              </p>
              <p>
                Yahi se <strong className="text-gray-900 font-bold">ShopVibee.in</strong> ka vichar janma. Krish ka lakshya ek aisa transparent platform banana tha jo sirf ek generic deals site na ho, balki ek aisi authoritative guide ho jahan har ek product ki utility, pricing patterns, aur manufacturing standards ko technical nazariye se parakha jaye.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                <FaChartLine className="text-indigo-600" /> 2. Overcoming the "Thin Content" Challenge in E-Commerce Aggregation
              </h3>
              <p>
                Aaj ke digital yug mein search engines aur affiliate networks (jaise Amazon Associates) ke liye "thin content" ya low-quality aggregators ek bada mudda ban chuke hain. Bahut si websites bina kisi research ke kewal automatic product links copy-paste karti hain. ShopVibee is daure se bilkul alag khadi hai. 
              </p>
              <p>
                Krish aur unki editorial approach yeh ensure karti hai ki ShopVibee par publish hone wala har ek product—chahe woh high-performance electronics hon ya daily-use wellness supplements—deep-dive research ke daur se guzre. Hum har product ke liye <code className="bg-gray-100 text-indigo-600 px-1.5 py-0.5 rounded font-mono text-xs">whyBuy</code>, <code className="bg-gray-100 text-indigo-600 px-1.5 py-0.5 rounded font-mono text-xs">deepReview</code>, aur <code className="bg-gray-100 text-indigo-600 px-1.5 py-0.5 rounded font-mono text-xs">expertTips</code> jaise parameters generate karte hain, taaki user ko kharidari karne se pehle poori clarity mil sake.
              </p>
            </div>

            {/* Section 3 - Highlight Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-purple-50/50 to-pink-50/50 border border-indigo-100 space-y-3">
              <h4 className="font-extrabold text-indigo-900 text-sm sm:text-base flex items-center gap-2">
                <FaAward className="text-indigo-600" /> Krish's Core Editorial Pledge
              </h4>
              <p className="text-gray-700 italic">
                "Ek consumer ka hard-earned money aur unka trust sabse upar hai. ShopVibee par hum kabhi bhi kisi aisi deal ko promote nahi karte jise hum khud ya hamari community apne personal use ke liye recommend na karein. Hamari credibility hi hamari sabse badi asset hai." 
              </p>
              <p className="text-right text-xs font-bold text-gray-900 not-italic">— Krish Singhaniya 🪶(KishuxFit)</p>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                <FaLightbulb className="text-amber-500" /> 3. Rigorous Research & Multi-Tier Testing Methodology
              </h3>
              <p>
                ShopVibee par kisi bhi deal ko live karne ke liye ek strict screening process se guzarna padta hai:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><strong className="text-gray-900">Price History & Discount Authenticity:</strong> Hum check karte hain ki kya real-time discount genuine hai ya prices ko pehle inflate karke dikhaya gaya hai.</li>
                <li><strong className="text-gray-900">Material & Build Quality Evaluation:</strong> Electronics aur wearable tech ke case mein durability, battery backup, aur user convenience ko evaluate kiya jata hai.</li>
                <li><strong className="text-gray-900">Supplement Purity & Lab Testing Standards:</strong> Fitness supplements ke maamle mein lab-test reports, ingredient transparency, aur user reviews ko primary importance di jati hai.</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                <FaHandshake className="text-indigo-600" /> 4. Affiliate Transparency & Ethical Monetization
              </h3>
              <p>
                Hum is baat mein poora vishwas rakhte hain ki hamare readers ko yeh pata hona chahiye ki website kaise run hoti hai. ShopVibee authorized affiliate partnerships (jaise Amazon Associates aur verified brand sponsors) ke madhyam se monetize hoti hai. Jab aap hamare links ke zariye koi verified product purchase karte hain, toh hamein bina aapke price par koi extra bojh daale ek chota sa commission milta hai. Yeh commission hamein site ko maintain karne, server costs chalane, aur naye verified deals research karne ki shakti deta hai.
              </p>
              <p>
                Hamari yeh commitment hai ki affiliate partnership kabhi bhi hamare editorial judgment ko affect nahi karegi. Agar koi product substandard hai, toh kitna bhi commission ho, woh ShopVibee par jagah nahi pa sakta.
              </p>
            </div>

          </article>

          {/* Editorial Guidelines & Standards Box */}
          <div className="bg-gradient-to-br from-indigo-900 via-gray-900 to-purple-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-6">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
              <FaCheckCircle className="text-emerald-400" /> Summary of Our Strict Editorial Standards
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-300">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <strong className="text-white block mb-1 font-bold">🔍 Real-World Utility Focus</strong>
                Hum sirf discount percentage nahi dekhte, balki yeh dekhte hain ki product customer ki real-world problem kitni behtar tarike se solve karta hai.
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <strong className="text-white block mb-1 font-bold">🛡️ Secure Affiliate Integrity</strong>
                ShopVibee trusted affiliate networks jaise Amazon Associates ke sath partnered hai, taaki aapko hamesha 100% safe aur verified redirection mile.
              </div>
            </div>
          </div>

        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 mt-12 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} ShopVibee. All rights reserved. Curated with precision by Krish Singhaniya (KishuxFit).</p>
      </footer>
    </div>
  );
}