'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { locales, defaultLocale, supportedLocales } from '../locales';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 1. Verificar se existe no Cookie
    const savedLang = Cookies.get('NEXT_LOCALE');
    
    if (savedLang && supportedLocales.includes(savedLang)) {
      setLang(savedLang);
    } else {
      // 2. Tentar detectar do navegador
      const browserLang = navigator.language.split('-')[0];
      if (supportedLocales.includes(browserLang)) {
        setLang(browserLang);
        Cookies.set('NEXT_LOCALE', browserLang, { expires: 365 });
      }
    }
    setMounted(true);
  }, []);

  const changeLanguage = (newLang) => {
    if (supportedLocales.includes(newLang)) {
      setLang(newLang);
      Cookies.set('NEXT_LOCALE', newLang, { expires: 365 });
    }
  };

  // Função t(key) para tradução com suporte a chaves aninhadas (ex: 'common.login')
  const t = (path) => {
    const keys = path.split('.');
    let value = locales[lang];

    for (const key of keys) {
      if (value && value[key]) {
        value = value[key];
      } else {
        // Fallback para português se não achar no idioma atual
        let fallbackValue = locales[defaultLocale];
        for (const fKey of keys) {
          if (fallbackValue && fallbackValue[fKey]) {
            fallbackValue = fallbackValue[fKey];
          } else {
            return path; // Retorna a própria chave se nada for encontrado
          }
        }
        return fallbackValue;
      }
    }

    return value;
  };

  const value = {
    lang,
    changeLanguage,
    t,
    supportedLocales,
    mounted
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
