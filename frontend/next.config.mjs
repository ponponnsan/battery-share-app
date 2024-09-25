/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      // Googleのプロフィール画像を表示するために追加
      domains: ["lh3.googleusercontent.com"],
    },
    async rewrites() {
      return [
        // Ensure next-auth routes are handled by Next.js itself, not forwarded to the backend
        {
          source: '/api/auth/:path*',
          destination: '/api/auth/:path*',
        },
        {
          source: '/api/:path*',
          destination: 'http://127.0.0.1:3001/api/:path*' // バックエンドサーバーのURL
        }
      ]
    }
  };
  
  export default nextConfig;