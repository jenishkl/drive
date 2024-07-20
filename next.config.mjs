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
  productionBrowserSourceMaps:false,
  experimental:{
    serverSourceMaps:false,
  },

  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack,config:cfg }
  ) => {
    if (cfg.cache && !dev) {
      cfg.cache = Object.freeze({
        type: "memory",
      });
      cfg.cache.maxMemoryGenerations = 0;
    }
    // Important: return the modified config
    return config;
  },
  // output:"export",
};

export default nextConfig;
