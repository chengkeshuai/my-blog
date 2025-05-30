// 内容配置数据
const contentData = {
  "site": {
    "name": "坤晟AI出海",
    "title": "坤晟AI出海 - AI编程独立开发者",
    "subtitle": "独立开发者",
    "description": "AI 出海实战派 / 最懂新手的 AI 导师。致力于将复杂的 AI 技术转化为易于理解和实践的商业解决方案，坚持出海赛道，拥抱长期主义。",
    "keywords": ["AI出海", "独立开发", "实战教程", "SEO", "AI导师"],
    "url": "https://www.kuncheng.org"
  },
  "personal": {
    "name": "坤晟",
    "bio": "AI 出海实战派 / 最懂 AI 新手的 AI 导师",
    "description": "致力于将复杂的 AI 技术转化为易于理解和实践的商业解决方案，坚持出海赛道，拥抱长期主义。",
    "tags": ["🚀 独立开发", "🌊 AI出海", "📚 实战教程"],
    "contact": {
      "email": "chengks2008@gmail.com",
      "github": "chengkeshuai",
      "twitter": "chengks2008",
      "wechat": "/contact"
    },
    "social": {
      "email": "mailto:chengks2008@gmail.com",
      "github": "https://github.com/chengkeshuai",
      "twitter": "https://x.com/chengks2008",
      "wechat": "/contact"
    }
  },
  "navigation": [
    {
      "name": "首页",
      "href": "/",
      "description": "回到首页"
    },
    {
      "name": "文章列表",
      "href": "/posts",
      "description": "查看所有文章"
    },
    {
      "name": "在线Markdown",
      "href": "/md",
      "description": "在线 Markdown 编辑器"
    },
    {
      "name": "出海实战课",
      "href": "https://paitoubing.vip",
      "description": "AI出海实战课程",
      "external": true
    }
  ],
  "products": [
    {
      "name": "排头兵",
      "url": "https://paitoubing.vip",
      "description": "AI出海排头兵，全球变现第一站。从0到1实战指南，90天跑通AI全球化变现。",
      "featured": true
    },
    {
      "name": "群报告",
      "url": "https://qunbaogao.com",
      "description": "免费 HTML 代码转网页可访问链接工具，国内可用。群聊转精美网页模板开发中。",
      "featured": true
    }
  ],
  "footer": {
    "sections": [
      {
        "title": "坤晟AI出海",
        "links": [
          { "name": "坤晟AI出海", "href": "/" },
          { "name": "文章列表", "href": "/posts" },
          { "name": "联系我", "href": "/contact" },
          { "name": "关于我", "href": "/about" }
        ]
      },
      {
        "title": "我的产品",
        "links": [
          { "name": "排头兵", "href": "https://paitoubing.vip" },
          { "name": "群报告", "href": "https://qunbaogao.com" }
        ]
      },
      {
        "title": "AI 出海",
        "links": [
          { "name": "出海实战课", "href": "https://paitoubing.vip" },
          { "name": "AI 工具推荐", "href": "/ai-tools" },
          { "name": "出海案例", "href": "/cases" }
        ]
      },
      {
        "title": "开发者资源",
        "links": [
          { "name": "实战教程", "href": "/tutorials" },
          { "name": "SEO 指南", "href": "/seo" },
          { "name": "开发工具", "href": "/tools" }
        ]
      }
    ],
    "copyright": "©2025 坤晟AI出海 All rights reserved.",
    "icp": ""
  },
  "card": {
    "name": "坤晟",
    "username": "www.kuncheng.org",
    "avatar": "🚀",
    "bio": "AI出海实战派，欢迎链接。",
    "buttons": [
      {
        "text": "Twitter/X →",
        "href": "https://x.com/chengks2008"
      },
      {
        "text": "Github →", 
        "href": "https://github.com/chengkeshuai"
      },
      {
        "text": "产品 →",
        "href": "https://paitoubing.vip"
      }
    ]
  }
}

export const siteConfig = {
  name: contentData.site.name,
  title: contentData.site.title,
  description: contentData.site.description,
  url: contentData.site.url,
  keywords: contentData.site.keywords,
  
  author: {
    name: contentData.personal.name,
    bio: contentData.personal.bio,
    description: contentData.personal.description,
    avatar: "/avatar.jpg",
    email: contentData.personal.contact.email,
    twitter: contentData.personal.contact.twitter,
    github: contentData.personal.social.github
  },
  
  // 导航菜单
  navigation: contentData.navigation,

  // 产品推荐
  products: contentData.products,

  // 社交链接
  social: contentData.personal.social,

  // 友情链接
  footer: contentData.footer,

  // 个人名片
  card: contentData.card,

  // 将personal数据暴露出来供组件使用
  personal: contentData.personal,

  // 博客分类
  categories: [
    {
      name: "AI出海",
      slug: "ai-overseas",
      description: "AI产品海外经验与策略"
    },
    {
      name: "AI建站",
      slug: "ai-website",
      description: "使用AI技术构建网站"
    },
    {
      name: "Google AdSense",
      slug: "google-adsense",
      description: "Google AdSense优化与收益"
    }
  ],

  // 友情链接
  links: {
    github: "https://github.com/chengkeshuai",
    x: "https://x.com/chengks2008", 
    buymeacoffee: "https://www.buymeacoffee.com/chengkeshuai",
    blog: [
      { name: "J实验室", href: "https://example.com" },
      { name: "关于我", href: "/about" },
      { name: "赞助榜", href: "/sponsors" },
      { name: "友链", href: "/friends" }
    ],
    nextjs: [
      { name: "WeNext", href: "https://wenext.com" },
      { name: "Chrome插件全栈教程", href: "https://course.wenext.com" },
      { name: "Next.js 中文文档", href: "https://nextjs.cn" }
    ],
    templates: [
      { name: "Next.js SaaS 全栈模板", href: "https://nextjs-saas.wenext.com" },
      { name: "Next 多语言模板", href: "https://i18n.wenext.com" },
      { name: "博客模板", href: "https://blog.wenext.com" }
    ],
    tools: [
      { name: "OG Image Generator", href: "https://og.wenext.com" },
      { name: "nTab", href: "https://ntab.wenext.com" }
    ]
  },

  // Giscus评论配置
  giscus: {
    repo: "chengkeshuai/blog-comments",
    repoId: "your-repo-id", 
    category: "General",
    categoryId: "your-category-id"
  },

  // Google Analytics
  analytics: {
    googleAnalyticsId: "G-H2PTHNGNNV"
  }
}

export type SiteConfig = typeof siteConfig 