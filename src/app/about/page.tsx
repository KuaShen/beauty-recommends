import Link from 'next/link';
import { Heart, Shield, ExternalLink, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="section-title">关于美妆安利</h1>
        <p className="section-subtitle">用心安利每一款好物</p>
      </div>

      <div className="space-y-6">
        {/* Mission */}
        <div className="glass-card p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
              <Heart className="w-5 h-5 text-rose-500" />
            </div>
            <h2 className="font-serif font-semibold text-lg text-[#4A3F44]">我们的使命</h2>
          </div>
          <p className="text-sm text-[#8A7E84] leading-relaxed">
            美妆安利致力于为每一位爱美的你提供真实、客观、有用的产品推荐和对比评测。
            我们深知美妆产品选择之难——价格高、种类多、广告杂——所以我们用真实的体验和透明的数据，
            帮你快速找到真正适合你的产品。
          </p>
        </div>

        {/* How we make money */}
        <div className="glass-card p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-gold-500" />
            </div>
            <h2 className="font-serif font-semibold text-lg text-[#4A3F44]">如何盈利</h2>
          </div>
          <p className="text-sm text-[#8A7E84] leading-relaxed mb-4">
            本网站通过电商联盟推广（CPS）获得收入。当您点击我们提供的购买链接并完成购买后，
            电商平台会向我們支付一定比例的佣金。这不会影响您的购买价格。
          </p>
          <div className="bg-cream-100 rounded-xl p-4">
            <h4 className="text-xs font-medium text-[#4A3F44] mb-2">佣金来源（示例）</h4>
            <ul className="space-y-2">
              <li className="flex items-center justify-between text-xs">
                <span className="text-[#8A7E84]">淘宝 / 天猫（阿里妈妈·淘宝客）</span>
                <span className="text-[#4A3F44] font-medium">5% – 30%</span>
              </li>
              <li className="flex items-center justify-between text-xs">
                <span className="text-[#8A7E84]">京东（京东联盟）</span>
                <span className="text-[#4A3F44] font-medium">3% – 15%</span>
              </li>
              <li className="flex items-center justify-between text-xs">
                <span className="text-[#8A7E84]">拼多多（多多进宝）</span>
                <span className="text-[#4A3F44] font-medium">1% – 10%</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Principles */}
        <div className="glass-card p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-lavender-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-lavender-500" />
            </div>
            <h2 className="font-serif font-semibold text-lg text-[#4A3F44]">推荐原则</h2>
          </div>
          <ul className="space-y-3 text-sm text-[#8A7E84]">
            <li className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">①</span>
              <span><strong className="text-[#4A3F44]">真实体验优先</strong> — 所有产品评测基于实际使用感受和成分分析，不接受付费推广影响结论。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">②</span>
              <span><strong className="text-[#4A3F44]">透明佣金披露</strong> — 所有推广链接均明确标注，佣金比例公开透明。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">③</span>
              <span><strong className="text-[#4A3F44]">用户立场不变</strong> — 推荐结论不受佣金比例影响。高佣产品不一定会被推荐，低佣产品也不会被忽略。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">④</span>
              <span><strong className="text-[#4A3F44]">持续更新</strong> — 产品数据和评测内容定期更新，确保信息时效性。</span>
            </li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="glass-card p-6 md:p-8 border border-gold-200/60">
          <div className="flex items-center gap-2.5 mb-3">
            <ExternalLink className="w-4 h-4 text-gold-500" />
            <h2 className="font-serif font-semibold text-sm text-[#4A3F44]">免责声明</h2>
          </div>
          <p className="text-xs text-[#8A7E84] leading-relaxed">
            本网站所展示的产品信息、价格、成分等内容仅供参考，不构成购买建议或医疗建议。
            产品价格和可用性可能随时变化，请以各电商平台实际信息为准。
            本网站包含广告推广链接，我们可能通过您的购买获得佣金。
            如有疑问，请通过以下方式与我们联系。
          </p>
        </div>
      </div>
    </div>
  );
}
