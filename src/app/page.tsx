'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, ShoppingBag, BarChart3, Droplets, Palette, Sun, Flower2, Heart } from 'lucide-react';
import ProductGrid from '@/components/features/ProductGrid';
import { getProducts, getProductsByCategory } from '@/lib/filters';
import categoriesData from '@/data/categories.json';

const categoryIcons: Record<string, React.ReactNode> = {
  skincare: <Droplets className="w-6 h-6" />,
  makeup: <Palette className="w-6 h-6" />,
  sunscreen: <Sun className="w-6 h-6" />,
  body: <Sparkles className="w-6 h-6" />,
  fragrance: <Flower2 className="w-6 h-6" />,
};

export default function Home() {
  const allProducts = getProducts();
  const featuredProducts = allProducts.filter(p => p.rating >= 4.7).slice(0, 8);

  return (
    <div>
      {/* ===== Hero Section ===== */}
      <section className="relative overflow-hidden bg-gradient-warm">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-lavender-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="tag-gold">✨ 精选推荐</span>
              <span className="tag">美妆 · 护肤 · 香水</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#4A3F44] leading-tight mb-4 text-balance">
              选对产品<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-lavender-500">
                比选贵更重要
              </span>
            </h1>
            <p className="text-[#8A7E84] text-sm md:text-base leading-relaxed mb-8 max-w-lg">
              真实的产品对比评测，透明的购买建议。我们不收钱做推广，只靠联盟佣金活着——这就是我们能保持客观的底气。
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/products" className="btn-primary">
                <ShoppingBag className="w-4 h-4" />
                浏览产品库
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/compare" className="btn-secondary">
                <BarChart3 className="w-4 h-4" />
                查看对比报告
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Category Grid ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {(categoriesData as { id: string; name: string; description: string; color: string }[]).map((cat) => {
            const count = getProductsByCategory(cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="glass-card p-4 md:p-5 text-center group hover:shadow-lg transition-all"
              >
                <div className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-2.5
                  ${cat.color === 'rose' ? 'bg-rose-100 text-rose-500 group-hover:bg-rose-200' : ''}
                  ${cat.color === 'lavender' ? 'bg-lavender-100 text-lavender-500 group-hover:bg-lavender-200' : ''}
                  ${cat.color === 'gold' ? 'bg-gold-100 text-gold-500 group-hover:bg-gold-200' : ''}
                  transition-colors`}
                >
                  {categoryIcons[cat.id] || <Sparkles className="w-6 h-6" />}
                </div>
                <h3 className="font-serif font-semibold text-sm text-[#4A3F44]">{cat.name}</h3>
                <p className="text-[10px] text-[#8A7E84] mt-0.5">{count} 件产品</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== Featured Products ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex items-end justify-between mb-6 md:mb-8">
          <div>
            <h2 className="section-title">热门推荐</h2>
            <p className="section-subtitle">高评分精选产品，闭眼入不踩雷</p>
          </div>
          <Link href="/products" className="btn-ghost text-sm text-rose-600 hidden sm:flex">
            查看全部
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
        <div className="mt-6 text-center sm:hidden">
          <Link href="/products" className="btn-secondary text-sm">
            查看全部产品
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ===== Compare Reports ===== */}
      <section className="bg-gradient-warm py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6 md:mb-8">
            <div>
              <h2 className="section-title">对比报告</h2>
              <p className="section-subtitle">多维横向对比，帮你做出明智选择</p>
            </div>
            <Link href="/compare" className="btn-ghost text-sm text-rose-600 hidden sm:flex">
              查看全部
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {[
              { slug: 'top-essence-comparison', title: '热门精华大横评', desc: '小黑瓶 vs 小棕瓶 vs 双萃 vs 红腰子', emoji: '🧪' },
              { slug: 'lipstick-classic-comparison', title: '经典口红三巨头', desc: '迪奥#999 vs 阿玛尼#405 vs YSL#21', emoji: '💄' },
              { slug: 'sunscreen-comparison', title: '防晒霜对比评测', desc: '安耐晒金瓶 vs 兰蔻小白管 vs 怡丽丝尔', emoji: '☀️' },
            ].map((report) => (
              <Link
                key={report.slug}
                href={`/compare/${report.slug}`}
                className="glass-card p-5 md:p-6 group hover:shadow-lg transition-all"
              >
                <div className="text-2xl mb-3">{report.emoji}</div>
                <h3 className="font-serif font-semibold text-[#4A3F44] mb-1.5 group-hover:text-rose-600 transition-colors">
                  {report.title}
                </h3>
                <p className="text-xs text-[#8A7E84] leading-relaxed">{report.desc}</p>
                <div className="flex items-center gap-1.5 mt-3 text-xs text-rose-500 font-medium">
                  查看对比
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link href="/compare" className="btn-secondary text-sm">
              查看全部对比报告
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Trust ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="glass-card p-8 md:p-12 text-center max-w-2xl mx-auto">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-rose-100 to-lavender-100 flex items-center justify-center mb-5">
            <Heart className="w-7 h-7 text-rose-500" />
          </div>
          <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#4A3F44] mb-3">
            我们的推荐原则
          </h2>
          <div className="space-y-3 text-sm text-[#8A7E84] leading-relaxed max-w-md mx-auto">
            <p>所有产品基于真实使用体验和成分分析，不接受付费推广影响评测结论。</p>
            <p>页面中的购买链接为电商联盟链接，通过链接购买后我们可能获得合理佣金，但这完全不影响您的支付价格。</p>
          </div>
        </div>
      </section>
    </div>
  );
}
