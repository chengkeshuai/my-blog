/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export', // 配置静态导出
  reactStrictMode: true,
  images: {
    unoptimized: true, // 需要为静态导出启用
  },
  // ... existing code ...
};

module.exports = nextConfig; 