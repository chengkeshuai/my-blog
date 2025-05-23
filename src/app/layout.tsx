import type { Metadata } from "next";
import "./globals.css";
import Header from "../../components/Header";
import { siteConfig } from "../../config/site";
import GoogleAnalytics from "../components/GoogleAnalytics";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["AI出海", "AI建站", "Google AdSense", "技术博客", "Next.js"],
  authors: [
    {
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.author.name,
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.author.twitter,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning style={{ backgroundColor: '#272934' }}>
      <body
        className="antialiased min-h-screen transition-colors"
        style={{ backgroundColor: '#272934', color: '#ffffff' }}
      >
        <GoogleAnalytics gaId={siteConfig.analytics.googleAnalyticsId} />
        <div className="relative flex min-h-screen flex-col" style={{ backgroundColor: '#272934' }}>
          <Header />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
