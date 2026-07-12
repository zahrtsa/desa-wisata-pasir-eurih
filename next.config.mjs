/** @type {import('import').NextConfig} */
const nextConfig = {
  // 1. Pengaturan Image Remote Patterns Bawaan Kamu
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // 2. MEMATIKAN X-POWERED-BY (Mengatasi Server Leaks Information)
  poweredByHeader: false,

  // 3. MENAMBAHKAN SECURITY HEADERS (Sudah Diperbaiki untuk Google Maps)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            // DIUBAH DARI 'DENY' KE 'SAMEORIGIN'
            // Agar halaman luar seperti google maps boleh dimuat di dalam bingkai website Anda sendiri
            value: 'SAMEORIGIN', 
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Content-Security-Policy',
            // DIPERBARUI: Menambahkan izin khusus untuk google.com pada frame-src dan img-src
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://images.unsplash.com https://*.google.com https://*.gstatic.com; frame-src 'self' https://www.google.com https://maps.google.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;