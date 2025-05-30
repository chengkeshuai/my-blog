import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// 这个文件只在构建时运行，用于生成静态 JSON 数据

export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
}

// 生成所有文章数据的 JSON 文件
export async function generatePostsData() {
  const postsDirectory = path.join(process.cwd(), 'content')
  
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

      // 只提取需要的字段以减小 JSON 大小
      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        content: content.substring(0, 1000), // 只取前1000个字符用于搜索，节省空间
        excerpt: data.description || '',
        category: data.category || '',
        tags: data.tags || []
      } as Post
    })
    .filter(post => post.title) // 只保留有标题的文章
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // 创建 public 目录下的 searchData.json 文件
  const publicDir = path.join(process.cwd(), 'public')
  if (!fs.existsSync(path.join(publicDir, 'data'))) {
    fs.mkdirSync(path.join(publicDir, 'data'), { recursive: true })
  }
  
  fs.writeFileSync(
    path.join(publicDir, 'data', 'searchData.json'),
    JSON.stringify(allPosts),
    'utf8'
  )

  return allPosts
} 