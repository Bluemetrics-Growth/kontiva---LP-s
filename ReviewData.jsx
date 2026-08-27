// Kontiva MVP — Review screen data & small pieces

const { useState: useStateRV, useEffect: useEffectRV, useRef: useRefRV } = React;

// Mocked extracted data. In production, this would come from the backend.
const EXTRACTED_DEFAULT = {
  client: {
    name: { value: "Construtora Horizonte Ltda.", confidence: "high" },
    cnpj: { value: "12.345.678/0001-90", confidence: "high" },
    address: { value: "Av. Paulista, 1578 — sala 1204, São Paulo/SP", confidence: "medium" },
    representative: { value: "Ricardo Almeida Souza", confidence: "high" },
  },
  contract: {
    object: {
      value: "Prestação de serviços contábeis mensais, incluindo escrituração fiscal, folha de pagamento e apuração de tributos federais, estaduais e municipais.",
      confidence: "high"
    },
    monthlyValue: { value: "R$ 3.820,00", confidence: "high" },
    paymentMethod: { value: "Boleto bancário — vencimento todo dia 10", confidence: "high" },
    priceConditions: {
      value: "Valor fixo mensal, com reajuste anual pelo IPCA. Acréscimo de 15% sobre serviços fora do escopo descrito em cláusula 3.",
      confidence: "medium"
    },
  },
  adjustment: {
    index: { value: "IPCA", confidence: "high" },
    periodicity: { value: "Anual", confidence: "high" },
    lastAdjustment: { value: "01/03/2025", confidence: "medium" },
    nextAdjustment: { value: "01/03/2026", confidence: "medium" },
  },
  validity: {
    start: { value: "01/03/2024", confidence: "high" },
    end: { value: "01/03/2027 (vigência de 36 meses)", confidence: "high" },
    anniversary: { value: "1º de março", confidence: "high" },
    renewal: { value: "Renovação automática por períodos iguais, salvo denúncia por escrito com 60 dias de antecedência", confidence: "medium" },
  },
  extras: {
    outOfScope: {
      value: "Consultoria tributária especial, defesas em processos administrativos e abertura/encerramento de filiais são cobrados à parte conforme tabela anexa.",
      confidence: "medium"
    },
    extraFee: { value: "15% sobre o valor mensal, por serviço extra", confidence: "low" },
  },
};

// Confidence badge
const ConfBadge = ({ level }) => {
  const map = {
    high: { label: "Alta confiança", cls: "conf-high" },
    medium: { label: "Revise", cls: "conf-medium" },
    low: { label: "Baixa confiança", cls: "conf-low" },
  };
  const c = map[level] || map.medium;
  return <span className={"conf-badge " + c.cls}>{c.label}</span>;
};

// Inline-editable field with confidence + "view source" button
const EditableField = ({
  label, data, onChange, onViewSource, multiline = false,
  prefix, suffix,
}) => {
  const [editing, setEditing] = useStateRV(false);
  const [draft, setDraft] = useStateRV(data.value);
  const inputRef = useRefRV(null);

  useEffectRV(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select && inputRef.current.select();
    }
  }, [editing]);

  const commit = () => {
    setEditing(false);
    if (draft !== data.value && onChange) onChange(draft);
  };
  const cancel = () => { setDraft(data.value); setEditing(false); };
  const onKey = (e) => {
    if (e.key === "Enter" && !multiline) { e.preventDefault(); commit(); }
    if (e.key === "Escape") { e.preventDefault(); cancel(); }
    if (e.key === "Enter" && multiline && (e.metaKey || e.ctrlKey)) { e.preventDefault(); commit(); }
  };

  return (
    <div className={"ef" + (editing ? " editing" : "")}>
      <div className="ef-head">
        <label className="ef-label">{label}</label>
        <div className="ef-meta">
          <ConfBadge level={data.confidence} />
          {onViewSource && (
            <button type="button" className="ef-src" onClick={onViewSource}>
              <IExternal size={11} /> Ver trecho
            </button>
          )}
        </div>
      </div>

      {editing ? (
        multiline ? (
          <textarea
            ref={inputRef}
            className="ef-input ef-textarea"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={onKey}
            rows={3}
          />
        ) : (
          <input
            ref={inputRef}
            className="ef-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={onKey}
          />
        )
      ) : (
        <div className="ef-value" onClick={() => setEditing(true)} role="button" tabIndex={0}>
          <span className="ef-text">
            {prefix}{data.value}{suffix}
          </span>
          <span className="ef-edit-ico" aria-hidden="true"><IPen size={12} /></span>
        </div>
      )}
    </div>
  );
};

Object.assign(window, { EXTRACTED_DEFAULT, ConfBadge, EditableField });
