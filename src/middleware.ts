import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // 处理/md路径及其子路径
  if (url.pathname === '/md' || url.pathname === '/md/') {
    return NextResponse.redirect(new URL('/md/index.html', request.url));
  }
  
  // 处理/md下的所有子路径，但排除已存在的静态文件
  if (url.pathname.startsWith('/md/') && 
      !url.pathname.endsWith('.html') && 
      !url.pathname.endsWith('.js') && 
      !url.pathname.endsWith('.css') && 
      !url.pathname.includes('/static/') && 
      !url.pathname.includes('/assets/') && 
      !url.pathname.includes('/mpmd/') && 
      !url.pathname.includes('/upload/')) {
    return NextResponse.redirect(new URL('/md/index.html', request.url));
  }
  
  return NextResponse.next();
}

// 配置中间件只在特定路径下运行
export const config = {
  matcher: ['/md', '/md/:path*'],
}; 