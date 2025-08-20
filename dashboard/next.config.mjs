/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Configuración explícita del puerto
  experimental: {
  serverExternalPackages: ["@supabase/supabase-js"],
  // serverComponentsExternalPackages: ["@supabase/supabase-js"],
  },
}

export default nextConfig
