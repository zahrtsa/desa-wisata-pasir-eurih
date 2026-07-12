"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link"; 
import Image from "next/image"; // ── 1. IMPORT NEXT/IMAGE DI SINI ──
import { 
  Home, Calendar, Users, ShieldCheck, Sparkles, 
  ArrowRight, MessageCircle, Droplet, Coffee, Heart, BedDouble, ChevronLeft, ChevronRight
} from "lucide-react";

// ── IMPORT DATA FOTO DARI FILE EKSTERNAL ──
import homestayImages from "@/data/homestay.json"; 

// ── DATA STATIS (Dipindahkan ke luar komponen agar hemat memori & mencegah re-render) ──
const FASILITAS_LIST = [
  { key: "cuciTangan", title: "Tempat Cuci Tangan Air Mengalir", desc: "Tersedia di area luar ruangan untuk menjaga kebersihan higienis sebelum masuk penginapan." },
  { key: "wastafel", title: "Fasilitas Wastafel", desc: "Wastafel bersih terstandar di setiap unit akomodasi lengkap dengan sanitasi air bersih." },
  { key: "standProduk", title: "Stand Produk", desc: "Area display kerajinan dan UMKM warga desa untuk memudahkan berbelanja oleh-oleh." },
  { key: "sekretariat", title: "Sekretariat Desa", desc: "Pusat informasi dan pelayanan terpadu bagi wisatawan selama menginap." }
];

const BASE_PRICES = {
  pesanggrahan: 350000, 
  warga: 150000         
};

export default function HomestayDesaPage() {
  const [stayType, setStayType] = useState("pesanggrahan"); 
  const [nights, setNights] = useState(1);
  const [guests, setGuests] = useState(2);
  const [activeTab, setActiveTab] = useState("detail");
  const [currentFasilitasIndex, setCurrentFasilitasIndex] = useState(0);

  // Efek Auto-Play Slider (Sekarang aman dan bersih dari dependency issue)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFasilitasIndex((prevIndex) => (prevIndex + 1) % FASILITAS_LIST.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []); 

  const totalCost = BASE_PRICES[stayType] * nights;

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(num);
  };

  const generateWaText = () => {
    const typeLabel = stayType === "pesanggrahan" ? "Rumah Pesanggrahan Adat (Paket Sawengi)" : "Homestay Rumah Warga (Paket Mulih Ka Lembur)";
    const rawMessage = `Halo Admin Desa Wisata Pasir Eurih,\n\nSaya ingin memesan akomodasi penginapan dengan rincian berikut:\n- Tipe Penginapan: ${typeLabel}\n- Durasi Menginap: ${nights} malam\n- Jumlah Tamu: ${guests} orang\n- Estimasi Total Biaya: ${formatRupiah(totalCost)}\n\nMohon info ketersediaan kamar pada tanggal terdekat. Terima kasih!`;
    return encodeURIComponent(rawMessage);
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen font-sans antialiased text-[#1A2616] pb-32 relative">
      
      {/* ── BACKGROUND DECORATIVE ELEMENTS ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} className="absolute top-24 right-12 w-64 h-64 bg-amber-200/10 rounded-full blur-3xl" />
        <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }} className="absolute top-1/2 left-8 w-80 h-80 bg-emerald-200/10 rounded-full blur-3xl" />
      </div>

      {/* ── HERO HEADER ── */}
      <section className="relative bg-[#1A2616] text-white px-6 py-20 md:py-28 text-left overflow-hidden border-b-4 border-amber-500/20">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />
        
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 backdrop-blur-md text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl border border-amber-400/30">
              <Sparkles size={14} className="animate-pulse" /> LIVING IN THE VILLAGE
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white">
              Akomodasi <span className="text-amber-400 font-serif italic">Otentik</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-amber-200">Pasir Eurih</span>
            </h1>
            <p className="text-stone-300 text-sm md:text-base max-w-xl font-normal leading-relaxed">
              Rasakan damainya tidur berselimut kabut gunung di Desa Pasir Eurih. Pilih antara keheningan eksotis Rumah Pesanggrahan Adat dengan pancuran air pegunungan, atau kehangatan tinggal langsung bersama keluarga warga lokal.
            </p>
          </div>
          
          {/* Kalkulator widget */}
          <div className="lg:col-span-5 bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl relative">
            <div className="absolute -top-3 -right-3 bg-amber-500 text-black font-black text-[10px] px-2.5 py-1 rounded-md rotate-6 shadow-lg animate-bounce">BOOKING INSTAN!</div>
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2 mb-1"><Home size={14} /> KALKULATOR RESERVASI</h3>
            <p className="text-[11px] text-stone-300 mb-6">Tentukan jenis kamar & durasi menginap Anda:</p>
            
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-2">Tipe Penginapan</span>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setStayType("pesanggrahan")} className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${stayType === "pesanggrahan" ? "bg-amber-500 border-amber-500 text-black font-bold" : "bg-stone-900/40 border-white/10 text-white hover:bg-stone-800"}`}>
                    <div className="text-[11px] flex items-center gap-1"><Home size={12}/> Pesanggrahan</div>
                    <div className="text-[10px] opacity-85">{formatRupiah(BASE_PRICES.pesanggrahan)}/malam</div>
                  </button>
                  <button onClick={() => setStayType("warga")} className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${stayType === "warga" ? "bg-amber-500 border-amber-500 text-black font-bold" : "bg-stone-900/40 border-white/10 text-white hover:bg-stone-800"}`}>
                    <div className="text-[11px] flex items-center gap-1"><Users size={12}/> Rumah Warga</div>
                    <div className="text-[10px] opacity-85">{formatRupiah(BASE_PRICES.warga)}/malam</div>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                  <span>Durasi Menginap</span><span className="text-amber-400 font-mono text-xs">{nights} Malam</span>
                </div>
                <input type="range" min="1" max="14" value={nights} onChange={(e) => setNights(parseInt(e.target.value))} className="w-full accent-amber-500 bg-stone-800 rounded-lg appearance-none h-1 cursor-pointer" />
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                  <span>Jumlah Tamu</span><span className="text-amber-400 font-mono text-xs">{guests} Orang</span>
                </div>
                <input type="range" min="1" max="10" value={guests} onChange={(e) => setGuests(parseInt(e.target.value))} className="w-full accent-amber-500 bg-stone-800 rounded-lg appearance-none h-1 cursor-pointer" />
              </div>

              <div className="bg-stone-950/60 p-3 rounded-2xl border border-white/10 flex justify-between items-center mt-4">
                <div>
                  <span className="text-[9px] text-stone-400 uppercase tracking-wider block">Estimasi Total Biaya</span>
                  <span className="text-lg font-black text-amber-400">{formatRupiah(totalCost)}</span>
                </div>
                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={`https://wa.me/6281234567890?text=${generateWaText()}`} target="_blank" rel="noopener noreferrer" className="bg-amber-500 text-black text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg">
                  <MessageCircle size={14} /> <span>Pesan via WA</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BREADCRUMB ── */}
      <div className="max-w-6xl mx-auto px-6 pt-8 text-xs text-stone-500 flex gap-2">
        <Link href="/" className="hover:text-[#2D3E25]">Beranda</Link><span>/</span>
        <span className="font-semibold text-stone-800">Fasilitas</span><span>/</span>
        <span className="font-semibold text-[#2D3E25]">Homestay Desa</span>
      </div>

      {/* ── BENTO CONTENT LAYOUT ── */}
      <main className="max-w-6xl mx-auto px-6 mt-8 space-y-12">
        
        {/* INTERACTIVE COMPONENT: ROOM SPECIFICATION EXPLORER */}
        <div className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-stone-100 pb-6">
            <div>
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Interactive Inspector</span>
              <h3 className="text-xl md:text-2xl font-black text-[#1A2616] tracking-tight">Kamar & Fasilitas Internal</h3>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setActiveTab("detail")} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === "detail" ? "bg-[#2D3E25] text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}>
                Kamar Adat Pesanggrahan
              </button>
              <button onClick={() => setActiveTab("warga")} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === "warga" ? "bg-[#2D3E25] text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}>
                Kamar Homestay Warga
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "detail" ? (
              <motion.div key="detail" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 rounded-full flex items-center gap-1"><BedDouble size={12}/> Kasur Pandan Tradisional</span>
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 rounded-full flex items-center gap-1"><Droplet size={12}/> Pancuran Nyang Kokot</span>
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full flex items-center gap-1"><Coffee size={12}/> Sarapan Tradisional</span>
                  </div>
                  <h4 className="text-xl font-bold">Rumah Pesanggrahan (Paket Sawengi)</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">{homestayImages.pesanggrahanDetail.caption}. Dirancang dengan dinding bilik bambu anyaman premium dan ranjang kayu berbalut kelambu tipis penangkal serangga alami.</p>
                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="bg-stone-50 p-3 rounded-xl border border-stone-100"><span className="font-bold text-[#2D3E25] block">Kapasitas Maksimal</span><span className="text-stone-500">Hingga 15 Orang</span></div>
                    <div className="bg-stone-50 p-3 rounded-xl border border-stone-100"><span className="font-bold text-[#2D3E25] block">Tipe Tempat Tidur</span><span className="text-stone-500">Lesehan Kasur Kapuk Alami</span></div>
                  </div>
                </div>
                {/* ── 2. EDIT IMG MENJADI COMPONENT NEXT/IMAGE ── */}
                <div className="md:col-span-5 overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 h-72 md:h-80 group relative">
                  <Image src={homestayImages.pesanggrahanDetail.src} alt={homestayImages.pesanggrahanDetail.alt} fill className="object-cover object-center transition-transform duration-500 group-hover:scale-103" />
                </div>
              </motion.div>
            ) : (
              <motion.div key="warga" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 rounded-full flex items-center gap-1"><BedDouble size={12}/> Kamar Tidur Standar Rumah</span>
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-pink-50 text-pink-700 border border-pink-100 rounded-full flex items-center gap-1"><Heart size={12}/> Sambutan Keluarga Hangat</span>
                  </div>
                  <h4 className="text-xl font-bold">Homestay Warga (Mulih Ka Lembur)</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">{homestayImages.wargaDetail.caption}. Rasakan kehangatan pulang ke kampung halaman yang sesungguhnya. Menginap di salah satu dari rumah penduduk lokal yang terstandarisasi.</p>
                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="bg-stone-50 p-3 rounded-xl border border-stone-100"><span className="font-bold text-[#2D3E25] block">Kapasitas Maksimal</span><span className="text-stone-500">2 - 4 Orang per Kamar</span></div>
                    <div className="bg-stone-50 p-3 rounded-xl border border-stone-100"><span className="font-bold text-[#2D3E25] block">Layanan Tambahan</span><span className="text-stone-500">Sarapan Masakan Tuan Rumah</span></div>
                  </div>
                </div>
                {/* ── 3. EDIT IMG MENJADI COMPONENT NEXT/IMAGE ── */}
                <div className="md:col-span-5 overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 h-72 md:h-80 group relative">
                  <Image src={homestayImages.wargaDetail.src} alt={homestayImages.wargaDetail.alt} fill className="object-cover object-center transition-transform duration-500 group-hover:scale-103" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* BENTO GRID */}
        <div className="grid md:grid-cols-12 gap-6">
          
          {/* Card 1: Rumah Pesanggrahan Adat (8 Kolom) */}
          <div className="md:col-span-8 bg-white border border-stone-200 rounded-[2rem] p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100 inline-block">💡 Estetika Arsitektur</span>
              <h2 className="text-2xl md:text-3xl font-black text-[#1A2616] tracking-tight">Keunikan Fisik Rumah Pesanggrahan</h2>
              <p className="text-xs md:text-sm text-stone-600 leading-relaxed">{homestayImages.arsitekturHero.caption}. Terbuat sepenuhnya dari anyaman bambu hitam halus dan beratapkan rumbia rimbun.</p>
            </div>
            {/* ── 4. EDIT IMG MENJADI COMPONENT NEXT/IMAGE ── */}
            <div className="mt-8 h-48 relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-100">
              <Image src={homestayImages.arsitekturHero.src} alt={homestayImages.arsitekturHero.alt} fill className="object-cover" />
            </div>
          </div>

          {/* Card 2: Pancuran Nyang Kokot (4 Kolom) */}
          <div className="md:col-span-4 bg-[#2D3E25] text-white rounded-[2rem] p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="p-2.5 bg-white/10 rounded-xl w-fit text-amber-400"><Droplet size={18} /></div>
              <h3 className="text-lg font-bold tracking-tight">Pancuran Nyang Kokot</h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light">Sensasi mandi segar air pegunungan tanpa filter kimia. Aliran airnya sangat dingin, jernih, dan terus-menerus mengalir langsung dari mata air pedesaan.</p>
            </div>
            <div className="border-t border-white/10 pt-4 mt-6">
              <span className="text-[9px] font-mono tracking-widest text-amber-400 block uppercase font-bold">FAKTA UNIK</span>
              <p className="text-xs italic text-stone-200 mt-1">{"\"Disediakan penampungan bak mandi tradisional dengan gayung batok kelapa bagi pengunjung.\""}</p>
            </div>
          </div>

          {/* Card 3: Kehangatan Warga (4 Kolom) */}
          <div className="md:col-span-4 bg-white border border-stone-200 rounded-[2rem] p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-100 inline-block">🌾 Mulih Ka Lembur</span>
              <h3 className="text-xl font-extrabold text-[#1A2616] tracking-tight">Tradisi Guyub Warga</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{homestayImages.tradisiWarga.caption}. Ikut makan lesehan nasi hangat beralas daun pisang bersama pemilik rumah.</p>
            </div>
            {/* ── 5. EDIT IMG MENJADI COMPONENT NEXT/IMAGE ── */}
            <div className="mt-6 h-36 relative overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
              <Image src={homestayImages.tradisiWarga.src} alt={homestayImages.tradisiWarga.alt} fill className="object-cover" />
            </div>
          </div>

          {/* Card 4: Carousel Fasilitas Umum Terpadu (8 Kolom) */}
          <div className="md:col-span-8 bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between shadow-xs relative overflow-hidden group">
            <div className="grid md:grid-cols-12 gap-6 items-center">
              
              <div className="md:col-span-6 flex flex-col justify-between h-full space-y-4">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-orange-50 text-orange-800 border border-orange-100 inline-block">
                    🛠️ Fasilitas Umum Terpadu
                  </span>
                  <h3 className="text-xl font-black text-[#1A2616] tracking-tight">Fasilitas Bersama Desa Wisata</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">Klik menu di bawah ini untuk melihat detail infrastruktur penunjang kenyamanan tinggal Anda.</p>
                </div>

                <div className="flex flex-col gap-1.5 pt-2">
                  {FASILITAS_LIST.map((item, index) => (
                    <button
                      key={item.key}
                      onClick={() => setCurrentFasilitasIndex(index)}
                      className={`py-2.5 px-3 rounded-xl text-left text-[11px] font-bold border transition-all cursor-pointer flex items-center justify-between ${currentFasilitasIndex === index ? "bg-[#2D3E25] text-white border-[#2D3E25] shadow-xs" : "bg-stone-50 text-stone-600 border-stone-200/70 hover:bg-stone-100"}`}
                    >
                      <span>{item.title}</span>
                      {currentFasilitasIndex === index && <motion.div layoutId="activeIndicator" className="w-1.5 h-1.5 bg-amber-400 rounded-full" />}
                    </button>
                  ))}
                </div>

                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/60 min-h-[70px]">
                  <p className="text-[11px] text-stone-600 leading-relaxed italic">
                    {"\""}{FASILITAS_LIST[currentFasilitasIndex].desc}{"\""}
                  </p>
                </div>
              </div>

              <div className="md:col-span-6">
                <div className="w-full aspect-square relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-sm">
                  {/* ── 6. EDIT MOTION.IMG MENJADI COMPONENT NEXT/IMAGE DI BUNGKUS MOTION ── */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentFasilitasIndex}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Image
                        src={homestayImages[FASILITAS_LIST[currentFasilitasIndex].key].src}
                        alt={homestayImages[FASILITAS_LIST[currentFasilitasIndex].key].alt}
                        fill
                        className="object-cover object-center"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
                    <button 
                      onClick={() => setCurrentFasilitasIndex((prev) => (prev === 0 ? FASILITAS_LIST.length - 1 : prev - 1))}
                      className="p-1.5 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md transition-all cursor-pointer pointer-events-auto backdrop-blur-xs"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      onClick={() => setCurrentFasilitasIndex((prev) => (prev + 1) % FASILITAS_LIST.length)}
                      className="p-1.5 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md transition-all cursor-pointer pointer-events-auto backdrop-blur-xs"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1 z-10">
                    {FASILITAS_LIST.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`h-1.5 rounded-full transition-all duration-300 ${currentFasilitasIndex === idx ? "w-3.5 bg-white" : "w-1.5 bg-white/60"}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ── FOOTER RESERVASI ── */}
        <div className="bg-white border border-stone-200 rounded-[2rem] p-8 md:p-10 shadow-2xs grid lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-5">
            <h3 className="text-lg font-black text-[#1A2616] tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#2D3E25] rounded-full block" />
              Informasi Penting Sebelum Menginap
            </h3>
            <div className="grid sm:grid-cols-3 gap-6 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#2D3E25]"><Calendar size={14}/> Waktu Booking</div>
                <p className="text-[11px] text-stone-500 leading-relaxed font-light">Disarankan memesan H-5 agar pemilik rumah dapat mempersiapkan akomodasi dengan prima.</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#2D3E25]"><Users size={14}/> Perlengkapan Mandi</div>
                <p className="text-[11px] text-stone-500 leading-relaxed font-light">Kami mengutamakan konsep ramah lingkungan, disarankan membawa perlengkapan mandi pribadi.</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#2D3E25]"><ShieldCheck size={14}/> Adat Istiadat</div>
                <p className="text-[11px] text-stone-500 leading-relaxed font-light">Mohon menghormati nilai kekeluargaan, kesopanan, dan peraturan adat setempat selama menginap.</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1A2616] text-white rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-bold text-amber-400 font-mono tracking-wider">HARGA KHUSUS ROMBONGAN</div>
              <p className="text-[11px] text-stone-300 leading-relaxed font-light">Menerima rombongan besar sekolah, instansi, atau komunitas riset dengan kapasitas khusus.</p>
            </div>
            <motion.a
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo Admin, saya ingin bertanya info penginapan rombongan.`)}`}
              target="_blank" rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <MessageCircle size={14} /> <span>Tanyakan Tarif Rombongan</span> <ArrowRight size={12} />
            </motion.a>
          </div>
        </div>

      </main>

    </div>
  );
}