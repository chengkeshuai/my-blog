# J实验室 - 技术博客

一个基于 Next.js 14 构建的现代技术博客，专注于 AI 出海、AI 建站、Google AdSense 等技术内容分享。

## 🚀 项目特点

- **现代化设计**：参考 [weijunext.com](https://weijunext.com) 的简洁设计风格
- **响应式布局**：完美适配桌面端和移动端
- **MDX 支持**：支持 Markdown 扩展语法和 React 组件
- **SEO 优化**：完整的 meta 标签和 OpenGraph 支持
- **代码高亮**：使用 rehype-highlight 提供语法高亮
- **暗黑主题**：固定暗黑主题设计

## 🛠 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS 3
- **字体**: LXGW WenKai TC Regular (霞鹜文楷 TC)
- **内容**: MDX + Gray Matter
- **代码高亮**: Rehype Highlight
- **类型安全**: TypeScript
- **包管理**: npm

## 🎨 设计规范

### 字体规范
- **主字体**: LXGW WenKai TC Regular (霞鹜文楷 TC)
- **引入方式**: Google Fonts CDN
- **字体回退**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif

### 颜色规范
| 用途 | 颜色值 | 说明 |
|------|--------|------|
| 背景色 | `#272934` | 深色背景，营造舒适的阅读环境 |
| 主标题 | `#99d8eb` | 用于网站主标题"J实验室" |
| 文章标题 | `#99d8eb` | 文章列表中的标题颜色 |
| 导航菜单 | `#99d8eb` | Header 导航链接颜色 |
| 文章日期 | `#7d7d9f` | 文章发布日期显示颜色 |
| 主要文本 | `#ffffff` | 页面主要内容文字 |
| 次要文本 | `#8585a8` | 描述性文字、链接等 |

**重要说明**: 
- `#99d8eb` 仅用于文章标题、导航菜单、主标题"J实验室"
- `#7d7d9f` 仅用于文章日期，不在其他地方使用
- Header 网站名称、产品推荐标题、底部区域标题使用 white 或 #8585a8

## 📁 项目结构

```
my-blog/
├── src/
│   ├── app/
│   │   ├── globals.css          # 全局样式
│   │   ├── layout.tsx           # 根布局
│   │   └── page.tsx             # 首页
│   └── lib/
│       ├── posts.ts             # 文章数据处理
│       └── utils.ts             # 工具函数
├── components/
│   └── Header.tsx               # 页面头部组件
├── config/
│   └── site.ts                  # 网站配置
├── content/
│   ├── ai-website-building-guide.mdx
│   └── welcome-to-my-blog.mdx
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- npm 9+

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站效果。

### 构建生产版本
```bash
npm run build
npm run start
```

## 📝 内容管理

### 添加新文章
1. 在 `content/` 目录下创建 `.mdx` 文件
2. 添加 frontmatter 信息：
```yaml
---
title: "文章标题"
date: "2025-01-15"
description: "文章描述"
---
```
3. 使用 Markdown + React 组件编写内容

### 文章路径
- 文章 URL: `/posts/[filename]`
- 文件名即为 URL slug

## 🎯 功能特性

- ✅ **社交链接**: 邮箱、X(Twitter)、GitHub、微信
- ✅ **产品推荐**: 黄色卡片展示推荐产品
- ✅ **文章列表**: 简洁的日期+标题列表格式
- ✅ **个人名片**: 渐变边框的个人信息展示
- ✅ **友情链接**: 分类展示的底部链接区域
- ✅ **代码高亮**: 自动语法高亮支持
- ✅ **响应式设计**: 移动端适配

## 🌐 部署方案

### 静态导出 (推荐给 EdgeOne Pages)
本项目已配置支持静态导出，特别适合 EdgeOne Pages 等静态托管服务：

```bash
# 构建静态文件
npm run build

# 预览静态文件 (可选)
npm run preview
```

静态文件将生成在 `out/` 目录，可直接部署到任何静态托管服务。

**静态导出特性**:
- ✅ 完全静态化，无需服务器运行时
- ✅ 更快的加载速度和更好的 CDN 缓存
- ✅ 适合 EdgeOne Pages、GitHub Pages 等静态托管
- ✅ 优化了图片处理和资源路径

### 腾讯 EdgeOne Pages (推荐)
```bash
# 1. 构建静态文件
npm run build

# 2. 将 out/ 目录上传到 EdgeOne Pages
# 或使用 CLI 工具直接部署
```

### Vercel
```bash
npm install -g vercel
vercel
```

### 其他静态托管
- Netlify
- GitHub Pages  
- Cloudflare Pages

所有静态托管服务都可以直接使用 `out/` 目录的内容进行部署。

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- 设计灵感来源: [weijunext.com](https://weijunext.com)
- 字体支持: [LXGW WenKai](https://github.com/lxgw/LxgwWenKai) 霞鹜文楷
- 技术栈: Next.js、Tailwind CSS、MDX

## 📧 联系方式

- **邮箱**: chengkeshuai@gmail.com
- **GitHub**: [@chengkeshuai](https://github.com/chengkeshuai)
- **X(Twitter)**: [@chengkeshuai](https://x.com/chengkeshuai)

---

**J实验室** - 全栈工程师，Next.js开源手艺人，撸金签约作者，折腾才有未来
