"use client";

import { motion } from "framer-motion";
import {
  Landmark,
  History,
  Compass,
  Leaf,
  Droplet,
  Waves,
  Home,
  Calendar,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import dataBudaya from "@/data/situsBudaya.json";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 14 },
  },
};

export default function SitusBudaya() {
  return (
    <div className="bg-[#F8FAF7] min-h-screen text-[#2B3526] antialiased pb-16 md:pb-24 overflow-x-hidden relative">
      {/* BACKGROUND PATTERN */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2B3526/[0.015]_1px,transparent_1px),linear-gradient(to_bottom,#2B3526/[0.015]_1px,transparent_1px)] bg-[size:24px_24px] md:bg-[size:32px_32px] pointer-events-none" />

      {/* ───────────────── 1. HERO SECTION ───────────────── */}
      <section className="relative px-4 sm:px-6 pt-6 pb-6 md:pb-8 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-end relative z-10"
        >
          <motion.div variants={itemVariants} className="md:col-span-7 space-y-2 md:space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-[#3A4434]/5 border border-[#3A4434]/10 px-2.5 py-1 rounded-full text-[#3A4434]/80">
              <Landmark size={12} className="animate-pulse text-[#C87A33]" />
              <span className="text-[9px] md:text-[10px] font-black tracking-widest uppercase text-[#3A4434]">
                {dataBudaya.hero.tagline}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight md:leading-none text-[#2B3526]">
              {dataBudaya.hero.titleLine1} <br />
              <span className="text-[#C87A33] font-serif italic font-normal block mt-1 md:mt-2">
                {dataBudaya.hero.titleLine2}
              </span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-5 pb-1">
            <p className="text-[#5C6657] text-xs sm:text-sm font-medium leading-relaxed border-l-2 border-[#C87A33] pl-3 md:pl-4">
              {dataBudaya.hero.description}
            </p>
          </motion.div>
        </motion.div>

        {/* Hero Media Grid */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-6 md:mt-8 items-stretch"
        >
          {/* Gambar Ritual Utama */}
          <div className="md:col-span-7 lg:col-span-8 relative rounded-2xl overflow-hidden border border-[#E2E6E1] bg-white group shadow-xs min-h-[200px] sm:min-h-[260px] md:min-h-full">
            <Image
              src={dataBudaya.hero.image}
              alt="Ritual Adat Sunda"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 65vw"
              className="object-cover transition-transform duration-700 group-hover:scale-103"
            />
          </div>

          {/* Card Bajidor Kahot (Video Vertical) */}
          <motion.div
            whileHover={{ y: -3 }}
            className="md:col-span-5 lg:col-span-4 bg-white border border-[#E2E6E1] rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-xs hover:shadow-sm transition-all"
          >
            <div className="flex justify-between items-center w-full mb-2">
              <History className="text-[#C87A33] w-4 h-4" />
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#2B3526]/50 bg-[#3A4434]/5 px-2 py-0.5 rounded-xs">
                Live Action
              </span>
            </div>

            {/* Frame Video Loop */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[3/4] rounded-xl overflow-hidden bg-black/5 border border-[#E2E6E1]/60 shadow-inner">
              <video
                src={dataBudaya.hero.originVideo}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="space-y-0.5 mt-3">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#2B3526]/50 block">
                Ragam Tari
              </span>
              <p className="text-base sm:text-lg md:text-xl font-black font-serif italic text-[#2B3526] leading-tight">
                {dataBudaya.hero.originYear}
              </p>
              <p className="text-[10px] sm:text-xs text-[#5C6657] font-medium leading-relaxed pt-1.5 border-t border-[#E2E6E1] mt-1">
                {dataBudaya.hero.originDesc}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* WAVE 1 */}
      <div className="w-full overflow-hidden leading-none text-[#3A4434]/10 h-8 sm:h-12 my-2 sm:my-4">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,4.75,55.05,10.3,81.18,14.75,156.57,27.57,234.83,62.58,321.39,56.44Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* ───────────────── 2. SEJARAH MAJALAH (REDESAIN DESKTOP) ───────────────── */}
      <section className="px-4 sm:px-6 py-12 md:py-16 max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
        >
          {/* KIRI: Foto Dokumentasi Utama (Gaya Asimetris Modern) */}
          <motion.div variants={itemVariants} className="md:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#E2E6E1] shadow-md group">
              <Image 
                src={dataBudaya.history.image} 
                alt="Suasana Lembur Pasir Eurih" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-103" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
            </div>

            {/* Badge Highlight di pojok foto */}
            <div className="absolute -bottom-4 -right-2 md:right-4 bg-white border border-[#E2E6E1] p-3.5 rounded-2xl shadow-lg max-w-[220px] hidden sm:block">
              <p className="text-[10px] font-bold text-[#C87A33] uppercase tracking-wider">Warisan Leluhur</p>
              <p className="text-xs font-bold text-[#2B3526] mt-0.5">Pusat Pelatihan Ksatria Kerajaan Kuno</p>
            </div>
          </motion.div>

          {/* KANAN: Narasi Teks Lengkap */}
          <motion.div variants={itemVariants} className="md:col-span-6 space-y-5 text-left md:pl-4">
            <div className="space-y-2">
              <span className="text-[#C87A33] font-black text-[10px] uppercase tracking-widest block">
                {dataBudaya.history.tagline}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#2B3526] leading-tight">
                {dataBudaya.history.title}
              </h2>
            </div>

            {/* Quote Box Bergaya Editor / Majalah */}
            <div className="bg-[#3A4434]/5 border-l-4 border-[#C87A33] p-4 rounded-r-2xl">
              <p className="text-xs sm:text-sm text-[#2B3526] font-serif italic font-medium leading-relaxed">
                {dataBudaya.history.quote}
              </p>
            </div>

            {/* Paragraf Deskripsi */}
            <div className="space-y-3 text-xs sm:text-sm text-[#5C6657] font-medium leading-relaxed">
              <p>{dataBudaya.history.description1}</p>
              <p>{dataBudaya.history.description2}</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* WAVE 2 */}
      <div className="w-full overflow-hidden leading-none text-[#3A4434] h-10 sm:h-16 mt-4">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,0V120H1200V0C1113,60,989.49,20,896.85,55c-34.6,13-68.3,25-104.45,32-71.1,13-140.13,5-209.4-15C512.34,50,438.64,25,364.8,30c-70.47,5-136.44,35-206.8,42C103.59,78,47.79,65,0,35Z" fill="currentColor"></path>
        </svg>
      </div>

      {/* ───────────────── 3. SITUS SAKRAL / TIGA MAHKOTA (REDESAIN DESKTOP) ───────────────── */}
      <section className="bg-[#3A4434] text-[#EBEFEA] py-12 sm:py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Header Tengah */}
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10 sm:mb-14">
            <span className="text-[#C87A33] font-bold text-[10px] uppercase tracking-widest block">
              {dataBudaya.trilogy.tagline}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              {dataBudaya.trilogy.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#EBEFEA]/75 font-medium leading-relaxed">
              {dataBudaya.trilogy.description}
            </p>
          </div>

          {/* Grid Bento Modern (1 Kartu Utama Besar + 2 Kartu Samping Seimbang) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* 1. Kampung Sindang Barang (Kartu Utama Kiri - Span 7) */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="md:col-span-7 bg-white text-[#2B3526] rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-xl relative overflow-hidden group"
            >
              <div className="space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 bg-[#3A4434]/5 border border-[#3A4434]/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#3A4434]">
                  <Home size={14} className="text-[#C87A33]" />
                  <span>{dataBudaya.trilogy.items[0].name}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#5C6657] font-medium leading-relaxed">
                  {dataBudaya.trilogy.items[0].desc}
                </p>
              </div>

              {/* Gambar Utama dengan Rasio Tinggi Seimbang */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#F4F6F3] border border-[#E2E6E1]">
                <Image 
                  src={dataBudaya.trilogy.items[0].image} 
                  alt={dataBudaya.trilogy.items[0].name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-103" 
                />
              </div>
            </motion.div>

            {/* Kolom Samping Kanan (Span 5) - Berisi 2 Kartu dengan Tinggi Fleksibel */}
            <div className="md:col-span-5 flex flex-col gap-6">
              
              {/* 2. Sumur Jalatunda */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-[#232B20] text-white rounded-3xl p-5 flex flex-col justify-between gap-4 flex-1 border border-white/10 shadow-lg group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[#C87A33] text-xs font-black uppercase tracking-wider">
                    <Droplet size={14} />
                    <h3>{dataBudaya.trilogy.items[1].name}</h3>
                  </div>
                  <p className="text-xs text-[#EBEFEA]/80 font-medium leading-relaxed">
                    {dataBudaya.trilogy.items[1].desc}
                  </p>
                </div>
                <div className="relative w-full h-32 rounded-xl overflow-hidden bg-black/20 border border-white/10">
                  <Image 
                    src={dataBudaya.trilogy.items[1].image} 
                    alt={dataBudaya.trilogy.items[1].name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
              </motion.div>

              {/* 3. Taman Sribaginda */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-white text-[#2B3526] rounded-3xl p-5 flex flex-col justify-between gap-4 flex-1 border border-[#E2E6E1] shadow-lg group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[#2B3526] text-xs font-black uppercase tracking-wider">
                    <Waves size={14} className="text-[#C87A33]" />
                    <h3>{dataBudaya.trilogy.items[2].name}</h3>
                  </div>
                  <p className="text-xs text-[#5C6657] font-medium leading-relaxed">
                    {dataBudaya.trilogy.items[2].desc}
                  </p>
                </div>
                <div className="relative w-full h-32 rounded-xl overflow-hidden bg-[#F4F6F3] border border-[#E2E6E1]">
                  <Image 
                    src={dataBudaya.trilogy.items[2].image} 
                    alt={dataBudaya.trilogy.items[2].name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── 4. SEBARAN PUNDEN MEGALITIKUM ───────────────── */}
      <section className="px-4 sm:px-6 py-8 sm:py-12 max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-end mb-8 sm:mb-10">
          <div className="md:col-span-7 space-y-1">
            <span className="text-[#C87A33] font-bold text-[10px] uppercase tracking-widest block">
              {dataBudaya.megalithic.tagline}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#2B3526]">
              {dataBudaya.megalithic.title}
            </h2>
          </div>
          <p className="md:col-span-5 text-xs sm:text-sm text-[#5C6657] font-medium leading-relaxed">
            {dataBudaya.megalithic.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {/* Batu Karut */}
          <motion.div
            whileHover={{ y: -3 }}
            className="md:col-span-7 bg-white border border-[#E2E6E1] rounded-2xl p-4 sm:p-6 flex flex-col justify-between gap-4 shadow-2xs"
          >
            <div className="space-y-2">
              <Compass className="text-[#C87A33] w-5 h-5" />
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#2B3526]">
                {dataBudaya.megalithic.batuKarut.title}
              </h3>
              <p className="text-xs text-[#5C6657] font-medium leading-relaxed">
                {dataBudaya.megalithic.batuKarut.desc}
              </p>
            </div>
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden border border-[#E2E6E1]">
              <Image
                src={dataBudaya.megalithic.batuKarut.image}
                alt={dataBudaya.megalithic.batuKarut.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Batu Tapak */}
          <motion.div
            whileHover={{ y: -3 }}
            className="md:col-span-5 bg-white border border-[#E2E6E1] rounded-2xl p-4 sm:p-6 flex flex-col justify-between gap-4 shadow-2xs"
          >
            <div className="space-y-2">
              <Leaf className="text-[#C87A33] w-5 h-5" />
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#2B3526]">
                {dataBudaya.megalithic.batuTapak.title}
              </h3>
              <p className="text-xs text-[#5C6657] font-medium leading-relaxed">
                {dataBudaya.megalithic.batuTapak.desc}
              </p>
            </div>
            <div className="relative w-full aspect-[16/9] sm:aspect-[4/3] rounded-xl overflow-hidden border border-[#E2E6E1]">
              <Image
                src={dataBudaya.megalithic.batuTapak.image}
                alt={dataBudaya.megalithic.batuTapak.title}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────────── 5. LIVING ARTS TIMELINE ───────────────── */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 max-w-5xl mx-auto border-t border-[#E2E6E1] relative z-10">
        <div className="text-center space-y-2 mb-12 sm:mb-16 max-w-xl mx-auto">
          <span className="text-[#C87A33] font-bold text-[10px] uppercase tracking-widest block">
            {dataBudaya.livingArts.tagline}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#2B3526]">
            {dataBudaya.livingArts.title}
          </h2>
        </div>

        <div className="relative w-full">
          {/* Sumbu Utama Desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#E2E6E1] transform -translate-x-1/2 hidden md:block" />

          <div className="space-y-10 sm:space-y-16">
            {dataBudaya.livingArts.items.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  key={idx}
                  className={`flex flex-col md:flex-row items-center relative gap-6 md:gap-12 w-full ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Badge Nomor Desktop */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#3A4434] text-white border-2 border-[#F8FAF7] text-xs font-black rounded-full hidden md:flex items-center justify-center z-20 shadow-xs top-1/2 -translate-y-1/2">
                    {item.id}
                  </div>

                  {/* Visual Gambar */}
                  <div className="w-full md:w-1/2 relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#E2E6E1] bg-[#F4F6F3] shadow-2xs group">
                    {/* Badge Nomor Mobile */}
                    <div className="absolute top-3 left-3 w-6 h-6 bg-[#3A4434] text-white text-[10px] font-black rounded-full flex md:hidden items-center justify-center z-10 shadow-xs">
                      {item.id}
                    </div>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-104"
                    />
                  </div>

                  {/* Deskripsi Teks */}
                  <div className="w-full md:w-1/2 space-y-2 text-left">
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-wide text-[#2B3526]">
                      {item.title}
                    </h3>
                    <div className="w-10 h-[2px] bg-[#C87A33]" />
                    <p className="text-xs sm:text-sm text-[#5C6657] font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────── 6. DESAIN BARU: SEREN TAUN AGUNG ───────────────── */}
      <section className="px-4 sm:px-6 pt-4 pb-12 sm:pb-16 max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-[#1E251B] text-white shadow-xl border border-[#3A4434]"
        >
          {/* Overlay Background Image - Opacity dinaikkan & Gradient diperhalus di sisi teks saja */}
          <div className="absolute inset-0 z-0">
            <Image
              src={dataBudaya.serenTaun.image}
              alt={dataBudaya.serenTaun.title}
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Gradient gelap tipis hanya di kiri untuk keterbacaan teks, sebelah kanan gambarnya tajam & jelas */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A2218]/95 via-[#1A2218]/75 to-black/30 md:to-black/20" />
          </div>

          {/* Konten Utama */}
          <div className="relative z-10 p-6 sm:p-10 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#C87A33]/25 border border-[#C87A33]/50 px-3 py-1 rounded-full backdrop-blur-md">
                <Sparkles size={13} className="text-[#E08E45]" />
                <span className="text-[10px] font-black tracking-widest uppercase text-[#F8FAF7]">
                  {dataBudaya.serenTaun.tagline}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight drop-shadow-sm">
                {dataBudaya.serenTaun.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#EBEFEA] font-medium leading-relaxed max-w-xl drop-shadow-xs">
                {dataBudaya.serenTaun.desc}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#E08E45]">
                <div className="flex items-center gap-1.5 bg-black/40 border border-white/15 px-3 py-1.5 rounded-lg backdrop-blur-xs">
                  <Calendar size={14} />
                  <span>Perayaan Tahunan Syukur Panen</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Kanan - Diberi bingkai terang & efek terangkat agar gambar sangat menonjol */}
            <div className="md:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl group hover:scale-[1.02] transition-transform duration-300">
              <Image
                src={dataBudaya.serenTaun.image}
                alt={dataBudaya.serenTaun.title}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}