import React from 'react'
import { getPostBySlug, getAllPosts, getAdjacentPosts } from '../../../lib/posts'
import { formatDate } from '../../../lib/utils'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { generateToc } from '../../../lib/toc'
import GiscusComments from '../../../components/GiscusComments'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: '文章未找到',
    }
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug)
  const allPosts = getAllPosts()
  const { prev, next } = getAdjacentPosts(params.slug)
  const toc = generateToc(post?.content || '')

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-12">
          {/* 左边栏 - 文章列表 (大屏显示) */}
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
                <h3 className="text-xl font-semibold mb-4 text-white">文章列表</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {allPosts.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/posts/${p.slug}`}
                      className={`block p-3 rounded-lg text-base transition-all duration-200 ${
                        p.slug === params.slug
                          ? 'bg-blue-500/20 text-blue-200 border border-blue-400/30'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                      }`}
                    >
                      <div className="font-medium line-clamp-2">{p.title}</div>
                      <div className={`text-sm mt-1 ${
                        p.slug === params.slug ? 'text-blue-300' : 'text-gray-500'
                      }`}>
                        {formatDate(p.date)}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* 主内容区 */}
          <main className="flex-1 min-w-0 mx-6">
            {/* 返回按钮 */}
            <div className="mb-8">
              <Link 
                href="/posts" 
                className="text-gray-400 hover:text-white transition-colors inline-flex items-center text-base"
              >
                ← 返回文章列表
              </Link>
            </div>

            {/* 文章头部 */}
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-4" style={{ color: '#99d8eb' }}>
                {post.title}
              </h1>
              
              <div className="flex items-center space-x-4 text-base text-gray-400 mb-4">
                <time dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
                
                {post.category && (
                  <span className="bg-gray-800 px-2 py-1 rounded">
                    {post.category}
                  </span>
                )}
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-gray-700 px-2 py-1 rounded text-sm text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {post.description && (
                <p className="text-xl text-gray-300 border-l-4 border-blue-500 pl-4">
                  {post.description}
                </p>
              )}
            </header>

            {/* 文章内容 */}
            <article className="prose prose-xl prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white prose-code:text-cyan-400 prose-pre:bg-gray-800">
              <MDXRemote 
                source={post.content}
                components={{
                  h2: ({ children, ...props }) => {
                    const id = String(children)
                      .toLowerCase()
                      .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
                      .replace(/-+/g, '-')
                      .replace(/^-|-$/g, '')
                    return <h2 id={id} {...props}>{children}</h2>
                  },
                  h3: ({ children, ...props }) => {
                    const id = String(children)
                      .toLowerCase()
                      .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
                      .replace(/-+/g, '-')
                      .replace(/^-|-$/g, '')
                    return <h3 id={id} {...props}>{children}</h3>
                  },
                  h4: ({ children, ...props }) => {
                    const id = String(children)
                      .toLowerCase()
                      .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
                      .replace(/-+/g, '-')
                      .replace(/^-|-$/g, '')
                    return <h4 id={id} {...props}>{children}</h4>
                  },
                  h5: ({ children, ...props }) => {
                    const id = String(children)
                      .toLowerCase()
                      .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
                      .replace(/-+/g, '-')
                      .replace(/^-|-$/g, '')
                    return <h5 id={id} {...props}>{children}</h5>
                  },
                  h6: ({ children, ...props }) => {
                    const id = String(children)
                      .toLowerCase()
                      .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
                      .replace(/-+/g, '-')
                      .replace(/^-|-$/g, '')
                    return <h6 id={id} {...props}>{children}</h6>
                  },
                }}
              />
            </article>

            {/* 分割线 */}
            <hr className="my-12 border-gray-700" />

            {/* 文章导航 */}
            <div className="flex justify-between items-center mb-8 text-base">
              <div className="text-gray-400">
                发布时间：{formatDate(post.date)}
              </div>
              <div className="flex space-x-4">
                {prev && (
                  <Link
                    href={`/posts/${prev.slug}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    上一篇
                  </Link>
                )}
                {next && (
                  <Link
                    href={`/posts/${next.slug}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    下一篇
                  </Link>
                )}
                <Link
                  href="/"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  首页
                </Link>
              </div>
            </div>

            {/* 评论区 */}
            <div className="border border-gray-700/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">评论</h3>
              <GiscusComments slug={post.slug} />
            </div>
          </main>

          {/* 右边栏 - 文章目录 (大屏显示) */}
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
                <h3 className="text-xl font-semibold mb-4 text-white">目录</h3>
                {toc.length > 0 ? (
                  <nav className="space-y-2">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-base text-gray-400 hover:text-white hover:bg-gray-700/30 rounded px-2 py-1 transition-all duration-200"
                        style={{
                          paddingLeft: `${8 + (item.level - 2) * 12}px`
                        }}
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                ) : (
                  <p className="text-gray-500 text-base">暂无目录</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
} 