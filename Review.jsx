// Kontiva MVP — Review screen (post-upload extraction review)

const { useState: useStateR, useEffect: useEffectR } = React;

const CARDS_DEF = [
  {
    id: "client", title: "Cliente identificado", icon: IUser,
    subtitle: "Dados extraídos do cabeçalho e cláusula das partes.",
    fields: [
      { path: "client.name", label: "Razão social", key: "name" },
      { path: "client.cnpj", label: "CNPJ", key: "cnpj" },
      { path: "client.address", label: "Endereço", key: "address" },
      { path: "client.representative", label: "Representante legal", key: "representative" },
    ],
  },
  {
    id: "contract", title: "Contrato e valor", icon: IMoney,
    subtitle: "Objeto, preço e condição de pagamento.",
    fields: [
      { path: "contract.object", label: "Objeto do contrato", key: "object", multiline: true },
      { path: "contract.monthlyValue", label: "Valor mensal", key: "monthlyValue" },
      { path: "contract.paymentMethod", label: "Forma de pagamento", key: "paymentMethod" },
      { path: "contract.priceConditions", label: "Condições de preço", key: "priceConditions", multiline: true },
    ],
  },
  {
    id: "adjustment", title: "Reajuste", icon: IPercent,
    subtitle: "Índice, periodicidade e histórico.",
    fields: [
      { path: "adjustment.index", label: "Índice de reajuste", key: "index" },
      { path: "adjustment.periodicity", label: "Periodicidade", key: "periodicity" },
      { path: "adjustment.lastAdjustment", label: "Último reajuste aplicado", key: "lastAdjustment" },
      { path: "adjustment.nextAdjustment", label: "Próximo reajuste", key: "nextAdjustment" },
    ],
  },
  {
    id: "validity", title: "Vigência e aniversário", icon: ICalendar,
    subtitle: "Quando começa, quando termina, quando aniversaria.",
    // second field is computed per-contract: if there's an end date → "Término previsto";
    // otherwise fall back to "Próxima data de reajuste" (pulled from adjustment.nextAdjustment)
    fields: [
      { path: "validity.start", label: "Início da vigência", key: "start" },
      { path: "__endOrNextAdjustment", label: "Término previsto", key: "endOrNext", dynamic: true },
      { path: "validity.anniversary", label: "Aniversário do contrato", key: "anniversary" },
      { path: "validity.renewal", label: "Cláusula de renovação", key: "renewal", multiline: true },
    ],
  },
  {
    id: "extras", title: "Escopo extra e serviços fora", icon: IScope,
    subtitle: "O que não está incluso e quanto custa a mais.",
    fields: [
      { path: "extras.outOfScope", label: "Serviços fora do escopo", key: "outOfScope", multiline: true },
      { path: "extras.extraFee", label: "Acréscimo por serviço extra", key: "extraFee" },
    ],
  },
];

const SummaryChip = ({ icon: Ico, label, value, tone }) => (
  <div className={"sum-chip tone-" + (tone || "default")}>
    <div className="sc-ico"><Ico size={16} /></div>
    <div>
      <div className="sc-label">{label}</div>
      <div className="sc-value">{value}</div>
    </div>
  </div>
);

const Review = ({ user, fileName, onConfirm, onLogout, onNavClick, onSidebarToggle, sidebarCollapsed }) => {
  const [data, setData] = useStateR(EXTRACTED_DEFAULT);
  const [sourceField, setSourceField] = useStateR(null);
  const [quotas, setQuotas] = useStateR(QUOTAS_DEFAULT);

  const addQuota = () => {
    const id = "custom-" + Date.now();
    setQuotas((qs) => [
      ...qs,
      {
        id,
        label: "Novo limite",
        unit: "unidade",
        unitPlural: "unidades",
        included: { value: 10, confidence: "medium" },
        bands: [{ from: 11, to: null, unitPrice: 0 }],
        confidence: "medium",
      },
    ]);
  };

  const updateField = (path, newValue) => {
    const [section, key] = path.split(".");
    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: { ...prev[section][key], value: newValue, confidence: "high" },
      },
    }));
  };

  const getField = (path) => {
    const [section, key] = path.split(".");
    return data[section] && data[section][key];
  };

  // If the contract has an end date, the second validity field shows "Término previsto"
  // bound to validity.end. If there's no end date (open-ended contract), it falls back
  // to showing the next scheduled price adjustment — because that's the next meaningful
  // date the user needs on the radar.
  const resolveDynamicField = (path) => {
    if (path !== "__endOrNextAdjustment") return null;
    const end = data.validity.end;
    const hasEnd = end && end.value && String(end.value).trim() !== "" && String(end.value).trim() !== "—";
    if (hasEnd) {
      return { label: "Término previsto", realPath: "validity.end", field: end };
    }
    return {
      label: "Próxima data de reajuste",
      realPath: "adjustment.nextAdjustment",
      field: data.adjustment.nextAdjustment,
    };
  };

  const clientName = data.client.name.value;

  return (
        <WorkspaceShell activeNav="clients" counts={{ clients: 1, contracts: 1 }} onNavClick={onNavClick}>
      <div className="ws-topbar">
        <div className="crumb">
          <span>Clientes</span>
          <span className="sep">/</span>
          <span style={{ color: "var(--azul-profundo)" }}>{clientName}</span>
          <span className="sep">/</span>
          <span style={{ color: "var(--cinza-escuro)" }}>Revisão do contrato</span>
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

      <div className="ws-body review-body">
        <div className="review-wrap">

          <header className="review-head">
            <div className="eyebrow">
              <span className="dot-cyan" /> <ISparkle size={11} /> Extração concluída
            </div>
            <h1>
              Encontramos <span className="serif-accent">{clientName}</span>.<br/>
              Revise antes de salvar<span style={{ color: "var(--ciano)" }}>.</span>
            </h1>
            <p className="review-sub">
              Tudo aqui foi lido do contrato. Confira antes de salvar —
              campos com selo <b>"Revise"</b> merecem um segundo olhar.
            </p>
            <div className="review-file-chip">
              <IDoc size={13} /> {fileName || "Contrato.pdf"}
              <span style={{ opacity: 0.5 }}>·</span>
              <span>7 páginas lidas</span>
            </div>
          </header>

          <div className="summary-row">
            <SummaryChip icon={IMoney} label="Valor mensal"
              value={data.contract.monthlyValue.value} tone="emphasis" />
            <SummaryChip icon={IPercent} label="Índice · periodicidade"
              value={`${data.adjustment.index.value} · ${data.adjustment.periodicity.value}`} />
            <SummaryChip icon={ICalendar} label="Vigência até"
              value={data.validity.end.value.replace(/ \(.*\)/, "")} />
            <SummaryChip icon={ICake} label="Aniversário"
              value={data.validity.anniversary.value} />
          </div>

          {CARDS_DEF.map((card, idx) => {
            const Ico = card.icon;
            return (
              <React.Fragment key={card.id}>
                {idx === 0 && (
                  <div className="review-edit-hint">
                    <span className="reh-ico"><IPen size={13} /></span>
                    <span>
                      <b>Clique em qualquer valor para editar.</b>{" "}
                      <span className="reh-sub">
                        Confirme com Enter · Cancele com Esc.
                      </span>
                    </span>
                  </div>
                )}
                <section className="review-card">
                <div className="rc-head">
                  <div className="rc-head-main">
                    <div className="rc-ico"><Ico size={16} /></div>
                    <div>
                      <h3>{card.title}</h3>
                      <div className="rc-sub">{card.subtitle}</div>
                    </div>
                  </div>
                </div>
                <div className="rc-fields">
                  {card.fields.map((f) => {
                    if (f.dynamic) {
                      const resolved = resolveDynamicField(f.path);
                      if (!resolved) return null;
                      return (
                        <div key={f.path} className="rc-field">
                          <EditableField
                            label={resolved.label}
                            data={resolved.field}
                            onChange={(v) => updateField(resolved.realPath, v)}
                            onViewSource={() => setSourceField(resolved.realPath)}
                          />
                        </div>
                      );
                    }
                    return (
                      <div key={f.path} className={"rc-field" + (f.multiline ? " span-2" : "")}>
                        <EditableField
                          label={f.label}
                          data={getField(f.path)}
                          multiline={f.multiline}
                          onChange={(v) => updateField(f.path, v)}
                          onViewSource={() => setSourceField(f.path)}
                        />
                      </div>
                    );
                  })}
                </div>
              </section>
              {idx === 1 && (
                <QuotaLimitsCard
                  quotas={quotas}
                  onChange={setQuotas}
                  onViewSource={(key) => setSourceField(key)}
                  onAddQuota={addQuota}
                />
              )}
              </React.Fragment>
            );
          })}

          <div className="review-cta">
            <div className="rcta-text">
              <div className="rcta-title">
                Dados conferidos? <span className="serif-accent">Vamos bater com o cobrado.</span>
              </div>
              <div className="rcta-sub">
                Ao confirmar, criamos a ficha de <b>{clientName}</b> e abrimos a tela
                de upload do relatório de cobrança — pra ver se o que foi faturado
                bate com o que o contrato permite.
              </div>
            </div>
            <div className="rcta-actions">
              <button className="btn btn-ghost" onClick={onLogout}>Cancelar</button>
              <button className="btn btn-primary" onClick={onConfirm}>
                Confirmar e comparar com o cobrado <IArrow />
              </button>
            </div>
          </div>
        </div>
      </div>

      <SourceDrawer
        fieldKey={sourceField}
        fileName={fileName}
        onClose={() => setSourceField(null)}
      />
    </WorkspaceShell>
  );
};

Object.assign(window, { Review });
