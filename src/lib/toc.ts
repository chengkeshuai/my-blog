export interface TocItem {
  id: string
  title: string
  level: number
}

export function generateToc(content: string): TocItem[] {
  const headingRegex = /^(#{2,6})\s+(.+)$/gm
  const toc: TocItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const title = match[2].trim()
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    toc.push({
      id,
      title,
      level
    })
  }

  return toc
} 