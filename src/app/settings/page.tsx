'use client';

import { useState } from 'react';
import { usePreferences } from '@/contexts/PreferencesContext';
import { Palette, Type, Droplets, DollarSign, AlertTriangle, Check, RotateCcw } from 'lucide-react';

const themeColors = [
  { id: 'rose', label: '玫瑰粉', primary: '#E8A0B4', bgClass: 'bg-[#E8A0B4]' },
  { id: 'lavender', label: '淡雅紫', primary: '#B28FC4', bgClass: 'bg-[#B28FC4]' },
  { id: 'gold', label: '香槟金', primary: '#C9A96E', bgClass: 'bg-[#C9A96E]' },
  { id: 'sage', label: '鼠尾绿', primary: '#9CAF88', bgClass: 'bg-[#9CAF88]' },
  { id: 'blush', label: '蜜桃粉', primary: '#F5A0A0', bgClass: 'bg-[#F5A0A0]' },
];

const skinTypes = [
  { id: 'dry', label: '干性肌肤' },
  { id: 'oily', label: '油性肌肤' },
  { id: 'combination', label: '混合肌肤' },
  { id: 'sensitive', label: '敏感肌肤' },
  { id: 'normal', label: '中性肌肤' },
];

export default function SettingsPage() {
  const { preferences, updatePreferences, resetPreferences } = usePreferences();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="section-title">个性化设置</h1>
        <p className="section-subtitle">根据自己的肤质和喜好，定制专属的美妆推荐体验</p>
      </div>

      <div className="space-y-6">
        {/* Skin Type */}
        <div className="glass-card p-5 md:p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-lg bg-rose-100 flex items-center justify-center">
              <Droplets className="w-4.5 h-4.5 text-rose-500" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-[#4A3F44] text-sm">肤质选择</h3>
              <p className="text-xs text-[#8A7E84]">系统将根据肤质推荐更合适的产品</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {skinTypes.map((st) => (
              <button
                key={st.id}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  preferences.skinType === st.id
                    ? 'bg-rose-100 text-rose-700 border border-rose-200'
                    : 'bg-white text-[#6B5E64] border border-cream-200 hover:border-rose-200'
                }`}
                onClick={() => updatePreferences({ skinType: preferences.skinType === st.id ? null : st.id })}
              >
                {preferences.skinType === st.id && <Check className="w-3.5 h-3.5 inline mr-1" />}
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="glass-card p-5 md:p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-lg bg-gold-100 flex items-center justify-center">
              <DollarSign className="w-4.5 h-4.5 text-gold-500" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-[#4A3F44] text-sm">预算范围</h3>
              <p className="text-xs text-[#8A7E84]">设置你的单品预算区间</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs text-[#8A7E84] mb-1 block">最低预算</label>
              <input
                type="number"
                className="w-full rounded-xl border border-rose-200/60 bg-white px-3 md:px-4 py-2.5 text-sm text-[#4A3F44] focus:outline-none focus:ring-2 focus:ring-rose-200"
                value={preferences.budgetMin}
                onChange={(e) => updatePreferences({ budgetMin: Number(e.target.value) })}
              />
            </div>
            <span className="text-[#8A7E84] mt-6">—</span>
            <div className="flex-1">
              <label className="text-xs text-[#8A7E84] mb-1 block">最高预算</label>
              <input
                type="number"
                className="w-full rounded-xl border border-rose-200/60 bg-white px-3 md:px-4 py-2.5 text-sm text-[#4A3F44] focus:outline-none focus:ring-2 focus:ring-rose-200"
                value={preferences.budgetMax}
                onChange={(e) => updatePreferences({ budgetMax: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>

        {/* Theme Color */}
        <div className="glass-card p-5 md:p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-lg bg-lavender-100 flex items-center justify-center">
              <Palette className="w-4.5 h-4.5 text-lavender-500" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-[#4A3F44] text-sm">主题配色</h3>
              <p className="text-xs text-[#8A7E84]">选择你喜欢的色彩风格</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {themeColors.map((color) => (
              <button
                key={color.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                  preferences.themeColor === color.id
                    ? 'bg-rose-50 border border-rose-200'
                    : 'bg-white border border-cream-200 hover:border-rose-200'
                }`}
                onClick={() => updatePreferences({ themeColor: color.id })}
              >
                <div className={`w-5 h-5 rounded-full ${color.bgClass} ${preferences.themeColor === color.id ? 'ring-2 ring-offset-1 ring-rose-300' : ''}`} />
                <span className="text-xs font-medium text-[#4A3F44]">{color.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="glass-card p-5 md:p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-lg bg-cream-200 flex items-center justify-center">
              <Type className="w-4.5 h-4.5 text-[#6B5E64]" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-[#4A3F44] text-sm">字体大小</h3>
              <p className="text-xs text-[#8A7E84]">调整阅读舒适度</p>
            </div>
          </div>
          <div className="flex gap-2">
            {[
              { id: 'small' as const, label: '小', desc: '紧凑' },
              { id: 'medium' as const, label: '中', desc: '推荐' },
              { id: 'large' as const, label: '大', desc: '舒适' },
            ].map((opt) => (
              <button
                key={opt.id}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  preferences.fontSize === opt.id
                    ? 'bg-rose-100 text-rose-700 border border-rose-200'
                    : 'bg-white text-[#6B5E64] border border-cream-200 hover:border-rose-200'
                }`}
                onClick={() => updatePreferences({ fontSize: opt.id })}
              >
                <span className="font-medium">{opt.label}</span>
                <span className="text-xs text-[#8A7E84] block mt-0.5">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button onClick={handleSave} className="btn-primary text-sm w-full sm:w-auto">
            {saved ? '✓ 已保存' : '保存设置'}
          </button>
          <button onClick={resetPreferences} className="btn-ghost text-xs text-[#8A7E84] w-full sm:w-auto">
            <RotateCcw className="w-3.5 h-3.5" />
            恢复默认
          </button>
        </div>
      </div>
    </div>
  );
}
