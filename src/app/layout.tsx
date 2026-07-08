import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PreferencesProvider } from "@/contexts/PreferencesContext";

export const metadata: Metadata = {
  title: "美妆安利 | 用心安利每一款好物",
  description: "精选美妆产品推荐与对比评测，帮你选对、买对、用对。安耐晒、兰蔻、雅诗兰黛等热门产品对比。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        <PreferencesProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </PreferencesProvider>
      </body>
    </html>
  );
}
