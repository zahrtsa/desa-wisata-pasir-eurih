"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Clock, Landmark, Compass, 
  Navigation, Camera, MessageCircle, ArrowRight,
  ChevronLeft, ChevronRight, Users, Star,
  GraduationCap, User, ClipboardCheck, PhoneCall, CalendarDays, CheckCircle2,
  Sparkles, BookOpen, HelpCircle, Eye, Volume2, VolumeX, Plus, Minus
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import wisataData from "@/data/wisata.json";
import situsData from "@/data/situs.json";
import dataGaleri from "@/data/galeri.json";

// Animasi orkestrasi untuk parent
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Home() {
  const [activeImageIndexes, setActiveImageIndexes] = useState({});
  const [selectedSitus, setSelectedSitus] = useState(situsData[0]?.id || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  const scrollRef = useRef(null);
  const audioRef = useRef(null); // <-- Penambahan const di sini

  // Data FAQ
  const faqData = [
    {
      question: "Bagaimana cara melakukan reservasi paket wisata atau homestay?",
      answer: "Anda dapat menghubungi kontak pengelola kami melalui WhatsApp (Pak Desen untuk informasi umum/wisata/homestay dan Pak Yaya untuk produk UMKM/kuliner). Reservasi disarankan dilakukan beberapa hari sebelum tanggal kunjungan untuk memastikan ketersediaan tempat."
    },
    {
      question: "Apakah lokasi Desa Wisata Pasir Eurih dapat diakses bus besar?",
      answer: "Ya, akses jalan dan area parkir terpadu di kawasan Desa Wisata Pasir Eurih memadai untuk manuver serta parkir armada bus besar rombongan sekolah maupun instansi."
    },
    {
      question: "Apakah ada minimal jumlah peserta (min. pax) untuk paket wisata?",
      answer: "Setiap paket wisata memiliki ketentuan minimal peserta yang berbeda (umumnya mulai dari 50 pax). Namun untuk kunjungan perorangan atau keluarga kecil, Anda tetap dapat berkoordinasi dengan pengelola kami."
    },
    {
      question: "Fasilitas apa saja yang didapatkan saat menginap di Homestay Desa?",
      answer: "Homestay mengusung konsep rumah warga lokal yang bersih dan asri, dilengkapi dengan kasur nyaman, kamar mandi bersih, sajian masakan khas Sunda, serta suasana pedesaan yang tenang di kaki Gunung Salak."
    },
    {
      question: "Apa saja jam operasional kunjungan di Pasir Eurih?",
      answer: "Kawasan Desa Wisata Pasir Eurih beroperasi setiap hari mulai pukul 08:00 WIB hingga 17:00 WIB. Bagi tamu homestay, layanan reservasi dan check-in dapat disesuaikan dengan kesepakatan bersama pengelola."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Menunggu interaksi aktif lanjutan...", err));
      }
      window.removeEventListener("click", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    return () => window.removeEventListener("click", handleFirstInteraction);
  }, []); 

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log("Gagal memutar audio:", err);
            setIsPlaying(false);
          });
      }
    }
  };

  const changePreviewImage = (paketId, imageIndex, e) => {
    e.stopPropagation();
    setActiveImageIndexes((prev) => ({
      ...prev,
      [paketId]: imageIndex,
    }));
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth * 0.75 
        : scrollLeft + clientWidth * 0.75;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const currentSitusData = situsData.find(s => s.id === selectedSitus) || situsData[0];

  return (
    <div className="bg-brand-cream min-h-screen font-sans antialiased text-brand-dark overflow-x-hidden">
      
      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        src="/sounds/bg-music-home.mp3" 
        loop 
        preload="auto"
      />

      {/* ── TOMBOL FLOATING KONTROL MUSIK ── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <AnimatePresence>
          {isPlaying && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white/90 backdrop-blur-sm border border-brand-border px-3 py-1.5 rounded-full shadow-md text-[10px] font-bold text-brand-green uppercase tracking-wider hidden sm:block select-none"
            >
              Playing Folk Audio 🎵
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleMusic}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`w-12 h-12 rounded-full shadow-2xl flex items-center justify-center border transition-colors cursor-pointer ${
            isPlaying 
              ? "bg-brand-green text-white border-transparent" 
              : "bg-white text-brand-dark border-brand-border hover:bg-brand-cream"
          }`}
          title={isPlaying ? "Matikan Musik" : "Putar Musik Latar"}
        >
          {isPlaying ? <Volume2 size={18} className="animate-pulse" /> : <VolumeX size={18} />}
        </motion.button>
      </div>

      {/* ── 1. HERO SECTION ── */}
      <section className="bg-brand-cream px-6 pt-24 pb-28 md:pt-32 md:pb-36 relative overflow-hidden flex items-center min-h-[90vh]">
        <motion.div 
          animate={{ scale: [1, 1.15, 1], x: [0, 20, 0], y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-brand-green/10 blur-3xl rounded-full pointer-events-none"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 16, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-brand-earth/10 blur-3xl rounded-full pointer-events-none"
        />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="flex flex-col lg:col-span-6 justify-center">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 bg-white border border-brand-border text-brand-green text-xs font-bold px-3 py-1.5 rounded-full mb-6 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                Desa Wisata Budaya · Kab. Bogor
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-serif text-brand-dark/95 font-medium leading-[1.2] mb-6 tracking-tight">
              Rasakan Kehangatan <br />
              <span className="font-sans font-extrabold bg-gradient-to-r from-brand-green via-brand-green-light to-brand-earth bg-clip-text text-transparent italic">
                Kearifan Lokal Sunda
              </span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-brand-muted text-sm md:text-base leading-relaxed mb-8 max-w-lg font-medium">
              Yuk lepas penat sejenak. Cobain serunya main permainan tradisional, jelajahi cagar budaya kuno, dan rasakan indahnya suasana pedesaan alami Pasir Eurih.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex gap-3 flex-wrap items-center">
              <Link href="/wisata" className="bg-brand-green hover:bg-brand-green-light text-white text-xs md:text-sm font-bold px-7 py-4 rounded-xl transition-all shadow-md transform hover:-translate-y-0.5">
                Jelajahi Wisata
              </Link>
              <Link href="/fasilitas/homestay" className="bg-white hover:bg-brand-cream text-brand-earth border border-brand-border text-xs md:text-sm font-bold px-7 py-4 rounded-xl transition-colors shadow-xs">
                Lihat Homestay
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="lg:col-span-6 relative w-full h-[380px] sm:h-[480px] md:h-[540px]"
          >
            <div className="absolute inset-0 bg-brand-green/5 rounded-[3rem] transform rotate-3 scale-98 pointer-events-none" />
            <div className="relative w-full h-full rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border-8 border-white shadow-2xl bg-stone-100 group">
              <Image 
                src="/images/desawisata.png" 
                alt="Pesona Desa Wisata Pasir Eurih" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-green-light bg-brand-green/30 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 mb-2 inline-block">Kampung Adat</span>
                  <h3 className="text-lg md:text-2xl font-black tracking-tight text-brand-cream">Pesona Kaki Gunung Salak</h3>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2.5 rounded-2xl text-white hidden sm:flex items-center gap-2">
                  <Sparkles size={16} className="text-brand-earth-light animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cream">Asli & Terjaga</span>
                </div>
              </div>
            </div>

            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-white border border-brand-border p-3.5 rounded-2xl shadow-xl flex items-center gap-3 z-20"
            >
              <div className="p-2 bg-brand-green/10 rounded-xl text-brand-green"><MapPin size={16} /></div>
              <div>
                <p className="text-xs font-black text-brand-dark">Kec. Tamansari</p>
                <p className="text-[10px] text-brand-muted font-semibold">Bogor, Jawa Barat</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[50px] md:h-[80px]">
            <path d="M0,0 C150,90 350,120 600,40 C850,-40 1050,30 1200,90 L1200,120 L0,120 Z" className="fill-brand-earth/5" />
            <path d="M0,40 C180,130 420,20 650,90 C880,160 1080,80 1200,50 L1200,120 L0,120 Z" className="fill-white" />
          </svg>
        </div>
      </section>

      {/* ── 2. WISATA SECTION ── */}
      <section className="bg-white pb-24 relative z-30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <p className="text-xs font-bold text-brand-earth uppercase tracking-widest mb-1.5">Paket Pilihan Populer</p>
              <h3 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">Jelajahi Ragam Aktivitas Edukasi</h3>
            </div>
            
            <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between sm:justify-end w-full sm:w-auto">
              <Link href="/wisata" className="text-xs font-bold text-brand-green flex items-center gap-1 hover:gap-2 transition-all hover:underline">
                Lihat Semua Paket <ChevronRight size={14} />
              </Link>
              <div className="flex items-center gap-2">
                <button onClick={() => handleScroll("left")} className="w-9 h-9 rounded-full border border-stone-300 bg-white text-slate-700 flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-xs hover:border-brand-green">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={() => handleScroll("right")} className="w-9 h-9 rounded-full bg-brand-green text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-xs hover:bg-brand-green-light">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none scroll-smooth -mx-6 px-6 md:mx-0 md:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {wisataData.slice(0, 4).map((paket) => {
              const currentImgIndex = activeImageIndexes[paket.id] ?? 0;
              const hasSplitPricing = paket.hargaPelajar && paket.hargaUmum;

              return (
                <div key={paket.id} className="w-[88vw] sm:w-[500px] md:w-[560px] lg:w-[580px] bg-white border border-brand-border rounded-[2.5rem] shadow-md p-6 flex-shrink-0 snap-start snap-always transition-all duration-300 flex flex-col justify-between">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch h-full">
                    <div className="md:col-span-5 flex flex-col gap-3">
                      <div className="w-full h-[180px] sm:h-[220px] relative rounded-2xl overflow-hidden bg-stone-100 border border-brand-border/40">
                        <AnimatePresence mode="wait">
                          <motion.div key={currentImgIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="absolute inset-0">
                            <Image src={paket.images?.[currentImgIndex] || "/images/desawisata.png"} alt={paket.nama} fill className="object-cover" sizes="250px" unoptimized />
                          </motion.div>
                        </AnimatePresence>
                        <div className="absolute top-2.5 left-2.5 z-10">
                          <span className="text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded-md text-white bg-brand-green shadow-xs">{paket.tipe || "One Day Tour"}</span>
                        </div>
                      </div>

                      {paket.images && paket.images.length > 0 && (
                        <div className="flex gap-1.5 w-full justify-start h-8 overflow-x-auto pb-0.5 scrollbar-none">
                          {paket.images.map((imgUrl, imgIdx) => (
                            <button key={imgIdx} onClick={(e) => changePreviewImage(paket.id, imgIdx, e)} className={`relative w-8 h-full rounded-md border flex-shrink-0 transition-all overflow-hidden ${currentImgIndex === imgIdx ? 'border-brand-green bg-white scale-95 shadow-xs' : 'border-brand-border/60 opacity-60'}`}>
                              <Image src={imgUrl} alt="Preview" fill className="object-cover" unoptimized />
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="bg-brand-cream border border-brand-border/50 rounded-xl p-3 flex-1">
                        <p className="text-[11px] text-brand-muted leading-relaxed font-semibold line-clamp-4">{paket.deskripsi}</p>
                      </div>
                    </div>

                    <div className="md:col-span-7 flex flex-col justify-between h-full min-h-[300px] md:min-h-auto">
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5 text-[9px] font-bold text-brand-green uppercase tracking-wider mb-1">
                          <Compass size={10} /> <span>{paket.tagline}</span>
                          <span className="text-stone-300">•</span>
                          <span className="text-brand-muted font-bold lowercase flex items-center gap-0.5"><Users size={9} /> min. {paket.minPax} pax</span>
                        </div>
                        <h4 className="text-base font-black text-brand-dark tracking-tight leading-snug mb-3">{paket.nama}</h4>
                        {paket.highlights && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {paket.highlights.slice(0, 3).map((hl, idx) => (
                              <span key={idx} className="bg-brand-cream text-brand-dark border border-brand-border text-[8px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                                <Star size={8} className="fill-brand-earth text-brand-earth" />{hl}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {paket.kegiatan && (
                        <div className="flex-1 my-1 space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                          {paket.kegiatan.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-brand-muted border-b border-brand-cream/40 pb-1.5 last:border-0">
                              <span className="w-4 h-4 rounded-full bg-brand-green/10 text-brand-green font-bold flex items-center justify-center text-[9px] flex-shrink-0 mt-0.5">{idx + 1}</span>
                              <span className="leading-relaxed font-medium text-[11px] text-brand-dark/90">{item}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-brand-border mt-auto">
                        {hasSplitPricing ? (
                          <div className="flex gap-4">
                            <div>
                              <span className="text-[8px] font-bold text-brand-muted uppercase tracking-wider flex items-center gap-0.5"><GraduationCap size={10} /> Pelajar</span>
                              <p className="text-sm font-black text-brand-dark mt-0.5">Rp {paket.hargaPelajar.toLocaleString("id-ID")}</p>
                            </div>
                            <div className="w-[1px] bg-brand-border" />
                            <div>
                              <span className="text-[8px] font-bold text-brand-earth uppercase tracking-wider flex items-center gap-0.5"><User size={9} /> Umum</span>
                              <p className="text-sm font-black text-brand-earth mt-0.5">Rp {paket.hargaUmum.toLocaleString("id-ID")}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col">
                            <span className="text-[8px] font-bold text-brand-muted uppercase tracking-wider">Tarif All-In</span>
                            <p className="text-base font-black text-brand-green">Rp {(paket.hargaFlat || paket.harga || 0).toLocaleString("id-ID")}<span className="text-[8px] font-medium text-brand-muted">/pax</span></p>
                          </div>
                        )}

                        <motion.a
                          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          href={`https://wa.me/6285695146164?text=Sampurasun%20Pak%20Desen,%20saya%20tertarik%20booking%20[${paket.nama}]`}
                          target="_blank" rel="noopener noreferrer"
                          className="bg-brand-green hover:bg-brand-green-light text-white text-[11px] font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto text-center"
                        >
                          <MessageCircle size={13} /><span>Pesan Paket</span>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. EXPLORASI CAGAR BUDAYA ── */}
      <section className="bg-brand-green text-white px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center md:text-left">
            <span className="text-[10px] font-bold text-brand-earth-light uppercase tracking-widest bg-white/10 border border-white/10 px-3 py-1.5 rounded-full inline-block mb-3">Eksplorasi Cagar Budaya</span>
            <h2 className="text-3xl md:text-4xl font-black text-brand-cream tracking-tight">Menelusuri Warisan Kerajaan Pajajaran</h2>
            <p className="text-xs md:text-sm text-brand-cream/70 mt-2 max-w-xl font-medium">Pilih situs sejarah di panel kiri untuk membuka fragmen kisah petualangan masa lampau.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
              {situsData.map((situs) => {
                const isSelected = selectedSitus === situs.id;
                return (
                  <motion.button
                    key={situs.id}
                    onClick={() => setSelectedSitus(situs.id)}
                    whileHover={{ x: 6, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`p-3 text-left rounded-2xl border transition-all flex items-center gap-4 relative overflow-hidden group cursor-pointer ${
                      isSelected 
                        ? "bg-white text-brand-dark border-transparent shadow-xl" 
                        : "bg-white/5 border-white/10 text-brand-cream hover:bg-white/10"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-xl relative overflow-hidden flex-shrink-0 bg-brand-dark/20 border border-white/10">
                      <Image 
                        src={situs.foto || "/images/desawisata.png"}
                        alt={situs.nama} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-300" 
                        unoptimized 
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <span className={`text-[9px] font-black uppercase tracking-wider block mb-0.5 ${isSelected ? "text-brand-earth" : "text-brand-green-light"}`}>
                        {situs.badge || "Situs Cagar Budaya"}
                      </span>
                      <h3 className="text-xs sm:text-sm font-black truncate leading-tight">{situs.nama}</h3>
                    </div>
                    
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${isSelected ? "bg-brand-green text-white rotate-90" : "bg-white/10 text-brand-cream"}`}>
                      <ChevronRight size={14} />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSitus}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="bg-white text-brand-dark border border-brand-border rounded-[2.5rem] p-6 md:p-8 shadow-2xl h-full flex flex-col justify-between min-h-[400px] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-brand-green-tint/40 rounded-bl-full pointer-events-none -z-0" />
                  
                  <div className="relative z-10">
                    <div className="w-full h-[200px] relative rounded-2xl overflow-hidden bg-brand-cream mb-6 border border-brand-border">
                      <Image 
                        src={currentSitusData?.foto || "/images/desawisata.png"} 
                        alt={currentSitusData?.nama || "Situs"} 
                        fill 
                        className="object-cover" 
                        unoptimized 
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="bg-brand-earth text-white font-black text-[9px] px-2.5 py-1 rounded uppercase tracking-wider">
                        {currentSitusData?.badge || "Situs Utama"}
                      </span>
                      <span className="text-[11px] text-brand-muted flex items-center gap-1 font-semibold">
                        <BookOpen size={12} className="text-brand-green" /> Fragmen Petualangan Masa Lampau
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-brand-dark tracking-tight mb-3">
                      {currentSitusData?.nama}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-medium">
                      {currentSitusData?.deskripsi}
                    </p>
                  </div>

                  <div className="bg-brand-cream border border-brand-border/60 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 relative z-10">
                    <div className="flex items-center gap-2 text-xs text-brand-dark font-bold">
                      <Sparkles size={14} className="text-brand-earth animate-pulse flex-shrink-0" />
                      <span>Tertarik melakukan riset / studi lapangan sekolah?</span>
                    </div>
                    <Link href="/budaya" className="text-xs font-bold text-brand-green flex items-center gap-0.5 hover:underline whitespace-nowrap">
                      Hubungi Pemandu Budaya <ArrowRight size={12} />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CARA PESAN SECTION ── */}
      <section className="bg-white px-6 py-24 border-t border-brand-border/40 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] uppercase font-bold text-brand-green tracking-[0.2em] bg-brand-cream border border-brand-border px-3 py-1.5 rounded-full inline-block mb-3">
              Reservasi Alur Cepat
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-brand-dark mb-3">
              Prosedur Reservasi Rombongan
            </h2>
            <p className="text-xs md:text-sm font-medium text-brand-muted leading-relaxed">
              Koordinasikan rencana kunjungan instansi, sekolah, atau keluarga besar Anda bersama pemandu adat pengelola desa.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              { id: 1, icon: ClipboardCheck, tag: "01", title: "Pilih Paket Wisata", desc: "Tentukan pilihan paket edukasi budaya Sunda kuno, aktivitas pertanian, atau sewa homestay komunal.", color: "from-brand-green to-emerald-600" },
              { id: 2, icon: PhoneCall, tag: "02", title: "Kontak WhatsApp", desc: "Hubungi admin pengelola utama desa untuk pencocokan kuota serta ketersediaan tanggal acara.", color: "from-brand-green to-teal-600" },
              { id: 3, icon: CalendarDays, tag: "03", title: "Atur Detail Rombongan", desc: "Koordinasikan manifes jumlah peserta, akses parkir bus besar, serta hidangan konsumsi prasmanan.", color: "from-brand-earth to-amber-700" },
              { id: 4, icon: CheckCircle2, tag: "04", title: "Sistem Terkunci", desc: "Kirim uang muka ringan, jadwal kunjungan resmi rombongan Anda langsung masuk kalender utama desa.", color: "from-brand-green to-emerald-700" }
            ].map((step, idx) => {
              const IconComp = step.icon;
              return (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-gradient-to-b from-white to-brand-cream/30 border border-brand-border/80 rounded-[2.5rem] p-7 transition-all duration-300 relative flex flex-col justify-between shadow-xs group hover:shadow-xl hover:border-brand-green/40 overflow-hidden"
                >
                  <div className="absolute -right-4 -bottom-6 text-7xl font-black text-brand-dark/[0.03] group-hover:text-brand-green/[0.06] transition-colors font-sans select-none">
                    {step.tag}
                  </div>

                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <IconComp size={20} />
                    </div>
                    
                    <span className="text-[10px] font-bold text-brand-earth uppercase tracking-widest block mb-1">
                      Langkah {step.tag}
                    </span>
                    <h3 className="text-sm font-black text-brand-dark mb-3 group-hover:text-brand-green transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-brand-muted leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="w-0 h-[3px] bg-brand-green absolute bottom-0 left-0 group-hover:w-full transition-all duration-500 rounded-b-full" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. DOKUMENTASI VISUAL ── */}
      <section className="bg-brand-cream px-6 py-24 border-t border-brand-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <p className="text-xs font-bold text-brand-earth uppercase tracking-widest mb-1.5">Dokumentasi Visual</p>
              <h2 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">Momen Kebahagiaan Di Pasir Eurih</h2>
            </div>
            <Link href="/galeri" className="text-xs font-bold text-brand-green flex items-center gap-1 hover:gap-2 transition-all hover:underline">
              Lihat Album Foto Lengkap <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px] sm:auto-rows-[200px]">
            {dataGaleri && dataGaleri.slice(0, 5).map((foto, idx) => {
              let gridLayout = "col-span-1 row-span-1";
              if (idx === 0) gridLayout = "md:col-span-2 md:row-span-2 col-span-2 row-span-2"; 
              if (idx === 2) gridLayout = "col-span-1 row-span-2"; 
              if (idx === 4) gridLayout = "md:col-span-2 row-span-1 col-span-2"; 

              return (
                <motion.div 
                  key={foto.id || idx}
                  whileHover={{ scale: 1.015, zIndex: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative rounded-[2rem] overflow-hidden border-4 border-white shadow-md cursor-pointer group bg-stone-100 ${gridLayout}`}
                >
                  <Image 
                    src={foto.src} 
                    alt={foto.caption || "Dokumentasi Pasir Eurih"} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    unoptimized 
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-left">
                    <p className="text-[9px] uppercase font-black tracking-widest text-brand-green-light mb-0.5">
                      Koleksi {foto.tag}
                    </p>
                    <h4 className="text-xs font-bold leading-snug line-clamp-2 text-brand-cream">
                      {foto.caption}
                    </h4>
                  </div>
                  
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-black/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white border border-white/10">
                    <Eye size={14} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {(!dataGaleri || dataGaleri.length === 0) && (
            <div className="text-center py-12 border border-dashed border-brand-border rounded-2xl bg-white/50">
              <p className="text-xs font-medium text-brand-muted">Belum ada dokumentasi foto yang tersedia.</p>
            </div>
          )}

        </div>
      </section>

      {/* ── 6. PETUNJUK AKSES NAVIGASI (MAPS) ── */}
      <section className="bg-gradient-to-br from-brand-cream via-white to-brand-green-tint/30 px-6 py-24 border-t border-brand-border/60 overflow-hidden relative">
        <div className="absolute top-1/2 left-[-10%] w-[400px] h-[400px] bg-brand-earth/5 blur-3xl rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12 text-center md:text-left">
            <p className="text-xs font-bold text-brand-earth uppercase tracking-[0.2em] mb-2">
              Petunjuk Akses Navigasi
            </p>
            <h2 className="text-2xl md:text-4xl font-black text-brand-dark tracking-tight">
              Mari Berkunjung, Aksesnya Mudah!
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
              
              <motion.div 
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="bg-white/80 backdrop-blur-md border border-brand-border rounded-2xl p-5 shadow-xs flex gap-4 items-center transition-all hover:shadow-md hover:border-brand-green/40 hover:bg-white group cursor-pointer"
              >
                <div className="p-3.5 bg-brand-green/10 text-brand-green rounded-xl transition-all group-hover:bg-brand-green group-hover:text-white group-hover:rotate-12 duration-300 flex-shrink-0">
                  <Compass size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-brand-dark uppercase tracking-wider mb-0.5 group-hover:text-brand-green transition-colors">
                    Aksesibilitas Bus
                  </h4>
                  <p className="text-[11px] sm:text-xs text-brand-muted font-medium leading-relaxed">
                    Lokasi jalan & area parkir terpadu dirancang memadai untuk manuver armada bus besar rombongan sekolah.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="bg-white/80 backdrop-blur-md border border-brand-border rounded-2xl p-5 shadow-xs flex gap-4 items-center transition-all hover:shadow-md hover:border-brand-earth/40 hover:bg-white group cursor-pointer"
              >
                <div className="p-3.5 bg-brand-earth/10 text-brand-earth rounded-xl transition-all group-hover:bg-brand-earth group-hover:text-white group-hover:scale-110 duration-300 flex-shrink-0">
                  <Clock size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-brand-dark uppercase tracking-wider mb-0.5 group-hover:text-brand-earth transition-colors">
                    Jam Operasional
                  </h4>
                  <p className="text-[11px] sm:text-xs text-brand-muted font-medium leading-relaxed">
                    Setiap Hari pukul <span className="font-bold text-brand-dark">08:00 - 17:00 WIB</span>. Disarankan melakukan konfirmasi jadwal terlebih dahulu.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="bg-white/80 backdrop-blur-md border border-brand-border rounded-2xl p-5 shadow-xs flex gap-4 items-center transition-all hover:shadow-md hover:border-brand-green/40 hover:bg-white group cursor-pointer"
              >
                <div className="p-3.5 bg-brand-green/10 text-brand-green rounded-xl transition-all group-hover:bg-brand-green group-hover:text-white group-hover:-translate-y-1 duration-300 flex-shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-brand-dark uppercase tracking-wider mb-0.5 group-hover:text-brand-green transition-colors">
                    Alamat Kawasan
                  </h4>
                  <p className="text-[11px] sm:text-xs text-brand-muted font-medium leading-relaxed">
                    Jl. Kp. Pasir Eurih, Kecamatan Tamansari, Kabupaten Bogor, Jawa Barat.
                  </p>
                </div>
              </motion.div>

            </div>

            <div className="lg:col-span-7 w-full h-[380px] sm:h-[450px] lg:h-auto min-h-[400px]">
              <div className="w-full h-full rounded-2xl border border-brand-border overflow-hidden bg-stone-100 shadow-xl relative group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1981.5639082382258!2d106.76442605!3d-6.631043249999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69cf66f1c9f061%3A0xc27525108e949baa!2sDesa%20Wisata%20Pasir%20Eurih!5e0!3m2!1sen!2sid!4v1783754210165!5m2!1sen!2sid"
                  className="w-full h-full border-0"
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Peta Lokasi Desa Wisata Pasir Eurih"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FREQUENTLY ASKED QUESTIONS (FAQ) ── */}
      <section className="bg-white px-6 py-24 border-t border-brand-border/60 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-14">
            <span className="text-[10px] font-bold text-brand-earth uppercase tracking-[0.2em] bg-brand-cream border border-brand-border px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3">
              <HelpCircle size={13} className="text-brand-green" /> Pertanyaan Umum
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-brand-dark mb-2">
              Pertanyaan Sering Diajukan
            </h2>
            <p className="text-xs md:text-sm font-medium text-brand-muted max-w-md mx-auto">
              Informasi praktis seputar kunjungan, reservasi, dan fasilitas di Desa Wisata Pasir Eurih.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? "bg-brand-cream/40 border-brand-green/40 shadow-sm" 
                      : "bg-white border-brand-border hover:border-brand-green/30"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-brand-dark leading-snug">
                      {faq.question}
                    </span>
                    <div className={`p-1.5 rounded-full shrink-0 transition-transform duration-300 ${
                      isOpen ? "bg-brand-green text-white rotate-180" : "bg-brand-cream text-brand-dark"
                    }`}>
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-5 pt-1 border-t border-brand-border/30 text-xs text-brand-muted leading-relaxed font-medium">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}