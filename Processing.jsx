// Kontiva MVP — Processing / scan animation screen

const { useState: useStateP, useEffect: useEffectP } = React;

const PROC_STEPS_CONTRACT = [
  { key: "read", label: "Lendo o arquivo" },
  { key: "clauses", label: "Identificando cláusulas" },
  { key: "index", label: "Extraindo índice de reajuste" },
  { key: "scope", label: "Mapeando escopo e serviços" },
  { key: "done", label: "Pronto — relatório gerado" },
];

const PROC_STEPS_BILLING = [
  { key: "read", label: "Lendo os lançamentos" },
  { key: "match", label: "Cruzando com as cláusulas" },
  { key: "index", label: "Verificando reajuste aplicado" },
  { key: "scope", label: "Conferindo escopo e extras" },
  { key: "calc", label: "Calculando divergências" },
  { key: "done", label: "Análise concluída" },
];

const Processing = ({ fileName, clientName, mode = "contract", onDone, onCancel }) => {
  const [step, setStep] = useStateP(0);
  const steps = mode === "billing" ? PROC_STEPS_BILLING : PROC_STEPS_CONTRACT;

  useEffectP(() => {
    if (step >= steps.length - 1) return;
    const t = setTimeout(() => setStep(step + 1), step === 0 ? 900 : 1200);
    return () => clearTimeout(t);
  }, [step, steps.length]);

  const allDone = step >= steps.length - 1;
  const isBilling = mode === "billing";

  return (
    <div className="processing">
      <div className="radar-wrap">
        <div className="ring r3" />
        <div className="ring r2" />
        <div className="ring r1" />
        <div className="pip p1" />
        <div className="pip p2" />
        <div className="pip p3" />
        <div className="sweep" />
        <div className="center-dot" />
      </div>

      <div className="live-dot" style={{ marginBottom: 16 }}>
        {allDone
          ? (isBilling ? "Análise concluída" : "Varredura concluída")
          : (isBilling ? "Cruzando dados" : "Varredura em andamento")}
      </div>

      <h1>
        {allDone
          ? isBilling
            ? <>Descobrimos <span className="serif-accent">o que não bate</span>.</>
            : <>Pronto. A gente <span className="serif-accent">encontrou</span> o que importava.</>
          : isBilling
            ? <>A Kontiva está <span className="serif-accent">conferindo</span> a cobrança.</>
            : <>A Kontiva está <span className="serif-accent">lendo</span> seu contrato.</>}
      </h1>

      {fileName && (
        <div className="file-chip">
          <IDoc size={14} />
          <span>{fileName}</span>
          {clientName && (
            <>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{clientName}</span>
            </>
          )}
        </div>
      )}

      <div className="steps-log">
        {steps.map((s, i) => {
          const done = i < step || (i === steps.length - 1 && allDone);
          const active = i === step && !allDone;
          const pending = i > step;
          return (
            <div
              key={s.key}
              className={"step" + (done ? " done" : "") + (active ? " active" : "")}
            >
              <span className={"ico" + (active ? " spinner" : "")}>
                {done && <ITick size={10} />}
              </span>
              <span>{s.label}</span>
              <span style={{
                marginLeft: "auto", fontFamily: "var(--font-mono)",
                fontSize: 11, color: "rgba(234,246,255,0.4)"
              }}>
                {done ? "ok" : active ? "…" : pending ? "—" : ""}
              </span>
            </div>
          );
        })}
      </div>

      <div className="caption">
        {allDone
          ? isBilling
            ? "Achamos divergências. Vamos ver quanto está custando."
            : "Tudo extraído. Vamos revisar juntos antes de salvar."
          : "Isso normalmente leva menos de 30 segundos."}
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
        {allDone ? (
          <>
            <button
              className="btn btn-primary"
              onClick={onDone}
            >
              {isBilling ? "Ver análise completa" : "Revisar dados extraídos"} <IArrow />
            </button>
            <button className="btn btn-ghost on-dark" onClick={onCancel}>
              {isBilling ? "Enviar outro relatório" : "Enviar outro contrato"}
            </button>
          </>
        ) : (
          <button className="btn btn-ghost on-dark" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { Processing });
