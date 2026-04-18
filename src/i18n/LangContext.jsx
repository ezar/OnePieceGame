import { createContext, useContext, useState } from 'react';
import { translations } from './translations';

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('opg_lang') || 'es'; } catch { return 'es'; }
  });

  function toggleLang() {
    const next = lang === 'es' ? 'en' : 'es';
    try { localStorage.setItem('opg_lang', next); } catch {}
    setLang(next);
  }

  return (
    <LangContext.Provider value={{ lang, toggleLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
