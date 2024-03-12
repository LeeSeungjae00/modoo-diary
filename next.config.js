/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/java/:slug*",
        destination: "http://192,168.100.150:8080/:slug*",
      },
    ];
  },
  images: {
    domains: ['i.ibb.co'],
  },
}

module.exports = nextConfig
