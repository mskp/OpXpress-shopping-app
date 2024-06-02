/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.ajio.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
