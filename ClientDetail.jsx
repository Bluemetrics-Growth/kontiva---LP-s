// Kontiva MVP — ClientDetail screen
// Ficha do cliente: dados cadastrais + listagem de contratos.
// Um cliente pode ter múltiplos contratos. O usuário escolhe qual detalhar.

const { useState: useStateCD } = React;

const AlertDotCD = ({ level }) => {
  if (!level || level === "none") return null;
  return <span className={"client-alert-dot tone-" + level} aria-hidden="true" />;
};

const fmtBRLCD = (n) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

// ---------- Contract card ----------
const ContractCard = ({ c, onOpen }) => {
  const status = c.billingStatus || "issued";
  const meta = BILLING_STATUS_META[status] || { label: "—", className: "issued" };
  const isActive = c.status === "active";

  return (
    <button
      type="button"
      className={"ctr-card status-" + (isActive ? "active" : "ended")}
      onClick={() => onOpen && onOpen(c)}
    >
      <div className="ctr-top">
        <div className="ctr-id-col">
          <div className="ctr-label-row">
            <span className={"ctr-dot " + (isActive ? "active" : "ended")} />
            <span className="ctr-label">{c.label}</span>
            {!isActive && <span className="ctr-ended-tag">Encerrado</span>}
          </div>
          <div className="ctr-id mono">{c.id}</div>
        </div>
        {isActive && (
          <span className={"billing-chip tone-" + meta.className}>{meta.label}</span>
        )}
      </div>

      <div className="ctr-value-row">
        <div className="ctr-money">
          <div className="ctr-money-value">{fmtBRLCD(c.monthly)}</div>
          <div className="ctr-money-label">mensal · reajustado</div>
        </div>
        <div className="ctr-index">
          <div className="ctr-index-pill">
            <span className="mono">{c.index}</span>
            <span className="sep">·</span>
            <span>aniversário em {c.anniversary}</span>
          </div>
          {c.lastAdjustedPercent != null && (
            <div className="ctr-index-sub">
              Último reajuste: {c.lastAdjustedPercent.toFixed(2).replace(".", ",")}% em {c.lastAdjustedAt || "—"}
            </div>
          )}
        </div>
      </div>

      <div className="ctr-grid">
        <div className="ctr-grid-item">
          <span className="ctr-g-label">Vigência</span>
          <span className="ctr-g-value">
            {c.startedAt || "—"} → {c.end}
          </span>
        </div>
        <div className="ctr-grid-item">
          <span className="ctr-g-label">Próximo aniversário</span>
          <span className="ctr-g-value">{c.nextAnniversary}</span>
        </div>
        <div className="ctr-grid-item">
          <span className="ctr-g-label">Última cobrança</span>
          <span className="ctr-g-value">
            {c.lastBilling ? `${c.lastBilling.reference} · ${fmtBRLCD(c.lastBilling.amount)}` : "—"}
          </span>
        </div>
        <div className="ctr-grid-item">
          <span className="ctr-g-label">Escopo</span>
          <span className="ctr-g-value">{c.scope || "Serviços contábeis"}</span>
        </div>
      </div>

      {isActive && c.alert && c.alert.level !== "none" && (
        <div className={"ctr-alert tone-" + c.alert.level}>
          <span className="ctr-alert-dot" />
          <span>{c.alert.text}</span>
        </div>
      )}

      <div className="ctr-foot">
        <span className="ctr-foot-hint">
          {isActive ? "Abrir contrato" : "Ver histórico"}
        </span>
        <IChevron dir="right" size={13} />
      </div>
    </button>
  );
};

// ---------- Main ----------
const ClientDetail = ({ user, client, onLogout, onBack, onOpenContract, onNavClick }) => {
  const c = client;
  const [filter, setFilter] = useStateCD("active"); // active | ended | all

  const activeContracts = c.contracts.filter((x) => x.status === "active");
  const endedContracts = c.contracts.filter((x) => x.status !== "active");

  const shown =
    filter === "active" ? activeContracts :
    filter === "ended" ? endedContracts :
    c.contracts;

  const initials = c.name
    .split(/\s+/).filter(Boolean).slice(0, 2)
    .map((w) => w[0]).join("").toUpperCase();

  return (
    <WorkspaceShell
      activeNav="clients"
      counts={{ clients: CLIENTS_SUMMARY.total, contracts: CLIENTS_SUMMARY.activeContracts }}
      onNavClick={onNavClick}
    >
      <div className="ws-topbar">
        <div className="crumb">
          <span onClick={onBack} style={{ cursor: "pointer" }}>Clientes</span>
          <span className="sep">/</span>
          <span style={{ color: "var(--azul-profundo)" }}>{c.name}</span>
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

      <div className="ws-body cd-body">
        <div className="cd-wrap">

          {/* Back link */}
          <button className="cd-back" onClick={onBack} type="button">
            <IChevron dir="left" size={12} /> Voltar para a carteira
          </button>

          {/* Hero / cadastral */}
          <section className="cd-hero">
            <div className="cd-hero-top">
              <div className="cd-avatar" aria-hidden="true">{initials}</div>
              <div className="cd-hero-id">
                <div className="eyebrow">
                  <span className="dot-cyan" /> Cliente · na carteira desde {c.portfolioSince}
                </div>
                <h1>{c.name}</h1>
                <div className="cd-id-meta">
                  <span className="mono">CNPJ {c.cnpj}</span>
                  <span className="sep">·</span>
                  <span>{c.segment}</span>
                </div>
              </div>
              <div className="cd-hero-actions">
                <button className="btn btn-ghost" type="button">
                  <IPen size={12} /> Editar cadastro
                </button>
                <button className="btn btn-primary" type="button">
                  <IPlus size={12} /> Novo contrato
                </button>
              </div>
            </div>

            {/* Cadastral grid */}
            <div className="cd-reg">
              <div className="cd-reg-item">
                <span className="cdr-label">Contato principal</span>
                <span className="cdr-value">{c.contacts.name}</span>
                <span className="cdr-sub mono">{c.contacts.email}</span>
              </div>
              <div className="cd-reg-item">
                <span className="cdr-label">Gerente responsável</span>
                <span className="cdr-value">{c.owner}</span>
                <span className="cdr-sub">Escritório Santos & Contadores</span>
              </div>
              <div className="cd-reg-item">
                <span className="cdr-label">Segmento</span>
                <span className="cdr-value">{c.segment}</span>
              </div>
              <div className="cd-reg-item">
                <span className="cdr-label">Status</span>
                <span className="cdr-value">{BILLING_STATUS_META[c.billingStatus]?.label || "—"}</span>
                <span className="cdr-sub">{c.billingLabel}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="cd-stats">
              <div className="cd-stat">
                <div className="cds-num">{activeContracts.length}</div>
                <div className="cds-label">contratos ativos</div>
              </div>
              {endedContracts.length > 0 && (
                <div className="cd-stat">
                  <div className="cds-num cds-num--muted">{endedContracts.length}</div>
                  <div className="cds-label">encerrados</div>
                </div>
              )}
              <div className="cd-stat">
                <div className="cds-num">{fmtBRLCD(c.monthlyTotal).replace("R$", "").trim()}</div>
                <div className="cds-label">mensal total</div>
              </div>
              {c.alert && c.alert.level !== "none" && (
                <div className="cd-stat cd-stat--alert">
                  <div className={"cds-num cds-num--" + c.alert.level}>
                    <AlertDotCD level={c.alert.level} />
                    {CLIENT_ALERT_META[c.alert.level]?.label || "Alerta"}
                  </div>
                  <div className="cds-label">{c.alert.text}</div>
                </div>
              )}
            </div>
          </section>

          {/* Contracts section */}
          <section className="cd-section">
            <div className="cd-section-head">
              <div>
                <h2>Contratos</h2>
                <p>Cada contrato tem valor, índice e aniversário próprios. Clique para auditar ou calcular a cobrança.</p>
              </div>
              <div className="cd-filters" role="tablist">
                <button
                  className={"cl-filter" + (filter === "active" ? " active" : "")}
                  onClick={() => setFilter("active")}
                >
                  Ativos <span className="cf-count">{activeContracts.length}</span>
                </button>
                {endedContracts.length > 0 && (
                  <button
                    className={"cl-filter" + (filter === "ended" ? " active" : "")}
                    onClick={() => setFilter("ended")}
                  >
                    Encerrados <span className="cf-count">{endedContracts.length}</span>
                  </button>
                )}
                <button
                  className={"cl-filter" + (filter === "all" ? " active" : "")}
                  onClick={() => setFilter("all")}
                >
                  Todos <span className="cf-count">{c.contracts.length}</span>
                </button>
              </div>
            </div>

            <div className="ctr-grid-list">
              {shown.length === 0 && (
                <div className="cl-empty">Nenhum contrato neste filtro.</div>
              )}
              {shown.map((ct) => (
                <ContractCard key={ct.id} c={ct} onOpen={onOpenContract} />
              ))}
            </div>
          </section>

        </div>
      </div>
    </WorkspaceShell>
  );
};

Object.assign(window, { ClientDetail });
