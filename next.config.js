/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api:path*",
        destination: "http://mingky.me:22001/api:path*",
      },
    ];
  },
  images: {
    domains: ['i.ibb.co'],
  },
}

module.exports = nextConfig
