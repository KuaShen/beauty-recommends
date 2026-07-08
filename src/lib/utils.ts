export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(price: number): string {
  return `¥${price.toFixed(0)}`;
}

export function getRatingStars(rating: number): string[] {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return [
    ...Array(full).fill('full'),
    ...Array(half).fill('half'),
    ...Array(empty).fill('empty'),
  ];
}

export function getPlatformName(platform: string): string {
  const names: Record<string, string> = {
    taobao: '淘宝',
    jd: '京东',
    pdd: '拼多多',
    vip: '唯品会',
  };
  return names[platform] || platform;
}

export function getPlatformColor(platform: string): string {
  const colors: Record<string, string> = {
    taobao: 'text-orange-500',
    jd: 'text-red-500',
    pdd: 'text-red-600',
    vip: 'text-blue-500',
  };
  return colors[platform] || 'text-gray-500';
}
