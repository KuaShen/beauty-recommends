export interface AffiliateLink {
  platform: string;
  url: string;
  commission: number;
  price?: number;
}

export function getBestPrice(links: AffiliateLink[]): number | null {
  if (links.length === 0) return null;
  return Math.min(...links.map(l => l.price ?? Infinity));
}

export function getLowestPricePlatform(links: AffiliateLink[]): string | null {
  if (links.length === 0) return null;
  const sorted = [...links].filter(l => l.price).sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
  return sorted.length > 0 ? sorted[0].platform : null;
}

export function getMaxCommission(links: AffiliateLink[]): number {
  if (links.length === 0) return 0;
  return Math.max(...links.map(l => l.commission));
}

export function getCommissionLabel(commission: number): string {
  if (commission >= 0.20) return '高佣金';
  if (commission >= 0.15) return '中佣金';
  return '标准佣金';
}
