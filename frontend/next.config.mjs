/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      // Googleのプロフィール画像を表示するために追加
      domains: ["lh3.googleusercontent.com"],
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3001/api/:path*' // バックエンドサーバーのURL
        }
      ]
    }
  };
  
  export default nextConfig;