'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ProductGrid from '@/components/features/ProductGrid';
import FilterBar from '@/components/features/FilterBar';
import { getFilteredProducts, getPriceRange, FilterOptions } from '@/lib/filters';
import categoriesData from '@/data/categories.json';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const priceRange = getPriceRange();
  const categories = (categoriesData as { id: string; name: string }[]);

  const [filters, setFilters] = useState<FilterOptions>({
    category: categoryParam,
    minPrice: null,
    maxPrice: null,
    minRating: null,
    tags: [],
    sortBy: 'default',
  });

  const filteredProducts = getFilteredProducts(filters);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h1 className="section-title">产品库</h1>
          <p className="section-subtitle">
            共 {filteredProducts.length} 件产品
            {filters.category && ` · ${categories.find(c => c.id === filters.category)?.name || ''}`}
          </p>
        </div>
        <FilterBar
          categories={categories}
          priceRange={priceRange}
          currentFilters={filters}
          onFilterChange={setFilters}
        />
      </div>

      <div className="flex gap-6">
        {/* Desktop Filter Sidebar */}
        <div className="hidden md:block w-56 lg:w-64 shrink-0">
          <div className="sticky top-24">
            <div className="glass-card p-4 lg:p-5">
              <h3 className="text-xs font-medium text-[#8A7E84] uppercase tracking-wider mb-4">筛选条件</h3>
              <FilterBar
                categories={categories}
                priceRange={priceRange}
                currentFilters={filters}
                onFilterChange={setFilters}
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 min-w-0">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-32 bg-cream-200 rounded" />
          <div className="h-4 w-48 bg-cream-200 rounded" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="glass-card h-72" />
            ))}
          </div>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
