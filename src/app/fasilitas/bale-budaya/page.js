"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Landmark, Calendar, Users, ShieldCheck, 
  Sparkles, ArrowRight, MessageCircle, Volume2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// IMPORT DATA JSON ASLI
import data from "@/data/baleBudaya.json"; 

export default function BaleBudayaPage() {
  const [playedNote, setPlayedNote] = useState(null);

  // Kontak Pengelola Utama (Pak Desen - Wisata & Fasilitas Sanggar/Bale Budaya)
  const CONTACT_PAK_DESEN = "6285695146164";

  const playBambooSound = (noteName, fileName) => {
    setPlayedNote(noteName);
    if (typeof window !== "undefined") {
      const audio = new Audio(`/sounds/${fileName}`);
      audio.volume = 0.9;
      audio.play().catch((err) => console.log("Autoplay ditangguhkan browser sebelum interaksi.", err));
    }
    setTimeout(() => setPlayedNote(null), 400);
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen font-sans antialiased text-[#1A2616] pb-32 relative">
      
      {/* BACKGROUND ORNAMEN ALAM MELAYANG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="absolute top-20 left-10 w-48 h-48 bg-emerald-200/20 rounded-full blur-3xl" />
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }} className="absolute top-1/3 right-10 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl" />
      </div>

      {/* HERO BANNER */}
      <section className="relative bg-[#1A2616] text-white px-6 py-20 md:py-28 text-left overflow-hidden border-b-4 border-amber-500/20">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 items-center relative z-10">
          
          <div className="md:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 backdrop-blur-md text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl border border-amber-400/30">
              <Sparkles size={14} className="animate-pulse" /> {data.hero.tag}
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white">
              {data.hero.titleWord1} <span className="text-amber-400 font-serif italic">{data.hero.titleWord2}</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-amber-200">{data.hero.location}</span>
            </h1>
            <p className="text-stone-300 text-sm md:text-base max-w-xl font-normal leading-relaxed">
              {data.hero.description}
            </p>
          </div>
          
          {/* MINI INSTRUMEN SIMULATOR (DA-MI-NA) */}
          <div className="md:col-span-5 bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl relative">
            <div className="absolute -top-3 -right-3 bg-amber-500 text-black font-black text-[10px] px-2.5 py-1 rounded-md rotate-6 shadow-lg animate-bounce">
              KLIK TABUNG!
            </div>
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2 mb-1">
              <Volume2 size={14} /> MINI BAMBOO SIMULATOR
            </h3>
            <p className="text-[11px] text-stone-300 mb-6">Goyang atau klik bambu di bawah untuk mendengarkan getaran bunyinya:</p>
            
            <div className="bg-stone-900/50 rounded-2xl p-6 border border-white/5 flex justify-around items-end min-h-[160px]">
              {data.angklungNotes.map((item) => (
                <div key={item.note} className="flex flex-col items-center gap-3 group">
                  <div className="w-0.5 h-6 bg-amber-700/60" />
                  
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    animate={playedNote === item.note ? { rotate: [-8, 8, -6, 6, 0], x: [-2, 2, -2, 2, 0] } : {}}
                    transition={{ duration: 0.3 }}
                    onClick={() => playBambooSound(item.note, item.fileName)}
                    title={item.soundName}
                    className={`w-12 ${item.height} bg-gradient-to-b from-amber-800 via-amber-700 to-amber-900 rounded-full border-2 border-amber-600/40 shadow-xl flex flex-col justify-end items-center pb-3 cursor-pointer relative ${
                      playedNote === item.note ? 'brightness-125 ring-2 ring-amber-400' : ''
                    }`}
                  >
                    <div className="absolute inset-y-0 left-1/2 w-[1px] bg-black/20" />
                    <span className="text-[10px] font-black text-amber-100 font-mono tracking-wider relative z-10">{item.note}</span>
                  </motion.button>
                  <span className="text-[9px] text-stone-400 font-medium">{item.note}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="max-w-6xl mx-auto px-6 pt-8 text-xs text-stone-500 flex gap-2">
        <Link href="/" className="hover:text-[#2D3E25] transition-colors">Beranda</Link>
        <span>/</span>
        <span className="font-semibold text-stone-800">Fasilitas</span>
        <span>/</span>
        <span className="font-semibold text-[#2D3E25]">Bale Budaya</span>
      </div>

      {/* BENTO CONTENT LAYOUT */}
      <main className="max-w-6xl mx-auto px-6 mt-8 space-y-12">
        <div className="grid md:grid-cols-12 gap-6 items-stretch">
          
          {/* Bento Card 1: Panggung Pertunjukan Tradisional */}
          <div className="md:col-span-8 bg-white border border-stone-200 rounded-[2rem] p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100 inline-block">
                {data.bentoContent.simfoniBambu.tag}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#1A2616] tracking-tight">
                {data.bentoContent.simfoniBambu.title}
              </h2>
              <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
                {data.bentoContent.simfoniBambu.description}
              </p>
            </div>
            
            <div className="mt-6 h-60 md:h-72 w-full bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 shadow-inner relative">
              <Image 
                src={data.bentoContent.simfoniBambu.image.src} 
                alt={data.bentoContent.simfoniBambu.image.alt} 
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Bento Card 2: Desain Bambu Hitam */}
          <div className="md:col-span-4 bg-[#2D3E25] text-white rounded-[2rem] p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="p-2.5 bg-white/10 rounded-xl w-fit text-amber-400"><Landmark size={18} /></div>
              <h3 className="text-lg font-bold tracking-tight">{data.bentoContent.desainBambu.title}</h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                {data.bentoContent.desainBambu.description}
              </p>
            </div>
            <div className="border-t border-white/10 pt-4 mt-6">
              <span className="text-[9px] font-mono tracking-widest text-amber-400 block uppercase font-bold">Fakta Material</span>
              <p className="text-xs italic text-stone-200 mt-1">
                {`"${data.bentoContent.desainBambu.fact}"`}
              </p>
            </div>
          </div>

          {/* Bento Card 3: Kaulinan Budak Lembur */}
          <div className="md:col-span-4 bg-white border border-stone-200 rounded-[2rem] p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-100 inline-block">
                {data.bentoContent.kaulinanBudak.tag}
              </span>
              <h3 className="text-xl font-extrabold text-[#1A2616] tracking-tight">{data.bentoContent.kaulinanBudak.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {data.bentoContent.kaulinanBudak.description}
              </p>
            </div>
            
            <div className="mt-6 h-48 w-full bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 shadow-inner relative">
              <Image 
                src={data.bentoContent.kaulinanBudak.image.src} 
                alt={data.bentoContent.kaulinanBudak.image.alt} 
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Bento Card 4: Pelestarian Ritme Seren Taun */}
          <div className="md:col-span-8 bg-white border border-stone-200 rounded-[2rem] p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-orange-50 text-orange-800 border border-orange-100 inline-block">
                {data.bentoContent.serenTaun.tag}
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-[#1A2616] tracking-tight">{data.bentoContent.serenTaun.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {data.bentoContent.serenTaun.description}
              </p>
            </div>
            
            <div className="mt-6 h-48 w-full bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 shadow-inner relative">
              <Image 
                src={data.bentoContent.serenTaun.image.src} 
                alt={data.bentoContent.serenTaun.image.alt} 
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover object-center"
              />
            </div>
          </div>

        </div>

        {/* FOOTER OPERASIONAL & RESERVASI */}
        <div className="bg-white border border-stone-200 rounded-[2rem] p-8 md:p-10 shadow-2xs grid lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-5">
            <h3 className="text-lg font-black text-[#1A2616] tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#2D3E25] rounded-full block" />
              Ketentuan Kunjungan & Edukasi Budaya
            </h3>
            <div className="grid sm:grid-cols-3 gap-6 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#2D3E25]"><Calendar size={14}/> Sistem Reservasi</div>
                <p className="text-[11px] text-stone-500 leading-relaxed font-light">Menerima kunjungan rombongan studi atau dinas dengan konfirmasi H-2.</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#2D3E25]"><Users size={14}/> Kapasitas Lesehan</div>
                <p className="text-[11px] text-stone-500 leading-relaxed font-light">Pendopo utama sanggup menampung hingga 120 orang peserta.</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#2D3E25]"><ShieldCheck size={14}/> Layanan Lengkap</div>
                <p className="text-[11px] text-stone-500 leading-relaxed font-light">Sudah termasuk peminjaman alat musik, pemandu budaya, dan sound system.</p>
              </div>
            </div>
          </div>

          {/* BOX RESERVASI - TERHUBUNG KE PAK DESEN */}
          <div className="bg-[#1A2616] text-white rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-bold text-amber-400 font-mono tracking-wider">RESERVASI KELOMPOK</div>
              <p className="text-[11px] text-stone-300 leading-relaxed font-light">
                Agendakan sesi khusus bersama Pak Desen untuk kunjungan & reservasi fasilitas Bale Budaya.
              </p>
            </div>
            <motion.a
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              href={`https://wa.me/${CONTACT_PAK_DESEN}?text=${encodeURIComponent(`Sampurasun Pak Desen, saya ingin berdiskusi perihal paket kunjungan rombongan / reservasi di Bale Budaya Desa Pasir Eurih.`)}`}
              target="_blank" rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <MessageCircle size={14} /> <span>Hubungi Pak Desen</span> <ArrowRight size={12} />
            </motion.a>
          </div>
        </div>

      </main>

    </div>
  );
}