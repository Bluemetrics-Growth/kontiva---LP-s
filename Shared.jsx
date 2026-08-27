// Kontiva MVP — Icons & Brand (globals)
// Exposed on window so multiple Babel <script> blocks can share

const { useState: useStateX, useEffect: useEffectX, useRef: useRefX } = React;

const Brand = ({ onDark, compact }) => (
  <div className={"brand-lockup" + (onDark ? " on-dark" : "") + (compact ? " compact" : "")}>
    {compact ? (
      <span className="k-mark" aria-label="Kontiva.ai">K</span>
    ) : (
      <>
        <span className="k">Kontiva</span>
        <span className="dot">.</span>
        <span className="ai">ai</span>
      </>
    )}
  </div>
);

const IChevron = ({ size = 14, dir = "left" }) => {
  const rot = { left: 180, right: 0, up: 270, down: 90 }[dir] || 0;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// --- icons (stroke-based, 1.6-2.2 weight, currentColor) ---
const IEye = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
      stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const IEyeOff = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 3l18 18M10.5 6.1A9.9 9.9 0 0 1 12 6c6 0 9.5 6 9.5 6a17.2 17.2 0 0 1-3.3 4.1M6.5 7.8A17.4 17.4 0 0 0 2.5 12S6 18 12 18a9.4 9.4 0 0 0 4-.9M9.9 9.9a3 3 0 1 0 4.2 4.2"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IArrow = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 5l7 7-7 7"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ITick = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IUpload = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 16V4M12 4l-5 5M12 4l5 5" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IDoc = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M6 3h8l4 4v14H6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M9 13h6M9 16h6M9 10h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IRadar = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 12 L19 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IBolt = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M13 3 4 14h7l-1 7 9-11h-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

const IHome = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"
      stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

const IUsers = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M15 20a4 4 0 0 1 6.5-3.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const ISettings = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const ICopy = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IPen = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M14 4l6 6-11 11H3v-6z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M13 5l6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const ICalendar = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3.5" y="5" width="17" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IMoney = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2.5" y="6" width="19" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    <path d="M6 10v4M18 10v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IPercent = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="7" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="17" cy="17" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    <path d="M19 5 5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IUser = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="1.6" />
    <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IScope = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M9 6h11M9 12h11M9 18h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="5" cy="6" r="1.4" fill="currentColor" />
    <circle cx="5" cy="12" r="1.4" fill="currentColor" />
    <circle cx="5" cy="18" r="1.4" fill="currentColor" />
  </svg>
);

const ICake = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 21h16M5 14h14v7H5zM12 10v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 6c0 1 1 1.5 2 1.5S14 7 14 6s-1-2-2-3c-1 1-2 2-2 3z"
      stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M5 18c1-1 2-1 3 0s2 1 3 0 2-1 3 0 2 1 3 0 2-1 2 0"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IClose = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IExternal = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M10 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-5M14 3h7v7M10 14 20 4"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ISparkle = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IPlus = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
  </svg>
);

const ISheet = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3.5" y="4" width="17" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3.5 9h17M3.5 14h17M9 4v16M15 4v16" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const ILock = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="4.5" y="10" width="15" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const IAlert = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 3 2.5 20h19L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M12 10v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1" fill="currentColor" />
  </svg>
);

const ITrendUp = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 17 10 10l4 4 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 7h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ITrendDown = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 7 10 14l4-4 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 17h6v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IDownload = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 4v12M7 11l5 5 5-5M5 20h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IShare = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="6" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="18" cy="6" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="18" cy="18" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8.4 11 15.6 7.2M8.4 13l7.2 3.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ---------- expose on window ----------
Object.assign(window, {
  Brand,
  IEye, IEyeOff, IArrow, ITick, IUpload, IDoc, IRadar, IBolt,
  IHome, IUsers, ISettings, ICopy,
  IPen, ICalendar, IMoney, IPercent, IUser, IScope, ICake,
  IClose, IExternal, ISparkle, IPlus, IChevron,
  ISheet, ILock, IAlert, ITrendUp, ITrendDown, IDownload, IShare,
});
