'use client';

import Link from 'next/link';
import { ShoppingBag, Eye } from 'lucide-react';
import Rating from '@/components/ui/Rating';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { formatPrice, getPlatformName } from '@/lib/utils';
import { AffiliateLink } from '@/lib/affiliate';
import { Product } from '@/lib/filters';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const lowestPrice = product.affiliateLinks.length > 0
    ? Math.min(...product.affiliateLinks.map(l => l.price ?? product.price))
    : product.price;

  return (
    <Card className="overflow-hidden group">
      <Link href={`/products/${product.id}`}>
        {/* Image placeholder */}
        <div className="aspect-[4/3] bg-gradient-rose flex items-center justify-center overflow-hidden">
          <div className="text-center p-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-white/60 backdrop-blur flex items-center justify-center mb-2">
              <ShoppingBag className="w-7 h-7 text-rose-400" />
            </div>
            <p className="text-xs text-[#8A7E84] font-medium">{product.brand}</p>
            <p className="text-sm text-[#4A3F44] font-medium leading-tight mt-0.5 line-clamp-1">{product.name}</p>
          </div>
        </div>
      </Link>

      <div className="p-4 md:p-5 space-y-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="rose">{product.category === 'skincare' ? '护肤' : product.category === 'makeup' ? '彩妆' : product.category === 'sunscreen' ? '防晒' : product.category === 'fragrance' ? '香水' : '身体护理'}</Badge>
          {product.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="default">{tag}</Badge>
          ))}
          {product.affiliateLinks.some(l => l.commission >= 0.18) && (
            <Badge variant="gold">有佣金</Badge>
          )}
        </div>

        {/* Title & Brand */}
        <Link href={`/products/${product.id}`} className="block group-hover:text-rose-600 transition-colors">
          <p className="text-xs text-[#8A7E84] font-medium">{product.brandEn || product.brand}</p>
          <h3 className="font-serif font-semibold text-[#4A3F44] leading-tight">{product.name}</h3>
        </Link>

        {/* Rating & Price */}
        <div className="flex items-end justify-between">
          <Rating rating={product.rating} size="sm" />
          <div className="text-right">
            <span className="font-serif font-bold text-lg text-rose-600">{formatPrice(lowestPrice)}</span>
            {product.affiliateLinks.length > 1 && (
              <span className="text-[10px] text-[#8A7E84] block -mt-0.5">起</span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-[#8A7E84] leading-relaxed line-clamp-2">{product.description}</p>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 btn-secondary text-xs py-2 px-3"
          >
            <Eye className="w-3.5 h-3.5" />
            查看详情
          </Link>
          <Link
            href={`/compare?add=${product.id}`}
            className="btn-ghost text-xs py-2 px-3 text-[#8A7E84]"
          >
            对比
          </Link>
        </div>
      </div>
    </Card>
  );
}
