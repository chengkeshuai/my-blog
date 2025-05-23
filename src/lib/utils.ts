export function formatDate(date: string): string {
  const d = new Date(date)
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '-')
}

export function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
} 