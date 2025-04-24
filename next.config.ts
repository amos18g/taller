import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    // Elimina totalmente el indicador
    buildActivity: false,

    // (opcional) Si solo quieres cambiar de esquina:
    // buildActivityPosition: 'bottom-right', // admite 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  },
};

export default nextConfig;
