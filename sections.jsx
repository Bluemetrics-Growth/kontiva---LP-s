/* Problem (Antes/Depois) + Calculator + How it works + Final CTA + Footer */

const { useState: useState2, useEffect: useEffect2, useRef: useRef2, useMemo: useMemo2 } = React;

// ---------- Simple in-view hook to reveal children ----------
function useReveal(rootRef) {
  useEffect2(() => {
    if (!rootRef.current) return;
    const items = rootRef.current.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ---------- Problem section (Antes/Depois) ----------
const Problem = () => {
  const ref = useRef2(null);
  useReveal(ref);

  return (
    <section className="problem" id="problema" ref={ref}>
      <div className="shell">
        <div className="section-head reveal">
          <div className="eyebrow"><span className="dot-cyan" /> O ponto cego</div>
          <h2 style={{ marginTop: 20 }}>
            Planilha não é sistema.<br/>
            <span style={{ color: 'var(--cinza-texto)' }}>É fé.</span>
          </h2>
          <p className="lead" style={{ marginTop: 20 }}>
            O controle de contratos vive numa aba de Excel. Reajuste de janeiro, serviço extra cobrado em
            março, cliente que trocou de regime — quem lembra de tudo? A Kontiva lembra.
          </p>
        </div>

        <div className="split">
          <div className="panel before reveal delay-1">
            <div className="panel-head">
              <div className="panel-title">contratos_2026.xlsx</div>
              <div className="panel-tag">Antes</div>
            </div>

            <div className="sheet">
              <div className="sheet-row head">
                <div></div><div>Cliente</div><div>Mensalidade</div><div>Último reajuste</div>
              </div>
              <div className="sheet-row">
                <div>1</div><div>Construtora Horizonte</div><div>3.820,00</div><div className="err">?</div>
              </div>
              <div className="sheet-row">
                <div>2</div><div>Studio M Arquitetura</div><div>1.640,00</div><div className="err">nov/2024</div>
              </div>
              <div className="sheet-row">
                <div>3</div><div>Padaria São Jorge</div><div>1.240,00</div><div>jan/2026</div>
              </div>
              <div className="sheet-row">
                <div>4</div><div>Restaurante Pátio 22</div><div>720,00</div><div className="err">—</div>
              </div>
              <div className="sheet-row">
                <div>5</div><div className="faded">Mercado Bom Preço</div><div className="faded">980,00</div><div className="faded">jan/2026</div>
              </div>
              <div className="sheet-row">
                <div>6</div><div className="blank">&nbsp;</div><div className="blank">&nbsp;</div><div className="blank">&nbsp;</div>
              </div>
            </div>

            <div className="sheet-caption">
              <span>3 campos em branco</span>
              <span>2 reajustes vencidos</span>
              <span className="muted">última edição: há 47 dias</span>
            </div>
          </div>

          <div className="panel after reveal delay-2">
            <div className="panel-head">
              <div className="panel-title">Kontiva · Painel de contratos</div>
              <div className="panel-tag">Depois</div>
            </div>

            <div className="k-stack">
              <div className="k-card">
                <div className="k-left">
                  <div className="k-ico"><IconRadar /></div>
                  <div>
                    <div className="k-title">Construtora Horizonte</div>
                    <div className="k-sub">Reajuste IPCA pendente desde jan/26</div>
                  </div>
                </div>
                <div className="k-val">+R$ 318</div>
              </div>

              <div className="k-card">
                <div className="k-left">
                  <div className="k-ico"><IconDoc /></div>
                  <div>
                    <div className="k-title">Studio M Arquitetura</div>
                    <div className="k-sub">Serviço extra de dez/25 não faturado</div>
                  </div>
                </div>
                <div className="k-val">+R$ 1.240</div>
              </div>

              <div className="k-card">
                <div className="k-left">
                  <div className="k-ico"><IconBolt /></div>
                  <div>
                    <div className="k-title">Restaurante Pátio 22</div>
                    <div className="k-sub">Índice de correção desatualizado</div>
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
                    Total identificado · março
                  </div>
                </div>
                <div className="k-val" style={{ fontSize: 22 }}>R$ 6.180,00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- Calculator ----------
const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

const Calculator = () => {
  const [clientes, setClientes] = useState2(180);
  const [ticket, setTicket]     = useState2(850);
  const [perc, setPerc]         = useState2(6);
  const ref = useRef2(null);
  useReveal(ref);

  const perdaMes = Math.round((clientes * ticket * (perc/100)));
  const perdaAno = perdaMes * 12;

  // Slider fill
  const fill = (val, min, max) => `${((val - min) / (max - min) * 100).toFixed(1)}%`;

  return (
    <section className="calc" id="calculadora" ref={ref}>
      <div className="shell calc-wrap">
        <div>
          <div className="eyebrow reveal"><span className="dot-cyan" /> Calculadora</div>
          <h2 className="reveal delay-1" style={{ marginTop: 20 }}>
            Quanto seu escritório<br/>está deixando na mesa?
          </h2>
          <p className="lead reveal delay-2" style={{ marginTop: 24, maxWidth: 480 }}>
            Ajuste os valores do seu escritório. Não é chute — é a média que encontramos
            em carteiras parecidas com a sua.
          </p>
          <p className="reveal delay-3" style={{ marginTop: 28, fontSize: 13, color: 'var(--cinza-texto)', maxWidth: 460 }}>
            Estimativa baseada em reajustes não aplicados, serviços extras não faturados e
            contratos vencidos. Valor real costuma ser maior.
          </p>
        </div>

        <div className="calc-card reveal delay-2">
          <div className="calc-field">
            <label>Clientes ativos na carteira <span className="v">{clientes}</span></label>
            <input
              type="range" min="100" max="600" step="10" value={clientes}
              onChange={(e) => setClientes(+e.target.value)}
              style={{ '--fill': fill(clientes, 100, 600) }}
            />
          </div>
          <div className="calc-field">
            <label>Ticket médio mensal <span className="v">{brl(ticket)}</span></label>
            <input
              type="range" min="300" max="3000" step="50" value={ticket}
              onChange={(e) => setTicket(+e.target.value)}
              style={{ '--fill': fill(ticket, 300, 3000) }}
            />
          </div>
          <div className="calc-field">
            <label>Receita potencialmente perdida <span className="v">{perc}%</span></label>
            <input
              type="range" min="2" max="15" step="0.5" value={perc}
              onChange={(e) => setPerc(+e.target.value)}
              style={{ '--fill': fill(perc, 2, 15) }}
            />
          </div>

          <div className="calc-result">
            <div className="l1">Estimativa mensal</div>
            <div className="l2">{brl(perdaMes)}</div>
            <div className="l3">≈ {brl(perdaAno)} por ano</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- How it works ----------
const steps = [
  {
    n: '01',
    title: 'Conecte sua carteira',
    body: 'Integração com seu ERP contábil ou envio dos contratos em PDF. Leva minutos, não semanas.',
    illus: (mockStyle) => <StepIllus variant="connect" mockStyle={mockStyle} />,
  },
  {
    n: '02',
    title: 'A Kontiva varre',
    body: 'Lemos cláusula por cláusula, cruzamos com o que foi cobrado e identificamos onde está o dinheiro parado.',
    illus: (mockStyle) => <StepIllus variant="scan" mockStyle={mockStyle} />,
  },
  {
    n: '03',
    title: 'Você age com precisão',
    body: 'Painel com cada contrato, cada valor, cada ação. Você decide. A Kontiva documenta.',
    illus: (mockStyle) => <StepIllus variant="act" mockStyle={mockStyle} />,
  },
];

const StepIllus = ({ variant, mockStyle }) => {
  if (mockStyle === 'abstract') {
    return (
      <div className="step-illus" style={{ background: 'var(--azul-profundo)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: variant === 'connect'
            ? `repeating-linear-gradient(135deg, transparent 0 10px, color-mix(in oklab, var(--ciano) 12%, transparent) 10px 11px)`
            : variant === 'scan'
            ? `radial-gradient(200px circle at 50% 50%, color-mix(in oklab, var(--ciano) 30%, transparent), transparent 70%)`
            : `linear-gradient(90deg, color-mix(in oklab, var(--ciano) 6%, transparent), color-mix(in oklab, var(--ciano) 24%, transparent))`
        }}/>
        <div style={{
          position: 'absolute', left: 20, top: 20, right: 20, bottom: 20,
          border: '1px dashed rgba(0,212,255,0.25)', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--ciano)', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase'
        }}>
          {variant === 'connect' && 'import.contratos'}
          {variant === 'scan' && 'scan.ativo'}
          {variant === 'act' && 'acao.recomendada'}
        </div>
      </div>
    );
  }

  // realistic mini-mocks
  return (
    <div className="step-illus" style={{ padding: 12, background: 'var(--azul-profundo)' }}>
      {variant === 'connect' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, height: '100%' }}>
          {[1,2,3].map(i => (
            <div key={i} style={{
              height: 22, borderRadius: 6,
              background: 'rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', gap: 8, padding: '0 10px'
            }}>
              <div style={{ width: 14, height: 14, background: 'var(--ciano)', borderRadius: 3, opacity: 0.8 }}/>
              <div style={{ height: 6, flex: 1, background: 'rgba(255,255,255,0.12)', borderRadius: 3 }}/>
              <div style={{ fontSize: 9, color: 'var(--ciano)', fontFamily: 'JetBrains Mono, monospace' }}>PDF</div>
            </div>
          ))}
          <div style={{
            marginTop: 'auto', fontSize: 10, fontFamily: 'JetBrains Mono, monospace',
            color: 'rgba(234,246,255,0.5)', textAlign: 'center'
          }}>212 contratos importados</div>
        </div>
      )}
      {variant === 'scan' && (
        <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{
              height: 8, background: i === 2 ? 'var(--ciano)' : 'rgba(255,255,255,0.1)',
              borderRadius: 3, margin: '8px 0', width: `${70 + i*5}%`
            }}/>
          ))}
          <div style={{
            position: 'absolute', left: 0, right: 0, top: '50%', height: 2,
            background: 'linear-gradient(90deg, transparent, var(--ciano), transparent)',
            animation: 'scan 2.4s ease-in-out infinite'
          }}/>
        </div>
      )}
      {variant === 'act' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%', justifyContent: 'center' }}>
          <div style={{
            background: 'color-mix(in oklab, var(--ciano) 14%, transparent)',
            border: '1px solid color-mix(in oklab, var(--ciano) 40%, transparent)',
            borderRadius: 8, padding: '8px 10px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div style={{ fontSize: 11, color: '#EAF6FF' }}>Aplicar reajuste</div>
            <div style={{ fontSize: 11, color: 'var(--ciano)', fontFamily: 'JetBrains Mono, monospace' }}>+R$ 318</div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8, padding: '8px 10px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div style={{ fontSize: 11, color: 'rgba(234,246,255,0.7)' }}>Faturar extra</div>
            <div style={{ fontSize: 11, color: 'rgba(234,246,255,0.7)', fontFamily: 'JetBrains Mono, monospace' }}>+R$ 1.240</div>
          </div>
        </div>
      )}
    </div>
  );
};

const HowItWorks = ({ mockStyle }) => {
  const ref = useRef2(null);
  useReveal(ref);
  return (
    <section className="how" id="como-funciona" ref={ref}>
      <div className="shell">
        <div className="section-head reveal">
          <div className="eyebrow"><span className="dot-cyan" /> Como funciona</div>
          <h2 style={{ marginTop: 20 }}>
            Três passos.<br/>
            <span style={{ color: 'var(--cinza-texto)' }}>Primeiro resultado em 72h.</span>
          </h2>
        </div>
        <div className="steps">
          {steps.map((s, i) => (
            <div className={`step reveal delay-${i+1}`} key={s.n}>
              <div className="step-num">PASSO {s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              {s.illus(mockStyle)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- Final CTA ----------
const FinalCTA = () => {
  const ref = useRef2(null);
  useReveal(ref);
  return (
    <section className="final-cta" ref={ref}>
      <div className="shell">
        <div className="eyebrow reveal" style={{ color: 'rgba(234,246,255,0.5)' }}>
          <span className="dot-cyan" /> Pronto?
        </div>
        <h2 className="reveal delay-1" style={{ marginTop: 20, fontSize: 'clamp(40px, 5.4vw, 76px)' }}>
          Descubra, em 72h,<br/>
          quanto sua carteira<br/>
          <span className="hl">deixou de cobrar<span style={{ color: 'var(--branco)' }}>.</span></span>
        </h2>
        <p className="sub reveal delay-2">
          Diagnóstico da sua carteira pela nossa equipe. Sem compromisso, sem apresentação
          de 40 slides. Mandamos o resultado no seu WhatsApp.
        </p>
        <div className="reveal delay-3" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <a
            href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20o%20diagn%C3%B3stico%20da%20minha%20carteira"
            target="_blank" rel="noreferrer"
            className="btn btn-primary"
            style={{ padding: '18px 28px', fontSize: 16 }}
          >
            <IconWhats /> Falar no WhatsApp
          </a>
          <a href="#hero" className="btn btn-ghost" style={{
            borderColor: 'rgba(255,255,255,0.2)', color: '#EAF6FF', padding: '18px 26px'
          }}>
            Voltar ao topo
          </a>
        </div>
      </div>
    </section>
  );
};

// ---------- Footer ----------
const Footer = () => (
  <footer>
    <div className="shell">
      <Brand />
      <div>© 2026 Kontiva.ai · Gestão contábil sem ponto cego.</div>
    </div>
  </footer>
);

Object.assign(window, { Problem, Calculator, HowItWorks, FinalCTA, Footer });
