interface BadgeProps {
  children: React.ReactNode;
  variant?: 'rose' | 'lavender' | 'gold' | 'default';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    rose: 'bg-rose-100 text-rose-700',
    lavender: 'bg-lavender-100 text-lavender-700',
    gold: 'bg-gold-100 text-gold-700',
    default: 'bg-cream-200 text-[#6B5E64]',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
