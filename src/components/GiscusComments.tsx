'use client'

import { useEffect, useRef } from 'react'

interface GiscusCommentsProps {
  slug: string
}

export default function GiscusComments({ slug }: GiscusCommentsProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'

    // 🚨 请按照GISCUS_SETUP.md的指引更新以下配置
    // 从 https://giscus.app/zh-CN 获取正确的配置参数
    script.setAttribute('data-repo', 'chengkeshuai/my-blog')
    script.setAttribute('data-repo-id', 'YOUR_REPO_ID_HERE') // ⚠️ 需要从giscus.app获取
    script.setAttribute('data-category', 'Announcements')
    script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID_HERE') // ⚠️ 需要从giscus.app获取
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', 'dark')
    script.setAttribute('data-lang', 'zh-CN')
    script.setAttribute('data-loading', 'lazy')

    ref.current.appendChild(script)
  }, [slug])

  // 切换主题时重新加载评论
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
    if (iframe) {
      iframe.contentWindow?.postMessage({
        giscus: {
          setConfig: {
            theme: 'dark'
          }
        }
      }, 'https://giscus.app')
    }
  }, [])

  return (
    <div 
      ref={ref} 
      className="giscus-container mt-8"
      style={{
        minHeight: '200px'
      }}
    />
  )
} 