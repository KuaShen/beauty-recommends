'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import CompareTable from '@/components/features/CompareTable';
import { getProductById } from '@/lib/filters';
import { formatPrice } from '@/lib/utils';
import rawComparisons from '@/data/comparisons.json';

interface ComparisonDim {
  label: string;
  key: string;
  description: string;
}

interface ComparisonData {
  slug: string;
  title: string;
  subtitle: string;
  coverImage: string;
  productIds: string[];
  dimensions: ComparisonDim[];
  scores: Record<string, Record<string, number>>;
  summary: string;
}

const comparisons = rawComparisons as unknown as ComparisonData[];

export default function CompareDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const comparison = comparisons.find(c => c.slug === slug);

  if (!comparison) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-cream-200 flex items-center justify-center mb-4">
          <BarChart3 className="w-7 h-7 text-[#8A7E84]" />
        </div>
        <h2 className="font-serif text-xl font-semibold text-[#4A3F44] mb-2">对比报告未找到</h2>
        <p className="text-sm text-[#8A7E84] mb-6">抱歉，该对比报告不存在</p>
        <Link href="/compare" className="btn-primary text-sm">
          <ArrowLeft className="w-4 h-4" />
          返回对比报告列表
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <Link
        href="/compare"
        className="inline-flex items-center gap-1.5 text-xs text-[#8A7E84] hover:text-rose-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        返回对比列表
      </Link>

      {/* Header */}
      <div className="mb-8 md:mb-10">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#4A3F44] mb-2">
          {comparison.title}
        </h1>
        <p className="text-sm md:text-base text-[#8A7E84]">{comparison.subtitle}</p>
      </div>

      {/* Compare Table */}
      <CompareTable
        productIds={comparison.productIds}
        dimensions={comparison.dimensions}
        scores={comparison.scores}
      />

      {/* Summary */}
      <div className="mt-6 md:mt-8 glass-card p-5 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gold-100 flex items-center justify-center">
            <span className="text-sm">🏆</span>
          </div>
          <h3 className="font-serif font-semibold text-[#4A3F44]">总结推荐</h3>
        </div>
        <p className="text-sm md:text-base text-[#8A7E84] leading-relaxed">
          {comparison.summary}
        </p>
      </div>

      {/* Product cards */}
      <div className="mt-10 md:mt-12">
        <h3 className="font-serif font-semibold text-[#4A3F44] mb-4">参与对比的产品</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {comparison.productIds.map((pid) => {
            const product = getProductById(pid);
            if (!product) return null;
            return (
              <Link
                key={pid}
                href={`/products/${pid}`}
                className="glass-card p-4 text-center group hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 mx-auto rounded-full bg-gradient-rose flex items-center justify-center mb-2">
                  <BarChart3 className="w-5 h-5 text-rose-400" />
                </div>
                <p className="text-xs text-[#8A7E84]">{product.brand}</p>
                <p className="text-sm font-serif font-semibold text-[#4A3F44] group-hover:text-rose-600 transition-colors line-clamp-2">
                  {product.name}
                </p>
                <p className="text-xs text-rose-600 font-medium mt-1">{formatPrice(product.price)}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
