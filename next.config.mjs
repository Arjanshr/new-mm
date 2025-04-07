/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  distDir: "build",
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    } else {
      return `${new Date().getTime()}`;
    }
  },
  images: {
    domains: ["192.168.101.8"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
      },
      {
        protocol: "http",
        hostname: "*",
        port: "",
      },
      {
        hostname: "localhost",
        port: "",
      },
    ],
  },
};

export default nextConfig;
