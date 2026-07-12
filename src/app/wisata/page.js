"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Compass, Users, Star, GraduationCap, 
  User, ArrowRight, MessageCircle, Sparkles, Leaf 
} from "lucide-react";

import paketData from "@/data/wisata.json";

export default function PaketWisataPage() {
  const [activeImageIndexes, setActiveImageIndexes] = useState({});

  const changePreviewImage = (paketId, imageIndex) => {
    setActiveImageIndexes((prev) => ({
      ...prev,
      [paketId]: imageIndex,
    }));
  };

  return (
    <main className="bg-[#4a5d39] min-h-screen relative overflow-hidden font-sans">
      
      {/* ── HEADER HERO (CLEAN & ESTETIK) ── */}
      <div className="w-full pt-32 pb-24 px-4 relative overflow-hidden bg-[#3d4f2e] border-b border-[#586e44]/30">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
        
        <motion.div 
          animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 left-[8%] text-white/10 hidden md:block pointer-events-none"
        >
          <Leaf size={56} className="rotate-45 text-emerald-300" />
        </motion.div>

        <motion.div 
          animate={{ y: [0, 12, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-16 right-[8%] text-white/10 hidden md:block pointer-events-none"
        >
          <Leaf size={48} className="-rotate-12 text-amber-300" />
        </motion.div>

        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full mb-8 shadow-xs"
          >
            <Sparkles size={13} className="text-amber-300 fill-amber-300/20" />
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-100">Destinasi Wisata Budaya</span>
          </motion.div>
          
          <div className="max-w-3xl mx-auto mb-6">
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15]"
            >
              Pilih Pengalaman <br />
              <span className="bg-gradient-to-r from-emerald-300 via-amber-300 to-amber-500 bg-clip-text text-transparent italic font-serif font-normal block mt-2 pb-1">
                Petualangan Lokal Anda
              </span>
            </motion.h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-stone-200/90 max-w-xl mx-auto mt-2 leading-relaxed font-medium"
          >
            Kembali ke akar tradisi dan lestarikan kearifan lokal Sunda lewat pilihan paket wisata edukasi terbaik di lereng gunung Pasir Eurih.
          </motion.p>
        </div>
      </div>

      {/* Pembatas Ombak */}
      <div className="w-full overflow-hidden leading-[0] transform rotate-180 -mt-1 pointer-events-none relative z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] fill-[#f4efe6]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* ── AREA KONTEN UTAMA ── */}
      <div className="bg-[#f4efe6] w-full pt-12 pb-32 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {paketData.map((paket, index) => {
            const currentImgIndex = activeImageIndexes[paket.id] ?? 0;

            return (
              <motion.div
                key={paket.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, type: "spring", stiffness: 85 }}
                className="bg-white border border-stone-200/60 rounded-[2.5rem] shadow-xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                  
                  {/* SEKSI KIRI: Media Visual (Lebih Tinggi & Proporsional) */}
                  <div className="md:col-span-5 flex flex-col gap-4">
                    
                    {/* Frame Gambar Utama (Diperbesar agar seimbang dengan kolom kanan) */}
                    <div className="w-full h-[270px] sm:h-[320px] relative rounded-2xl overflow-hidden bg-stone-100 shadow-xs">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentImgIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={paket.images[currentImgIndex]}
                            alt={paket.nama}
                            fill
                            className="object-cover"
                            sizes="(max-w-7xl) 30vw, 100vw"
                            priority={index < 2}
                            unoptimized
                          />
                        </motion.div>
                      </AnimatePresence>
                      
                      <div className="absolute top-2.5 left-2.5 z-10">
                        <span className={`text-[8px] font-black tracking-widest uppercase px-2 py-1 rounded-md text-white shadow-xs ${
                          paket.hargaFlat ? 'bg-amber-600' : 'bg-[#4a5d39]'
                        }`}>
                          {paket.tipe}
                        </span>
                      </div>
                    </div>

                    {/* Galeri Mini */}
                    <div className="flex gap-2 w-full justify-start h-10 overflow-x-auto pb-1">
                      {paket.images.map((imgUrl, imgIdx) => (
                        <button
                          key={imgIdx}
                          onClick={() => changePreviewImage(paket.id, imgIdx)}
                          className={`relative w-12 h-full rounded-lg overflow-hidden bg-stone-200 border-2 flex-shrink-0 transition-all ${
                            currentImgIndex === imgIdx 
                              ? 'border-[#4a5d39] scale-95 shadow-xs' 
                              : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <Image src={imgUrl} alt="Preview" fill className="object-cover" unoptimized />
                        </button>
                      ))}
                    </div>

                    {/* Rangkuman Paket Ringkas dengan Glow Zaitun */}
                    <div className="bg-[#4a5d39]/[0.05] border border-[#4a5d39]/10 rounded-2xl p-3.5 shadow-[0_0_15px_rgba(74,93,57,0.12)]">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4a5d39] animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-wider text-[#4a5d39]/90 font-sans">
                          Rangkuman Paket
                        </span>
                      </div>
                      <p className="text-[11px] text-[#2c3a20] leading-relaxed font-semibold font-sans">
                        {paket.deskripsi}
                      </p>
                    </div>

                  </div>

                  {/* SEKSI KANAN: Informasi Konten & Scroll Panjang */}
                  <div className="md:col-span-7 flex flex-col justify-between h-full min-h-[420px]">
                    
                    {/* Bagian Atas Judul & Highlights */}
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 text-[9px] font-bold text-[#4a5d39] uppercase tracking-wider mb-1.5">
                        <Compass size={11} />
                        <span>{paket.tagline}</span>
                        {paket.minPax && (
                          <>
                            <span className="text-stone-300">•</span>
                            <span className="text-slate-500 font-semibold lowercase tracking-normal flex items-center gap-0.5">
                              <Users size={10} className="text-slate-400" /> min. {paket.minPax} pax
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug mb-3">
                        {paket.nama}
                      </h3>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {paket.highlights.map((hl, idx) => (
                          <span 
                            key={idx} 
                            className="bg-stone-50 text-slate-700 border border-stone-200/50 text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-3xs"
                          >
                            <Star size={9} className="fill-amber-400 text-amber-400 flex-shrink-0" />
                            {hl}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* AREA SCROLL PANJANG (Mulai dari bawah highlight hingga sebelum harga) */}
                    <div className="flex-1 my-2 space-y-2 max-h-[280px] overflow-y-auto pr-1 scrollbar-thin">
                      {paket.kegiatan.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 border-b border-stone-50 pb-2.5 last:border-0 last:pb-0">
                          <span className="w-4 h-4 rounded-full bg-[#4a5d39]/10 text-[#4a5d39] font-bold flex items-center justify-center text-[8px] flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed font-medium text-[11px] sm:text-xs text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* BLOK BOTTOM ACTION (HARGA & TOMBOL) */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-stone-100 mt-auto">
                      {paket.hargaFlat ? (
                        <div className="flex flex-col">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Tarif All-In</span>
                          <div className="flex items-baseline gap-0.5">
                            <span className="text-xl font-black text-[#4a5d39] tracking-tight">
                              Rp {paket.hargaFlat.toLocaleString("id-ID")}
                            </span>
                            <span className="text-[9px] font-semibold text-slate-400">/pax</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-4">
                          <div className="flex flex-col">
                            <span className="text-[8px] font-bold text-[#4a5d39] uppercase tracking-wider flex items-center gap-0.5">
                              <GraduationCap size={10} /> Pelajar
                            </span>
                            <span className="text-base font-black text-slate-900 mt-0.5">
                              Rp {paket.hargaPelajar.toLocaleString("id-ID")}
                            </span>
                          </div>
                          <div className="w-[1px] bg-stone-200" />
                          <div className="flex flex-col">
                            <span className="text-[8px] font-bold text-amber-700 uppercase tracking-wider flex items-center gap-0.5">
                              <User size={10} /> Umum
                            </span>
                            <span className="text-base font-black text-amber-800 mt-0.5">
                              Rp {paket.hargaUmum.toLocaleString("id-ID")}
                            </span>
                          </div>
                        </div>
                      )}

                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={`https://wa.me/6281210002190?text=Sampurasun%20Admin%20Pasir%20Eurih,%20saya%20tertarik%20booking%20[${paket.nama}]`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#4a5d39] hover:bg-[#3d4f2e] text-white text-[11px] font-bold px-4 py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow-xs transition-colors duration-200 cursor-pointer w-full sm:w-auto text-center"
                      >
                        <span>Pesan Paket</span>
                      </motion.a>
                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}