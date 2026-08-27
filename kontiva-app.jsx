// Kontiva v2 — App: composição + idioma + tweaks
// (hooks useState/useEffect vêm de kontiva-base.jsx — escopo global compartilhado)

const App = () => {
  const [tweaks, setTweaks] = useState(window.__TWEAKS);
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem('kontiva_lang') === 'en' ? 'en' : 'pt'; } catch (e) { return 'pt'; }
  });
  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem('kontiva_lang', l); } catch (e) {}
  };

  useEffect(() => { window.__setTweaks = (patch) => setTweaks((t) => ({ ...t, ...patch })); }, []);
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-boost', tweaks.accentBoost);
  }, [tweaks.accentBoost]);
  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
  }, [lang]);
  useEffect(() => {
    const root = document.documentElement.style;
    const sets = {
      inter: { display: "'Inter', sans-serif", body: "'Inter', sans-serif" },
      space: { display: "'Space Grotesk', sans-serif", body: "'Inter', sans-serif" },
      sora: { display: "'Sora', sans-serif", body: "'Sora', sans-serif" },
      geist: { display: "'Geist', sans-serif", body: "'Geist', sans-serif" },
      mono: { display: "'JetBrains Mono', monospace", body: "'Inter', sans-serif" }
    };
    const s = sets[tweaks.fontSet] || sets.sora;
    root.setProperty('--font-display', s.display);
    root.setProperty('--font-body', s.body);
  }, [tweaks.fontSet]);

  const ctx = { lang, setLang, t: window.KONTIVA_STR[lang] };

  return (
    <LangContext.Provider value={ctx}>
      <Nav navStyle={tweaks.navStyle || 'light'} />
      <Hero />
      <Problem />
      <Flow />
      <ChatSection />
      <Agents />
      <Results />
      <Calculator />
      <Pricing />
      <Faq />
      <FinalCTA />
      <Footer />
    </LangContext.Provider>);
};

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
