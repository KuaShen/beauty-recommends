import Link from 'next/link';
import { Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-rose-100/60 bg-white/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-300 to-lavender-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-lg font-semibold text-[#4A3F44]">美妆安利</span>
            </Link>
            <p className="text-sm text-[#8A7E84] leading-relaxed max-w-xs">
              用心安利每一款好产品，帮你选对、买对、用对。
            </p>
            <div className="flex items-center gap-2 text-xs text-[#8A7E84]">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span>以真诚推荐为初心</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-sm text-[#4A3F44] mb-4">快速导航</h4>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-sm text-[#8A7E84] hover:text-rose-600 transition-colors">产品库</Link></li>
              <li><Link href="/compare" className="text-sm text-[#8A7E84] hover:text-rose-600 transition-colors">对比报告</Link></li>
              <li><Link href="/settings" className="text-sm text-[#8A7E84] hover:text-rose-600 transition-colors">个性化设置</Link></li>
              <li><Link href="/about" className="text-sm text-[#8A7E84] hover:text-rose-600 transition-colors">关于 / 免责</Link></li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="font-serif font-semibold text-sm text-[#4A3F44] mb-4">免责声明</h4>
            <p className="text-xs text-[#8A7E84] leading-relaxed">
              本网站部分商品链接为电商联盟推广链接，通过链接购买后我们可能获得一定比例的佣金，
              但这不影响您的购买价格，也不会影响我们的推荐立场。所有产品推荐基于真实使用体验和客观评测，不接受付费推广影响评测结论。
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-rose-100/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8A7E84]">
            &copy; {new Date().getFullYear()} 美妆安利 · 用心安利每一款好物
          </p>
          <div className="flex items-center gap-4 text-xs text-[#8A7E84]">
            <span>本网站含有广告链接</span>
            <span>·</span>
            <span>数据仅供参考</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
