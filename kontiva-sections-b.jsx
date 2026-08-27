// Kontiva v2 — seções B: Chat+MCP, Resultados, Calculadora, Planos
// (hooks useState/useEffect/useRef vêm de kontiva-base.jsx — escopo global compartilhado)

// ---------- Chat + MCP ----------
const ChatSection = () => {
  const { t } = useLangCtx();
  const c = t.chat;
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section className="chat-section" id="chat" ref={ref} data-screen-label="Chat e MCP">
      <div className="shell chat-grid">
        <div>
          <div className="eyebrow reveal"><span className="dot-cyan" /> {c.eyebrow}</div>
          <h2 className="reveal delay-1" style={{ marginTop: 20 }}>
            {c.h2a}<br />{c.h2b}
          </h2>
          <p className="lead reveal delay-2" style={{ marginTop: 24, maxWidth: 480 }}>{c.lead}</p>
          <div className="mcp-card reveal delay-3">
            <div className="k-ico"><IconPlug /></div>
            <div>
              <div className="t">{c.mcpT}</div>
              <div className="s">{c.mcpS}</div>
            </div>
          </div>
        </div>
        <div className="chat-window reveal delay-2">
          <div className="chat-head">
            <span>{c.head}</span>
            <span style={{ color: 'var(--ciano)' }}>{c.status}</span>
          </div>
          <div className="bubble user">{c.u1}</div>
          <div className="bubble bot"><b>{c.b1a}</b>{c.b1b}</div>
          <div className="bubble user">{c.u2}</div>
          <div className="bubble bot">{c.b2a}<b>{c.b2b}</b>{c.b2c}</div>
          <div className="bubble user">{c.u3}</div>
          <div className="bubble bot">{c.b3a}<b>{c.b3b}</b>{c.b3c}<b>{c.b3d}</b>{c.b3e}</div>
        </div>
      </div>
    </section>);
};

// ---------- Agentes de IA ----------
const Agents = () => {
  const { t } = useLangCtx();
  const a = t.agents;
  const icons = [<IconRadar />, <IconTick />, <IconDoc />];
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section className="agents" id="agentes" ref={ref} data-screen-label="Agentes de IA">
      <div className="shell agents-grid">
        <div>
          <div className="eyebrow reveal"><span className="dot-cyan" /> {a.eyebrow}</div>
          <h2 className="reveal delay-1" style={{ marginTop: 20 }}>
            {a.h2a}<br />{a.h2b}
          </h2>
          <p className="lead reveal delay-2" style={{ marginTop: 24, maxWidth: 500 }}>{a.lead}</p>
          <div className="agent-points reveal delay-3">
            {a.items.map((it, i) =>
              <div className="agent-point" key={i}>
                <div className="k-ico-light">{icons[i]}</div>
                <div>
                  <div className="t">{it.t}</div>
                  <div className="s">{it.s}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="agent-feed reveal delay-2">
          <div className="feed-head">
            <span>{a.feedHead}</span>
            <span className="live">{a.feedLive}</span>
          </div>
          {a.notes.map((n, i) =>
            <div className="agent-note" key={i}>
              <div className="row1">
                <span className="who">{n.who}</span>
                <span className="ch">{n.ch}</span>
              </div>
              <div className="body">{n.body}</div>
              {(n.a1 || n.a2) &&
                <div className="actions">
                  {n.a1 && <span className="a1">{n.a1}</span>}
                  {n.a2 && <span className="a2">{n.a2}</span>}
                </div>
              }
            </div>
          )}
        </div>
      </div>
    </section>);
};

// ---------- Resultados ----------
const Results = () => {
  const { t } = useLangCtx();
  const resIcons = [<IconClock />, <IconCoins />, <IconShield />];
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section className="results" id="resultados" ref={ref} data-screen-label="Resultados">
      <div className="shell">
        <div className="section-head reveal">
          <div className="eyebrow"><span className="dot-cyan" /> {t.results.eyebrow}</div>
          <h2 style={{ marginTop: 20 }}>{t.results.h2}</h2>
        </div>
        <div className="res-grid">
          {t.results.items.map((r, i) =>
            <div className={`res-item reveal delay-${i + 1}`} key={i}>
              <div className="res-ico">{resIcons[i]}</div>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </div>
          )}
        </div>
      </div>
    </section>);
};

// ---------- Calculadora ----------
const Calculator = () => {
  const { t, lang } = useLangCtx();
  const c = t.calc;
  const [clientes, setClientes] = useState(180);
  const [ticket, setTicket] = useState(850);
  const perc = 2; // fixo — piso conservador
  const HORAS_POR_CLIENTE = 1.5; // h/mês de trabalho manual por cliente
  const CUSTO_HORA = 40; // R$/h de analista contábil
  const ref = useRef(null);
  useReveal(ref);
  const perdaMes = Math.round(clientes * ticket * (perc / 100));
  const perdaAno = perdaMes * 12;
  const economiaMes = Math.round(clientes * HORAS_POR_CLIENTE * CUSTO_HORA);
  const fill = (val, min, max) => `${((val - min) / (max - min) * 100).toFixed(1)}%`;

  return (
    <section className="calc" id="calculadora" ref={ref} data-screen-label="Calculadora">
      <div className="shell calc-wrap">
        <div>
          <div className="eyebrow reveal"><span className="dot-cyan" /> {c.eyebrow}</div>
          <h2 className="reveal delay-1" style={{ marginTop: 20 }}>
            {c.h2a}<br />{c.h2b}
          </h2>
          <p className="lead reveal delay-2" style={{ marginTop: 24, maxWidth: 480 }}>{c.lead}</p>
          <p className="reveal delay-3" style={{ marginTop: 28, fontSize: 13, color: 'var(--cinza-texto)', maxWidth: 460 }}>{c.note}</p>
        </div>
        <div className="calc-card reveal delay-2">
          <div className="calc-field">
            <label>{c.f1} <span className="v">{clientes}</span></label>
            <input type="range" min="100" max="600" step="10" value={clientes}
              onChange={(e) => setClientes(+e.target.value)} style={{ '--fill': fill(clientes, 100, 600) }} />
          </div>
          <div className="calc-field">
            <label>{c.f2} <span className="v">{brl(ticket)}</span></label>
            <input type="range" min="300" max="3000" step="50" value={ticket}
              onChange={(e) => setTicket(+e.target.value)} style={{ '--fill': fill(ticket, 300, 3000) }} />
          </div>
          <div className="calc-field calc-fixed">
            <label>{c.f3} <span className="v">{perc}%</span></label>
            <p className="calc-fixed-note">{c.f3note}</p>
          </div>
          <div className="calc-result">
            <div className="l1">{c.r1}</div>
            <div className="l2">{brl(perdaMes)}</div>
            <div className="l3">≈ {brl(perdaAno)} {c.r3}</div>
            <div className="l4"><span className="plus">+ {brl(economiaMes)}</span> {c.r4}</div>
          </div>
        </div>
      </div>
    </section>);
};

// ---------- Planos ----------
const planData = [
  { name: 'Starter', fixo: 99, porCliente: 10, featured: false },
  { name: 'Pro', fixo: 499, porCliente: 8, featured: true },
  { name: 'Max', fixo: 999, porCliente: 6, featured: false }];

const Pricing = () => {
  const { t } = useLangCtx();
  const pr = t.pricing;
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section className="pricing" id="planos" ref={ref} data-screen-label="Planos">
      <div className="shell">
        <div className="section-head reveal">
          <div className="eyebrow"><span className="dot-cyan" /> {pr.eyebrow}</div>
          <h2 style={{ marginTop: 20 }}>
            {pr.h2a}<br />
            <span style={{ color: 'var(--cinza-texto)' }}>{pr.h2b}</span>
          </h2>
        </div>
        <div className="plans">
          {planData.map((p, i) =>
            <div className={`plan reveal delay-${i + 1}` + (p.featured ? ' featured' : '')} key={p.name}>
              {p.featured && <div className="plan-tag">{pr.tag}</div>}
              <div className="plan-name">{p.name}</div>
              <div className="plan-price">
                R$ {p.fixo}<span className="per-month"> {pr.perMonth}</span>
              </div>
              <div className="plan-variable">
                + <b>R$ {p.porCliente}</b> {pr.perClient}
              </div>
              <div className="plan-limit">
                <span className="tick"><IconTick /></span> {pr.limits[i]}
              </div>
              <a
                href={wa(pr.ctaMsg(p.name))}
                target="_blank" rel="noreferrer"
                className={'btn ' + (p.featured ? 'btn-primary' : 'btn-ghost')}>
                {pr.cta} {p.name}
              </a>
            </div>
          )}
        </div>
        <p className="plans-note reveal delay-3">{pr.note}</p>
      </div>
    </section>);
};

Object.assign(window, { ChatSection, Agents, Results, Calculator, Pricing });
