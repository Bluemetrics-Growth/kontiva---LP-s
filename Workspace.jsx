// Kontiva MVP — Shared Workspace shell (sidebar + content slot)
// Used by the Upload and Review screens so the nav stays consistent.

const { useState: useStateWS } = React;

const SIDEBAR_KEY = "kontiva-ws-sidebar";

const WS_NAV = [
  { key: "home", label: "Início", icon: IHome },
  { key: "clients", label: "Clientes", icon: IUsers, countKey: "clients" },
  { key: "contracts", label: "Contratos", icon: IDoc, countKey: "contracts" },
  { key: "documents", label: "Documentos", icon: ISheet, countKey: "documents" },
];

const WorkspaceShell = ({ children, activeNav = "home", counts = {}, onNavClick }) => {
  const [collapsed, setCollapsed] = useStateWS(() => {
    try {
      const saved = localStorage.getItem(SIDEBAR_KEY);
      return saved === null ? true : saved === "1";
    } catch { return true; }
  });
  const toggleSidebar = () => {
    setCollapsed((c) => {
      const next = !c;
      try { localStorage.setItem(SIDEBAR_KEY, next ? "1" : "0"); } catch {}
      return next;
    });
  };

  return (
    <div className={"upload-workspace" + (collapsed ? " sidebar-collapsed" : "")}>
      <aside className="ws-sidebar">
        <div className="ws-sidebar-head">
          <Brand onDark compact={collapsed} />
          <button
            type="button"
            className="ws-collapse-btn"
            onClick={toggleSidebar}
            aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
            title={collapsed ? "Expandir menu" : "Recolher menu"}
          >
            <IChevron dir={collapsed ? "right" : "left"} />
          </button>
        </div>

        <div>
          <div className="ws-section-label" style={{ marginBottom: 8 }}>Navegação</div>
          <div className="ws-nav">
            {WS_NAV.map((n) => {
              const Ico = n.icon;
              const active = n.key === activeNav;
              const count = n.countKey ? counts[n.countKey] : null;
              return (
                <div
                  key={n.key}
                  className={"item" + (active ? " active" : "")}
                  data-tip={n.label}
                  onClick={() => onNavClick && onNavClick(n.key)}
                >
                  <span className="ico"><Ico /></span>
                  <span className="lbl">{n.label}</span>
                  {count != null && <span className="count">{count}</span>}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="ws-section-label" style={{ marginBottom: 8 }}>Geral</div>
          <div className="ws-nav">
            <div className="item" data-tip="Configurações">
              <span className="ico"><ISettings /></span>
              <span className="lbl">Configurações</span>
            </div>
          </div>
        </div>

        {(!counts.clients || counts.clients === 0) && (
          <div className="clients-empty">
            <b style={{ color: "#EAF6FF", display: "block", marginBottom: 4, fontSize: 13 }}>
              Ainda sem carteira
            </b>
            Seu primeiro contrato cria o primeiro cliente. Depois é só seguir adicionando.
          </div>
        )}
      </aside>

      <main className="ws-main">
        {children}
      </main>
    </div>
  );
};

Object.assign(window, { WorkspaceShell });
