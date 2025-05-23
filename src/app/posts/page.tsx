import React from 'react'
import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '文章列表',
  description: '所有技术文章列表',
}

export default async function PostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8" style={{ color: '#99d8eb' }}>
        文章列表
      </h1>
      
      <div className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-gray-400">暂无文章</p>
        ) : (
          posts.map((post) => (
            <article key={post.slug} className="border-b border-gray-700 pb-6 last:border-b-0">
              <div className="flex items-start space-x-8">
                <time 
                  className="text-base flex-shrink-0 w-28 text-gray-400"
                  dateTime={post.date}
                >
                  {formatDate(post.date)}
                </time>
                <div className="flex-1">
                  <Link href={`/posts/${post.slug}`} className="hover:underline">
                    <h2 
                      className="text-xl font-medium mb-2"
                      style={{ color: '#99d8eb' }}
                    >
                      {post.title}
                    </h2>
                  </Link>
                  {post.description && (
                    <p className="text-gray-300 mb-3">{post.description}</p>
                  )}
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    {post.category && (
                      <span className="bg-gray-800 px-2 py-1 rounded">
                        {post.category}
                      </span>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex space-x-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="bg-gray-700 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
} 