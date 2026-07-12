"use client";

import { motion } from "framer-motion";
import { Landmark, History, Compass, Leaf, Droplet, Waves, Home, Calendar } from "lucide-react";
import Image from "next/image";
import dataBudaya from "@/data/situsBudaya.json"; // Sesuaikan path json kamu

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 70, damping: 14 } 
  }
};

export default function SitusBudaya() {
  return (
    <div className="bg-[#F8FAF7] min-h-screen text-[#2B3526] antialiased pb-24 overflow-x-hidden relative">
      
      {/* BACKGROUND PATTERN GRADASI HALUS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2B3526/[0.015]_1px,transparent_1px),linear-gradient(to_bottom,#2B3526/[0.015]_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* ───────────────── 1. HERO SECTION ───────────────── */}
      <section className="relative px-6 pt-4 pb-8 max-w-6xl mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-12 gap-6 items-end relative z-10"
        >
          <motion.div variants={itemVariants} className="md:col-span-7 col-span-12 text-left space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#3A4434]/5 border border-[#3A4434]/10 px-3 py-1 rounded-full text-[#3A4434]/80">
              <Landmark size={12} className="animate-pulse text-[#C87A33]" />
              <span className="text-[10px] font-black tracking-widest uppercase text-[#3A4434]">
                {dataBudaya.hero.tagline}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-[#2B3526]">
              {dataBudaya.hero.titleLine1} <br />
              <span className="text-[#C87A33] font-serif italic font-normal block mt-2">
                {dataBudaya.hero.titleLine2}
              </span>
            </h1>
          </motion.div>
          
          <motion.div variants={itemVariants} className="md:col-span-5 col-span-12 text-left pb-1">
            <p className="text-[#5C6657] text-xs md:text-sm font-medium leading-relaxed border-l-2 border-[#C87A33] pl-4">
              {dataBudaya.hero.description}
            </p>
          </motion.div>
        </motion.div>

        {/* Hero Media Grid (Disesuaikan khusus untuk video vertikal/stories) */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-12 gap-4 mt-8 items-stretch"
        >
          {/* Gambar Ritual Utama */}
          <div className="col-span-7 md:col-span-8 relative rounded-2xl overflow-hidden border border-[#E2E6E1] bg-white group shadow-2xs">
            <Image 
              src={dataBudaya.hero.image} 
              alt="Ritual Adat Sunda" 
              fill 
              priority
              sizes="(max-width: 768px) 100vw, 65vw"
              className="object-cover transition-transform duration-700 group-hover:scale-103" 
            />
          </div>
          
          {/* Card Bajidor Kahot (Sesuai format video vertical) */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="col-span-5 md:col-span-4 bg-white border border-[#E2E6E1] rounded-2xl p-4 flex flex-col justify-between text-left shadow-2xs hover:shadow-sm transition-all"
          >
            <div className="flex justify-between items-center w-full mb-2">
              <History className="text-[#C87A33] w-4 h-4" />
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#2B3526]/40 bg-[#3A4434]/5 px-2 py-0.5 rounded-sm">
                Live Action
              </span>
            </div>

            {/* Kotak Video Loops Portrait */}
            <div className="relative w-full flex-1 min-h-[180px] md:min-h-[240px] rounded-xl overflow-hidden bg-black/5 border border-[#E2E6E1]/60 shadow-inner">
              <video
                src={dataBudaya.hero.originVideo}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-95"
              />
              <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            </div>

            {/* Informasi Teks Seni Tari */}
            <div className="space-y-0.5 mt-3">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#2B3526]/50 block">Ragam Tari</span>
              <p className="text-lg md:text-xl font-black font-serif italic text-[#2B3526] leading-none">
                {dataBudaya.hero.originYear}
              </p>
              <p className="text-[10px] text-[#5C6657] font-medium leading-tight pt-1.5 border-t border-[#E2E6E1] mt-1">
                {dataBudaya.hero.originDesc}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* WAVE 1 */}
      <div className="w-full overflow-hidden leading-[0] text-[#3A4434]/10 h-14 my-4">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-full">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,4.75,55.05,10.3,81.18,14.75,156.57,27.57,234.83,62.58,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>

      {/* ───────────────── 2. SEJARAH MAJALAH ───────────────── */}
      <section className="px-6 py-10 max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid md:grid-cols-12 gap-12 items-start"
        >
          <motion.div variants={itemVariants} className="md:col-span-4 col-span-12 space-y-4 text-left">
            <span className="text-[#C87A33] font-bold text-[10px] uppercase tracking-widest block">
              {dataBudaya.history.tagline}
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight text-[#2B3526] whitespace-pre-line">
              {dataBudaya.history.title}
            </h2>
            <p className="text-[11px] text-[#5C6657] font-semibold leading-relaxed bg-white p-4 rounded-xl border border-[#E2E6E1] shadow-2xs">
              {dataBudaya.history.description1}
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="md:col-span-8 col-span-12 text-left space-y-6 text-[#5C6657] font-medium text-xs md:text-sm leading-relaxed md:pl-8">
            <p className="text-base text-[#2B3526] font-serif italic leading-relaxed">
              {dataBudaya.history.quote}
            </p>
            <p>{dataBudaya.history.description2}</p>
            <div className="relative aspect-[16/7] rounded-xl overflow-hidden border border-[#E2E6E1] shadow-2xs group">
              <Image 
                src={dataBudaya.history.image} 
                alt="Suasana Lembur Pasir Eurih" 
                fill 
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 group-hover:scale-102" 
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* WAVE 2 */}
      <div className="w-full overflow-hidden leading-[0] text-[#3A4434] h-16 mt-6">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-full">
          <path d="M0,0V120H1200V0C1113,60,989.49,20,896.85,55c-34.6,13-68.3,25-104.45,32-71.1,13-140.13,5-209.4-15C512.34,50,438.64,25,364.8,30c-70.47,5-136.44,35-206.8,42C103.59,78,47.79,65,0,35Z" fill="currentColor"></path>
        </svg>
      </div>

      {/* ───────────────── 3. SEKSI UTAMA: TIGA MAHKOTA SINDANG BARANG ───────────────── */}
      <section className="bg-[#3A4434] text-[#EBEFEA] pb-16 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-left space-y-2 mb-12">
            <span className="text-[#C87A33] font-bold text-[10px] uppercase tracking-widest block">
              {dataBudaya.trilogy.tagline}
            </span>
            <h2 className="text-3xl font-black tracking-tight text-white">
              {dataBudaya.trilogy.title}
            </h2>
            <p className="text-xs md:text-sm text-[#EBEFEA]/75 max-w-xl font-medium">
              {dataBudaya.trilogy.description}
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-6 items-stretch">
            {/* Card Kiri - Kampung Sindang Barang */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="md:col-span-7 col-span-12 bg-white text-[#2B3526] rounded-2xl p-6 md:p-8 flex flex-col justify-between gap-6 text-left shadow-md"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-[#3A4434]/5 border border-[#3A4434]/10 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#3A4434]">
                  <Home size={14} className="text-[#C87A33]" />
                  <span>{dataBudaya.trilogy.items[0].name}</span>
                </div>
                <p className="text-xs md:text-sm text-[#5C6657] font-medium leading-relaxed">
                  {dataBudaya.trilogy.items[0].desc}
                </p>
              </div>
              <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden bg-[#F4F6F3] border border-[#E2E6E1]">
                <Image 
                  src={dataBudaya.trilogy.items[0].image} 
                  alt={dataBudaya.trilogy.items[0].name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover" 
                />
              </div>
            </motion.div>

            {/* Sisi Kanan Cards */}
            <div className="md:col-span-5 col-span-12 flex flex-col gap-6">
              {/* Sumur Jalatunda */}
              <motion.div whileHover={{ y: -5 }} className="bg-[#2B3526] rounded-2xl p-6 text-left flex flex-col justify-between gap-4 flex-1">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#C87A33] text-xs font-black uppercase tracking-wider">
                    <Droplet size={14} />
                    <h3>{dataBudaya.trilogy.items[1].name}</h3>
                  </div>
                  <p className="text-[11px] text-[#EBEFEA]/80 font-medium leading-relaxed">
                    {dataBudaya.trilogy.items[1].desc}
                  </p>
                </div>
                <div className="relative w-full h-24 rounded-xl overflow-hidden bg-white/5">
                  <Image 
                    src={dataBudaya.trilogy.items[1].image} 
                    alt={dataBudaya.trilogy.items[1].name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover opacity-85" 
                  />
                </div>
              </motion.div>

              {/* Taman Sribaginda */}
              <motion.div whileHover={{ y: -5 }} className="bg-white text-[#2B3526] rounded-2xl p-6 text-left flex flex-col justify-between gap-4 flex-1">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#2B3526] text-xs font-black uppercase tracking-wider">
                    <Waves size={14} className="text-[#C87A33]" />
                    <h3>{dataBudaya.trilogy.items[2].name}</h3>
                  </div>
                  <p className="text-[11px] text-[#5C6657] font-medium leading-relaxed">
                    {dataBudaya.trilogy.items[2].desc}
                  </p>
                </div>
                <div className="relative w-full h-24 rounded-xl overflow-hidden bg-[#F4F6F3] border border-[#E2E6E1]">
                  <Image 
                    src={dataBudaya.trilogy.items[2].image} 
                    alt={dataBudaya.trilogy.items[2].name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover" 
                />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* WAVE 3 */}
      <div className="w-full overflow-hidden leading-[0] text-[#3A4434] h-16 transform rotate-180 -mt-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-full">
          <path d="M0,0V120H1200V0C1113,60,989.49,20,896.85,55c-34.6,13-68.3,25-104.45,32-71.1,13-140.13,5-209.4-15C512.34,50,438.64,25,364.8,30c-70.47,5-136.44,35-206.8,42C103.59,78,47.79,65,0,35Z" fill="currentColor"></path>
        </svg>
      </div>

      {/* ───────────────── 4. SEBARAN PUNDEN MEGALITIKUM ───────────────── */}
      <section className="px-6 py-12 max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-12 gap-8 items-end mb-12">
          <div className="md:col-span-7 col-span-12 text-left space-y-1">
            <span className="text-[#C87A33] font-bold text-[10px] uppercase tracking-widest block">
              {dataBudaya.megalithic.tagline}
            </span>
            <h2 className="text-3xl font-black tracking-tight text-[#2B3526]">
              {dataBudaya.megalithic.title}
            </h2>
          </div>
          <p className="md:col-span-5 col-span-12 text-left text-xs text-[#5C6657] font-medium leading-relaxed">
            {dataBudaya.megalithic.description}
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Batu Karut */}
          <motion.div whileHover={{ y: -4 }} className="md:col-span-7 col-span-12 bg-white border border-[#E2E6E1] rounded-2xl p-6 text-left flex flex-col justify-between gap-6 shadow-2xs">
            <div className="space-y-3">
              <Compass className="text-[#C87A33] w-5 h-5" />
              <h3 className="text-sm font-black uppercase tracking-wider text-[#2B3526]">
                {dataBudaya.megalithic.batuKarut.title}
              </h3>
              <p className="text-xs text-[#5C6657] font-medium leading-relaxed">
                {dataBudaya.megalithic.batuKarut.desc}
              </p>
            </div>
            <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden border border-[#E2E6E1]">
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
          <motion.div whileHover={{ y: -4 }} className="md:col-span-5 col-span-12 bg-white border border-[#E2E6E1] rounded-2xl p-6 text-left flex flex-col justify-between gap-6 shadow-2xs">
            <div className="space-y-3">
              <Leaf className="text-[#C87A33] w-5 h-5" />
              <h3 className="text-sm font-black uppercase tracking-wider text-[#2B3526]">
                {dataBudaya.megalithic.batuTapak.title}
              </h3>
              <p className="text-xs text-[#5C6657] font-medium leading-relaxed">
                {dataBudaya.megalithic.batuTapak.desc}
              </p>
            </div>
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#E2E6E1]">
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

      {/* ───────────────── 5. LIVING ARTS (ROMBAK TOTAL KE LAYOUT TIMELINE PREMIUM) ───────────────── */}
      <section className="px-6 py-16 max-w-5xl mx-auto border-t border-[#E2E6E1] relative z-10">
        <div className="text-center space-y-2 mb-20 max-w-xl mx-auto">
          <span className="text-[#C87A33] font-bold text-[10px] uppercase tracking-widest block">
            {dataBudaya.livingArts.tagline}
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#2B3526]">
            {dataBudaya.livingArts.title}
          </h2>
        </div>

        {/* Struktur Timeline */}
        <div className="relative w-full">
          {/* Garis Tengah Sumbu Utama (Hanya muncul di Desktop) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#E2E6E1] transform -translate-x-1/2 hidden md:block" />

          <div className="space-y-16 md:space-y-24">
            {dataBudaya.livingArts.items.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  key={idx}
                  className={`flex flex-col md:flex-row items-stretch relative gap-8 md:gap-16 w-full ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Badge Nomor di Garis Tengah (Hanya di Desktop) */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-9 h-9 bg-[#3A4434] text-white border-4 border-[#F8FAF7] text-xs font-black rounded-full hidden md:flex items-center justify-center z-20 shadow-xs top-1/2 -translate-y-1/2">
                    {item.id}
                  </div>

                  {/* SISI 1: Visual Gambar Gede Banget */}
                  <div className="w-full md:w-1/2 relative aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden border border-[#E2E6E1] bg-[#F4F6F3] shadow-sm group">
                    {/* Badge Nomor Mobile */}
                    <div className="absolute top-4 left-4 w-7 h-7 bg-[#3A4434] text-white text-xs font-black rounded-full flex md:hidden items-center justify-center z-10">
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

                  {/* SISI 2: Deskripsi Teks */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center text-left space-y-3">
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-wide text-[#2B3526]">
                      {item.title}
                    </h3>
                    <div className="w-12 h-[2px] bg-[#C87A33]" />
                    <p className="text-xs md:text-sm text-[#5C6657] font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────── 6. SEREN TAUN ───────────────── */}
      <section className="px-6 pb-16 max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-[#E2E6E1] rounded-2xl p-6 md:p-10 text-left grid md:grid-cols-12 gap-8 items-center shadow-2xs"
        >
          <div className="md:col-span-7 col-span-12 space-y-3">
            <div className="inline-flex items-center gap-2 text-[#C87A33] font-black text-[10px] uppercase tracking-widest">
              <Calendar size={12} />
              <span>{dataBudaya.serenTaun.tagline}</span>
            </div>
            <h3 className="text-2xl font-black tracking-tight text-[#2B3526]">
              {dataBudaya.serenTaun.title}
            </h3>
            <p className="text-xs text-[#5C6657] font-medium leading-relaxed">
              {dataBudaya.serenTaun.desc}
            </p>
          </div>
          <div className="md:col-span-5 col-span-12 relative aspect-[16/10] rounded-xl overflow-hidden border border-[#E2E6E1] group shadow-2xs">
            <Image 
              src={dataBudaya.serenTaun.image} 
              alt={dataBudaya.serenTaun.title} 
              fill 
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 group-hover:scale-104" 
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
}