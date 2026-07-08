'use client';

import ProductCard from './ProductCard';
import { Product } from '@/lib/filters';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export default function ProductGrid({ products, title, subtitle }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto rounded-full bg-cream-200 flex items-center justify-center mb-4">
          <span className="text-2xl">🔍</span>
        </div>
        <p className="text-[#8A7E84] font-medium">没有找到匹配的产品</p>
        <p className="text-xs text-[#8A7E84] mt-1">试试调整筛选条件</p>
      </div>
    );
  }

  return (
    <section>
      {title && (
        <div className="mb-6 md:mb-8">
          {title && <h2 className="section-title">{title}</h2>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
