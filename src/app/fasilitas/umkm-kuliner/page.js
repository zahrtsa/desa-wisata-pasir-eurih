"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  ShoppingBag, Sparkles, MessageCircle, 
  Utensils, Plus, Minus, Video, Cookie
} from "lucide-react";

// ── EKSTRAKSI DATA DENGAN ES6 IMPORT ──
import rawData from "@/data/umkm.json";

const umkmProducts = rawData?.umkmProducts || [];
const sectionImages = rawData?.sectionImages || {};

export default function UmkmKulinerPage() {
  const [filter, setFilter] = useState("all");
  const [cart, setCart] = useState({});

  // ── CONTACT PERSON KHUSUS UMKM & KULINER (PAK YAYA) ──
  const PHONE_PAK_YAYA = "6285695146164"; // Sesuaikan jika ada nomor WA Pak Yaya yang berbeda

  const addToCart = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (copy[id] <= 1) {
        delete copy[id];
      } else {
        copy[id]--;
      }
      return copy;
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const item = umkmProducts.find((p) => p.id === id);
      return total + (item ? item.price * qty : 0);
    }, 0);
  };

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(num);
  };

  const generateWaText = () => {
    const itemsText = Object.entries(cart)
      .map(([id, qty]) => {
        const item = umkmProducts.find((p) => p.id === id);
        return item ? `- ${item.title} (x${qty}) : ${formatRupiah(item.price * qty)}` : "";
      })
      .filter(Boolean)
      .join("\n");

    const rawMessage = `Sampurasun Pak Yaya,\n\nSaya tertarik untuk memesan produk/kuliner Desa Wisata Pasir Eurih berikut:\n\n${itemsText}\n\n*Estimasi Total Pesanan: ${formatRupiah(getCartTotal())}*\nMohon info ketersediaan stok & tata cara pemesanan. Terima kasih!`;
    return encodeURIComponent(rawMessage);
  };

  const filteredProducts = filter === "all" 
    ? umkmProducts 
    : umkmProducts.filter((p) => p.category === filter);

  const miniGalleryItems = umkmProducts.filter((p) => p && p.image && p.image.includes("frame_"));
  const circleClusterItems = umkmProducts.filter((p) => p && p.isCircle === true);

  const kioskGalleryImages = sectionImages.galeriKios?.images || [
    "/images/fasilitas/umkm/galeri-kios-1.jpg",
    "/images/fasilitas/umkm/galeri-kios-2.jpg",
    "/images/fasilitas/umkm/galeri-kios-3.jpg",
    "/images/fasilitas/umkm/galeri-kios-4.jpg"
  ];

  return (
    <div className="bg-[#FAF6F0] min-h-screen font-sans antialiased text-[#1A2616] pb-32 relative">
      
      {/* ── BACKGROUND ORNAMENTAL LIGHT SHAPES ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ y: [0, -15, 0] }} 
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} 
          className="absolute top-24 right-12 w-64 h-64 bg-amber-200/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ y: [0, 15, 0] }} 
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }} 
          className="absolute top-1/2 left-8 w-80 h-80 bg-emerald-200/10 rounded-full blur-3xl" 
        />
      </div>

      {/* ── HERO HEADER ── */}
      <section className="relative bg-[#1A2616] text-white px-6 py-20 md:py-28 text-left overflow-hidden border-b-4 border-amber-500/20">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />
        
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 backdrop-blur-md text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl border border-amber-400/30">
              <Sparkles size={14} className="animate-pulse" /> LOCAL CRAFTSMANSHIP & CULINARY
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white">
              Sentra <span className="text-amber-400 font-serif italic">UMKM</span> & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-amber-200">Kuliner Tradisional</span>
            </h1>
            <p className="text-stone-300 text-sm md:text-base max-w-xl font-normal leading-relaxed">
              Selamat datang di pusat kreativitas Pasir Eurih, Tamansari, Bogor. Temukan sejarah legendaris kerajinan alas kaki kulit tertua Bogor, nikmati segarnya minuman tradisional <strong>Pla Plus</strong>, hidangan khas pawon Sunda, dan dukung kelangsungan ekonomi para pengrajin lokal kami.
            </p>
          </div>

          <div className="lg:col-span-5 bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl relative">
            <div className="absolute -top-3 -right-3 bg-amber-500 text-black font-black text-[10px] px-2.5 py-1 rounded-md rotate-6 shadow-lg animate-bounce">
              PESAN LANGSUNG!
            </div>
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2 mb-1">
              <ShoppingBag size={14} /> KERANJANG PEMESANAN UMKM
            </h3>
            <p className="text-[11px] text-stone-300 mb-4">Tambahkan item dari katalog bawah untuk dipesan:</p>
            
            <div className="space-y-3 min-h-[120px] max-h-[220px] overflow-y-auto pr-1">
              {Object.keys(cart).length === 0 ? (
                <div className="text-center py-8 text-xs text-stone-400 italic">
                  Keranjang masih kosong. Klik tombol &quot;+&quot; pada katalog di bawah untuk menambahkan produk.
                </div>
              ) : (
                Object.entries(cart).map(([id, qty]) => {
                  const item = umkmProducts.find((p) => p.id === id);
                  if (!item) return null;
                  return (
                    <div key={id} className="flex justify-between items-center text-xs bg-stone-900/40 p-2.5 rounded-xl border border-white/5">
                      <div className="space-y-0.5">
                        <span className="font-bold text-white block truncate max-w-[180px]">{item.title}</span>
                        <span className="text-[10px] text-stone-400 font-mono">{formatRupiah(item.price * qty)}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-stone-950/60 p-1 rounded-lg border border-white/10">
                        <button onClick={() => removeFromCart(id)} className="p-1 hover:text-amber-400 transition-colors cursor-pointer text-white"><Minus size={10}/></button>
                        <span className="font-mono text-white text-xs px-1">{qty}</span>
                        <button onClick={() => addToCart(id)} className="p-1 hover:text-amber-400 transition-colors cursor-pointer text-white"><Plus size={10}/></button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {Object.keys(cart).length > 0 && (
              <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-center">
                <div>
                  <span className="text-[9px] text-stone-400 uppercase block">Total Belanja</span>
                  <span className="text-base font-black text-amber-400">{formatRupiah(getCartTotal())}</span>
                </div>
                <motion.a
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  href={`https://wa.me/${PHONE_PAK_YAYA}?text=${generateWaText()}`}
                  target="_blank" rel="noopener noreferrer"
                  className="bg-amber-500 text-black text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg hover:bg-amber-600 transition-colors"
                >
                  <MessageCircle size={14} /> <span>Pesan ke Pak Yaya</span>
                </motion.a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── BREADCRUMB ── */}
      <div className="max-w-6xl mx-auto px-6 pt-8 text-xs text-stone-500 flex gap-2">
        <Link href="/" className="hover:text-[#2D3E25] transition-colors">Beranda</Link>
        <span>/</span>
        <span className="font-semibold text-stone-800">Fasilitas</span>
        <span>/</span>
        <span className="font-semibold text-[#2D3E25]">Sentra UMKM & Kuliner</span>
      </div>

      <main className="max-w-6xl mx-auto px-6 mt-8 space-y-16">
        
        {/* ── INSTAGRAM REELS HIGHLIGHT ── */}
        <section className="space-y-6">
          <div>
            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1">
              <Video size={12} /> Dokumentasi Seru & Warisan Budaya
            </span>
            <h3 className="text-2xl font-black text-[#1A2616] tracking-tight">Keseruan Aktivitas & Kesegaran Autentik</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-white border border-stone-200 rounded-[2.5rem] p-5 shadow-xs flex flex-col justify-between">
              <div className="relative aspect-[9/16] max-h-[480px] w-full rounded-[2rem] overflow-hidden bg-stone-900 group shadow-inner">
                <video 
                  src="/videos/UMKM/permainan-tradisional.mp4" 
                  controls 
                  preload="metadata"
                  className="w-full h-full object-cover"
                  poster={sectionImages.posterPermainan || ""} 
                />
              </div>
              <div className="mt-4 space-y-1 px-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 inline-block">
                   Permainan Tradisional
                </span>
                <h4 className="text-base font-bold text-[#1A2616] mt-1">Keseruan Ragam Kaulinan Lembur</h4>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  Cuplikan keseruan wisatawan saat mencoba egrang, kelom batok, dan aneka permainan tradisional Sunda yang tetap lestari di Pasir Eurih.
                </p>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-[2.5rem] p-5 shadow-xs flex flex-col justify-between">
              <div className="relative aspect-[9/16] max-h-[480px] w-full rounded-[2rem] overflow-hidden bg-stone-900 group shadow-inner">
                <video 
                  src="/videos/UMKM/minuman-pla-plus.mp4" 
                  controls 
                  preload="metadata"
                  className="w-full h-full object-cover"
                  poster={sectionImages.posterPlaPlus || ""}
                />
              </div>
              <div className="mt-4 space-y-1 px-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100 inline-block">
                   Minuman Legenda
                </span>
                <h4 className="text-base font-bold text-[#1A2616] mt-1">Pla Plus: Segar, Sehat & Autentik</h4>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  Menengok proses pembuatan dan racikan segar minuman khas tradisional bermerek Pla Plus langsung dari dapur warga setempat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SEJARAH LEGENDARIS GRID ── */}
        <div className="grid md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-8 bg-white border border-stone-200 rounded-[2rem] p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-100 inline-block">
                 Warisan Sejarah Bogor
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#1A2616] tracking-tight">
                Sentra Kerajinan Alas Kaki Kulit
              </h2>
              <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
                Masyarakat Desa Pasir Eurih di <strong>Tamansari, Bogor</strong> secara turun-temurun berprofesi sebagai pengrajin sandal dan sepatu kulit berkualitas tinggi. Hubungan historis industri kreatif mencatat bahwa para perintis awal industri kriya legendaris di Cibaduyut Bandung pada mulanya mengembara, magang, dan mematangkan keterampilan menjahit alas kaki mereka langsung dari para empu pengrajin veteran di Pasir Eurih ini. Tradisi pembuatan sandal berbahan dasar kulit sapi asli ini terus dijaga keasliannya hingga kini.
              </p>
            </div>
            
            <div className="mt-6 h-60 md:h-80 w-full bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 shadow-inner relative">
              <Image 
                src={sectionImages.sejarahPengrajin?.src || "/images/fasilitas/umkm/sejarah-pengrajin.jpg"} 
                alt={sectionImages.sejarahPengrajin?.alt || "Proses Pemotongan Sandal"} 
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="md:col-span-4 bg-[#2D3E25] text-white rounded-[2rem] p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="p-2.5 bg-white/10 rounded-xl w-fit text-amber-400"><Utensils size={18} /></div>
              <h3 className="text-lg font-bold tracking-tight">Nasi Liwet Pawon</h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Teknik memasak tradisional menggunakan periuk logam (*kastrol*) di atas tungku batu berbahan bakar kayu albasia. Menciptakan kerak nasi gurih (*sangu poe*) yang renyah dan aroma harum kemangi liar khas kaki Gunung Salak.
              </p>
            </div>
            <div className="border-t border-white/10 pt-4 mt-6">
              <span className="text-[9px] font-mono tracking-widest text-amber-400 block uppercase font-bold">INFO RASA</span>
              <p className="text-xs italic text-stone-200 mt-1">&quot;Disajikan dengan pelengkap lalapan segar yang dipetik langsung dari kebun belakang homestay.&quot;</p>
            </div>
          </div>
        </div>

        {/* ── SECTION 1: MINI GALERI KUE & CAMILAN KOTAK ── */}
        <section className="space-y-6 bg-white border border-stone-200 rounded-[2.5rem] p-6 md:p-8 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-xl"><Cookie size={20} /></div>
            <div>
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block">Snack & Jajanan Pasar Saji</span>
              <h3 className="text-xl md:text-2xl font-black text-[#1A2616] tracking-tight">Mini Galeri Makanan Yang Wajib Dicoba</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {miniGalleryItems.map((item) => (
              <div key={item.id} className="bg-[#FAF6F0] border border-stone-200/60 p-3.5 rounded-2xl flex flex-col justify-between hover:scale-[1.02] transition-transform">
                <div className="space-y-3">
                  <div className="aspect-square w-full bg-white rounded-xl overflow-hidden border border-stone-200 shadow-inner relative">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill
                      sizes="(max-width: 640px) 50vw, 20vw"
                      className="object-cover object-center" 
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-[#1A2616] line-clamp-1">{item.title}</h4>
                    <p className="text-[10px] text-stone-500 line-clamp-2 leading-tight font-light">{item.desc}</p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-stone-200/40 flex items-center justify-between gap-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-800">{formatRupiah(item.price)}</span>
                  <button 
                    onClick={() => addToCart(item.id)} 
                    className="bg-[#2D3E25] p-1.5 rounded-lg text-white hover:bg-[#1A2616] transition-colors cursor-pointer"
                    title="Tambah ke keranjang"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 2: KLASTER CAMILAN KHAS ── */}
        <section className="space-y-6">
          <div>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest block">Oleh-oleh Autentik</span>
            <h3 className="text-xl md:text-2xl font-black text-[#1A2616] tracking-tight">Camilan & Minuman Ringan Khas</h3>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-4 bg-white border border-stone-200 rounded-[2rem] p-4 flex flex-col justify-center shadow-xs min-h-[350px]">
              <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-stone-100 shadow-inner relative group">
                <Image 
                  src="/images/fasilitas/umkm/makanan-ringan-khas.jpg" 
                  alt="Koleksi Camilan dan Minuman Ringan Tradisional Pasir Eurih" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-4 left-4 text-white text-[10px] font-medium tracking-wide bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/10">
                   Produk Asli Warga Desa
                </span>
              </div>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-3 gap-4 items-stretch">
              {circleClusterItems.map((item) => (
                <div key={item.id} className="bg-white border border-stone-200 rounded-[2rem] p-5 flex flex-col justify-between shadow-xs hover:shadow-sm transition-shadow">
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-full mx-auto overflow-hidden border-2 border-amber-400 shadow-sm bg-stone-100 relative">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill
                        sizes="64px"
                        className={`object-cover ${item.objectPosition || "object-center"}`} 
                      />
                    </div>
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-3 py-0.5 rounded border border-amber-100">
                        {formatRupiah(item.price)}
                      </span>
                    </div>
                    <div className="space-y-2 text-center">
                      <h4 className="text-sm font-bold text-[#1A2616] leading-tight min-h-[36px] flex items-center justify-center">
                        {item.title}
                      </h4>
                      <p className="text-xs text-stone-500 font-light leading-relaxed line-clamp-4">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 pt-3 border-t border-stone-100 space-y-2.5">
                    <span className="text-[10px] text-stone-400 font-mono block text-center truncate">
                      {item.spec}
                    </span>
                    <button 
                      onClick={() => addToCart(item.id)}
                      className="w-full bg-[#2D3E25] hover:bg-[#1A2616] text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus size={12} /> Tambah Pesanan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── KATALOG UTAMA ── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Pilih & Dukung UMKM</span>
              <h3 className="text-2xl font-black text-[#1A2616] tracking-tight">Katalog Produk Unggulan Desa</h3>
            </div>
            <div className="flex gap-2 flex-wrap">
              {["all", "kerajinan", "kuliner"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${filter === cat ? "bg-[#2D3E25] text-white" : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"}`}
                >
                  {cat === "all" ? "Semua Produk" : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  key={product.id}
                  className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:border-stone-300 transition-all"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1.5 max-w-[70%]">
                      <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${product.category === "kuliner" ? "bg-orange-50 text-orange-700 border border-orange-100" : "bg-blue-50 text-blue-700 border border-blue-100"}`}>
                        {product.category === "kuliner" ? "🍲 Kuliner" : "🛠️ Kriya"}
                      </span>
                      <h4 className="text-sm font-bold text-[#1A2616]">{product.title}</h4>
                      <p className="text-xs text-stone-500 font-light leading-snug">{product.desc}</p>
                      {product.spec && (
                        <span className="inline-block text-[10px] text-stone-400 font-mono bg-stone-50 px-2 py-0.5 rounded border border-stone-100">
                          {product.spec}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-right flex flex-col items-end justify-between h-full min-h-[80px]">
                      <span className="font-mono text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                        {formatRupiah(product.price)}
                      </span>
                      <button 
                        onClick={() => addToCart(product.id)}
                        className="bg-[#2D3E25] hover:bg-[#1A2616] text-white text-xs font-bold p-2 rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-colors mt-auto"
                      >
                        <Plus size={14}/> <span>Tambah</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ── KREATIVITAS ANYAMAN BAMBU & LOKASI GALERI KIOS ── */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* SEKSI KRIYA ANYAMAN BAMBU */}
          <div className="lg:col-span-4 bg-white border border-stone-200 rounded-[2rem] p-6 flex flex-col justify-between shadow-xs self-stretch">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100 inline-block">
                 Hasil Bumi Hutan Bambu
              </span>
              <h3 className="text-xl font-extrabold text-[#1A2616] tracking-tight">Kreativitas Anyaman</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Di sela masa tanam padi, para wanita tani di Pasir Eurih mengisi waktu luang dengan menganyam bambu tali menjadi perabotan dapur bernilai guna tinggi. Ini adalah gerakan ramah lingkungan sejati yang mengurangi konsumsi plastik rumah tangga.
              </p>
            </div>
            
            <div className="mt-6 h-48 bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 shadow-inner relative">
              <Image 
                src={sectionImages.kreativitasAnyaman?.src || "/images/fasilitas/umkm/kios-anyaman.jpg"} 
                alt={sectionImages.kreativitasAnyaman?.alt || "Hasil Anyaman Bambu"} 
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* SEKSI KIOS GALERI UTAMA */}
          <div className="lg:col-span-8 bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 shadow-xs self-stretch flex items-center">
            <div className="grid md:grid-cols-12 gap-6 items-center w-full">
              
              <div className="md:col-span-5 grid grid-cols-2 gap-2 aspect-[3/4] w-full">
                {kioskGalleryImages.slice(0, 4).map((imgUrl, idx) => (
                  <div key={`kiosk-gallery-${idx}`} className="w-full h-full bg-stone-100 rounded-xl overflow-hidden border border-stone-200 shadow-inner relative group">
                    <Image 
                      src={imgUrl} 
                      alt={`${sectionImages.galeriKios?.alt || "Foto Kios"} ${idx + 1}`} 
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>

              <div className="md:col-span-7 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-purple-50 text-purple-800 border border-purple-100 inline-block">
                   Sentra Kios Fisik
                </span>
                <h3 className="text-xl md:text-2xl font-black text-[#1A2616] tracking-tight">Kunjungi Galeri Kios Kami</h3>
                <p className="text-xs md:text-sm text-stone-600 leading-relaxed font-light">
                  Selain melalui prapemesanan online di halaman ini, Anda juga dapat berbelanja secara langsung di deretan Kios Kriya yang tertata rapi di dekat pintu keluar Kampung Adat Sindangbarang, Kecamatan Tamansari, Kabupaten Bogor. Semua transaksi tunai langsung masuk menyokong ekonomi keluarga pengrajin setempat.
                </p>
              </div>

            </div>
          </div>

        </div>

      </main>
    </div>
  );
}