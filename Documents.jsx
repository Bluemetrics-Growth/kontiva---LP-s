// Kontiva MVP — Documents list screen
// Registro de todos os documentos enviados ao Kontiva (contratos, aditivos,
// lançamentos, notas, extratos). Cada linha exibe nome, tipo, cliente ligado,
// tamanho/páginas, status de processamento e ações (ver · baixar).
//
// Segue o mesmo padrão visual de ClientsList / ContractsList — .cl-wrap,
// .cl-stats, .cl-toolbar, .client-row — mas com uma variante .document-row
// para aproveitar o grid e colunas já definidas.

const { useState: useStateDoc, useMemo: useMemoDoc } = React;

const fmtSizeDoc = (kb) => {
  if (kb == null) return "—";
  if (kb < 1024) return kb + " KB";
  return (kb / 1024).toFixed(1).replace(".", ",") + " MB";
};

const extOf = (fileName) => {
  const m = /\.([a-z0-9]+)$/i.exec(fileName || "");
  return (m ? m[1] : "doc").toUpperCase();
};

// --- Document-type icon (renders inside the file-shaped avatar) ---
const DocTypeIcon = ({ iconKey, size = 18 }) => {
  if (iconKey === "sheet") return <ISheet size={size} />;
  return <IDoc size={size} />;
};

// --- Status chip (with animated pulse for "processing") ---
const DocStatusChip = ({ status }) => {
  const meta = DOC_STATUS_META[status];
  if (!meta) return null;
  return (
    <span className={"doc-status-chip tone-" + meta.className}>
      <span className="sc-dot" aria-hidden="true" />
      {meta.label}
    </span>
  );
};

// --- Individual row ---
const DocumentRow = ({ d, onView, onDownload }) => {
  const type = DOC_TYPE_META[d.type] || { label: d.type, icon: "doc" };
  const ext = extOf(d.name);
  const handleDownload = (e) => {
    e.stopPropagation();
    onDownload && onDownload(d);
  };
  const handleView = (e) => {
    e.stopPropagation();
    onView && onView(d);
  };
  const handleRowClick = () => onView && onView(d);

  return (
    <div
      className={
        "client-row document-row" +
        (d.isDemo ? " is-demo" : "")
      }
      onClick={handleRowClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleRowClick();
        }
      }}
    >
      {/* Document identity */}
      <div className="cr-main">
        <div className={"doc-avatar type-" + d.type} aria-hidden="true">
          <DocTypeIcon iconKey={type.icon} size={18} />
          <span className="doc-ext">{ext}</span>
        </div>
        <div className="cr-id">
          <div className="cr-doc-name" title={d.name}>
            <span>{d.name}</span>
            {d.isDemo && <span className="demo-tag">demo</span>}
          </div>
          <div className="cr-meta">
            <span className="cr-doc-id">{d.id}</span>
            <span className="sep">·</span>
            <span>Enviado {d.uploadedAt}</span>
            <span className="sep">·</span>
            <span>por {d.uploadedBy.split(" ")[0]}</span>
          </div>
        </div>
      </div>

      {/* Type + linked client */}
      <div className="cr-contracts">
        <div className="cr-contracts-head">
          <span className={"doc-type-pill type-" + d.type}>
            <DocTypeIcon iconKey={type.icon} size={12} />
            {type.label}
          </span>
        </div>
        <div className="cr-contracts-pills" style={{ marginTop: 8 }}>
          <div className="contract-pill" title={d.clientName}>
            <span className="cp-value" style={{
              overflow: "hidden", textOverflow: "ellipsis",
              whiteSpace: "nowrap", maxWidth: 180,
            }}>{d.clientName}</span>
          </div>
          {d.contractLabel && (
            <div className="contract-pill" style={{
              background: "transparent",
              border: "1px solid rgba(10,31,63,0.1)",
            }}>
              <span className="cp-label">{d.contractLabel}</span>
            </div>
          )}
        </div>
      </div>

      {/* Size / pages */}
      <div className="cr-doc-size">
        <div className="cr-doc-size-value">{fmtSizeDoc(d.sizeKB)}</div>
        <div className="cr-doc-size-label">
          {d.pages != null
            ? `${d.pages} ${d.pages === 1 ? "página" : "páginas"}`
            : d.rows != null
              ? `${d.rows.toLocaleString("pt-BR")} linhas`
              : "—"}
        </div>
      </div>

      {/* Status + insight */}
      <div className="cr-status">
        <DocStatusChip status={d.status} />
        <div className={"cr-doc-insight" + (d.insight ? "" : " empty")}>
          {d.insight || "Sem observações"}
        </div>
      </div>

      {/* Actions */}
      <div className="cr-doc-actions" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="doc-icon-btn"
          onClick={handleView}
          aria-label="Ver documento"
          title="Ver"
        >
          <IEye size={15} />
        </button>
        <button
          type="button"
          className="doc-icon-btn primary"
          onClick={handleDownload}
          aria-label={`Baixar ${d.name}`}
          title="Baixar"
          disabled={d.status === "processing" || d.status === "failed"}
          style={
            (d.status === "processing" || d.status === "failed")
              ? { opacity: 0.5, cursor: "not-allowed", boxShadow: "none" }
              : undefined
          }
        >
          <IDownload size={15} />
        </button>
      </div>
    </div>
  );
};

// --- Main screen ---
const DocumentsList = ({ user, onLogout, onNavClick }) => {
  const [query, setQuery] = useStateDoc("");
  const [statusFilter, setStatusFilter] = useStateDoc("all");
  const [typeFilter, setTypeFilter] = useStateDoc("all");
  const [toast, setToast] = useStateDoc(null);

  const STATUS_FILTERS = [
    { id: "all",        label: "Todos" },
    { id: "processed",  label: "Processados" },
    { id: "review",     label: "Aguardando revisão" },
    { id: "processing", label: "Processando" },
    { id: "failed",     label: "Falhou" },
    { id: "archived",   label: "Arquivados" },
  ];

  const TYPE_FILTERS = [
    { id: "all",       label: "Todos" },
    { id: "contract",  label: "Contratos" },
    { id: "amendment", label: "Aditivos" },
    { id: "billing",   label: "Lançamentos" },
    { id: "invoice",   label: "Notas" },
    { id: "statement", label: "Extratos" },
    { id: "receipt",   label: "Comprovantes" },
  ];

  const filtered = useMemoDoc(() => {
    return DOCUMENTS.filter((d) => {
      const q = query.trim().toLowerCase();
      if (q) {
        const hay = (
          d.name + " " + d.id + " " + d.clientName + " " +
          (d.contractLabel || "") + " " + (d.insight || "")
        ).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (statusFilter !== "all" && d.status !== statusFilter) return false;
      if (typeFilter !== "all" && d.type !== typeFilter) return false;
      return true;
    });
  }, [query, statusFilter, typeFilter]);

  const handleDownload = (d) => {
    // Simulação: mostra um toast rápido. No produto real isto dispararia
    // o download real a partir do storage.
    setToast({ kind: "download", text: `Baixando ${d.name}…` });
    window.clearTimeout(handleDownload._t);
    handleDownload._t = window.setTimeout(() => setToast(null), 2400);
  };
  const handleView = (d) => {
    setToast({ kind: "view", text: `Abrindo ${d.name}…` });
    window.clearTimeout(handleView._t);
    handleView._t = window.setTimeout(() => setToast(null), 1800);
  };

  return (
    <WorkspaceShell
      activeNav="documents"
      counts={{
        clients: CLIENTS_SUMMARY.total,
        contracts: CLIENTS_SUMMARY.activeContracts,
        documents: DOCUMENTS_SUMMARY.total,
      }}
      onNavClick={onNavClick}
    >
      <div className="ws-topbar">
        <div className="crumb">
          <span>Documentos</span>
          <span className="sep">/</span>
          <span style={{ color: "var(--azul-profundo)" }}>Todos os envios</span>
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
                <span className="dot-cyan" /> Arquivo · documentos
              </div>
              <h1>
                Tudo que a gente <span className="serif-accent">leu</span> por você
              </h1>
              <p>
                Registro completo dos documentos enviados: contratos, aditivos,
                lançamentos, notas e extratos. Cada um mostra o status de
                processamento da Kontiva e o que a gente achou lá dentro.
                Baixe o original a qualquer momento.
              </p>
            </div>
            <div className="cl-head-actions">
              <button
                className="btn btn-primary"
                onClick={() => onNavClick && onNavClick("home")}
              >
                <IUpload size={14} /> Enviar documento
              </button>
            </div>
          </header>

          {/* Stat strip */}
          <div className="cl-stats">
            <div className="cl-stat">
              <div className="cls-num">{DOCUMENTS_SUMMARY.total}</div>
              <div className="cls-label">documentos totais</div>
            </div>
            <div className="cl-stat">
              <div className="cls-num">{DOCUMENTS_SUMMARY.processed}</div>
              <div className="cls-label">processados</div>
            </div>
            <div className="cl-stat cl-stat--accent">
              <div className="cls-num cls-num--action">
                {DOCUMENTS_SUMMARY.review}
              </div>
              <div className="cls-label">aguardando revisão</div>
            </div>
            <div className="cl-stat cl-stat--accent">
              <div className="cls-num cls-num--alert">
                {DOCUMENTS_SUMMARY.failed}
              </div>
              <div className="cls-label">falharam</div>
            </div>
            <div className="cl-stat">
              <div className="cls-num">Hoje</div>
              <div className="cls-label">último envio · 14:38</div>
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
                placeholder="Buscar por nome, cliente, contrato ou ID"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="cl-filters" role="tablist" aria-label="Filtro por status">
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f.id}
                  className={"cl-filter" + (statusFilter === f.id ? " active" : "")}
                  onClick={() => setStatusFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Type filter row */}
          <div
            className="cl-filters-group"
            role="tablist"
            aria-label="Filtro por tipo"
            style={{ marginTop: -6, marginBottom: 18 }}
          >
            <span className="cl-filters-label">Tipo</span>
            {TYPE_FILTERS.map((f) => (
              <button
                key={f.id}
                className={"cl-filter" + (typeFilter === f.id ? " active" : "")}
                onClick={() => setTypeFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Table header (desktop only) */}
          <div className="cl-table-head">
            <div>Documento</div>
            <div>Tipo · cliente</div>
            <div>Tamanho</div>
            <div>Status</div>
            <div />
          </div>

          {/* Rows */}
          <div className="cl-list">
            {filtered.length === 0 && (
              <div className="cl-empty">
                Nenhum documento encontrado com esse filtro.
              </div>
            )}
            {filtered.map((d) => (
              <DocumentRow
                key={d.id}
                d={d}
                onDownload={handleDownload}
                onView={handleView}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Transient toast (download / view simulation) */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 80,
            background: "var(--azul-profundo)",
            color: "#EAF6FF",
            padding: "12px 18px",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 20px 50px -20px rgba(10,31,63,0.5)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span style={{ color: "var(--ciano)", display: "inline-flex" }}>
            {toast.kind === "download" ? <IDownload size={14} /> : <IEye size={14} />}
          </span>
          <span>{toast.text}</span>
        </div>
      )}
    </WorkspaceShell>
  );
};

Object.assign(window, { DocumentsList });
