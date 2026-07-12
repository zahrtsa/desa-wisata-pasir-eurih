"use client";

import { motion } from "framer-motion";
import {
  Users,
  Heart,
  ShieldCheck,
  Footprints,
  Leaf,
  ArrowRight,
  History,
  Quote,
  Smile,
  Award,
  Store,
  Compass as VisiIcon
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Import data JSON eksternal
import tentangData from "@/data/tentang-kami.json";

// Map untuk icon di bagian Stats secara dinamis
const iconMap = {
  smile: <Smile className="text-[#4C7A43] w-5 h-5 mx-auto mb-1.5" />,
  store: <Store className="text-[#B96832] w-5 h-5 mx-auto mb-1.5" />,
  history: <History className="text-[#4C7A43] w-5 h-5 mx-auto mb-1.5" />,
  award: <Award className="text-[#B96832] w-5 h-5 mx-auto mb-1.5" />
};

// Variabel Animasi Framer Motion (Sudah Lengkap)
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const checkerboardBg = "bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]";

export default function TentangKami() {
  // Cegah error crash jika json belum/gagal ke-load
  if (!tentangData) return <div className="text-center p-20">Loading data...</div>;

  return (
    <div className="bg-[#FAF6F0] min-h-screen text-[#2E2A25] antialiased overflow-x-hidden">
      
      {/* 1. DYNAMIC HERO SECTION */}
      <section className={`relative overflow-hidden bg-[#4D5B2F] px-6 sm:px-12 py-24 md:py-32 ${checkerboardBg}`}>
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#A7C48A]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#E6D3B3]/15 rounded-full blur-3xl pointer-events-none" />
        
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer} 
          className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center relative z-10"
        >
          {/* KIRI: Slogan & Judul */}
          <motion.div variants={fadeInUp} className="md:col-span-6 text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <div className="w-2 h-2 rounded-full bg-[#EED9B7] animate-pulse" />
              <span className="text-[10px] font-black tracking-widest uppercase text-[#F4F0E6]">Slogan Kebanggaan ☝️</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-white flex flex-col gap-1">
              <span>Desa Wisata,</span>
              <span className="text-[#EED9B7] font-serif italic font-normal tracking-normal text-5xl sm:text-6xl md:text-7xl mt-1">
                Eta Pisan!
              </span>
            </h1>
            
            <p className="text-[#E7E1D6] text-xs sm:text-sm max-w-lg font-medium opacity-90 leading-relaxed">
              Semangat kebersamaan, senyuman tulus warga, and kelestarian budaya Sunda bersatu padu di kaki Gunung Salak. Inilah esensi kehangatan sejati yang kami tawarkan untuk Anda.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold text-[#EED9B7]">#SundaAutentik</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold text-[#EED9B7]">#PesonaPasirEurih</span>
            </div>
          </motion.div>

          {/* KANAN: Foto Utama Kebersamaan Warga */}
          <motion.div variants={fadeInUp} className="md:col-span-6 relative flex items-center justify-center w-full mt-8 md:mt-0">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#B96832]/30 to-transparent blur-lg opacity-60 pointer-events-none" />

            <motion.div 
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[24px] overflow-hidden border-4 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] bg-[#3F4A26] group cursor-pointer"
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <Image 
                src={tentangData.heroImages?.bersama || "/images/hero-bersama.jpg"} 
                alt="Kebersamaan Warga" 
                fill 
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 pointer-events-none" />
            </motion.div>

            {/* Floating Badge Kiri Bawah */}
            <motion.div 
              className="absolute -bottom-5 -left-4 bg-white text-[#2E2A25] p-4 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.15)] hidden sm:flex items-center gap-3 border border-[#EED9B7]/50"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            >
              <div className="w-9 h-9 rounded-xl bg-[#EDF6E8] text-[#4C7A43] flex items-center justify-center font-bold">🌾</div>
              <div className="text-left">
                <p className="text-[9px] uppercase font-black tracking-wider text-[#6F665E] leading-none mb-1">Guyub Salembur</p>
                <p className="text-xs font-black text-[#2E2A25]">100% Warga Asli</p>
              </div>
            </motion.div>

            {/* Floating Badge Kanan Atas */}
            <div className="absolute -top-4 -right-3 bg-[#B96832] text-white font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg rotate-3 pointer-events-none">
              Sampurasun! 🍁
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. SECTION KISAH */}
      <section className="px-8 py-24 relative bg-[#FAF6F0]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="md:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-[24px] overflow-hidden shadow-[0_12px_35px_rgba(77,91,47,0.05)] bg-white p-2">
                <div className="relative w-full h-full rounded-[18px] overflow-hidden">
                  <Image src="/images/pengurus.png" alt="Suasana Desa" fill className="object-cover" />
                </div>
              </div>
              <div className="absolute bottom-4 -right-2 bg-[#B96832] text-white p-4 rounded-xl shadow-[0_10px_25px_rgba(185,104,50,0.15)] z-20 max-w-[150px] rotate-2 hover:rotate-0 transition-transform duration-300">
                <History className="mb-1.5 w-4 h-4 opacity-80" />
                <p className="text-2xl font-black mb-0.5 leading-none">15+</p>
                <p className="text-[10px] uppercase tracking-wider font-bold leading-tight">Tahun Menjaga Budaya</p>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="md:col-span-7 flex flex-col gap-5 text-left">
              <motion.div variants={fadeInUp}>
                <span className="text-[#B96832] font-bold text-[10px] uppercase tracking-widest mb-1 block">Our Legacy</span>
                <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-[#2E2A25]">
                  Dari kampung kecil, <br />menjadi <span className="text-[#4D5B2F] font-serif italic font-normal">pusat budaya.</span>
                </h2>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="space-y-4 text-[#6F665E] font-medium text-xs md:text-sm leading-relaxed">
                <p>
                  Pasir Eurih lahir dari detak jantung warga yang menolak lupa. Sejak <span className="text-[#2E2A25] font-bold underline decoration-[#EED9B7] decoration-2">2009</span>, kami membangun ruang di mana tradisi bukan sekadar pajangan, melainkan sebuah gaya hidup yang terus mengalir.
                </p>
                <p className="opacity-85">
                  Di sini, sejarah Pajajaran bernapas kembali melalui kaulinan lembur dan kehangatan tulus masyarakat lereng Gunung Salak yang ramah dan bersahaja.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {tentangData.tags?.map((tag, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.01)] border border-[#EED9B7]/10">
                    <div className="w-8 h-8 rounded-lg bg-[#EDF6E8] text-[#4C7A43] flex items-center justify-center shrink-0">
                      <Leaf size={14} />
                    </div>
                    <span className="font-bold text-xs tracking-tight text-[#2E2A25]">{tag}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2.5 VISI & MISI PREMIUM */}
      <section className="px-8 py-24 bg-[#FAF6F0] border-t border-[#EED9B7]/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 items-stretch">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInLeft} className="md:col-span-5 bg-[#4D5B2F] text-white p-8 md:p-10 rounded-[32px] flex flex-col justify-between relative overflow-hidden shadow-[0_20px_40px_rgba(77,91,47,0.1)]">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#EED9B7]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-6 relative z-10 text-left">
                <div className="inline-flex w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md text-[#EED9B7] items-center justify-center shadow-inner">
                  <VisiIcon size={24} />
                </div>
                <div>
                  <span className="text-[#EED9B7] font-bold text-[10px] uppercase tracking-widest block mb-1">The Ultimate Goal</span>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white">Visi Agung Kami</h3>
                </div>
                <p className="text-[#FAF6F0] font-serif italic text-base md:text-lg leading-relaxed font-normal opacity-95">
                  &ldquo;Menjadi episentrum desa wisata berbasis kebudayaan Sunda luhur yang mandiri secara ekonomi, lestari secara alam, serta diakui di kancah nasional maupun internasional.&rdquo;
                </p>
              </div>
              <div className="text-right text-[10px] font-bold tracking-widest uppercase text-[#EED9B7]/30 mt-8 md:mt-0">
                Pasir Eurih &copy; 2026
              </div>
            </motion.div>

            <div className="md:col-span-7 flex flex-col justify-center space-y-6 text-left">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="space-y-1">
                <span className="text-[#B96832] font-bold text-[10px] uppercase tracking-widest block">The Execution</span>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-[#2E2A25]">Langkah Strategis (Misi)</h3>
                <p className="text-xs text-[#6F665E] font-medium max-w-md">Bagaimana cara kami bergerak bersama mewujudkan impian besar kerajinan dan budaya lembur.</p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid gap-4">
                {tentangData.misi?.map((misi, i) => (
                  <motion.div key={i} variants={fadeInUp} whileHover={{ x: 6 }} className={`bg-white p-5 rounded-2xl border border-[#EED9B7]/25 border-l-4 ${misi.color} shadow-[0_8px_25px_rgba(0,0,0,0.01)] flex gap-4 items-start transition-all duration-300`}>
                    <div className="font-serif italic font-bold text-lg md:text-xl text-[#B96832]/40 shrink-0 leading-none mt-0.5">
                      {misi.no}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs md:text-sm font-black tracking-wide text-[#2E2A25] uppercase">{misi.title}</h4>
                      <p className="text-[11px] md:text-xs text-[#6F665E] font-medium leading-relaxed">{misi.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FILOSOFI LAMBANG */}
      <div className="w-full rotate-180 text-white bg-transparent leading-none select-none pointer-events-none -mb-1">
        <svg viewBox="0 0 1440 74" fill="currentColor" className="w-full h-auto text-white">
          <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
        </svg>
      </div>

      <section className="px-8 py-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[#4C7A43] font-bold text-[10px] uppercase tracking-widest block mb-1">Identity</span>
            <h2 className="text-3xl font-black tracking-tight text-[#2E2A25]">Filosofi Lambang</h2>
          </div>

          <div className="grid md:grid-cols-12 gap-12 md:gap-8 items-center relative">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInLeft} className="md:col-span-4 text-center md:text-right space-y-3 order-2 md:order-1 px-4">
              <div className="inline-flex w-12 h-12 rounded-xl bg-[#EDF6E8] text-[#4C7A43] items-center justify-center mb-1 shadow-xs">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black tracking-tight text-[#2E2A25] uppercase">Gotong Royong</h3>
              <p className="text-xs md:text-sm text-[#6F665E] font-medium leading-relaxed">
                Setiap garis melambangkan denyut nadi warga yang produktif, aktif, dan senantiasa harmonis dalam ikatan kekeluargaan.
              </p>
            </motion.div>

            <div className="md:col-span-4 flex justify-center order-1 md:order-2 my-6 md:my-0">
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="relative w-56 h-56 md:w-64 md:h-64 bg-white rounded-full flex items-center justify-center p-10 shadow-[0_20px_50px_rgba(77,91,47,0.06)] border border-[#EED9B7]/50">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image src="/images/logo.png" alt="Logo Pasir Eurih" fill className="object-contain scale-[1.05]" />
                </div>
              </motion.div>
            </div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInRight} className="md:col-span-4 text-center md:text-left space-y-3 order-3 px-4">
              <div className="inline-flex w-12 h-12 rounded-xl bg-[#F3E4D6] text-[#B96832] items-center justify-center mb-1 shadow-xs">
                <Footprints className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black tracking-tight text-[#2E2A25] uppercase">Sentra Sepatu</h3>
              <p className="text-xs md:text-sm text-[#6F665E] font-medium leading-relaxed">
                Bentuk siluet sepatu ikonik adalah simbol kebanggaan kami sebagai pusat industri kreatif kerajinan alas kaki lokal legendaris.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="w-full text-white bg-transparent leading-none select-none pointer-events-none -mt-1 mb-16">
        <svg viewBox="0 0 1440 74" fill="currentColor" className="w-full h-auto text-white">
          <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
        </svg>
      </div>

      {/* 4. STATS & ACHIEVEMENT SECTION */}
      <section className="px-8 py-12 max-w-6xl mx-auto bg-[#FAF6F0]">
        <div className="bg-white border border-[#EED9B7]/40 rounded-[28px] p-10 shadow-[0_10px_35px_rgba(0,0,0,0.01)] grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {tentangData.stats?.map((stat, i) => (
            <div key={i} className="space-y-1.5 border-r last:border-0 border-[#EED9B7]/40 last:border-none">
              {iconMap[stat.type] || <Smile className="text-[#4C7A43] w-5 h-5 mx-auto mb-1.5" />}
              <h4 className="text-2xl md:text-3xl font-black text-[#2E2A25] tracking-tight">{stat.value}</h4>
              <p className="text-[10px] md:text-xs uppercase font-bold text-[#6F665E] tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4.5 TIM PENGURUS DESA */}
      <section className="px-8 py-20 max-w-6xl mx-auto bg-[#FAF6F0]">
        <div className="text-center mb-12">
          <span className="text-[#4C7A43] font-bold text-[10px] uppercase tracking-widest block mb-1">Our Team</span>
          <h2 className="text-3xl font-black tracking-tight text-[#2E2A25]">Penggerak Lembur</h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {tentangData.pengurus?.map((tim, idx) => (
            <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl border border-[#EED9B7]/30 shadow-xs flex flex-col items-center text-center">
              <div className="relative w-28 h-28 rounded-full overflow-hidden mb-4 bg-[#4D5B2F]/10">
                <Image src={tim.img} alt={tim.nama} fill className="object-cover object-top" />
              </div>
              <h4 className="text-sm font-black text-[#2E2A25] tracking-wide line-clamp-1">{tim.nama}</h4>
              <p className="text-[10px] md:text-xs text-[#B96832] font-bold uppercase tracking-wider mt-1">{tim.jabatan}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. SECTION PILAR */}
      <section className="px-8 py-20 max-w-6xl mx-auto bg-[#FAF6F0]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 text-left">
          <div className="max-w-xl">
            <span className="text-[#4C7A43] font-bold text-[10px] uppercase tracking-widest block mb-1">The Pillars</span>
            <h2 className="text-3xl font-black tracking-tight leading-tight text-[#2E2A25]">
              Apa yang Kami <span className="text-[#B96832]">Perjuangkan?</span>
            </h2>
          </div>
          <p className="text-[#6F665E] font-bold text-xs md:text-sm max-w-[280px] leading-relaxed border-l-2 border-[#EED9B7] pl-4">
            Tiga prinsip dasar luhur yang menggerakkan seluruh nafas aktivitas di Pasir Eurih.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Heart size={18} />, title: "Edukasi Budaya", desc: "Melebur langsung dalam interaksi; belajar pertanian, menabuh perangkat alat musik, hingga permainan tradisional lembur.", color: "bg-[#EDF6E8] text-[#4C7A43]" },
            { icon: <VisiIcon size={18} />, title: "Pemberdayaan", desc: "Ekonomi kreatif roda desa sepenuhnya digerakkan oleh masyarakat secara mandiri, berdikari, serta berkelanjutan.", color: "bg-[#F3E4D6] text-[#B96832]" },
            { icon: <ShieldCheck size={18} />, title: "Pelestarian", desc: "Menjaga serta merawat situs purba cagar budaya kuno Pajajaran agar senantiasa tetap sakral melintasi laju zaman.", color: "bg-[#DDE8D5] text-[#2E2A25]" }
          ].map((pilar, idx) => (
            <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="bg-white p-6 md:p-8 rounded-[24px] flex flex-col items-start group text-left shadow-[0_10px_35px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(185,104,50,0.06)] transition-all duration-500">
              <div className={`w-10 h-10 rounded-xl ${pilar.color} flex items-center justify-center mb-5 transition-transform group-hover:scale-105 group-hover:rotate-2`}>
                {pilar.icon}
              </div>
              <h3 className="text-xs md:text-sm font-black mb-2 tracking-wider uppercase text-[#2E2A25]">{pilar.title}</h3>
              <p className="text-[12px] md:text-xs text-[#6F665E] font-medium leading-relaxed">{pilar.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. EXCLUSIVE ACTION SECTION */}
      <section className="px-8 pb-24 bg-[#FAF6F0]">
        <div className="max-w-6xl mx-auto bg-[#4D5B2F] rounded-[32px] p-8 md:p-14 relative overflow-hidden shadow-[0_20px_50px_rgba(77,91,47,0.12)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-2xl pointer-events-none" />
          <div className="grid md:grid-cols-12 gap-10 items-center relative z-10">
            <div className="md:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[#EED9B7]">
                <Quote size={12} className="opacity-90" />
                <span className="text-[10px] font-bold tracking-widest uppercase">Pesan dari Lembur</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight">
                &ldquo;Pasir Eurih tentang kebersamaan warga yang terus menjaga tradisi agar tetap hidup hingga sekarang.&rdquo;
              </h3>
              <p className="text-xs md:text-sm text-[#E7E1D6] opacity-80 leading-relaxed max-w-xl">
                Kami percaya bahwa akar budaya yang kuat akan menuntun generasi masa depan tetap bijaksana. Pintu gerbang desa kami selalu terbuka lebar menyambut kehadiran Anda.
              </p>
              <div className="pt-2">
                <Link href="/wisata" className="group inline-flex items-center gap-2.5 bg-[#EED9B7] text-[#2E2A25] px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white active:scale-95 transition-all duration-300 shadow-sm">
                  Jelajahi Wisata Kami
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col items-center md:items-end justify-center">
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-[24px] overflow-hidden shadow-xl border-4 border-white/10 bg-[#3F4A26]">
                <Image src="/images/pengurus.png" alt="Abah Deden Supandi - Ketua Pengurus" fill className="object-cover object-top scale-[1.05] hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-5 text-center md:text-left">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-[#EED9B7] mb-0.5">Ketua Pengurus</p>
                  <p className="text-sm font-black text-white tracking-wide">Abah Deden Supandi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}