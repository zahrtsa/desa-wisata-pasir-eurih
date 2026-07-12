"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, Map, Landmark, ShoppingBag, Bed, Image as ImageIcon, 
  Info, MessageCircle, X, Menu, Clock, ChevronDown, LayoutGrid 
} from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState(false); // Untuk kontrol sub-menu di mobile

  // Mengunci scroll layar utama saat menu mobile sedang terbuka
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  // Data Navigasi Bersih: Disesuaikan menjadi 3 fasilitas utama yang akurat & efektif
  const navLinks = [
    { name: "Beranda", href: "/", icon: <Home size={14} /> },
    { name: "Jelajah Wisata", href: "/wisata", icon: <Map size={14} /> },
    { name: "Situs Budaya", href: "/budaya", icon: <Landmark size={14} /> },
    { 
      name: "Fasilitas", 
      href: "#", 
      icon: <LayoutGrid size={14} />,
      isDropdown: true,
      subLinks: [
        { name: "Bale Budaya", href: "/fasilitas/bale-budaya", icon: <Landmark size={14} /> },
        { name: "Sentra UMKM & Kuliner", href: "/fasilitas/umkm-kuliner", icon: <ShoppingBag size={14} /> },
        { name: "Homestay Desa", href: "/fasilitas/homestay", icon: <Bed size={14} /> }
      ]
    },
    { name: "Galeri", href: "/galeri", icon: <ImageIcon size={14} /> },
    { name: "Tentang Kami", href: "/tentang", icon: <Info size={14} /> },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-brand-border sticky top-0 z-[100]">
      
      {/* MAIN NAV BAR */}
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between md:gap-6">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="relative w-10 h-10 transition-transform duration-500 group-hover:rotate-12">
            <Image
              src="/images/logo.png"
              alt="Logo Desa Wisata"
              fill
              className="rounded-full object-cover border border-brand-border p-0.5 bg-white"
            />
          </div>
          <div className="max-w-[180px] sm:max-w-none">
            <div className="text-sm font-bold text-brand-dark leading-tight truncate sm:whitespace-normal group-hover:text-brand-green transition-colors duration-200">
              Desa Wisata Pasir Eurih
            </div>
            <div className="text-xs text-brand-muted truncate sm:whitespace-normal">
              Kec. Tamansari · Kab. Bogor
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 flex-1 justify-center">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group/dropdown py-2">
              <Link 
                href={link.href} 
                className="text-sm font-medium text-brand-muted hover:text-brand-green transition-all flex items-center gap-1.5 group"
              >
                {/* Ikon meluncur masuk dari kiri secara halus saat di-hover */}
                <span className="text-brand-green opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out flex-shrink-0">
                  {link.icon}
                </span>
                
                {/* Teks menebal dinamis */}
                <span className="group-hover:font-semibold transition-all duration-200 relative z-10 whitespace-nowrap">
                  {link.name}
                </span>

                {link.isDropdown && <ChevronDown size={12} className="transition-transform duration-200 group-hover/dropdown:rotate-180" />}

                {/* Garis bawah animasi melebar dari tengah ke samping */}
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-brand-green rounded-full transition-all duration-300 ease-out group-hover:w-full group-hover:left-0" />
              </Link>

              {/* Dropdown HTML & CSS untuk Desktop */}
              {link.isDropdown && (
                <div className="absolute top-full left-0 w-52 bg-white border border-brand-border shadow-xl rounded-2xl py-2 mt-1 hidden group-hover/dropdown:block z-[120]">
                  {link.subLinks.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-brand-dark hover:bg-brand-cream hover:text-brand-green transition-colors"
                    >
                      <span className="text-brand-green flex-shrink-0">{sub.icon}</span>
                      <span className="font-medium text-xs whitespace-nowrap">{sub.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <motion.a 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          href="https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20tanya%20tentang%20wisata%20Pasir%20Eurih" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-brand-earth hover:bg-brand-earth-light text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-sm flex-shrink-0"
        >
          <MessageCircle size={14} />
          Pesan via WhatsApp
        </motion.a>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden flex-shrink-0 p-2 -mr-2 text-brand-dark focus:outline-none relative z-[110]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Info Ticker (Desktop Only) */}
      <div className="bg-brand-cream border-t border-brand-border px-6 py-1.5 hidden md:flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-brand-green flex-shrink-0" />
        <span className="text-xs text-brand-green font-medium">Buka setiap hari</span>
        <span className="text-xs text-brand-muted">
          08.00 – 17.00 WIB · Reservasi minimal 1 hari sebelumnya
        </span>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-[90]"
            />

            {/* Dropdown Menu Panel Mobile */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-full left-0 w-full bg-white border-t border-brand-border shadow-2xl rounded-b-[2rem] overflow-hidden md:hidden z-[95]"
            >
              <div className="px-6 pt-4 pb-8 flex flex-col gap-1">
                <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2 px-3">
                  Main Menu
                </p>
                
                {/* Navigation Items Mobile */}
                <div className="grid grid-cols-1 gap-1">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.name}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      {link.isDropdown ? (
                        /* DROPDOWN FASILITAS DI MOBILE */
                        <div className="flex flex-col">
                          <button
                            onClick={() => setMobileSubMenuOpen(!mobileSubMenuOpen)}
                            className="flex items-center justify-between w-full px-4 py-3 rounded-2xl text-brand-dark hover:bg-brand-cream active:bg-brand-cream transition-colors group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="p-2 rounded-xl bg-brand-cream group-hover:bg-white transition-colors text-brand-green">
                                {link.icon}
                              </div>
                              <span className="font-semibold text-sm">{link.name}</span>
                            </div>
                            <ChevronDown size={16} className={`transition-transform duration-200 text-brand-muted ${mobileSubMenuOpen ? 'rotate-180' : ''}`} />
                          </button>

                          {/* Isi Sub-Menu Fasilitas Mobile */}
                          <AnimatePresence>
                            {mobileSubMenuOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden pl-10 pr-4 flex flex-col gap-1 bg-brand-cream/30 rounded-xl"
                              >
                                {link.subLinks.map((sub) => (
                                  <Link
                                    key={sub.name}
                                    href={sub.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-3 py-2.5 text-brand-dark hover:text-brand-green transition-colors"
                                  >
                                    <span className="text-brand-green flex-shrink-0">{sub.icon}</span>
                                    <span className="font-medium text-xs">{sub.name}</span>
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        /* LINK BIASA NON-DROPDOWN */
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-4 px-4 py-3 rounded-2xl text-brand-dark hover:bg-brand-cream active:bg-brand-cream transition-colors group"
                        >
                          <div className="p-2 rounded-xl bg-brand-cream group-hover:bg-white transition-colors text-brand-green">
                            {link.icon}
                          </div>
                          <span className="font-semibold text-sm">{link.name}</span>
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Info & CTA Card */}
                <div className="mt-4 p-5 bg-brand-cream rounded-[1.5rem] flex flex-col gap-4">
                   <div className="flex items-center gap-3 text-brand-green">
                      <Clock size={18} />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-tight text-brand-muted">Jam Operasional</span>
                        <span className="text-xs font-semibold text-brand-dark">08.00 - 17.00 WIB</span>
                      </div>
                   </div>

                   <a 
                    href="https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20tanya%20tentang%20wisata%20Pasir%20Eurih"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-brand-earth hover:bg-brand-earth-light text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-brand-earth/20 transition-all active:scale-98"
                    onClick={() => setMenuOpen(false)}
                   >
                    <MessageCircle size={18} />
                    Pesan via WhatsApp
                   </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </header>
    );
  }