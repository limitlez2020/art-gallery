/** @type {import('next').NextConfig} */
/* Setup domain for images to come from supabase */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const hostname = new URL(supabaseUrl).hostname; 

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: hostname,
      },
    ],
  },
};

export default nextConfig;
