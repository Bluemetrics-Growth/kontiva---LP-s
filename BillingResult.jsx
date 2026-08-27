// Kontiva MVP — BillingResult screen
// Perspectiva: ESCRITÓRIO CONTÁBIL vendo quanto cobrar (ou deveria ter cobrado)
// de um cliente.
//
// Props:
//   scenario: "calc" (definir cobrança) | "audit" (auditar cobrança emitida)
//
// No modo audit há três recortes de leitura — perda, risco e líquido.
// Expostos como abas no topo do resultado para facilitar a demo.

const { useState: useStateBR } = React;

// =====================================================================
// Shared helpers
// =====================================================================
const NumberPlate = ({ value, accent = "ciano" }) => {
  const p = fmtBRLParts(value);
  return (
    <div className="brh-number">
      {p.sign && <span className="brh-sign">{p.sign}</span>}
      <span className="brh-currency">R$</span>
      <span className={"brh-value accent-" + accent}>
        {p.int}<span className="brh-dec">,{p.dec}</span>
      </span>
    </div>
  );
};

const SevDot = ({ sev }) => <span className={"sev-dot sev-" + sev} />;

// =====================================================================
// Finding card — audit mode
// =====================================================================
const FindingCard = ({ f, expanded, onToggle }) => {
  const isUnder = f.direction === "under";
  const isOver = f.direction === "over";
  const Ico = isUnder ? IScope : isOver ? IAlert : ITick;
  return (
    <div className={"finding sev-" + f.severity + (expanded ? " open" : "")}>
      <button type="button" className="finding-head" onClick={onToggle}>
        <div className="fh-ico"><Ico size={15} /></div>
        <div className="fh-main">
          <div className="fh-title">{f.title}</div>
          <div className="fh-meta">
            <span>{f.clause}</span>
            <span className="sep">·</span>
            <span>{f.months.join(", ")}</span>
          </div>
        </div>
        <div className="fh-amount">
          <span className={"fh-amount-label " + (isUnder ? "loss" : "risk")}>
            {isUnder ? "deixou de cobrar" : "cobrou a mais"}
          </span>
          <span className={"fh-amount-value " + (isUnder ? "loss" : "risk")}>
            {isUnder ? "− " : "+ "}{fmtBRL(f.amount)}
          </span>
        </div>
        <div className="fh-chev"><IChevron dir={expanded ? "down" : "right"} size={12} /></div>
      </button>

      {expanded && (
        <div className="finding-body">
          <p className="fb-summary">{f.summary}</p>

          <div className="fb-compare">
            <div className="fb-col">
              <div className="fb-label">Deveria ter cobrado</div>
              <div className="fb-value">{f.expected}</div>
            </div>
            <div className="fb-vs">×</div>
            <div className="fb-col">
              <div className="fb-label">Cobrou</div>
              <div className={"fb-value " + (isUnder ? "loss" : "risk")}>{f.charged}</div>
            </div>
          </div>

          {f.action && (
            <div className="fb-action">
              <span className="fba-label">Próximo passo sugerido</span>
              <span className="fba-text">{f.action}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// =====================================================================
// Audit — monthly row (undercharged / overcharged / ok)
// =====================================================================
const MonthRowAudit = ({ m }) => {
  const isUnder = m.status === "undercharged";
  const isOver = m.status === "overcharged";
  return (
    <div className={"month-row status-" + m.status}>
      <div className="mr-head">
        <div>
          <div className="mr-month">{m.month}</div>
          <div className="mr-period">{m.period}</div>
        </div>
        <div className="mr-status">
          <span className={"status-pill " + (isUnder ? "under" : isOver ? "over" : "conforme")}>
            {isUnder ? <IScope size={10} /> : isOver ? <IAlert size={11} /> : <ITick size={9} />}
            {isUnder ? "Cobrou a menos" : isOver ? "Cobrou a mais" : "Conforme"}
          </span>
        </div>
      </div>
      <div className="mr-items">
        {m.items.map((it, i) => (
          <div key={i} className={"mr-item status-" + it.status}>
            <div className="mri-label">{it.label}</div>
            <div className="mri-expected">{fmtBRL(it.expected)}</div>
            <div className="mri-arrow">→</div>
            <div className={"mri-charged " + (it.status === "undercharged" ? "loss" : it.status === "overcharged" ? "risk" : "")}>
              {fmtBRL(it.charged)}
            </div>
          </div>
        ))}
      </div>
      {m.delta !== 0 && (
        <div className={"mr-foot " + (isUnder ? "loss" : "risk")}>
          <span>Diferença no mês</span>
          <span className={"mr-diff " + (isUnder ? "loss" : "risk")}>
            {isUnder ? "− " : "+ "}{fmtBRL(Math.abs(m.delta))}
          </span>
        </div>
      )}
    </div>
  );
};

// =====================================================================
// Calc — line item
// =====================================================================
const CalcLineItem = ({ it }) => (
  <div className={"calc-line kind-" + it.kind}>
    <div className="cl-main">
      <div className="cl-label">{it.label}</div>
      <div className="cl-meta">
        <span>{it.clause}</span>
        <span className="sep">·</span>
        <span>{it.meta}</span>
      </div>
      <div className="cl-detail">{it.detail}</div>
    </div>
    <div className="cl-amount">{fmtBRL(it.expected)}</div>
  </div>
);

// =====================================================================
// Main component
// =====================================================================
const BillingResult = ({ user, clientName, scenario = "calc", onLogout, onBack, onNavClick }) => {
  const [expanded, setExpanded] = useStateBR(() => new Set(["miss_reajuste"]));
  const toggle = (id) => {
    setExpanded((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  // Audit view has three readings to surface
  const [auditView, setAuditView] = useStateBR("net"); // net | loss | risk

  return (
        <WorkspaceShell activeNav="clients" counts={{ clients: 1, contracts: 1 }} onNavClick={onNavClick}>
      <div className="ws-topbar">
        <div className="crumb">
          <span>Clientes</span>
          <span className="sep">/</span>
          <span style={{ color: "var(--azul-profundo)" }}>{clientName}</span>
          <span className="sep">/</span>
          <span style={{ color: "var(--cinza-escuro)" }}>
            {scenario === "calc" ? "Cobrança do mês" : "Auditoria de cobrança"}
          </span>
        </div>
        <div className="right-actions">
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            fontSize: 13, color: "var(--cinza-escuro)", fontWeight: 500
          }}>
            <span className="avatar" style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "var(--azul-profundo)", color: "#EAF6FF",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700
            }}>MG</span>
            <span>{user}</span>
          </div>
          <button onClick={onLogout} className="btn btn-ghost"
            style={{ padding: "8px 14px", fontSize: 13 }}>Sair</button>
        </div>
      </div>

      <div className="ws-body br-body">
        <div className="br-wrap">

          {scenario === "calc"
            ? <CalcView clientName={clientName} onBack={onBack} />
            : (
              <AuditView
                clientName={clientName}
                view={auditView}
                setView={setAuditView}
                expanded={expanded}
                toggle={toggle}
                onBack={onBack}
              />
            )
          }
        </div>
      </div>
    </WorkspaceShell>
  );
};

// =====================================================================
// CENÁRIO A — calcular cobrança do mês
// =====================================================================
const CalcView = ({ clientName, onBack }) => {
  return (
    <>
      <div className="br-hero calc-hero">
        <div className="brh-eye">
          <span className="dot-cyan" /> Cobrança calculada · {CALC_SUMMARY.reference}
        </div>
        <div className="brh-headline">
          Você deve cobrar de {clientName}
        </div>
        <NumberPlate value={CALC_SUMMARY.total} accent="ciano" />
        <div className="brh-sub">
          Mensalidade reajustada + <b>{CALC_SUMMARY.itemsCount - 1} serviços extras autorizados</b>.
          Vencimento sugerido: <b>{CALC_SUMMARY.dueDate}</b>.
        </div>

        <div className="brh-stats brh-stats--calc">
          <div className="brh-stat">
            <div className="brhs-num">{fmtBRL(CALC_SUMMARY.base).replace("R$", "").trim()}</div>
            <div className="brhs-label">Mensalidade c/ IPCA</div>
          </div>
          <div className="brh-stat">
            <div className="brhs-num brhs-ok">+ {fmtBRL(CALC_SUMMARY.extras).replace("R$", "").trim()}</div>
            <div className="brhs-label">Extras autorizados</div>
          </div>
          <div className="brh-stat">
            <div className="brhs-num">{CALC_SUMMARY.itemsCount}</div>
            <div className="brhs-label">Lançamentos no mês</div>
          </div>
          <div className="brh-stat">
            <div className="brhs-num brhs-diff">
              {(() => {
                const prev = CALC_SUMMARY.previousMonth.total;
                const curr = CALC_SUMMARY.total;
                const diff = curr - prev;
                return (diff >= 0 ? "+ " : "− ") + fmtBRL(Math.abs(diff)).replace("R$", "").trim();
              })()}
            </div>
            <div className="brhs-label">vs {CALC_SUMMARY.previousMonth.reference}</div>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <section className="br-section">
        <div className="br-section-head">
          <h2>Memória de cálculo</h2>
          <p>
            Cada linha com a cláusula que embasa a cobrança — anexe ao boleto
            para o cliente ver exatamente de onde vem o valor.
          </p>
        </div>

        <div className="calc-lines">
          {CALC_LINE_ITEMS.map((it) => <CalcLineItem key={it.id} it={it} />)}
          <div className="calc-total">
            <div className="ct-label">Total a cobrar</div>
            <div className="ct-value">{fmtBRL(CALC_SUMMARY.total)}</div>
          </div>
        </div>
      </section>

      {/* Pre-flight notes */}
      <section className="br-section">
        <div className="br-section-head">
          <h2>Antes de emitir</h2>
          <p>Pequenas checagens que evitam desgaste com o cliente depois.</p>
        </div>

        <div className="notes">
          {CALC_NOTES.map((n) => (
            <div key={n.id} className={"note type-" + n.type}>
              <div className="note-ico">
                {n.type === "check" ? <ITick size={12} /> : <IScope size={12} />}
              </div>
              <div className="note-body">
                <div className="note-title">{n.title}</div>
                <div className="note-text">{n.body}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="br-cta">
        <div className="brc-text">
          <div className="brc-title">
            Pronto pra <span className="serif-accent">emitir</span>?
          </div>
          <div className="brc-sub">
            Geramos o boleto com memória de cálculo anexa e mandamos pro e-mail do cliente —
            ou você exporta como PDF para o seu ERP.
          </div>
        </div>
        <div className="brc-actions">
          <button className="btn btn-ghost" onClick={onBack}>Enviar outro relatório</button>
          <button className="btn btn-secondary">
            <IDownload size={13} /> Exportar memória
          </button>
          <button className="btn btn-primary">
            <IShare size={13} /> Emitir boleto
          </button>
        </div>
      </div>
    </>
  );
};

// =====================================================================
// CENÁRIO B — auditar cobranças já emitidas
// =====================================================================
const AuditView = ({ clientName, view, setView, expanded, toggle, onBack }) => {
  const s = AUDIT_SUMMARY;

  // Headline values per view
  const VIEWS = {
    loss: {
      eye: "Receita perdida · últimos 3 meses",
      headline: <>Você <span className="serif-accent">deixou de cobrar</span></>,
      value: s.undercharged,
      accent: "loss",
      sub: <>Serviços prestados para <b>{clientName}</b> que ficaram fora do boleto. Se o padrão continuar, são <b>{fmtBRL(s.annualLossProjection)}</b> por ano parando de entrar no caixa.</>,
    },
    risk: {
      eye: "Cobrança acima do contrato",
      headline: <>Você <span className="serif-accent">cobrou a mais</span></>,
      value: s.overcharged,
      accent: "risk",
      sub: <>Cobranças de <b>{clientName}</b> acima do que o contrato prevê. Revisar antes que o cliente peça — preserva a relação e a imagem do escritório.</>,
    },
    net: {
      eye: "Balanço · últimos 3 meses",
      headline: s.netDelta < 0
        ? <>No líquido, você <span className="serif-accent">ficou devendo</span></>
        : <>No líquido, você <span className="serif-accent">cobrou a mais</span></>,
      value: Math.abs(s.netDelta),
      accent: s.netDelta < 0 ? "loss" : "risk",
      sub: <>Somando subfaturamentos e superfaturamentos, o saldo da cobrança de <b>{clientName}</b> nos últimos {s.monthsAnalyzed} meses ficou {s.netDelta < 0 ? "negativo" : "positivo"} para o escritório.</>,
    },
  };

  const v = VIEWS[view];

  return (
    <>
      <div className={"br-hero audit-hero accent-" + v.accent}>
        <div className="brh-eye">
          <span className="dot-cyan" /> {v.eye}
        </div>

        {/* View tabs */}
        <div className="audit-tabs" role="tablist">
          <button
            className={"at-tab " + (view === "loss" ? "active" : "")}
            onClick={() => setView("loss")}
            role="tab"
          >
            <span className="at-dot at-loss" />
            <span className="at-label">Deixou de cobrar</span>
            <span className="at-val">{fmtBRL(s.undercharged)}</span>
          </button>
          <button
            className={"at-tab " + (view === "risk" ? "active" : "")}
            onClick={() => setView("risk")}
            role="tab"
          >
            <span className="at-dot at-risk" />
            <span className="at-label">Cobrou a mais</span>
            <span className="at-val">{fmtBRL(s.overcharged)}</span>
          </button>
          <button
            className={"at-tab " + (view === "net" ? "active" : "")}
            onClick={() => setView("net")}
            role="tab"
          >
            <span className="at-dot at-net" />
            <span className="at-label">Saldo líquido</span>
            <span className="at-val">{s.netDelta < 0 ? "− " : "+ "}{fmtBRL(Math.abs(s.netDelta))}</span>
          </button>
        </div>

        <div className="brh-headline">
          {v.headline}
        </div>
        <NumberPlate value={v.value} accent={v.accent} />
        <div className="brh-sub">{v.sub}</div>

        <div className="brh-stats">
          <div className="brh-stat">
            <div className="brhs-num">{s.monthsWithIssues}<span>/{s.monthsAnalyzed}</span></div>
            <div className="brhs-label">meses com divergência</div>
          </div>
          <div className="brh-stat">
            <div className="brhs-num">{s.itemsFlagged}</div>
            <div className="brhs-label">lançamentos sinalizados</div>
          </div>
          <div className="brh-stat">
            <div className="brhs-num brhs-ok">{fmtBRL(s.totalExpected).replace("R$", "").trim()}</div>
            <div className="brhs-label">deveria ter cobrado</div>
          </div>
          <div className="brh-stat">
            <div className="brhs-num brhs-diff">{fmtBRL(s.totalCharged).replace("R$", "").trim()}</div>
            <div className="brhs-label">efetivamente cobrou</div>
          </div>
        </div>
      </div>

      {/* Narrative banner — shifts tone based on view */}
      {view === "risk" && (
        <div className="narrative-banner tone-warm">
          <div className="nb-ico"><IScope size={14} /></div>
          <div className="nb-text">
            <b>Este é o tipo de achado que protege o escritório.</b> Mostrar pro cliente
            que você <i>mesmo</i> identificou e já ajustou reforça a confiança e evita
            a conversa desconfortável de contestação.
          </div>
        </div>
      )}
      {view === "loss" && (
        <div className="narrative-banner tone-cool">
          <div className="nb-ico"><IBolt size={14} /></div>
          <div className="nb-text">
            <b>Toda hora prestada sem cobrança é prejuízo silencioso.</b> A Kontiva
            reconstitui o que foi feito e dá o caminho pra recuperar — fatura
            complementar ou ajuste no próximo mês.
          </div>
        </div>
      )}

      {/* Findings */}
      <section className="br-section">
        <div className="br-section-head">
          <h2>O que encontramos</h2>
          <p>Cada item foi cruzado com a cláusula correspondente do contrato e com o apontamento do time.</p>
        </div>

        <div className="findings">
          {AUDIT_FINDINGS.map((f) => (
            <FindingCard
              key={f.id}
              f={f}
              expanded={expanded.has(f.id)}
              onToggle={() => toggle(f.id)}
            />
          ))}
        </div>
      </section>

      {/* Monthly breakdown */}
      <section className="br-section">
        <div className="br-section-head">
          <h2>Mês a mês</h2>
          <p>Valor que deveria ter sido cobrado × valor que saiu no boleto.</p>
        </div>

        <div className="months">
          {AUDIT_MONTHS.map((m) => <MonthRowAudit key={m.month} m={m} />)}
        </div>
      </section>

      {/* Actions */}
      <div className="br-cta">
        <div className="brc-text">
          <div className="brc-title">
            Pronto pra <span className="serif-accent">regularizar</span>?
          </div>
          <div className="brc-sub">
            Geramos um plano de ação: fatura complementar para o que faltou, nota de
            crédito para o que foi cobrado além — tudo com o embasamento contratual.
          </div>
        </div>
        <div className="brc-actions">
          <button className="btn btn-ghost" onClick={onBack}>Auditar outro cliente</button>
          <button className="btn btn-secondary">
            <IShare size={13} /> Compartilhar com sócio
          </button>
          <button className="btn btn-primary">
            <IDownload size={13} /> Exportar plano de ação
          </button>
        </div>
      </div>
    </>
  );
};

Object.assign(window, { BillingResult });
