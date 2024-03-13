/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/java/:slug*",
        destination: "http://mingky.me:22001/:slug*",
      }
    ];
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/diaries",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['i.ibb.co'],
  },
}

module.exports = nextConfig
