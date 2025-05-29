'use client';

import { useEffect } from 'react';

export default function MarkdownPage() {
  useEffect(() => {
    window.location.href = '/md/index.html';
  }, []);
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>正在跳转到Markdown编辑器...</p>
    </div>
  );
} 