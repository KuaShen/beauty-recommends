/**
 * 带货联盟配置系统
 * 
 * 支持的联盟平台:
 * - 淘宝客 (阿里妈妈) - alimama.com
 * - 京东联盟 - union.jd.com
 * - 多多进宝 (拼多多) - jinbao.pinduoduo.com
 * - 唯品会联盟 - union.vip.com
 */

export interface AffiliateLink {
  platform: string;
  url: string;
  commission: number;
  price?: number;
}

export interface AffiliatePlatformConfig {
  id: string;
  name: string;
  icon: string;
  description: string;
  commissionRate: string;
  registrationUrl: string;
  setupGuide: string[];
  urlTemplate: string;
}

/**
 * 各平台联盟配置
 * 用户注册后替换下面的占位信息即可
 */
export const affiliatePlatforms: Record<string, AffiliatePlatformConfig> = {
  taobao: {
    id: 'taobao',
    name: '淘宝 / 天猫',
    icon: '🛒',
    description: '阿里妈妈·淘宝客，覆盖淘宝和天猫全平台',
    commissionRate: '5%–30%',
    registrationUrl: 'https://www.alimama.com/',
    setupGuide: [
      '注册/登录阿里妈妈账号 (alimama.com)',
      '进入「媒体资源管理」-「网站管理」，添加网站并获取PID',
      '搜索商品，获取推广链接（单品/店铺均可）',
      '将推广链接填入产品数据的 affiliateLinks 中',
      '注意：美妆类佣金率通常 5%-30%',
    ],
    urlTemplate: 'https://s.click.taobao.com/t?e=m%3D2%26s%3D{ITEM_ID}',
  },
  jd: {
    id: 'jd',
    name: '京东',
    icon: '🐶',
    description: '京东联盟，覆盖京东自营和第三方商家',
    commissionRate: '3%–15%',
    registrationUrl: 'https://union.jd.com/',
    setupGuide: [
      '注册/登录京东联盟 (union.jd.com)',
      '完成实名认证（需身份证+银行卡）',
      '在「联盟产品」中搜索美妆商品',
      '生成推广链接，选择「网站推广」类型',
      '将生成的链接填入产品数据中',
    ],
    urlTemplate: 'https://union-click.jd.com/jdc?e=&p={ENCODED_PARAMS}',
  },
  pdd: {
    id: 'pdd',
    name: '拼多多',
    icon: '🛍️',
    description: '多多进宝，覆盖拼多多全品类',
    commissionRate: '1%–10%',
    registrationUrl: 'https://jinbao.pinduoduo.com/',
    setupGuide: [
      '注册/登录多多进宝 (jinbao.pinduoduo.com)',
      '完成商家/推广者认证',
      '搜索美妆商品，选择「推广赚佣金」',
      '生成推广链接或推广二维码',
      '将链接填入产品数据中',
    ],
    urlTemplate: 'https://mobile.yangkeduo.com/{ITEM_ID}.html',
  },
  vip: {
    id: 'vip',
    name: '唯品会',
    icon: '💎',
    description: '唯品会联盟，专注品牌特卖',
    commissionRate: '3%–8%',
    registrationUrl: 'https://union.vip.com/',
    setupGuide: [
      '注册/登录唯品会联盟 (union.vip.com)',
      '完成推广者认证',
      '获取推广链接',
      '填入产品数据',
    ],
    urlTemplate: 'https://union.vip.com/product/{ITEM_ID}',
  },
};

export function getBestPrice(links: AffiliateLink[]): number | null {
  if (links.length === 0) return null;
  return Math.min(...links.map(l => l.price ?? Infinity));
}

export function getLowestPricePlatformName(links: AffiliateLink[]): string | null {
  if (links.length === 0) return null;
  const sorted = [...links].filter(l => l.price).sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
  if (sorted.length === 0) return null;
  const platform = affiliatePlatforms[sorted[0].platform];
  return platform?.name || sorted[0].platform;
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

export function getPlatformAffiliateUrl(platformId: string, productId: string): string {
  const platform = affiliatePlatforms[platformId];
  if (!platform) return '#';
  return platform.urlTemplate.replace('{ITEM_ID}', productId).replace('{ENCODED_PARAMS}', `AILegkH2UiF6jRfKc1zZQKJ3YWRTAxsHJR8rR0bDA2xNQ1HPkVyZO%2B1rE8HPdLf0l`);
}
