'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Preferences {
  skinType: string | null;
  budgetMin: number;
  budgetMax: number;
  avoidIngredients: string[];
  preferredIngredients: string[];
  themeColor: string;
  fontSize: 'small' | 'medium' | 'large';
}

interface PreferencesContextType {
  preferences: Preferences;
  updatePreferences: (partial: Partial<Preferences>) => void;
  resetPreferences: () => void;
}

const defaultPreferences: Preferences = {
  skinType: null,
  budgetMin: 0,
  budgetMax: 2000,
  avoidIngredients: [],
  preferredIngredients: [],
  themeColor: 'rose',
  fontSize: 'medium',
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('beauty-preferences');
    if (stored) {
      try {
        setPreferences(JSON.parse(stored));
      } catch {}
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('beauty-preferences', JSON.stringify(preferences));

      // Apply font size
      document.documentElement.style.fontSize =
        preferences.fontSize === 'small' ? '14px' :
        preferences.fontSize === 'large' ? '18px' : '16px';
    }
  }, [preferences, loaded]);

  const updatePreferences = (partial: Partial<Preferences>) => {
    setPreferences(prev => ({ ...prev, ...partial }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences, resetPreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}
