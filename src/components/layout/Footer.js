"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  MessageCircle, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUpRight,
  ChevronRight,
  X,
} from "lucide-react";

// ==========================================
// 1. KOMPONEN MODAL POPUP GOOGLE MAPS (EMBED RESOLVED)
// ==========================================
const LocationModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Desa+Wisata+Pasir+Eurih+Sindang+Barang+Tamansari+Bogor";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* BACKDROP CLOUD */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* MODAL CONTAINER */}
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#1A1F16] border border-white/10 shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-black/20">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <h2 className="text-white font-bold text-base md:text-lg leading-tight">
                Lokasi Kampung Budaya Pasir Eurih
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Pasir Eurih, Tamansari, Bogor, Jawa Barat
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* MAP CATCHER (FIXED IFRAME EMBED) */}
        <div className="w-full h-[380px] md:h-[450px] bg-white relative">
          <iframe
            title="Desa Wisata Pasir Eurih"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.134246219921!2d106.7671342!3d-6.6302436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69cf66f1c9f061%3A0xc27525108e949baa!2sDesa%20Wisata%20Pasir%20Eurih!5e0!3m2!1sen!2sid!4v1779515407246!5m2!1sen!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            /* KUNCI UTAMA: Menggunakan origin-when-cross-origin agar token koordinat diijinkan Google */
            referrerPolicy="no-referrer-when-downgrade" 
            className="w-full h-full"
          />
        </div>

        {/* FOOTER ACTION */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-white/10 bg-black/40">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-white hover:bg-white/5 transition-colors"
          >
            Tutup
          </button>
          <button
            onClick={() => window.open(googleMapsUrl, "_blank")}
            className="px-4 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-black font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-md"
          >
            Buka di Google Maps
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. KOMPONEN UTAMA FOOTER (MENGHAPUS YANG TIDAK PERLU)
// ==========================================
export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-foreground text-brand-cream/90 pt-16 pb-8 border-t border-white/5 relative overflow-hidden">
        {/* Dekorasi Siluet Latar */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 top-10 w-40 h-40 bg-brand-green/[0.04] rounded-full blur-3xl pointer-events-none" />

        <motion.div 
          className="max-w-6xl mx-auto px-6 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {/* GRID BERSIH (Hanya menyisakan informasi esensial) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12 text-xs">
            
            {/* Kolom 1: Profil Desa & Maps (Jatah 5 grid) */}
            <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col gap-5">
              <div className="flex items-center gap-3 group">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 shadow-md border border-white/10 shrink-0 transition-transform duration-500 group-hover:rotate-12">
                  <Image
                    src="/images/logo.png"
                    alt="Logo Desa Wisata Pasir Eurih"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="font-extrabold text-sm tracking-wide text-white leading-tight">
                  Desa Wisata Pasir Eurih
                </h3>
              </div>
              
              <div className="flex flex-col gap-4 text-brand-muted leading-relaxed">
                <div className="flex gap-2.5 items-start">
                  <MapPin size={15} className="text-brand-green-light shrink-0 mt-0.5" />
                  <p className="opacity-85">Kp. Sindang Barang RT 01/04, Desa Pasir Eurih, Kec. Tamansari, Kab. Bogor, Jawa Barat 16610</p>
                </div>
                
                {/* Tombol Akses Peta & Sosial Media */}
                <div className="flex flex-col gap-3 mt-2">
                  {/* Baris Instagram */}
                  <div className="flex items-center gap-3 group/item">
                    <motion.a 
                      whileHover={{ y: -2, scale: 1.02 }}
                      href="https://instagram.com/desawisata_pasireurih" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center border border-white/10 text-brand-muted hover:text-white transition-colors duration-200 shrink-0"
                      aria-label="Instagram Desa Wisata Pasir Eurih"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </motion.a>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-white font-semibold">Instagram</span>
                      <a href="https://instagram.com/desawisata_pasireurih" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-brand-green-light transition-colors hover:underline">@desawisata_pasireurih</a>
                    </div>
                  </div>
                  
                  {/* Baris Peta Konten */}
                  <div className="flex items-center gap-3 group/item">
                    <motion.button 
                      whileHover={{ y: -2, scale: 1.02 }}
                      onClick={() => setModalOpen(true)}
                      className="w-9 h-9 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center border border-white/10 text-brand-green-light hover:text-white transition-colors duration-200 shrink-0"
                      aria-label="Lihat Peta Lokasi"
                    >
                      <MapPin size={16} />
                    </motion.button>
                    <div className="flex flex-col text-left">
                      <span className="text-[11px] text-white font-semibold">Cek Lokasi (Maps)</span>
                      <button onClick={() => setModalOpen(true)} className="text-neutral-400 text-left hover:text-brand-green-light transition-colors hover:underline">Lihat peta interaktif</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Kolom 2: Tautan Navigasi (Gabungan Menu Informasi Penting) */}
            <motion.div variants={itemVariants} className="lg:col-span-3 lg:pl-8">
              <h4 className="font-extrabold text-white mb-5 tracking-wider uppercase text-[10px]">Tautan Navigasi</h4>
              <ul className="flex flex-col gap-3 text-brand-muted">
                {[
                  { title: "Tentang Kami", path: "#" },
                  { title: "Paket Wisata", path: "#" },
                  { title: "Homestay", path: "#" },
                  { title: "Galeri Foto", path: "#" }
                ].map((item) => (
                  <li key={item.title}>
                    <Link href={item.path} className="hover:text-white transition-colors duration-150 flex items-center gap-1 group py-0.5">
                      <ChevronRight size={12} className="text-brand-green-light opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                      <span className="font-medium group-hover:translate-x-0.5 transition-transform">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Kolom 3: Kontak Langsung Admin (Jatah 4 grid) */}
            <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col gap-4">
              <h4 className="font-extrabold text-white tracking-wider uppercase text-[10px]">Hubungi kami</h4>
              <div className="text-brand-muted flex flex-col gap-3">
                <a href="tel:+6283872509223" className="flex items-center gap-3 hover:text-white transition-colors group py-0.5">
                  <div className="w-8 h-8 bg-white/5 rounded-lg border border-white/10 text-brand-green-light flex items-center justify-center group-hover:bg-brand-green/10 transition-colors shrink-0">
                    <Phone size={13} />
                  </div>
                  <span className="font-medium tracking-wide">+62 838-7250-9223</span>
                </a>
                <a href="mailto:pasireurihdesawisata@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors group py-0.5 overflow-hidden">
                  <div className="w-8 h-8 bg-white/5 rounded-lg border border-white/10 text-brand-green-light flex items-center justify-center group-hover:bg-brand-green/10 transition-colors shrink-0">
                    <Mail size={13} />
                  </div>
                  <span className="truncate font-medium">pasireurihdesawisata@gmail.com</span>
                </a>
              </div>
              
              {/* WhatsApp Call-To-Action Button */}
              <motion.a
                whileHover={{ scale: 1.01, boxShadow: "0 4px 20px rgba(34, 197, 94, 0.15)" }}
                whileTap={{ scale: 0.99 }}
                href="https://wa.me/6283872509223?text=Halo%20Desa%20Wisata%20Pasir%20Eurih,%20saya%20tertarik%20bertanya..."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center justify-between border border-white/10 rounded-xl py-2.5 px-4 font-semibold text-white bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all group relative overflow-hidden w-full max-w-[240px]"
              >
                <span className="absolute inset-0 bg-brand-green-light/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="text-left leading-tight relative z-10 flex flex-col">
                  <span className="block text-[9px] font-bold text-neutral-400 uppercase tracking-widest group-hover:text-white transition-colors">Pesan Admin</span>
                  <span className="block text-xs font-extrabold text-green-400 flex items-center gap-1">
                    WhatsApp <MessageCircle size={12} className="inline shrink-0" />
                  </span>
                </div>
                <ArrowUpRight size={16} className="text-neutral-400 relative z-10 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </motion.a>
            </motion.div>

          </div>

          {/* Bagian Bawah: Copyright & Slogan */}
          <div className="mt-16 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400 tracking-wider">
            <p className="font-medium text-center sm:text-left">© {currentYear} Desa Wisata Pasir Eurih · Tamansari, Kab. Bogor</p>
            <div className="flex items-center gap-2 text-neutral-500">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/60 shrink-0" />
              <p className="italic font-medium text-center sm:text-right">Menjaga budaya Sunda untuk generasi mendatang</p>
            </div>
          </div>
        </motion.div>
      </footer>

      {/* Trigger Modal Box Lokasi */}
      <LocationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}