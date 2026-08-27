// Kontiva v2 — base: ícones, marca, hooks compartilhados
const { useState, useEffect, useRef } = React;

// ---------- Icons ----------
const IconWhats = () =>
  <svg className="whats" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.05 4.91A10 10 0 0 0 4.04 18.26L3 22l3.83-1.01A10 10 0 1 0 19.05 4.91zM12 20.15a8.14 8.14 0 0 1-4.15-1.13l-.3-.18-2.27.6.6-2.22-.19-.32A8.15 8.15 0 1 1 12 20.15zm4.46-6.1c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.46c-.16 0-.4.06-.62.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.57.25 1.02.4 1.37.5.57.18 1.1.16 1.51.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z" fill="currentColor" />
  </svg>;

const IconArrow = () =>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

const IconTick = () =>
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>;

const IconRadar = () =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 12 L19 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>;

const IconDoc = () =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M6 3h8l4 4v14H6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M9 13h6M9 16h6M9 10h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>;

const IconBolt = () =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M13 3 4 14h7l-1 7 9-11h-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>;

const IconPlug = () =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M9 7V3M15 7V3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M6 7h12v4a6 6 0 0 1-12 0V7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M12 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>;

const IconChev = () =>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

const IconLinkedIn = () =>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-7.9c0-1.88-.04-4.3-2.62-4.3-2.63 0-3.03 2.05-3.03 4.17V23H8V8z" /></svg>;

const IconInstagram = () =>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.4" cy="6.6" r="1.3" fill="currentColor" /></svg>;

const IconYouTube = () =>
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.8" /><path d="M10 9.5v5l4.5-2.5L10 9.5z" fill="currentColor" /></svg>;

const IconClock = () =>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
    <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;

const IconCoins = () =>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="2.5" y="6" width="19" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.7" />
    <path d="M5.5 9.5v5M18.5 9.5v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>;

const IconShield = () =>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 3l7 2.8v5.4c0 4.4-2.9 7.4-7 9-4.1-1.6-7-4.6-7-9V5.8L12 3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;

const Brand = () =>
  <div className="brand-lockup">
    <span className="k">Kontiva</span><span className="dot">.</span><span className="ai">ai</span>
  </div>;

// ---------- Reveal hook ----------
function useReveal(rootRef) {
  useEffect(() => {
    if (!rootRef.current) return;
    const items = rootRef.current.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

// ---------- i18n ----------
const LangContext = React.createContext({ lang: 'pt', setLang: () => {}, t: window.KONTIVA_STR.pt });
function useLangCtx() { return React.useContext(LangContext); }

const LangToggle = ({ dark }) => {
  const { lang, setLang } = useLangCtx();
  return (
    <div className={'lang-toggle' + (dark ? ' dark' : '')}>
      <button type="button" className={lang === 'pt' ? 'on' : ''} onClick={() => setLang('pt')}>PT</button>
      <button type="button" className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
    </div>);
};

Object.assign(window, {
  IconWhats, IconArrow, IconTick, IconRadar, IconDoc, IconBolt, IconPlug,
  IconChev, IconLinkedIn, IconInstagram, IconYouTube,
  IconClock, IconCoins, IconShield,
  Brand, useReveal, brl, LangContext, useLangCtx, LangToggle
});
