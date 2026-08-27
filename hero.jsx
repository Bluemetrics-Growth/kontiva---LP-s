/* Kontiva.ai Landing — sections */

const { useState, useEffect, useRef, useMemo } = React;

// ---------- Inline icons (kept simple, geometric) ----------
const IconWhats = () => (
  <svg className="whats" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.05 4.91A10 10 0 0 0 4.04 18.26L3 22l3.83-1.01A10 10 0 1 0 19.05 4.91zM12 20.15a8.14 8.14 0 0 1-4.15-1.13l-.3-.18-2.27.6.6-2.22-.19-.32A8.15 8.15 0 1 1 12 20.15zm4.46-6.1c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.46c-.16 0-.4.06-.62.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.57.25 1.02.4 1.37.5.57.18 1.1.16 1.51.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z" fill="currentColor"/>
  </svg>
);

const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconTick = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
    <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconRadar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M12 12 L19 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const IconDoc = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M6 3h8l4 4v14H6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M9 13h6M9 16h6M9 10h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const IconBolt = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M13 3 4 14h7l-1 7 9-11h-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
  </svg>
);

// ---------- Brand lockup ----------
const Brand = () => (
  <div className="brand-lockup">
    <span className="k">Kontiva</span>
    <span className="dot">.</span>
    <span className="ai">ai</span>
  </div>
);

// ---------- Nav ----------
const Nav = () => (
  <nav className="nav">
    <div className="shell nav-inner">
      <Brand />
      <div className="nav-links">
        <a href="#problema">O problema</a>
        <a href="#calculadora">Calculadora</a>
        <a href="#como-funciona">Como funciona</a>
        <a
          href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20conhecer%20a%20Kontiva.ai"
          target="_blank" rel="noreferrer"
          className="btn btn-primary"
          style={{ padding: '10px 18px', fontSize: 14 }}
        >
          <IconWhats /> Falar no WhatsApp
        </a>
      </div>
    </div>
  </nav>
);

// ---------- Hero ----------
const Hero = () => {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) ref.current.classList.add('in-view');
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="hero" ref={ref} id="hero">
      <div className="shell hero-grid">
        <div>
          <div className="eyebrow reveal"><span className="dot-cyan" /> Gestão contábil sem ponto cego</div>
          <h1 className="reveal delay-1" style={{ marginTop: 24 }}>
            Seu escritório<br/>
            perde receita<br/>
            <span className="strike">todo mês.</span><br/>
            <span className="accent">A gente encontra<span className="ai-dot">.</span></span>
          </h1>
          <p className="lead hero-sub reveal delay-2">
            A Kontiva.ai lê seus contratos, cruza com o que foi cobrado e mostra o que passou despercebido —
            contrato por contrato, cliente por cliente.
          </p>
          <div className="hero-cta-row reveal delay-3">
            <a
              href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20conhecer%20a%20Kontiva.ai"
              target="_blank" rel="noreferrer"
              className="btn btn-primary"
            >
              <IconWhats /> Falar no WhatsApp
            </a>
            <a href="#calculadora" className="btn btn-ghost">
              Ver quanto você perde <IconArrow />
            </a>
          </div>
          <div className="hero-meta reveal delay-4">
            <div><span className="tick"><IconTick /></span> Integra com seu ERP contábil</div>
            <div><span className="tick"><IconTick /></span> Diagnóstico em 72h</div>
          </div>
        </div>

        <RadarCard />
      </div>
    </section>
  );
};

const radarData = [
  { idx: '001', name: 'Padaria São Jorge ME', amount: 'R$ 1.240,00', flagged: false, badge: 'OK' },
  { idx: '002', name: 'Construtora Horizonte Ltda.', amount: 'R$ 3.820,00', flagged: true, badge: 'Reajuste não aplicado' },
  { idx: '003', name: 'Clínica Vitta Serviços',     amount: 'R$ 2.150,00', flagged: false, badge: 'OK' },
  { idx: '004', name: 'Mercado Bom Preço',          amount: 'R$ 980,00',   flagged: false, badge: 'OK' },
  { idx: '005', name: 'Studio M Arquitetura',       amount: 'R$ 1.640,00', flagged: true, badge: 'Serviço extra não cobrado' },
  { idx: '006', name: 'Transportes Aurora S.A.',    amount: 'R$ 4.500,00', flagged: false, badge: 'OK' },
  { idx: '007', name: 'Restaurante Pátio 22',       amount: 'R$ 720,00',   flagged: true, badge: 'Índice desatualizado' },
];

const RadarCard = () => {
  return (
    <div className="radar-card reveal delay-2">
      <div className="radar-head">
        <span>Carteira · Março/2026</span>
        <span className="live">Varredura ativa</span>
      </div>
      <div className="radar-list">
        {radarData.map((r, i) => (
          <div key={i} className={"radar-row" + (r.flagged ? " flagged" : "")}>
            <span className="idx">#{r.idx}</span>
            <span className="name">{r.name}</span>
            <span className="amount">{r.amount}</span>
            <span className="badge">{r.badge}</span>
          </div>
        ))}
      </div>
      <div className="radar-summary">
        <div>
          <div className="label">Receita a recuperar identificada</div>
        </div>
        <div className="value">R$ 6.180<span style={{ fontSize: 18, opacity: 0.6 }}>,00</span></div>
      </div>
    </div>
  );
};

// Exports
Object.assign(window, { Nav, Hero, Brand, IconWhats, IconArrow, IconTick, IconRadar, IconDoc, IconBolt });
