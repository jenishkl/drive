
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        port: "",
        pathname: "/lezdos3storagecasedrive2.0/**",
      },
    ],
  },
};

export default nextConfig;
