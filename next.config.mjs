import createMDX from '@next/mdx'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用静态导出
  output: 'export',
  
  // 添加尾随斜杠，避免路由问题
  trailingSlash: true,
  
  // 禁用图片优化（静态导出不支持）
  images: {
    unoptimized: true
  },
  
  // MDX 支持
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: false
  },
  
  // 静态导出基础路径（如果需要子目录部署可取消注释）
  // basePath: '',
  
  // 确保静态资源路径正确
  assetPrefix: '',
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypeHighlight, { detect: true }]
    ]
  }
})

export default withMDX(nextConfig)
