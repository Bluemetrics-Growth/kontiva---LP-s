/* Kontiva.ai — Logo explorations */

const C = {
  azul:   '#0A1F3F',
  ciano:  '#00D4FF',
  cianoMid: '#00A8CC',
  papel:  '#F7F5EE',
  branco: '#FFFFFF',
};

// Shared wordmark renderer
const Wordmark = ({ size = 40, color = C.azul, accent = C.ciano, family = "'Space Grotesk', sans-serif", weight = 700, tracking = '-0.04em', aiStyle = 'subscript' }) => (
  <div style={{
    display:'inline-flex', alignItems:'baseline',
    fontFamily: family, fontWeight: weight,
    fontSize: size, letterSpacing: tracking, color,
    lineHeight: 1,
  }}>
    <span>kontiva</span>
    {aiStyle === 'subscript' && (
      <span style={{
        fontSize: size * 0.32, color: accent, fontWeight: 500,
        marginLeft: size * 0.08, transform:`translateY(${size*0.1}px)`,
        letterSpacing: '0.02em',
      }}>.ai</span>
    )}
    {aiStyle === 'dot-accent' && (
      <>
        <span style={{ color: accent }}>.</span>
        <span style={{ fontSize: size * 0.4, fontWeight: 500, marginLeft: 2 }}>ai</span>
      </>
    )}
    {aiStyle === 'tiny-mono' && (
      <span style={{
        fontFamily:"'JetBrains Mono', monospace", fontSize: size * 0.22,
        color: accent, marginLeft: size * 0.1, letterSpacing:'0.06em',
        alignSelf:'center', transform:`translateY(${size*0.15}px)`,
      }}>.ai</span>
    )}
  </div>
);

// ─── 01. Aperture K — K built from a focusing mira/lens ──────────
const LogoAperture = ({ size = 120, onDark = false }) => {
  const fg = onDark ? C.branco : C.azul;
  const ac = C.ciano;
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} fill="none">
      {/* outer ring */}
      <circle cx="60" cy="60" r="52" stroke={fg} strokeWidth="3"/>
      {/* K carved from aperture blades */}
      <path d="M42 30 V90" stroke={fg} strokeWidth="10" strokeLinecap="square"/>
      <path d="M42 60 L78 30" stroke={fg} strokeWidth="10" strokeLinecap="square"/>
      <path d="M42 60 L78 90" stroke={fg} strokeWidth="10" strokeLinecap="square"/>
      {/* ciano focus dot at the K vertex */}
      <circle cx="42" cy="60" r="5" fill={ac}/>
      <circle cx="42" cy="60" r="10" stroke={ac} strokeWidth="1.5" opacity="0.5"/>
    </svg>
  );
};

// ─── 02. Scan K — the K is half-drawn, being revealed by a scan line ──
const LogoScan = ({ size = 120, onDark = false }) => {
  const fg = onDark ? C.branco : C.azul;
  const ac = C.ciano;
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} fill="none">
      {/* K built from strokes, left half dotted, right half solid */}
      <line x1="30" y1="20" x2="30" y2="100" stroke={fg} strokeWidth="11" strokeLinecap="square"/>
      <line x1="30" y1="60" x2="90" y2="20" stroke={fg} strokeWidth="11" strokeLinecap="square"/>
      <line x1="30" y1="60" x2="90" y2="100" stroke={fg} strokeWidth="11" strokeLinecap="square"/>
      {/* scan beam */}
      <rect x="55" y="10" width="4" height="100" fill={ac}/>
      <rect x="55" y="10" width="18" height="100" fill={`url(#scan-grad)`} opacity="0.6"/>
      <defs>
        <linearGradient id="scan-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={ac} stopOpacity="0.8"/>
          <stop offset="1" stopColor={ac} stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

// ─── 03. Clause K — contract with highlighted clause forms the K arms ──
const LogoClause = ({ size = 120, onDark = false }) => {
  const fg = onDark ? C.branco : C.azul;
  const ac = C.ciano;
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} fill="none">
      {/* document */}
      <rect x="22" y="14" width="64" height="92" rx="4" stroke={fg} strokeWidth="3"/>
      {/* page lines forming K structure */}
      <rect x="32" y="28" width="38" height="3" fill={fg} opacity="0.25"/>
      <rect x="32" y="38" width="28" height="3" fill={fg} opacity="0.25"/>
      {/* highlighted clause = ciano block; 2 lines = K diagonals */}
      <rect x="32" y="50" width="44" height="8" fill={ac}/>
      <rect x="32" y="62" width="44" height="8" fill={ac}/>
      <rect x="32" y="74" width="30" height="3" fill={fg} opacity="0.25"/>
      <rect x="32" y="84" width="34" height="3" fill={fg} opacity="0.25"/>
      <rect x="32" y="94" width="22" height="3" fill={fg} opacity="0.25"/>
      {/* K monogram mark overlaid */}
      <g transform="translate(78,10)">
        <circle r="14" cx="14" cy="14" fill={ac}/>
        <path d="M9 6 V22 M9 14 L19 6 M9 14 L19 22" stroke={C.azul} strokeWidth="2.4" strokeLinecap="square"/>
      </g>
    </svg>
  );
};

// ─── 04. Radar K — concentric rings + K as the sweep target ─────────
const LogoRadar = ({ size = 120, onDark = false }) => {
  const fg = onDark ? C.branco : C.azul;
  const ac = C.ciano;
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} fill="none">
      <circle cx="60" cy="60" r="50" stroke={fg} strokeWidth="1.5" opacity="0.3"/>
      <circle cx="60" cy="60" r="34" stroke={fg} strokeWidth="1.5" opacity="0.5"/>
      <circle cx="60" cy="60" r="18" stroke={fg} strokeWidth="1.5" opacity="0.8"/>
      {/* sweep wedge */}
      <path d="M60 60 L110 35 A55 55 0 0 0 100 20 Z" fill={ac} opacity="0.22"/>
      {/* solid K centered */}
      <g transform="translate(42, 36)">
        <path d="M0 0 V48" stroke={fg} strokeWidth="7" strokeLinecap="square"/>
        <path d="M0 24 L28 0" stroke={fg} strokeWidth="7" strokeLinecap="square"/>
        <path d="M0 24 L28 48" stroke={fg} strokeWidth="7" strokeLinecap="square"/>
        <circle cx="0" cy="24" r="4.5" fill={ac}/>
      </g>
    </svg>
  );
};

// ─── 05. Geometric K — pure type, a single construction ────────────
const LogoGeometric = ({ size = 120, onDark = false }) => {
  const fg = onDark ? C.branco : C.azul;
  const ac = C.ciano;
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} fill="none">
      {/* Chunky K with chamfered cuts */}
      <path
        d="M22 18 H42 V54 L74 18 H98 L64 56 L100 102 H76 L48 66 L42 72 V102 H22 Z"
        fill={fg}
      />
      {/* ciano accent — tiny wedge where the diagonals meet */}
      <path d="M42 56 L48 62 L42 68 Z" fill={ac}/>
    </svg>
  );
};

// ─── 06. Vision K — eye/pupil + K as iris structure ────────────────
const LogoVision = ({ size = 120, onDark = false }) => {
  const fg = onDark ? C.branco : C.azul;
  const ac = C.ciano;
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} fill="none">
      {/* eye shape */}
      <path d="M8 60 Q60 10 112 60 Q60 110 8 60 Z" stroke={fg} strokeWidth="3" fill="none"/>
      {/* iris */}
      <circle cx="60" cy="60" r="26" fill={fg}/>
      {/* K inside iris */}
      <g transform="translate(45, 44)">
        <path d="M0 0 V32" stroke={C.papel} strokeWidth="5" strokeLinecap="square"/>
        <path d="M0 16 L18 0" stroke={C.papel} strokeWidth="5" strokeLinecap="square"/>
        <path d="M0 16 L18 32" stroke={C.papel} strokeWidth="5" strokeLinecap="square"/>
      </g>
      {/* ciano glint */}
      <circle cx="72" cy="52" r="5" fill={ac}/>
    </svg>
  );
};

// ─── Artboard helpers ──────────────────────────────────────────────

const Board = ({ children, onDark = false, pad = 32, w = 280, h = 200 }) => (
  <div style={{
    width: w, height: h, background: onDark ? C.azul : C.papel,
    display:'flex', alignItems:'center', justifyContent:'center',
    padding: pad,
  }}>{children}</div>
);

const LockupBoard = ({ Logo, wordSize = 44, onDark = false, family, aiStyle = 'subscript', w = 360, h = 140 }) => (
  <div style={{
    width: w, height: h, background: onDark ? C.azul : C.papel,
    display:'flex', alignItems:'center', justifyContent:'center', gap: 16,
  }}>
    <Logo size={64} onDark={onDark}/>
    <Wordmark
      size={wordSize}
      family={family}
      color={onDark ? C.branco : C.azul}
      accent={C.ciano}
      aiStyle={aiStyle}
    />
  </div>
);

const FaviconBoard = ({ Logo, onDark = false }) => (
  <div style={{
    width: 120, height: 120, background: onDark ? C.azul : C.papel,
    display:'flex', alignItems:'center', justifyContent:'center',
  }}>
    <div style={{
      width: 48, height: 48, background: onDark ? '#122A52' : C.branco,
      borderRadius: 10, display:'flex', alignItems:'center', justifyContent:'center',
      boxShadow: onDark ? 'inset 0 0 0 1px rgba(255,255,255,0.08)' : 'inset 0 0 0 1px rgba(10,31,63,0.08)',
    }}>
      <Logo size={32} onDark={onDark}/>
    </div>
  </div>
);

// ─── Option row — logo mark + lockups + favicon ────────────────────

const Option = ({ n, title, blurb, Logo, family, aiStyle }) => (
  <DCSection
    title={`0${n} — ${title}`}
    subtitle={blurb}
  >
    <DCArtboard label="Símbolo · claro" width={280} height={200}>
      <Board><Logo size={120}/></Board>
    </DCArtboard>
    <DCArtboard label="Símbolo · escuro" width={280} height={200}>
      <Board onDark><Logo size={120} onDark/></Board>
    </DCArtboard>
    <DCArtboard label="Lockup horizontal" width={360} height={140}>
      <LockupBoard Logo={Logo} family={family} aiStyle={aiStyle}/>
    </DCArtboard>
    <DCArtboard label="Lockup escuro" width={360} height={140}>
      <LockupBoard Logo={Logo} family={family} aiStyle={aiStyle} onDark/>
    </DCArtboard>
    <DCArtboard label="App icon" width={120} height={120}>
      <FaviconBoard Logo={Logo}/>
    </DCArtboard>
    <DCArtboard label="App icon · escuro" width={120} height={120}>
      <FaviconBoard Logo={Logo} onDark/>
    </DCArtboard>
  </DCSection>
);

// ─── Root app ──────────────────────────────────────────────────────

const App = () => {
  const options = [
    { n:1, title:'Aperture', blurb:'K dentro de uma lente/mira. Precisão + foco. "Gestão sem ponto cego" literal.', Logo: LogoAperture, family:"'Space Grotesk', sans-serif", aiStyle:'subscript' },
    { n:2, title:'Scan',     blurb:'K sendo varrido pelo feixe ciano. Radar + revelação em um gesto só.',         Logo: LogoScan,     family:"'Space Grotesk', sans-serif", aiStyle:'tiny-mono' },
    { n:3, title:'Clause',   blurb:'Contrato com a cláusula destacada. K monograma acompanha o documento.',      Logo: LogoClause,   family:"'Inter', sans-serif",         aiStyle:'dot-accent' },
    { n:4, title:'Radar',    blurb:'Anéis concêntricos + setor de varredura. K no centro, sólido.',             Logo: LogoRadar,    family:"'Space Grotesk', sans-serif", aiStyle:'subscript' },
    { n:5, title:'Geometric',blurb:'Tipografia pura. K chanfrado, só uma faísca ciano onde as diagonais se encontram.', Logo: LogoGeometric, family:"'Space Grotesk', sans-serif", aiStyle:'subscript' },
    { n:6, title:'Vision',   blurb:'Olho/íris com K dentro. Mais humano, mais "consultor que enxerga".',         Logo: LogoVision,   family:"'Sora', sans-serif",          aiStyle:'tiny-mono' },
  ];

  return (
    <DesignCanvas>
      <div style={{ padding:'0 60px 40px' }}>
        <div style={{ fontSize: 28, fontWeight: 600, color:'rgba(40,30,20,0.9)', letterSpacing:-0.4 }}>
          Kontiva.ai — Propostas de logo
        </div>
        <div style={{ fontSize: 14, color:'rgba(60,50,40,0.65)', marginTop: 6, maxWidth: 680 }}>
          Seis direções. K geométrico como espinha dorsal, atravessado por conceitos diferentes —
          mira, radar, contrato, olho, tipografia pura. Paleta: azul profundo + ciano elétrico.
          .ai sempre em tom menor, nunca dominante.
        </div>
      </div>
      {options.map(o => <Option key={o.n} {...o}/>)}
      <DCPostIt top={40} right={60} rotate={3} width={220}>
        Role lateralmente em cada linha para ver todas as aplicações. Me diga qual (ou quais) querem que eu desenvolva mais.
      </DCPostIt>
    </DesignCanvas>
  );
};

ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
