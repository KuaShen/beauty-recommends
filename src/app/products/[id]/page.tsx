'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BarChart3, Check, AlertTriangle } from 'lucide-react';
import Rating from '@/components/ui/Rating';
import Badge from '@/components/ui/Badge';
import ProductImage from '@/components/features/ProductImage';
import AffiliateLinks from '@/components/features/AffiliateLinks';
import { getProductById } from '@/lib/filters';
import { formatPrice } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Product } from '@/lib/filters';

const categoryLabels: Record<string, string> = {
  skincare: '护肤',
  makeup: '彩妆',
  sunscreen: '防晒',
  body: '身体护理',
  fragrance: '香水',
};

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const p = getProductById(id);
    setProduct(p || null);
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-cream-200 flex items-center justify-center mb-4">
          <AlertTriangle className="w-7 h-7 text-[#8A7E84]" />
        </div>
        <h2 className="font-serif text-xl font-semibold text-[#4A3F44] mb-2">产品未找到</h2>
        <p className="text-sm text-[#8A7E84] mb-6">抱歉，该产品不存在或已被移除</p>
        <Link href="/products" className="btn-primary text-sm">
          <ArrowLeft className="w-4 h-4" />
          返回产品库
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <Link
        href="/products"
        className="inline-flex items-center gap-1.5 text-xs text-[#8A7E84] hover:text-rose-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        返回产品库
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
        {/* Product Image */}
        <div className="lg:col-span-2">
          <div className="glass-card overflow-hidden">
            <ProductImage
              brand={product.brand}
              name={product.name}
              category={product.category}
              className="w-full aspect-square"
            />
            <div className="p-4 text-center border-t border-rose-100/30">
              <p className="font-serif text-sm font-semibold text-[#4A3F44]">{product.name}</p>
              <p className="text-xs text-[#8A7E84] mt-0.5">{product.brand}</p>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="rose">{categoryLabels[product.category] || product.category}</Badge>
              {product.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="default">{tag}</Badge>
              ))}
            </div>
            <p className="text-xs text-[#8A7E84] font-medium mb-1">{product.brand}</p>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#4A3F44] leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mt-3">
              <Rating rating={product.rating} size="md" />
              <span className="font-serif text-2xl font-bold text-rose-600">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-[#8A7E84]">参考价</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-serif font-semibold text-[#4A3F44] mb-2">产品介绍</h3>
            <p className="text-sm text-[#8A7E84] leading-relaxed">{product.description}</p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="font-serif font-semibold text-[#4A3F44] mb-3">核心亮点</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-[#4A3F44]">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skin suitability */}
          {product.suitableFor.length > 0 && (
            <div className="glass-card p-4 md:p-5 space-y-3">
              <div>
                <h4 className="text-xs font-medium text-[#8A7E84] mb-2">✨ 适合肤质</h4>
                <div className="flex flex-wrap gap-2">
                  {product.suitableFor.map(s => (
                    <Badge key={s} variant="rose">{s}</Badge>
                  ))}
                </div>
              </div>
              {product.avoidFor.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-[#8A7E84] mb-2">⚠️ 避开肤质</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.avoidFor.map(a => (
                      <Badge key={a} variant="default">{a}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Ingredients */}
          {product.ingredients.length > 0 && (
            <div>
              <h3 className="font-serif font-semibold text-[#4A3F44] mb-2">核心成分</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing, i) => (
                  <Badge key={i} variant="gold">{ing}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Usage */}
          {product.usage && (
            <div>
              <h3 className="font-serif font-semibold text-[#4A3F44] mb-2">使用方法</h3>
              <p className="text-sm text-[#8A7E84] leading-relaxed">{product.usage}</p>
            </div>
          )}
        </div>
      </div>

      {/* Affiliate Links */}
      <div className="mt-8 md:mt-12">
        <AffiliateLinks links={product.affiliateLinks} productName={product.name} />
      </div>

      {/* Compare link */}
      <div className="mt-6">
        <Link
          href={`/compare?add=${product.id}`}
          className="btn-secondary text-sm"
        >
          <BarChart3 className="w-4 h-4" />
          加入对比
        </Link>
      </div>
    </div>
  );
}
