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

    // ✅ 使用dark_dimmed主题，提供更柔和的暗色背景
    script.setAttribute('data-repo', 'chengkeshuai/my-blog')
    script.setAttribute('data-repo-id', 'R_kgDOOvNRrQ')
    script.setAttribute('data-category', 'Announcements')
    script.setAttribute('data-category-id', 'DIC_kwDOOvNRrc4CqgDc')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', 'dark_dimmed') // 使用更柔和的暗色主题
    script.setAttribute('data-lang', 'zh-CN')
    script.setAttribute('data-loading', 'lazy')

    ref.current.appendChild(script)

    // 添加自定义样式来调整背景色
    const style = document.createElement('style')
    style.innerHTML = `
      .giscus-frame {
        background: rgba(55, 65, 81, 0.5) !important;
        border-radius: 8px !important;
      }
      .giscus iframe {
        background: transparent !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [slug])

  // 切换主题时重新加载评论
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
    if (iframe) {
      iframe.contentWindow?.postMessage({
        giscus: {
          setConfig: {
            theme: 'preferred_color_scheme'
          }
        }
      }, 'https://giscus.app')
    }
  }, [])

  return (
    <div 
      ref={ref} 
      className="giscus-container"
      style={{
        minHeight: '200px',
        backgroundColor: 'transparent',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    />
  )
} 