/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, //  gambar dalam proyek akan di-render tanpa optimisasi, yang berarti tidak akan mengalami proses pengoptimalan yang dilakukan oleh Next.js secara otomatis.
  },
};

export default nextConfig;
