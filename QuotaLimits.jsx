// Kontiva MVP — Limites contratados e excedentes por banda
//
// Contratos de contabilidade frequentemente incluem pacotes fechados
// (até N funcionários, até N documentos fiscais, etc) com tabelas de
// excedentes por faixa. Este componente modela isso.
//
// Modelo de dados (por quota):
//   id              — string
//   label           — "Funcionários na folha"
//   unit            — "funcionário" (singular, usado pra formatar)
//   unitPlural      — "funcionários"
//   included        — { value: number, confidence }
//   bands           — [{ from: number, to: number|null, unitPrice: number }]
//                     from é inclusivo, to é inclusivo (null = ∞)
//                     A primeira banda começa em `included + 1`.
//   source          — chave para o SourceDrawer (opcional)

const { useState: useStateQL } = React;

// --- Quotas mockadas extraídas do contrato --------------------------------
const QUOTAS_DEFAULT = [
  {
    id: "employees",
    label: "Funcionários na folha",
    unit: "funcionário",
    unitPlural: "funcionários",
    included: { value: 10, confidence: "high" },
    bands: [
      { from: 11, to: 20, unitPrice: 45 },
      { from: 21, to: 50, unitPrice: 38 },
      { from: 51, to: null, unitPrice: 30 },
    ],
    sourceKey: "quota.employees",
    confidence: "high",
  },
  {
    id: "fiscal-docs",
    label: "Documentos fiscais / mês",
    unit: "documento",
    unitPlural: "documentos",
    included: { value: 60, confidence: "high" },
    bands: [
      { from: 61, to: 120, unitPrice: 3.20 },
      { from: 121, to: null, unitPrice: 2.40 },
    ],
    sourceKey: "quota.fiscalDocs",
    confidence: "medium",
  },
  {
    id: "branches",
    label: "Filiais / CNPJs vinculados",
    unit: "filial",
    unitPlural: "filiais",
    included: { value: 1, confidence: "medium" },
    bands: [
      { from: 2, to: null, unitPrice: 420 },
    ],
    sourceKey: "quota.branches",
    confidence: "low",
  },
];

// --- Formatters -----------------------------------------------------------
const fmtBRL = (n) => {
  if (n == null || isNaN(n)) return "R$ 0,00";
  const abs = Math.abs(n);
  const hasDecimals = abs !== Math.floor(abs);
  return n.toLocaleString("pt-BR", {
    style: "currency", currency: "BRL",
    minimumFractionDigits: hasDecimals ? 2 : 2,
    maximumFractionDigits: 2,
  });
};
const fmtInt = (n) => (n == null ? "—" : n.toLocaleString("pt-BR"));

// Small inline number input — used inside band rows for `from`, `to`, price
const NumInput = ({ value, onChange, suffix, prefix, placeholder, width = 64, allowNull = false, step = 1 }) => {
  const [draft, setDraft] = useStateQL(value == null ? "" : String(value));
  React.useEffect(() => {
    setDraft(value == null ? "" : String(value));
  }, [value]);
  const commit = () => {
    if (draft.trim() === "") {
      if (allowNull) onChange(null);
      else onChange(value);
      return;
    }
    const cleaned = draft.replace(",", ".").replace(/[^\d.]/g, "");
    const n = parseFloat(cleaned);
    if (!isNaN(n)) onChange(n);
    else setDraft(value == null ? "" : String(value));
  };
  return (
    <span className="ql-numwrap" style={{ width }}>
      {prefix && <span className="ql-affix">{prefix}</span>}
      <input
        type="text"
        inputMode="decimal"
        className="ql-num"
        value={draft}
        placeholder={placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") { e.preventDefault(); e.currentTarget.blur(); }
          if (e.key === "Escape") { setDraft(value == null ? "" : String(value)); e.currentTarget.blur(); }
        }}
      />
      {suffix && <span className="ql-affix">{suffix}</span>}
    </span>
  );
};

// --- The visual "stepped ruler" under the bands --------------------------
// Shows the included portion + each band as a stacked/flowing bar, with the
// last band optionally unbounded (shown with a fade-out to ∞).
const BandRuler = ({ quota }) => {
  // Compute a visual end. If the last band is unbounded, we pick
  // a "nice" extrapolation — 2x the largest visible boundary so the
  // unbounded band has visual room.
  const lastBand = quota.bands[quota.bands.length - 1];
  const unbounded = !lastBand || lastBand.to == null;
  const lastFinite = quota.bands.reduce((m, b) => (b.to != null ? Math.max(m, b.to) : m), quota.included.value);
  const visualEnd = unbounded ? Math.max(lastFinite * 1.5, quota.included.value * 2 + 10) : lastFinite;
  const total = Math.max(visualEnd, 1);

  // Segments in order: [included] then bands.
  const incWidth = (quota.included.value / total) * 100;
  const segments = [];
  segments.push({
    kind: "included",
    widthPct: incWidth,
    label: `Incluídos`,
    value: `${fmtInt(quota.included.value)} ${quota.included.value === 1 ? quota.unit : quota.unitPlural}`,
  });
  quota.bands.forEach((b, i) => {
    const bandEnd = b.to == null ? visualEnd : b.to;
    const bandStart = b.from;
    const w = Math.max(((bandEnd - bandStart + 1) / total) * 100, 3);
    segments.push({
      kind: "band",
      index: i,
      widthPct: w,
      unitPrice: b.unitPrice,
      unbounded: b.to == null,
      from: b.from,
      to: b.to,
    });
  });

  return (
    <div className="ql-ruler">
      <div className="ql-ruler-bar">
        {segments.map((s, i) => {
          if (s.kind === "included") {
            return (
              <div key={i} className="ql-seg ql-seg-included" style={{ flex: `${s.widthPct} 0 0` }}>
                <span className="ql-seg-tag">Incluso</span>
              </div>
            );
          }
          return (
            <div
              key={i}
              className={"ql-seg ql-seg-band" + (s.unbounded ? " ql-seg-unbounded" : "")}
              style={{ flex: `${s.widthPct} 0 0` }}
            >
              <span className="ql-seg-price">{fmtBRL(s.unitPrice)}</span>
            </div>
          );
        })}
      </div>
      <div className="ql-ruler-ticks">
        <span className="ql-tick">0</span>
        <span className="ql-tick ql-tick-highlight">
          {fmtInt(quota.included.value)}
        </span>
        {quota.bands.map((b, i) => (
          <span key={i} className="ql-tick">
            {b.to == null ? "∞" : fmtInt(b.to)}
          </span>
        ))}
      </div>
    </div>
  );
};

// --- Single band row -----------------------------------------------------
const BandRow = ({ band, prevTo, isLast, onChange, onRemove, canRemove, unit, unitPlural }) => {
  const unbounded = band.to == null;
  const suggestedFrom = prevTo != null ? prevTo + 1 : band.from;

  return (
    <div className={"ql-band-row" + (unbounded ? " unbounded" : "")}>
      <div className="ql-band-range">
        <span className="ql-band-label">De</span>
        <NumInput
          value={band.from}
          onChange={(v) => onChange({ ...band, from: v })}
          width={70}
        />
        <span className="ql-band-label">até</span>
        {unbounded ? (
          <button
            className="ql-infinity"
            onClick={() => onChange({ ...band, to: suggestedFrom + 9 })}
            title="Clique para definir um limite superior"
            type="button"
          >∞</button>
        ) : (
          <NumInput
            value={band.to}
            onChange={(v) => onChange({ ...band, to: v })}
            width={70}
            allowNull
            placeholder="∞"
          />
        )}
        <span className="ql-band-unit">{band.to === 1 || band.from === band.to ? unit : unitPlural}</span>
      </div>

      <div className="ql-band-price">
        <NumInput
          value={band.unitPrice}
          onChange={(v) => onChange({ ...band, unitPrice: v })}
          prefix="R$"
          width={100}
          step={0.01}
        />
        <span className="ql-band-per">/ {unit} / mês</span>
      </div>

      <div className="ql-band-actions">
        {isLast && !unbounded && (
          <button
            className="ql-band-ghost"
            type="button"
            onClick={() => onChange({ ...band, to: null })}
            title="Marcar como sem limite superior"
          >sem teto</button>
        )}
        {isLast && unbounded && band.from > suggestedFrom && null}
        <button
          className="ql-band-remove"
          type="button"
          disabled={!canRemove}
          onClick={onRemove}
          aria-label="Remover banda"
          title={canRemove ? "Remover banda" : "É necessário ter ao menos uma banda"}
        >
          <IClose size={12} />
        </button>
      </div>
    </div>
  );
};

// --- Single quota card ---------------------------------------------------
const QuotaRow = ({ quota, onChange, onRemove, onViewSource }) => {
  const { included, bands, label, unit, unitPlural } = quota;

  const updateIncluded = (v) => {
    onChange({
      ...quota,
      included: { ...included, value: v, confidence: "high" },
      // Shift the first band's `from` to included+1 automatically
      bands: bands.map((b, i) => (i === 0 ? { ...b, from: v + 1 } : b)),
    });
  };

  const updateBand = (i, next) => {
    const newBands = bands.map((b, idx) => (idx === i ? next : b));
    onChange({ ...quota, bands: newBands });
  };

  const removeBand = (i) => {
    onChange({ ...quota, bands: bands.filter((_, idx) => idx !== i) });
  };

  const addBand = () => {
    const last = bands[bands.length - 1];
    const lastTo = last && last.to != null ? last.to : (last ? last.from + 10 : included.value);
    const newFrom = lastTo + 1;
    // If the current last was unbounded, cap it before adding.
    let newBands = bands.slice();
    if (last && last.to == null) {
      newBands[newBands.length - 1] = { ...last, to: lastTo };
    }
    newBands.push({ from: newFrom, to: null, unitPrice: last ? last.unitPrice : 0 });
    onChange({ ...quota, bands: newBands });
  };

  return (
    <div className="ql-quota">
      <div className="ql-quota-head">
        <div className="ql-quota-head-main">
          <div className="ef-head" style={{ flex: 1 }}>
            <label className="ef-label">{label}</label>
            <div className="ef-meta">
              <ConfBadge level={quota.confidence || "high"} />
              {onViewSource && (
                <button type="button" className="ef-src" onClick={onViewSource}>
                  <IExternal size={11} /> Ver trecho
                </button>
              )}
            </div>
          </div>
        </div>
        <button
          type="button"
          className="ql-quota-remove"
          onClick={onRemove}
          aria-label={`Remover ${label}`}
          title="Remover este limite"
        >
          <IClose size={13} />
        </button>
      </div>

      <div className="ql-included">
        <span className="ql-included-prefix">Inclui</span>
        <NumInput
          value={included.value}
          onChange={updateIncluded}
          width={78}
        />
        <span className="ql-included-unit">
          {included.value === 1 ? unit : unitPlural}
        </span>
        <span className="ql-included-suffix">sem custo adicional</span>
      </div>

      <BandRuler quota={quota} />

      <div className="ql-bands-label">
        <span>Excedentes</span>
        <span className="ql-bands-hint">cada faixa cobra um valor por {unit} extra</span>
      </div>

      <div className="ql-bands">
        {bands.map((band, i) => (
          <BandRow
            key={i}
            band={band}
            prevTo={i > 0 ? bands[i - 1].to : included.value}
            isLast={i === bands.length - 1}
            onChange={(next) => updateBand(i, next)}
            onRemove={() => removeBand(i)}
            canRemove={bands.length > 1}
            unit={unit}
            unitPlural={unitPlural}
          />
        ))}
        <button type="button" className="ql-add-band" onClick={addBand}>
          <IPlus size={12} /> Adicionar faixa
        </button>
      </div>
    </div>
  );
};

// --- The whole card section ---------------------------------------------
const QuotaLimitsCard = ({ quotas, onChange, onViewSource, onAddQuota }) => {
  const updateQuota = (id, next) => {
    onChange(quotas.map((q) => (q.id === id ? next : q)));
  };
  const removeQuota = (id) => {
    onChange(quotas.filter((q) => q.id !== id));
  };

  return (
    <section className="review-card ql-card">
      <div className="rc-head">
        <div className="rc-head-main">
          <div className="rc-ico"><IGauge size={16} /></div>
          <div>
            <h3>Limites contratados e excedentes</h3>
            <div className="rc-sub">
              Quantidades inclusas no pacote e o que é cobrado quando a empresa
              passa do limite. Revise as faixas com atenção.
            </div>
          </div>
        </div>
      </div>

      <div className="ql-body">
        {quotas.length === 0 ? (
          <div className="ql-empty">
            <p>Nenhum limite quantitativo foi identificado neste contrato.</p>
            <button type="button" className="btn btn-ghost" onClick={onAddQuota}>
              <IPlus size={13} /> Adicionar um limite manualmente
            </button>
          </div>
        ) : (
          <>
            {quotas.map((q) => (
              <QuotaRow
                key={q.id}
                quota={q}
                onChange={(next) => updateQuota(q.id, next)}
                onRemove={() => removeQuota(q.id)}
                onViewSource={q.sourceKey ? () => onViewSource(q.sourceKey) : null}
              />
            ))}
            <button type="button" className="ql-add-quota" onClick={onAddQuota}>
              <IPlus size={13} /> Adicionar outro limite quantitativo
            </button>
          </>
        )}
      </div>
    </section>
  );
};

// --- Gauge icon (quantidades/medidor) — added locally to avoid editing Shared.jsx
const IGauge = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 18a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M12 18l5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="18" r="1.4" fill="currentColor" />
  </svg>
);

Object.assign(window, { QuotaLimitsCard, QUOTAS_DEFAULT, IGauge });
