import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content')

export interface PostFrontMatter {
  title: string
  date: string
  description?: string
  category?: string
  tags?: string[]
  slug: string
  published?: boolean
}

export interface Post extends PostFrontMatter {
  content: string
  readingTime?: number
}

export function getAllPosts(): Post[] {
  // 确保content目录存在
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        content,
        ...data,
        published: data.published !== false // 默认为true
      } as Post
    })
    .filter(post => post.published) // 只返回已发布的文章
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return allPosts
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      ...data,
    } as Post
  } catch {
    return null
  }
}

export function getPostsByCategory(category: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.category === category)
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts()
  const categories = allPosts
    .map(post => post.category)
    .filter(Boolean)
    .filter((category, index, array) => array.indexOf(category) === index) // 去重

  return categories as string[]
}

// 计算阅读时间（估算）
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// 获取上一篇和下一篇文章
export function getAdjacentPosts(currentSlug: string): { prev: Post | null, next: Post | null } {
  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex(post => post.slug === currentSlug)
  
  return {
    prev: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    next: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  }
} 