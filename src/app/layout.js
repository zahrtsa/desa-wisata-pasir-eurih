import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Desa Wisata Pasir Eurih",
  description: "Desa wisata budaya di Kec. Tamansari, Kab. Bogor — permainan tradisional, situs bersejarah, homestay, dan kerajinan lokal.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-brand-cream">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}