'use client';

import Link from 'next/link';
import { ExternalLink, Star } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { getProductById, Product } from '@/lib/filters';

interface CompareTableProps {
  productIds: string[];
  dimensions: { label: string; key: string; description: string }[];
  scores?: Record<string, Record<string, number>>;
}

export default function CompareTable({ productIds, dimensions, scores }: CompareTableProps) {
  const products = productIds.map(id => getProductById(id)).filter(Boolean) as Product[];

  if (products.length === 0) return null;

  const getScore = (productId: string, dimensionKey: string): number | null => {
    if (!scores || !scores[productId]) return null;
    return scores[productId][dimensionKey] ?? null;
  };

  const getScoreColor = (score: number): string => {
    if (score >= 4) return 'text-rose-600';
    if (score >= 3) return 'text-[#4A3F44]';
    return 'text-[#8A7E84]';
  };

  // Calculate winner
  const winnerId = scores
    ? productIds.reduce((best, id) => {
        if (!scores[id]) return best;
        const total = Object.values(scores[id]).reduce((sum, v) => sum + v, 0);
        const bestTotal = best ? Object.values(scores[best]).reduce((sum, v) => sum + v, 0) : 0;
        return total > bestTotal ? id : best;
      }, '' as string)
    : null;

  return (
    <div className="glass-card overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-rose-100/50">
            <th className="text-left py-4 px-4 md:px-5 text-xs font-medium text-[#8A7E84] w-[120px] md:w-[140px]">
              维度
            </th>
            {products.map((p) => (
              <th key={p.id} className={`text-center py-4 px-3 md:px-4 text-sm font-serif font-semibold ${p.id === winnerId ? 'text-rose-600' : 'text-[#4A3F44]'}`}>
                <Link href={`/products/${p.id}`} className="hover:text-rose-600 transition-colors">
                  {p.name.split(' ').slice(0, 2).join(' ')}
                </Link>
                {p.id === winnerId && (
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
                    <span className="text-[10px] text-gold-600 font-medium">推荐</span>
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Price row */}
          {products.some(p => p.price) && (
            <tr className="border-b border-rose-100/20">
              <td className="py-3 px-4 md:px-5 text-xs text-[#8A7E84]">参考价格</td>
              {products.map((p) => (
                <td key={p.id} className="text-center py-3 px-3 md:px-4 text-sm font-medium text-[#4A3F44]">
                  {formatPrice(p.price)}
                </td>
              ))}
            </tr>
          )}

          {/* Rating row */}
          <tr className="border-b border-rose-100/20">
            <td className="py-3 px-4 md:px-5 text-xs text-[#8A7E84]">评分</td>
            {products.map((p) => (
              <td key={p.id} className="text-center py-3 px-3 md:px-4">
                <span className="text-sm font-medium text-gold-600">{p.rating.toFixed(1)}</span>
              </td>
            ))}
          </tr>

          {/* Score dimensions */}
          {dimensions.map((dim) => (
            <tr key={dim.key} className="border-b border-rose-100/20">
              <td className="py-3 px-4 md:px-5">
                <div>
                  <span className="text-xs text-[#4A3F44] font-medium">{dim.label}</span>
                  <span className="text-[10px] text-[#8A7E84] block">{dim.description}</span>
                </div>
              </td>
              {products.map((p) => {
                const score = getScore(p.id, dim.key);
                return (
                  <td key={p.id} className="text-center py-3 px-3 md:px-4">
                    {score !== null ? (
                      <span className={`text-sm font-semibold ${getScoreColor(score)}`}>
                        {'★'.repeat(score)}{'☆'.repeat(5 - score)}
                      </span>
                    ) : (
                      <span className="text-[#8A7E84] text-xs">—</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}

          {/* Action row */}
          <tr>
            <td className="py-4 px-4 md:px-5"></td>
            {products.map((p) => (
              <td key={p.id} className="text-center py-4 px-3 md:px-4">
                <Link
                  href={`/products/${p.id}`}
                  className="btn-ghost text-xs py-1.5 px-3 text-rose-600"
                >
                  详情
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
