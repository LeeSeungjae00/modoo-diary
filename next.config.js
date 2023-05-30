/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://192.168.100.100:9092/:path*",
      },
    ];
  },
  images: {
    domains: ['i.ibb.co'],
  },
}

module.exports = nextConfig
