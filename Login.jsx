// Kontiva MVP — Login Variations

const { useState: useStateL } = React;

const DEMO_EMAIL = "demo@kontiva.ai";
const DEMO_PASSWORD = "demo";

// Small reusable demo credentials pill
const DemoPill = ({ onDark, onFill }) => (
  <div className={"demo-pill" + (onDark ? " on-dark" : "")}>
    <span className="demo-label">Demo</span>
    <div className="demo-creds">
      <span><b>demo@kontiva.ai</b></span>
      <span style={{ opacity: 0.75 }}>senha: <b>demo</b></span>
    </div>
    <button type="button" onClick={onFill}>Preencher</button>
  </div>
);

// ---------- Login form (shared) ----------
function useLoginForm(onSuccess) {
  const [email, setEmail] = useStateL("");
  const [pwd, setPwd] = useStateL("");
  const [show, setShow] = useStateL(false);
  const [err, setErr] = useStateL(null);
  const [loading, setLoading] = useStateL(false);

  const fill = () => { setEmail(DEMO_EMAIL); setPwd(DEMO_PASSWORD); setErr(null); };

  const submit = (e) => {
    e.preventDefault();
    setErr(null);
    if (!email.trim() || !pwd) { setErr("Preencha e-mail e senha."); return; }
    setLoading(true);
    setTimeout(() => {
      if (email.trim().toLowerCase() === DEMO_EMAIL && pwd === DEMO_PASSWORD) {
        onSuccess();
      } else {
        setErr("E-mail ou senha incorretos. Use as credenciais demo para entrar.");
        setLoading(false);
      }
    }, 700);
  };

  return { email, setEmail, pwd, setPwd, show, setShow, err, loading, fill, submit };
}

const LoginFormBody = ({ onDark, form }) => {
  const { email, setEmail, pwd, setPwd, show, setShow, err, loading, submit } = form;
  return (
    <form className="login-form" onSubmit={submit} noValidate>
      <div className="field">
        <label>E-mail</label>
        <input
          type="email"
          autoComplete="email"
          className={onDark ? "on-dark" : ""}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@escritorio.com.br"
        />
      </div>
      <div className="field">
        <label>Senha</label>
        <div style={{ position: "relative" }}>
          <input
            type={show ? "text" : "password"}
            autoComplete="current-password"
            className={onDark ? "on-dark" : ""}
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="••••••••"
            style={{ paddingRight: 44 }}
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            aria-label={show ? "Esconder senha" : "Mostrar senha"}
            style={{
              position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)",
              background: "transparent", border: "none", padding: 8, cursor: "pointer",
              color: onDark ? "rgba(234,246,255,0.55)" : "var(--cinza-texto)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}
          >
            {show ? <IEyeOff /> : <IEye />}
          </button>
        </div>
      </div>

      {err && <div className="login-error">{err}</div>}

      <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
        {loading ? "Entrando…" : "Entrar na Kontiva"}
        {!loading && <IArrow />}
      </button>

      <div className="forgot forgot-below">
        <a href="#" onClick={(e) => e.preventDefault()}>Esqueci minha senha</a>
      </div>
    </form>
  );
};

// ---------- Variant A: Split with radar mock ----------
const LoginSplit = ({ onSuccess }) => {
  const form = useLoginForm(onSuccess);

  const sampleRows = [
    { idx: "001", name: "Construtora Horizonte", amt: "R$ 3.820,00", badge: "Reajuste", flagged: true },
    { idx: "002", name: "Padaria São Jorge ME", amt: "R$ 1.240,00", badge: "OK", flagged: false },
    { idx: "003", name: "Studio M Arquitetura", amt: "R$ 1.640,00", badge: "Serviço extra", flagged: true },
    { idx: "004", name: "Clínica Vitta", amt: "R$ 2.150,00", badge: "OK", flagged: false },
  ];

  return (
    <div className="login-split">
      <div className="left">
        <div className="login-form-wrap">
          <Brand />
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              <span className="dot-cyan" /> Painel do contador
            </div>
            <h1>
              Bem-vindo<span style={{ color: "var(--ciano)" }}>.</span><br />
              A gente <span className="serif-accent">cuida</span> do ponto cego.
            </h1>
            <p className="sub" style={{ marginTop: 16 }}>
              Entre para continuar a varredura da sua carteira. Cada contrato lido é um
              ponto a menos escondido na planilha.
            </p>
          </div>

          <DemoPill onFill={form.fill} />
          <LoginFormBody form={form} />

          <div className="login-foot-meta">
            Sem conta ainda? <a href="#" onClick={(e) => e.preventDefault()}
              style={{ color: "var(--azul-profundo)", borderBottom: "1px solid rgba(10,31,63,0.2)", paddingBottom: 1 }}>
              Falar com a Kontiva no WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="right">
        <div>
          <div className="live-dot" style={{ marginBottom: 18 }}>Varredura ativa</div>
          <div className="right-quote">
            Enquanto você entra,<br />
            a gente <span className="hl">já está olhando</span> seus últimos contratos.
          </div>
        </div>

        <div className="right-mock radar-card" style={{ minHeight: 0, padding: 22 }}>
          <div className="radar-head" style={{ marginBottom: 14 }}>
            <span>Última varredura</span>
            <span style={{ fontFamily: "var(--font-mono)" }}>hoje · 08:42</span>
          </div>
          <div className="radar-list">
            {sampleRows.map((r) => (
              <div key={r.idx} className={"radar-row" + (r.flagged ? " flagged" : "")}>
                <span className="idx">#{r.idx}</span>
                <span className="name">{r.name}</span>
                <span className="amount">{r.amt}</span>
                <span className="badge">{r.badge}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="right-foot">
          <span>© Kontiva.ai · 2026</span>
          <span style={{ fontFamily: "var(--font-mono)" }}>v0.1 · protótipo</span>
        </div>
      </div>
    </div>
  );
};

// ---------- Variant B: Centered card on dark ----------
const LoginCentered = ({ onSuccess }) => {
  const form = useLoginForm(onSuccess);

  return (
    <div className="login-centered">
      <div className="top-brand">
        <Brand onDark />
        <div className="nav-links-mini">
          <a href="#" onClick={(e) => e.preventDefault()}>Ajuda</a>
        </div>
      </div>

      <div className="middle">
        <div className="card">
          <div className="eyebrow">
            <span className="dot-cyan" /> Entrar
          </div>
          <h1>
            Continue <span className="serif-accent">vendo</span><br />
            o que passou despercebido.
          </h1>
          <p className="sub">
            Só para contadores já cadastrados. O primeiro contrato da semana te espera.
          </p>

          <LoginFormBody onDark form={form} />

          <div style={{
            marginTop: 22, fontSize: 12,
            color: "rgba(234,246,255,0.45)", textAlign: "center", lineHeight: 1.5
          }}>
            Ainda não tem conta?{" "}
            <a href="#" onClick={(e) => e.preventDefault()}
              style={{ color: "var(--ciano)", borderBottom: "1px solid color-mix(in oklab, var(--ciano) 40%, transparent)", paddingBottom: 1 }}>
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="bottom-strip">
        <span>© Kontiva.ai · 2026</span>
        <span style={{ fontFamily: "var(--font-mono)" }}>Gestão contábil sem ponto cego</span>
      </div>
    </div>
  );
};

Object.assign(window, { LoginSplit, LoginCentered });
