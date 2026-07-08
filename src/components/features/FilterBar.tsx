'use client';

import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { FilterOptions } from '@/lib/filters';

interface FilterBarProps {
  categories: { id: string; name: string }[];
  priceRange: [number, number];
  currentFilters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export default function FilterBar({ categories, priceRange, currentFilters, onFilterChange }: FilterBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateFilter = (partial: Partial<FilterOptions>) => {
    onFilterChange({ ...currentFilters, ...partial });
  };

  const clearFilters = () => {
    onFilterChange({
      category: null,
      minPrice: null,
      maxPrice: null,
      minRating: null,
      tags: [],
      sortBy: 'default',
    });
  };

  const hasActiveFilters = currentFilters.category || currentFilters.minPrice || currentFilters.maxPrice || currentFilters.minRating || currentFilters.tags.length > 0 || currentFilters.sortBy !== 'default';

  const filterContent = (
    <div className="space-y-5">
      {/* Sort */}
      <div>
        <label className="text-xs font-medium text-[#4A3F44] mb-2 block">排序方式</label>
        <select
          className="w-full rounded-xl border border-rose-200/60 bg-white px-3 py-2.5 text-sm text-[#4A3F44] focus:outline-none focus:ring-2 focus:ring-rose-200"
          value={currentFilters.sortBy}
          onChange={(e) => updateFilter({ sortBy: e.target.value as FilterOptions['sortBy'] })}
        >
          <option value="default">默认排序</option>
          <option value="rating">评分最高</option>
          <option value="price-asc">价格从低到高</option>
          <option value="price-desc">价格从高到低</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="text-xs font-medium text-[#4A3F44] mb-2 block">产品分类</label>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentFilters.category === cat.id
                  ? 'bg-rose-100 text-rose-700 border border-rose-200'
                  : 'bg-white text-[#6B5E64] border border-cream-200 hover:border-rose-200'
              }`}
              onClick={() => updateFilter({ category: currentFilters.category === cat.id ? null : cat.id })}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-xs font-medium text-[#4A3F44] mb-2 block">价格区间</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder={`¥${priceRange[0]}`}
            className="w-full rounded-xl border border-rose-200/60 bg-white px-3 py-2.5 text-sm text-[#4A3F44] focus:outline-none focus:ring-2 focus:ring-rose-200"
            value={currentFilters.minPrice ?? ''}
            onChange={(e) => updateFilter({ minPrice: e.target.value ? Number(e.target.value) : null })}
          />
          <span className="text-[#8A7E84] text-xs">—</span>
          <input
            type="number"
            placeholder={`¥${priceRange[1]}`}
            className="w-full rounded-xl border border-rose-200/60 bg-white px-3 py-2.5 text-sm text-[#4A3F44] focus:outline-none focus:ring-2 focus:ring-rose-200"
            value={currentFilters.maxPrice ?? ''}
            onChange={(e) => updateFilter({ maxPrice: e.target.value ? Number(e.target.value) : null })}
          />
        </div>
      </div>

      {/* Min Rating */}
      <div>
        <label className="text-xs font-medium text-[#4A3F44] mb-2 block">最低评分</label>
        <div className="flex gap-1">
          {[3, 3.5, 4, 4.5].map(r => (
            <button
              key={r}
              className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentFilters.minRating === r
                  ? 'bg-gold-100 text-gold-700 border border-gold-200'
                  : 'bg-white text-[#6B5E64] border border-cream-200 hover:border-gold-200'
              }`}
              onClick={() => updateFilter({ minRating: currentFilters.minRating === r ? null : r })}
            >
              {r}+
            </button>
          ))}
        </div>
      </div>

      {/* Clear */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full btn-ghost text-xs text-rose-600 justify-center border border-rose-200/60"
        >
          <X className="w-3.5 h-3.5" />
          清除所有筛选
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        className="md:hidden btn-secondary text-xs py-2 px-4"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        筛选
        {hasActiveFilters && (
          <span className="w-2 h-2 rounded-full bg-rose-500" />
        )}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/20" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-cream-100 p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif font-semibold text-[#4A3F44]">筛选条件</h3>
              <button onClick={() => setMobileOpen(false)} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        {filterContent}
      </div>
    </>
  );
}
