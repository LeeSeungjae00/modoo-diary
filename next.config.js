/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://mingky.me:22001/:path*",
      },
    ];
  },
  images: {
    domains: ['i.ibb.co'],
  },
}

module.exports = nextConfig
