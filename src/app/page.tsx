import React from 'react'
import { getAllPosts } from '../lib/posts'
import Link from 'next/link'
import { formatDate } from '../lib/utils'
import { siteConfig } from '../../config/site'
import dynamic from 'next/dynamic'

// 动态导入客户端组件，不做 SSR
const WechatQrcode = dynamic(() => import('../components/WechatQrcode'), { ssr: false })

// 服务器组件
export default async function Home() {
  const posts = await getAllPosts()

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="border-t border-b pt-12 pb-16 mt-12 mb-16" style={{ borderColor: '#6B7280' }}>
        <div className="max-w-3xl mx-auto text-left">
          <h1 className="text-4xl font-bold mb-8" style={{ color: '#99d8eb' }}>
            {siteConfig.name}
          </h1>
          <p className="text-lg mb-4" style={{ color: 'white' }}>
            {siteConfig.author.bio}
          </p>
          <p className="text-lg mb-8" style={{ color: 'white' }}>
            {siteConfig.author.description}
          </p>
          
          {/* Social Links */}
          <div className="flex space-x-6">
            <a
              href={siteConfig.links.x}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="X (Twitter)"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href={siteConfig.links.github}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <WechatQrcode />
          </div>
        </div>
      </section>

      {/* Product Recommendations */}
      <section className="max-w-3xl mx-auto mb-16">
        <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            🚀 我的产品推荐:
          </h2>
          <div className="space-y-6">
            {siteConfig.products.map((product, index) => (
              <div key={index}>
              <Link 
                  href={product.url} 
                  className="text-blue-600 hover:underline font-medium text-lg"
                target="_blank"
              >
                  {product.name}
              </Link>
                <span className="text-gray-700 text-lg"> - {product.description}</span>
            </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts - 对标网站样式：日期在左，标题在右 */}
      <section className="max-w-3xl mx-auto mb-16">
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.slug} className="flex items-start space-x-8">
              <time 
                className="text-base flex-shrink-0 w-28"
                style={{ color: '#7d7d9f' }}
                dateTime={post.date}
              >
                {formatDate(post.date)}
              </time>
              <div className="flex-1">
                <Link href={`/posts/${post.slug}`} className="hover:underline">
                  <h3 
                    className="text-lg font-medium"
                    style={{ color: '#99d8eb' }}
                  >
                    {post.title}
                  </h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Personal Card */}
      <section className="max-w-3xl mx-auto mb-16 flex justify-center">
        <div className="max-w-md w-full">
          <div className="rounded-lg overflow-hidden bg-gray-800 border border-gray-700 shadow-lg">
            {/* 顶部背景条 */}
            <div className="h-16 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            
            {/* 卡片内容 */}
            <div className="p-6 text-center -mt-8">
              <img 
                src="/avatar.jpg" 
                alt="坤晟的头像"
                className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-gray-300"
              />
              <h3 className="text-xl font-bold mt-3 mb-1 text-white">{siteConfig.card.name}</h3>
              <p className="text-gray-400 text-base mb-4">{siteConfig.card.username}</p>
              
              <div className="flex justify-center flex-wrap gap-2 mb-4">
                {siteConfig.personal.tags.map((tag, index) => (
                  <span key={index} className={`px-2 py-1 text-xs rounded-full ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800' :
                    index === 1 ? 'bg-orange-100 text-orange-800' :
                    index === 2 ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {tag}
                  </span>
                ))}
              </div>
              
              <p className="text-white text-base mb-6">
                {siteConfig.card.bio}
              </p>
              
              <div className="flex justify-center gap-3 flex-wrap">
                {siteConfig.card.buttons.map((button, index) => (
                <a
                    key={index}
                    href={button.href}
                    className="inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  <div className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-lg p-0.5">
                    <div className="bg-gray-900 rounded-lg px-4 py-2 text-white text-sm whitespace-nowrap hover:bg-gray-800 transition-colors">
                        {button.text}
                    </div>
                  </div>
                </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <footer className="max-w-3xl mx-auto border-t" style={{ borderColor: '#2a2a2a' }}>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {siteConfig.footer.sections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4 text-white border-b border-gray-600 pb-2 text-lg">{section.title}</h4>
              <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-base">
                        {link.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t text-center" style={{ borderColor: '#2a2a2a' }}>
            <p className="text-gray-400 text-base">
              {siteConfig.footer.copyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
