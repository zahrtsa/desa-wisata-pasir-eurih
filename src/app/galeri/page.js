"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Images, Play, ExternalLink, MapPin, Phone, History, Camera, Layers, Grid, ArrowUpRight } from "lucide-react";
import Image from "next/image";

// Mengimpor data dari lokasi src/data/galeri.json
import dataGaleriBersih from "@/data/galeri.json";

function InstagramIcon({ size = 16, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const deskripsiKategori = {
  Semua: "Seluruh rangkuman visual kehidupan, alam, serta kekayaan tradisi luhur Sunda yang tumbuh subur di Pasir Eurih.",
  Budaya: "Warisan leluhur yang abadi. Mulai dari alunan rampak kendang kasepuhan, upacara adat, hingga situs sejarah cagar budaya kuno.",
  Alam: "Bentang keasrian lereng kaki Gunung Salak, gemercik aliran sungai jernih, hingga hamparan hijau terasering sawah.",
  Kriya: "Detak nadi UMKM desa. Mahakarya kerajinan tangan lokal, rajutan sol sepatu legendaris, hingga anyaman bambu otentik.",
  Warga: "Senyum dan kehangatan masyarakat. Potret gotong royong, kearifan lokal harian, serta interaksi ramah pengurus desa."
};

export default function GaleriBersih() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterAktif, setFilterAktif] = useState("Semua");

  const kategoriList = ["Semua", "Budaya", "Alam", "Kriya", "Warga"];

  // PENGAMAN: Jika file JSON kosong atau gagal di-load, tampilkan indikator loading
  if (!dataGaleriBersih || !Array.isArray(dataGaleriBersih)) {
    return (
      <div className="bg-[#FAF6F0] min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-md border border-[#ECE3D8]">
          <Layers className="mx-auto text-[#4D5B2F] animate-spin mb-3" size={32} />
          <p className="text-sm font-bold text-[#2E2A25]">Memuat Arsip Galeri...</p>
        </div>
      </div>
    );
  }

  // Memfilter data dari JSON secara dinamis berdasar tag
  const dataTersaring = filterAktif === "Semua" 
    ? dataGaleriBersih 
    : dataGaleriBersih.filter(item => item.tag === filterAktif);

  return (
    <div className="bg-[#FAF6F0] min-h-screen text-[#2E2A25] antialiased bg-[radial-gradient(#e6ded4_1px,transparent_1px)] [background-size:32px_32px]">
      
      {/* HEADER BANNER */}
      <section className="relative bg-[#4D5B2F] text-white px-6 pt-24 pb-32 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-4 shadow-sm">
            <Camera size={13} className="text-[#EED9B7]" />
            <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#F4F0E6]">Arsip Dokumentasi Desa</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-4 leading-tight">
            Eksplorasi <span className="text-[#EED9B7] italic font-serif font-normal">Pasir Eurih</span>
          </h1>
          <p className="text-[#E7E1D6] text-xs md:text-base max-w-2xl font-medium opacity-90 leading-relaxed">
            Menolak punah melalui lensa. Kumpulan potret murni, harmoni budaya Sunda, serta rekam jejak harian warga beralaskan kearifan lokal.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden transform translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[50px] text-[#F4F1EA] fill-current">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
          </svg>
        </div>
      </section>

      {/* HERO HIGHLIGHT VIDEO */}
      <section className="bg-[#F4F1EA] pb-20 pt-2 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16 bg-white/80 backdrop-blur-xs p-6 md:p-10 rounded-[32px] shadow-[0_10px_40px_rgba(77,91,47,0.03)] border border-[#ECE3D8]">
          <div className="w-full lg:w-[55%] shrink-0">
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <video 
                src="/images/galeri/hero.mp4" 
                controls 
                className="w-full h-full object-cover"
                preload="metadata"
                controlsList="nodownload"
              >
                Browser Anda tidak mendukung pemutar video HTML5.
              </video>
            </div>
          </div>

          <div className="w-full lg:w-[45%] flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 bg-[#B96832]/10 text-[#B96832] px-3 py-1 rounded-md w-fit mb-3 border border-[#B96832]/20">
              <History size={13} />
              <span className="text-[10px] font-black tracking-widest uppercase">Sorotan Dokumenter</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-[#2E2A25] tracking-tight leading-tight mb-4">
              Mencari Tempat Semedi dengan <br />
              <span className="text-[#4D5B2F] italic font-serif font-normal">Sejarah yang Hidup?</span>
            </h2>

            <div className="text-xs md:text-sm text-[#5F574E] leading-relaxed space-y-3 font-medium">
              <p>Yuk jelajahi <strong className="text-[#2E2A25]">Situs Taman Sri Baginda</strong> di Desa Wisata Pasir Eurih, Bogor.</p>
              <p>Di sinilah dulunya berdiri megah <strong className="text-[#B96832]">Kerajaan Sindang Barang</strong>, dipimpin oleh permaisuri agung Dewi Kentring Manik Mayang Sunda.</p>
            </div>

            <div className="h-px bg-dashed border-t border-[#ECE3D8] w-full my-6" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="flex items-center gap-3.5 bg-[#FAF8F5]/60 p-3 rounded-xl border border-[#ECE3D8]">
                <div className="p-2.5 bg-[#4D5B2F] rounded-xl text-white shadow-xs shrink-0">
                  <MapPin size={15} />
                </div>
                <div>
                  <h4 className="text-[9px] font-extrabold text-[#A2978C] uppercase tracking-wider">Lokasi Utama</h4>
                  <p className="text-sm font-bold text-[#2E2A25]">Pasir Eurih, Bogor</p>
                </div>
              </div>

              <a 
                href="https://wa.me/6283872509223" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3.5 bg-[#FAF8F5]/60 p-3 rounded-xl border border-[#ECE3D8] hover:border-[#4D5B2F] transition-all duration-300 group"
              >
                <div className="p-2.5 bg-[#B96832] rounded-xl text-white shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                  <Phone size={15} />
                </div>
                <div>
                  <h4 className="text-[9px] font-extrabold text-[#A2978C] uppercase tracking-wider">Kontak Kasepuhan</h4>
                  <p className="text-sm font-bold text-[#2E2A25] group-hover:text-[#4D5B2F] transition-colors flex items-center gap-1">
                    Abah Deden <ArrowUpRight size={12} className="opacity-60" />
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* JUDUL SEKSI GALERI */}
      <section className="pt-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#ECE3D8] pb-6 gap-6">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 text-[#4D5B2F] font-black text-[11px] tracking-widest uppercase mb-2">
              <Grid size={13} className="text-[#B96832]" />
              <span>Arsip Jagat Media</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#2E2A25] tracking-tight leading-none">
              Koleksi Dokumentasi: <span className="text-[#B96832] font-serif italic font-normal">{filterAktif}</span>
            </h2>
            <p className="text-[#6F665E] text-xs md:text-sm mt-3 leading-relaxed font-medium">
              {deskripsiKategori[filterAktif]}
            </p>
          </div>

          <div className="shrink-0 bg-white border border-[#E8DED2] px-5 py-3 rounded-2xl shadow-2xs text-left md:text-right hidden sm:block">
            <span className="text-[9px] font-bold text-[#A2978C] block uppercase tracking-widest">Arsip Terpajang</span>
            <span className="text-xl font-black text-[#4D5B2F] font-serif">{dataTersaring.length} <span className="text-xs font-sans font-medium text-[#6F665E]">Karya Media</span></span>
          </div>
        </div>
      </section>

      {/* STICKY FILTER CATEGORY BAR */}
      <section className="sticky top-0 bg-[#FAF6F0]/90 backdrop-blur-md z-40 px-6 py-4 border-b border-[#ECE3D8] shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-start overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2.5 whitespace-nowrap py-1">
            {kategoriList.map((kat) => (
              <button
                key={kat}
                onClick={() => setFilterAktif(kat)}
                className={`px-6 py-2 rounded-xl text-xs font-extrabold tracking-wide transition-all duration-300 ${
                  filterAktif === kat
                    ? "bg-[#4D5B2F] text-white shadow-md shadow-[#4D5B2F]/20 scale-102"
                    : "bg-white border border-[#E8DED2] text-[#6F665E] hover:text-[#4D5B2F] hover:border-[#4D5B2F]/50 hover:bg-[#FAF8F5]"
                }`}
              >
                {kat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MASONRY GRID - MENAMPILKAN SEMUA FOTO DARI JSON */}
      <section className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7 auto-rows-[160px] md:auto-rows-[230px] w-full"
        >
          <AnimatePresence mode="popLayout">
            {dataTersaring.map((item) => {
              // Pengaturan grid masonry berdasarkan properti "size" di JSON
              let gridClasses = "col-span-1 row-span-1";
              if (item.size === "large") gridClasses = "md:col-span-2 md:row-span-2 col-span-2 row-span-2";
              if (item.size === "tall") gridClasses = "md:col-span-1 md:row-span-2 col-span-1 row-span-2";

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`group relative rounded-[24px] overflow-hidden cursor-pointer select-none h-full w-full 
                    shadow-[0_12px_30px_rgba(77,91,47,0.06)] 
                    hover:shadow-[0_20px_50px_rgba(185,104,50,0.18)] 
                    hover:-translate-y-1.5 transition-all duration-500 ease-out ${gridClasses}`}
                >
                  <div className="relative w-full h-full bg-[#FAF9F5]">
                    <Image 
                      src={item.src} 
                      alt={item.caption || "Gambar Galeri"} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />

                    {/* Icon Indikator Atas */}
                    <div className="absolute top-3 right-3 z-20 bg-black/30 backdrop-blur-md text-white p-2.5 rounded-xl border border-white/10 group-hover:bg-[#4D5B2F] transition-colors duration-300">
                      {item.type === "reels" ? (
                        <InstagramIcon size={12} className="text-white" />
                      ) : (
                        <Images size={12} className="text-white" />
                      )}
                    </div>

                    {/* Overlay Deskripsi Teks */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 z-10 text-left">
                      <span className="text-[9px] font-black text-[#EED9B7] tracking-widest uppercase block mb-1">
                        {item.tag} · {item.type === "reels" ? "▶ Reels" : "📷 Potret"}
                      </span>
                      <p className="text-white text-xs font-bold leading-relaxed line-clamp-2 md:line-clamp-3">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* State Jika Kategori Kosong */}
        {dataTersaring.length === 0 && (
          <div className="text-center py-28 bg-white/60 backdrop-blur-xs rounded-3xl border-2 border-dashed border-[#ECE3D8] w-full">
            <Layers className="mx-auto text-[#C2B7A9] mb-3 animate-bounce" size={40} />
            <h4 className="text-base font-black text-[#2E2A25]">Belum Ada Arsip Media</h4>
            <p className="text-xs font-medium text-[#6F665E] mt-1">Dokumentasi digital untuk kategori ini sedang dipersiapkan oleh pengurus desa.</p>
          </div>
        )}
      </section>

      {/* LIGHTBOX MODAL PREVIEW */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={selectedItem.src} alt="Pratinjau Besar" fill className="object-cover" unoptimized />
              {selectedItem.type === "reels" && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg">
                    <Play size={20} className="fill-current translate-x-0.5" />
                  </div>
                </div>
              )}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
              className="text-center mt-6 max-w-md px-4 flex flex-col items-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="inline-block bg-[#EED9B7] text-[#2E2A25] text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-widest mb-3 shadow-xs">
                Koleksi {selectedItem.tag}
              </span>
              <p className="text-white text-sm font-semibold tracking-wide opacity-95 leading-relaxed mb-5">
                {selectedItem.caption}
              </p>

              {selectedItem.type === "reels" && selectedItem.instagramUrl && (
                <a
                  href={selectedItem.instagramUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-xl"
                >
                  <InstagramIcon size={14} />
                  Tonton di Instagram <ExternalLink size={11} />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}