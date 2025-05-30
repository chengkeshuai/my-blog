// 这个脚本在构建时运行，用于生成搜索数据

// 使用 CommonJS 模块系统
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 生成所有文章数据的 JSON 文件
async function generatePostsData() {
  const postsDirectory = path.join(process.cwd(), 'content');
  
  // 确保content目录存在
  if (!fs.existsSync(postsDirectory)) {
    console.log('Content directory not found');
    return [];
  }

  console.log('Generating search data...');
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // 只提取需要的字段以减小 JSON 大小
      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        content: content.substring(0, 1000), // 只取前1000个字符用于搜索，节省空间
        excerpt: data.description || '',
        category: data.category || '',
        tags: data.tags || []
      };
    })
    .filter(post => post.title) // 只保留有标题的文章
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // 创建 public 目录下的 data 目录
  const dataDir = path.join(process.cwd(), 'public', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // 写入 JSON 文件
  fs.writeFileSync(
    path.join(dataDir, 'searchData.json'),
    JSON.stringify(allPosts),
    'utf8'
  );

  console.log(`Generated search data with ${allPosts.length} posts`);
  return allPosts;
}

// 执行生成过程
generatePostsData().catch(console.error); 