// Kontiva MVP — BillingUpload screen
// Passo 2 de 2. Perspectiva do ESCRITÓRIO CONTÁBIL definindo/auditando
// quanto deve cobrar do seu cliente.
//
// Dois cenários:
//   • calc  — só relatório de serviços prestados → Kontiva diz quanto cobrar
//   • audit — relatório + boleto/NF já emitida  → Kontiva confere se cobrou certo

const { useState: useStateBU } = React;

const SCENARIOS = [
  {
    id: "calc",
    icon: IScope,
    title: "Calcular o valor a cobrar",
    subtitle:
      "Você ainda não emitiu o boleto. Envie só o relatório de serviços prestados — a Kontiva calcula quanto faturar neste mês.",
    pill: "Antes de emitir",
    outputs: [
      "Valor exato a cobrar no mês, já com reajuste",
      "Detalhamento de mensalidade + extras + horas técnicas",
      "Memória de cálculo pronta pra anexar ao boleto",
    ],
    docs: "Relatório interno de horas / serviços prestados",
    accept: ".xlsx,.xls,.csv,.pdf",
  },
  {
    id: "audit",
    icon: IAlert,
    title: "Auditar uma cobrança já emitida",
    subtitle:
      "Você já mandou boleto ou NF. A Kontiva cruza o relatório com o que foi cobrado e mostra se você cobrou a menos (perda) ou a mais (risco de imagem).",
    pill: "Depois de emitir",
    outputs: [
      "Quanto você deveria ter cobrado × quanto cobrou",
      "Receita perdida por subfaturamento",
      "Alertas de cobrança acima do contrato — antes do cliente reclamar",
    ],
    docs: "Relatório de serviços + boleto, NF ou extrato",
    accept: ".xlsx,.xls,.csv,.pdf",
  },
];

const SOURCE_OPTIONS = [
  {
    id: "erp",
    soon: true,
    icon: IBolt,
    title: "Conectar ao ERP",
    subtitle: "Omie, Domínio, Questor, Alterdata — puxamos horas e lançamentos automaticamente.",
    badge: "Em breve",
  },
  {
    id: "spreadsheet",
    icon: ISheet,
    title: "Planilha do ERP",
    subtitle: "Excel ou CSV exportado do seu sistema. Lemos as colunas sozinhos.",
    badge: "Recomendado",
    primary: true,
  },
  {
    id: "pdf",
    icon: IDoc,
    title: "Relatório em PDF",
    subtitle: "Apontamento de horas, boleto detalhado ou fatura emitida.",
  },
];

const BillingUpload = ({ user, clientName, onLogout, onFile, onBack, onNavClick }) => {
  const [scenario, setScenario] = useStateBU("calc");
  const [selected, setSelected] = useStateBU("spreadsheet");

  const dz = useDropzone((f) => { onFile && onFile(f, scenario); });

  const sc = SCENARIOS.find((s) => s.id === scenario);

  return (
        <WorkspaceShell activeNav="clients" counts={{ clients: 1, contracts: 1 }} onNavClick={onNavClick}>
      <div className="ws-topbar">
        <div className="crumb">
          <span>Clientes</span>
          <span className="sep">/</span>
          <span style={{ color: "var(--azul-profundo)" }}>{clientName}</span>
          <span className="sep">/</span>
          <span style={{ color: "var(--cinza-escuro)" }}>Cobrança do mês</span>
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

      <div className="ws-body bu-body">
        <div className="bu-wrap">
          <header className="bu-head">
            <div className="eyebrow">
              <span className="dot-cyan" /> Passo 2 de 2 · Escritório cobrando {clientName}
            </div>
            <h1>
              Quanto você deve <span className="serif-accent">cobrar</span> deste cliente?
            </h1>
            <p>
              Escolha o momento em que está: se ainda vai emitir o boleto, a Kontiva
              calcula o valor justo. Se já emitiu, confere se a cobrança bate com o contrato
              — e mostra se você perdeu receita ou cobrou além do combinado.
            </p>
          </header>

          {/* Scenario picker — two big cards */}
          <div className="bu-scenarios">
            {SCENARIOS.map((s) => {
              const Ico = s.icon;
              const active = scenario === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  className={"bu-scenario" + (active ? " active" : "")}
                  onClick={() => setScenario(s.id)}
                >
                  <div className="bsc-top">
                    <div className="bsc-ico"><Ico size={18} /></div>
                    <span className="bsc-pill">{s.pill}</span>
                    <div className="bsc-radio" aria-hidden="true">{active && <span />}</div>
                  </div>
                  <div className="bsc-title">{s.title}</div>
                  <div className="bsc-sub">{s.subtitle}</div>
                  <div className="bsc-outputs">
                    {s.outputs.map((o, i) => (
                      <div key={i} className="bsc-out">
                        <span className="mark"><ITick size={9} /></span>
                        <span>{o}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bsc-docs">
                    <span className="bsc-docs-label">O que enviar</span>
                    <span className="bsc-docs-text">{s.docs}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Source picker */}
          <div className="bu-sources">
            {SOURCE_OPTIONS.map((s) => {
              const Ico = s.icon;
              const active = selected === s.id;
              const disabled = s.soon;
              return (
                <button
                  key={s.id}
                  type="button"
                  className={
                    "bu-source" +
                    (active ? " active" : "") +
                    (disabled ? " disabled" : "") +
                    (s.primary ? " primary" : "")
                  }
                  onClick={() => !disabled && setSelected(s.id)}
                  disabled={disabled}
                >
                  <div className="bus-ico"><Ico size={20} /></div>
                  <div className="bus-body">
                    <div className="bus-head">
                      <span className="bus-title">{s.title}</span>
                      {s.badge && (
                        <span className={"bus-badge " + (s.soon ? "soon" : s.primary ? "rec" : "")}>
                          {s.badge}
                        </span>
                      )}
                    </div>
                    <div className="bus-sub">{s.subtitle}</div>
                  </div>
                  <div className="bus-radio" aria-hidden="true">
                    {active && <span />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dropzone */}
          <div className="bu-dropcard">
            <div className="card-head">
              <h3>
                {scenario === "calc"
                  ? (selected === "pdf" ? "Envie o relatório de serviços (PDF)" : "Envie a planilha com os serviços do mês")
                  : (selected === "pdf" ? "Envie o relatório + o boleto ou NF (PDF)" : "Envie a planilha com serviços + a cobrança emitida")}
              </h3>
              <span className="step-chip" style={{
                background: "color-mix(in oklab, var(--ciano) 15%, transparent)",
                color: "var(--azul-profundo)",
                borderColor: "color-mix(in oklab, var(--ciano) 30%, transparent)"
              }}>
                {scenario === "calc" ? "Mês corrente" : "Últimos 3 meses é o ideal"}
              </span>
            </div>

            <div className="bu-grid">
              <div
                className={"ws-dropzone" + (dz.active ? " active" : "")}
                onDrop={dz.onDrop}
                onDragOver={dz.onDragOver}
                onDragLeave={dz.onDragLeave}
                onClick={dz.onClick}
                role="button"
                tabIndex={0}
              >
                <div className="dz-icon"><IUpload size={24} /></div>
                <div>
                  <div className="dz-title">
                    {selected === "pdf" ? "Arraste o PDF aqui" : "Arraste a planilha aqui"}
                  </div>
                  <div className="dz-sub" style={{ marginTop: 6 }}>
                    ou <u style={{ textUnderlineOffset: 3 }}>selecione um arquivo</u> ·{" "}
                    {selected === "pdf" ? "PDF até 20 MB" : "XLSX, XLS, CSV até 20 MB"}
                  </div>
                </div>
                <input
                  ref={dz.inputRef}
                  type="file"
                  accept={selected === "pdf" ? ".pdf,application/pdf" : ".xlsx,.xls,.csv"}
                  onChange={dz.onInputChange}
                  style={{ display: "none" }}
                />
              </div>

              <div className="bu-explain">
                <div className="bue-title">
                  {scenario === "calc" ? "O que a Kontiva vai calcular" : "O que a Kontiva vai auditar"}
                </div>

                {scenario === "calc" ? (
                  <>
                    <div className="bue-item">
                      <span className="mark"><ITick size={9} /></span>
                      <span><b>Mensalidade</b> — base contratual com reajuste IPCA já aplicado</span>
                    </div>
                    <div className="bue-item">
                      <span className="mark"><ITick size={9} /></span>
                      <span><b>Extras autorizados</b> — horas técnicas a <span className="mono">R$ 180/h</span> com autorização registrada</span>
                    </div>
                    <div className="bue-item">
                      <span className="mark"><ITick size={9} /></span>
                      <span><b>Aniversário do contrato</b> — alerta se o mês de março já entrou na conta</span>
                    </div>
                    <div className="bue-item">
                      <span className="mark"><ITick size={9} /></span>
                      <span><b>Memória de cálculo</b> — pronta pra anexar ao boleto do cliente</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bue-item">
                      <span className="mark"><ITick size={9} /></span>
                      <span><b>Subfaturamento</b> — o que você prestou e não cobrou (receita perdida)</span>
                    </div>
                    <div className="bue-item">
                      <span className="mark"><ITick size={9} /></span>
                      <span><b>Superfaturamento</b> — o que você cobrou além do contrato (risco de imagem)</span>
                    </div>
                    <div className="bue-item">
                      <span className="mark"><ITick size={9} /></span>
                      <span><b>Reajuste esquecido</b> — se o IPCA não entrou no boleto do aniversário</span>
                    </div>
                    <div className="bue-item">
                      <span className="mark"><ITick size={9} /></span>
                      <span><b>Ação sugerida</b> — fatura complementar, nota de crédito ou ajuste no próximo mês</span>
                    </div>
                  </>
                )}

                <div className="bue-foot">
                  <ILock size={12} /> Os dados do seu cliente ficam no seu espaço. Não treinamos modelo com eles.
                </div>
              </div>
            </div>
          </div>

          {/* Back action */}
          <div className="bu-back">
            <button className="btn btn-ghost" onClick={onBack}>
              ← Voltar para a revisão do contrato
            </button>
          </div>
        </div>
      </div>
    </WorkspaceShell>
  );
};

Object.assign(window, { BillingUpload });
