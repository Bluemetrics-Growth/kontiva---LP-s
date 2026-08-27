// Kontiva MVP — ContractsList (flat view of all contracts across clients)
// Segue o MESMO padrão visual da ClientsList — topbar, hero, stats, toolbar,
// lista de cards. Classes utilitárias reaproveitadas (.cl-*, .cr-*).

const { useState: useStateCtr } = React;

const fmtBRLCtr = (n) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

// Reutiliza BILLING_STATUS_META (definido em ClientsData.jsx). Se o status
// não estiver lá (ex.: "ended"), cai num fallback neutro.
const contractChipMeta = (status) => {
  if (status === "ended") return { label: "Encerrado", className: "muted" };
  return BILLING_STATUS_META[status] || { label: status, className: "neutral" };
};

const ContractAlertDot = ({ level }) => {
  if (!level || level === "none") return null;
  return <span className={"client-alert-dot tone-" + level} aria-hidden="true" />;
};

const ContractRow = ({ r, onOpen }) => {
  const chip = contractChipMeta(r.billingStatus || (r.status === "ended" ? "ended" : "to_calculate"));
  return (
    <button
      type="button"
      className={
        "client-row contract-row" +
        (r.status === "ended" ? " is-ended" : "") +
        (r.isDemo ? " is-demo" : "")
      }
      onClick={() => onOpen && onOpen({ id: r.clientId })}
    >
      {/* Contract identity */}
      <div className="cr-main">
        <div className="cr-avatar cr-avatar--contract" aria-hidden="true">
          {(r.label || "").slice(0, 2).toUpperCase()}
        </div>
        <div className="cr-id">
          <div className="cr-name">
            <ContractAlertDot level={r.alert && r.alert.level} />
            <span>{r.label}</span>
            {r.isDemo && <span className="demo-tag">demo</span>}
          </div>
          <div className="cr-meta">
            <span className="mono">{r.id}</span>
            <span className="sep">·</span>
            <span>{r.clientName}</span>
            <span className="sep">·</span>
            <span className="mono">{r.clientCnpj}</span>
          </div>
        </div>
      </div>

      {/* Índice / aniversário */}
      <div className="cr-contracts">
        <div className="cr-contracts-head">
          <span className="cr-contracts-count mono">{r.index || "—"}</span>
          <span className="cr-contracts-label">
            aniversário em {r.anniversary || "—"}
          </span>
        </div>
        <div className="cr-contracts-pills">
          <div className="contract-pill">
            <span className="cp-label">último reajuste</span>
            <span className="cp-sep">·</span>
            <span className="cp-value">
              {r.lastAdjustedPercent
                ? `${r.lastAdjustedPercent.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}% · ${r.lastAdjustedAt}`
                : "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Mensal */}
      <div className="cr-money">
        <div className="cr-money-value">{fmtBRLCtr(r.monthly || 0)}</div>
        <div className="cr-money-label">mensal · reajustado</div>
      </div>

      {/* Status cobrança */}
      <div className="cr-status">
        <span className={"billing-chip tone-" + chip.className}>{chip.label}</span>
        <div className="cr-status-sub">
          {r.lastBilling
            ? `Últ. cobrança ${r.lastBilling.reference} · ${fmtBRLCtr(r.lastBilling.amount)}`
            : "Sem cobranças"}
        </div>
        {r.alert && r.alert.level !== "none" && (
          <div className={"cr-alert tone-" + r.alert.level}>{r.alert.text}</div>
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

const ContractsList = ({ user, onLogout, onOpenClient, onNavClick }) => {
  const [query, setQuery] = useStateCtr("");
  const [filter, setFilter] = useStateCtr("active"); // active | ended | all

  // Flatten contracts with client info
  const rows = [];
  for (const c of CLIENTS) {
    for (const k of c.contracts) {
      rows.push({
        ...k,
        clientId: c.id,
        clientName: c.name,
        clientCnpj: c.cnpj,
        clientSegment: c.segment,
        clientOwner: c.owner,
        isDemo: c.isDemo,
      });
    }
  }

  const actives = rows.filter((r) => r.status === "active");
  const countEnded = rows.filter((r) => r.status === "ended").length;
  const withAlert = actives.filter((r) => r.alert && r.alert.level !== "none").length;
  const totalMonthly = actives.reduce((s, r) => s + (r.monthly || 0), 0);
  const nextAnniversaries = actives.filter((r) => {
    // Simplistic: contracts whose anniversary is in the next 60 days (mock)
    return r.nextAnniversary && r.nextAnniversary !== "—";
  }).length;

  const filtered = rows.filter((r) => {
    const q = query.trim().toLowerCase();
    if (q) {
      const hay = (
        r.label + " " + r.id + " " + r.clientName + " " + r.clientCnpj + " " + (r.index || "")
      ).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filter === "active") return r.status === "active";
    if (filter === "ended") return r.status === "ended";
    if (filter === "alerts") return r.alert && r.alert.level !== "none" && r.status === "active";
    return true;
  });

  return (
    <WorkspaceShell
      activeNav="contracts"
      counts={{ clients: CLIENTS_SUMMARY.total, contracts: CLIENTS_SUMMARY.activeContracts }}
      onNavClick={onNavClick}
    >
      <div className="ws-topbar">
        <div className="crumb">
          <span>Contratos</span>
          <span className="sep">/</span>
          <span style={{ color: "var(--azul-profundo)" }}>Todos da carteira</span>
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
                <span className="dot-cyan" /> Carteira · contratos
              </div>
              <h1>
                <span className="serif-accent">Contratos</span> da carteira
              </h1>
              <p>
                Visão plana de todos os contratos — ativos, encerrados e em auditoria.
                Cada contrato tem índice, aniversário e status de cobrança próprios.
                Clique em qualquer linha para abrir a ficha do cliente dono.
              </p>
            </div>
          </header>

          {/* Stat strip */}
          <div className="cl-stats">
            <div className="cl-stat">
              <div className="cls-num">{actives.length}</div>
              <div className="cls-label">contratos ativos</div>
            </div>
            <div className="cl-stat">
              <div className="cls-num">
                {fmtBRLCtr(totalMonthly).replace("R$", "").trim()}
              </div>
              <div className="cls-label">mensal somado</div>
            </div>
            <div className="cl-stat cl-stat--accent">
              <div className="cls-num cls-num--alert">{withAlert}</div>
              <div className="cls-label">com alerta</div>
            </div>
            <div className="cl-stat cl-stat--accent">
              <div className="cls-num cls-num--action">{nextAnniversaries}</div>
              <div className="cls-label">aniversários à frente</div>
            </div>
            <div className="cl-stat">
              <div className="cls-num">{countEnded}</div>
              <div className="cls-label">encerrados</div>
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
                placeholder="Buscar por contrato, cliente, CNPJ ou índice"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="cl-filters" role="tablist">
              {[
                { id: "active", label: `Ativos ${actives.length}` },
                { id: "alerts", label: `Com alerta ${withAlert}` },
                { id: "ended", label: `Encerrados ${countEnded}` },
                { id: "all", label: `Todos ${rows.length}` },
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
            <div>Contrato</div>
            <div>Índice / aniversário</div>
            <div>Mensal</div>
            <div>Cobrança do mês</div>
            <div />
          </div>

          {/* Rows */}
          <div className="cl-list">
            {filtered.length === 0 && (
              <div className="cl-empty">
                Nenhum contrato encontrado com esse filtro.
              </div>
            )}
            {filtered.map((r) => (
              <ContractRow
                key={r.clientId + "__" + r.id}
                r={r}
                onOpen={onOpenClient}
              />
            ))}
          </div>
        </div>
      </div>
    </WorkspaceShell>
  );
};

Object.assign(window, { ContractsList });
