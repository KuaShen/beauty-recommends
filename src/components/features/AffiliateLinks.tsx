'use client';

import { ExternalLink, Tag, ShoppingCart, AlertCircle } from 'lucide-react';
import { formatPrice, getPlatformName } from '@/lib/utils';
import { AffiliateLink } from '@/lib/affiliate';

interface AffiliateLinksProps {
  links: AffiliateLink[];
  productName: string;
}

const platformIcons: Record<string, string> = {
  taobao: '🛒',
  jd: '🐶',
  pdd: '🛍️',
  vip: '💎',
};

export default function AffiliateLinks({ links, productName }: AffiliateLinksProps) {
  if (links.length === 0) {
    return (
      <div className="glass-card p-5 text-center">
        <AlertCircle className="w-6 h-6 text-[#8A7E84] mx-auto mb-2" />
        <p className="text-sm text-[#8A7E84]">暂无购买链接</p>
      </div>
    );
  }

  const lowestPrice = Math.min(...links.map(l => l.price ?? Infinity));

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4 md:p-5 border-b border-rose-100/50">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-rose-500" />
          <h3 className="font-serif font-semibold text-[#4A3F44] text-sm">购买渠道</h3>
        </div>
        <p className="text-xs text-[#8A7E84] mt-1">通过以下链接购买，我们将获得一定比例的佣金（不影响您的购买价格）</p>
      </div>

      <div className="divide-y divide-rose-100/30">
        {links.map((link, i) => {
          const isBestPrice = link.price !== undefined && link.price === lowestPrice;
          return (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 md:p-5 hover:bg-rose-50/30 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{platformIcons[link.platform] || '🛍️'}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-[#4A3F44]">{getPlatformName(link.platform)}</span>
                    {isBestPrice && (
                      <span className="text-[10px] bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded-full font-medium">
                        最低价
                      </span>
                    )}
                    {link.commission >= 0.18 && (
                      <span className="text-[10px] bg-gold-100 text-gold-600 px-1.5 py-0.5 rounded-full font-medium">
                        高佣金
                      </span>
                    )}
                  </div>
                  {link.price && (
                    <p className="text-xs text-[#8A7E84]">
                      {formatPrice(link.price)}
                      {link.commission > 0 && ` · 佣金 ${(link.commission * 100).toFixed(0)}%`}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-rose-500 text-sm font-medium group-hover:gap-2 transition-all">
                <span>去购买</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          );
        })}
      </div>

      <div className="px-4 md:px-5 py-3 bg-cream-100/50 flex items-start gap-2">
        <Tag className="w-3.5 h-3.5 text-[#8A7E84] mt-0.5 shrink-0" />
        <p className="text-[10px] text-[#8A7E84] leading-relaxed">
          本页面含推广链接，我们可能通过您的购买获得佣金。价格信息仅供参考，实际价格以平台为准。
        </p>
      </div>
    </div>
  );
}
