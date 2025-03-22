/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "13.60.43.43",
        pathname: "/media/profile_img/**",
      },
      {
        protocol: "http",
        hostname: "13.60.43.43",
        pathname: "/media/post_img/**",
      },
      {
        protocol: "http",
        hostname: "13.60.43.43",
        pathname: "/media/**",
      },
    ],
  },
};

module.exports = nextConfig;
