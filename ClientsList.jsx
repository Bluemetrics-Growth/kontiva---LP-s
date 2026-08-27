// Kontiva MVP — ClientsList screen
// Carteira de clientes do escritório contábil. Lista todos os clientes com
// visão de contratos ativos, status da cobrança do mês e alertas.

const { useState: useStateCL } = React;

const fmtBRLList = (n) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

const AlertDot = ({ level }) => {
  if (!level || level === "none") return null;
  return <span className={"client-alert-dot tone-" + level} aria-hidden="true" />;
};

const BillingChip = ({ status }) => {
  const meta = BILLING_STATUS_META[status];
  if (!meta) return null;
  return <span className={"billing-chip tone-" + meta.className}>{meta.label}</span>;
};

// ---------- Contract pill ----------
const ContractPill = ({ c }) => (
  <div className="contract-pill" title={`${c.label} · ${fmtBRLList(c.monthly)}/mês`}>
    <span className="cp-label">{c.label}</span>
    <span className="cp-sep">·</span>
    <span className="cp-value">{fmtBRLList(c.monthly)}</span>
  </div>
);

// ---------- Row ----------
const ClientRow = ({ c, onOpen }) => {
  const activeContracts = c.contracts.filter((x) => x.status === "active");
  return (
    <button
      type="button"
      className={"client-row" + (c.isDemo ? " is-demo" : "")}
      onClick={() => onOpen && onOpen(c)}
    >
      <div className="cr-main">
        <div className="cr-avatar" aria-hidden="true">
          {c.name
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0])
            .join("")
            .toUpperCase()}
        </div>
        <div className="cr-id">
          <div className="cr-name">
            <AlertDot level={c.alert && c.alert.level} />
            <span>{c.name}</span>
            {c.isDemo && <span className="demo-tag">demo</span>}
          </div>
          <div className="cr-meta">
            <span className="mono">{c.cnpj}</span>
            <span className="sep">·</span>
            <span>{c.segment}</span>
            <span className="sep">·</span>
            <span>Gerente {c.owner.split(" ")[0]}</span>
          </div>
        </div>
      </div>

      <div className="cr-contracts">
        <div className="cr-contracts-head">
          <span className="cr-contracts-count">{activeContracts.length}</span>
          <span className="cr-contracts-label">
            {activeContracts.length === 1 ? "contrato ativo" : "contratos ativos"}
          </span>
        </div>
        <div className="cr-contracts-pills">
          {activeContracts.slice(0, 2).map((x) => (
            <ContractPill key={x.id} c={x} />
          ))}
          {activeContracts.length > 2 && (
            <span className="cp-more">+{activeContracts.length - 2}</span>
          )}
        </div>
      </div>

      <div className="cr-money">
        <div className="cr-money-value">{fmtBRLList(c.monthlyTotal)}</div>
        <div className="cr-money-label">mensal · carteira</div>
      </div>

      <div className="cr-status">
        <BillingChip status={c.billingStatus} />
        <div className="cr-status-sub">{c.billingLabel}</div>
        {c.alert && c.alert.level !== "none" && (
          <div className={"cr-alert tone-" + c.alert.level}>
            {c.alert.text}
          </div>
        )}
      </div>

      <div className="cr-chev" aria-hidden="true">
        <span className="cr-open-cta">
          Abrir ficha <IChevron dir="right" size={12} />
        </span>
      </div>
    </button>
  );
};

// ---------- Main ----------
const ClientsList = ({ user, onLogout, onOpenClient, onNavClick }) => {
  const [query, setQuery] = useStateCL("");
  const [filter, setFilter] = useStateCL("all"); // all | to_bill | alerts | under_review

  const filtered = CLIENTS.filter((c) => {
    const q = query.trim().toLowerCase();
    if (q) {
      const hay = (c.name + " " + c.cnpj + " " + c.segment + " " + c.contacts.name).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filter === "to_bill") return c.billingStatus === "to_calculate" || c.billingStatus === "overdue";
    if (filter === "alerts") return c.alert && c.alert.level !== "none";
    if (filter === "under_review") return c.billingStatus === "under_review";
    return true;
  });

  return (
    <WorkspaceShell
      activeNav="clients"
      counts={{ clients: CLIENTS_SUMMARY.total, contracts: CLIENTS_SUMMARY.activeContracts }}
      onNavClick={onNavClick}
    >
      <div className="ws-topbar">
        <div className="crumb">
          <span>Clientes</span>
          <span className="sep">/</span>
          <span style={{ color: "var(--azul-profundo)" }}>Carteira</span>
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

      <div className="ws-body cl-body">
        <div className="cl-wrap">
          <header className="cl-head">
            <div>
              <div className="eyebrow">
                <span className="dot-cyan" /> Sua carteira
              </div>
              <h1>
                <span className="serif-accent">Clientes</span> do escritório
              </h1>
              <p>
                Cada cliente com seus contratos ativos, status da cobrança do mês e
                alertas de cobrança incorreta. Clique para abrir a ficha completa.
              </p>
            </div>
            <div className="cl-head-actions">
              <button className="btn btn-primary">
                <IPlus size={13} /> Novo cliente
              </button>
            </div>
          </header>

          {/* Stat strip */}
          <div className="cl-stats">
            <div className="cl-stat">
              <div className="cls-num">{CLIENTS_SUMMARY.total}</div>
              <div className="cls-label">clientes ativos</div>
            </div>
            <div className="cl-stat">
              <div className="cls-num">{CLIENTS_SUMMARY.activeContracts}</div>
              <div className="cls-label">contratos vigentes</div>
            </div>
            <div className="cl-stat">
              <div className="cls-num">{fmtBRLList(CLIENTS_SUMMARY.monthlyTotal).replace("R$", "").trim()}</div>
              <div className="cls-label">mensal da carteira</div>
            </div>
            <div className="cl-stat cl-stat--accent">
              <div className="cls-num cls-num--alert">{CLIENTS_SUMMARY.withAlerts}</div>
              <div className="cls-label">clientes com alerta</div>
            </div>
            <div className="cl-stat cl-stat--accent">
              <div className="cls-num cls-num--action">{CLIENTS_SUMMARY.toBillNow}</div>
              <div className="cls-label">a cobrar este mês</div>
            </div>
          </div>

          {/* Filters */}
          <div className="cl-toolbar">
            <div className="cl-search">
              <span className="cl-search-ico" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Buscar por nome, CNPJ ou contato"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="cl-filters" role="tablist">
              {[
                { id: "all", label: "Todos" },
                { id: "to_bill", label: "A cobrar" },
                { id: "alerts", label: "Com alerta" },
                { id: "under_review", label: "Em auditoria" },
              ].map((f) => (
                <button
                  key={f.id}
                  className={"cl-filter" + (filter === f.id ? " active" : "")}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table header (desktop only) */}
          <div className="cl-table-head">
            <div>Cliente</div>
            <div>Contratos ativos</div>
            <div>Mensal</div>
            <div>Cobrança do mês</div>
            <div />
          </div>

          {/* Rows */}
          <div className="cl-list">
            {filtered.length === 0 && (
              <div className="cl-empty">
                Nenhum cliente encontrado com esse filtro.
              </div>
            )}
            {filtered.map((c) => (
              <ClientRow key={c.id} c={c} onOpen={onOpenClient} />
            ))}
          </div>
        </div>
      </div>
    </WorkspaceShell>
  );
};

Object.assign(window, { ClientsList });
