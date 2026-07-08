import productsData from '@/data/products.json';
import { AffiliateLink } from './affiliate';

export interface Product {
  id: string;
  name: string;
  brand: string;
  brandEn: string;
  category: string;
  tags: string[];
  price: number;
  rating: number;
  image: string;
  description: string;
  highlights: string[];
  ingredients: string[];
  suitableFor: string[];
  avoidFor: string[];
  usage?: string;
  shades?: string[];
  affiliateLinks: AffiliateLink[];
}

export interface FilterOptions {
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number | null;
  tags: string[];
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'default';
}

let products: Product[] = [];

export function getProducts(): Product[] {
  if (products.length === 0) {
    products = productsData as Product[];
  }
  return products;
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return getProducts().filter(p => p.category === category);
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  getProducts().forEach(p => p.tags.forEach(t => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export function getAllBrands(): string[] {
  const brandSet = new Set<string>();
  getProducts().forEach(p => brandSet.add(p.brand));
  return Array.from(brandSet).sort();
}

export function getFilteredProducts(filters: FilterOptions): Product[] {
  let result = getProducts();

  if (filters.category) {
    result = result.filter(p => p.category === filters.category);
  }
  if (filters.minPrice !== null) {
    result = result.filter(p => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== null) {
    result = result.filter(p => p.price <= filters.maxPrice!);
  }
  if (filters.minRating !== null) {
    result = result.filter(p => p.rating >= filters.minRating!);
  }
  if (filters.tags.length > 0) {
    result = result.filter(p => filters.tags.some(tag => p.tags.includes(tag)));
  }

  switch (filters.sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
  }

  return result;
}

export function getPriceRange(): [number, number] {
  const products = getProducts();
  if (products.length === 0) return [0, 0];
  const prices = products.map(p => p.price);
  return [Math.min(...prices), Math.max(...prices)];
}

export function getTagsByCategory(category: string): string[] {
  const tagSet = new Set<string>();
  getProductsByCategory(category).forEach(p => p.tags.forEach(t => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
