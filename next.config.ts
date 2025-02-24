/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "13.61.17.230",
        pathname: "/media/post_img/**",
      },
    ],
  },
};

module.exports = nextConfig;
