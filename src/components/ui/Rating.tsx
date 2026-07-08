'use client';

import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

export default function Rating({ rating, maxRating = 5, size = 'md', showValue = true }: RatingProps) {
  const sizeMap = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };
  const textSize = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const half = !filled && i < rating;
          return (
            <Star
              key={i}
              className={`${sizeMap[size]} transition-colors ${
                filled
                  ? 'fill-gold-500 text-gold-500'
                  : half
                  ? 'fill-gold-300 text-gold-300'
                  : 'fill-cream-300 text-cream-300'
              }`}
            />
          );
        })}
      </div>
      {showValue && (
        <span className={`${textSize[size]} text-[#8A7E84] font-medium`}>{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
