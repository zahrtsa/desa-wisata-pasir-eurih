"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, Map, Landmark, ShoppingBag, Bed, Image as ImageIcon, 
  Info, MessageCircle, X, Menu, Clock, ChevronDown, LayoutGrid, Send, User 
} from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // State Modal WhatsApp
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("Informasi Wisata & Paket");
  const [selectedContact, setSelectedContact] = useState("6285695146164"); // Default Pak Desen
  const [customMessage, setCustomMessage] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Daftar Kontak
  const contacts = [
    {
      id: "desen",
      name: "Pak Desen Iyos",
      phone: "6285695146164",
      display: "0856-9514-6164",
      role: "Wisata, Homestay & Informasi Umum"
    },
    {
      id: "yaya",
      name: "Pak Yaya",
      phone: "6283895246983",
      display: "0838-9524-6983",
      role: "Sentra UMKM & Oleh-Oleh Kuliner"
    }
  ];

  // Daftar Topik
  const topics = [
    { label: "Informasi Wisata & Paket", defaultContact: "6285695146164" },
    { label: "Reservasi Homestay / Penginapan", defaultContact: "6285695146164" },
    { label: "Produk UMKM & Oleh-Oleh Kuliner", defaultContact: "6283895246983" },
    { label: "Sewa Bale Budaya / Event", defaultContact: "6285695146164" },
    { label: "Pertanyaan Lainnya", defaultContact: "6285695146164" }
  ];

  const handleTopicChange = (topicLabel) => {
    setSelectedTopic(topicLabel);
    const matched = topics.find((t) => t.label === topicLabel);
    if (matched) {
      setSelectedContact(matched.defaultContact);
    }
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const targetContact = contacts.find((c) => c.phone === selectedContact);
    const recipientName = targetContact ? targetContact.name : "Pengelola";

    let text = `Halo ${recipientName}, saya ingin bertanya mengenai *${selectedTopic}* di Desa Wisata Pasir Eurih.`;
    
    if (customMessage.trim() !== "") {
      text += `\n\nCatatan Tambahan:\n"${customMessage.trim()}"`;
    }

    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/${selectedContact}?text=${encodedText}`;

    window.open(waUrl, "_blank");
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (menuOpen || isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen, isModalOpen]);

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
    <>
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
                  <span className="text-brand-green opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out flex-shrink-0">
                    {link.icon}
                  </span>
                  
                  <span className="group-hover:font-semibold transition-all duration-200 relative z-10 whitespace-nowrap">
                    {link.name}
                  </span>

                  {link.isDropdown && <ChevronDown size={12} className="transition-transform duration-200 group-hover/dropdown:rotate-180" />}

                  <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-brand-green rounded-full transition-all duration-300 ease-out group-hover:w-full group-hover:left-0" />
                </Link>

                {/* Dropdown Desktop */}
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
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="hidden md:flex items-center gap-2 bg-brand-earth hover:bg-brand-earth-light text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-sm flex-shrink-0"
          >
            <MessageCircle size={14} />
            Pesan via WhatsApp
          </motion.button>

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
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-[90]"
              />

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
                  
                  <div className="grid grid-cols-1 gap-1">
                    {navLinks.map((link, idx) => (
                      <motion.div
                        key={link.name}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.04 }}
                      >
                        {link.isDropdown ? (
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

                  <div className="mt-4 p-5 bg-brand-cream rounded-[1.5rem] flex flex-col gap-4">
                     <div className="flex items-center gap-3 text-brand-green">
                        <Clock size={18} />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-tight text-brand-muted">Jam Operasional</span>
                          <span className="text-xs font-semibold text-brand-dark">08.00 - 17.00 WIB</span>
                        </div>
                     </div>

                     <button 
                      onClick={() => {
                        setMenuOpen(false);
                        setIsModalOpen(true);
                      }}
                      className="flex items-center justify-center gap-2 w-full bg-brand-earth hover:bg-brand-earth-light text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-brand-earth/20 transition-all active:scale-98"
                     >
                      <MessageCircle size={18} />
                      Pesan via WhatsApp
                     </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* PORTAL MODAL WHATSAPP - Menjamin posisi selalu persis di tengah layar */}
      {mounted && createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 15 }}
                className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-7 z-10 border border-brand-border my-auto"
              >
                {/* Header Modal */}
                <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-brand-cream rounded-2xl text-brand-earth">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-brand-dark">Hubungi Pengelola</h3>
                      <p className="text-xs text-brand-muted">Pilih topik & penerima pesan</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-brand-muted hover:text-brand-dark rounded-full hover:bg-brand-cream transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Form Modal */}
                <form onSubmit={handleSendWhatsApp} className="mt-5 space-y-4">
                  
                  {/* 1. Pilih Topik */}
                  <div>
                    <label className="block text-xs font-bold text-brand-dark mb-1.5">
                      1. Keperluan / Topik:
                    </label>
                    <select
                      value={selectedTopic}
                      onChange={(e) => handleTopicChange(e.target.value)}
                      className="w-full text-xs p-3.5 rounded-xl border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-earth bg-brand-cream/30 font-medium text-brand-dark"
                    >
                      {topics.map((t, idx) => (
                        <option key={idx} value={t.label}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 2. Pilih Kontak Penerima */}
                  <div>
                    <label className="block text-xs font-bold text-brand-dark mb-1.5">
                      2. Ditujukan Kepada:
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {contacts.map((contact) => {
                        const isSelected = selectedContact === contact.phone;
                        return (
                          <label
                            key={contact.id}
                            onClick={() => setSelectedContact(contact.phone)}
                            className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                              isSelected
                                ? "border-brand-earth bg-brand-cream/60 ring-1 ring-brand-earth"
                                : "border-brand-border hover:bg-brand-cream/20"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <User size={16} className={isSelected ? "text-brand-earth" : "text-brand-muted"} />
                              <div>
                                <div className="font-bold text-brand-dark">{contact.name}</div>
                                <div className="text-[10px] text-brand-muted">{contact.role}</div>
                              </div>
                            </div>
                            <input
                              type="radio"
                              name="contact"
                              value={contact.phone}
                              checked={isSelected}
                              onChange={() => setSelectedContact(contact.phone)}
                              className="accent-brand-earth"
                            />
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Pesan / Catatan Opsional */}
                  <div>
                    <label className="block text-xs font-bold text-brand-dark mb-1.5">
                      3. Pesan Tambahan <span className="text-brand-muted font-normal">(Opsional)</span>:
                    </label>
                    <textarea
                      rows={2}
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      placeholder="Contoh: Halo pak, untuk rombongan 10 orang tanggal 15 besok apakah ada slot?"
                      className="w-full text-xs p-3 rounded-xl border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-earth bg-brand-cream/30 text-brand-dark placeholder:text-brand-muted/60 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-2 bg-brand-earth hover:bg-brand-earth-light active:scale-[0.99] text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-earth/20 transition-all"
                  >
                    <Send size={14} />
                    Buka WhatsApp Sekarang
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}