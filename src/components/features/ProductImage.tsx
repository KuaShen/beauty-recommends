'use client';

import { useMemo } from 'react';
import brandAssets from '@/data/brand-assets.json';

const brandData = brandAssets as Record<string, { color: string; gradient: string; icon: string }>;

interface ProductImageProps {
  brand: string;
  name: string;
  category: string;
  className?: string;
}

/**
 * 为每款产品生成贴片式的 SVG 产品插图。
 * 根据品类和名称自动匹配包装形态（口红/瓶/罐/管/粉饼）。
 */
export default function ProductImage({ brand, name, category, className = '' }: ProductImageProps) {
  const info = brandData[brand];
  const primary = info?.color || '#E8A0B4';
  // Extract a secondary color from the gradient string
  const secondary = info?.gradient.match(/#[A-Fa-f0-9]{6}/g)?.[1] || '#D4B5D9';
  const gold = '#C9A96E';

  const type = useMemo(() => {
    if (category === 'fragrance') return 'bottle';
    if (category === 'makeup') {
      if (/口红|唇釉|唇膏/.test(name)) return 'lipstick';
      if (/粉底/.test(name)) return 'bottle';
      if (/散粉|腮红|粉饼/.test(name)) return 'compact';
      if (/眼影/.test(name)) return 'compact';
      return 'lipstick';
    }
    if (category === 'sunscreen') return 'tube';
    if (category === 'body') return 'bottle';
    if (/面霜|黑绷带/.test(name)) return 'jar';
    if (/精华|神仙水/.test(name)) return 'bottle';
    return 'jar';
  }, [category, name]);

  const code = useMemo(() => {
    const m = name.match(/#(\w+)/);
    return m ? m[1] : '';
  }, [name]);

  return (
    <div className={`flex items-center justify-center overflow-hidden ${className}`}>
      <svg viewBox="0 0 200 250" className="w-full h-full max-w-[180px]">
        {renderShape(type, primary, secondary, gold, brand, code)}
      </svg>
    </div>
  );
}

function renderShape(
  type: string, p: string, s: string, g: string, brand: string, code: string
) {
  const shadow = <ellipse cx="100" cy="238" rx="42" ry="7" fill="rgba(0,0,0,0.06)" />;

  switch (type) {
    case 'lipstick':
      return <g>
        {shadow}
        {/* Tube */}
        <rect x="72" y="130" width="56" height="100" rx="4" fill={p} />
        {/* Gold band top */}
        <rect x="72" y="126" width="56" height="8" rx="2" fill={g} />
        <rect x="72" y="128" width="56" height="2" fill="rgba(255,255,255,0.2)" />
        {/* Bullet */}
        <path d="M78 126 Q78 95 100 85 Q122 95 122 126Z" fill={s} />
        <path d="M86 126 Q88 102 100 93 Q112 102 114 126Z" fill="rgba(255,255,255,0.3)" />
        {/* Highlight */}
        <rect x="80" y="135" width="6" height="70" rx="3" fill="rgba(255,255,255,0.12)" />
        {/* Brand code */}
        <text x="100" y="185" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="16" fontWeight="bold">{code || '◆'}</text>
      </g>;

    case 'jar':
      return <g>
        {shadow}
        {/* Body */}
        <rect x="50" y="145" width="100" height="85" rx="14" fill={p} />
        {/* Lid */}
        <rect x="54" y="118" width="92" height="30" rx="8" fill={g} />
        <rect x="54" y="116" width="92" height="6" rx="3" fill={g} />
        <rect x="64" y="121" width="35" height="6" rx="3" fill="rgba(255,255,255,0.2)" />
        {/* Label area */}
        <rect x="60" y="158" width="80" height="40" rx="6" fill="rgba(255,255,255,0.1)" />
        {/* Highlight */}
        <rect x="56" y="150" width="4" height="60" rx="2" fill="rgba(255,255,255,0.1)" />
      </g>;

    case 'tube':
      return <g>
        {shadow}
        {/* Body */}
        <rect x="65" y="120" width="70" height="110" rx="10" fill={p} />
        {/* Cap */}
        <rect x="62" y="105" width="76" height="22" rx="6" fill={s} />
        <rect x="70" y="108" width="28" height="5" rx="2.5" fill="rgba(255,255,255,0.2)" />
        {/* Stripe */}
        <rect x="65" y="198" width="70" height="3" rx="1.5" fill={g} />
        {/* Highlight */}
        <rect x="72" y="128" width="5" height="78" rx="2.5" fill="rgba(255,255,255,0.1)" />
      </g>;

    case 'compact':
      return <g>
        {shadow}
        {/* Base */}
        <rect x="42" y="150" width="116" height="80" rx="16" fill={p} />
        {/* Lid */}
        <rect x="39" y="118" width="122" height="34" rx="16" fill={s} />
        <rect x="48" y="122" width="38" height="6" rx="3" fill="rgba(255,255,255,0.15)" />
        {/* Rim */}
        <rect x="39" y="148" width="122" height="4" rx="2" fill={g} />
        {/* Mirror */}
        <circle cx="100" cy="170" r="30" fill="rgba(255,255,255,0.15)" />
        <circle cx="100" cy="170" r="30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <text x="100" y="176" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="14" fontWeight="bold">{brand.charAt(0)}</text>
        {/* Highlight */}
        <rect x="50" y="155" width="3" height="55" rx="1.5" fill="rgba(255,255,255,0.08)" />
      </g>;

    case 'bottle':
    default:
      return <g>
        {shadow}
        {/* Body */}
        <path d="M68 170 Q68 155 72 145 L72 140 L128 140 L128 145 Q132 155 132 170 L132 230 Q132 237 125 237 L75 237 Q68 237 68 230Z" fill={p} />
        {/* Neck */}
        <rect x="82" y="100" width="36" height="40" rx="4" fill={s} />
        {/* Cap */}
        <rect x="78" y="85" width="44" height="18" rx="6" fill={g} />
        <rect x="86" y="88" width="20" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
        {/* Ring */}
        <rect x="80" y="98" width="40" height="3" rx="1.5" fill={g} />
        {/* Label */}
        <rect x="74" y="168" width="52" height="28" rx="4" fill="rgba(255,255,255,0.1)" />
        {/* Liquid level */}
        <rect x="72" y="218" width="56" height="3" rx="1.5" fill="rgba(255,255,255,0.15)" />
        {/* Highlight */}
        <rect x="76" y="148" width="4" height="72" rx="2" fill="rgba(255,255,255,0.1)" />
        {/* Dropper */}
        <rect x="84" y="104" width="32" height="2" rx="1" fill="rgba(255,255,255,0.3)" />
      </g>;
  }
}
