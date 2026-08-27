// Kontiva v2 — seções A: Nav, Hero, Problema, Fluxo (como funciona)
// (hooks useState/useEffect/useRef vêm de kontiva-base.jsx — escopo global compartilhado)

const wa = (msg) => `https://wa.me/5511999999999?text=${encodeURIComponent(msg)}`;

// ---------- Nav ----------
const Nav = ({ navStyle }) => {
  const { t } = useLangCtx();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const dark = navStyle === 'dark' && !scrolled;
  return (
    <nav className={'nav' + (dark ? ' nav-dark' : '')}>
      <div className="shell nav-inner">
        <Brand />
        <div className="nav-right">
          <div className="nav-links">
            <a href="#como-funciona">{t.nav.how}</a>
            <a href="#chat">{t.nav.chat}</a>
            <a href="#calculadora">{t.nav.calc}</a>
            <a href="#planos">{t.nav.plans}</a>
            <a href="#faq">{t.nav.faq}</a>
          </div>
          <LangToggle />
          <a
            href={wa(t.nav.whatsMsg)}
            target="_blank" rel="noreferrer"
            className="btn btn-primary"
            style={{ padding: '10px 18px', fontSize: 14 }}>
            <IconWhats /> {t.nav.whats}
          </a>
        </div>
      </div>
    </nav>);
};

// ---------- Hero ----------
const radarRows = (t) => [
  { idx: '001', name: 'Padaria São Jorge ME', amount: 'R$ 1.240,00', flagged: false, badge: t.hero.badges.paid },
  { idx: '002', name: 'Construtora Horizonte Ltda.', amount: 'R$ 4.018,00', flagged: true, badge: t.hero.badges.inpc },
  { idx: '003', name: 'Clínica Vitta Serviços', amount: 'R$ 2.450,00', flagged: true, badge: t.hero.badges.emp },
  { idx: '004', name: 'Mercado Bom Preço', amount: 'R$ 980,00', flagged: false, badge: t.hero.badges.paid },
  { idx: '005', name: 'Studio M Arquitetura', amount: 'R$ 2.140,00', flagged: true, badge: t.hero.badges.irpf },
  { idx: '006', name: 'Transportes Aurora S.A.', amount: 'R$ 4.500,00', flagged: false, badge: t.hero.badges.sent },
  { idx: '007', name: 'Restaurante Pátio 22', amount: 'R$ 757,00', flagged: false, badge: t.hero.badges.wait }];

const RadarCard = () => {
  const { t } = useLangCtx();
  return (
    <div className="radar-card reveal delay-2">
      <div className="radar-head">
        <span>{t.hero.radarHead}</span>
        <span className="live">{t.hero.radarLive}</span>
      </div>
      <div className="radar-list">
        {radarRows(t).map((r, i) =>
          <div key={i} className={"radar-row" + (r.flagged ? " flagged" : "")}>
            <span className="idx">#{r.idx}</span>
            <span className="name">{r.name}</span>
            <span className="amount">{r.amount}</span>
            <span className="badge">{r.badge}</span>
          </div>
        )}
      </div>
      <div className="radar-summary">
        <div><div className="label">{t.hero.radarSummary}</div></div>
        <div className="value">+R$ 3.245<span style={{ fontSize: 18, opacity: 0.6 }}>,00</span></div>
      </div>
    </div>);
};

const Hero = () => {
  const { t } = useLangCtx();
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section className="hero" ref={ref} id="hero" data-screen-label="Hero">
      <div className="shell hero-grid">
        <div>
          <div className="eyebrow reveal"><span className="dot-cyan" /> {t.hero.eyebrow}</div>
          <h1 className="reveal delay-1" style={{ marginTop: 24 }}>
            {t.hero.h1a}<br />{t.hero.h1b}<br />
            <span>{t.hero.h1c}<em className="serif-accent">{t.hero.h1serif}</em><span className="ai-dot">.</span></span>
          </h1>
          <p className="lead hero-sub reveal delay-2">{t.hero.sub}</p>
          <div className="hero-cta-row reveal delay-3">
            <a href={wa(t.hero.ctaWhatsMsg)}
              target="_blank" rel="noreferrer" className="btn btn-primary">
              <IconWhats /> {t.hero.ctaWhats}
            </a>
            <a href="#calculadora" className="btn btn-ghost">
              {t.hero.ctaCalc} <IconArrow />
            </a>
          </div>
          <div className="hero-meta reveal delay-4">
            <div><span className="tick"><IconTick /></span> {t.hero.meta1}</div>
            <div><span className="tick"><IconTick /></span> {t.hero.meta2}</div>
          </div>
        </div>
        <RadarCard />
      </div>
    </section>);
};

// ---------- Problem ----------
const Problem = () => {
  const { t } = useLangCtx();
  const p = t.problem;
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section className="problem" id="problema" ref={ref} data-screen-label="O problema">
      <div className="shell">
        <div className="section-head reveal">
          <div className="eyebrow"><span className="dot-cyan" /> {p.eyebrow}</div>
          <h2 style={{ marginTop: 20 }}>{p.h2}<br /></h2>
          <p className="lead" style={{ marginTop: 20 }}>{p.lead}</p>
        </div>

        <div className="split">
          <div className="panel before reveal delay-1">
            <div className="panel-head">
              <div className="panel-title">{p.file}</div>
              <div className="panel-tag">{p.before}</div>
            </div>
            <div className="sheet">
              <div className="sheet-row head">
                <div></div><div>{p.cols[0]}</div><div>{p.cols[1]}</div><div>{p.cols[2]}</div>
              </div>
              <div className="sheet-row"><div>1</div><div>Construtora Horizonte</div><div>3.820,00</div><div className="err">?</div></div>
              <div className="sheet-row"><div>2</div><div>Studio M Arquitetura</div><div>1.640,00</div><div className="err">nov/2024</div></div>
              <div className="sheet-row"><div>3</div><div>Padaria São Jorge</div><div>1.240,00</div><div>jan/2026</div></div>
              <div className="sheet-row"><div>4</div><div>Restaurante Pátio 22</div><div>720,00</div><div className="err">—</div></div>
              <div className="sheet-row"><div>5</div><div className="faded">Mercado Bom Preço</div><div className="faded">980,00</div><div className="faded">jan/2026</div></div>
              <div className="sheet-row"><div>6</div><div className="blank">&nbsp;</div><div className="blank">&nbsp;</div><div className="blank">&nbsp;</div></div>
            </div>
            <div className="sheet-caption">
              <span>{p.cap1}</span>
              <span>{p.cap2}</span>
              <span className="muted">{p.cap3}</span>
            </div>
          </div>

          <div className="panel after reveal delay-2">
            <div className="panel-head">
              <div className="panel-title">{p.panelTitle}</div>
              <div className="panel-tag">{p.after}</div>
            </div>
            <div className="k-stack">
              <div className="k-card">
                <div className="k-left">
                  <div className="k-ico"><IconRadar /></div>
                  <div>
                    <div className="k-title">{p.k1t}</div>
                    <div className="k-sub">{p.k1s}</div>
                  </div>
                </div>
                <div className="k-val">+R$ 318</div>
              </div>
              <div className="k-card">
                <div className="k-left">
                  <div className="k-ico"><IconDoc /></div>
                  <div>
                    <div className="k-title">{p.k2t}</div>
                    <div className="k-sub">{p.k2s}</div>
                  </div>
                </div>
                <div className="k-val">+R$ 1.240</div>
              </div>
              <div className="k-card">
                <div className="k-left">
                  <div className="k-ico"><IconBolt /></div>
                  <div>
                    <div className="k-title">{p.k3t}</div>
                    <div className="k-sub">{p.k3s}</div>
                  </div>
                </div>
                <div className="k-val">+R$ 86</div>
              </div>
              <div className="k-card" style={{
                background: 'color-mix(in oklab, var(--ciano) calc(14% * var(--accent-boost)), transparent)',
                borderColor: 'color-mix(in oklab, var(--ciano) 40%, transparent)'
              }}>
                <div className="k-left">
                  <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(234,246,255,0.7)' }}>
                    {p.kTotal}
                  </div>
                </div>
                <div className="k-val" style={{ fontSize: 22 }}>R$ 3.245,00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);
};

// ---------- Flow (como funciona) ----------
const FlowIllusExtract = ({ il }) =>
  <div className="flow-illus">
    <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(135deg, transparent 0 12px, rgba(0,212,255,0.05) 12px 13px)' }}></div>
    <div style={{
      position: 'absolute', left: 28, top: '50%', transform: 'translateY(-50%)',
      width: 88, height: 116, borderRadius: 10,
      background: 'linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.02))',
      border: '1px solid rgba(0,212,255,0.3)',
      display: 'flex', flexDirection: 'column', gap: 8, padding: '16px 12px',
      boxShadow: '0 0 30px rgba(0,212,255,0.15)'
    }}>
      <div style={{ height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 2, width: '80%' }}></div>
      <div style={{ height: 3, background: 'rgba(255,255,255,0.12)', borderRadius: 2, width: '60%' }}></div>
      <div style={{ height: 3, background: 'rgba(255,255,255,0.12)', borderRadius: 2, width: '70%' }}></div>
      <div style={{ marginTop: 'auto', fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: 'var(--ciano)', letterSpacing: '0.1em' }}>{il.docTag}</div>
    </div>
    <div style={{
      position: 'absolute', left: 132, top: '50%', transform: 'translateY(-50%)',
      color: 'var(--ciano)', fontSize: 18, opacity: 0.8
    }}>→</div>
    <div style={{
      position: 'absolute', left: 160, right: 24, top: '50%', transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', gap: 7
    }}>
      {il.fields.map((f, i) =>
        <div key={i} style={{
          display: 'flex', gap: 10, alignItems: 'baseline',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          padding: '6px 10px', borderRadius: 6,
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)'
        }}>
          <span style={{ color: 'var(--ciano)', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>{f[0]}</span>
          <span style={{ color: 'rgba(234,246,255,0.75)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f[1]}</span>
        </div>
      )}
    </div>
  </div>;

const FlowIllusERP = ({ il }) =>
  <div className="flow-illus">
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(300px circle at 50% 50%, rgba(0,212,255,0.1), transparent 65%)' }}></div>
    {[
      { x: '8%', y: 22 },
      { x: '60%', y: 16 },
      { x: '12%', y: 158 },
      { x: '58%', y: 164 }].
      map((n, i) =>
        <div key={i} style={{
          position: 'absolute', left: n.x, top: n.y,
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          padding: '6px 11px', borderRadius: 99,
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,212,255,0.25)',
          color: 'rgba(234,246,255,0.8)', whiteSpace: 'nowrap'
        }}>{il.erpNodes[i]}</div>
      )}
    <div style={{
      position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
      padding: '12px 20px', borderRadius: 12,
      background: 'var(--ciano)', color: 'var(--azul-profundo)',
      fontWeight: 700, fontSize: 13, letterSpacing: '-0.01em',
      boxShadow: '0 0 40px rgba(0,212,255,0.4)'
    }}>{il.erpCenter}</div>
    <div style={{
      position: 'absolute', bottom: 12, left: 0, right: 0, textAlign: 'center',
      fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase',
      color: 'rgba(234,246,255,0.45)', fontFamily: 'JetBrains Mono, monospace'
    }}>{il.erpNote}</div>
  </div>;

const FlowIllusInvoice = ({ il }) =>
  <div className="flow-illus">
    <div style={{
      position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
      width: 'min(320px, 84%)',
      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 12, padding: '16px 18px',
      fontFamily: 'JetBrains Mono, monospace', fontSize: 11
    }}>
      <div style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(234,246,255,0.5)', marginBottom: 10 }}>{il.invTitle}</div>
      {il.invLines.map((l, i) =>
        <div key={i} style={{
          display: 'flex', justifyContent: 'space-between', gap: 12,
          padding: '6px 0', borderBottom: '1px dashed rgba(255,255,255,0.08)',
          color: l[2] ? 'var(--ciano)' : 'rgba(234,246,255,0.75)'
        }}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l[0]}</span>
          <span style={{ flexShrink: 0 }}>{l[1]}</span>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, fontWeight: 700, color: '#EAF6FF' }}>
        <span>{il.invTotal}</span><span style={{ color: 'var(--ciano)' }}>R$ 4.482,00</span>
      </div>
    </div>
  </div>;

const FlowIllusPaid = ({ il }) =>
  <div className="flow-illus">
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(360px circle at 50% 100%, rgba(0,212,255,0.14), transparent 60%)' }}></div>
    <div style={{
      position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, width: '100%'
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: '50%',
        background: 'color-mix(in oklab, var(--ciano) 22%, transparent)',
        border: '1px solid var(--ciano)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--ciano)', boxShadow: '0 0 40px rgba(0,212,255,0.3)'
      }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ciano)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{il.paidLabel}</div>
      <div style={{ fontSize: 11, color: 'rgba(234,246,255,0.55)', fontFamily: 'JetBrains Mono, monospace' }}>{il.paidSub}</div>
    </div>
  </div>;

const flowIllusComponents = [FlowIllusExtract, FlowIllusERP, FlowIllusInvoice, FlowIllusPaid];

const Flow = () => {
  const { t } = useLangCtx();
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section className="flow" id="como-funciona" ref={ref} data-screen-label="Como funciona">
      <div className="shell">
        <div className="section-head reveal">
          <div className="eyebrow"><span className="dot-cyan" /> {t.flow.eyebrow}</div>
          <h2 style={{ marginTop: 20 }}>
            {t.flow.h2a}<br />
            <span style={{ color: 'var(--cinza-texto)' }}>{t.flow.h2b}</span>
          </h2>
        </div>
        <div className="flow-list">
          {t.flow.steps.map((s, i) => {
            const Illus = flowIllusComponents[i];
            return (
              <div className={`flow-step reveal delay-${Math.min(i, 2)}`} key={i}>
                <div className="flow-num">{t.flow.step} 0{i + 1}</div>
                <div className="flow-body">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  {s.chips.length > 0 &&
                    <div className="flow-chips">
                      {s.chips.map((c, j) => <span className="flow-chip" key={j}>{c}</span>)}
                    </div>
                  }
                </div>
                <Illus il={t.flow.illus} />
              </div>);
          })}
        </div>
      </div>
    </section>);
};

Object.assign(window, { Nav, Hero, Problem, Flow, wa });
