'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { formatDate } from '../lib/utils'

interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
}

export default function SearchDialog({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadPosts() {
      try {
        setIsLoading(true);
        // 从静态 JSON 文件加载
        const response = await fetch('/data/searchData.json');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const posts = await response.json();
        setAllPosts(posts);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load posts:', error);
        setIsLoading(false);
      }
    }
    
    if (isOpen) {
      loadPosts();
    }
  }, [isOpen]);

  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    
    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = allPosts.filter(post => {
      return (
        post.title.toLowerCase().includes(term) ||
        (post.content && post.content.toLowerCase().includes(term)) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(term)) ||
        (post.category && post.category.toLowerCase().includes(term)) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    });

    setSearchResults(results);
  }, [searchTerm, allPosts]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
  }

  function handlePostClick(slug: string) {
    router.push(`/posts/${slug}`);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-2xl bg-gray-900 rounded-lg shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-700">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="搜索文章..."
              className="w-full px-4 py-2 pl-10 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              autoFocus
            />
            <svg 
              className="absolute left-3 top-3 w-4 h-4 text-gray-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </form>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">加载中...</div>
          ) : searchTerm.trim() === '' ? (
            <div className="p-4 text-center text-gray-400">输入关键词开始搜索</div>
          ) : searchResults.length === 0 ? (
            <div className="p-4 text-center text-gray-400">未找到相关文章</div>
          ) : (
            <ul className="divide-y divide-gray-700">
              {searchResults.map(post => (
                <li 
                  key={post.slug} 
                  className="p-4 hover:bg-gray-800 cursor-pointer transition-colors"
                  onClick={() => handlePostClick(post.slug)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-blue-400">{post.title}</h3>
                    <time 
                      className="text-sm text-gray-500" 
                      dateTime={post.date}
                    >
                      {formatDate(post.date)}
                    </time>
                  </div>
                  {post.excerpt && (
                    <p className="mt-1 text-sm text-gray-400 line-clamp-2">{post.excerpt}</p>
                  )}
                  {post.category && (
                    <span className="mt-2 inline-block px-2 py-1 text-xs bg-blue-900 text-blue-200 rounded-full">
                      {post.category}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-700 flex justify-end">
          <button 
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            onClick={onClose}
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
} 