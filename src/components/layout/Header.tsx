'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, ShoppingBag, BarChart3, Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: '首页', icon: Sparkles },
  { href: '/products', label: '产品库', icon: ShoppingBag },
  { href: '/compare', label: '对比报告', icon: BarChart3 },
  { href: '/settings', label: '自定义', icon: Settings },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-rose-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-300 to-lavender-400 flex items-center justify-center shadow-soft group-hover:shadow-glow transition-shadow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-xl font-semibold text-[#4A3F44]">
              美妆安利
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-rose-50 text-rose-700 shadow-sm'
                      : 'text-[#6B5E64] hover:bg-rose-50/50 hover:text-rose-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden btn-ghost p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="菜单"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-rose-100/50 bg-white/95 backdrop-blur-lg">
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-rose-50 text-rose-700'
                      : 'text-[#6B5E64] hover:bg-rose-50/50'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
