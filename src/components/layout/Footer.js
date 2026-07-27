"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUpRight,
  ChevronRight,
  X,
  User,
  Send
} from "lucide-react";

// ==========================================
// 1. KOMPONEN MODAL POPUP GOOGLE MAPS
// ==========================================
const LocationModal = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Desa+Wisata+Pasir+Eurih+Sindang+Barang+Tamansari+Bogor";

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* MODAL CONTAINER */}
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#1A1F16] border border-white/10 shadow-2xl overflow-hidden z-10 my-auto">
        
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

        {/* MAP CATCHER */}
        <div className="w-full h-[380px] md:h-[450px] bg-white relative">
          <iframe
            title="Desa Wisata Pasir Eurih"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.134246219921!2d106.7671342!3d-6.6302436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69cf66f1c9f061%3A0xc27525108e949baa!2sDesa%20Wisata%20Pasir%20Eurih!5e0!3m2!1sen!2sid!4v1779515407246!5m2!1sen!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
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
    </div>,
    document.body
  );
};

// ==========================================
// 2. KOMPONEN UTAMA FOOTER
// ==========================================
export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // State Form Modal WA
  const [selectedTopic, setSelectedTopic] = useState("Informasi Wisata & Paket");
  const [selectedContact, setSelectedContact] = useState("6285695146164"); // Default Pak Desen
  const [customMessage, setCustomMessage] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const contacts = [
    {
      id: "desen",
      name: "Pak Desen Iyos",
      phone: "6285695146164",
      display: "0856-9514-6164",
      role: "Wisata, Homestay & Informasi"
    },
    {
      id: "yaya",
      name: "Pak Yaya",
      phone: "6283895246983",
      display: "0838-9524-6983",
      role: "UMKM & Oleh-Oleh Kuliner"
    }
  ];

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
    window.open(`https://wa.me/${selectedContact}?text=${encodedText}`, "_blank");
    setWaModalOpen(false);
  };

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
      <footer className="bg-[#141812] text-brand-cream/90 pt-16 pb-8 border-t border-white/5 relative overflow-hidden">
        {/* Dekorasi Siluet Latar */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 top-10 w-40 h-40 bg-green-500/[0.04] rounded-full blur-3xl pointer-events-none" />

        <motion.div 
          className="max-w-6xl mx-auto px-6 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {/* GRID BERSIH */}
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
              
              <div className="flex flex-col gap-4 text-neutral-400 leading-relaxed">
                <div className="flex gap-2.5 items-start">
                  <MapPin size={15} className="text-green-400 shrink-0 mt-0.5" />
                  <p className="opacity-85">Kp. Sindang Barang RT 01/04, Desa Pasir Eurih, Kec. Tamansari, Kab. Bogor, Jawa Barat 16610</p>
                </div>
                
                {/* Tombol Akses Peta & Sosial Media */}
                <div className="flex flex-col gap-3 mt-1">
                  {/* Baris Instagram */}
                  <div className="flex items-center gap-3 group/item">
                    <motion.a 
                      whileHover={{ y: -2, scale: 1.02 }}
                      href="https://instagram.com/desawisata_pasireurih" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center border border-white/10 text-neutral-400 hover:text-white transition-colors duration-200 shrink-0"
                      aria-label="Instagram Desa Wisata Pasir Eurih"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </motion.a>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-white font-semibold">Instagram Official</span>
                      <a href="https://instagram.com/desawisata_pasireurih" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-green-400 transition-colors hover:underline">@desawisata_pasireurih</a>
                    </div>
                  </div>
                  
                  {/* Baris Peta */}
                  <div className="flex items-center gap-3 group/item">
                    <motion.button 
                      whileHover={{ y: -2, scale: 1.02 }}
                      onClick={() => setModalOpen(true)}
                      className="w-9 h-9 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center border border-white/10 text-green-400 hover:text-white transition-colors duration-200 shrink-0"
                      aria-label="Lihat Peta Lokasi"
                    >
                      <MapPin size={16} />
                    </motion.button>
                    <div className="flex flex-col text-left">
                      <span className="text-[11px] text-white font-semibold">Cek Lokasi (Maps)</span>
                      <button onClick={() => setModalOpen(true)} className="text-neutral-400 text-left hover:text-green-400 transition-colors hover:underline">Lihat peta interaktif</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Kolom 2: Navigasi Cepat (Jatah 3 grid) */}
            <motion.div variants={itemVariants} className="lg:col-span-3 lg:pl-4">
              <h4 className="font-extrabold text-white mb-5 tracking-wider uppercase text-[10px]">Tautan Navigasi</h4>
              <ul className="flex flex-col gap-3 text-neutral-400">
                {[
                  { title: "Beranda", path: "/" },
                  { title: "Jelajah Wisata", path: "/wisata" },
                  { title: "Situs Budaya", path: "/budaya" },
                  { title: "Homestay Desa", path: "/fasilitas/homestay" },
                  { title: "Tentang Kami", path: "/tentang" }
                ].map((item) => (
                  <li key={item.title}>
                    <Link href={item.path} className="hover:text-white transition-colors duration-150 flex items-center gap-1 group py-0.5">
                      <ChevronRight size={12} className="text-green-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                      <span className="font-medium group-hover:translate-x-0.5 transition-transform">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Kolom 3: Contact Person Pengelola (Jatah 4 grid) */}
            <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col gap-4">
              <h4 className="font-extrabold text-white tracking-wider uppercase text-[10px]">Contact Person Pengelola</h4>
              
              <div className="flex flex-col gap-2.5 text-neutral-400">
                {contacts.map((contact) => (
                  <div 
                    key={contact.id} 
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-green-500/10 text-green-400 shrink-0">
                        <User size={14} />
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs">{contact.name}</div>
                        <div className="text-[10px] text-neutral-400">{contact.role}</div>
                      </div>
                    </div>
                    <a 
                      href={`https://wa.me/${contact.phone}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-green-400 hover:underline flex items-center gap-1"
                    >
                      {contact.display}
                    </a>
                  </div>
                ))}

                <a 
                  href="mailto:pasireurihdesawisata@gmail.com" 
                  className="flex items-center gap-3 hover:text-white transition-colors group pt-1 px-1"
                >
                  <Mail size={13} className="text-green-400 shrink-0" />
                  <span className="truncate font-medium text-xs text-neutral-400 group-hover:text-white transition-colors">
                    pasireurihdesawisata@gmail.com
                  </span>
                </a>
              </div>
              
              {/* Tombol Interaktif WhatsApp Modal */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setWaModalOpen(true)}
                className="mt-1 flex items-center justify-between border border-green-500/30 rounded-xl py-3 px-4 font-semibold text-white bg-green-500/10 hover:bg-green-500/20 hover:border-green-500/50 transition-all group relative overflow-hidden w-full"
              >
                <div className="text-left leading-tight relative z-10 flex flex-col">
                  <span className="block text-[9px] font-bold text-neutral-400 uppercase tracking-widest group-hover:text-white transition-colors">
                    Pilih Topik & Chat
                  </span>
                  <span className="block text-xs font-extrabold text-green-400 flex items-center gap-1">
                    Hubungi via WhatsApp <MessageCircle size={13} className="inline shrink-0" />
                  </span>
                </div>
                <ArrowUpRight size={16} className="text-neutral-400 relative z-10 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </motion.button>
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

      {/* Trigger Modal Box Lokasi Google Maps */}
      <LocationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* PORTAL MODAL WHATSAPP INTERAKTIF */}
      {mounted && createPortal(
        <AnimatePresence>
          {waModalOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setWaModalOpen(false)}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              />

              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 15 }}
                className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-7 z-10 border border-brand-border my-auto text-brand-dark"
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
                    onClick={() => setWaModalOpen(false)}
                    className="p-2 text-brand-muted hover:text-brand-dark rounded-full hover:bg-brand-cream transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Form Modal */}
                <form onSubmit={handleSendWhatsApp} className="mt-5 space-y-4 text-left">
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

                  {/* 3. Catatan Opsional */}
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