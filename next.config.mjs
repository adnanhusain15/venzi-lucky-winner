/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.typeform.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
