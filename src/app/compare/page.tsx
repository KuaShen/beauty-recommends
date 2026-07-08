'use client';

import Link from 'next/link';
import { ArrowRight, BarChart3 } from 'lucide-react';
import CompareTable from '@/components/features/CompareTable';
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

export default function ComparePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8 md:mb-12">
        <h1 className="section-title">对比报告</h1>
        <p className="section-subtitle">多维横向评测，帮你从犹豫到确定</p>
      </div>

      <div className="space-y-10 md:space-y-16">
        {comparisons.map((comparison) => (
          <section key={comparison.slug}>
            <div className="flex items-end justify-between mb-4 md:mb-6">
              <div>
                <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#4A3F44] mb-1">
                  {comparison.title}
                </h2>
                <p className="text-sm text-[#8A7E84]">{comparison.subtitle}</p>
              </div>
              <Link
                href={`/compare/${comparison.slug}`}
                className="btn-ghost text-xs text-rose-600 hidden sm:flex"
              >
                查看完整报告
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <CompareTable
              productIds={comparison.productIds}
              dimensions={comparison.dimensions}
              scores={comparison.scores}
            />

            {/* Summary */}
            <div className="mt-4 glass-card p-4 md:p-5">
              <h4 className="font-serif font-semibold text-sm text-[#4A3F44] mb-2">总结推荐</h4>
              <p className="text-sm text-[#8A7E84] leading-relaxed">{comparison.summary}</p>
            </div>

            <div className="mt-4 text-center sm:hidden">
              <Link
                href={`/compare/${comparison.slug}`}
                className="btn-secondary text-xs"
              >
                查看完整报告
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        ))}
      </div>

      {/* Custom compare CTA */}
      <div className="mt-16 glass-card p-8 md:p-10 text-center">
        <div className="w-12 h-12 mx-auto rounded-xl bg-lavender-100 flex items-center justify-center mb-4">
          <BarChart3 className="w-6 h-6 text-lavender-500" />
        </div>
        <h2 className="font-serif text-lg md:text-xl font-semibold text-[#4A3F44] mb-2">
          想自己挑产品比一比？
        </h2>
        <p className="text-sm text-[#8A7E84] mb-5">
          前往产品库勾选你感兴趣的产品，一键生成专属对比报告
        </p>
        <Link href="/products" className="btn-primary text-sm">
          <BarChart3 className="w-4 h-4" />
          去产品库挑选
        </Link>
      </div>
    </div>
  );
}
