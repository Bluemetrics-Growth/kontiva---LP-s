/* @ds-bundle: {"format":4,"namespace":"KontivaDesignSystem_59d8c4","components":[{"name":"Card","sourcePath":"ds/cards/Card.jsx"},{"name":"RadarCard","sourcePath":"ds/cards/RadarCard.jsx"},{"name":"Badge","sourcePath":"ds/core/Badge.jsx"},{"name":"IconWhats","sourcePath":"ds/core/Button.jsx"},{"name":"Button","sourcePath":"ds/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"ds/core/Eyebrow.jsx"},{"name":"LangToggle","sourcePath":"ds/core/LangToggle.jsx"},{"name":"Field","sourcePath":"ds/forms/Field.jsx"},{"name":"Footer","sourcePath":"ds/site/Footer.jsx"},{"name":"Nav","sourcePath":"ds/site/Nav.jsx"}],"sourceHashes":{"MVP/components/App.jsx":"2b1b551e573b","MVP/components/BillingData.jsx":"497c25d8fcda","MVP/components/BillingResult.jsx":"93e6ed362d34","MVP/components/BillingUpload.jsx":"72f58045f04f","MVP/components/ClientDetail.jsx":"0049daf983bf","MVP/components/ClientsData.jsx":"8ef8dca35cf4","MVP/components/ClientsList.jsx":"42f6657ffee9","MVP/components/ContractsList.jsx":"bcc3dd52044d","MVP/components/Documents.jsx":"d3b77c157101","MVP/components/DocumentsData.jsx":"8d649bfd7d33","MVP/components/Login.jsx":"b03304a7a31e","MVP/components/Processing.jsx":"dc05e0a94f79","MVP/components/QuotaLimits.jsx":"6d5b35b0ddf3","MVP/components/Review.jsx":"443ea6d1cafe","MVP/components/ReviewData.jsx":"1e2c11d017de","MVP/components/ReviewDrawer.jsx":"565c7ad29f16","MVP/components/Shared.jsx":"2ab862346a3a","MVP/components/Upload.jsx":"7110868b5a74","MVP/components/Workspace.jsx":"a7c93184cc4b","MVP/design-canvas.jsx":"5d0e39003628","components/hero.jsx":"d2adddd43146","components/sections.jsx":"21a008391207","deck-stage.js":"a97cdfea91e3","design-canvas.jsx":"3fc2600126c0","ds/cards/Card.jsx":"fe06191e0991","ds/cards/RadarCard.jsx":"df2f1ba002d4","ds/core/Badge.jsx":"e5044dba3054","ds/core/Button.jsx":"32ce6d68b01d","ds/core/Eyebrow.jsx":"24eb2156c85a","ds/core/LangToggle.jsx":"73ad65489847","ds/forms/Field.jsx":"922d0e93ae16","ds/site/Footer.jsx":"43c4f3d425ff","ds/site/Nav.jsx":"e07a89736a31","logo/design-canvas.jsx":"3fc2600126c0","logo/logos.jsx":"8a7e20ae1326","v2/kontiva-app.jsx":"ad3fd40374a4","v2/kontiva-base.jsx":"b89989ab8713","v2/kontiva-i18n.js":"177b48d81740","v2/kontiva-sections-a.jsx":"bd83cea85259","v2/kontiva-sections-b.jsx":"29941937837a","v2/kontiva-sections-c.jsx":"dfee74a7a052"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.KontivaDesignSystem_59d8c4 = window.KontivaDesignSystem_59d8c4 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// MVP/components/App.jsx
try { (() => {
// Kontiva MVP — App router (Login → Upload → Process → Review → BillingUpload → BillingProcess → BillingResult)

const {
  useState: useStateA,
  useEffect: useEffectA
} = React;
const USER_DISPLAY = "Marcos Guedes";
const CLIENT_NAME = "Construtora Horizonte Ltda.";
const MVPApp = ({
  variant = "b",
  embedded = false,
  storageKey
}) => {
  const SK = storageKey || `kontiva-mvp-${variant}-route`;
  const [route, setRoute] = useStateA(() => {
    if (typeof localStorage === "undefined") return "login";
    return localStorage.getItem(SK) || "login";
  });
  const [fileInfo, setFileInfo] = useStateA(null);
  const [billingScenario, setBillingScenario] = useStateA("calc");
  const [currentClientId, setCurrentClientId] = useStateA("horizonte");
  useEffectA(() => {
    try {
      localStorage.setItem(SK, route);
    } catch (e) {}
  }, [route, SK]);
  const goLogin = () => {
    setRoute("login");
    setFileInfo(null);
  };
  const goUpload = () => setRoute("upload");
  const goProcessing = file => {
    setFileInfo({
      name: file && file.name ? file.name : "Contrato.pdf"
    });
    setRoute("processing");
  };
  const goReview = () => setRoute("review");
  const goBillingUpload = () => setRoute("billing_upload");
  const goBillingProcessing = (file, scenario) => {
    setFileInfo({
      name: file && file.name ? file.name : "Lançamentos.xlsx"
    });
    if (scenario) setBillingScenario(scenario);
    setRoute("billing_processing");
  };
  const goBillingResult = () => setRoute("billing_result");
  const goClients = () => setRoute("clients");
  const handleNavClick = key => {
    if (key === "clients") setRoute("clients");else if (key === "home") setRoute("upload");else if (key === "contracts") setRoute("contracts");else if (key === "documents") setRoute("documents");
  };
  const openClient = c => {
    if (c && c.id) setCurrentClientId(c.id);
    setRoute("client_detail");
  };
  const openContract = contract => {
    // Only the Horizonte demo has a full contract review mock; others route there too
    // as a demonstrative stub (same underlying review screen).
    setRoute("review");
  };
  const Login = variant === "b" ? LoginCentered : LoginSplit;
  const Upload = variant === "b" ? UploadWorkspace : UploadCentered;
  let body;
  if (route === "login") {
    body = /*#__PURE__*/React.createElement(Login, {
      onSuccess: goUpload
    });
  } else if (route === "upload") {
    body = /*#__PURE__*/React.createElement(Upload, {
      user: USER_DISPLAY,
      onFile: goProcessing,
      onLogout: goLogin,
      onNavClick: handleNavClick
    });
  } else if (route === "processing") {
    body = /*#__PURE__*/React.createElement(Processing, {
      fileName: fileInfo && fileInfo.name,
      mode: "contract",
      onDone: goReview,
      onCancel: goUpload
    });
  } else if (route === "review") {
    body = /*#__PURE__*/React.createElement(Review, {
      user: USER_DISPLAY,
      fileName: fileInfo && fileInfo.name,
      onConfirm: goBillingUpload,
      onLogout: goLogin,
      onNavClick: handleNavClick
    });
  } else if (route === "billing_upload") {
    body = /*#__PURE__*/React.createElement(BillingUpload, {
      user: USER_DISPLAY,
      clientName: CLIENT_NAME,
      onFile: goBillingProcessing,
      onBack: goReview,
      onLogout: goLogin,
      onNavClick: handleNavClick
    });
  } else if (route === "billing_processing") {
    body = /*#__PURE__*/React.createElement(Processing, {
      fileName: fileInfo && fileInfo.name,
      clientName: CLIENT_NAME,
      mode: "billing",
      onDone: goBillingResult,
      onCancel: goBillingUpload
    });
  } else if (route === "clients") {
    body = /*#__PURE__*/React.createElement(ClientsList, {
      user: USER_DISPLAY,
      onLogout: goLogin,
      onOpenClient: openClient,
      onNavClick: handleNavClick
    });
  } else if (route === "contracts") {
    body = /*#__PURE__*/React.createElement(ContractsList, {
      user: USER_DISPLAY,
      onLogout: goLogin,
      onOpenClient: openClient,
      onNavClick: handleNavClick
    });
  } else if (route === "documents") {
    body = /*#__PURE__*/React.createElement(DocumentsList, {
      user: USER_DISPLAY,
      onLogout: goLogin,
      onNavClick: handleNavClick
    });
  } else if (route === "client_detail") {
    const client = typeof findClient === "function" && findClient(currentClientId) || CLIENTS[0];
    body = /*#__PURE__*/React.createElement(ClientDetail, {
      user: USER_DISPLAY,
      client: client,
      onLogout: goLogin,
      onBack: goClients,
      onOpenContract: openContract,
      onNavClick: handleNavClick
    });
  } else if (route === "billing_result") {
    body = /*#__PURE__*/React.createElement(BillingResult, {
      user: USER_DISPLAY,
      clientName: CLIENT_NAME,
      scenario: billingScenario,
      onBack: goBillingUpload,
      onLogout: goLogin,
      onNavClick: handleNavClick
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: embedded ? "100%" : "100vh",
      overflow: "auto",
      background: "var(--branco)",
      position: "relative"
    }
  }, body);
};
Object.assign(window, {
  MVPApp
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "MVP/components/App.jsx", error: String((e && e.message) || e) }); }

// MVP/components/BillingData.jsx
try { (() => {
// Kontiva MVP — Billing comparison mock data
// PERSPECTIVA: Escritório contábil "Santos & Contadores" analisando quanto
// deve cobrar do seu cliente "Construtora Horizonte Ltda."
//
// Dois cenários:
//   • calc   — Só relatório de serviços prestados. Kontiva calcula quanto o
//              escritório DEVE COBRAR agora.
//   • audit  — Relatório + boleto/NF já emitida. Kontiva compara quanto foi
//              EFETIVAMENTE COBRADO × quanto DEVERIA TER SIDO COBRADO.
//              Pode apontar sub-cobrança (perda de receita) ou
//              super-cobrança (risco de imagem).

const CONTRACT_BASELINE = {
  monthly: 3820.00,
  index: "IPCA",
  indexPercent: 4.83,
  anniversaryMonth: "março",
  scope: "Escrituração fiscal, folha de pagamento, apuração de tributos",
  extraFeeBase: "Hora técnica a R$ 180 para serviços fora do escopo"
};

// ==========================================================================
// CENÁRIO A — Só relatório. Quanto o escritório deve cobrar no mês corrente.
// ==========================================================================
const CALC_MONTH = {
  reference: "Maio/2025",
  period: "01/05 a 31/05",
  dueDate: "10/06/2025",
  baseWithReadjustment: 4004.47,
  // 3820 * 1.0483
  extrasTotal: 540.00,
  totalToCharge: 4544.47
};

// What the report recorded — hours / extra services the office actually did
const CALC_LINE_ITEMS = [{
  id: "base",
  kind: "base",
  label: "Honorários contábeis — mensalidade",
  clause: "Cláusula 3 + Cláusula 5",
  detail: "Valor base R$ 3.820,00 × reajuste IPCA de 4,83% aplicado em mar/2025.",
  expected: 4004.47,
  meta: "Valor fixo contratual"
}, {
  id: "cert",
  kind: "extra",
  label: "Emissão de certidões negativas",
  clause: "Cláusula 4.2 — Serviços extras",
  detail: "2 horas técnicas registradas por Ana Paula em 14/05. Autorização por e-mail no dia 12/05.",
  expected: 360.00,
  meta: "2 h × R$ 180 — hora técnica"
}, {
  id: "filial",
  kind: "extra",
  label: "Abertura de filial — Campinas",
  clause: "Cláusula 4.2 — Serviços extras",
  detail: "1 hora de apoio documental (Rogério, 22/05). Cliente aprovou em reunião gravada.",
  expected: 180.00,
  meta: "1 h × R$ 180 — hora técnica"
}];

// Observations Kontiva wants the office to notice before sending the bill
const CALC_NOTES = [{
  id: "aniversario",
  type: "info",
  title: "Reajuste IPCA já incorporado",
  body: "Este é o 3º mês cobrando o valor reajustado (R$ 4.004,47). A regra do contrato é IPCA acumulado em 12 meses no aniversário (março). Confirmado."
}, {
  id: "autorizacao",
  type: "check",
  title: "Serviços extras têm autorização por escrito",
  body: "Tanto a emissão das certidões (R$ 360) quanto o apoio na abertura de filial (R$ 180) têm autorização registrada. Anexar os comprovantes ao boleto para evitar questionamento."
}, {
  id: "vencimento",
  type: "info",
  title: "Vencimento sugerido: 10/06/2025",
  body: "Conforme cláusula 6, o boleto vence todo dia 10. Emitir até 05/06 dá margem confortável para o cliente pagar."
}];

// ==========================================================================
// CENÁRIO B — Auditoria. Três variantes (sub, super, misto) simulando o que o
// escritório realmente cobrou. Mantemos as três e escolhemos uma como default
// do demo; a tela expõe a mais didática (mista).
// ==========================================================================
const AUDIT_MONTHS = [{
  month: "Março/2025",
  period: "01/03 a 31/03",
  expected: 4004.47,
  // valor contratual + extras do mês
  charged: 3820.00,
  // o que o escritório realmente emitiu
  status: "undercharged",
  delta: -184.47,
  items: [{
    label: "Honorários contábeis",
    expected: 4004.47,
    charged: 3820.00,
    delta: -184.47,
    status: "undercharged",
    note: "Reajuste IPCA de 4,83% não foi aplicado no mês de aniversário. O boleto saiu com o valor antigo."
  }]
}, {
  month: "Abril/2025",
  period: "01/04 a 30/04",
  expected: 4184.47,
  // base + 1h extra de certidão
  charged: 4004.47,
  // emitiu só a base com reajuste
  status: "undercharged",
  delta: -180.00,
  items: [{
    label: "Honorários contábeis",
    expected: 4004.47,
    charged: 4004.47,
    delta: 0,
    status: "ok"
  }, {
    label: "Emissão de certidão negativa (1h)",
    expected: 180.00,
    charged: 0,
    delta: -180.00,
    status: "undercharged",
    note: "Serviço prestado em 18/04 com autorização, mas não entrou no boleto."
  }]
}, {
  month: "Maio/2025",
  period: "01/05 a 31/05",
  expected: 4544.47,
  // base + 2h certidão + 1h filial
  charged: 4820.00,
  // emitiu valor cheio, cobrou a mais
  status: "overcharged",
  delta: 275.53,
  items: [{
    label: "Honorários contábeis",
    expected: 4004.47,
    charged: 4004.47,
    delta: 0,
    status: "ok"
  }, {
    label: "Serviços extras (3h técnicas)",
    expected: 540.00,
    charged: 815.53,
    delta: 275.53,
    status: "overcharged",
    note: "Foram registradas 3 horas, mas o boleto cobrou como 4h53min. Provável erro de conversão de minutos."
  }]
}];

// High-level findings (para o cenário de auditoria)
const AUDIT_FINDINGS = [{
  id: "miss_reajuste",
  severity: "loss",
  // perda financeira para o escritório
  title: "Reajuste IPCA não aplicado em março",
  amount: 184.47,
  direction: "under",
  months: ["Março/2025"],
  clause: "Cláusula 5 — Reajuste anual",
  summary: "Em março — mês do aniversário do contrato — o boleto saiu com R$ 3.820,00, o valor antigo. O IPCA acumulado de 4,83% deveria ter levado a mensalidade para R$ 4.004,47. Você deixou R$ 184,47 na mesa só nesse mês.",
  expected: "R$ 4.004,47",
  charged: "R$ 3.820,00",
  action: "Emitir fatura complementar do reajuste retroativo, amparada na cláusula 5 e no IPCA do IBGE."
}, {
  id: "miss_extra",
  severity: "loss",
  title: "Serviço extra prestado e não cobrado",
  amount: 180.00,
  direction: "under",
  months: ["Abril/2025"],
  clause: "Cláusula 4.2 — Serviços extras",
  summary: "Ana Paula emitiu uma certidão negativa em 18/04 (1h técnica, R$ 180). O serviço tem autorização por e-mail do cliente, mas não entrou no boleto de abril.",
  expected: "R$ 180,00",
  charged: "R$ 0,00",
  action: "Incluir na próxima fatura com referência ao serviço prestado e à autorização."
}, {
  id: "over_hora",
  severity: "risk",
  // risco de imagem — cobrou a mais
  title: "Horas técnicas faturadas acima do registrado",
  amount: 275.53,
  direction: "over",
  months: ["Maio/2025"],
  clause: "Cláusula 4.2 — Serviços extras",
  summary: "O apontamento do time registra 3 horas no mês, mas o boleto foi emitido como se fossem ~4h53min. Diferença de R$ 275,53 cobrada a mais do cliente. Vale revisar antes que ele conteste.",
  expected: "R$ 540,00",
  charged: "R$ 815,53",
  action: "Emitir nota de crédito de R$ 275,53 e comunicar o cliente — preserva a relação e evita contestação."
}];
const AUDIT_SUMMARY = {
  monthsAnalyzed: 3,
  monthsWithIssues: 3,
  itemsFlagged: 3,
  totalExpected: 12733.41,
  // soma do "deveria ter cobrado"
  totalCharged: 12644.47,
  // soma do "efetivamente cobrou"
  undercharged: 364.47,
  // perda
  overcharged: 275.53,
  // cobrado a mais
  netDelta: -88.94,
  // líquido: ainda perdeu R$ 88,94
  // projeção se o padrão de perda continuar por 12 meses
  annualLossProjection: 364.47 * 4 // ~R$ 1.457
};

// ==========================================================================
// CENÁRIO A — Summary para a hero do resultado
// ==========================================================================
const CALC_SUMMARY = {
  reference: CALC_MONTH.reference,
  total: CALC_MONTH.totalToCharge,
  base: CALC_MONTH.baseWithReadjustment,
  extras: CALC_MONTH.extrasTotal,
  itemsCount: CALC_LINE_ITEMS.length,
  dueDate: CALC_MONTH.dueDate,
  // Comparação com o mês anterior — útil como prova do valor do produto
  previousMonth: {
    reference: "Abril/2025",
    total: 4184.47
  }
};

// ==========================================================================
// Legacy aliases (mantidos para não quebrar qualquer referência antiga)
// ==========================================================================
const BILLING_MONTHS = AUDIT_MONTHS;
const FINDINGS = AUDIT_FINDINGS;
const BILLING_SUMMARY = AUDIT_SUMMARY;
const fmtBRL = n => new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
}).format(n);
const fmtBRLParts = n => {
  const [int, dec] = Math.abs(n).toFixed(2).split(".");
  const intFmt = new Intl.NumberFormat("pt-BR").format(parseInt(int, 10));
  return {
    sign: n < 0 ? "-" : "",
    int: intFmt,
    dec
  };
};
Object.assign(window, {
  CONTRACT_BASELINE,
  // cenário A
  CALC_MONTH,
  CALC_LINE_ITEMS,
  CALC_NOTES,
  CALC_SUMMARY,
  // cenário B
  AUDIT_MONTHS,
  AUDIT_FINDINGS,
  AUDIT_SUMMARY,
  // legacy
  BILLING_MONTHS,
  FINDINGS,
  BILLING_SUMMARY,
  fmtBRL,
  fmtBRLParts
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "MVP/components/BillingData.jsx", error: String((e && e.message) || e) }); }

// MVP/components/BillingResult.jsx
try { (() => {
// Kontiva MVP — BillingResult screen
// Perspectiva: ESCRITÓRIO CONTÁBIL vendo quanto cobrar (ou deveria ter cobrado)
// de um cliente.
//
// Props:
//   scenario: "calc" (definir cobrança) | "audit" (auditar cobrança emitida)
//
// No modo audit há três recortes de leitura — perda, risco e líquido.
// Expostos como abas no topo do resultado para facilitar a demo.

const {
  useState: useStateBR
} = React;

// =====================================================================
// Shared helpers
// =====================================================================
const NumberPlate = ({
  value,
  accent = "ciano"
}) => {
  const p = fmtBRLParts(value);
  return /*#__PURE__*/React.createElement("div", {
    className: "brh-number"
  }, p.sign && /*#__PURE__*/React.createElement("span", {
    className: "brh-sign"
  }, p.sign), /*#__PURE__*/React.createElement("span", {
    className: "brh-currency"
  }, "R$"), /*#__PURE__*/React.createElement("span", {
    className: "brh-value accent-" + accent
  }, p.int, /*#__PURE__*/React.createElement("span", {
    className: "brh-dec"
  }, ",", p.dec)));
};
const SevDot = ({
  sev
}) => /*#__PURE__*/React.createElement("span", {
  className: "sev-dot sev-" + sev
});

// =====================================================================
// Finding card — audit mode
// =====================================================================
const FindingCard = ({
  f,
  expanded,
  onToggle
}) => {
  const isUnder = f.direction === "under";
  const isOver = f.direction === "over";
  const Ico = isUnder ? IScope : isOver ? IAlert : ITick;
  return /*#__PURE__*/React.createElement("div", {
    className: "finding sev-" + f.severity + (expanded ? " open" : "")
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "finding-head",
    onClick: onToggle
  }, /*#__PURE__*/React.createElement("div", {
    className: "fh-ico"
  }, /*#__PURE__*/React.createElement(Ico, {
    size: 15
  })), /*#__PURE__*/React.createElement("div", {
    className: "fh-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fh-title"
  }, f.title), /*#__PURE__*/React.createElement("div", {
    className: "fh-meta"
  }, /*#__PURE__*/React.createElement("span", null, f.clause), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, f.months.join(", ")))), /*#__PURE__*/React.createElement("div", {
    className: "fh-amount"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fh-amount-label " + (isUnder ? "loss" : "risk")
  }, isUnder ? "deixou de cobrar" : "cobrou a mais"), /*#__PURE__*/React.createElement("span", {
    className: "fh-amount-value " + (isUnder ? "loss" : "risk")
  }, isUnder ? "− " : "+ ", fmtBRL(f.amount))), /*#__PURE__*/React.createElement("div", {
    className: "fh-chev"
  }, /*#__PURE__*/React.createElement(IChevron, {
    dir: expanded ? "down" : "right",
    size: 12
  }))), expanded && /*#__PURE__*/React.createElement("div", {
    className: "finding-body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "fb-summary"
  }, f.summary), /*#__PURE__*/React.createElement("div", {
    className: "fb-compare"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fb-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fb-label"
  }, "Deveria ter cobrado"), /*#__PURE__*/React.createElement("div", {
    className: "fb-value"
  }, f.expected)), /*#__PURE__*/React.createElement("div", {
    className: "fb-vs"
  }, "\xD7"), /*#__PURE__*/React.createElement("div", {
    className: "fb-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fb-label"
  }, "Cobrou"), /*#__PURE__*/React.createElement("div", {
    className: "fb-value " + (isUnder ? "loss" : "risk")
  }, f.charged))), f.action && /*#__PURE__*/React.createElement("div", {
    className: "fb-action"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fba-label"
  }, "Pr\xF3ximo passo sugerido"), /*#__PURE__*/React.createElement("span", {
    className: "fba-text"
  }, f.action))));
};

// =====================================================================
// Audit — monthly row (undercharged / overcharged / ok)
// =====================================================================
const MonthRowAudit = ({
  m
}) => {
  const isUnder = m.status === "undercharged";
  const isOver = m.status === "overcharged";
  return /*#__PURE__*/React.createElement("div", {
    className: "month-row status-" + m.status
  }, /*#__PURE__*/React.createElement("div", {
    className: "mr-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mr-month"
  }, m.month), /*#__PURE__*/React.createElement("div", {
    className: "mr-period"
  }, m.period)), /*#__PURE__*/React.createElement("div", {
    className: "mr-status"
  }, /*#__PURE__*/React.createElement("span", {
    className: "status-pill " + (isUnder ? "under" : isOver ? "over" : "conforme")
  }, isUnder ? /*#__PURE__*/React.createElement(IScope, {
    size: 10
  }) : isOver ? /*#__PURE__*/React.createElement(IAlert, {
    size: 11
  }) : /*#__PURE__*/React.createElement(ITick, {
    size: 9
  }), isUnder ? "Cobrou a menos" : isOver ? "Cobrou a mais" : "Conforme"))), /*#__PURE__*/React.createElement("div", {
    className: "mr-items"
  }, m.items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "mr-item status-" + it.status
  }, /*#__PURE__*/React.createElement("div", {
    className: "mri-label"
  }, it.label), /*#__PURE__*/React.createElement("div", {
    className: "mri-expected"
  }, fmtBRL(it.expected)), /*#__PURE__*/React.createElement("div", {
    className: "mri-arrow"
  }, "\u2192"), /*#__PURE__*/React.createElement("div", {
    className: "mri-charged " + (it.status === "undercharged" ? "loss" : it.status === "overcharged" ? "risk" : "")
  }, fmtBRL(it.charged))))), m.delta !== 0 && /*#__PURE__*/React.createElement("div", {
    className: "mr-foot " + (isUnder ? "loss" : "risk")
  }, /*#__PURE__*/React.createElement("span", null, "Diferen\xE7a no m\xEAs"), /*#__PURE__*/React.createElement("span", {
    className: "mr-diff " + (isUnder ? "loss" : "risk")
  }, isUnder ? "− " : "+ ", fmtBRL(Math.abs(m.delta)))));
};

// =====================================================================
// Calc — line item
// =====================================================================
const CalcLineItem = ({
  it
}) => /*#__PURE__*/React.createElement("div", {
  className: "calc-line kind-" + it.kind
}, /*#__PURE__*/React.createElement("div", {
  className: "cl-main"
}, /*#__PURE__*/React.createElement("div", {
  className: "cl-label"
}, it.label), /*#__PURE__*/React.createElement("div", {
  className: "cl-meta"
}, /*#__PURE__*/React.createElement("span", null, it.clause), /*#__PURE__*/React.createElement("span", {
  className: "sep"
}, "\xB7"), /*#__PURE__*/React.createElement("span", null, it.meta)), /*#__PURE__*/React.createElement("div", {
  className: "cl-detail"
}, it.detail)), /*#__PURE__*/React.createElement("div", {
  className: "cl-amount"
}, fmtBRL(it.expected)));

// =====================================================================
// Main component
// =====================================================================
const BillingResult = ({
  user,
  clientName,
  scenario = "calc",
  onLogout,
  onBack,
  onNavClick
}) => {
  const [expanded, setExpanded] = useStateBR(() => new Set(["miss_reajuste"]));
  const toggle = id => {
    setExpanded(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  // Audit view has three readings to surface
  const [auditView, setAuditView] = useStateBR("net"); // net | loss | risk

  return /*#__PURE__*/React.createElement(WorkspaceShell, {
    activeNav: "clients",
    counts: {
      clients: 1,
      contracts: 1
    },
    onNavClick: onNavClick
  }, /*#__PURE__*/React.createElement("div", {
    className: "ws-topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "crumb"
  }, /*#__PURE__*/React.createElement("span", null, "Clientes"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--azul-profundo)"
    }
  }, clientName), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--cinza-escuro)"
    }
  }, scenario === "calc" ? "Cobrança do mês" : "Auditoria de cobrança")), /*#__PURE__*/React.createElement("div", {
    className: "right-actions"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13,
      color: "var(--cinza-escuro)",
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "avatar",
    style: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      background: "var(--azul-profundo)",
      color: "#EAF6FF",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 700
    }
  }, "MG"), /*#__PURE__*/React.createElement("span", null, user)), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    className: "btn btn-ghost",
    style: {
      padding: "8px 14px",
      fontSize: 13
    }
  }, "Sair"))), /*#__PURE__*/React.createElement("div", {
    className: "ws-body br-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "br-wrap"
  }, scenario === "calc" ? /*#__PURE__*/React.createElement(CalcView, {
    clientName: clientName,
    onBack: onBack
  }) : /*#__PURE__*/React.createElement(AuditView, {
    clientName: clientName,
    view: auditView,
    setView: setAuditView,
    expanded: expanded,
    toggle: toggle,
    onBack: onBack
  }))));
};

// =====================================================================
// CENÁRIO A — calcular cobrança do mês
// =====================================================================
const CalcView = ({
  clientName,
  onBack
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "br-hero calc-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brh-eye"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " Cobran\xE7a calculada \xB7 ", CALC_SUMMARY.reference), /*#__PURE__*/React.createElement("div", {
    className: "brh-headline"
  }, "Voc\xEA deve cobrar de ", clientName), /*#__PURE__*/React.createElement(NumberPlate, {
    value: CALC_SUMMARY.total,
    accent: "ciano"
  }), /*#__PURE__*/React.createElement("div", {
    className: "brh-sub"
  }, "Mensalidade reajustada + ", /*#__PURE__*/React.createElement("b", null, CALC_SUMMARY.itemsCount - 1, " servi\xE7os extras autorizados"), ". Vencimento sugerido: ", /*#__PURE__*/React.createElement("b", null, CALC_SUMMARY.dueDate), "."), /*#__PURE__*/React.createElement("div", {
    className: "brh-stats brh-stats--calc"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brh-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brhs-num"
  }, fmtBRL(CALC_SUMMARY.base).replace("R$", "").trim()), /*#__PURE__*/React.createElement("div", {
    className: "brhs-label"
  }, "Mensalidade c/ IPCA")), /*#__PURE__*/React.createElement("div", {
    className: "brh-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brhs-num brhs-ok"
  }, "+ ", fmtBRL(CALC_SUMMARY.extras).replace("R$", "").trim()), /*#__PURE__*/React.createElement("div", {
    className: "brhs-label"
  }, "Extras autorizados")), /*#__PURE__*/React.createElement("div", {
    className: "brh-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brhs-num"
  }, CALC_SUMMARY.itemsCount), /*#__PURE__*/React.createElement("div", {
    className: "brhs-label"
  }, "Lan\xE7amentos no m\xEAs")), /*#__PURE__*/React.createElement("div", {
    className: "brh-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brhs-num brhs-diff"
  }, (() => {
    const prev = CALC_SUMMARY.previousMonth.total;
    const curr = CALC_SUMMARY.total;
    const diff = curr - prev;
    return (diff >= 0 ? "+ " : "− ") + fmtBRL(Math.abs(diff)).replace("R$", "").trim();
  })()), /*#__PURE__*/React.createElement("div", {
    className: "brhs-label"
  }, "vs ", CALC_SUMMARY.previousMonth.reference)))), /*#__PURE__*/React.createElement("section", {
    className: "br-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "br-section-head"
  }, /*#__PURE__*/React.createElement("h2", null, "Mem\xF3ria de c\xE1lculo"), /*#__PURE__*/React.createElement("p", null, "Cada linha com a cl\xE1usula que embasa a cobran\xE7a \u2014 anexe ao boleto para o cliente ver exatamente de onde vem o valor.")), /*#__PURE__*/React.createElement("div", {
    className: "calc-lines"
  }, CALC_LINE_ITEMS.map(it => /*#__PURE__*/React.createElement(CalcLineItem, {
    key: it.id,
    it: it
  })), /*#__PURE__*/React.createElement("div", {
    className: "calc-total"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ct-label"
  }, "Total a cobrar"), /*#__PURE__*/React.createElement("div", {
    className: "ct-value"
  }, fmtBRL(CALC_SUMMARY.total))))), /*#__PURE__*/React.createElement("section", {
    className: "br-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "br-section-head"
  }, /*#__PURE__*/React.createElement("h2", null, "Antes de emitir"), /*#__PURE__*/React.createElement("p", null, "Pequenas checagens que evitam desgaste com o cliente depois.")), /*#__PURE__*/React.createElement("div", {
    className: "notes"
  }, CALC_NOTES.map(n => /*#__PURE__*/React.createElement("div", {
    key: n.id,
    className: "note type-" + n.type
  }, /*#__PURE__*/React.createElement("div", {
    className: "note-ico"
  }, n.type === "check" ? /*#__PURE__*/React.createElement(ITick, {
    size: 12
  }) : /*#__PURE__*/React.createElement(IScope, {
    size: 12
  })), /*#__PURE__*/React.createElement("div", {
    className: "note-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "note-title"
  }, n.title), /*#__PURE__*/React.createElement("div", {
    className: "note-text"
  }, n.body)))))), /*#__PURE__*/React.createElement("div", {
    className: "br-cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brc-text"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brc-title"
  }, "Pronto pra ", /*#__PURE__*/React.createElement("span", {
    className: "serif-accent"
  }, "emitir"), "?"), /*#__PURE__*/React.createElement("div", {
    className: "brc-sub"
  }, "Geramos o boleto com mem\xF3ria de c\xE1lculo anexa e mandamos pro e-mail do cliente \u2014 ou voc\xEA exporta como PDF para o seu ERP.")), /*#__PURE__*/React.createElement("div", {
    className: "brc-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: onBack
  }, "Enviar outro relat\xF3rio"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary"
  }, /*#__PURE__*/React.createElement(IDownload, {
    size: 13
  }), " Exportar mem\xF3ria"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary"
  }, /*#__PURE__*/React.createElement(IShare, {
    size: 13
  }), " Emitir boleto"))));
};

// =====================================================================
// CENÁRIO B — auditar cobranças já emitidas
// =====================================================================
const AuditView = ({
  clientName,
  view,
  setView,
  expanded,
  toggle,
  onBack
}) => {
  const s = AUDIT_SUMMARY;

  // Headline values per view
  const VIEWS = {
    loss: {
      eye: "Receita perdida · últimos 3 meses",
      headline: /*#__PURE__*/React.createElement(React.Fragment, null, "Voc\xEA ", /*#__PURE__*/React.createElement("span", {
        className: "serif-accent"
      }, "deixou de cobrar")),
      value: s.undercharged,
      accent: "loss",
      sub: /*#__PURE__*/React.createElement(React.Fragment, null, "Servi\xE7os prestados para ", /*#__PURE__*/React.createElement("b", null, clientName), " que ficaram fora do boleto. Se o padr\xE3o continuar, s\xE3o ", /*#__PURE__*/React.createElement("b", null, fmtBRL(s.annualLossProjection)), " por ano parando de entrar no caixa.")
    },
    risk: {
      eye: "Cobrança acima do contrato",
      headline: /*#__PURE__*/React.createElement(React.Fragment, null, "Voc\xEA ", /*#__PURE__*/React.createElement("span", {
        className: "serif-accent"
      }, "cobrou a mais")),
      value: s.overcharged,
      accent: "risk",
      sub: /*#__PURE__*/React.createElement(React.Fragment, null, "Cobran\xE7as de ", /*#__PURE__*/React.createElement("b", null, clientName), " acima do que o contrato prev\xEA. Revisar antes que o cliente pe\xE7a \u2014 preserva a rela\xE7\xE3o e a imagem do escrit\xF3rio.")
    },
    net: {
      eye: "Balanço · últimos 3 meses",
      headline: s.netDelta < 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, "No l\xEDquido, voc\xEA ", /*#__PURE__*/React.createElement("span", {
        className: "serif-accent"
      }, "ficou devendo")) : /*#__PURE__*/React.createElement(React.Fragment, null, "No l\xEDquido, voc\xEA ", /*#__PURE__*/React.createElement("span", {
        className: "serif-accent"
      }, "cobrou a mais")),
      value: Math.abs(s.netDelta),
      accent: s.netDelta < 0 ? "loss" : "risk",
      sub: /*#__PURE__*/React.createElement(React.Fragment, null, "Somando subfaturamentos e superfaturamentos, o saldo da cobran\xE7a de ", /*#__PURE__*/React.createElement("b", null, clientName), " nos \xFAltimos ", s.monthsAnalyzed, " meses ficou ", s.netDelta < 0 ? "negativo" : "positivo", " para o escrit\xF3rio.")
    }
  };
  const v = VIEWS[view];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "br-hero audit-hero accent-" + v.accent
  }, /*#__PURE__*/React.createElement("div", {
    className: "brh-eye"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " ", v.eye), /*#__PURE__*/React.createElement("div", {
    className: "audit-tabs",
    role: "tablist"
  }, /*#__PURE__*/React.createElement("button", {
    className: "at-tab " + (view === "loss" ? "active" : ""),
    onClick: () => setView("loss"),
    role: "tab"
  }, /*#__PURE__*/React.createElement("span", {
    className: "at-dot at-loss"
  }), /*#__PURE__*/React.createElement("span", {
    className: "at-label"
  }, "Deixou de cobrar"), /*#__PURE__*/React.createElement("span", {
    className: "at-val"
  }, fmtBRL(s.undercharged))), /*#__PURE__*/React.createElement("button", {
    className: "at-tab " + (view === "risk" ? "active" : ""),
    onClick: () => setView("risk"),
    role: "tab"
  }, /*#__PURE__*/React.createElement("span", {
    className: "at-dot at-risk"
  }), /*#__PURE__*/React.createElement("span", {
    className: "at-label"
  }, "Cobrou a mais"), /*#__PURE__*/React.createElement("span", {
    className: "at-val"
  }, fmtBRL(s.overcharged))), /*#__PURE__*/React.createElement("button", {
    className: "at-tab " + (view === "net" ? "active" : ""),
    onClick: () => setView("net"),
    role: "tab"
  }, /*#__PURE__*/React.createElement("span", {
    className: "at-dot at-net"
  }), /*#__PURE__*/React.createElement("span", {
    className: "at-label"
  }, "Saldo l\xEDquido"), /*#__PURE__*/React.createElement("span", {
    className: "at-val"
  }, s.netDelta < 0 ? "− " : "+ ", fmtBRL(Math.abs(s.netDelta))))), /*#__PURE__*/React.createElement("div", {
    className: "brh-headline"
  }, v.headline), /*#__PURE__*/React.createElement(NumberPlate, {
    value: v.value,
    accent: v.accent
  }), /*#__PURE__*/React.createElement("div", {
    className: "brh-sub"
  }, v.sub), /*#__PURE__*/React.createElement("div", {
    className: "brh-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brh-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brhs-num"
  }, s.monthsWithIssues, /*#__PURE__*/React.createElement("span", null, "/", s.monthsAnalyzed)), /*#__PURE__*/React.createElement("div", {
    className: "brhs-label"
  }, "meses com diverg\xEAncia")), /*#__PURE__*/React.createElement("div", {
    className: "brh-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brhs-num"
  }, s.itemsFlagged), /*#__PURE__*/React.createElement("div", {
    className: "brhs-label"
  }, "lan\xE7amentos sinalizados")), /*#__PURE__*/React.createElement("div", {
    className: "brh-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brhs-num brhs-ok"
  }, fmtBRL(s.totalExpected).replace("R$", "").trim()), /*#__PURE__*/React.createElement("div", {
    className: "brhs-label"
  }, "deveria ter cobrado")), /*#__PURE__*/React.createElement("div", {
    className: "brh-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brhs-num brhs-diff"
  }, fmtBRL(s.totalCharged).replace("R$", "").trim()), /*#__PURE__*/React.createElement("div", {
    className: "brhs-label"
  }, "efetivamente cobrou")))), view === "risk" && /*#__PURE__*/React.createElement("div", {
    className: "narrative-banner tone-warm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nb-ico"
  }, /*#__PURE__*/React.createElement(IScope, {
    size: 14
  })), /*#__PURE__*/React.createElement("div", {
    className: "nb-text"
  }, /*#__PURE__*/React.createElement("b", null, "Este \xE9 o tipo de achado que protege o escrit\xF3rio."), " Mostrar pro cliente que voc\xEA ", /*#__PURE__*/React.createElement("i", null, "mesmo"), " identificou e j\xE1 ajustou refor\xE7a a confian\xE7a e evita a conversa desconfort\xE1vel de contesta\xE7\xE3o.")), view === "loss" && /*#__PURE__*/React.createElement("div", {
    className: "narrative-banner tone-cool"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nb-ico"
  }, /*#__PURE__*/React.createElement(IBolt, {
    size: 14
  })), /*#__PURE__*/React.createElement("div", {
    className: "nb-text"
  }, /*#__PURE__*/React.createElement("b", null, "Toda hora prestada sem cobran\xE7a \xE9 preju\xEDzo silencioso."), " A Kontiva reconstitui o que foi feito e d\xE1 o caminho pra recuperar \u2014 fatura complementar ou ajuste no pr\xF3ximo m\xEAs.")), /*#__PURE__*/React.createElement("section", {
    className: "br-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "br-section-head"
  }, /*#__PURE__*/React.createElement("h2", null, "O que encontramos"), /*#__PURE__*/React.createElement("p", null, "Cada item foi cruzado com a cl\xE1usula correspondente do contrato e com o apontamento do time.")), /*#__PURE__*/React.createElement("div", {
    className: "findings"
  }, AUDIT_FINDINGS.map(f => /*#__PURE__*/React.createElement(FindingCard, {
    key: f.id,
    f: f,
    expanded: expanded.has(f.id),
    onToggle: () => toggle(f.id)
  })))), /*#__PURE__*/React.createElement("section", {
    className: "br-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "br-section-head"
  }, /*#__PURE__*/React.createElement("h2", null, "M\xEAs a m\xEAs"), /*#__PURE__*/React.createElement("p", null, "Valor que deveria ter sido cobrado \xD7 valor que saiu no boleto.")), /*#__PURE__*/React.createElement("div", {
    className: "months"
  }, AUDIT_MONTHS.map(m => /*#__PURE__*/React.createElement(MonthRowAudit, {
    key: m.month,
    m: m
  })))), /*#__PURE__*/React.createElement("div", {
    className: "br-cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brc-text"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brc-title"
  }, "Pronto pra ", /*#__PURE__*/React.createElement("span", {
    className: "serif-accent"
  }, "regularizar"), "?"), /*#__PURE__*/React.createElement("div", {
    className: "brc-sub"
  }, "Geramos um plano de a\xE7\xE3o: fatura complementar para o que faltou, nota de cr\xE9dito para o que foi cobrado al\xE9m \u2014 tudo com o embasamento contratual.")), /*#__PURE__*/React.createElement("div", {
    className: "brc-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: onBack
  }, "Auditar outro cliente"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary"
  }, /*#__PURE__*/React.createElement(IShare, {
    size: 13
  }), " Compartilhar com s\xF3cio"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary"
  }, /*#__PURE__*/React.createElement(IDownload, {
    size: 13
  }), " Exportar plano de a\xE7\xE3o"))));
};
Object.assign(window, {
  BillingResult
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "MVP/components/BillingResult.jsx", error: String((e && e.message) || e) }); }

// MVP/components/BillingUpload.jsx
try { (() => {
// Kontiva MVP — BillingUpload screen
// Passo 2 de 2. Perspectiva do ESCRITÓRIO CONTÁBIL definindo/auditando
// quanto deve cobrar do seu cliente.
//
// Dois cenários:
//   • calc  — só relatório de serviços prestados → Kontiva diz quanto cobrar
//   • audit — relatório + boleto/NF já emitida  → Kontiva confere se cobrou certo

const {
  useState: useStateBU
} = React;
const SCENARIOS = [{
  id: "calc",
  icon: IScope,
  title: "Calcular o valor a cobrar",
  subtitle: "Você ainda não emitiu o boleto. Envie só o relatório de serviços prestados — a Kontiva calcula quanto faturar neste mês.",
  pill: "Antes de emitir",
  outputs: ["Valor exato a cobrar no mês, já com reajuste", "Detalhamento de mensalidade + extras + horas técnicas", "Memória de cálculo pronta pra anexar ao boleto"],
  docs: "Relatório interno de horas / serviços prestados",
  accept: ".xlsx,.xls,.csv,.pdf"
}, {
  id: "audit",
  icon: IAlert,
  title: "Auditar uma cobrança já emitida",
  subtitle: "Você já mandou boleto ou NF. A Kontiva cruza o relatório com o que foi cobrado e mostra se você cobrou a menos (perda) ou a mais (risco de imagem).",
  pill: "Depois de emitir",
  outputs: ["Quanto você deveria ter cobrado × quanto cobrou", "Receita perdida por subfaturamento", "Alertas de cobrança acima do contrato — antes do cliente reclamar"],
  docs: "Relatório de serviços + boleto, NF ou extrato",
  accept: ".xlsx,.xls,.csv,.pdf"
}];
const SOURCE_OPTIONS = [{
  id: "erp",
  soon: true,
  icon: IBolt,
  title: "Conectar ao ERP",
  subtitle: "Omie, Domínio, Questor, Alterdata — puxamos horas e lançamentos automaticamente.",
  badge: "Em breve"
}, {
  id: "spreadsheet",
  icon: ISheet,
  title: "Planilha do ERP",
  subtitle: "Excel ou CSV exportado do seu sistema. Lemos as colunas sozinhos.",
  badge: "Recomendado",
  primary: true
}, {
  id: "pdf",
  icon: IDoc,
  title: "Relatório em PDF",
  subtitle: "Apontamento de horas, boleto detalhado ou fatura emitida."
}];
const BillingUpload = ({
  user,
  clientName,
  onLogout,
  onFile,
  onBack,
  onNavClick
}) => {
  const [scenario, setScenario] = useStateBU("calc");
  const [selected, setSelected] = useStateBU("spreadsheet");
  const dz = useDropzone(f => {
    onFile && onFile(f, scenario);
  });
  const sc = SCENARIOS.find(s => s.id === scenario);
  return /*#__PURE__*/React.createElement(WorkspaceShell, {
    activeNav: "clients",
    counts: {
      clients: 1,
      contracts: 1
    },
    onNavClick: onNavClick
  }, /*#__PURE__*/React.createElement("div", {
    className: "ws-topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "crumb"
  }, /*#__PURE__*/React.createElement("span", null, "Clientes"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--azul-profundo)"
    }
  }, clientName), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--cinza-escuro)"
    }
  }, "Cobran\xE7a do m\xEAs")), /*#__PURE__*/React.createElement("div", {
    className: "right-actions"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13,
      color: "var(--cinza-escuro)",
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "avatar",
    style: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      background: "var(--azul-profundo)",
      color: "#EAF6FF",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 700
    }
  }, "MG"), /*#__PURE__*/React.createElement("span", null, user)), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    className: "btn btn-ghost",
    style: {
      padding: "8px 14px",
      fontSize: 13
    }
  }, "Sair"))), /*#__PURE__*/React.createElement("div", {
    className: "ws-body bu-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bu-wrap"
  }, /*#__PURE__*/React.createElement("header", {
    className: "bu-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " Passo 2 de 2 \xB7 Escrit\xF3rio cobrando ", clientName), /*#__PURE__*/React.createElement("h1", null, "Quanto voc\xEA deve ", /*#__PURE__*/React.createElement("span", {
    className: "serif-accent"
  }, "cobrar"), " deste cliente?"), /*#__PURE__*/React.createElement("p", null, "Escolha o momento em que est\xE1: se ainda vai emitir o boleto, a Kontiva calcula o valor justo. Se j\xE1 emitiu, confere se a cobran\xE7a bate com o contrato \u2014 e mostra se voc\xEA perdeu receita ou cobrou al\xE9m do combinado.")), /*#__PURE__*/React.createElement("div", {
    className: "bu-scenarios"
  }, SCENARIOS.map(s => {
    const Ico = s.icon;
    const active = scenario === s.id;
    return /*#__PURE__*/React.createElement("button", {
      key: s.id,
      type: "button",
      className: "bu-scenario" + (active ? " active" : ""),
      onClick: () => setScenario(s.id)
    }, /*#__PURE__*/React.createElement("div", {
      className: "bsc-top"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bsc-ico"
    }, /*#__PURE__*/React.createElement(Ico, {
      size: 18
    })), /*#__PURE__*/React.createElement("span", {
      className: "bsc-pill"
    }, s.pill), /*#__PURE__*/React.createElement("div", {
      className: "bsc-radio",
      "aria-hidden": "true"
    }, active && /*#__PURE__*/React.createElement("span", null))), /*#__PURE__*/React.createElement("div", {
      className: "bsc-title"
    }, s.title), /*#__PURE__*/React.createElement("div", {
      className: "bsc-sub"
    }, s.subtitle), /*#__PURE__*/React.createElement("div", {
      className: "bsc-outputs"
    }, s.outputs.map((o, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "bsc-out"
    }, /*#__PURE__*/React.createElement("span", {
      className: "mark"
    }, /*#__PURE__*/React.createElement(ITick, {
      size: 9
    })), /*#__PURE__*/React.createElement("span", null, o)))), /*#__PURE__*/React.createElement("div", {
      className: "bsc-docs"
    }, /*#__PURE__*/React.createElement("span", {
      className: "bsc-docs-label"
    }, "O que enviar"), /*#__PURE__*/React.createElement("span", {
      className: "bsc-docs-text"
    }, s.docs)));
  })), /*#__PURE__*/React.createElement("div", {
    className: "bu-sources"
  }, SOURCE_OPTIONS.map(s => {
    const Ico = s.icon;
    const active = selected === s.id;
    const disabled = s.soon;
    return /*#__PURE__*/React.createElement("button", {
      key: s.id,
      type: "button",
      className: "bu-source" + (active ? " active" : "") + (disabled ? " disabled" : "") + (s.primary ? " primary" : ""),
      onClick: () => !disabled && setSelected(s.id),
      disabled: disabled
    }, /*#__PURE__*/React.createElement("div", {
      className: "bus-ico"
    }, /*#__PURE__*/React.createElement(Ico, {
      size: 20
    })), /*#__PURE__*/React.createElement("div", {
      className: "bus-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bus-head"
    }, /*#__PURE__*/React.createElement("span", {
      className: "bus-title"
    }, s.title), s.badge && /*#__PURE__*/React.createElement("span", {
      className: "bus-badge " + (s.soon ? "soon" : s.primary ? "rec" : "")
    }, s.badge)), /*#__PURE__*/React.createElement("div", {
      className: "bus-sub"
    }, s.subtitle)), /*#__PURE__*/React.createElement("div", {
      className: "bus-radio",
      "aria-hidden": "true"
    }, active && /*#__PURE__*/React.createElement("span", null)));
  })), /*#__PURE__*/React.createElement("div", {
    className: "bu-dropcard"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-head"
  }, /*#__PURE__*/React.createElement("h3", null, scenario === "calc" ? selected === "pdf" ? "Envie o relatório de serviços (PDF)" : "Envie a planilha com os serviços do mês" : selected === "pdf" ? "Envie o relatório + o boleto ou NF (PDF)" : "Envie a planilha com serviços + a cobrança emitida"), /*#__PURE__*/React.createElement("span", {
    className: "step-chip",
    style: {
      background: "color-mix(in oklab, var(--ciano) 15%, transparent)",
      color: "var(--azul-profundo)",
      borderColor: "color-mix(in oklab, var(--ciano) 30%, transparent)"
    }
  }, scenario === "calc" ? "Mês corrente" : "Últimos 3 meses é o ideal")), /*#__PURE__*/React.createElement("div", {
    className: "bu-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ws-dropzone" + (dz.active ? " active" : ""),
    onDrop: dz.onDrop,
    onDragOver: dz.onDragOver,
    onDragLeave: dz.onDragLeave,
    onClick: dz.onClick,
    role: "button",
    tabIndex: 0
  }, /*#__PURE__*/React.createElement("div", {
    className: "dz-icon"
  }, /*#__PURE__*/React.createElement(IUpload, {
    size: 24
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "dz-title"
  }, selected === "pdf" ? "Arraste o PDF aqui" : "Arraste a planilha aqui"), /*#__PURE__*/React.createElement("div", {
    className: "dz-sub",
    style: {
      marginTop: 6
    }
  }, "ou ", /*#__PURE__*/React.createElement("u", {
    style: {
      textUnderlineOffset: 3
    }
  }, "selecione um arquivo"), " \xB7", " ", selected === "pdf" ? "PDF até 20 MB" : "XLSX, XLS, CSV até 20 MB")), /*#__PURE__*/React.createElement("input", {
    ref: dz.inputRef,
    type: "file",
    accept: selected === "pdf" ? ".pdf,application/pdf" : ".xlsx,.xls,.csv",
    onChange: dz.onInputChange,
    style: {
      display: "none"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "bu-explain"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bue-title"
  }, scenario === "calc" ? "O que a Kontiva vai calcular" : "O que a Kontiva vai auditar"), scenario === "calc" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "bue-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mark"
  }, /*#__PURE__*/React.createElement(ITick, {
    size: 9
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Mensalidade"), " \u2014 base contratual com reajuste IPCA j\xE1 aplicado")), /*#__PURE__*/React.createElement("div", {
    className: "bue-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mark"
  }, /*#__PURE__*/React.createElement(ITick, {
    size: 9
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Extras autorizados"), " \u2014 horas t\xE9cnicas a ", /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, "R$ 180/h"), " com autoriza\xE7\xE3o registrada")), /*#__PURE__*/React.createElement("div", {
    className: "bue-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mark"
  }, /*#__PURE__*/React.createElement(ITick, {
    size: 9
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Anivers\xE1rio do contrato"), " \u2014 alerta se o m\xEAs de mar\xE7o j\xE1 entrou na conta")), /*#__PURE__*/React.createElement("div", {
    className: "bue-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mark"
  }, /*#__PURE__*/React.createElement(ITick, {
    size: 9
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Mem\xF3ria de c\xE1lculo"), " \u2014 pronta pra anexar ao boleto do cliente"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "bue-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mark"
  }, /*#__PURE__*/React.createElement(ITick, {
    size: 9
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Subfaturamento"), " \u2014 o que voc\xEA prestou e n\xE3o cobrou (receita perdida)")), /*#__PURE__*/React.createElement("div", {
    className: "bue-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mark"
  }, /*#__PURE__*/React.createElement(ITick, {
    size: 9
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Superfaturamento"), " \u2014 o que voc\xEA cobrou al\xE9m do contrato (risco de imagem)")), /*#__PURE__*/React.createElement("div", {
    className: "bue-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mark"
  }, /*#__PURE__*/React.createElement(ITick, {
    size: 9
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Reajuste esquecido"), " \u2014 se o IPCA n\xE3o entrou no boleto do anivers\xE1rio")), /*#__PURE__*/React.createElement("div", {
    className: "bue-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mark"
  }, /*#__PURE__*/React.createElement(ITick, {
    size: 9
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "A\xE7\xE3o sugerida"), " \u2014 fatura complementar, nota de cr\xE9dito ou ajuste no pr\xF3ximo m\xEAs"))), /*#__PURE__*/React.createElement("div", {
    className: "bue-foot"
  }, /*#__PURE__*/React.createElement(ILock, {
    size: 12
  }), " Os dados do seu cliente ficam no seu espa\xE7o. N\xE3o treinamos modelo com eles.")))), /*#__PURE__*/React.createElement("div", {
    className: "bu-back"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: onBack
  }, "\u2190 Voltar para a revis\xE3o do contrato")))));
};
Object.assign(window, {
  BillingUpload
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "MVP/components/BillingUpload.jsx", error: String((e && e.message) || e) }); }

// MVP/components/ClientDetail.jsx
try { (() => {
// Kontiva MVP — ClientDetail screen
// Ficha do cliente: dados cadastrais + listagem de contratos.
// Um cliente pode ter múltiplos contratos. O usuário escolhe qual detalhar.

const {
  useState: useStateCD
} = React;
const AlertDotCD = ({
  level
}) => {
  if (!level || level === "none") return null;
  return /*#__PURE__*/React.createElement("span", {
    className: "client-alert-dot tone-" + level,
    "aria-hidden": "true"
  });
};
const fmtBRLCD = n => new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
}).format(n);

// ---------- Contract card ----------
const ContractCard = ({
  c,
  onOpen
}) => {
  const status = c.billingStatus || "issued";
  const meta = BILLING_STATUS_META[status] || {
    label: "—",
    className: "issued"
  };
  const isActive = c.status === "active";
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ctr-card status-" + (isActive ? "active" : "ended"),
    onClick: () => onOpen && onOpen(c)
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctr-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctr-id-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctr-label-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctr-dot " + (isActive ? "active" : "ended")
  }), /*#__PURE__*/React.createElement("span", {
    className: "ctr-label"
  }, c.label), !isActive && /*#__PURE__*/React.createElement("span", {
    className: "ctr-ended-tag"
  }, "Encerrado")), /*#__PURE__*/React.createElement("div", {
    className: "ctr-id mono"
  }, c.id)), isActive && /*#__PURE__*/React.createElement("span", {
    className: "billing-chip tone-" + meta.className
  }, meta.label)), /*#__PURE__*/React.createElement("div", {
    className: "ctr-value-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctr-money"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctr-money-value"
  }, fmtBRLCD(c.monthly)), /*#__PURE__*/React.createElement("div", {
    className: "ctr-money-label"
  }, "mensal \xB7 reajustado")), /*#__PURE__*/React.createElement("div", {
    className: "ctr-index"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctr-index-pill"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, c.index), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "anivers\xE1rio em ", c.anniversary)), c.lastAdjustedPercent != null && /*#__PURE__*/React.createElement("div", {
    className: "ctr-index-sub"
  }, "\xDAltimo reajuste: ", c.lastAdjustedPercent.toFixed(2).replace(".", ","), "% em ", c.lastAdjustedAt || "—"))), /*#__PURE__*/React.createElement("div", {
    className: "ctr-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctr-grid-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctr-g-label"
  }, "Vig\xEAncia"), /*#__PURE__*/React.createElement("span", {
    className: "ctr-g-value"
  }, c.startedAt || "—", " \u2192 ", c.end)), /*#__PURE__*/React.createElement("div", {
    className: "ctr-grid-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctr-g-label"
  }, "Pr\xF3ximo anivers\xE1rio"), /*#__PURE__*/React.createElement("span", {
    className: "ctr-g-value"
  }, c.nextAnniversary)), /*#__PURE__*/React.createElement("div", {
    className: "ctr-grid-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctr-g-label"
  }, "\xDAltima cobran\xE7a"), /*#__PURE__*/React.createElement("span", {
    className: "ctr-g-value"
  }, c.lastBilling ? `${c.lastBilling.reference} · ${fmtBRLCD(c.lastBilling.amount)}` : "—")), /*#__PURE__*/React.createElement("div", {
    className: "ctr-grid-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctr-g-label"
  }, "Escopo"), /*#__PURE__*/React.createElement("span", {
    className: "ctr-g-value"
  }, c.scope || "Serviços contábeis"))), isActive && c.alert && c.alert.level !== "none" && /*#__PURE__*/React.createElement("div", {
    className: "ctr-alert tone-" + c.alert.level
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctr-alert-dot"
  }), /*#__PURE__*/React.createElement("span", null, c.alert.text)), /*#__PURE__*/React.createElement("div", {
    className: "ctr-foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctr-foot-hint"
  }, isActive ? "Abrir contrato" : "Ver histórico"), /*#__PURE__*/React.createElement(IChevron, {
    dir: "right",
    size: 13
  })));
};

// ---------- Main ----------
const ClientDetail = ({
  user,
  client,
  onLogout,
  onBack,
  onOpenContract,
  onNavClick
}) => {
  const c = client;
  const [filter, setFilter] = useStateCD("active"); // active | ended | all

  const activeContracts = c.contracts.filter(x => x.status === "active");
  const endedContracts = c.contracts.filter(x => x.status !== "active");
  const shown = filter === "active" ? activeContracts : filter === "ended" ? endedContracts : c.contracts;
  const initials = c.name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  return /*#__PURE__*/React.createElement(WorkspaceShell, {
    activeNav: "clients",
    counts: {
      clients: CLIENTS_SUMMARY.total,
      contracts: CLIENTS_SUMMARY.activeContracts
    },
    onNavClick: onNavClick
  }, /*#__PURE__*/React.createElement("div", {
    className: "ws-topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "crumb"
  }, /*#__PURE__*/React.createElement("span", {
    onClick: onBack,
    style: {
      cursor: "pointer"
    }
  }, "Clientes"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--azul-profundo)"
    }
  }, c.name)), /*#__PURE__*/React.createElement("div", {
    className: "right-actions"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13,
      color: "var(--cinza-escuro)",
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "avatar",
    style: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      background: "var(--azul-profundo)",
      color: "#EAF6FF",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 700
    }
  }, "MG"), /*#__PURE__*/React.createElement("span", null, user)), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    className: "btn btn-ghost",
    style: {
      padding: "8px 14px",
      fontSize: 13
    }
  }, "Sair"))), /*#__PURE__*/React.createElement("div", {
    className: "ws-body cd-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cd-wrap"
  }, /*#__PURE__*/React.createElement("button", {
    className: "cd-back",
    onClick: onBack,
    type: "button"
  }, /*#__PURE__*/React.createElement(IChevron, {
    dir: "left",
    size: 12
  }), " Voltar para a carteira"), /*#__PURE__*/React.createElement("section", {
    className: "cd-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cd-hero-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cd-avatar",
    "aria-hidden": "true"
  }, initials), /*#__PURE__*/React.createElement("div", {
    className: "cd-hero-id"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " Cliente \xB7 na carteira desde ", c.portfolioSince), /*#__PURE__*/React.createElement("h1", null, c.name), /*#__PURE__*/React.createElement("div", {
    className: "cd-id-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, "CNPJ ", c.cnpj), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, c.segment))), /*#__PURE__*/React.createElement("div", {
    className: "cd-hero-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    type: "button"
  }, /*#__PURE__*/React.createElement(IPen, {
    size: 12
  }), " Editar cadastro"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    type: "button"
  }, /*#__PURE__*/React.createElement(IPlus, {
    size: 12
  }), " Novo contrato"))), /*#__PURE__*/React.createElement("div", {
    className: "cd-reg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cd-reg-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cdr-label"
  }, "Contato principal"), /*#__PURE__*/React.createElement("span", {
    className: "cdr-value"
  }, c.contacts.name), /*#__PURE__*/React.createElement("span", {
    className: "cdr-sub mono"
  }, c.contacts.email)), /*#__PURE__*/React.createElement("div", {
    className: "cd-reg-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cdr-label"
  }, "Gerente respons\xE1vel"), /*#__PURE__*/React.createElement("span", {
    className: "cdr-value"
  }, c.owner), /*#__PURE__*/React.createElement("span", {
    className: "cdr-sub"
  }, "Escrit\xF3rio Santos & Contadores")), /*#__PURE__*/React.createElement("div", {
    className: "cd-reg-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cdr-label"
  }, "Segmento"), /*#__PURE__*/React.createElement("span", {
    className: "cdr-value"
  }, c.segment)), /*#__PURE__*/React.createElement("div", {
    className: "cd-reg-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cdr-label"
  }, "Status"), /*#__PURE__*/React.createElement("span", {
    className: "cdr-value"
  }, BILLING_STATUS_META[c.billingStatus]?.label || "—"), /*#__PURE__*/React.createElement("span", {
    className: "cdr-sub"
  }, c.billingLabel))), /*#__PURE__*/React.createElement("div", {
    className: "cd-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cd-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cds-num"
  }, activeContracts.length), /*#__PURE__*/React.createElement("div", {
    className: "cds-label"
  }, "contratos ativos")), endedContracts.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "cd-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cds-num cds-num--muted"
  }, endedContracts.length), /*#__PURE__*/React.createElement("div", {
    className: "cds-label"
  }, "encerrados")), /*#__PURE__*/React.createElement("div", {
    className: "cd-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cds-num"
  }, fmtBRLCD(c.monthlyTotal).replace("R$", "").trim()), /*#__PURE__*/React.createElement("div", {
    className: "cds-label"
  }, "mensal total")), c.alert && c.alert.level !== "none" && /*#__PURE__*/React.createElement("div", {
    className: "cd-stat cd-stat--alert"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cds-num cds-num--" + c.alert.level
  }, /*#__PURE__*/React.createElement(AlertDotCD, {
    level: c.alert.level
  }), CLIENT_ALERT_META[c.alert.level]?.label || "Alerta"), /*#__PURE__*/React.createElement("div", {
    className: "cds-label"
  }, c.alert.text)))), /*#__PURE__*/React.createElement("section", {
    className: "cd-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cd-section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Contratos"), /*#__PURE__*/React.createElement("p", null, "Cada contrato tem valor, \xEDndice e anivers\xE1rio pr\xF3prios. Clique para auditar ou calcular a cobran\xE7a.")), /*#__PURE__*/React.createElement("div", {
    className: "cd-filters",
    role: "tablist"
  }, /*#__PURE__*/React.createElement("button", {
    className: "cl-filter" + (filter === "active" ? " active" : ""),
    onClick: () => setFilter("active")
  }, "Ativos ", /*#__PURE__*/React.createElement("span", {
    className: "cf-count"
  }, activeContracts.length)), endedContracts.length > 0 && /*#__PURE__*/React.createElement("button", {
    className: "cl-filter" + (filter === "ended" ? " active" : ""),
    onClick: () => setFilter("ended")
  }, "Encerrados ", /*#__PURE__*/React.createElement("span", {
    className: "cf-count"
  }, endedContracts.length)), /*#__PURE__*/React.createElement("button", {
    className: "cl-filter" + (filter === "all" ? " active" : ""),
    onClick: () => setFilter("all")
  }, "Todos ", /*#__PURE__*/React.createElement("span", {
    className: "cf-count"
  }, c.contracts.length)))), /*#__PURE__*/React.createElement("div", {
    className: "ctr-grid-list"
  }, shown.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "cl-empty"
  }, "Nenhum contrato neste filtro."), shown.map(ct => /*#__PURE__*/React.createElement(ContractCard, {
    key: ct.id,
    c: ct,
    onOpen: onOpenContract
  })))))));
};
Object.assign(window, {
  ClientDetail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "MVP/components/ClientDetail.jsx", error: String((e && e.message) || e) }); }

// MVP/components/ClientsData.jsx
try { (() => {
// Kontiva MVP — Clients mock data
// Perspectiva: carteira do escritório "Santos & Contadores". Cada cliente pode
// ter 1+ contratos ativos (CNPJs diferentes do mesmo grupo, filiais, ou
// serviços distintos). Ordem de urgência: clientes com alerta primeiro.
//
// Cada contrato carrega seu próprio status de cobrança e alerta — o status
// do cliente na listagem é o mais crítico entre seus contratos.

const CLIENTS = [{
  id: "horizonte",
  name: "Construtora Horizonte Ltda.",
  cnpj: "12.345.678/0001-90",
  segment: "Construção civil",
  portfolioSince: "Mar/2024",
  owner: "Marcos Guedes",
  contacts: {
    name: "Ricardo Almeida",
    email: "ricardo@horizonte.com.br"
  },
  monthlyTotal: 4544.47,
  billingStatus: "to_calculate",
  billingLabel: "Calcular cobrança de maio",
  alert: {
    level: "loss",
    text: "Subfaturamento recorrente — R$ 364 deixados de cobrar em 3 meses"
  },
  contracts: [{
    id: "HRZ-01",
    label: "Matriz · SP",
    scope: "Contábil + folha + tributos",
    monthly: 4004.47,
    index: "IPCA",
    anniversary: "Março",
    startedAt: "01/03/2024",
    nextAnniversary: "01/03/2026",
    end: "01/03/2027",
    lastAdjustedPercent: 4.83,
    lastAdjustedAt: "Mar/2025",
    lastBilling: {
      reference: "Abr/2025",
      amount: 4004.47
    },
    status: "active",
    billingStatus: "to_calculate",
    alert: {
      level: "loss",
      text: "3 meses sem aplicar o reajuste correto — perda acumulada de R$ 364"
    }
  }],
  isDemo: true
}, {
  id: "lumen",
  name: "Lumen Energia Renovável S.A.",
  cnpj: "23.987.112/0001-45",
  segment: "Energia / infraestrutura",
  portfolioSince: "Jul/2023",
  owner: "Paula Tavares",
  contacts: {
    name: "Fernanda Kist",
    email: "financeiro@lumen.energia"
  },
  monthlyTotal: 12850.00,
  billingStatus: "under_review",
  billingLabel: "Auditoria em andamento",
  alert: {
    level: "risk",
    text: "Cobrou R$ 2.100 acima do contrato em abr — revisar antes do cliente"
  },
  contracts: [{
    id: "LMN-01",
    label: "Holding",
    scope: "Contábil + societário",
    monthly: 7200.00,
    index: "IPCA",
    anniversary: "Julho",
    startedAt: "01/07/2023",
    nextAnniversary: "01/07/2026",
    end: "01/07/2028",
    lastAdjustedPercent: 4.62,
    lastAdjustedAt: "Jul/2025",
    lastBilling: {
      reference: "Abr/2025",
      amount: 9300.00
    },
    status: "active",
    billingStatus: "under_review",
    alert: {
      level: "risk",
      text: "R$ 2.100 cobrados acima do contrato em abr/2025"
    }
  }, {
    id: "LMN-02",
    label: "Usina Minas Gerais",
    scope: "Contábil + folha (45 colab.)",
    monthly: 3650.00,
    index: "IGP-M",
    anniversary: "Setembro",
    startedAt: "01/09/2024",
    nextAnniversary: "01/09/2026",
    end: "01/09/2026",
    lastAdjustedPercent: 3.94,
    lastAdjustedAt: "Set/2025",
    lastBilling: {
      reference: "Abr/2025",
      amount: 3650.00
    },
    status: "active",
    billingStatus: "issued",
    alert: {
      level: "info",
      text: "Contrato vence em 4 meses — renegociar"
    }
  }, {
    id: "LMN-03",
    label: "Usina Piauí",
    scope: "Contábil + folha (22 colab.)",
    monthly: 2000.00,
    index: "IPCA",
    anniversary: "Janeiro",
    startedAt: "01/01/2024",
    nextAnniversary: "01/01/2027",
    end: "01/01/2027",
    lastAdjustedPercent: 4.50,
    lastAdjustedAt: "Jan/2025",
    lastBilling: {
      reference: "Abr/2025",
      amount: 2000.00
    },
    status: "active",
    billingStatus: "issued",
    alert: {
      level: "none"
    }
  }, {
    id: "LMN-00-OLD",
    label: "Escritório SP (descontinuado)",
    scope: "Contábil",
    monthly: 1450.00,
    index: "IPCA",
    anniversary: "Março",
    startedAt: "01/03/2020",
    nextAnniversary: "—",
    end: "01/03/2023",
    lastAdjustedPercent: 8.75,
    lastAdjustedAt: "Mar/2022",
    lastBilling: {
      reference: "Fev/2023",
      amount: 1450.00
    },
    status: "ended"
  }]
}, {
  id: "casacor",
  name: "Casa & Cor Interiores ME",
  cnpj: "44.102.667/0001-03",
  segment: "Varejo / design",
  portfolioSince: "Fev/2025",
  owner: "Juliana Nunes",
  contacts: {
    name: "Bruna Salles",
    email: "contato@casacor.com.br"
  },
  monthlyTotal: 1890.00,
  billingStatus: "issued",
  billingLabel: "Boleto emitido — venc. 10/05",
  alert: {
    level: "none"
  },
  contracts: [{
    id: "CAC-01",
    label: "Simples Nacional",
    scope: "Contábil + apuração simples",
    monthly: 1890.00,
    index: "IPCA",
    anniversary: "Fevereiro",
    startedAt: "01/02/2025",
    nextAnniversary: "01/02/2027",
    end: "01/02/2027",
    lastAdjustedPercent: 4.50,
    lastAdjustedAt: "Fev/2026",
    lastBilling: {
      reference: "Abr/2025",
      amount: 1890.00
    },
    status: "active",
    billingStatus: "issued",
    alert: {
      level: "none"
    }
  }]
}, {
  id: "nordeste-agri",
  name: "Nordeste Agropecuária S.A.",
  cnpj: "09.554.001/0001-22",
  segment: "Agronegócio",
  portfolioSince: "Ago/2021",
  owner: "Marcos Guedes",
  contacts: {
    name: "Dr. Paulo Correia",
    email: "paulo.correia@nordesteagro.com.br"
  },
  monthlyTotal: 8420.00,
  billingStatus: "overdue",
  billingLabel: "Cobrança de abril em atraso",
  alert: {
    level: "info",
    text: "Aniversário em 45 dias — reajuste IPCA precisa entrar no próximo boleto"
  },
  contracts: [{
    id: "NAG-01",
    label: "Matriz · Petrolina",
    scope: "Contábil + folha + apuração rural",
    monthly: 5200.00,
    index: "IPCA",
    anniversary: "Junho",
    startedAt: "01/06/2021",
    nextAnniversary: "01/06/2026",
    end: "01/06/2027",
    lastAdjustedPercent: 4.83,
    lastAdjustedAt: "Jun/2025",
    lastBilling: {
      reference: "Abr/2025",
      amount: 5200.00
    },
    status: "active",
    billingStatus: "overdue",
    alert: {
      level: "info",
      text: "Aniversário em 45 dias — IPCA no próximo boleto"
    }
  }, {
    id: "NAG-02",
    label: "Filial · Juazeiro",
    scope: "Contábil + folha",
    monthly: 3220.00,
    index: "IPCA",
    anniversary: "Junho",
    startedAt: "01/06/2022",
    nextAnniversary: "01/06/2026",
    end: "01/06/2027",
    lastAdjustedPercent: 4.83,
    lastAdjustedAt: "Jun/2025",
    lastBilling: {
      reference: "Abr/2025",
      amount: 3220.00
    },
    status: "active",
    billingStatus: "overdue",
    alert: {
      level: "none"
    }
  }]
}, {
  id: "vox-clinicas",
  name: "Vox Clínicas Odontológicas",
  cnpj: "31.778.904/0001-71",
  segment: "Saúde / franquia",
  portfolioSince: "Out/2024",
  owner: "Paula Tavares",
  contacts: {
    name: "Camila Abreu",
    email: "cfo@voxclinicas.com"
  },
  monthlyTotal: 6740.00,
  billingStatus: "to_calculate",
  billingLabel: "Calcular cobrança de maio",
  alert: {
    level: "none"
  },
  contracts: [{
    id: "VOX-01",
    label: "Unidade Pinheiros",
    scope: "Contábil + folha (12 colab.)",
    monthly: 2380.00,
    index: "IPCA",
    anniversary: "Outubro",
    startedAt: "01/10/2024",
    nextAnniversary: "01/10/2026",
    end: "01/10/2026",
    lastAdjustedPercent: 4.50,
    lastAdjustedAt: "Out/2025",
    lastBilling: {
      reference: "Abr/2025",
      amount: 2380.00
    },
    status: "active",
    billingStatus: "to_calculate",
    alert: {
      level: "none"
    }
  }, {
    id: "VOX-02",
    label: "Unidade Tatuapé",
    scope: "Contábil + folha (9 colab.)",
    monthly: 2180.00,
    index: "IPCA",
    anniversary: "Outubro",
    startedAt: "01/10/2024",
    nextAnniversary: "01/10/2026",
    end: "01/10/2026",
    lastAdjustedPercent: 4.50,
    lastAdjustedAt: "Out/2025",
    lastBilling: {
      reference: "Abr/2025",
      amount: 2180.00
    },
    status: "active",
    billingStatus: "to_calculate",
    alert: {
      level: "none"
    }
  }, {
    id: "VOX-03",
    label: "Unidade Alphaville",
    scope: "Contábil + folha (8 colab.)",
    monthly: 2180.00,
    index: "IPCA",
    anniversary: "Dezembro",
    startedAt: "01/12/2024",
    nextAnniversary: "01/12/2026",
    end: "01/12/2026",
    lastAdjustedPercent: 4.50,
    lastAdjustedAt: "Dez/2025",
    lastBilling: {
      reference: "Abr/2025",
      amount: 2180.00
    },
    status: "active",
    billingStatus: "to_calculate",
    alert: {
      level: "none"
    }
  }]
}, {
  id: "praia-viva",
  name: "Praia Viva Hotelaria Ltda.",
  cnpj: "17.334.558/0001-18",
  segment: "Hotelaria",
  portfolioSince: "Jan/2026",
  owner: "Juliana Nunes",
  contacts: {
    name: "Tiago Henrique",
    email: "tiago@praiaviva.com"
  },
  monthlyTotal: 3200.00,
  billingStatus: "to_calculate",
  billingLabel: "Primeira cobrança — calcular",
  alert: {
    level: "info",
    text: "Cliente novo — primeira cobrança ainda não foi emitida"
  },
  contracts: [{
    id: "PRV-01",
    label: "Contrato principal",
    scope: "Contábil + folha + tributos",
    monthly: 3200.00,
    index: "IPCA",
    anniversary: "Janeiro",
    startedAt: "01/01/2026",
    nextAnniversary: "01/01/2027",
    end: "01/01/2028",
    lastAdjustedPercent: null,
    lastAdjustedAt: null,
    lastBilling: null,
    status: "active",
    billingStatus: "to_calculate",
    alert: {
      level: "info",
      text: "Primeira cobrança — ainda não foi emitida"
    }
  }]
}, {
  id: "pinheiro-adv",
  name: "Pinheiro & Associados Advocacia",
  cnpj: "26.801.445/0001-60",
  segment: "Serviços jurídicos",
  portfolioSince: "Mai/2022",
  owner: "Marcos Guedes",
  contacts: {
    name: "Dra. Helena Pinheiro",
    email: "helena@pinheiroadv.com.br"
  },
  monthlyTotal: 5600.00,
  billingStatus: "issued",
  billingLabel: "Boleto emitido — venc. 10/05",
  alert: {
    level: "none"
  },
  contracts: [{
    id: "PIN-01",
    label: "Contrato contábil",
    scope: "Contábil + tributos",
    monthly: 4200.00,
    index: "IPCA",
    anniversary: "Maio",
    startedAt: "01/05/2022",
    nextAnniversary: "01/05/2026",
    end: "01/05/2027",
    lastAdjustedPercent: 4.83,
    lastAdjustedAt: "Mai/2025",
    lastBilling: {
      reference: "Abr/2025",
      amount: 4200.00
    },
    status: "active",
    billingStatus: "issued",
    alert: {
      level: "none"
    }
  }, {
    id: "PIN-02",
    label: "Folha de pagamento",
    scope: "Folha (18 advogados + admins)",
    monthly: 1400.00,
    index: "IPCA",
    anniversary: "Maio",
    startedAt: "01/05/2022",
    nextAnniversary: "01/05/2026",
    end: "01/05/2027",
    lastAdjustedPercent: 4.83,
    lastAdjustedAt: "Mai/2025",
    lastBilling: {
      reference: "Abr/2025",
      amount: 1400.00
    },
    status: "active",
    billingStatus: "issued",
    alert: {
      level: "none"
    }
  }]
}, {
  id: "artemis-moda",
  name: "Artemis Moda Feminina",
  cnpj: "52.006.888/0001-04",
  segment: "Varejo / moda",
  portfolioSince: "Set/2023",
  owner: "Paula Tavares",
  contacts: {
    name: "Rita Borges",
    email: "rita@artemismoda.com.br"
  },
  monthlyTotal: 2960.00,
  billingStatus: "under_review",
  billingLabel: "Auditoria pendente",
  alert: {
    level: "loss",
    text: "IPCA não foi aplicado no aniversário — R$ 180 por mês"
  },
  contracts: [{
    id: "ART-01",
    label: "Matriz",
    scope: "Contábil + apuração Simples",
    monthly: 2140.00,
    index: "IPCA",
    anniversary: "Setembro",
    startedAt: "01/09/2023",
    nextAnniversary: "01/09/2026",
    end: "01/09/2027",
    lastAdjustedPercent: 0,
    lastAdjustedAt: "não aplicado",
    lastBilling: {
      reference: "Abr/2025",
      amount: 1960.00
    },
    status: "active",
    billingStatus: "under_review",
    alert: {
      level: "loss",
      text: "IPCA não foi aplicado no aniversário — R$ 180/mês"
    }
  }, {
    id: "ART-02",
    label: "E-commerce CNPJ secundário",
    scope: "Contábil",
    monthly: 820.00,
    index: "IPCA",
    anniversary: "Março",
    startedAt: "01/03/2024",
    nextAnniversary: "01/03/2027",
    end: "01/03/2027",
    lastAdjustedPercent: 4.83,
    lastAdjustedAt: "Mar/2025",
    lastBilling: {
      reference: "Abr/2025",
      amount: 820.00
    },
    status: "active",
    billingStatus: "issued",
    alert: {
      level: "none"
    }
  }]
}];
const CLIENT_ALERT_META = {
  loss: {
    label: "Perda de receita",
    dotClass: "loss"
  },
  risk: {
    label: "Risco de imagem",
    dotClass: "risk"
  },
  info: {
    label: "Aviso",
    dotClass: "info"
  },
  none: null
};
const BILLING_STATUS_META = {
  to_calculate: {
    label: "A calcular",
    className: "to_calculate"
  },
  issued: {
    label: "Emitido",
    className: "issued"
  },
  under_review: {
    label: "Em auditoria",
    className: "under_review"
  },
  overdue: {
    label: "Em atraso",
    className: "overdue"
  }
};
const CLIENTS_SUMMARY = {
  total: CLIENTS.length,
  activeContracts: CLIENTS.reduce((acc, c) => acc + c.contracts.filter(ct => ct.status === "active").length, 0),
  monthlyTotal: CLIENTS.reduce((acc, c) => acc + c.monthlyTotal, 0),
  withAlerts: CLIENTS.filter(c => c.alert && c.alert.level !== "none").length,
  toBillNow: CLIENTS.filter(c => c.billingStatus === "to_calculate" || c.billingStatus === "overdue").length
};
const findClient = id => CLIENTS.find(c => c.id === id);
const findContract = contractId => {
  for (const c of CLIENTS) {
    const ct = c.contracts.find(x => x.id === contractId);
    if (ct) return {
      client: c,
      contract: ct
    };
  }
  return null;
};
Object.assign(window, {
  CLIENTS,
  CLIENT_ALERT_META,
  BILLING_STATUS_META,
  CLIENTS_SUMMARY,
  findClient,
  findContract
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "MVP/components/ClientsData.jsx", error: String((e && e.message) || e) }); }

// MVP/components/ClientsList.jsx
try { (() => {
// Kontiva MVP — ClientsList screen
// Carteira de clientes do escritório contábil. Lista todos os clientes com
// visão de contratos ativos, status da cobrança do mês e alertas.

const {
  useState: useStateCL
} = React;
const fmtBRLList = n => new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
}).format(n);
const AlertDot = ({
  level
}) => {
  if (!level || level === "none") return null;
  return /*#__PURE__*/React.createElement("span", {
    className: "client-alert-dot tone-" + level,
    "aria-hidden": "true"
  });
};
const BillingChip = ({
  status
}) => {
  const meta = BILLING_STATUS_META[status];
  if (!meta) return null;
  return /*#__PURE__*/React.createElement("span", {
    className: "billing-chip tone-" + meta.className
  }, meta.label);
};

// ---------- Contract pill ----------
const ContractPill = ({
  c
}) => /*#__PURE__*/React.createElement("div", {
  className: "contract-pill",
  title: `${c.label} · ${fmtBRLList(c.monthly)}/mês`
}, /*#__PURE__*/React.createElement("span", {
  className: "cp-label"
}, c.label), /*#__PURE__*/React.createElement("span", {
  className: "cp-sep"
}, "\xB7"), /*#__PURE__*/React.createElement("span", {
  className: "cp-value"
}, fmtBRLList(c.monthly)));

// ---------- Row ----------
const ClientRow = ({
  c,
  onOpen
}) => {
  const activeContracts = c.contracts.filter(x => x.status === "active");
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "client-row" + (c.isDemo ? " is-demo" : ""),
    onClick: () => onOpen && onOpen(c)
  }, /*#__PURE__*/React.createElement("div", {
    className: "cr-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cr-avatar",
    "aria-hidden": "true"
  }, c.name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase()), /*#__PURE__*/React.createElement("div", {
    className: "cr-id"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cr-name"
  }, /*#__PURE__*/React.createElement(AlertDot, {
    level: c.alert && c.alert.level
  }), /*#__PURE__*/React.createElement("span", null, c.name), c.isDemo && /*#__PURE__*/React.createElement("span", {
    className: "demo-tag"
  }, "demo")), /*#__PURE__*/React.createElement("div", {
    className: "cr-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, c.cnpj), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, c.segment), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "Gerente ", c.owner.split(" ")[0])))), /*#__PURE__*/React.createElement("div", {
    className: "cr-contracts"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cr-contracts-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cr-contracts-count"
  }, activeContracts.length), /*#__PURE__*/React.createElement("span", {
    className: "cr-contracts-label"
  }, activeContracts.length === 1 ? "contrato ativo" : "contratos ativos")), /*#__PURE__*/React.createElement("div", {
    className: "cr-contracts-pills"
  }, activeContracts.slice(0, 2).map(x => /*#__PURE__*/React.createElement(ContractPill, {
    key: x.id,
    c: x
  })), activeContracts.length > 2 && /*#__PURE__*/React.createElement("span", {
    className: "cp-more"
  }, "+", activeContracts.length - 2))), /*#__PURE__*/React.createElement("div", {
    className: "cr-money"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cr-money-value"
  }, fmtBRLList(c.monthlyTotal)), /*#__PURE__*/React.createElement("div", {
    className: "cr-money-label"
  }, "mensal \xB7 carteira")), /*#__PURE__*/React.createElement("div", {
    className: "cr-status"
  }, /*#__PURE__*/React.createElement(BillingChip, {
    status: c.billingStatus
  }), /*#__PURE__*/React.createElement("div", {
    className: "cr-status-sub"
  }, c.billingLabel), c.alert && c.alert.level !== "none" && /*#__PURE__*/React.createElement("div", {
    className: "cr-alert tone-" + c.alert.level
  }, c.alert.text)), /*#__PURE__*/React.createElement("div", {
    className: "cr-chev",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cr-open-cta"
  }, "Abrir ficha ", /*#__PURE__*/React.createElement(IChevron, {
    dir: "right",
    size: 12
  }))));
};

// ---------- Main ----------
const ClientsList = ({
  user,
  onLogout,
  onOpenClient,
  onNavClick
}) => {
  const [query, setQuery] = useStateCL("");
  const [filter, setFilter] = useStateCL("all"); // all | to_bill | alerts | under_review

  const filtered = CLIENTS.filter(c => {
    const q = query.trim().toLowerCase();
    if (q) {
      const hay = (c.name + " " + c.cnpj + " " + c.segment + " " + c.contacts.name).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filter === "to_bill") return c.billingStatus === "to_calculate" || c.billingStatus === "overdue";
    if (filter === "alerts") return c.alert && c.alert.level !== "none";
    if (filter === "under_review") return c.billingStatus === "under_review";
    return true;
  });
  return /*#__PURE__*/React.createElement(WorkspaceShell, {
    activeNav: "clients",
    counts: {
      clients: CLIENTS_SUMMARY.total,
      contracts: CLIENTS_SUMMARY.activeContracts
    },
    onNavClick: onNavClick
  }, /*#__PURE__*/React.createElement("div", {
    className: "ws-topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "crumb"
  }, /*#__PURE__*/React.createElement("span", null, "Clientes"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--azul-profundo)"
    }
  }, "Carteira")), /*#__PURE__*/React.createElement("div", {
    className: "right-actions"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13,
      color: "var(--cinza-escuro)",
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "avatar",
    style: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      background: "var(--azul-profundo)",
      color: "#EAF6FF",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 700
    }
  }, "MG"), /*#__PURE__*/React.createElement("span", null, user)), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    className: "btn btn-ghost",
    style: {
      padding: "8px 14px",
      fontSize: 13
    }
  }, "Sair"))), /*#__PURE__*/React.createElement("div", {
    className: "ws-body cl-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cl-wrap"
  }, /*#__PURE__*/React.createElement("header", {
    className: "cl-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " Sua carteira"), /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", {
    className: "serif-accent"
  }, "Clientes"), " do escrit\xF3rio"), /*#__PURE__*/React.createElement("p", null, "Cada cliente com seus contratos ativos, status da cobran\xE7a do m\xEAs e alertas de cobran\xE7a incorreta. Clique para abrir a ficha completa.")), /*#__PURE__*/React.createElement("div", {
    className: "cl-head-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary"
  }, /*#__PURE__*/React.createElement(IPlus, {
    size: 13
  }), " Novo cliente"))), /*#__PURE__*/React.createElement("div", {
    className: "cl-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cl-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cls-num"
  }, CLIENTS_SUMMARY.total), /*#__PURE__*/React.createElement("div", {
    className: "cls-label"
  }, "clientes ativos")), /*#__PURE__*/React.createElement("div", {
    className: "cl-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cls-num"
  }, CLIENTS_SUMMARY.activeContracts), /*#__PURE__*/React.createElement("div", {
    className: "cls-label"
  }, "contratos vigentes")), /*#__PURE__*/React.createElement("div", {
    className: "cl-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cls-num"
  }, fmtBRLList(CLIENTS_SUMMARY.monthlyTotal).replace("R$", "").trim()), /*#__PURE__*/React.createElement("div", {
    className: "cls-label"
  }, "mensal da carteira")), /*#__PURE__*/React.createElement("div", {
    className: "cl-stat cl-stat--accent"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cls-num cls-num--alert"
  }, CLIENTS_SUMMARY.withAlerts), /*#__PURE__*/React.createElement("div", {
    className: "cls-label"
  }, "clientes com alerta")), /*#__PURE__*/React.createElement("div", {
    className: "cl-stat cl-stat--accent"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cls-num cls-num--action"
  }, CLIENTS_SUMMARY.toBillNow), /*#__PURE__*/React.createElement("div", {
    className: "cls-label"
  }, "a cobrar este m\xEAs"))), /*#__PURE__*/React.createElement("div", {
    className: "cl-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cl-search"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cl-search-ico",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7",
    stroke: "currentColor",
    strokeWidth: "1.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 16l4 4",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Buscar por nome, CNPJ ou contato",
    value: query,
    onChange: e => setQuery(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "cl-filters",
    role: "tablist"
  }, [{
    id: "all",
    label: "Todos"
  }, {
    id: "to_bill",
    label: "A cobrar"
  }, {
    id: "alerts",
    label: "Com alerta"
  }, {
    id: "under_review",
    label: "Em auditoria"
  }].map(f => /*#__PURE__*/React.createElement("button", {
    key: f.id,
    className: "cl-filter" + (filter === f.id ? " active" : ""),
    onClick: () => setFilter(f.id)
  }, f.label)))), /*#__PURE__*/React.createElement("div", {
    className: "cl-table-head"
  }, /*#__PURE__*/React.createElement("div", null, "Cliente"), /*#__PURE__*/React.createElement("div", null, "Contratos ativos"), /*#__PURE__*/React.createElement("div", null, "Mensal"), /*#__PURE__*/React.createElement("div", null, "Cobran\xE7a do m\xEAs"), /*#__PURE__*/React.createElement("div", null)), /*#__PURE__*/React.createElement("div", {
    className: "cl-list"
  }, filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "cl-empty"
  }, "Nenhum cliente encontrado com esse filtro."), filtered.map(c => /*#__PURE__*/React.createElement(ClientRow, {
    key: c.id,
    c: c,
    onOpen: onOpenClient
  }))))));
};
Object.assign(window, {
  ClientsList
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "MVP/components/ClientsList.jsx", error: String((e && e.message) || e) }); }

// MVP/components/ContractsList.jsx
try { (() => {
// Kontiva MVP — ContractsList (flat view of all contracts across clients)
// Segue o MESMO padrão visual da ClientsList — topbar, hero, stats, toolbar,
// lista de cards. Classes utilitárias reaproveitadas (.cl-*, .cr-*).

const {
  useState: useStateCtr
} = React;
const fmtBRLCtr = n => new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
}).format(n);

// Reutiliza BILLING_STATUS_META (definido em ClientsData.jsx). Se o status
// não estiver lá (ex.: "ended"), cai num fallback neutro.
const contractChipMeta = status => {
  if (status === "ended") return {
    label: "Encerrado",
    className: "muted"
  };
  return BILLING_STATUS_META[status] || {
    label: status,
    className: "neutral"
  };
};
const ContractAlertDot = ({
  level
}) => {
  if (!level || level === "none") return null;
  return /*#__PURE__*/React.createElement("span", {
    className: "client-alert-dot tone-" + level,
    "aria-hidden": "true"
  });
};
const ContractRow = ({
  r,
  onOpen
}) => {
  const chip = contractChipMeta(r.billingStatus || (r.status === "ended" ? "ended" : "to_calculate"));
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "client-row contract-row" + (r.status === "ended" ? " is-ended" : "") + (r.isDemo ? " is-demo" : ""),
    onClick: () => onOpen && onOpen({
      id: r.clientId
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "cr-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cr-avatar cr-avatar--contract",
    "aria-hidden": "true"
  }, (r.label || "").slice(0, 2).toUpperCase()), /*#__PURE__*/React.createElement("div", {
    className: "cr-id"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cr-name"
  }, /*#__PURE__*/React.createElement(ContractAlertDot, {
    level: r.alert && r.alert.level
  }), /*#__PURE__*/React.createElement("span", null, r.label), r.isDemo && /*#__PURE__*/React.createElement("span", {
    className: "demo-tag"
  }, "demo")), /*#__PURE__*/React.createElement("div", {
    className: "cr-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, r.id), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, r.clientName), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, r.clientCnpj)))), /*#__PURE__*/React.createElement("div", {
    className: "cr-contracts"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cr-contracts-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cr-contracts-count mono"
  }, r.index || "—"), /*#__PURE__*/React.createElement("span", {
    className: "cr-contracts-label"
  }, "anivers\xE1rio em ", r.anniversary || "—")), /*#__PURE__*/React.createElement("div", {
    className: "cr-contracts-pills"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contract-pill"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cp-label"
  }, "\xFAltimo reajuste"), /*#__PURE__*/React.createElement("span", {
    className: "cp-sep"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    className: "cp-value"
  }, r.lastAdjustedPercent ? `${r.lastAdjustedPercent.toLocaleString("pt-BR", {
    minimumFractionDigits: 2
  })}% · ${r.lastAdjustedAt}` : "—")))), /*#__PURE__*/React.createElement("div", {
    className: "cr-money"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cr-money-value"
  }, fmtBRLCtr(r.monthly || 0)), /*#__PURE__*/React.createElement("div", {
    className: "cr-money-label"
  }, "mensal \xB7 reajustado")), /*#__PURE__*/React.createElement("div", {
    className: "cr-status"
  }, /*#__PURE__*/React.createElement("span", {
    className: "billing-chip tone-" + chip.className
  }, chip.label), /*#__PURE__*/React.createElement("div", {
    className: "cr-status-sub"
  }, r.lastBilling ? `Últ. cobrança ${r.lastBilling.reference} · ${fmtBRLCtr(r.lastBilling.amount)}` : "Sem cobranças"), r.alert && r.alert.level !== "none" && /*#__PURE__*/React.createElement("div", {
    className: "cr-alert tone-" + r.alert.level
  }, r.alert.text)), /*#__PURE__*/React.createElement("div", {
    className: "cr-chev",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cr-open-cta"
  }, "Abrir ficha ", /*#__PURE__*/React.createElement(IChevron, {
    dir: "right",
    size: 12
  }))));
};
const ContractsList = ({
  user,
  onLogout,
  onOpenClient,
  onNavClick
}) => {
  const [query, setQuery] = useStateCtr("");
  const [filter, setFilter] = useStateCtr("active"); // active | ended | all

  // Flatten contracts with client info
  const rows = [];
  for (const c of CLIENTS) {
    for (const k of c.contracts) {
      rows.push({
        ...k,
        clientId: c.id,
        clientName: c.name,
        clientCnpj: c.cnpj,
        clientSegment: c.segment,
        clientOwner: c.owner,
        isDemo: c.isDemo
      });
    }
  }
  const actives = rows.filter(r => r.status === "active");
  const countEnded = rows.filter(r => r.status === "ended").length;
  const withAlert = actives.filter(r => r.alert && r.alert.level !== "none").length;
  const totalMonthly = actives.reduce((s, r) => s + (r.monthly || 0), 0);
  const nextAnniversaries = actives.filter(r => {
    // Simplistic: contracts whose anniversary is in the next 60 days (mock)
    return r.nextAnniversary && r.nextAnniversary !== "—";
  }).length;
  const filtered = rows.filter(r => {
    const q = query.trim().toLowerCase();
    if (q) {
      const hay = (r.label + " " + r.id + " " + r.clientName + " " + r.clientCnpj + " " + (r.index || "")).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filter === "active") return r.status === "active";
    if (filter === "ended") return r.status === "ended";
    if (filter === "alerts") return r.alert && r.alert.level !== "none" && r.status === "active";
    return true;
  });
  return /*#__PURE__*/React.createElement(WorkspaceShell, {
    activeNav: "contracts",
    counts: {
      clients: CLIENTS_SUMMARY.total,
      contracts: CLIENTS_SUMMARY.activeContracts
    },
    onNavClick: onNavClick
  }, /*#__PURE__*/React.createElement("div", {
    className: "ws-topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "crumb"
  }, /*#__PURE__*/React.createElement("span", null, "Contratos"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--azul-profundo)"
    }
  }, "Todos da carteira")), /*#__PURE__*/React.createElement("div", {
    className: "right-actions"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13,
      color: "var(--cinza-escuro)",
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "avatar",
    style: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      background: "var(--azul-profundo)",
      color: "#EAF6FF",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 700
    }
  }, "MG"), /*#__PURE__*/React.createElement("span", null, user)), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    className: "btn btn-ghost",
    style: {
      padding: "8px 14px",
      fontSize: 13
    }
  }, "Sair"))), /*#__PURE__*/React.createElement("div", {
    className: "ws-body cl-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cl-wrap"
  }, /*#__PURE__*/React.createElement("header", {
    className: "cl-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " Carteira \xB7 contratos"), /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", {
    className: "serif-accent"
  }, "Contratos"), " da carteira"), /*#__PURE__*/React.createElement("p", null, "Vis\xE3o plana de todos os contratos \u2014 ativos, encerrados e em auditoria. Cada contrato tem \xEDndice, anivers\xE1rio e status de cobran\xE7a pr\xF3prios. Clique em qualquer linha para abrir a ficha do cliente dono."))), /*#__PURE__*/React.createElement("div", {
    className: "cl-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cl-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cls-num"
  }, actives.length), /*#__PURE__*/React.createElement("div", {
    className: "cls-label"
  }, "contratos ativos")), /*#__PURE__*/React.createElement("div", {
    className: "cl-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cls-num"
  }, fmtBRLCtr(totalMonthly).replace("R$", "").trim()), /*#__PURE__*/React.createElement("div", {
    className: "cls-label"
  }, "mensal somado")), /*#__PURE__*/React.createElement("div", {
    className: "cl-stat cl-stat--accent"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cls-num cls-num--alert"
  }, withAlert), /*#__PURE__*/React.createElement("div", {
    className: "cls-label"
  }, "com alerta")), /*#__PURE__*/React.createElement("div", {
    className: "cl-stat cl-stat--accent"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cls-num cls-num--action"
  }, nextAnniversaries), /*#__PURE__*/React.createElement("div", {
    className: "cls-label"
  }, "anivers\xE1rios \xE0 frente")), /*#__PURE__*/React.createElement("div", {
    className: "cl-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cls-num"
  }, countEnded), /*#__PURE__*/React.createElement("div", {
    className: "cls-label"
  }, "encerrados"))), /*#__PURE__*/React.createElement("div", {
    className: "cl-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cl-search"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cl-search-ico",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7",
    stroke: "currentColor",
    strokeWidth: "1.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 16l4 4",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Buscar por contrato, cliente, CNPJ ou \xEDndice",
    value: query,
    onChange: e => setQuery(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "cl-filters",
    role: "tablist"
  }, [{
    id: "active",
    label: `Ativos ${actives.length}`
  }, {
    id: "alerts",
    label: `Com alerta ${withAlert}`
  }, {
    id: "ended",
    label: `Encerrados ${countEnded}`
  }, {
    id: "all",
    label: `Todos ${rows.length}`
  }].map(f => /*#__PURE__*/React.createElement("button", {
    key: f.id,
    className: "cl-filter" + (filter === f.id ? " active" : ""),
    onClick: () => setFilter(f.id)
  }, f.label)))), /*#__PURE__*/React.createElement("div", {
    className: "cl-table-head"
  }, /*#__PURE__*/React.createElement("div", null, "Contrato"), /*#__PURE__*/React.createElement("div", null, "\xCDndice / anivers\xE1rio"), /*#__PURE__*/React.createElement("div", null, "Mensal"), /*#__PURE__*/React.createElement("div", null, "Cobran\xE7a do m\xEAs"), /*#__PURE__*/React.createElement("div", null)), /*#__PURE__*/React.createElement("div", {
    className: "cl-list"
  }, filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "cl-empty"
  }, "Nenhum contrato encontrado com esse filtro."), filtered.map(r => /*#__PURE__*/React.createElement(ContractRow, {
    key: r.clientId + "__" + r.id,
    r: r,
    onOpen: onOpenClient
  }))))));
};
Object.assign(window, {
  ContractsList
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "MVP/components/ContractsList.jsx", error: String((e && e.message) || e) }); }

// MVP/components/Documents.jsx
try { (() => {
// Kontiva MVP — Documents list screen
// Registro de todos os documentos enviados ao Kontiva (contratos, aditivos,
// lançamentos, notas, extratos). Cada linha exibe nome, tipo, cliente ligado,
// tamanho/páginas, status de processamento e ações (ver · baixar).
//
// Segue o mesmo padrão visual de ClientsList / ContractsList — .cl-wrap,
// .cl-stats, .cl-toolbar, .client-row — mas com uma variante .document-row
// para aproveitar o grid e colunas já definidas.

const {
  useState: useStateDoc,
  useMemo: useMemoDoc
} = React;
const fmtSizeDoc = kb => {
  if (kb == null) return "—";
  if (kb < 1024) return kb + " KB";
  return (kb / 1024).toFixed(1).replace(".", ",") + " MB";
};
const extOf = fileName => {
  const m = /\.([a-z0-9]+)$/i.exec(fileName || "");
  return (m ? m[1] : "doc").toUpperCase();
};

// --- Document-type icon (renders inside the file-shaped avatar) ---
const DocTypeIcon = ({
  iconKey,
  size = 18
}) => {
  if (iconKey === "sheet") return /*#__PURE__*/React.createElement(ISheet, {
    size: size
  });
  return /*#__PURE__*/React.createElement(IDoc, {
    size: size
  });
};

// --- Status chip (with animated pulse for "processing") ---
const DocStatusChip = ({
  status
}) => {
  const meta = DOC_STATUS_META[status];
  if (!meta) return null;
  return /*#__PURE__*/React.createElement("span", {
    className: "doc-status-chip tone-" + meta.className
  }, /*#__PURE__*/React.createElement("span", {
    className: "sc-dot",
    "aria-hidden": "true"
  }), meta.label);
};

// --- Individual row ---
const DocumentRow = ({
  d,
  onView,
  onDownload
}) => {
  const type = DOC_TYPE_META[d.type] || {
    label: d.type,
    icon: "doc"
  };
  const ext = extOf(d.name);
  const handleDownload = e => {
    e.stopPropagation();
    onDownload && onDownload(d);
  };
  const handleView = e => {
    e.stopPropagation();
    onView && onView(d);
  };
  const handleRowClick = () => onView && onView(d);
  return /*#__PURE__*/React.createElement("div", {
    className: "client-row document-row" + (d.isDemo ? " is-demo" : ""),
    onClick: handleRowClick,
    role: "button",
    tabIndex: 0,
    onKeyDown: e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleRowClick();
      }
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cr-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "doc-avatar type-" + d.type,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement(DocTypeIcon, {
    iconKey: type.icon,
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    className: "doc-ext"
  }, ext)), /*#__PURE__*/React.createElement("div", {
    className: "cr-id"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cr-doc-name",
    title: d.name
  }, /*#__PURE__*/React.createElement("span", null, d.name), d.isDemo && /*#__PURE__*/React.createElement("span", {
    className: "demo-tag"
  }, "demo")), /*#__PURE__*/React.createElement("div", {
    className: "cr-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cr-doc-id"
  }, d.id), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "Enviado ", d.uploadedAt), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "por ", d.uploadedBy.split(" ")[0])))), /*#__PURE__*/React.createElement("div", {
    className: "cr-contracts"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cr-contracts-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "doc-type-pill type-" + d.type
  }, /*#__PURE__*/React.createElement(DocTypeIcon, {
    iconKey: type.icon,
    size: 12
  }), type.label)), /*#__PURE__*/React.createElement("div", {
    className: "cr-contracts-pills",
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "contract-pill",
    title: d.clientName
  }, /*#__PURE__*/React.createElement("span", {
    className: "cp-value",
    style: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      maxWidth: 180
    }
  }, d.clientName)), d.contractLabel && /*#__PURE__*/React.createElement("div", {
    className: "contract-pill",
    style: {
      background: "transparent",
      border: "1px solid rgba(10,31,63,0.1)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "cp-label"
  }, d.contractLabel)))), /*#__PURE__*/React.createElement("div", {
    className: "cr-doc-size"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cr-doc-size-value"
  }, fmtSizeDoc(d.sizeKB)), /*#__PURE__*/React.createElement("div", {
    className: "cr-doc-size-label"
  }, d.pages != null ? `${d.pages} ${d.pages === 1 ? "página" : "páginas"}` : d.rows != null ? `${d.rows.toLocaleString("pt-BR")} linhas` : "—")), /*#__PURE__*/React.createElement("div", {
    className: "cr-status"
  }, /*#__PURE__*/React.createElement(DocStatusChip, {
    status: d.status
  }), /*#__PURE__*/React.createElement("div", {
    className: "cr-doc-insight" + (d.insight ? "" : " empty")
  }, d.insight || "Sem observações")), /*#__PURE__*/React.createElement("div", {
    className: "cr-doc-actions",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "doc-icon-btn",
    onClick: handleView,
    "aria-label": "Ver documento",
    title: "Ver"
  }, /*#__PURE__*/React.createElement(IEye, {
    size: 15
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "doc-icon-btn primary",
    onClick: handleDownload,
    "aria-label": `Baixar ${d.name}`,
    title: "Baixar",
    disabled: d.status === "processing" || d.status === "failed",
    style: d.status === "processing" || d.status === "failed" ? {
      opacity: 0.5,
      cursor: "not-allowed",
      boxShadow: "none"
    } : undefined
  }, /*#__PURE__*/React.createElement(IDownload, {
    size: 15
  }))));
};

// --- Main screen ---
const DocumentsList = ({
  user,
  onLogout,
  onNavClick
}) => {
  const [query, setQuery] = useStateDoc("");
  const [statusFilter, setStatusFilter] = useStateDoc("all");
  const [typeFilter, setTypeFilter] = useStateDoc("all");
  const [toast, setToast] = useStateDoc(null);
  const STATUS_FILTERS = [{
    id: "all",
    label: "Todos"
  }, {
    id: "processed",
    label: "Processados"
  }, {
    id: "review",
    label: "Aguardando revisão"
  }, {
    id: "processing",
    label: "Processando"
  }, {
    id: "failed",
    label: "Falhou"
  }, {
    id: "archived",
    label: "Arquivados"
  }];
  const TYPE_FILTERS = [{
    id: "all",
    label: "Todos"
  }, {
    id: "contract",
    label: "Contratos"
  }, {
    id: "amendment",
    label: "Aditivos"
  }, {
    id: "billing",
    label: "Lançamentos"
  }, {
    id: "invoice",
    label: "Notas"
  }, {
    id: "statement",
    label: "Extratos"
  }, {
    id: "receipt",
    label: "Comprovantes"
  }];
  const filtered = useMemoDoc(() => {
    return DOCUMENTS.filter(d => {
      const q = query.trim().toLowerCase();
      if (q) {
        const hay = (d.name + " " + d.id + " " + d.clientName + " " + (d.contractLabel || "") + " " + (d.insight || "")).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (statusFilter !== "all" && d.status !== statusFilter) return false;
      if (typeFilter !== "all" && d.type !== typeFilter) return false;
      return true;
    });
  }, [query, statusFilter, typeFilter]);
  const handleDownload = d => {
    // Simulação: mostra um toast rápido. No produto real isto dispararia
    // o download real a partir do storage.
    setToast({
      kind: "download",
      text: `Baixando ${d.name}…`
    });
    window.clearTimeout(handleDownload._t);
    handleDownload._t = window.setTimeout(() => setToast(null), 2400);
  };
  const handleView = d => {
    setToast({
      kind: "view",
      text: `Abrindo ${d.name}…`
    });
    window.clearTimeout(handleView._t);
    handleView._t = window.setTimeout(() => setToast(null), 1800);
  };
  return /*#__PURE__*/React.createElement(WorkspaceShell, {
    activeNav: "documents",
    counts: {
      clients: CLIENTS_SUMMARY.total,
      contracts: CLIENTS_SUMMARY.activeContracts,
      documents: DOCUMENTS_SUMMARY.total
    },
    onNavClick: onNavClick
  }, /*#__PURE__*/React.createElement("div", {
    className: "ws-topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "crumb"
  }, /*#__PURE__*/React.createElement("span", null, "Documentos"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--azul-profundo)"
    }
  }, "Todos os envios")), /*#__PURE__*/React.createElement("div", {
    className: "right-actions"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13,
      color: "var(--cinza-escuro)",
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "avatar",
    style: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      background: "var(--azul-profundo)",
      color: "#EAF6FF",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 700
    }
  }, "MG"), /*#__PURE__*/React.createElement("span", null, user)), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    className: "btn btn-ghost",
    style: {
      padding: "8px 14px",
      fontSize: 13
    }
  }, "Sair"))), /*#__PURE__*/React.createElement("div", {
    className: "ws-body cl-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cl-wrap"
  }, /*#__PURE__*/React.createElement("header", {
    className: "cl-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " Arquivo \xB7 documentos"), /*#__PURE__*/React.createElement("h1", null, "Tudo que a gente ", /*#__PURE__*/React.createElement("span", {
    className: "serif-accent"
  }, "leu"), " por voc\xEA"), /*#__PURE__*/React.createElement("p", null, "Registro completo dos documentos enviados: contratos, aditivos, lan\xE7amentos, notas e extratos. Cada um mostra o status de processamento da Kontiva e o que a gente achou l\xE1 dentro. Baixe o original a qualquer momento.")), /*#__PURE__*/React.createElement("div", {
    className: "cl-head-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => onNavClick && onNavClick("home")
  }, /*#__PURE__*/React.createElement(IUpload, {
    size: 14
  }), " Enviar documento"))), /*#__PURE__*/React.createElement("div", {
    className: "cl-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cl-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cls-num"
  }, DOCUMENTS_SUMMARY.total), /*#__PURE__*/React.createElement("div", {
    className: "cls-label"
  }, "documentos totais")), /*#__PURE__*/React.createElement("div", {
    className: "cl-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cls-num"
  }, DOCUMENTS_SUMMARY.processed), /*#__PURE__*/React.createElement("div", {
    className: "cls-label"
  }, "processados")), /*#__PURE__*/React.createElement("div", {
    className: "cl-stat cl-stat--accent"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cls-num cls-num--action"
  }, DOCUMENTS_SUMMARY.review), /*#__PURE__*/React.createElement("div", {
    className: "cls-label"
  }, "aguardando revis\xE3o")), /*#__PURE__*/React.createElement("div", {
    className: "cl-stat cl-stat--accent"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cls-num cls-num--alert"
  }, DOCUMENTS_SUMMARY.failed), /*#__PURE__*/React.createElement("div", {
    className: "cls-label"
  }, "falharam")), /*#__PURE__*/React.createElement("div", {
    className: "cl-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cls-num"
  }, "Hoje"), /*#__PURE__*/React.createElement("div", {
    className: "cls-label"
  }, "\xFAltimo envio \xB7 14:38"))), /*#__PURE__*/React.createElement("div", {
    className: "cl-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cl-search"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cl-search-ico",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7",
    stroke: "currentColor",
    strokeWidth: "1.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 16l4 4",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Buscar por nome, cliente, contrato ou ID",
    value: query,
    onChange: e => setQuery(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "cl-filters",
    role: "tablist",
    "aria-label": "Filtro por status"
  }, STATUS_FILTERS.map(f => /*#__PURE__*/React.createElement("button", {
    key: f.id,
    className: "cl-filter" + (statusFilter === f.id ? " active" : ""),
    onClick: () => setStatusFilter(f.id)
  }, f.label)))), /*#__PURE__*/React.createElement("div", {
    className: "cl-filters-group",
    role: "tablist",
    "aria-label": "Filtro por tipo",
    style: {
      marginTop: -6,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "cl-filters-label"
  }, "Tipo"), TYPE_FILTERS.map(f => /*#__PURE__*/React.createElement("button", {
    key: f.id,
    className: "cl-filter" + (typeFilter === f.id ? " active" : ""),
    onClick: () => setTypeFilter(f.id)
  }, f.label))), /*#__PURE__*/React.createElement("div", {
    className: "cl-table-head"
  }, /*#__PURE__*/React.createElement("div", null, "Documento"), /*#__PURE__*/React.createElement("div", null, "Tipo \xB7 cliente"), /*#__PURE__*/React.createElement("div", null, "Tamanho"), /*#__PURE__*/React.createElement("div", null, "Status"), /*#__PURE__*/React.createElement("div", null)), /*#__PURE__*/React.createElement("div", {
    className: "cl-list"
  }, filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "cl-empty"
  }, "Nenhum documento encontrado com esse filtro."), filtered.map(d => /*#__PURE__*/React.createElement(DocumentRow, {
    key: d.id,
    d: d,
    onDownload: handleDownload,
    onView: handleView
  }))))), toast && /*#__PURE__*/React.createElement("div", {
    role: "status",
    "aria-live": "polite",
    style: {
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
      border: "1px solid rgba(255,255,255,0.08)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ciano)",
      display: "inline-flex"
    }
  }, toast.kind === "download" ? /*#__PURE__*/React.createElement(IDownload, {
    size: 14
  }) : /*#__PURE__*/React.createElement(IEye, {
    size: 14
  })), /*#__PURE__*/React.createElement("span", null, toast.text)));
};
Object.assign(window, {
  DocumentsList
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "MVP/components/Documents.jsx", error: String((e && e.message) || e) }); }

// MVP/components/DocumentsData.jsx
try { (() => {
// Kontiva MVP — Documents mock data
// Registro de todos os documentos enviados para o Kontiva pela carteira:
// contratos, aditivos, planilhas de cobrança, notas fiscais etc.
// Cada documento carrega cliente, contrato (se aplicável), tipo, status de
// processamento pela IA, tamanho, data de envio e quem enviou.

const DOC_TYPE_META = {
  contract: {
    label: "Contrato",
    icon: "doc"
  },
  amendment: {
    label: "Aditivo",
    icon: "doc"
  },
  billing: {
    label: "Lançamentos",
    icon: "sheet"
  },
  invoice: {
    label: "Nota fiscal",
    icon: "doc"
  },
  receipt: {
    label: "Comprovante",
    icon: "doc"
  },
  statement: {
    label: "Extrato",
    icon: "sheet"
  }
};
const DOC_STATUS_META = {
  processed: {
    label: "Processado",
    className: "processed"
  },
  review: {
    label: "Aguardando revisão",
    className: "review"
  },
  processing: {
    label: "Processando",
    className: "processing"
  },
  failed: {
    label: "Falhou",
    className: "failed"
  },
  archived: {
    label: "Arquivado",
    className: "archived"
  }
};

// Documentos listados por ordem decrescente de envio. Mock realista — mistura
// de contratos processados com insights, planilhas de cobrança recentes, e
// alguns itens em estados intermediários (processando, falhou, revisão).
const DOCUMENTS = [{
  id: "DOC-2043",
  name: "Contrato_Horizonte_Matriz_2024.pdf",
  type: "contract",
  clientId: "horizonte",
  clientName: "Construtora Horizonte Ltda.",
  contractId: "HRZ-01",
  contractLabel: "Matriz · SP",
  sizeKB: 842,
  pages: 14,
  uploadedAt: "22/04/2026 · 14:32",
  uploadedBy: "Marcos Guedes",
  status: "processed",
  insight: "3 cláusulas de reajuste extraídas · IPCA anual em março",
  isDemo: true
}, {
  id: "DOC-2042",
  name: "Lancamentos_Horizonte_Abr2026.xlsx",
  type: "billing",
  clientId: "horizonte",
  clientName: "Construtora Horizonte Ltda.",
  contractId: "HRZ-01",
  contractLabel: "Matriz · SP",
  sizeKB: 94,
  rows: 128,
  uploadedAt: "22/04/2026 · 14:38",
  uploadedBy: "Marcos Guedes",
  status: "processed",
  insight: "R$ 364 de subfaturamento identificados em 3 meses",
  isDemo: true
}, {
  id: "DOC-2041",
  name: "Aditivo_02_Lumen_Holding.pdf",
  type: "amendment",
  clientId: "lumen",
  clientName: "Lumen Energia Renovável S.A.",
  contractId: "LMN-01",
  contractLabel: "Holding",
  sizeKB: 316,
  pages: 4,
  uploadedAt: "21/04/2026 · 10:12",
  uploadedBy: "Paula Tavares",
  status: "review",
  insight: "Cláusula 7.2 alterada — revisar percentual de reajuste"
}, {
  id: "DOC-2040",
  name: "Contrato_Lumen_Usina_MG.pdf",
  type: "contract",
  clientId: "lumen",
  clientName: "Lumen Energia Renovável S.A.",
  contractId: "LMN-02",
  contractLabel: "Usina Minas Gerais",
  sizeKB: 1120,
  pages: 22,
  uploadedAt: "20/04/2026 · 16:47",
  uploadedBy: "Paula Tavares",
  status: "processed",
  insight: "Índice IGP-M · aniversário em setembro"
}, {
  id: "DOC-2039",
  name: "Lancamentos_Lumen_Abr2026.xlsx",
  type: "billing",
  clientId: "lumen",
  clientName: "Lumen Energia Renovável S.A.",
  contractId: null,
  contractLabel: "Todos os contratos",
  sizeKB: 212,
  rows: 341,
  uploadedAt: "20/04/2026 · 09:03",
  uploadedBy: "Paula Tavares",
  status: "processed",
  insight: "R$ 2.100 cobrados acima — auditoria aberta"
}, {
  id: "DOC-2038",
  name: "Contrato_CasaCor_Simples.pdf",
  type: "contract",
  clientId: "casacor",
  clientName: "Casa & Cor Interiores ME",
  contractId: "CAC-01",
  contractLabel: "Simples Nacional",
  sizeKB: 508,
  pages: 9,
  uploadedAt: "19/04/2026 · 11:21",
  uploadedBy: "Juliana Nunes",
  status: "processed",
  insight: "IPCA anual · fevereiro · sem pegadinhas"
}, {
  id: "DOC-2037",
  name: "NFSe_CasaCor_042026.pdf",
  type: "invoice",
  clientId: "casacor",
  clientName: "Casa & Cor Interiores ME",
  contractId: "CAC-01",
  contractLabel: "Simples Nacional",
  sizeKB: 76,
  pages: 1,
  uploadedAt: "19/04/2026 · 11:24",
  uploadedBy: "Juliana Nunes",
  status: "archived",
  insight: null
}, {
  id: "DOC-2036",
  name: "Contrato_Nordeste_Matriz_Petrolina.pdf",
  type: "contract",
  clientId: "nordeste-agri",
  clientName: "Nordeste Agropecuária S.A.",
  contractId: "NAG-01",
  contractLabel: "Matriz · Petrolina",
  sizeKB: 1340,
  pages: 28,
  uploadedAt: "18/04/2026 · 15:55",
  uploadedBy: "Marcos Guedes",
  status: "processed",
  insight: "Aniversário em junho · IPCA precisa entrar no próximo boleto"
}, {
  id: "DOC-2035",
  name: "Contrato_Nordeste_Filial_Juazeiro.pdf",
  type: "contract",
  clientId: "nordeste-agri",
  clientName: "Nordeste Agropecuária S.A.",
  contractId: "NAG-02",
  contractLabel: "Filial · Juazeiro",
  sizeKB: 1180,
  pages: 24,
  uploadedAt: "18/04/2026 · 15:58",
  uploadedBy: "Marcos Guedes",
  status: "processed",
  insight: "Mesmas cláusulas do contrato-matriz"
}, {
  id: "DOC-2034",
  name: "Lancamentos_Vox_Abr2026.xlsx",
  type: "billing",
  clientId: "vox-clinicas",
  clientName: "Vox Clínicas Odontológicas",
  contractId: null,
  contractLabel: "3 unidades",
  sizeKB: 184,
  rows: 287,
  uploadedAt: "17/04/2026 · 13:40",
  uploadedBy: "Paula Tavares",
  status: "processing",
  insight: null
}, {
  id: "DOC-2033",
  name: "Contrato_PraiaViva_Principal.pdf",
  type: "contract",
  clientId: "praia-viva",
  clientName: "Praia Viva Hotelaria Ltda.",
  contractId: "PRV-01",
  contractLabel: "Contrato principal",
  sizeKB: 624,
  pages: 12,
  uploadedAt: "17/04/2026 · 10:05",
  uploadedBy: "Juliana Nunes",
  status: "processed",
  insight: "Cliente novo · primeira cobrança ainda não emitida"
}, {
  id: "DOC-2032",
  name: "Contrato_Pinheiro_Advocacia.pdf",
  type: "contract",
  clientId: "pinheiro-adv",
  clientName: "Pinheiro & Associados Advocacia",
  contractId: "PIN-01",
  contractLabel: "Contrato contábil",
  sizeKB: 488,
  pages: 8,
  uploadedAt: "15/04/2026 · 09:22",
  uploadedBy: "Marcos Guedes",
  status: "processed",
  insight: "IPCA · maio · reajuste já aplicado"
}, {
  id: "DOC-2031",
  name: "Contrato_Pinheiro_Folha.pdf",
  type: "contract",
  clientId: "pinheiro-adv",
  clientName: "Pinheiro & Associados Advocacia",
  contractId: "PIN-02",
  contractLabel: "Folha de pagamento",
  sizeKB: 412,
  pages: 7,
  uploadedAt: "15/04/2026 · 09:25",
  uploadedBy: "Marcos Guedes",
  status: "processed",
  insight: "Folha de 18 profissionais — IPCA em maio"
}, {
  id: "DOC-2030",
  name: "Contrato_Artemis_Matriz_ilegivel.pdf",
  type: "contract",
  clientId: "artemis-moda",
  clientName: "Artemis Moda Feminina",
  contractId: "ART-01",
  contractLabel: "Matriz",
  sizeKB: 298,
  pages: 6,
  uploadedAt: "14/04/2026 · 17:18",
  uploadedBy: "Paula Tavares",
  status: "failed",
  insight: "PDF escaneado em baixa resolução — reenviar original"
}, {
  id: "DOC-2029",
  name: "Lancamentos_Artemis_Abr2026.xlsx",
  type: "billing",
  clientId: "artemis-moda",
  clientName: "Artemis Moda Feminina",
  contractId: "ART-01",
  contractLabel: "Matriz",
  sizeKB: 132,
  rows: 196,
  uploadedAt: "14/04/2026 · 17:25",
  uploadedBy: "Paula Tavares",
  status: "review",
  insight: "IPCA não aplicado no aniversário — R$ 180/mês"
}, {
  id: "DOC-2028",
  name: "Extrato_Banco_Nordeste_Mar2026.pdf",
  type: "statement",
  clientId: "nordeste-agri",
  clientName: "Nordeste Agropecuária S.A.",
  contractId: null,
  contractLabel: "Apoio · conciliação",
  sizeKB: 96,
  pages: 3,
  uploadedAt: "12/04/2026 · 08:44",
  uploadedBy: "Marcos Guedes",
  status: "archived",
  insight: null
}];
const DOCUMENTS_SUMMARY = {
  total: DOCUMENTS.length,
  processed: DOCUMENTS.filter(d => d.status === "processed").length,
  review: DOCUMENTS.filter(d => d.status === "review").length,
  processing: DOCUMENTS.filter(d => d.status === "processing").length,
  failed: DOCUMENTS.filter(d => d.status === "failed").length,
  lastUpload: "hoje · 14:38"
};
Object.assign(window, {
  DOCUMENTS,
  DOC_TYPE_META,
  DOC_STATUS_META,
  DOCUMENTS_SUMMARY
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "MVP/components/DocumentsData.jsx", error: String((e && e.message) || e) }); }

// MVP/components/Login.jsx
try { (() => {
// Kontiva MVP — Login Variations

const {
  useState: useStateL
} = React;
const DEMO_EMAIL = "demo@kontiva.ai";
const DEMO_PASSWORD = "demo";

// Small reusable demo credentials pill
const DemoPill = ({
  onDark,
  onFill
}) => /*#__PURE__*/React.createElement("div", {
  className: "demo-pill" + (onDark ? " on-dark" : "")
}, /*#__PURE__*/React.createElement("span", {
  className: "demo-label"
}, "Demo"), /*#__PURE__*/React.createElement("div", {
  className: "demo-creds"
}, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "demo@kontiva.ai")), /*#__PURE__*/React.createElement("span", {
  style: {
    opacity: 0.75
  }
}, "senha: ", /*#__PURE__*/React.createElement("b", null, "demo"))), /*#__PURE__*/React.createElement("button", {
  type: "button",
  onClick: onFill
}, "Preencher"));

// ---------- Login form (shared) ----------
function useLoginForm(onSuccess) {
  const [email, setEmail] = useStateL("");
  const [pwd, setPwd] = useStateL("");
  const [show, setShow] = useStateL(false);
  const [err, setErr] = useStateL(null);
  const [loading, setLoading] = useStateL(false);
  const fill = () => {
    setEmail(DEMO_EMAIL);
    setPwd(DEMO_PASSWORD);
    setErr(null);
  };
  const submit = e => {
    e.preventDefault();
    setErr(null);
    if (!email.trim() || !pwd) {
      setErr("Preencha e-mail e senha.");
      return;
    }
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
  return {
    email,
    setEmail,
    pwd,
    setPwd,
    show,
    setShow,
    err,
    loading,
    fill,
    submit
  };
}
const LoginFormBody = ({
  onDark,
  form
}) => {
  const {
    email,
    setEmail,
    pwd,
    setPwd,
    show,
    setShow,
    err,
    loading,
    submit
  } = form;
  return /*#__PURE__*/React.createElement("form", {
    className: "login-form",
    onSubmit: submit,
    noValidate: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "E-mail"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    autoComplete: "email",
    className: onDark ? "on-dark" : "",
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: "voce@escritorio.com.br"
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Senha"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: show ? "text" : "password",
    autoComplete: "current-password",
    className: onDark ? "on-dark" : "",
    value: pwd,
    onChange: e => setPwd(e.target.value),
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    style: {
      paddingRight: 44
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShow(!show),
    "aria-label": show ? "Esconder senha" : "Mostrar senha",
    style: {
      position: "absolute",
      right: 6,
      top: "50%",
      transform: "translateY(-50%)",
      background: "transparent",
      border: "none",
      padding: 8,
      cursor: "pointer",
      color: onDark ? "rgba(234,246,255,0.55)" : "var(--cinza-texto)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, show ? /*#__PURE__*/React.createElement(IEyeOff, null) : /*#__PURE__*/React.createElement(IEye, null)))), err && /*#__PURE__*/React.createElement("div", {
    className: "login-error"
  }, err), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary btn-block",
    disabled: loading
  }, loading ? "Entrando…" : "Entrar na Kontiva", !loading && /*#__PURE__*/React.createElement(IArrow, null)), /*#__PURE__*/React.createElement("div", {
    className: "forgot forgot-below"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, "Esqueci minha senha")));
};

// ---------- Variant A: Split with radar mock ----------
const LoginSplit = ({
  onSuccess
}) => {
  const form = useLoginForm(onSuccess);
  const sampleRows = [{
    idx: "001",
    name: "Construtora Horizonte",
    amt: "R$ 3.820,00",
    badge: "Reajuste",
    flagged: true
  }, {
    idx: "002",
    name: "Padaria São Jorge ME",
    amt: "R$ 1.240,00",
    badge: "OK",
    flagged: false
  }, {
    idx: "003",
    name: "Studio M Arquitetura",
    amt: "R$ 1.640,00",
    badge: "Serviço extra",
    flagged: true
  }, {
    idx: "004",
    name: "Clínica Vitta",
    amt: "R$ 2.150,00",
    badge: "OK",
    flagged: false
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "login-split"
  }, /*#__PURE__*/React.createElement("div", {
    className: "left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "login-form-wrap"
  }, /*#__PURE__*/React.createElement(Brand, null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " Painel do contador"), /*#__PURE__*/React.createElement("h1", null, "Bem-vindo", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ciano)"
    }
  }, "."), /*#__PURE__*/React.createElement("br", null), "A gente ", /*#__PURE__*/React.createElement("span", {
    className: "serif-accent"
  }, "cuida"), " do ponto cego."), /*#__PURE__*/React.createElement("p", {
    className: "sub",
    style: {
      marginTop: 16
    }
  }, "Entre para continuar a varredura da sua carteira. Cada contrato lido \xE9 um ponto a menos escondido na planilha.")), /*#__PURE__*/React.createElement(DemoPill, {
    onFill: form.fill
  }), /*#__PURE__*/React.createElement(LoginFormBody, {
    form: form
  }), /*#__PURE__*/React.createElement("div", {
    className: "login-foot-meta"
  }, "Sem conta ainda? ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: "var(--azul-profundo)",
      borderBottom: "1px solid rgba(10,31,63,0.2)",
      paddingBottom: 1
    }
  }, "Falar com a Kontiva no WhatsApp")))), /*#__PURE__*/React.createElement("div", {
    className: "right"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "live-dot",
    style: {
      marginBottom: 18
    }
  }, "Varredura ativa"), /*#__PURE__*/React.createElement("div", {
    className: "right-quote"
  }, "Enquanto voc\xEA entra,", /*#__PURE__*/React.createElement("br", null), "a gente ", /*#__PURE__*/React.createElement("span", {
    className: "hl"
  }, "j\xE1 est\xE1 olhando"), " seus \xFAltimos contratos.")), /*#__PURE__*/React.createElement("div", {
    className: "right-mock radar-card",
    style: {
      minHeight: 0,
      padding: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "radar-head",
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xDAltima varredura"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, "hoje \xB7 08:42")), /*#__PURE__*/React.createElement("div", {
    className: "radar-list"
  }, sampleRows.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.idx,
    className: "radar-row" + (r.flagged ? " flagged" : "")
  }, /*#__PURE__*/React.createElement("span", {
    className: "idx"
  }, "#", r.idx), /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, r.name), /*#__PURE__*/React.createElement("span", {
    className: "amount"
  }, r.amt), /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, r.badge))))), /*#__PURE__*/React.createElement("div", {
    className: "right-foot"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 Kontiva.ai \xB7 2026"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, "v0.1 \xB7 prot\xF3tipo"))));
};

// ---------- Variant B: Centered card on dark ----------
const LoginCentered = ({
  onSuccess
}) => {
  const form = useLoginForm(onSuccess);
  return /*#__PURE__*/React.createElement("div", {
    className: "login-centered"
  }, /*#__PURE__*/React.createElement("div", {
    className: "top-brand"
  }, /*#__PURE__*/React.createElement(Brand, {
    onDark: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "nav-links-mini"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, "Ajuda"))), /*#__PURE__*/React.createElement("div", {
    className: "middle"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " Entrar"), /*#__PURE__*/React.createElement("h1", null, "Continue ", /*#__PURE__*/React.createElement("span", {
    className: "serif-accent"
  }, "vendo"), /*#__PURE__*/React.createElement("br", null), "o que passou despercebido."), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "S\xF3 para contadores j\xE1 cadastrados. O primeiro contrato da semana te espera."), /*#__PURE__*/React.createElement(LoginFormBody, {
    onDark: true,
    form: form
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      fontSize: 12,
      color: "rgba(234,246,255,0.45)",
      textAlign: "center",
      lineHeight: 1.5
    }
  }, "Ainda n\xE3o tem conta?", " ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: "var(--ciano)",
      borderBottom: "1px solid color-mix(in oklab, var(--ciano) 40%, transparent)",
      paddingBottom: 1
    }
  }, "Falar no WhatsApp")))), /*#__PURE__*/React.createElement("div", {
    className: "bottom-strip"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 Kontiva.ai \xB7 2026"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, "Gest\xE3o cont\xE1bil sem ponto cego")));
};
Object.assign(window, {
  LoginSplit,
  LoginCentered
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "MVP/components/Login.jsx", error: String((e && e.message) || e) }); }

// MVP/components/Processing.jsx
try { (() => {
// Kontiva MVP — Processing / scan animation screen

const {
  useState: useStateP,
  useEffect: useEffectP
} = React;
const PROC_STEPS_CONTRACT = [{
  key: "read",
  label: "Lendo o arquivo"
}, {
  key: "clauses",
  label: "Identificando cláusulas"
}, {
  key: "index",
  label: "Extraindo índice de reajuste"
}, {
  key: "scope",
  label: "Mapeando escopo e serviços"
}, {
  key: "done",
  label: "Pronto — relatório gerado"
}];
const PROC_STEPS_BILLING = [{
  key: "read",
  label: "Lendo os lançamentos"
}, {
  key: "match",
  label: "Cruzando com as cláusulas"
}, {
  key: "index",
  label: "Verificando reajuste aplicado"
}, {
  key: "scope",
  label: "Conferindo escopo e extras"
}, {
  key: "calc",
  label: "Calculando divergências"
}, {
  key: "done",
  label: "Análise concluída"
}];
const Processing = ({
  fileName,
  clientName,
  mode = "contract",
  onDone,
  onCancel
}) => {
  const [step, setStep] = useStateP(0);
  const steps = mode === "billing" ? PROC_STEPS_BILLING : PROC_STEPS_CONTRACT;
  useEffectP(() => {
    if (step >= steps.length - 1) return;
    const t = setTimeout(() => setStep(step + 1), step === 0 ? 900 : 1200);
    return () => clearTimeout(t);
  }, [step, steps.length]);
  const allDone = step >= steps.length - 1;
  const isBilling = mode === "billing";
  return /*#__PURE__*/React.createElement("div", {
    className: "processing"
  }, /*#__PURE__*/React.createElement("div", {
    className: "radar-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ring r3"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ring r2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ring r1"
  }), /*#__PURE__*/React.createElement("div", {
    className: "pip p1"
  }), /*#__PURE__*/React.createElement("div", {
    className: "pip p2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "pip p3"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sweep"
  }), /*#__PURE__*/React.createElement("div", {
    className: "center-dot"
  })), /*#__PURE__*/React.createElement("div", {
    className: "live-dot",
    style: {
      marginBottom: 16
    }
  }, allDone ? isBilling ? "Análise concluída" : "Varredura concluída" : isBilling ? "Cruzando dados" : "Varredura em andamento"), /*#__PURE__*/React.createElement("h1", null, allDone ? isBilling ? /*#__PURE__*/React.createElement(React.Fragment, null, "Descobrimos ", /*#__PURE__*/React.createElement("span", {
    className: "serif-accent"
  }, "o que n\xE3o bate"), ".") : /*#__PURE__*/React.createElement(React.Fragment, null, "Pronto. A gente ", /*#__PURE__*/React.createElement("span", {
    className: "serif-accent"
  }, "encontrou"), " o que importava.") : isBilling ? /*#__PURE__*/React.createElement(React.Fragment, null, "A Kontiva est\xE1 ", /*#__PURE__*/React.createElement("span", {
    className: "serif-accent"
  }, "conferindo"), " a cobran\xE7a.") : /*#__PURE__*/React.createElement(React.Fragment, null, "A Kontiva est\xE1 ", /*#__PURE__*/React.createElement("span", {
    className: "serif-accent"
  }, "lendo"), " seu contrato.")), fileName && /*#__PURE__*/React.createElement("div", {
    className: "file-chip"
  }, /*#__PURE__*/React.createElement(IDoc, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, fileName), clientName && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.4
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, clientName))), /*#__PURE__*/React.createElement("div", {
    className: "steps-log"
  }, steps.map((s, i) => {
    const done = i < step || i === steps.length - 1 && allDone;
    const active = i === step && !allDone;
    const pending = i > step;
    return /*#__PURE__*/React.createElement("div", {
      key: s.key,
      className: "step" + (done ? " done" : "") + (active ? " active" : "")
    }, /*#__PURE__*/React.createElement("span", {
      className: "ico" + (active ? " spinner" : "")
    }, done && /*#__PURE__*/React.createElement(ITick, {
      size: 10
    })), /*#__PURE__*/React.createElement("span", null, s.label), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "rgba(234,246,255,0.4)"
      }
    }, done ? "ok" : active ? "…" : pending ? "—" : ""));
  })), /*#__PURE__*/React.createElement("div", {
    className: "caption"
  }, allDone ? isBilling ? "Achamos divergências. Vamos ver quanto está custando." : "Tudo extraído. Vamos revisar juntos antes de salvar." : "Isso normalmente leva menos de 30 segundos."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 28
    }
  }, allDone ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: onDone
  }, isBilling ? "Ver análise completa" : "Revisar dados extraídos", " ", /*#__PURE__*/React.createElement(IArrow, null)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost on-dark",
    onClick: onCancel
  }, isBilling ? "Enviar outro relatório" : "Enviar outro contrato")) : /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost on-dark",
    onClick: onCancel
  }, "Cancelar")));
};
Object.assign(window, {
  Processing
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "MVP/components/Processing.jsx", error: String((e && e.message) || e) }); }

// MVP/components/QuotaLimits.jsx
try { (() => {
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

const {
  useState: useStateQL
} = React;

// --- Quotas mockadas extraídas do contrato --------------------------------
const QUOTAS_DEFAULT = [{
  id: "employees",
  label: "Funcionários na folha",
  unit: "funcionário",
  unitPlural: "funcionários",
  included: {
    value: 10,
    confidence: "high"
  },
  bands: [{
    from: 11,
    to: 20,
    unitPrice: 45
  }, {
    from: 21,
    to: 50,
    unitPrice: 38
  }, {
    from: 51,
    to: null,
    unitPrice: 30
  }],
  sourceKey: "quota.employees",
  confidence: "high"
}, {
  id: "fiscal-docs",
  label: "Documentos fiscais / mês",
  unit: "documento",
  unitPlural: "documentos",
  included: {
    value: 60,
    confidence: "high"
  },
  bands: [{
    from: 61,
    to: 120,
    unitPrice: 3.20
  }, {
    from: 121,
    to: null,
    unitPrice: 2.40
  }],
  sourceKey: "quota.fiscalDocs",
  confidence: "medium"
}, {
  id: "branches",
  label: "Filiais / CNPJs vinculados",
  unit: "filial",
  unitPlural: "filiais",
  included: {
    value: 1,
    confidence: "medium"
  },
  bands: [{
    from: 2,
    to: null,
    unitPrice: 420
  }],
  sourceKey: "quota.branches",
  confidence: "low"
}];

// --- Formatters -----------------------------------------------------------
const fmtBRL = n => {
  if (n == null || isNaN(n)) return "R$ 0,00";
  const abs = Math.abs(n);
  const hasDecimals = abs !== Math.floor(abs);
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: hasDecimals ? 2 : 2,
    maximumFractionDigits: 2
  });
};
const fmtInt = n => n == null ? "—" : n.toLocaleString("pt-BR");

// Small inline number input — used inside band rows for `from`, `to`, price
const NumInput = ({
  value,
  onChange,
  suffix,
  prefix,
  placeholder,
  width = 64,
  allowNull = false,
  step = 1
}) => {
  const [draft, setDraft] = useStateQL(value == null ? "" : String(value));
  React.useEffect(() => {
    setDraft(value == null ? "" : String(value));
  }, [value]);
  const commit = () => {
    if (draft.trim() === "") {
      if (allowNull) onChange(null);else onChange(value);
      return;
    }
    const cleaned = draft.replace(",", ".").replace(/[^\d.]/g, "");
    const n = parseFloat(cleaned);
    if (!isNaN(n)) onChange(n);else setDraft(value == null ? "" : String(value));
  };
  return /*#__PURE__*/React.createElement("span", {
    className: "ql-numwrap",
    style: {
      width
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    className: "ql-affix"
  }, prefix), /*#__PURE__*/React.createElement("input", {
    type: "text",
    inputMode: "decimal",
    className: "ql-num",
    value: draft,
    placeholder: placeholder,
    onChange: e => setDraft(e.target.value),
    onBlur: commit,
    onKeyDown: e => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.currentTarget.blur();
      }
      if (e.key === "Escape") {
        setDraft(value == null ? "" : String(value));
        e.currentTarget.blur();
      }
    }
  }), suffix && /*#__PURE__*/React.createElement("span", {
    className: "ql-affix"
  }, suffix));
};

// --- The visual "stepped ruler" under the bands --------------------------
// Shows the included portion + each band as a stacked/flowing bar, with the
// last band optionally unbounded (shown with a fade-out to ∞).
const BandRuler = ({
  quota
}) => {
  // Compute a visual end. If the last band is unbounded, we pick
  // a "nice" extrapolation — 2x the largest visible boundary so the
  // unbounded band has visual room.
  const lastBand = quota.bands[quota.bands.length - 1];
  const unbounded = !lastBand || lastBand.to == null;
  const lastFinite = quota.bands.reduce((m, b) => b.to != null ? Math.max(m, b.to) : m, quota.included.value);
  const visualEnd = unbounded ? Math.max(lastFinite * 1.5, quota.included.value * 2 + 10) : lastFinite;
  const total = Math.max(visualEnd, 1);

  // Segments in order: [included] then bands.
  const incWidth = quota.included.value / total * 100;
  const segments = [];
  segments.push({
    kind: "included",
    widthPct: incWidth,
    label: `Incluídos`,
    value: `${fmtInt(quota.included.value)} ${quota.included.value === 1 ? quota.unit : quota.unitPlural}`
  });
  quota.bands.forEach((b, i) => {
    const bandEnd = b.to == null ? visualEnd : b.to;
    const bandStart = b.from;
    const w = Math.max((bandEnd - bandStart + 1) / total * 100, 3);
    segments.push({
      kind: "band",
      index: i,
      widthPct: w,
      unitPrice: b.unitPrice,
      unbounded: b.to == null,
      from: b.from,
      to: b.to
    });
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "ql-ruler"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ql-ruler-bar"
  }, segments.map((s, i) => {
    if (s.kind === "included") {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: "ql-seg ql-seg-included",
        style: {
          flex: `${s.widthPct} 0 0`
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "ql-seg-tag"
      }, "Incluso"));
    }
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "ql-seg ql-seg-band" + (s.unbounded ? " ql-seg-unbounded" : ""),
      style: {
        flex: `${s.widthPct} 0 0`
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "ql-seg-price"
    }, fmtBRL(s.unitPrice)));
  })), /*#__PURE__*/React.createElement("div", {
    className: "ql-ruler-ticks"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ql-tick"
  }, "0"), /*#__PURE__*/React.createElement("span", {
    className: "ql-tick ql-tick-highlight"
  }, fmtInt(quota.included.value)), quota.bands.map((b, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "ql-tick"
  }, b.to == null ? "∞" : fmtInt(b.to)))));
};

// --- Single band row -----------------------------------------------------
const BandRow = ({
  band,
  prevTo,
  isLast,
  onChange,
  onRemove,
  canRemove,
  unit,
  unitPlural
}) => {
  const unbounded = band.to == null;
  const suggestedFrom = prevTo != null ? prevTo + 1 : band.from;
  return /*#__PURE__*/React.createElement("div", {
    className: "ql-band-row" + (unbounded ? " unbounded" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "ql-band-range"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ql-band-label"
  }, "De"), /*#__PURE__*/React.createElement(NumInput, {
    value: band.from,
    onChange: v => onChange({
      ...band,
      from: v
    }),
    width: 70
  }), /*#__PURE__*/React.createElement("span", {
    className: "ql-band-label"
  }, "at\xE9"), unbounded ? /*#__PURE__*/React.createElement("button", {
    className: "ql-infinity",
    onClick: () => onChange({
      ...band,
      to: suggestedFrom + 9
    }),
    title: "Clique para definir um limite superior",
    type: "button"
  }, "\u221E") : /*#__PURE__*/React.createElement(NumInput, {
    value: band.to,
    onChange: v => onChange({
      ...band,
      to: v
    }),
    width: 70,
    allowNull: true,
    placeholder: "\u221E"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ql-band-unit"
  }, band.to === 1 || band.from === band.to ? unit : unitPlural)), /*#__PURE__*/React.createElement("div", {
    className: "ql-band-price"
  }, /*#__PURE__*/React.createElement(NumInput, {
    value: band.unitPrice,
    onChange: v => onChange({
      ...band,
      unitPrice: v
    }),
    prefix: "R$",
    width: 100,
    step: 0.01
  }), /*#__PURE__*/React.createElement("span", {
    className: "ql-band-per"
  }, "/ ", unit, " / m\xEAs")), /*#__PURE__*/React.createElement("div", {
    className: "ql-band-actions"
  }, isLast && !unbounded && /*#__PURE__*/React.createElement("button", {
    className: "ql-band-ghost",
    type: "button",
    onClick: () => onChange({
      ...band,
      to: null
    }),
    title: "Marcar como sem limite superior"
  }, "sem teto"), isLast && unbounded && band.from > suggestedFrom && null, /*#__PURE__*/React.createElement("button", {
    className: "ql-band-remove",
    type: "button",
    disabled: !canRemove,
    onClick: onRemove,
    "aria-label": "Remover banda",
    title: canRemove ? "Remover banda" : "É necessário ter ao menos uma banda"
  }, /*#__PURE__*/React.createElement(IClose, {
    size: 12
  }))));
};

// --- Single quota card ---------------------------------------------------
const QuotaRow = ({
  quota,
  onChange,
  onRemove,
  onViewSource
}) => {
  const {
    included,
    bands,
    label,
    unit,
    unitPlural
  } = quota;
  const updateIncluded = v => {
    onChange({
      ...quota,
      included: {
        ...included,
        value: v,
        confidence: "high"
      },
      // Shift the first band's `from` to included+1 automatically
      bands: bands.map((b, i) => i === 0 ? {
        ...b,
        from: v + 1
      } : b)
    });
  };
  const updateBand = (i, next) => {
    const newBands = bands.map((b, idx) => idx === i ? next : b);
    onChange({
      ...quota,
      bands: newBands
    });
  };
  const removeBand = i => {
    onChange({
      ...quota,
      bands: bands.filter((_, idx) => idx !== i)
    });
  };
  const addBand = () => {
    const last = bands[bands.length - 1];
    const lastTo = last && last.to != null ? last.to : last ? last.from + 10 : included.value;
    const newFrom = lastTo + 1;
    // If the current last was unbounded, cap it before adding.
    let newBands = bands.slice();
    if (last && last.to == null) {
      newBands[newBands.length - 1] = {
        ...last,
        to: lastTo
      };
    }
    newBands.push({
      from: newFrom,
      to: null,
      unitPrice: last ? last.unitPrice : 0
    });
    onChange({
      ...quota,
      bands: newBands
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "ql-quota"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ql-quota-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ql-quota-head-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ef-head",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "ef-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "ef-meta"
  }, /*#__PURE__*/React.createElement(ConfBadge, {
    level: quota.confidence || "high"
  }), onViewSource && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ef-src",
    onClick: onViewSource
  }, /*#__PURE__*/React.createElement(IExternal, {
    size: 11
  }), " Ver trecho")))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ql-quota-remove",
    onClick: onRemove,
    "aria-label": `Remover ${label}`,
    title: "Remover este limite"
  }, /*#__PURE__*/React.createElement(IClose, {
    size: 13
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ql-included"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ql-included-prefix"
  }, "Inclui"), /*#__PURE__*/React.createElement(NumInput, {
    value: included.value,
    onChange: updateIncluded,
    width: 78
  }), /*#__PURE__*/React.createElement("span", {
    className: "ql-included-unit"
  }, included.value === 1 ? unit : unitPlural), /*#__PURE__*/React.createElement("span", {
    className: "ql-included-suffix"
  }, "sem custo adicional")), /*#__PURE__*/React.createElement(BandRuler, {
    quota: quota
  }), /*#__PURE__*/React.createElement("div", {
    className: "ql-bands-label"
  }, /*#__PURE__*/React.createElement("span", null, "Excedentes"), /*#__PURE__*/React.createElement("span", {
    className: "ql-bands-hint"
  }, "cada faixa cobra um valor por ", unit, " extra")), /*#__PURE__*/React.createElement("div", {
    className: "ql-bands"
  }, bands.map((band, i) => /*#__PURE__*/React.createElement(BandRow, {
    key: i,
    band: band,
    prevTo: i > 0 ? bands[i - 1].to : included.value,
    isLast: i === bands.length - 1,
    onChange: next => updateBand(i, next),
    onRemove: () => removeBand(i),
    canRemove: bands.length > 1,
    unit: unit,
    unitPlural: unitPlural
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ql-add-band",
    onClick: addBand
  }, /*#__PURE__*/React.createElement(IPlus, {
    size: 12
  }), " Adicionar faixa")));
};

// --- The whole card section ---------------------------------------------
const QuotaLimitsCard = ({
  quotas,
  onChange,
  onViewSource,
  onAddQuota
}) => {
  const updateQuota = (id, next) => {
    onChange(quotas.map(q => q.id === id ? next : q));
  };
  const removeQuota = id => {
    onChange(quotas.filter(q => q.id !== id));
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "review-card ql-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rc-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rc-head-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rc-ico"
  }, /*#__PURE__*/React.createElement(IGauge, {
    size: 16
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Limites contratados e excedentes"), /*#__PURE__*/React.createElement("div", {
    className: "rc-sub"
  }, "Quantidades inclusas no pacote e o que \xE9 cobrado quando a empresa passa do limite. Revise as faixas com aten\xE7\xE3o.")))), /*#__PURE__*/React.createElement("div", {
    className: "ql-body"
  }, quotas.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "ql-empty"
  }, /*#__PURE__*/React.createElement("p", null, "Nenhum limite quantitativo foi identificado neste contrato."), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-ghost",
    onClick: onAddQuota
  }, /*#__PURE__*/React.createElement(IPlus, {
    size: 13
  }), " Adicionar um limite manualmente")) : /*#__PURE__*/React.createElement(React.Fragment, null, quotas.map(q => /*#__PURE__*/React.createElement(QuotaRow, {
    key: q.id,
    quota: q,
    onChange: next => updateQuota(q.id, next),
    onRemove: () => removeQuota(q.id),
    onViewSource: q.sourceKey ? () => onViewSource(q.sourceKey) : null
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ql-add-quota",
    onClick: onAddQuota
  }, /*#__PURE__*/React.createElement(IPlus, {
    size: 13
  }), " Adicionar outro limite quantitativo"))));
};

// --- Gauge icon (quantidades/medidor) — added locally to avoid editing Shared.jsx
const IGauge = ({
  size = 16
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M4 18a8 8 0 1 1 16 0",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 18l5-6",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "18",
  r: "1.4",
  fill: "currentColor"
}));
Object.assign(window, {
  QuotaLimitsCard,
  QUOTAS_DEFAULT,
  IGauge
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "MVP/components/QuotaLimits.jsx", error: String((e && e.message) || e) }); }

// MVP/components/Review.jsx
try { (() => {
// Kontiva MVP — Review screen (post-upload extraction review)

const {
  useState: useStateR,
  useEffect: useEffectR
} = React;
const CARDS_DEF = [{
  id: "client",
  title: "Cliente identificado",
  icon: IUser,
  subtitle: "Dados extraídos do cabeçalho e cláusula das partes.",
  fields: [{
    path: "client.name",
    label: "Razão social",
    key: "name"
  }, {
    path: "client.cnpj",
    label: "CNPJ",
    key: "cnpj"
  }, {
    path: "client.address",
    label: "Endereço",
    key: "address"
  }, {
    path: "client.representative",
    label: "Representante legal",
    key: "representative"
  }]
}, {
  id: "contract",
  title: "Contrato e valor",
  icon: IMoney,
  subtitle: "Objeto, preço e condição de pagamento.",
  fields: [{
    path: "contract.object",
    label: "Objeto do contrato",
    key: "object",
    multiline: true
  }, {
    path: "contract.monthlyValue",
    label: "Valor mensal",
    key: "monthlyValue"
  }, {
    path: "contract.paymentMethod",
    label: "Forma de pagamento",
    key: "paymentMethod"
  }, {
    path: "contract.priceConditions",
    label: "Condições de preço",
    key: "priceConditions",
    multiline: true
  }]
}, {
  id: "adjustment",
  title: "Reajuste",
  icon: IPercent,
  subtitle: "Índice, periodicidade e histórico.",
  fields: [{
    path: "adjustment.index",
    label: "Índice de reajuste",
    key: "index"
  }, {
    path: "adjustment.periodicity",
    label: "Periodicidade",
    key: "periodicity"
  }, {
    path: "adjustment.lastAdjustment",
    label: "Último reajuste aplicado",
    key: "lastAdjustment"
  }, {
    path: "adjustment.nextAdjustment",
    label: "Próximo reajuste",
    key: "nextAdjustment"
  }]
}, {
  id: "validity",
  title: "Vigência e aniversário",
  icon: ICalendar,
  subtitle: "Quando começa, quando termina, quando aniversaria.",
  // second field is computed per-contract: if there's an end date → "Término previsto";
  // otherwise fall back to "Próxima data de reajuste" (pulled from adjustment.nextAdjustment)
  fields: [{
    path: "validity.start",
    label: "Início da vigência",
    key: "start"
  }, {
    path: "__endOrNextAdjustment",
    label: "Término previsto",
    key: "endOrNext",
    dynamic: true
  }, {
    path: "validity.anniversary",
    label: "Aniversário do contrato",
    key: "anniversary"
  }, {
    path: "validity.renewal",
    label: "Cláusula de renovação",
    key: "renewal",
    multiline: true
  }]
}, {
  id: "extras",
  title: "Escopo extra e serviços fora",
  icon: IScope,
  subtitle: "O que não está incluso e quanto custa a mais.",
  fields: [{
    path: "extras.outOfScope",
    label: "Serviços fora do escopo",
    key: "outOfScope",
    multiline: true
  }, {
    path: "extras.extraFee",
    label: "Acréscimo por serviço extra",
    key: "extraFee"
  }]
}];
const SummaryChip = ({
  icon: Ico,
  label,
  value,
  tone
}) => /*#__PURE__*/React.createElement("div", {
  className: "sum-chip tone-" + (tone || "default")
}, /*#__PURE__*/React.createElement("div", {
  className: "sc-ico"
}, /*#__PURE__*/React.createElement(Ico, {
  size: 16
})), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "sc-label"
}, label), /*#__PURE__*/React.createElement("div", {
  className: "sc-value"
}, value)));
const Review = ({
  user,
  fileName,
  onConfirm,
  onLogout,
  onNavClick,
  onSidebarToggle,
  sidebarCollapsed
}) => {
  const [data, setData] = useStateR(EXTRACTED_DEFAULT);
  const [sourceField, setSourceField] = useStateR(null);
  const [quotas, setQuotas] = useStateR(QUOTAS_DEFAULT);
  const addQuota = () => {
    const id = "custom-" + Date.now();
    setQuotas(qs => [...qs, {
      id,
      label: "Novo limite",
      unit: "unidade",
      unitPlural: "unidades",
      included: {
        value: 10,
        confidence: "medium"
      },
      bands: [{
        from: 11,
        to: null,
        unitPrice: 0
      }],
      confidence: "medium"
    }]);
  };
  const updateField = (path, newValue) => {
    const [section, key] = path.split(".");
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: {
          ...prev[section][key],
          value: newValue,
          confidence: "high"
        }
      }
    }));
  };
  const getField = path => {
    const [section, key] = path.split(".");
    return data[section] && data[section][key];
  };

  // If the contract has an end date, the second validity field shows "Término previsto"
  // bound to validity.end. If there's no end date (open-ended contract), it falls back
  // to showing the next scheduled price adjustment — because that's the next meaningful
  // date the user needs on the radar.
  const resolveDynamicField = path => {
    if (path !== "__endOrNextAdjustment") return null;
    const end = data.validity.end;
    const hasEnd = end && end.value && String(end.value).trim() !== "" && String(end.value).trim() !== "—";
    if (hasEnd) {
      return {
        label: "Término previsto",
        realPath: "validity.end",
        field: end
      };
    }
    return {
      label: "Próxima data de reajuste",
      realPath: "adjustment.nextAdjustment",
      field: data.adjustment.nextAdjustment
    };
  };
  const clientName = data.client.name.value;
  return /*#__PURE__*/React.createElement(WorkspaceShell, {
    activeNav: "clients",
    counts: {
      clients: 1,
      contracts: 1
    },
    onNavClick: onNavClick
  }, /*#__PURE__*/React.createElement("div", {
    className: "ws-topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "crumb"
  }, /*#__PURE__*/React.createElement("span", null, "Clientes"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--azul-profundo)"
    }
  }, clientName), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--cinza-escuro)"
    }
  }, "Revis\xE3o do contrato")), /*#__PURE__*/React.createElement("div", {
    className: "right-actions"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13,
      color: "var(--cinza-escuro)",
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "avatar",
    style: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      background: "var(--azul-profundo)",
      color: "#EAF6FF",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 700
    }
  }, "MG"), /*#__PURE__*/React.createElement("span", null, user)), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    className: "btn btn-ghost",
    style: {
      padding: "8px 14px",
      fontSize: 13
    }
  }, "Sair"))), /*#__PURE__*/React.createElement("div", {
    className: "ws-body review-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-wrap"
  }, /*#__PURE__*/React.createElement("header", {
    className: "review-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " ", /*#__PURE__*/React.createElement(ISparkle, {
    size: 11
  }), " Extra\xE7\xE3o conclu\xEDda"), /*#__PURE__*/React.createElement("h1", null, "Encontramos ", /*#__PURE__*/React.createElement("span", {
    className: "serif-accent"
  }, clientName), ".", /*#__PURE__*/React.createElement("br", null), "Revise antes de salvar", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ciano)"
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    className: "review-sub"
  }, "Tudo aqui foi lido do contrato. Confira antes de salvar \u2014 campos com selo ", /*#__PURE__*/React.createElement("b", null, "\"Revise\""), " merecem um segundo olhar."), /*#__PURE__*/React.createElement("div", {
    className: "review-file-chip"
  }, /*#__PURE__*/React.createElement(IDoc, {
    size: 13
  }), " ", fileName || "Contrato.pdf", /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.5
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "7 p\xE1ginas lidas"))), /*#__PURE__*/React.createElement("div", {
    className: "summary-row"
  }, /*#__PURE__*/React.createElement(SummaryChip, {
    icon: IMoney,
    label: "Valor mensal",
    value: data.contract.monthlyValue.value,
    tone: "emphasis"
  }), /*#__PURE__*/React.createElement(SummaryChip, {
    icon: IPercent,
    label: "\xCDndice \xB7 periodicidade",
    value: `${data.adjustment.index.value} · ${data.adjustment.periodicity.value}`
  }), /*#__PURE__*/React.createElement(SummaryChip, {
    icon: ICalendar,
    label: "Vig\xEAncia at\xE9",
    value: data.validity.end.value.replace(/ \(.*\)/, "")
  }), /*#__PURE__*/React.createElement(SummaryChip, {
    icon: ICake,
    label: "Anivers\xE1rio",
    value: data.validity.anniversary.value
  })), CARDS_DEF.map((card, idx) => {
    const Ico = card.icon;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: card.id
    }, idx === 0 && /*#__PURE__*/React.createElement("div", {
      className: "review-edit-hint"
    }, /*#__PURE__*/React.createElement("span", {
      className: "reh-ico"
    }, /*#__PURE__*/React.createElement(IPen, {
      size: 13
    })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Clique em qualquer valor para editar."), " ", /*#__PURE__*/React.createElement("span", {
      className: "reh-sub"
    }, "Confirme com Enter \xB7 Cancele com Esc."))), /*#__PURE__*/React.createElement("section", {
      className: "review-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rc-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rc-head-main"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rc-ico"
    }, /*#__PURE__*/React.createElement(Ico, {
      size: 16
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, card.title), /*#__PURE__*/React.createElement("div", {
      className: "rc-sub"
    }, card.subtitle)))), /*#__PURE__*/React.createElement("div", {
      className: "rc-fields"
    }, card.fields.map(f => {
      if (f.dynamic) {
        const resolved = resolveDynamicField(f.path);
        if (!resolved) return null;
        return /*#__PURE__*/React.createElement("div", {
          key: f.path,
          className: "rc-field"
        }, /*#__PURE__*/React.createElement(EditableField, {
          label: resolved.label,
          data: resolved.field,
          onChange: v => updateField(resolved.realPath, v),
          onViewSource: () => setSourceField(resolved.realPath)
        }));
      }
      return /*#__PURE__*/React.createElement("div", {
        key: f.path,
        className: "rc-field" + (f.multiline ? " span-2" : "")
      }, /*#__PURE__*/React.createElement(EditableField, {
        label: f.label,
        data: getField(f.path),
        multiline: f.multiline,
        onChange: v => updateField(f.path, v),
        onViewSource: () => setSourceField(f.path)
      }));
    }))), idx === 1 && /*#__PURE__*/React.createElement(QuotaLimitsCard, {
      quotas: quotas,
      onChange: setQuotas,
      onViewSource: key => setSourceField(key),
      onAddQuota: addQuota
    }));
  }), /*#__PURE__*/React.createElement("div", {
    className: "review-cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rcta-text"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rcta-title"
  }, "Dados conferidos? ", /*#__PURE__*/React.createElement("span", {
    className: "serif-accent"
  }, "Vamos bater com o cobrado.")), /*#__PURE__*/React.createElement("div", {
    className: "rcta-sub"
  }, "Ao confirmar, criamos a ficha de ", /*#__PURE__*/React.createElement("b", null, clientName), " e abrimos a tela de upload do relat\xF3rio de cobran\xE7a \u2014 pra ver se o que foi faturado bate com o que o contrato permite.")), /*#__PURE__*/React.createElement("div", {
    className: "rcta-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: onLogout
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: onConfirm
  }, "Confirmar e comparar com o cobrado ", /*#__PURE__*/React.createElement(IArrow, null)))))), /*#__PURE__*/React.createElement(SourceDrawer, {
    fieldKey: sourceField,
    fileName: fileName,
    onClose: () => setSourceField(null)
  }));
};
Object.assign(window, {
  Review
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "MVP/components/Review.jsx", error: String((e && e.message) || e) }); }

// MVP/components/ReviewData.jsx
try { (() => {
// Kontiva MVP — Review screen data & small pieces

const {
  useState: useStateRV,
  useEffect: useEffectRV,
  useRef: useRefRV
} = React;

// Mocked extracted data. In production, this would come from the backend.
const EXTRACTED_DEFAULT = {
  client: {
    name: {
      value: "Construtora Horizonte Ltda.",
      confidence: "high"
    },
    cnpj: {
      value: "12.345.678/0001-90",
      confidence: "high"
    },
    address: {
      value: "Av. Paulista, 1578 — sala 1204, São Paulo/SP",
      confidence: "medium"
    },
    representative: {
      value: "Ricardo Almeida Souza",
      confidence: "high"
    }
  },
  contract: {
    object: {
      value: "Prestação de serviços contábeis mensais, incluindo escrituração fiscal, folha de pagamento e apuração de tributos federais, estaduais e municipais.",
      confidence: "high"
    },
    monthlyValue: {
      value: "R$ 3.820,00",
      confidence: "high"
    },
    paymentMethod: {
      value: "Boleto bancário — vencimento todo dia 10",
      confidence: "high"
    },
    priceConditions: {
      value: "Valor fixo mensal, com reajuste anual pelo IPCA. Acréscimo de 15% sobre serviços fora do escopo descrito em cláusula 3.",
      confidence: "medium"
    }
  },
  adjustment: {
    index: {
      value: "IPCA",
      confidence: "high"
    },
    periodicity: {
      value: "Anual",
      confidence: "high"
    },
    lastAdjustment: {
      value: "01/03/2025",
      confidence: "medium"
    },
    nextAdjustment: {
      value: "01/03/2026",
      confidence: "medium"
    }
  },
  validity: {
    start: {
      value: "01/03/2024",
      confidence: "high"
    },
    end: {
      value: "01/03/2027 (vigência de 36 meses)",
      confidence: "high"
    },
    anniversary: {
      value: "1º de março",
      confidence: "high"
    },
    renewal: {
      value: "Renovação automática por períodos iguais, salvo denúncia por escrito com 60 dias de antecedência",
      confidence: "medium"
    }
  },
  extras: {
    outOfScope: {
      value: "Consultoria tributária especial, defesas em processos administrativos e abertura/encerramento de filiais são cobrados à parte conforme tabela anexa.",
      confidence: "medium"
    },
    extraFee: {
      value: "15% sobre o valor mensal, por serviço extra",
      confidence: "low"
    }
  }
};

// Confidence badge
const ConfBadge = ({
  level
}) => {
  const map = {
    high: {
      label: "Alta confiança",
      cls: "conf-high"
    },
    medium: {
      label: "Revise",
      cls: "conf-medium"
    },
    low: {
      label: "Baixa confiança",
      cls: "conf-low"
    }
  };
  const c = map[level] || map.medium;
  return /*#__PURE__*/React.createElement("span", {
    className: "conf-badge " + c.cls
  }, c.label);
};

// Inline-editable field with confidence + "view source" button
const EditableField = ({
  label,
  data,
  onChange,
  onViewSource,
  multiline = false,
  prefix,
  suffix
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
  const cancel = () => {
    setDraft(data.value);
    setEditing(false);
  };
  const onKey = e => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      commit();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      cancel();
    }
    if (e.key === "Enter" && multiline && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      commit();
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "ef" + (editing ? " editing" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "ef-head"
  }, /*#__PURE__*/React.createElement("label", {
    className: "ef-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "ef-meta"
  }, /*#__PURE__*/React.createElement(ConfBadge, {
    level: data.confidence
  }), onViewSource && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ef-src",
    onClick: onViewSource
  }, /*#__PURE__*/React.createElement(IExternal, {
    size: 11
  }), " Ver trecho"))), editing ? multiline ? /*#__PURE__*/React.createElement("textarea", {
    ref: inputRef,
    className: "ef-input ef-textarea",
    value: draft,
    onChange: e => setDraft(e.target.value),
    onBlur: commit,
    onKeyDown: onKey,
    rows: 3
  }) : /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    className: "ef-input",
    value: draft,
    onChange: e => setDraft(e.target.value),
    onBlur: commit,
    onKeyDown: onKey
  }) : /*#__PURE__*/React.createElement("div", {
    className: "ef-value",
    onClick: () => setEditing(true),
    role: "button",
    tabIndex: 0
  }, /*#__PURE__*/React.createElement("span", {
    className: "ef-text"
  }, prefix, data.value, suffix), /*#__PURE__*/React.createElement("span", {
    className: "ef-edit-ico",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement(IPen, {
    size: 12
  }))));
};
Object.assign(window, {
  EXTRACTED_DEFAULT,
  ConfBadge,
  EditableField
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "MVP/components/ReviewData.jsx", error: String((e && e.message) || e) }); }

// MVP/components/ReviewDrawer.jsx
try { (() => {
// Kontiva MVP — Source viewer drawer (PDF mock with highlight)

const {
  useState: useStateSV,
  useEffect: useEffectSV
} = React;

// Each source excerpt is a mock "page" with a highlighted block.
// In production this would be real coordinates on the actual PDF.
const SOURCE_EXCERPTS = {
  "client.name": {
    page: 1,
    clause: "Cláusula 1ª — Das Partes",
    before: "Pelo presente instrumento particular de prestação de serviços contábeis, de um lado, na qualidade de CONTRATANTE,",
    highlight: "CONSTRUTORA HORIZONTE LTDA.",
    after: ", pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 12.345.678/0001-90, com sede na Av. Paulista, 1578 — sala 1204, São Paulo/SP, neste ato representada por seu sócio-administrador Sr. Ricardo Almeida Souza."
  },
  "client.cnpj": {
    page: 1,
    clause: "Cláusula 1ª — Das Partes",
    before: "CONSTRUTORA HORIZONTE LTDA., pessoa jurídica de direito privado, inscrita no",
    highlight: "CNPJ sob o nº 12.345.678/0001-90",
    after: ", com sede na Av. Paulista, 1578 — sala 1204, São Paulo/SP."
  },
  "client.address": {
    page: 1,
    clause: "Cláusula 1ª — Das Partes",
    before: "inscrita no CNPJ sob o nº 12.345.678/0001-90, com sede na",
    highlight: "Av. Paulista, 1578 — sala 1204, São Paulo/SP",
    after: ", neste ato representada por seu sócio-administrador."
  },
  "client.representative": {
    page: 1,
    clause: "Cláusula 1ª — Das Partes",
    before: "neste ato representada por seu sócio-administrador",
    highlight: "Sr. Ricardo Almeida Souza",
    after: ", portador da cédula de identidade nº 22.xxx.xxx SSP/SP."
  },
  "contract.object": {
    page: 2,
    clause: "Cláusula 2ª — Do Objeto",
    before: "Constitui objeto do presente contrato a",
    highlight: "prestação de serviços contábeis mensais, incluindo escrituração fiscal, folha de pagamento e apuração de tributos federais, estaduais e municipais",
    after: ", conforme especificações técnicas detalhadas no Anexo I."
  },
  "contract.monthlyValue": {
    page: 3,
    clause: "Cláusula 4ª — Do Preço",
    before: "Pelos serviços contratados, a CONTRATANTE pagará à CONTRATADA o valor mensal de",
    highlight: "R$ 3.820,00 (três mil, oitocentos e vinte reais)",
    after: ", já incluídos todos os tributos e encargos incidentes."
  },
  "contract.paymentMethod": {
    page: 3,
    clause: "Cláusula 4ª — Do Preço · §1º",
    before: "O pagamento será efetuado mediante",
    highlight: "boleto bancário, com vencimento todo dia 10 (dez)",
    after: "do mês subsequente ao da prestação dos serviços."
  },
  "contract.priceConditions": {
    page: 3,
    clause: "Cláusula 4ª — Do Preço · §2º e §3º",
    before: "O valor mensal é fixo e será",
    highlight: "reajustado anualmente pela variação do IPCA acumulado nos 12 meses anteriores. Serviços fora do escopo descrito na Cláusula 3ª serão cobrados com acréscimo de 15% sobre o valor mensal",
    after: ", mediante aprovação prévia da CONTRATANTE."
  },
  "adjustment.index": {
    page: 4,
    clause: "Cláusula 5ª — Do Reajuste",
    before: "O valor dos honorários será reajustado pela variação positiva do",
    highlight: "Índice Nacional de Preços ao Consumidor Amplo — IPCA",
    after: ", divulgado pelo IBGE, acumulado no período de doze meses."
  },
  "adjustment.periodicity": {
    page: 4,
    clause: "Cláusula 5ª — Do Reajuste",
    before: "O reajuste será aplicado",
    highlight: "a cada 12 (doze) meses, contados a partir da data de assinatura",
    after: ", independentemente de aviso ou comunicação prévia."
  },
  "adjustment.lastAdjustment": {
    page: 4,
    clause: "Anexo II — Histórico de Reajustes",
    before: "Último reajuste aplicado em",
    highlight: "01 de março de 2025",
    after: ", correspondente a IPCA acumulado de 4,87%."
  },
  "adjustment.nextAdjustment": {
    page: 4,
    clause: "Anexo II — Histórico de Reajustes",
    before: "Próximo reajuste previsto para",
    highlight: "01 de março de 2026",
    after: ", conforme periodicidade contratual."
  },
  "validity.start": {
    page: 5,
    clause: "Cláusula 7ª — Da Vigência",
    before: "O presente contrato terá vigência a partir de",
    highlight: "01 de março de 2024",
    after: ", com duração de 36 (trinta e seis) meses."
  },
  "validity.end": {
    page: 5,
    clause: "Cláusula 7ª — Da Vigência",
    before: "O presente contrato terá duração de",
    highlight: "36 (trinta e seis) meses, encerrando-se em 01 de março de 2027",
    after: ", salvo hipótese de renovação automática."
  },
  "validity.anniversary": {
    page: 5,
    clause: "Cláusula 7ª — Da Vigência · §2º",
    before: "Considera-se aniversário contratual o",
    highlight: "dia 1º de março de cada ano",
    after: ", data a partir da qual se computa o período para fins de reajuste."
  },
  "validity.renewal": {
    page: 5,
    clause: "Cláusula 8ª — Da Renovação",
    before: "Findo o prazo inicial, o contrato",
    highlight: "renovar-se-á automaticamente por períodos iguais e sucessivos de 12 meses, salvo denúncia expressa de qualquer das partes com antecedência mínima de 60 dias",
    after: "do término do período vigente."
  },
  "extras.outOfScope": {
    page: 6,
    clause: "Cláusula 3ª — §3º — Serviços Extraordinários",
    before: "Não estão incluídos no escopo deste contrato, sendo cobrados à parte:",
    highlight: "consultoria tributária especial, defesas em processos administrativos e abertura ou encerramento de filiais",
    after: ", cujos valores seguirão tabela anexa atualizada anualmente."
  },
  "extras.extraFee": {
    page: 6,
    clause: "Cláusula 3ª — §4º",
    before: "Cada serviço extraordinário será cobrado com acréscimo de",
    highlight: "15% (quinze por cento) sobre o valor mensal vigente",
    after: ", por evento, mediante orçamento prévio."
  },
  "quota.employees": {
    page: 2,
    clause: "Cláusula 3ª — §1º — Do Escopo Quantitativo",
    before: "O valor mensal pactuado contempla o processamento da folha de até",
    highlight: "10 (dez) funcionários. Excedentes serão cobrados à razão de R$ 45,00 por funcionário entre o 11º e o 20º; R$ 38,00 entre o 21º e o 50º; e R$ 30,00 a partir do 51º funcionário",
    after: ", proporcionalmente aos meses em que o limite for ultrapassado."
  },
  "quota.fiscalDocs": {
    page: 2,
    clause: "Cláusula 3ª — §2º — Documentos Fiscais",
    before: "Estão inclusos na mensalidade a escrituração de até",
    highlight: "60 (sessenta) documentos fiscais por mês. Documentos adicionais serão cobrados a R$ 3,20 cada até o 120º, e R$ 2,40 a partir do 121º",
    after: ", apurados no fechamento mensal."
  },
  "quota.branches": {
    page: 2,
    clause: "Cláusula 3ª — §3º — Filiais",
    before: "O contrato abrange 1 (uma) matriz. Cada",
    highlight: "filial ou CNPJ adicional será cobrado à razão de R$ 420,00 mensais",
    after: ", independentemente do porte ou regime tributário."
  }
};
const SourceDrawer = ({
  fieldKey,
  fileName,
  onClose
}) => {
  const excerpt = SOURCE_EXCERPTS[fieldKey];

  // Close on Escape
  useEffectSV(() => {
    if (!fieldKey) return;
    const h = e => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [fieldKey, onClose]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "source-backdrop" + (fieldKey ? " open" : ""),
    onClick: onClose
  }), /*#__PURE__*/React.createElement("aside", {
    className: "source-drawer" + (fieldKey ? " open" : "")
  }, excerpt && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "sd-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "sd-eyebrow"
  }, /*#__PURE__*/React.createElement(IDoc, {
    size: 12
  }), " ", fileName || "Contrato.pdf", " \xB7 p\xE1g. ", excerpt.page), /*#__PURE__*/React.createElement("h3", null, excerpt.clause)), /*#__PURE__*/React.createElement("button", {
    className: "sd-close",
    onClick: onClose,
    "aria-label": "Fechar"
  }, /*#__PURE__*/React.createElement(IClose, {
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    className: "sd-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sd-paper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sd-page-head"
  }, /*#__PURE__*/React.createElement("span", null, fileName || "Contrato.pdf"), /*#__PURE__*/React.createElement("span", null, "p\xE1g. ", excerpt.page, " de 7")), /*#__PURE__*/React.createElement("div", {
    className: "sd-clause-label"
  }, excerpt.clause), /*#__PURE__*/React.createElement("p", {
    className: "sd-body"
  }, excerpt.before, " ", /*#__PURE__*/React.createElement("mark", {
    className: "sd-highlight"
  }, excerpt.highlight), " ", excerpt.after), /*#__PURE__*/React.createElement("div", {
    className: "sd-ellipsis"
  }, "\u22EF"))), /*#__PURE__*/React.createElement("div", {
    className: "sd-foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sd-hint"
  }, "Trecho identificado pela IA \u2014 clique em \"Editar\" no campo se n\xE3o bater."), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: onClose,
    style: {
      fontSize: 13,
      padding: "8px 14px"
    }
  }, "Fechar")))));
};
Object.assign(window, {
  SourceDrawer,
  SOURCE_EXCERPTS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "MVP/components/ReviewDrawer.jsx", error: String((e && e.message) || e) }); }

// MVP/components/Shared.jsx
try { (() => {
// Kontiva MVP — Icons & Brand (globals)
// Exposed on window so multiple Babel <script> blocks can share

const {
  useState: useStateX,
  useEffect: useEffectX,
  useRef: useRefX
} = React;
const Brand = ({
  onDark,
  compact
}) => /*#__PURE__*/React.createElement("div", {
  className: "brand-lockup" + (onDark ? " on-dark" : "") + (compact ? " compact" : "")
}, compact ? /*#__PURE__*/React.createElement("span", {
  className: "k-mark",
  "aria-label": "Kontiva.ai"
}, "K") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
  className: "k"
}, "Kontiva"), /*#__PURE__*/React.createElement("span", {
  className: "dot"
}, "."), /*#__PURE__*/React.createElement("span", {
  className: "ai"
}, "ai")));
const IChevron = ({
  size = 14,
  dir = "left"
}) => {
  const rot = {
    left: 180,
    right: 0,
    up: 270,
    down: 90
  }[dir] || 0;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      transform: `rotate(${rot}deg)`
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 6l6 6-6 6",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

// --- icons (stroke-based, 1.6-2.2 weight, currentColor) ---
const IEye = ({
  size = 18
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinejoin: "round"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "3",
  stroke: "currentColor",
  strokeWidth: "1.6"
}));
const IEyeOff = ({
  size = 18
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 3l18 18M10.5 6.1A9.9 9.9 0 0 1 12 6c6 0 9.5 6 9.5 6a17.2 17.2 0 0 1-3.3 4.1M6.5 7.8A17.4 17.4 0 0 0 2.5 12S6 18 12 18a9.4 9.4 0 0 0 4-.9M9.9 9.9a3 3 0 1 0 4.2 4.2",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const IArrow = ({
  size = 14
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M5 12h14M13 5l7 7-7 7",
  stroke: "currentColor",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const ITick = ({
  size = 12
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M5 12l5 5L20 7",
  stroke: "currentColor",
  strokeWidth: "3",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const IUpload = ({
  size = 28
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 16V4M12 4l-5 5M12 4l5 5",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const IDoc = ({
  size = 18
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M6 3h8l4 4v14H6z",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinejoin: "round"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9 13h6M9 16h6M9 10h3",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round"
}));
const IRadar = ({
  size = 18
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "9",
  stroke: "currentColor",
  strokeWidth: "1.6"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "5",
  stroke: "currentColor",
  strokeWidth: "1.6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 12 L19 6",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round"
}));
const IBolt = ({
  size = 18
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M13 3 4 14h7l-1 7 9-11h-7z",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinejoin: "round"
}));
const IHome = ({
  size = 18
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinejoin: "round"
}));
const IUsers = ({
  size = 18
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "9",
  cy: "8",
  r: "3.5",
  stroke: "currentColor",
  strokeWidth: "1.6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M2.5 20a6.5 6.5 0 0 1 13 0",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "17",
  cy: "9",
  r: "2.5",
  stroke: "currentColor",
  strokeWidth: "1.6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M15 20a4 4 0 0 1 6.5-3.1",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round"
}));
const ISettings = ({
  size = 18
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "3",
  stroke: "currentColor",
  strokeWidth: "1.6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round"
}));
const ICopy = ({
  size = 12
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("rect", {
  x: "8",
  y: "8",
  width: "12",
  height: "12",
  rx: "2",
  stroke: "currentColor",
  strokeWidth: "1.8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const IPen = ({
  size = 13
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M14 4l6 6-11 11H3v-6z",
  stroke: "currentColor",
  strokeWidth: "1.7",
  strokeLinejoin: "round"
}), /*#__PURE__*/React.createElement("path", {
  d: "M13 5l6 6",
  stroke: "currentColor",
  strokeWidth: "1.7",
  strokeLinecap: "round"
}));
const ICalendar = ({
  size = 16
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("rect", {
  x: "3.5",
  y: "5",
  width: "17",
  height: "16",
  rx: "2.5",
  stroke: "currentColor",
  strokeWidth: "1.6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3.5 10h17M8 3v4M16 3v4",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round"
}));
const IMoney = ({
  size = 16
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("rect", {
  x: "2.5",
  y: "6",
  width: "19",
  height: "12",
  rx: "2",
  stroke: "currentColor",
  strokeWidth: "1.6"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "2.6",
  stroke: "currentColor",
  strokeWidth: "1.6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M6 10v4M18 10v4",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round"
}));
const IPercent = ({
  size = 16
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "7",
  cy: "7",
  r: "2.6",
  stroke: "currentColor",
  strokeWidth: "1.6"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "17",
  cy: "17",
  r: "2.6",
  stroke: "currentColor",
  strokeWidth: "1.6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 5 5 19",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round"
}));
const IUser = ({
  size = 16
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "8",
  r: "3.6",
  stroke: "currentColor",
  strokeWidth: "1.6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4 20a8 8 0 0 1 16 0",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round"
}));
const IScope = ({
  size = 16
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M9 6h11M9 12h11M9 18h11",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "5",
  cy: "6",
  r: "1.4",
  fill: "currentColor"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "5",
  cy: "12",
  r: "1.4",
  fill: "currentColor"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "5",
  cy: "18",
  r: "1.4",
  fill: "currentColor"
}));
const ICake = ({
  size = 16
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M4 21h16M5 14h14v7H5zM12 10v3",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/React.createElement("path", {
  d: "M10 6c0 1 1 1.5 2 1.5S14 7 14 6s-1-2-2-3c-1 1-2 2-2 3z",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinejoin: "round"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5 18c1-1 2-1 3 0s2 1 3 0 2-1 3 0 2 1 3 0 2-1 2 0",
  stroke: "currentColor",
  strokeWidth: "1.4",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const IClose = ({
  size = 16
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M6 6l12 12M18 6 6 18",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round"
}));
const IExternal = ({
  size = 12
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M10 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-5M14 3h7v7M10 14 20 4",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const ISparkle = ({
  size = 14
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round"
}));
const IPlus = ({
  size = 14
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 5v14M5 12h14",
  stroke: "currentColor",
  strokeWidth: "1.9",
  strokeLinecap: "round"
}));
const ISheet = ({
  size = 18
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("rect", {
  x: "3.5",
  y: "4",
  width: "17",
  height: "16",
  rx: "2",
  stroke: "currentColor",
  strokeWidth: "1.6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3.5 9h17M3.5 14h17M9 4v16M15 4v16",
  stroke: "currentColor",
  strokeWidth: "1.4"
}));
const ILock = ({
  size = 14
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("rect", {
  x: "4.5",
  y: "10",
  width: "15",
  height: "10",
  rx: "2",
  stroke: "currentColor",
  strokeWidth: "1.6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8 10V7a4 4 0 0 1 8 0v3",
  stroke: "currentColor",
  strokeWidth: "1.6"
}));
const IAlert = ({
  size = 16
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 3 2.5 20h19L12 3Z",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinejoin: "round"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 10v4",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "17",
  r: "1",
  fill: "currentColor"
}));
const ITrendUp = ({
  size = 14
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 17 10 10l4 4 7-7",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/React.createElement("path", {
  d: "M15 7h6v6",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const ITrendDown = ({
  size = 14
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7 10 14l4-4 7 7",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/React.createElement("path", {
  d: "M15 17h6v-6",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const IDownload = ({
  size = 14
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 4v12M7 11l5 5 5-5M5 20h14",
  stroke: "currentColor",
  strokeWidth: "1.7",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const IShare = ({
  size = 14
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "6",
  cy: "12",
  r: "2.6",
  stroke: "currentColor",
  strokeWidth: "1.6"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "18",
  cy: "6",
  r: "2.6",
  stroke: "currentColor",
  strokeWidth: "1.6"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "18",
  cy: "18",
  r: "2.6",
  stroke: "currentColor",
  strokeWidth: "1.6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8.4 11 15.6 7.2M8.4 13l7.2 3.8",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round"
}));

// ---------- expose on window ----------
Object.assign(window, {
  Brand,
  IEye,
  IEyeOff,
  IArrow,
  ITick,
  IUpload,
  IDoc,
  IRadar,
  IBolt,
  IHome,
  IUsers,
  ISettings,
  ICopy,
  IPen,
  ICalendar,
  IMoney,
  IPercent,
  IUser,
  IScope,
  ICake,
  IClose,
  IExternal,
  ISparkle,
  IPlus,
  IChevron,
  ISheet,
  ILock,
  IAlert,
  ITrendUp,
  ITrendDown,
  IDownload,
  IShare
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "MVP/components/Shared.jsx", error: String((e && e.message) || e) }); }

// MVP/components/Upload.jsx
try { (() => {
// Kontiva MVP — Upload screens (first contract onboarding)

const {
  useState: useStateU,
  useRef: useRefU
} = React;

// Shared drag-and-drop hook
function useDropzone(onFile) {
  const [active, setActive] = useStateU(false);
  const [fileName, setFileName] = useStateU(null);
  const inputRef = useRefU(null);
  const handleFiles = files => {
    if (!files || !files.length) return;
    const f = files[0];
    setFileName(f.name);
    onFile && onFile(f);
  };
  const onDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setActive(false);
    if (e.dataTransfer && e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };
  const onDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    setActive(true);
  };
  const onDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    setActive(false);
  };
  const onClick = () => {
    inputRef.current && inputRef.current.click();
  };
  const onInputChange = e => handleFiles(e.target.files);
  return {
    active,
    fileName,
    inputRef,
    onDrop,
    onDragOver,
    onDragLeave,
    onClick,
    onInputChange,
    setFileName
  };
}

// ---------- Variant A: Centered onboarding (kept for reference) ----------
const UploadCentered = ({
  user,
  onFile,
  onLogout
}) => {
  const dz = useDropzone(onFile);
  return /*#__PURE__*/React.createElement("div", {
    className: "upload-centered"
  }, /*#__PURE__*/React.createElement("div", {
    className: "top-strip"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(Brand, null), /*#__PURE__*/React.createElement("span", {
    className: "breadcrumb"
  }, /*#__PURE__*/React.createElement("span", null, "Onboarding"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", null, "Primeiro contrato"))), /*#__PURE__*/React.createElement("div", {
    className: "user-chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "avatar"
  }, "MG"), /*#__PURE__*/React.createElement("span", null, user), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    className: "btn btn-ghost",
    style: {
      padding: "6px 12px",
      fontSize: 12,
      marginLeft: 8
    }
  }, "Sair"))), /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " Passo 1 de 1"), /*#__PURE__*/React.createElement("h1", null, "Envie o primeiro contrato.", /*#__PURE__*/React.createElement("br", null), "A gente ", /*#__PURE__*/React.createElement("span", {
    className: "serif-accent"
  }, "come\xE7a a ler"), " no mesmo segundo", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ciano)"
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "Qualquer PDF ou DOCX serve.")), /*#__PURE__*/React.createElement("div", {
    className: "dropzone" + (dz.active ? " active" : ""),
    onDrop: dz.onDrop,
    onDragOver: dz.onDragOver,
    onDragLeave: dz.onDragLeave,
    onClick: dz.onClick,
    role: "button",
    tabIndex: 0
  }, /*#__PURE__*/React.createElement("div", {
    className: "dz-icon"
  }, /*#__PURE__*/React.createElement(IUpload, {
    size: 30
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "dz-title"
  }, "Arraste o contrato aqui"), /*#__PURE__*/React.createElement("div", {
    className: "dz-sub",
    style: {
      marginTop: 10
    }
  }, "Um contrato basta para o primeiro raio-X.")), /*#__PURE__*/React.createElement("input", {
    ref: dz.inputRef,
    type: "file",
    accept: ".pdf,.docx,application/pdf",
    onChange: dz.onInputChange,
    style: {
      display: "none"
    }
  }))));
};

// ---------- Variant B: Workspace upload (used by the live prototype) ----------
const UploadWorkspace = ({
  user,
  onFile,
  onLogout,
  onNavClick
}) => {
  const dz = useDropzone(f => {
    onFile && onFile(f);
  });
  return /*#__PURE__*/React.createElement(WorkspaceShell, {
    activeNav: "home",
    counts: {
      clients: 0,
      contracts: 0
    },
    onNavClick: onNavClick
  }, /*#__PURE__*/React.createElement("div", {
    className: "ws-topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "crumb"
  }, /*#__PURE__*/React.createElement("span", null, "In\xEDcio"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--azul-profundo)"
    }
  }, "Primeiro contrato")), /*#__PURE__*/React.createElement("div", {
    className: "right-actions"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13,
      color: "var(--cinza-escuro)",
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "avatar",
    style: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      background: "var(--azul-profundo)",
      color: "#EAF6FF",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 700
    }
  }, "MG"), /*#__PURE__*/React.createElement("span", null, user)), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    className: "btn btn-ghost",
    style: {
      padding: "8px 14px",
      fontSize: 13
    }
  }, "Sair"))), /*#__PURE__*/React.createElement("div", {
    className: "ws-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ws-heading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " Come\xE7ar"), /*#__PURE__*/React.createElement("h1", null, "Solte o primeiro ", /*#__PURE__*/React.createElement("span", {
    className: "serif-accent"
  }, "contrato"), "."), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, "A gente l\xEA o documento, identifica o cliente e cria a ficha dele sozinha. Voc\xEA n\xE3o precisa cadastrar nada antes \u2014 s\xF3 enviar.")), /*#__PURE__*/React.createElement("div", {
    className: "client-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-head"
  }, /*#__PURE__*/React.createElement("h3", null, "Upload do contrato"), /*#__PURE__*/React.createElement("span", {
    className: "step-chip"
  }, "Passo \xFAnico")), /*#__PURE__*/React.createElement("div", {
    className: "client-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ws-dropzone" + (dz.active ? " active" : ""),
    onDrop: dz.onDrop,
    onDragOver: dz.onDragOver,
    onDragLeave: dz.onDragLeave,
    onClick: dz.onClick,
    role: "button",
    tabIndex: 0
  }, /*#__PURE__*/React.createElement("div", {
    className: "dz-icon"
  }, /*#__PURE__*/React.createElement(IUpload, {
    size: 24
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "dz-title"
  }, "Arraste o contrato aqui"), /*#__PURE__*/React.createElement("div", {
    className: "dz-sub",
    style: {
      marginTop: 6
    }
  }, "ou ", /*#__PURE__*/React.createElement("u", {
    style: {
      textUnderlineOffset: 3
    }
  }, "selecione um arquivo"), " (PDF, DOCX \xB7 at\xE9 20 MB)")), /*#__PURE__*/React.createElement("input", {
    ref: dz.inputRef,
    type: "file",
    accept: ".pdf,.docx,application/pdf",
    onChange: dz.onInputChange,
    style: {
      display: "none"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "ws-checklist"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cl-title"
  }, "A Kontiva extrai do contrato"), /*#__PURE__*/React.createElement("div", {
    className: "cl-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mark"
  }, /*#__PURE__*/React.createElement(ITick, {
    size: 9
  })), " Nome e CNPJ do cliente"), /*#__PURE__*/React.createElement("div", {
    className: "cl-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mark"
  }, /*#__PURE__*/React.createElement(ITick, {
    size: 9
  })), " Cl\xE1usulas de reajuste e \xEDndice"), /*#__PURE__*/React.createElement("div", {
    className: "cl-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mark"
  }, /*#__PURE__*/React.createElement(ITick, {
    size: 9
  })), " Escopo e servi\xE7os extras"), /*#__PURE__*/React.createElement("div", {
    className: "cl-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mark"
  }, /*#__PURE__*/React.createElement(ITick, {
    size: 9
  })), " Vig\xEAncia, renova\xE7\xE3o e anivers\xE1rio do contrato")))))));
};
Object.assign(window, {
  UploadCentered,
  UploadWorkspace
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "MVP/components/Upload.jsx", error: String((e && e.message) || e) }); }

// MVP/components/Workspace.jsx
try { (() => {
// Kontiva MVP — Shared Workspace shell (sidebar + content slot)
// Used by the Upload and Review screens so the nav stays consistent.

const {
  useState: useStateWS
} = React;
const SIDEBAR_KEY = "kontiva-ws-sidebar";
const WS_NAV = [{
  key: "home",
  label: "Início",
  icon: IHome
}, {
  key: "clients",
  label: "Clientes",
  icon: IUsers,
  countKey: "clients"
}, {
  key: "contracts",
  label: "Contratos",
  icon: IDoc,
  countKey: "contracts"
}, {
  key: "documents",
  label: "Documentos",
  icon: ISheet,
  countKey: "documents"
}];
const WorkspaceShell = ({
  children,
  activeNav = "home",
  counts = {},
  onNavClick
}) => {
  const [collapsed, setCollapsed] = useStateWS(() => {
    try {
      const saved = localStorage.getItem(SIDEBAR_KEY);
      return saved === null ? true : saved === "1";
    } catch {
      return true;
    }
  });
  const toggleSidebar = () => {
    setCollapsed(c => {
      const next = !c;
      try {
        localStorage.setItem(SIDEBAR_KEY, next ? "1" : "0");
      } catch {}
      return next;
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "upload-workspace" + (collapsed ? " sidebar-collapsed" : "")
  }, /*#__PURE__*/React.createElement("aside", {
    className: "ws-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ws-sidebar-head"
  }, /*#__PURE__*/React.createElement(Brand, {
    onDark: true,
    compact: collapsed
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ws-collapse-btn",
    onClick: toggleSidebar,
    "aria-label": collapsed ? "Expandir menu" : "Recolher menu",
    title: collapsed ? "Expandir menu" : "Recolher menu"
  }, /*#__PURE__*/React.createElement(IChevron, {
    dir: collapsed ? "right" : "left"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ws-section-label",
    style: {
      marginBottom: 8
    }
  }, "Navega\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
    className: "ws-nav"
  }, WS_NAV.map(n => {
    const Ico = n.icon;
    const active = n.key === activeNav;
    const count = n.countKey ? counts[n.countKey] : null;
    return /*#__PURE__*/React.createElement("div", {
      key: n.key,
      className: "item" + (active ? " active" : ""),
      "data-tip": n.label,
      onClick: () => onNavClick && onNavClick(n.key)
    }, /*#__PURE__*/React.createElement("span", {
      className: "ico"
    }, /*#__PURE__*/React.createElement(Ico, null)), /*#__PURE__*/React.createElement("span", {
      className: "lbl"
    }, n.label), count != null && /*#__PURE__*/React.createElement("span", {
      className: "count"
    }, count));
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ws-section-label",
    style: {
      marginBottom: 8
    }
  }, "Geral"), /*#__PURE__*/React.createElement("div", {
    className: "ws-nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "item",
    "data-tip": "Configura\xE7\xF5es"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ico"
  }, /*#__PURE__*/React.createElement(ISettings, null)), /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Configura\xE7\xF5es")))), (!counts.clients || counts.clients === 0) && /*#__PURE__*/React.createElement("div", {
    className: "clients-empty"
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "#EAF6FF",
      display: "block",
      marginBottom: 4,
      fontSize: 13
    }
  }, "Ainda sem carteira"), "Seu primeiro contrato cria o primeiro cliente. Depois \xE9 s\xF3 seguir adicionando.")), /*#__PURE__*/React.createElement("main", {
    className: "ws-main"
  }, children));
};
Object.assign(window, {
  WorkspaceShell
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "MVP/components/Workspace.jsx", error: String((e && e.message) || e) }); }

// MVP/design-canvas.jsx
try { (() => {
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Artboards are reorderable (grip-drag), labels/titles are inline-editable,
// and any artboard can be opened in a fullscreen focus overlay (←/→/Esc).
// State persists to a .design-canvas.state.json sidecar via the host
// bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}', '.dc-card{transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px}', '.dc-grip{cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{cursor:pointer;border-radius:4px;padding:3px 6px;display:flex;align-items:center;transition:background .12s}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-expand{position:absolute;bottom:100%;right:0;margin-bottom:5px;z-index:2;opacity:0;transition:opacity .12s,background .12s;', '  width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center}', '.dc-expand:hover{background:rgba(0,0,0,.06);color:#2a251f}', '[data-dc-slot]:hover .dc-expand{opacity:1}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, focused
// artboard). Order/titles/labels persist to a .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Only direct DCSection > DCArtboard children are
  // walked — wrapping them in other elements opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  React.Children.forEach(children, sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const srcIds = [];
    React.Children.forEach(sec.props.children, ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (!aid) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if (e.ctrlKey) {
        // trackpad pinch (or explicit ctrl+wheel)
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(children);
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const srcOrder = artboards.map(a => a.props.id ?? a.props.label);
  const sec = ctx && sid && ctx.section(sid) || {};
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 80,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px 56px'
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow",
    style: {
      position: 'absolute',
      bottom: '100%',
      left: -4,
      marginBottom: 4,
      color: DC.label
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    onPointerDown: e => e.stopPropagation(),
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    const ns = sectionOrder[(secIdx + d + sectionOrder.length) % sectionOrder.length];
    const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
    if (first) ctx.setFocus(`${ns}/${first}`);
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "MVP/design-canvas.jsx", error: String((e && e.message) || e) }); }

// components/hero.jsx
try { (() => {
/* Kontiva.ai Landing — sections */

const {
  useState,
  useEffect,
  useRef,
  useMemo
} = React;

// ---------- Inline icons (kept simple, geometric) ----------
const IconWhats = () => /*#__PURE__*/React.createElement("svg", {
  className: "whats",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M19.05 4.91A10 10 0 0 0 4.04 18.26L3 22l3.83-1.01A10 10 0 1 0 19.05 4.91zM12 20.15a8.14 8.14 0 0 1-4.15-1.13l-.3-.18-2.27.6.6-2.22-.19-.32A8.15 8.15 0 1 1 12 20.15zm4.46-6.1c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.46c-.16 0-.4.06-.62.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.57.25 1.02.4 1.37.5.57.18 1.1.16 1.51.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z",
  fill: "currentColor"
}));
const IconArrow = () => /*#__PURE__*/React.createElement("svg", {
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M5 12h14M13 5l7 7-7 7",
  stroke: "currentColor",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const IconTick = () => /*#__PURE__*/React.createElement("svg", {
  width: "10",
  height: "10",
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M5 12l5 5L20 7",
  stroke: "currentColor",
  strokeWidth: "3",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const IconRadar = () => /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "9",
  stroke: "currentColor",
  strokeWidth: "1.6"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "5",
  stroke: "currentColor",
  strokeWidth: "1.6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 12 L19 6",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round"
}));
const IconDoc = () => /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M6 3h8l4 4v14H6z",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinejoin: "round"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9 13h6M9 16h6M9 10h3",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round"
}));
const IconBolt = () => /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M13 3 4 14h7l-1 7 9-11h-7z",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinejoin: "round"
}));

// ---------- Brand lockup ----------
const Brand = () => /*#__PURE__*/React.createElement("div", {
  className: "brand-lockup"
}, /*#__PURE__*/React.createElement("span", {
  className: "k"
}, "Kontiva"), /*#__PURE__*/React.createElement("span", {
  className: "dot"
}, "."), /*#__PURE__*/React.createElement("span", {
  className: "ai"
}, "ai"));

// ---------- Nav ----------
const Nav = () => /*#__PURE__*/React.createElement("nav", {
  className: "nav"
}, /*#__PURE__*/React.createElement("div", {
  className: "shell nav-inner"
}, /*#__PURE__*/React.createElement(Brand, null), /*#__PURE__*/React.createElement("div", {
  className: "nav-links"
}, /*#__PURE__*/React.createElement("a", {
  href: "#problema"
}, "O problema"), /*#__PURE__*/React.createElement("a", {
  href: "#calculadora"
}, "Calculadora"), /*#__PURE__*/React.createElement("a", {
  href: "#como-funciona"
}, "Como funciona"), /*#__PURE__*/React.createElement("a", {
  href: "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20conhecer%20a%20Kontiva.ai",
  target: "_blank",
  rel: "noreferrer",
  className: "btn btn-primary",
  style: {
    padding: '10px 18px',
    fontSize: 14
  }
}, /*#__PURE__*/React.createElement(IconWhats, null), " Falar no WhatsApp"))));

// ---------- Hero ----------
const Hero = () => {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) ref.current.classList.add('in-view');
    }, {
      threshold: 0.2
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    className: "hero",
    ref: ref,
    id: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shell hero-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow reveal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " Gest\xE3o cont\xE1bil sem ponto cego"), /*#__PURE__*/React.createElement("h1", {
    className: "reveal delay-1",
    style: {
      marginTop: 24
    }
  }, "Seu escrit\xF3rio", /*#__PURE__*/React.createElement("br", null), "perde receita", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "strike"
  }, "todo m\xEAs."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "A gente encontra", /*#__PURE__*/React.createElement("span", {
    className: "ai-dot"
  }, "."))), /*#__PURE__*/React.createElement("p", {
    className: "lead hero-sub reveal delay-2"
  }, "A Kontiva.ai l\xEA seus contratos, cruza com o que foi cobrado e mostra o que passou despercebido \u2014 contrato por contrato, cliente por cliente."), /*#__PURE__*/React.createElement("div", {
    className: "hero-cta-row reveal delay-3"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20conhecer%20a%20Kontiva.ai",
    target: "_blank",
    rel: "noreferrer",
    className: "btn btn-primary"
  }, /*#__PURE__*/React.createElement(IconWhats, null), " Falar no WhatsApp"), /*#__PURE__*/React.createElement("a", {
    href: "#calculadora",
    className: "btn btn-ghost"
  }, "Ver quanto voc\xEA perde ", /*#__PURE__*/React.createElement(IconArrow, null))), /*#__PURE__*/React.createElement("div", {
    className: "hero-meta reveal delay-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "tick"
  }, /*#__PURE__*/React.createElement(IconTick, null)), " Integra com seu ERP cont\xE1bil"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "tick"
  }, /*#__PURE__*/React.createElement(IconTick, null)), " Diagn\xF3stico em 72h"))), /*#__PURE__*/React.createElement(RadarCard, null)));
};
const radarData = [{
  idx: '001',
  name: 'Padaria São Jorge ME',
  amount: 'R$ 1.240,00',
  flagged: false,
  badge: 'OK'
}, {
  idx: '002',
  name: 'Construtora Horizonte Ltda.',
  amount: 'R$ 3.820,00',
  flagged: true,
  badge: 'Reajuste não aplicado'
}, {
  idx: '003',
  name: 'Clínica Vitta Serviços',
  amount: 'R$ 2.150,00',
  flagged: false,
  badge: 'OK'
}, {
  idx: '004',
  name: 'Mercado Bom Preço',
  amount: 'R$ 980,00',
  flagged: false,
  badge: 'OK'
}, {
  idx: '005',
  name: 'Studio M Arquitetura',
  amount: 'R$ 1.640,00',
  flagged: true,
  badge: 'Serviço extra não cobrado'
}, {
  idx: '006',
  name: 'Transportes Aurora S.A.',
  amount: 'R$ 4.500,00',
  flagged: false,
  badge: 'OK'
}, {
  idx: '007',
  name: 'Restaurante Pátio 22',
  amount: 'R$ 720,00',
  flagged: true,
  badge: 'Índice desatualizado'
}];
const RadarCard = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "radar-card reveal delay-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "radar-head"
  }, /*#__PURE__*/React.createElement("span", null, "Carteira \xB7 Mar\xE7o/2026"), /*#__PURE__*/React.createElement("span", {
    className: "live"
  }, "Varredura ativa")), /*#__PURE__*/React.createElement("div", {
    className: "radar-list"
  }, radarData.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "radar-row" + (r.flagged ? " flagged" : "")
  }, /*#__PURE__*/React.createElement("span", {
    className: "idx"
  }, "#", r.idx), /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, r.name), /*#__PURE__*/React.createElement("span", {
    className: "amount"
  }, r.amount), /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, r.badge)))), /*#__PURE__*/React.createElement("div", {
    className: "radar-summary"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Receita a recuperar identificada")), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, "R$ 6.180", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      opacity: 0.6
    }
  }, ",00"))));
};

// Exports
Object.assign(window, {
  Nav,
  Hero,
  Brand,
  IconWhats,
  IconArrow,
  IconTick,
  IconRadar,
  IconDoc,
  IconBolt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/hero.jsx", error: String((e && e.message) || e) }); }

// components/sections.jsx
try { (() => {
/* Problem (Antes/Depois) + Calculator + How it works + Final CTA + Footer */

const {
  useState: useState2,
  useEffect: useEffect2,
  useRef: useRef2,
  useMemo: useMemo2
} = React;

// ---------- Simple in-view hook to reveal children ----------
function useReveal(rootRef) {
  useEffect2(() => {
    if (!rootRef.current) return;
    const items = rootRef.current.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, {
      threshold: 0.12
    });
    items.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ---------- Problem section (Antes/Depois) ----------
const Problem = () => {
  const ref = useRef2(null);
  useReveal(ref);
  return /*#__PURE__*/React.createElement("section", {
    className: "problem",
    id: "problema",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " O ponto cego"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 20
    }
  }, "Planilha n\xE3o \xE9 sistema.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--cinza-texto)'
    }
  }, "\xC9 f\xE9.")), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      marginTop: 20
    }
  }, "O controle de contratos vive numa aba de Excel. Reajuste de janeiro, servi\xE7o extra cobrado em mar\xE7o, cliente que trocou de regime \u2014 quem lembra de tudo? A Kontiva lembra.")), /*#__PURE__*/React.createElement("div", {
    className: "split"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel before reveal delay-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, "contratos_2026.xlsx"), /*#__PURE__*/React.createElement("div", {
    className: "panel-tag"
  }, "Antes")), /*#__PURE__*/React.createElement("div", {
    className: "sheet"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet-row head"
  }, /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null, "Cliente"), /*#__PURE__*/React.createElement("div", null, "Mensalidade"), /*#__PURE__*/React.createElement("div", null, "\xDAltimo reajuste")), /*#__PURE__*/React.createElement("div", {
    className: "sheet-row"
  }, /*#__PURE__*/React.createElement("div", null, "1"), /*#__PURE__*/React.createElement("div", null, "Construtora Horizonte"), /*#__PURE__*/React.createElement("div", null, "3.820,00"), /*#__PURE__*/React.createElement("div", {
    className: "err"
  }, "?")), /*#__PURE__*/React.createElement("div", {
    className: "sheet-row"
  }, /*#__PURE__*/React.createElement("div", null, "2"), /*#__PURE__*/React.createElement("div", null, "Studio M Arquitetura"), /*#__PURE__*/React.createElement("div", null, "1.640,00"), /*#__PURE__*/React.createElement("div", {
    className: "err"
  }, "nov/2024")), /*#__PURE__*/React.createElement("div", {
    className: "sheet-row"
  }, /*#__PURE__*/React.createElement("div", null, "3"), /*#__PURE__*/React.createElement("div", null, "Padaria S\xE3o Jorge"), /*#__PURE__*/React.createElement("div", null, "1.240,00"), /*#__PURE__*/React.createElement("div", null, "jan/2026")), /*#__PURE__*/React.createElement("div", {
    className: "sheet-row"
  }, /*#__PURE__*/React.createElement("div", null, "4"), /*#__PURE__*/React.createElement("div", null, "Restaurante P\xE1tio 22"), /*#__PURE__*/React.createElement("div", null, "720,00"), /*#__PURE__*/React.createElement("div", {
    className: "err"
  }, "\u2014")), /*#__PURE__*/React.createElement("div", {
    className: "sheet-row"
  }, /*#__PURE__*/React.createElement("div", null, "5"), /*#__PURE__*/React.createElement("div", {
    className: "faded"
  }, "Mercado Bom Pre\xE7o"), /*#__PURE__*/React.createElement("div", {
    className: "faded"
  }, "980,00"), /*#__PURE__*/React.createElement("div", {
    className: "faded"
  }, "jan/2026")), /*#__PURE__*/React.createElement("div", {
    className: "sheet-row"
  }, /*#__PURE__*/React.createElement("div", null, "6"), /*#__PURE__*/React.createElement("div", {
    className: "blank"
  }, "\xA0"), /*#__PURE__*/React.createElement("div", {
    className: "blank"
  }, "\xA0"), /*#__PURE__*/React.createElement("div", {
    className: "blank"
  }, "\xA0"))), /*#__PURE__*/React.createElement("div", {
    className: "sheet-caption"
  }, /*#__PURE__*/React.createElement("span", null, "3 campos em branco"), /*#__PURE__*/React.createElement("span", null, "2 reajustes vencidos"), /*#__PURE__*/React.createElement("span", {
    className: "muted"
  }, "\xFAltima edi\xE7\xE3o: h\xE1 47 dias"))), /*#__PURE__*/React.createElement("div", {
    className: "panel after reveal delay-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, "Kontiva \xB7 Painel de contratos"), /*#__PURE__*/React.createElement("div", {
    className: "panel-tag"
  }, "Depois")), /*#__PURE__*/React.createElement("div", {
    className: "k-stack"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-ico"
  }, /*#__PURE__*/React.createElement(IconRadar, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "k-title"
  }, "Construtora Horizonte"), /*#__PURE__*/React.createElement("div", {
    className: "k-sub"
  }, "Reajuste IPCA pendente desde jan/26"))), /*#__PURE__*/React.createElement("div", {
    className: "k-val"
  }, "+R$ 318")), /*#__PURE__*/React.createElement("div", {
    className: "k-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-ico"
  }, /*#__PURE__*/React.createElement(IconDoc, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "k-title"
  }, "Studio M Arquitetura"), /*#__PURE__*/React.createElement("div", {
    className: "k-sub"
  }, "Servi\xE7o extra de dez/25 n\xE3o faturado"))), /*#__PURE__*/React.createElement("div", {
    className: "k-val"
  }, "+R$ 1.240")), /*#__PURE__*/React.createElement("div", {
    className: "k-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-ico"
  }, /*#__PURE__*/React.createElement(IconBolt, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "k-title"
  }, "Restaurante P\xE1tio 22"), /*#__PURE__*/React.createElement("div", {
    className: "k-sub"
  }, "\xCDndice de corre\xE7\xE3o desatualizado"))), /*#__PURE__*/React.createElement("div", {
    className: "k-val"
  }, "+R$ 86")), /*#__PURE__*/React.createElement("div", {
    className: "k-card",
    style: {
      background: 'color-mix(in oklab, var(--ciano) calc(14% * var(--accent-boost)), transparent)',
      borderColor: 'color-mix(in oklab, var(--ciano) 40%, transparent)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-left"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'rgba(234,246,255,0.7)'
    }
  }, "Total identificado \xB7 mar\xE7o")), /*#__PURE__*/React.createElement("div", {
    className: "k-val",
    style: {
      fontSize: 22
    }
  }, "R$ 6.180,00")))))));
};

// ---------- Calculator ----------
const brl = n => n.toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0
});
const Calculator = () => {
  const [clientes, setClientes] = useState2(180);
  const [ticket, setTicket] = useState2(850);
  const [perc, setPerc] = useState2(6);
  const ref = useRef2(null);
  useReveal(ref);
  const perdaMes = Math.round(clientes * ticket * (perc / 100));
  const perdaAno = perdaMes * 12;

  // Slider fill
  const fill = (val, min, max) => `${((val - min) / (max - min) * 100).toFixed(1)}%`;
  return /*#__PURE__*/React.createElement("section", {
    className: "calc",
    id: "calculadora",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "shell calc-wrap"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow reveal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " Calculadora"), /*#__PURE__*/React.createElement("h2", {
    className: "reveal delay-1",
    style: {
      marginTop: 20
    }
  }, "Quanto seu escrit\xF3rio", /*#__PURE__*/React.createElement("br", null), "est\xE1 deixando na mesa?"), /*#__PURE__*/React.createElement("p", {
    className: "lead reveal delay-2",
    style: {
      marginTop: 24,
      maxWidth: 480
    }
  }, "Ajuste os valores do seu escrit\xF3rio. N\xE3o \xE9 chute \u2014 \xE9 a m\xE9dia que encontramos em carteiras parecidas com a sua."), /*#__PURE__*/React.createElement("p", {
    className: "reveal delay-3",
    style: {
      marginTop: 28,
      fontSize: 13,
      color: 'var(--cinza-texto)',
      maxWidth: 460
    }
  }, "Estimativa baseada em reajustes n\xE3o aplicados, servi\xE7os extras n\xE3o faturados e contratos vencidos. Valor real costuma ser maior.")), /*#__PURE__*/React.createElement("div", {
    className: "calc-card reveal delay-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "calc-field"
  }, /*#__PURE__*/React.createElement("label", null, "Clientes ativos na carteira ", /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, clientes)), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "100",
    max: "600",
    step: "10",
    value: clientes,
    onChange: e => setClientes(+e.target.value),
    style: {
      '--fill': fill(clientes, 100, 600)
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "calc-field"
  }, /*#__PURE__*/React.createElement("label", null, "Ticket m\xE9dio mensal ", /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, brl(ticket))), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "300",
    max: "3000",
    step: "50",
    value: ticket,
    onChange: e => setTicket(+e.target.value),
    style: {
      '--fill': fill(ticket, 300, 3000)
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "calc-field"
  }, /*#__PURE__*/React.createElement("label", null, "Receita potencialmente perdida ", /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, perc, "%")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "2",
    max: "15",
    step: "0.5",
    value: perc,
    onChange: e => setPerc(+e.target.value),
    style: {
      '--fill': fill(perc, 2, 15)
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "calc-result"
  }, /*#__PURE__*/React.createElement("div", {
    className: "l1"
  }, "Estimativa mensal"), /*#__PURE__*/React.createElement("div", {
    className: "l2"
  }, brl(perdaMes)), /*#__PURE__*/React.createElement("div", {
    className: "l3"
  }, "\u2248 ", brl(perdaAno), " por ano")))));
};

// ---------- How it works ----------
const steps = [{
  n: '01',
  title: 'Conecte sua carteira',
  body: 'Integração com seu ERP contábil ou envio dos contratos em PDF. Leva minutos, não semanas.',
  illus: mockStyle => /*#__PURE__*/React.createElement(StepIllus, {
    variant: "connect",
    mockStyle: mockStyle
  })
}, {
  n: '02',
  title: 'A Kontiva varre',
  body: 'Lemos cláusula por cláusula, cruzamos com o que foi cobrado e identificamos onde está o dinheiro parado.',
  illus: mockStyle => /*#__PURE__*/React.createElement(StepIllus, {
    variant: "scan",
    mockStyle: mockStyle
  })
}, {
  n: '03',
  title: 'Você age com precisão',
  body: 'Painel com cada contrato, cada valor, cada ação. Você decide. A Kontiva documenta.',
  illus: mockStyle => /*#__PURE__*/React.createElement(StepIllus, {
    variant: "act",
    mockStyle: mockStyle
  })
}];
const StepIllus = ({
  variant,
  mockStyle
}) => {
  if (mockStyle === 'abstract') {
    return /*#__PURE__*/React.createElement("div", {
      className: "step-illus",
      style: {
        background: 'var(--azul-profundo)',
        position: 'relative',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: variant === 'connect' ? `repeating-linear-gradient(135deg, transparent 0 10px, color-mix(in oklab, var(--ciano) 12%, transparent) 10px 11px)` : variant === 'scan' ? `radial-gradient(200px circle at 50% 50%, color-mix(in oklab, var(--ciano) 30%, transparent), transparent 70%)` : `linear-gradient(90deg, color-mix(in oklab, var(--ciano) 6%, transparent), color-mix(in oklab, var(--ciano) 24%, transparent))`
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 20,
        top: 20,
        right: 20,
        bottom: 20,
        border: '1px dashed rgba(0,212,255,0.25)',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--ciano)',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 11,
        letterSpacing: '0.1em',
        textTransform: 'uppercase'
      }
    }, variant === 'connect' && 'import.contratos', variant === 'scan' && 'scan.ativo', variant === 'act' && 'acao.recomendada'));
  }

  // realistic mini-mocks
  return /*#__PURE__*/React.createElement("div", {
    className: "step-illus",
    style: {
      padding: 12,
      background: 'var(--azul-profundo)'
    }
  }, variant === 'connect' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      height: '100%'
    }
  }, [1, 2, 3].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: 22,
      borderRadius: 6,
      background: 'rgba(255,255,255,0.06)',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 14,
      height: 14,
      background: 'var(--ciano)',
      borderRadius: 3,
      opacity: 0.8
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      flex: 1,
      background: 'rgba(255,255,255,0.12)',
      borderRadius: 3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: 'var(--ciano)',
      fontFamily: 'JetBrains Mono, monospace'
    }
  }, "PDF"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      fontSize: 10,
      fontFamily: 'JetBrains Mono, monospace',
      color: 'rgba(234,246,255,0.5)',
      textAlign: 'center'
    }
  }, "212 contratos importados")), variant === 'scan' && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      overflow: 'hidden'
    }
  }, [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: 8,
      background: i === 2 ? 'var(--ciano)' : 'rgba(255,255,255,0.1)',
      borderRadius: 3,
      margin: '8px 0',
      width: `${70 + i * 5}%`
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: '50%',
      height: 2,
      background: 'linear-gradient(90deg, transparent, var(--ciano), transparent)',
      animation: 'scan 2.4s ease-in-out infinite'
    }
  })), variant === 'act' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      height: '100%',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'color-mix(in oklab, var(--ciano) 14%, transparent)',
      border: '1px solid color-mix(in oklab, var(--ciano) 40%, transparent)',
      borderRadius: 8,
      padding: '8px 10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#EAF6FF'
    }
  }, "Aplicar reajuste"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--ciano)',
      fontFamily: 'JetBrains Mono, monospace'
    }
  }, "+R$ 318")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 8,
      padding: '8px 10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'rgba(234,246,255,0.7)'
    }
  }, "Faturar extra"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'rgba(234,246,255,0.7)',
      fontFamily: 'JetBrains Mono, monospace'
    }
  }, "+R$ 1.240"))));
};
const HowItWorks = ({
  mockStyle
}) => {
  const ref = useRef2(null);
  useReveal(ref);
  return /*#__PURE__*/React.createElement("section", {
    className: "how",
    id: "como-funciona",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " Como funciona"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 20
    }
  }, "Tr\xEAs passos.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--cinza-texto)'
    }
  }, "Primeiro resultado em 72h."))), /*#__PURE__*/React.createElement("div", {
    className: "steps"
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: `step reveal delay-${i + 1}`,
    key: s.n
  }, /*#__PURE__*/React.createElement("div", {
    className: "step-num"
  }, "PASSO ", s.n), /*#__PURE__*/React.createElement("h3", null, s.title), /*#__PURE__*/React.createElement("p", null, s.body), s.illus(mockStyle))))));
};

// ---------- Final CTA ----------
const FinalCTA = () => {
  const ref = useRef2(null);
  useReveal(ref);
  return /*#__PURE__*/React.createElement("section", {
    className: "final-cta",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow reveal",
    style: {
      color: 'rgba(234,246,255,0.5)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " Pronto?"), /*#__PURE__*/React.createElement("h2", {
    className: "reveal delay-1",
    style: {
      marginTop: 20,
      fontSize: 'clamp(40px, 5.4vw, 76px)'
    }
  }, "Descubra, em 72h,", /*#__PURE__*/React.createElement("br", null), "quanto sua carteira", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "hl"
  }, "deixou de cobrar", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--branco)'
    }
  }, "."))), /*#__PURE__*/React.createElement("p", {
    className: "sub reveal delay-2"
  }, "Diagn\xF3stico da sua carteira pela nossa equipe. Sem compromisso, sem apresenta\xE7\xE3o de 40 slides. Mandamos o resultado no seu WhatsApp."), /*#__PURE__*/React.createElement("div", {
    className: "reveal delay-3",
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20o%20diagn%C3%B3stico%20da%20minha%20carteira",
    target: "_blank",
    rel: "noreferrer",
    className: "btn btn-primary",
    style: {
      padding: '18px 28px',
      fontSize: 16
    }
  }, /*#__PURE__*/React.createElement(IconWhats, null), " Falar no WhatsApp"), /*#__PURE__*/React.createElement("a", {
    href: "#hero",
    className: "btn btn-ghost",
    style: {
      borderColor: 'rgba(255,255,255,0.2)',
      color: '#EAF6FF',
      padding: '18px 26px'
    }
  }, "Voltar ao topo"))));
};

// ---------- Footer ----------
const Footer = () => /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
  className: "shell"
}, /*#__PURE__*/React.createElement(Brand, null), /*#__PURE__*/React.createElement("div", null, "\xA9 2026 Kontiva.ai \xB7 Gest\xE3o cont\xE1bil sem ponto cego.")));
Object.assign(window, {
  Problem,
  Calculator,
  HowItWorks,
  FinalCTA,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections.jsx", error: String((e && e.message) || e) }); }

// deck-stage.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
/* BEGIN USAGE */
/**
 * <deck-stage> — reusable web component for HTML decks.
 *
 * Handles:
 *  (a) speaker notes — reads <script type="application/json" id="speaker-notes">
 *      and posts {slideIndexChanged: N} to the parent window on nav.
 *  (b) keyboard navigation — ←/→, PgUp/PgDn, Space, Home/End, number keys.
 *      On touch devices, tapping the left/right half of the stage goes
 *      prev/next — taps on links, buttons and other interactive slide
 *      content are left alone.
 *  (c) press R to reset to slide 0 (with a tasteful keyboard hint).
 *  (d) bottom-center overlay showing slide count + hints, fades out on idle.
 *  (e) auto-scaling — inner canvas is a fixed design size (default 1920×1080)
 *      scaled with `transform: scale()` to fit the viewport, letterboxed.
 *      Set the `noscale` attribute to render at authored size (1:1) — the
 *      PPTX exporter sets this so its DOM capture sees unscaled geometry.
 *  (f) print — `@media print` lays every slide out as its own page at the
 *      design size, so the browser's Print → Save as PDF produces a clean
 *      one-page-per-slide PDF with no extra setup.
 *  (g) thumbnail rail — resizable left-hand column of per-slide thumbnails
 *      (static clones). Click to navigate; ↑/↓ with a thumbnail focused to
 *      step between slides; drag to reorder; right-click for
 *      Skip / Move up / Move down / Duplicate / Delete (Delete opens a
 *      Cancel/Delete confirm dialog). Drag the rail's right edge to resize;
 *      width persists to
 *      localStorage. Skipped slides carry `data-deck-skip`, are dimmed in
 *      the rail, omitted from prev/next navigation, and hidden at print.
 *      The rail is suppressed in presenting mode, in the host's Preview
 *      mode (ViewerMode='none'), on `noscale`, on narrow viewports
 *      (≤640px), and via the `no-rail` attribute. Rail mutations dispatch
 *      a `dc-op` CustomEvent on the element (see docs/dc-ops.md) and do
 *      NOT touch the DOM: the host applies the op and re-renders;
 *      structural rail input is locked until the host posts
 *      {__dc_op_ack: true, applied}.
 *  (h) typographic defaults — a zero-specificity stylesheet injected into
 *      the document gives headings `text-wrap: balance` and body text
 *      (p, li, blockquote, figcaption) `text-wrap: pretty`, so slides
 *      avoid widowed/orphaned words by default. Any text-wrap declaration
 *      you author on those elements wins over these defaults.
 *
 * Slides are HIDDEN, not unmounted. Non-active slides stay in the DOM with
 * `visibility: hidden` + `opacity: 0`, so their state (videos, iframes,
 * form inputs, React trees) is preserved across navigation.
 *
 * Lifecycle event — the component dispatches a `slidechange` CustomEvent on
 * itself whenever the active slide changes (including the initial mount).
 * The event bubbles and composes out of shadow DOM, so you can listen on
 * the <deck-stage> element or on document:
 *
 *   document.querySelector('deck-stage').addEventListener('slidechange', (e) => {
 *     e.detail.index         // new 0-based index
 *     e.detail.previousIndex // previous index, or -1 on init
 *     e.detail.total         // total slide count
 *     e.detail.slide         // the new active slide element
 *     e.detail.previousSlide // the prior slide element, or null on init
 *     e.detail.reason        // 'init' | 'keyboard' | 'click' | 'tap' | 'api'
 *   });
 *
 * Persistence: none at the deck level. The host app keeps the current slide
 * in its own URL (?slide=) and re-delivers it via location.hash on load, so a
 * bare load with no hash always starts at slide 1.
 *
 * Usage:
 *   <style>deck-stage:not(:defined){visibility:hidden}</style>
 *   <deck-stage width="1920" height="1080">
 *     <section data-label="Title">...</section>
 *     <section data-label="Agenda">...</section>
 *   </deck-stage>
 *   <script src="deck-stage.js"></script>
 *
 * The :not(:defined) rule prevents a flash of the first slide at its
 * authored styles before this script runs and attaches the shadow root.
 *
 * Slides are the direct element children of <deck-stage>. Each slide is
 * automatically tagged with:
 *   - data-screen-label="NN Label"   (1-indexed, for comment flow)
 *   - data-om-validate="no_overflowing_text,no_overlapping_text,slide_sized_text"
 *
 * Speaker notes stay in sync because the component posts {slideIndexChanged: N}
 * to the parent — just include the #speaker-notes script tag if asked for notes.
 *
 * Authoring guidance:
 *   - Write slide bodies as static HTML inside <deck-stage>, with sizing via
 *     CSS custom properties in a <style> block rather than JS constants.
 *     Static slide markup is what lets the user click a heading in edit mode
 *     and retype it directly; a slide rendered through <script type="text/babel">,
 *     React, or a loop over a JS array has to round-trip every tweak through a
 *     chat message instead. Reach for script-generated slides only when the
 *     content genuinely needs interactive behaviour static HTML can't express.
 *   - Do NOT set position/inset/width/height on the slide <section> elements —
 *     the component absolutely positions every slotted child for you.
 *   - Entrance animations: make the visible end-state the base style and
 *     animate *from* hidden, so print and reduced-motion show content.
 *     Gate the animation on [data-deck-active] and the motion query, e.g.
 *     `@media (prefers-reduced-motion:no-preference){ [data-deck-active] .x{animation:fade-in .5s both} }`.
 *     Avoid infinite decorative loops on slide content.
 */
/* END USAGE */

(() => {
  const DESIGN_W_DEFAULT = 1920;
  const DESIGN_H_DEFAULT = 1080;
  const OVERLAY_HIDE_MS = 1800;
  const VALIDATE_ATTR = 'no_overflowing_text,no_overlapping_text,slide_sized_text';
  const FINE_POINTER_MQ = matchMedia('(hover: hover) and (pointer: fine)');
  const NARROW_MQ = matchMedia('(max-width: 640px)');
  // Slide-authored controls that should keep a tap instead of it navigating.
  const INTERACTIVE_SEL = 'a[href], button, input, select, textarea, summary, label, video[controls], audio[controls], [role="button"], [onclick], [tabindex]:not([tabindex^="-"]), [contenteditable]:not([contenteditable="false" i])';
  const pad2 = n => String(n).padStart(2, '0');

  // Label precedence: data-label → data-screen-label (number stripped) → first heading → "Slide".
  const getSlideLabel = el => {
    const explicit = el.getAttribute('data-label');
    if (explicit) return explicit;
    const existing = el.getAttribute('data-screen-label');
    if (existing) return existing.replace(/^\s*\d+\s*/, '').trim() || existing;
    const h = el.querySelector('h1, h2, h3, [data-title]');
    const t = h && (h.textContent || '').trim().slice(0, 40);
    if (t) return t;
    return 'Slide';
  };
  const stylesheet = `
    :host {
      position: fixed;
      inset: 0;
      display: block;
      background: #000;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
    }
    /* connectedCallback holds this until document.fonts.ready (capped 2s) so
     * the first visible paint has the deck's real typography + final rail
     * layout. opacity (not visibility) so the active slide can't un-hide
     * itself via the ::slotted([data-deck-active]) visibility:visible rule.
     * Only the stage/rail hide — the black :host background stays, so the
     * iframe doesn't flash the page's default white. */
    :host([data-fonts-pending]) .stage,
    :host([data-fonts-pending]) .rail { opacity: 0; pointer-events: none; }

    .stage {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .canvas {
      position: relative;
      transform-origin: center center;
      flex-shrink: 0;
      background: #fff;
      will-change: transform;
    }

    /* Slides live in light DOM (via <slot>) so authored CSS still applies.
       We absolutely position each slotted child to stack them. */
    ::slotted(*) {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      box-sizing: border-box !important;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
    }
    ::slotted([data-deck-active]) {
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
    }

    .overlay {
      position: fixed;
      left: 50%;
      bottom: 22px;
      transform: translate(-50%, 6px) scale(0.92);
      filter: blur(6px);
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px;
      background: #000;
      color: #fff;
      border-radius: 999px;
      font-size: 12px;
      font-feature-settings: "tnum" 1;
      letter-spacing: 0.01em;
      opacity: 0;
      pointer-events: none;
      transition: opacity 260ms ease, transform 260ms cubic-bezier(.2,.8,.2,1), filter 260ms ease;
      transform-origin: center bottom;
      z-index: 2147483000;
      user-select: none;
    }
    .overlay[data-visible] {
      opacity: 1;
      pointer-events: auto;
      transform: translate(-50%, 0) scale(1);
      filter: blur(0);
    }

    .btn {
      appearance: none;
      -webkit-appearance: none;
      background: transparent;
      border: 0;
      margin: 0;
      padding: 0;
      color: inherit;
      font: inherit;
      cursor: default;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 28px;
      min-width: 28px;
      border-radius: 999px;
      color: rgba(255,255,255,0.72);
      transition: background 140ms ease, color 140ms ease;
      -webkit-tap-highlight-color: transparent;
    }
    .btn:hover { background: rgba(255,255,255,0.12); color: #fff; }
    .btn:active { background: rgba(255,255,255,0.18); }
    .btn:focus { outline: none; }
    .btn:focus-visible { outline: none; }
    .btn::-moz-focus-inner { border: 0; }
    .btn svg { width: 14px; height: 14px; display: block; }
    .btn.reset {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.02em;
      padding: 0 10px 0 12px;
      gap: 6px;
      color: rgba(255,255,255,0.72);
    }
    .btn.reset .kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
      font-size: 10px;
      line-height: 1;
      color: rgba(255,255,255,0.88);
      background: rgba(255,255,255,0.12);
      border-radius: 4px;
    }

    .count {
      font-variant-numeric: tabular-nums;
      color: #fff;
      font-weight: 500;
      padding: 0 8px;
      min-width: 42px;
      text-align: center;
      font-size: 12px;
    }
    .count .sep { color: rgba(255,255,255,0.45); margin: 0 3px; font-weight: 400; }
    .count .total { color: rgba(255,255,255,0.55); }

    .divider {
      width: 1px;
      height: 14px;
      background: rgba(255,255,255,0.18);
      margin: 0 2px;
    }

    /* ── Thumbnail rail ──────────────────────────────────────────────────
       Fixed column on the left; each thumbnail is a static deep-clone of
       the light-DOM slide scaled into a 16:9 (or design-aspect) frame. The
       stage re-fits around it (see _fit); hidden during present / noscale
       / print so capture geometry and fullscreen output are unchanged. */
    .rail {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      width: var(--deck-rail-w, 188px);
      background: #141414;
      border-right: 1px solid rgba(255,255,255,0.08);
      overflow-y: auto;
      overflow-x: hidden;
      padding: 12px 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 2147482500;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,0.18) transparent;
    }
    .rail::-webkit-scrollbar { width: 8px; }
    .rail::-webkit-scrollbar-track { background: transparent; margin: 2px; }
    .rail::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.18);
      border-radius: 4px;
      border: 2px solid transparent;
      background-clip: content-box;
    }
    .rail::-webkit-scrollbar-thumb:hover {
      background: rgba(255,255,255,0.28);
      border: 2px solid transparent;
      background-clip: content-box;
    }
    :host([no-rail]) .rail,
    :host([noscale]) .rail { display: none; }
    .rail[data-presenting] { display: none; }
    @media (max-width: 640px) {
      .rail, .rail-resize { display: none; }
    }
    /* User-driven show/hide (the TweaksPanel toggle) slides instead of
       popping. Transitions are gated on :host([data-rail-anim]) — set only
       for the 200ms around the toggle — so window-resize and rail-width
       drag (which also call _fit) don't lag behind the cursor. */
    .rail[data-user-hidden] { transform: translateX(-100%); }
    :host([data-rail-anim]) .rail { transition: transform 200ms cubic-bezier(.3,.7,.4,1); }
    :host([data-rail-anim]) .stage { transition: left 200ms cubic-bezier(.3,.7,.4,1); }
    :host([data-rail-anim]) .canvas { transition: transform 200ms cubic-bezier(.3,.7,.4,1); }
    /* transition shorthand replaces rather than merges — repeat the base
       .overlay opacity/transform/filter transitions so visibility changes
       during the 200ms toggle window still fade instead of popping. */
    :host([data-rail-anim]) .overlay {
      transition: margin-left 200ms cubic-bezier(.3,.7,.4,1),
                  opacity 260ms ease,
                  transform 260ms cubic-bezier(.2,.8,.2,1),
                  filter 260ms ease;
    }

    .thumb {
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      cursor: pointer;
      user-select: none;
    }
    .thumb .num {
      width: 16px;
      flex-shrink: 0;
      font-size: 11px;
      font-weight: 500;
      text-align: right;
      color: rgba(255,255,255,0.55);
      padding-top: 2px;
      font-variant-numeric: tabular-nums;
    }
    .thumb .frame {
      position: relative;
      flex: 1;
      min-width: 0;
      aspect-ratio: var(--deck-aspect);
      background: #fff;
      border-radius: 4px;
      outline: 2px solid transparent;
      outline-offset: 0;
      overflow: hidden;
      transition: outline-color 120ms ease;
    }
    .thumb:hover .frame { outline-color: rgba(255,255,255,0.25); }
    .thumb { outline: none; }
    .thumb:focus-visible .frame { outline-color: rgba(255,255,255,0.5); }
    .thumb[data-current] .num { color: #fff; }
    .thumb[data-current] .frame { outline-color: #D97757; }
    .thumb[data-dragging] { opacity: 0.35; }
    .thumb::before {
      content: '';
      position: absolute;
      left: 24px;
      right: 0;
      height: 3px;
      border-radius: 2px;
      background: #D97757;
      opacity: 0;
      pointer-events: none;
    }
    .thumb[data-drop="before"]::before { top: -8px; opacity: 1; }
    .thumb[data-drop="after"]::before { bottom: -8px; opacity: 1; }
    .thumb[data-skip] .frame { opacity: 0.35; }
    .thumb[data-skip] .frame::after {
      content: 'Skipped';
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.45);
      color: #fff;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.04em;
    }

    .ctxmenu {
      position: fixed;
      min-width: 150px;
      padding: 4px;
      background: #242424;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 7px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.45);
      z-index: 2147483100;
      display: none;
      font-size: 12px;
    }
    .ctxmenu[data-open] { display: block; }
    .ctxmenu button {
      display: block;
      width: 100%;
      appearance: none;
      border: 0;
      background: transparent;
      color: #e8e8e8;
      font: inherit;
      text-align: left;
      padding: 6px 10px;
      border-radius: 4px;
      cursor: pointer;
    }
    .ctxmenu button:hover:not(:disabled) { background: rgba(255,255,255,0.08); }
    .ctxmenu button:disabled { opacity: 0.35; cursor: default; }
    .ctxmenu hr {
      border: 0;
      border-top: 1px solid rgba(255,255,255,0.1);
      margin: 4px 2px;
    }

    .rail-resize {
      position: fixed;
      left: calc(var(--deck-rail-w, 188px) - 3px);
      top: 0;
      bottom: 0;
      width: 6px;
      cursor: col-resize;
      z-index: 2147482600;
      touch-action: none;
    }
    .rail-resize:hover,
    .rail-resize[data-dragging] { background: rgba(255,255,255,0.12); }
    :host([no-rail]) .rail-resize,
    :host([noscale]) .rail-resize,
    .rail[data-presenting] + .rail-resize,
    .rail[data-user-hidden] + .rail-resize { display: none; }

    /* Delete-confirm popup — matches the SPA's ConfirmDialog layout
       (title + message body, depressed footer with Cancel / Delete). */
    .confirm-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      z-index: 2147483200;
      display: none;
      align-items: center;
      justify-content: center;
    }
    .confirm-backdrop[data-open] { display: flex; }
    .confirm {
      width: 320px;
      max-width: calc(100vw - 32px);
      background: #2a2a2a;
      color: #e8e8e8;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 12px;
      box-shadow: 0 12px 32px rgba(0,0,0,0.5);
      overflow: hidden;
      font-family: inherit;
      animation: deck-confirm-in 0.18s ease;
    }
    @keyframes deck-confirm-in {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }
    .confirm .body { padding: 20px 20px 16px; }
    .confirm .title { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
    .confirm .msg { font-size: 13px; line-height: 1.5; color: rgba(255,255,255,0.65); }
    .confirm .footer {
      padding: 14px 20px;
      background: #1f1f1f;
      border-top: 1px solid rgba(255,255,255,0.08);
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    .confirm button {
      appearance: none;
      font: inherit;
      font-size: 13px;
      font-weight: 500;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
    }
    .confirm .cancel {
      background: transparent;
      border: 0;
      color: rgba(255,255,255,0.8);
    }
    .confirm .cancel:hover { background: rgba(255,255,255,0.08); }
    .confirm .danger {
      background: #c96442;
      border: 1px solid rgba(0,0,0,0.15);
      color: #fff;
      box-shadow: 0 1px 3px rgba(166,50,68,0.3), 0 2px 6px rgba(166,50,68,0.18);
    }
    .confirm .danger:hover { background: #b5563a; }

    /* ── Print: one page per slide, no chrome ────────────────────────────
       The screen layout stacks every slide at inset:0 inside a scaled
       canvas; for print we want them in document flow at the authored
       design size so the browser paginates one slide per sheet. The
       @page size is set from the width/height attributes via the inline
       <style id="deck-stage-print-page"> that _syncPrintPageRule appends
       to the document (the @page at-rule has no effect inside shadow DOM). */
    @media print {
      :host {
        position: static;
        inset: auto;
        background: none;
        overflow: visible;
        color: inherit;
      }
      .stage { position: static; display: block; }
      .canvas {
        transform: none !important;
        width: auto !important;
        height: auto !important;
        background: none;
        will-change: auto;
      }
      ::slotted(*) {
        position: relative !important;
        inset: auto !important;
        width: var(--deck-design-w) !important;
        height: var(--deck-design-h) !important;
        box-sizing: border-box !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto;
        break-after: page;
        page-break-after: always;
        break-inside: avoid;
        overflow: hidden;
      }
      /* :last-child alone isn't enough once data-deck-skip hides the
         trailing slide(s) — the last *visible* slide still carries
         break-after:page and prints a blank sheet. _markLastVisible()
         maintains data-deck-last-visible on the last non-skipped slide. */
      ::slotted(*:last-child),
      ::slotted([data-deck-last-visible]) {
        break-after: auto;
        page-break-after: auto;
      }
      ::slotted([data-deck-skip]) { display: none !important; }
      .overlay, .rail, .rail-resize, .ctxmenu, .confirm-backdrop { display: none !important; }
    }
  `;
  class DeckStage extends HTMLElement {
    static get observedAttributes() {
      return ['width', 'height', 'noscale', 'no-rail'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._index = 0;
      this._slides = [];
      this._notes = [];
      this._hideTimer = null;
      this._mouseIdleTimer = null;
      this._menuIndex = -1;
      this._onKey = this._onKey.bind(this);
      this._onResize = this._onResize.bind(this);
      this._onSlotChange = this._onSlotChange.bind(this);
      this._onMouseMove = this._onMouseMove.bind(this);
      this._onTap = this._onTap.bind(this);
      this._onMessage = this._onMessage.bind(this);
      // Capture-phase close so a click anywhere dismisses the menu, but
      // ignore clicks that land inside the menu itself — otherwise the
      // capture handler runs before the menu's own (bubble) handler and
      // clears _menuIndex out from under it.
      this._onDocClick = e => {
        if (this._menu && e.composedPath && e.composedPath().includes(this._menu)) return;
        this._closeMenu();
      };
    }
    get designWidth() {
      return parseInt(this.getAttribute('width'), 10) || DESIGN_W_DEFAULT;
    }
    get designHeight() {
      return parseInt(this.getAttribute('height'), 10) || DESIGN_H_DEFAULT;
    }
    connectedCallback() {
      // Presenter-view popup loads deckUrl?_snthumb=...#N for its prev/cur/
      // next thumbnails — the rail has no business rendering inside those
      // (wrong scale, and it offsets the stage so the thumb shows a gutter).
      if (/[?&]_snthumb=/.test(location.search)) this.setAttribute('no-rail', '');
      this._render();
      this._loadNotes();
      this._syncPrintPageRule();
      this._ensureTextWrapDefaults();
      window.addEventListener('keydown', this._onKey);
      window.addEventListener('resize', this._onResize);
      window.addEventListener('mousemove', this._onMouseMove, {
        passive: true
      });
      window.addEventListener('message', this._onMessage);
      window.addEventListener('click', this._onDocClick, true);
      this.addEventListener('click', this._onTap);
      // Print lays every slide out as its own page, so [data-deck-active]-
      // gated entrance styles need the attribute on every slide (not just
      // the current one) or their content prints at the hidden base style.
      // The transient freeze style lands BEFORE the attributes so any
      // attribute-keyed transition fires at 0s (changing transition-
      // duration after a transition has started doesn't affect it).
      this._onBeforePrint = () => {
        this._syncPrintPageRule();
        if (this._freezeStyle) this._freezeStyle.remove();
        this._freezeStyle = document.createElement('style');
        this._freezeStyle.textContent = '*,*::before,*::after{transition-duration:0s !important}';
        document.head.appendChild(this._freezeStyle);
        this._slides.forEach(s => s.setAttribute('data-deck-active', ''));
      };
      this._onAfterPrint = () => {
        this._applyIndex({
          showOverlay: false,
          broadcast: false
        });
        if (this._freezeStyle) {
          this._freezeStyle.remove();
          this._freezeStyle = null;
        }
      };
      window.addEventListener('beforeprint', this._onBeforePrint);
      window.addEventListener('afterprint', this._onAfterPrint);
      // Initial collection + layout happens via slotchange, which fires on mount.
      this._enableRail();
      // Hold the stage hidden until webfonts are ready so the first visible
      // paint has the deck's real typography — the :not(:defined) guard in
      // the page HTML only covers custom-element upgrade, not font load.
      // Capped so a 404'd font URL can't blank the deck indefinitely.
      this.setAttribute('data-fonts-pending', '');
      const reveal = () => this.removeAttribute('data-fonts-pending');
      // Unconditional cap — rAF can be suspended in a hidden iframe, which
      // would strand the one inside the rAF callback.
      setTimeout(reveal, 2000);
      // rAF first: fonts.ready is a pre-resolved promise until layout has
      // resolved the slotted text's font-family and pushed a FontFace into
      // 'loading'. Reading it here in connectedCallback (parse-time) would
      // settle the race in a microtask before any font fetch starts.
      requestAnimationFrame(() => {
        Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise(r => setTimeout(r, 2000))]).then(reveal, reveal);
      });
    }
    _enableRail() {
      // Idempotent — older host builds still post __omelette_rail_enabled.
      // no-rail guard keeps the observers/stylesheet walk off the cheap path
      // for presenter-popup thumbnail iframes (up to 9 per view).
      if (this._railEnabled || this.hasAttribute('no-rail')) return;
      this._railEnabled = true;
      // Per-viewer preference — restored alongside rail width. Default on;
      // only a stored '0' (from the TweaksPanel toggle) hides it.
      this._railVisible = true;
      try {
        if (localStorage.getItem('deck-stage.railVisible') === '0') this._railVisible = false;
      } catch (e) {}
      // Live thumbnail updates: watch the light-DOM slides for content
      // edits and re-clone just the affected thumb(s), debounced. Ignore
      // the data-deck-* / data-screen-label / data-om-validate attributes
      // this component itself writes so nav doesn't trigger spurious
      // refreshes — except data-deck-skip, which now arrives from the host
      // re-render and is what updates the rail badge, print bookkeeping,
      // and deckSkipped re-broadcast.
      const OWN_ATTRS = /^data-(deck-(?!skip$)|screen-label$|om-validate$)/;
      this._liveDirty = new Set();
      this._liveObserver = new MutationObserver(records => {
        for (const r of records) {
          if (r.type === 'attributes' && OWN_ATTRS.test(r.attributeName || '')) continue;
          let n = r.target;
          while (n && n.parentElement !== this) n = n.parentElement;
          // Skip/unskip is handled below without re-cloning (the badge sits
          // on the thumb wrapper, not the clone) — don't mark the slide
          // dirty for an attr change whose only visible effect is the badge.
          if (n && this._slideSet && this._slideSet.has(n) && !(r.type === 'attributes' && r.attributeName === 'data-deck-skip')) {
            this._liveDirty.add(n);
          }
          // Host-driven skip toggle: sync the rail badge + print + presenter
          // skipped-list the way _toggleSkip used to do locally.
          if (r.type === 'attributes' && r.attributeName === 'data-deck-skip' && n && this._slideSet && this._slideSet.has(n)) {
            const i = this._slides.indexOf(n);
            if (this._thumbs && this._thumbs[i]) {
              if (n.hasAttribute('data-deck-skip')) this._thumbs[i].thumb.setAttribute('data-skip', '');else this._thumbs[i].thumb.removeAttribute('data-skip');
            }
            this._markLastVisible();
            try {
              window.postMessage({
                slideIndexChanged: this._index,
                deckTotal: this._slides.length,
                deckSkipped: this._skippedIndices()
              }, '*');
            } catch (e) {}
          }
        }
        if (this._liveDirty.size && !this._liveTimer) {
          this._liveTimer = setTimeout(() => {
            this._liveTimer = null;
            this._liveDirty.forEach(s => this._refreshThumb(s));
            this._liveDirty.clear();
          }, 200);
        }
      });
      this._liveObserver.observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
      // Lazy thumbnail materialization — clone the slide only when its
      // frame scrolls into (or near) the rail viewport. rootMargin gives
      // ~4 thumbs of pre-load so fast scrolling doesn't flash blanks.
      this._railObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting && e.target.__deckThumb) {
            this._materialize(e.target.__deckThumb);
          }
        });
      }, {
        root: this._rail,
        rootMargin: '400px 0px'
      });
      // Tweaks typically change CSS vars / attrs OUTSIDE <deck-stage>
      // (on <html>, <body>, a wrapper div, or a <style> tag), which
      // _liveObserver can't see. Re-snapshot author CSS (constructable
      // sheet is shared by reference, so one replaceSync updates every
      // thumb shadow root) and re-sync each thumb host's attrs + custom
      // properties. In-slide DOM mutations are _liveObserver's job.
      // Debounced so slider drags don't thrash.
      this._onTweakChange = () => {
        clearTimeout(this._tweakTimer);
        this._tweakTimer = setTimeout(() => {
          this._snapshotAuthorCss();
          // One getComputedStyle for the whole batch — each
          // getPropertyValue read below reuses the same computed style
          // as long as nothing invalidates layout between thumbs.
          const cs = getComputedStyle(this);
          (this._thumbs || []).forEach(t => {
            if (t.host) this._syncThumbHostAttrs(t.host, cs);
          });
        }, 120);
      };
      window.addEventListener('tweakchange', this._onTweakChange);
      this._snapshotAuthorCss();
      // Re-snapshot once any still-loading stylesheet settles — it throws on
      // .cssRules above and silently contributes '' → unstyled thumbs on a
      // cold mount. {once:true}; routed through the debounced handler.
      document.querySelectorAll('link[rel~="stylesheet"]').forEach(l => {
        try {
          if (l.sheet && l.sheet.cssRules) return;
        } catch (e) {}
        l.addEventListener('load', this._onTweakChange, {
          once: true
        });
        l.addEventListener('error', this._onTweakChange, {
          once: true
        });
      });
      if (document.fonts) document.fonts.ready.then(this._onTweakChange, this._onTweakChange);
      // Build the rail now that it's enabled — slotchange already fired,
      // so _renderRail's early-return skipped the initial build.
      this._syncRailHidden();
      this._renderRail();
      this._fit();
    }

    /** Snapshot document stylesheets into a constructable sheet that each
     *  thumbnail's nested shadow root adopts — so author CSS styles the
     *  cloned slide content without touching this component's chrome.
     *  Cross-origin sheets throw on .cssRules — skip them. Re-callable:
     *  the existing constructable sheet is reused via replaceSync so every
     *  already-adopted shadow root picks up the fresh CSS without re-adopt. */
    _snapshotAuthorCss() {
      // :root in an adopted sheet inside a shadow root matches nothing
      // (only the document root qualifies), so author rules like
      // `:root[data-voice="modern"] .serif` never reach the clones.
      // Rewrite :root → :host and mirror <html>'s data-*/class/lang onto
      // each thumb host (see _syncThumbHostAttrs) so the same selectors
      // match inside the thumbnail's shadow tree.
      const authorCss = Array.from(document.styleSheets).map(sh => {
        try {
          return Array.from(sh.cssRules).map(r => r.cssText).join('\n');
        } catch (e) {
          return '';
        }
      }).join('\n')
      // The shadow host is featureless outside the functional :host(...)
      // form, so any compound on :root — [attr], .class, #id, :pseudo —
      // must become :host(<compound>) not :host<compound>. Same for the
      // html type selector (Tailwind class-strategy dark mode emits
      // html.dark; Pico uses html[data-theme]), which has nothing to
      // match inside the thumb's shadow tree.
      .replace(/:root((?:\[[^\]]*\]|[.#][-\w]+|:[-\w]+(?:\([^)]*\))?)+)/g, ':host($1)').replace(/:root\b/g, ':host').replace(/(^|[\s,>~+(}])html((?:\[[^\]]*\]|[.#][-\w]+|:[-\w]+(?:\([^)]*\))?)+)(?![-\w])/g, '$1:host($2)').replace(/(^|[\s,>~+(}])html(?![-\w])/g, '$1:host');
      // Every custom property the author references. _syncThumbHostAttrs
      // mirrors each one's *computed* value at <deck-stage> onto the
      // thumb host so the live value wins over the :host default above
      // regardless of which ancestor the tweak wrote to (<html>, <body>,
      // a wrapper div, or the deck-stage element itself all inherit
      // down to getComputedStyle(this)).
      this._authorVars = new Set(authorCss.match(/--[\w-]+/g) || []);
      try {
        if (!this._adoptedSheet) this._adoptedSheet = new CSSStyleSheet();
        this._adoptedSheet.replaceSync(authorCss);
      } catch (e) {
        this._adoptedSheet = null;
        this._authorCss = authorCss;
      }
    }
    _syncThumbHostAttrs(host, cs) {
      const de = document.documentElement;
      // setAttribute overwrites but can't delete — an attr removed from
      // <html> (toggleAttribute off, classList emptied) would linger on
      // the host and :host([data-*]) / :host(.foo) rules would keep
      // matching. Remove stale mirrored attrs first; iterate backward
      // because removeAttribute mutates the live NamedNodeMap.
      for (let i = host.attributes.length - 1; i >= 0; i--) {
        const n = host.attributes[i].name;
        if ((n.startsWith('data-') || n === 'class' || n === 'lang') && !de.hasAttribute(n)) {
          host.removeAttribute(n);
        }
      }
      for (const a of de.attributes) {
        if (a.name.startsWith('data-') || a.name === 'class' || a.name === 'lang') {
          host.setAttribute(a.name, a.value);
        }
      }
      // The :root→:host rewrite in _snapshotAuthorCss pins each custom
      // property to its stylesheet default on the thumb host, shadowing
      // the live value that would otherwise inherit. Tweaks can write the
      // live value on any ancestor — <html>, <body>, a wrapper div, the
      // deck-stage element — so read it as the *computed* value at
      // <deck-stage> (which sees the whole inheritance chain) rather than
      // trying to guess which element the author wrote to. Inline on the
      // host beats the :host{} rule. remove-stale covers vars dropped
      // from the stylesheet between snapshots.
      const vars = this._authorVars || new Set();
      for (let i = host.style.length - 1; i >= 0; i--) {
        const p = host.style[i];
        if (p.startsWith('--') && !vars.has(p)) host.style.removeProperty(p);
      }
      const live = cs || getComputedStyle(this);
      vars.forEach(p => {
        const v = live.getPropertyValue(p);
        if (v) host.style.setProperty(p, v.trim());else host.style.removeProperty(p);
      });
    }
    disconnectedCallback() {
      window.removeEventListener('keydown', this._onKey);
      window.removeEventListener('resize', this._onResize);
      window.removeEventListener('mousemove', this._onMouseMove);
      window.removeEventListener('message', this._onMessage);
      window.removeEventListener('click', this._onDocClick, true);
      window.removeEventListener('beforeprint', this._onBeforePrint);
      window.removeEventListener('afterprint', this._onAfterPrint);
      if (this._freezeStyle) {
        this._freezeStyle.remove();
        this._freezeStyle = null;
      }
      this.removeEventListener('click', this._onTap);
      if (this._hideTimer) clearTimeout(this._hideTimer);
      if (this._mouseIdleTimer) clearTimeout(this._mouseIdleTimer);
      if (this._liveTimer) clearTimeout(this._liveTimer);
      if (this._tweakTimer) clearTimeout(this._tweakTimer);
      if (this._railAnimTimer) clearTimeout(this._railAnimTimer);
      if (this._scaleRaf) cancelAnimationFrame(this._scaleRaf);
      if (this._liveObserver) this._liveObserver.disconnect();
      if (this._railObserver) this._railObserver.disconnect();
      if (this._onTweakChange) window.removeEventListener('tweakchange', this._onTweakChange);
      // Drop the text-wrap defaults when the last deck-stage leaves, so a
      // deleted deck's typography can't restyle whatever replaces it.
      // (#deck-stage-print-page keeps its existing keep-forever lifecycle.)
      if (!document.querySelector('deck-stage')) {
        const tw = document.getElementById('deck-stage-text-wrap');
        if (tw) tw.remove();
      }
    }
    attributeChangedCallback() {
      if (this._canvas) {
        this._canvas.style.width = this.designWidth + 'px';
        this._canvas.style.height = this.designHeight + 'px';
        this._canvas.style.setProperty('--deck-design-w', this.designWidth + 'px');
        this._canvas.style.setProperty('--deck-design-h', this.designHeight + 'px');
        if (this._rail) {
          this._rail.style.setProperty('--deck-aspect', this.designWidth + '/' + this.designHeight);
        }
        this._fit();
        this._scaleThumbs();
        this._syncPrintPageRule();
      }
    }
    _render() {
      const style = document.createElement('style');
      style.textContent = stylesheet;
      const stage = document.createElement('div');
      stage.className = 'stage';
      const canvas = document.createElement('div');
      canvas.className = 'canvas';
      canvas.style.width = this.designWidth + 'px';
      canvas.style.height = this.designHeight + 'px';
      canvas.style.setProperty('--deck-design-w', this.designWidth + 'px');
      canvas.style.setProperty('--deck-design-h', this.designHeight + 'px');
      const slot = document.createElement('slot');
      slot.addEventListener('slotchange', this._onSlotChange);
      canvas.appendChild(slot);
      stage.appendChild(canvas);

      // Overlay: compact, solid black, with clickable controls.
      const overlay = document.createElement('div');
      overlay.className = 'overlay export-hidden';
      overlay.setAttribute('role', 'toolbar');
      overlay.setAttribute('aria-label', 'Deck controls');
      overlay.setAttribute('data-omelette-chrome', '');
      overlay.innerHTML = `
        <button class="btn prev" type="button" aria-label="Previous slide" title="Previous (←)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg>
        </button>
        <span class="count" aria-live="polite"><span class="current">1</span><span class="sep">/</span><span class="total">1</span></span>
        <button class="btn next" type="button" aria-label="Next slide" title="Next (→)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>
        </button>
        <span class="divider"></span>
        <button class="btn reset" type="button" aria-label="Reset to first slide" title="Reset (R)">Reset<span class="kbd">R</span></button>
      `;
      overlay.querySelector('.prev').addEventListener('click', () => this._advance(-1, 'click'));
      overlay.querySelector('.next').addEventListener('click', () => this._advance(1, 'click'));
      overlay.querySelector('.reset').addEventListener('click', () => this._go(0, 'click'));

      // Thumbnail rail + context menu. Thumbnails are populated in
      // _renderRail() after _collectSlides().
      const rail = document.createElement('div');
      rail.className = 'rail export-hidden';
      rail.setAttribute('data-omelette-chrome', '');
      // Edit mode hooks wheel to pan the canvas; this opts the rail's own
      // scrollview out so thumbnails stay scrollable while editing.
      rail.setAttribute('data-dc-wheel-passthru', '');
      rail.style.setProperty('--deck-aspect', this.designWidth + '/' + this.designHeight);
      // Edge auto-scroll while dragging a thumb near the rail's top/bottom
      // so off-screen drop targets are reachable. Native dragover fires
      // continuously while the pointer is stationary, so a per-event nudge
      // (ramped by edge proximity) is enough — no rAF loop needed.
      rail.addEventListener('dragover', e => {
        if (this._dragFrom == null) return;
        const r = rail.getBoundingClientRect();
        const EDGE = 40;
        const dt = e.clientY - r.top;
        const db = r.bottom - e.clientY;
        if (dt < EDGE) rail.scrollTop -= Math.ceil((EDGE - dt) / 3);else if (db < EDGE) rail.scrollTop += Math.ceil((EDGE - db) / 3);
      });
      const menu = document.createElement('div');
      menu.className = 'ctxmenu export-hidden';
      menu.setAttribute('data-omelette-chrome', '');
      menu.innerHTML = `
        <button type="button" data-act="skip">Skip slide</button>
        <button type="button" data-act="up">Move up</button>
        <button type="button" data-act="down">Move down</button>
        <button type="button" data-act="duplicate">Duplicate slide</button>
        <hr>
        <button type="button" data-act="delete">Delete slide</button>
      `;
      menu.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        const i = this._menuIndex;
        this._closeMenu();
        if (act === 'skip') this._toggleSkip(i);else if (act === 'up') this._moveSlide(i, i - 1);else if (act === 'down') this._moveSlide(i, i + 1);else if (act === 'duplicate') this._duplicateSlide(i);else if (act === 'delete') this._openConfirm(i);
      });
      menu.addEventListener('contextmenu', e => e.preventDefault());

      // Rail resize handle — drag to set --deck-rail-w, persisted to
      // localStorage so the width survives reloads.
      const resize = document.createElement('div');
      resize.className = 'rail-resize export-hidden';
      resize.setAttribute('data-omelette-chrome', '');
      resize.addEventListener('pointerdown', e => {
        e.preventDefault();
        resize.setPointerCapture(e.pointerId);
        resize.setAttribute('data-dragging', '');
        const move = ev => this._setRailWidth(ev.clientX);
        const up = () => {
          resize.removeEventListener('pointermove', move);
          resize.removeEventListener('pointerup', up);
          resize.removeEventListener('pointercancel', up);
          resize.removeAttribute('data-dragging');
          try {
            localStorage.setItem('deck-stage.railWidth', String(this._railPx));
          } catch (err) {}
        };
        resize.addEventListener('pointermove', move);
        resize.addEventListener('pointerup', up);
        resize.addEventListener('pointercancel', up);
      });

      // Delete-confirm dialog — mirrors the SPA's ConfirmDialog layout.
      const confirm = document.createElement('div');
      confirm.className = 'confirm-backdrop export-hidden';
      confirm.setAttribute('data-omelette-chrome', '');
      confirm.innerHTML = `
        <div class="confirm" role="dialog" aria-modal="true">
          <div class="body">
            <div class="title">Delete slide?</div>
            <div class="msg">This slide will be removed from the deck.</div>
          </div>
          <div class="footer">
            <button type="button" class="cancel">Cancel</button>
            <button type="button" class="danger">Delete</button>
          </div>
        </div>
      `;
      confirm.addEventListener('click', e => {
        if (e.target === confirm) this._closeConfirm();
      });
      confirm.querySelector('.cancel').addEventListener('click', () => this._closeConfirm());
      confirm.querySelector('.danger').addEventListener('click', () => {
        const i = this._confirmIndex;
        this._closeConfirm();
        this._deleteSlide(i);
      });
      this._root.append(style, rail, resize, stage, overlay, menu, confirm);
      this._canvas = canvas;
      this._stage = stage;
      this._slot = slot;
      this._overlay = overlay;
      this._rail = rail;
      this._resize = resize;
      this._menu = menu;
      this._confirm = confirm;
      this._countEl = overlay.querySelector('.current');
      this._totalEl = overlay.querySelector('.total');

      // Restore persisted rail width.
      let rw = 188;
      try {
        const s = localStorage.getItem('deck-stage.railWidth');
        if (s) rw = parseInt(s, 10) || rw;
      } catch (err) {}
      this._setRailWidth(rw);
      this._syncRailHidden();
    }
    _setRailWidth(px) {
      const w = Math.max(120, Math.min(360, Math.round(px)));
      this._railPx = w;
      this.style.setProperty('--deck-rail-w', w + 'px');
      this._fit();
      // _scaleThumbs forces a sync layout (frame.offsetWidth) then writes
      // N transforms. During a resize drag this runs per-pointermove;
      // coalesce to one per frame.
      if (!this._scaleRaf) {
        this._scaleRaf = requestAnimationFrame(() => {
          this._scaleRaf = null;
          this._scaleThumbs();
        });
      }
    }

    /** @page must live in the document stylesheet — it's a no-op inside
     *  shadow DOM. (Re-)append so any author @page landing later in
     *  source order can't reintroduce a margin and push each slide onto
     *  two sheets; called again from beforeprint. */
    _syncPrintPageRule() {
      const id = 'deck-stage-print-page';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
      }
      (document.body || document.head).appendChild(tag);
      tag.textContent = '@page { size: ' + this.designWidth + 'px ' + this.designHeight + 'px; margin: 0; } ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; overflow: visible !important; height: auto !important; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; } ' +
      // Jump authored animations/transitions to their end state so print
      // never captures mid-entrance — pairs with the beforeprint handler
      // in connectedCallback that sets data-deck-active on every slide.
      '*, *::before, *::after { animation-delay: -99s !important; animation-duration: .001s !important; ' + 'animation-iteration-count: 1 !important; animation-fill-mode: both !important; ' + 'animation-play-state: running !important; transition-duration: 0s !important; } }';
    }

    /** Typographic defaults for slide text: balance headings, avoid
     *  widowed/orphaned words in body copy (browsers without text-wrap
     *  support drop the declarations). Zero-specificity via :where() so
     *  any text-wrap authored on those elements wins. Lives in the document,
     *  not the shadow root, for two reasons: document rules reach the
     *  slotted (light DOM) slides, and _snapshotAuthorCss copies document
     *  stylesheets into each thumbnail's shadow root, so the thumbs wrap
     *  the same way — a deck-stage-scoped selector would match nothing
     *  there. data-omelette-injected marks the tag for the host editor
     *  to strip at serialize, so it is never written back as authored
     *  source. */
    _ensureTextWrapDefaults() {
      if (document.getElementById('deck-stage-text-wrap')) return;
      const tag = document.createElement('style');
      tag.id = 'deck-stage-text-wrap';
      tag.setAttribute('data-omelette-injected', '');
      tag.textContent = ':where(h1,h2,h3,h4,h5,h6){text-wrap:balance}' + ':where(p,li,blockquote,figcaption){text-wrap:pretty}';
      document.head.appendChild(tag);
    }
    _onSlotChange() {
      // Self-mutate path already reconciled synchronously and emitted
      // slidechange; skip the async slotchange it caused.
      if (this._squelchSlotChange) {
        this._squelchSlotChange = false;
        return;
      }
      // Primary lock-clear is the host's __deck_rail_ack; this clears on a
      // dropped ack so the rail can't stay dead.
      this._railLock = false;
      this._collectSlides();
      this._restoreIndex();
      this._applyIndex({
        showOverlay: false,
        broadcast: true,
        reason: 'init'
      });
      this._fit();
    }
    _collectSlides() {
      const assigned = this._slot.assignedElements({
        flatten: true
      });
      this._slides = assigned.filter(el => {
        // Skip template/style/script nodes even if someone slots them.
        const tag = el.tagName;
        return tag !== 'TEMPLATE' && tag !== 'SCRIPT' && tag !== 'STYLE';
      });
      this._slideSet = new Set(this._slides);
      this._slides.forEach((slide, i) => {
        const n = i + 1;
        slide.setAttribute('data-screen-label', `${pad2(n)} ${getSlideLabel(slide)}`);

        // Validation attribute for comment flow / auto-checks.
        if (!slide.hasAttribute('data-om-validate')) {
          slide.setAttribute('data-om-validate', VALIDATE_ATTR);
        }
        slide.setAttribute('data-deck-slide', String(i));
      });
      if (this._totalEl) this._totalEl.textContent = String(this._slides.length || 1);
      if (this._index >= this._slides.length) this._index = Math.max(0, this._slides.length - 1);
      this._markLastVisible();
      this._renderRail();
    }

    /** Tag the last non-skipped slide so print CSS can drop its
     *  break-after (see the @media print comment above — :last-child
     *  alone matches a hidden skipped slide). */
    _markLastVisible() {
      let last = null;
      this._slides.forEach(s => {
        s.removeAttribute('data-deck-last-visible');
        if (!s.hasAttribute('data-deck-skip')) last = s;
      });
      if (last) last.setAttribute('data-deck-last-visible', '');
    }
    _loadNotes() {
      // Per-slide data-speaker-notes is authoritative when present (attrs
      // travel with the element on reorder/dup/delete); a slide without
      // the attr falls through to the legacy #speaker-notes JSON array
      // PER SLIDE so a single attr on a JSON-authored deck doesn't blank
      // the rest.
      const tag = document.getElementById('speaker-notes');
      let json = null;
      if (tag) try {
        const p = JSON.parse(tag.textContent || '[]');
        if (Array.isArray(p)) json = p;
      } catch (e) {
        console.warn('[deck-stage] Failed to parse #speaker-notes JSON:', e);
      }
      this._notes = this._slides.map((s, i) => {
        const a = s.getAttribute('data-speaker-notes');
        return a !== null ? a : json && typeof json[i] === 'string' ? json[i] : '';
      });
    }
    _restoreIndex() {
      // The host's ?slide= param is delivered as a #<int> hash (1-indexed) on
      // the iframe src. No hash → slide 1; the deck itself keeps no position
      // state across loads.
      const h = (location.hash || '').match(/^#(\d+)$/);
      if (h) {
        const n = parseInt(h[1], 10) - 1;
        if (n >= 0 && n < this._slides.length) this._index = n;
      }
    }
    _applyIndex({
      showOverlay = true,
      broadcast = true,
      reason = 'init'
    } = {}) {
      if (!this._slides.length) return;
      const prev = this._prevIndex == null ? -1 : this._prevIndex;
      const curr = this._index;
      // Keep the iframe's own hash in sync so an in-iframe location.reload()
      // (reload banner path in viewer-handle.ts) lands on the current slide,
      // not the stale deep-link hash from initial load.
      try {
        history.replaceState(null, '', '#' + (curr + 1));
      } catch (e) {}
      this._slides.forEach((s, i) => {
        if (i === curr) s.setAttribute('data-deck-active', '');else s.removeAttribute('data-deck-active');
      });
      if (this._countEl) this._countEl.textContent = String(curr + 1);
      // Follow-scroll on every navigation (init deep-link, keyboard, click,
      // tap, external goTo) — the only time we *don't* want the rail to
      // track current is after a rail-internal mutation, where _renderRail
      // has already restored the user's scroll position and yanking back to
      // current would undo it.
      this._syncRail(reason !== 'mutation');
      if (broadcast) {
        // (1) Legacy: host-window postMessage for speaker-notes renderers.
        try {
          window.postMessage({
            slideIndexChanged: curr,
            deckTotal: this._slides.length,
            deckSkipped: this._skippedIndices()
          }, '*');
        } catch (e) {}

        // (2) In-page CustomEvent on the <deck-stage> element itself.
        //     Bubbles and composes out of shadow DOM so slide code can listen:
        //       document.querySelector('deck-stage').addEventListener('slidechange', e => {
        //         e.detail.index, e.detail.previousIndex, e.detail.total, e.detail.slide, e.detail.reason
        //       });
        const detail = {
          index: curr,
          previousIndex: prev,
          total: this._slides.length,
          slide: this._slides[curr] || null,
          previousSlide: prev >= 0 ? this._slides[prev] || null : null,
          reason: reason // 'init' | 'keyboard' | 'click' | 'tap' | 'api'
        };
        this.dispatchEvent(new CustomEvent('slidechange', {
          detail,
          bubbles: true,
          composed: true
        }));
      }
      this._prevIndex = curr;
      if (showOverlay) this._flashOverlay();
    }
    _flashOverlay() {
      // Host posts __omelette_presenting while in fullscreen/tab presentation
      // mode — suppress the nav footer entirely (both hover and slide-change
      // flash) so the audience sees clean slides.
      if (!this._overlay || this._presenting) return;
      this._overlay.setAttribute('data-visible', '');
      if (this._hideTimer) clearTimeout(this._hideTimer);
      this._hideTimer = setTimeout(() => {
        this._overlay.removeAttribute('data-visible');
      }, OVERLAY_HIDE_MS);
    }
    _railWidth() {
      // State-based, no offsetWidth: the first _fit() can run before the
      // rail has had layout on some load paths, and a 0 there paints the
      // slide full-width for one frame before the post-slotchange _fit()
      // corrects it.
      if (!this._railEnabled || !this._railVisible || this.hasAttribute('no-rail') || this.hasAttribute('noscale') || this._presenting || this._previewMode || NARROW_MQ.matches) return 0;
      return this._railPx || 0;
    }
    _fit() {
      if (!this._canvas) return;
      const stage = this._canvas.parentElement;
      // PPTX export sets noscale so the DOM capture sees authored-size
      // geometry — the scaled canvas is in shadow DOM, so the exporter's
      // resetTransformSelector can't reach .canvas.style.transform directly.
      if (this.hasAttribute('noscale')) {
        this._canvas.style.transform = 'none';
        if (stage) stage.style.left = '0';
        if (this._overlay) this._overlay.style.marginLeft = '0';
        return;
      }
      const rw = this._railWidth();
      if (stage) stage.style.left = rw + 'px';
      // Overlay is centred on the viewport via left:50% + translate(-50%);
      // marginLeft shifts the centre by rw/2 so it lands in the middle of
      // the [rw, innerWidth] stage region.
      if (this._overlay) this._overlay.style.marginLeft = rw / 2 + 'px';
      const vw = window.innerWidth - rw;
      const vh = window.innerHeight;
      const s = Math.min(vw / this.designWidth, vh / this.designHeight);
      this._canvas.style.transform = `scale(${s})`;
    }
    _onResize() {
      this._fit();
      // Crossing the narrow-viewport breakpoint reveals the rail — rerun the
      // thumbnail scale the same way _setRailWidth does.
      if (!this._scaleRaf) {
        this._scaleRaf = requestAnimationFrame(() => {
          this._scaleRaf = null;
          this._scaleThumbs();
        });
      }
    }
    _onMouseMove() {
      // Keep overlay visible while mouse moves; hide after idle.
      this._flashOverlay();
    }
    _onMessage(e) {
      const d = e.data;
      if (d && typeof d.__omelette_presenting === 'boolean') {
        this._presenting = d.__omelette_presenting;
        if (this._presenting && this._overlay) {
          this._overlay.removeAttribute('data-visible');
          if (this._hideTimer) clearTimeout(this._hideTimer);
        }
        this._syncRailHidden();
        this._closeMenu();
        this._closeConfirm();
        this._fit();
        this._scaleThumbs();
      }
      // Host's Preview segment (ViewerMode='none'): the rail's drag-reorder /
      // right-click skip-delete affordances are editing chrome, so hide it
      // while the user is just looking at the deck. Same hard-hide path as
      // presenting; independent of the user's _railVisible preference so
      // returning to Edit restores whatever they had.
      if (d && typeof d.__omelette_preview_mode === 'boolean') {
        if (d.__omelette_preview_mode === this._previewMode) return;
        this._previewMode = d.__omelette_preview_mode;
        this._syncRailHidden();
        this._closeMenu();
        this._closeConfirm();
        this._fit();
        this._scaleThumbs();
      }
      // Host has processed a dc-op; rail input is safe again. Not tied to
      // slotchange — setAttr and refusal don't fire one. On refusal,
      // revert the optimistic _index/hash adjustment so the next nav
      // starts from what's actually on screen.
      if (d && d.__dc_op_ack) {
        this._railLock = false;
        if (d.applied === false && this._indexBeforeEmit != null) {
          this._index = this._indexBeforeEmit;
          try {
            history.replaceState(null, '', '#' + (this._index + 1));
          } catch (e) {}
        }
        this._indexBeforeEmit = null;
      }
      // Per-viewer show/hide, driven by the TweaksPanel's auto-injected
      // "Thumbnail rail" toggle (or any author script). Independent of
      // whether the Tweaks panel itself is open — closing the panel
      // doesn't change rail visibility. Persists alongside rail width.
      if (d && d.type === '__deck_rail_visible' && typeof d.on === 'boolean') {
        if (d.on === this._railVisible) return;
        this._railVisible = d.on;
        try {
          localStorage.setItem('deck-stage.railVisible', d.on ? '1' : '0');
        } catch (e) {}
        // Arm the transition, commit it, then flip state — otherwise the
        // browser coalesces both writes and nothing animates on show.
        this.setAttribute('data-rail-anim', '');
        void (this._rail && this._rail.offsetHeight);
        this._syncRailHidden();
        this._fit();
        this._scaleThumbs();
        clearTimeout(this._railAnimTimer);
        this._railAnimTimer = setTimeout(() => this.removeAttribute('data-rail-anim'), 220);
      }
      if (d && d.type === '__omelette_rail_enabled') this._enableRail();
    }
    _syncRailHidden() {
      if (!this._rail) return;
      // data-presenting is the hard hide (display:none) for flag-off,
      // presentation mode, and the host's Preview segment — instant, no
      // transition. data-user-hidden is the soft hide (translateX(-100%))
      // for the viewer's rail toggle, so show/hide slides under
      // :host([data-rail-anim]).
      const hard = !this._railEnabled || this._presenting || this._previewMode;
      if (hard) this._rail.setAttribute('data-presenting', '');else this._rail.removeAttribute('data-presenting');
      if (!this._railVisible) this._rail.setAttribute('data-user-hidden', '');else this._rail.removeAttribute('data-user-hidden');
      // translateX hide leaves thumbs (tabIndex=0) in the tab order —
      // inert keeps them unfocusable while the rail is off-screen.
      this._rail.inert = hard || !this._railVisible;
    }
    _onTap(e) {
      // Touch-only — keyboard + the overlay toolbar cover nav on desktop.
      if (FINE_POINTER_MQ.matches) return;
      // Only taps that land on the stage (slide content or letterbox); the
      // overlay / rail / menus are siblings with their own click handlers.
      const path = e.composedPath();
      if (!this._stage || !path.includes(this._stage)) return;
      // Let interactive slide content keep the tap. composedPath (not
      // e.target.closest) so we see through open shadow roots — a <button>
      // inside a slide-authored custom element retargets e.target to the
      // host but still appears in the composed path.
      if (e.defaultPrevented) return;
      for (const n of path) {
        if (n === this._stage) break;
        if (n.matches && n.matches(INTERACTIVE_SEL)) return;
      }
      e.preventDefault();
      const rw = this._railWidth();
      const mid = rw + (window.innerWidth - rw) / 2;
      this._advance(e.clientX < mid ? -1 : 1, 'tap');
    }
    _onKey(e) {
      // Ignore when the user is typing.
      const t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      // Confirm dialog swallows nav keys while open; Escape cancels. Enter
      // is left to the focused button's native activation so Tab→Cancel
      // →Enter activates Cancel, not the window-level confirm path.
      if (this._confirm && this._confirm.hasAttribute('data-open')) {
        if (e.key === 'Escape') {
          this._closeConfirm();
          e.preventDefault();
        }
        return;
      }
      if (e.key === 'Escape' && this._menu && this._menu.hasAttribute('data-open')) {
        this._closeMenu();
        e.preventDefault();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key;
      let handled = true;
      if (key === 'ArrowRight' || key === 'PageDown' || key === ' ' || key === 'Spacebar') {
        this._advance(1, 'keyboard');
      } else if (key === 'ArrowLeft' || key === 'PageUp') {
        this._advance(-1, 'keyboard');
      } else if (key === 'Home') {
        this._go(0, 'keyboard');
      } else if (key === 'End') {
        this._go(this._slides.length - 1, 'keyboard');
      } else if (key === 'r' || key === 'R') {
        this._go(0, 'keyboard');
      } else if (/^[0-9]$/.test(key)) {
        // 1..9 jump to that slide; 0 jumps to 10.
        const n = key === '0' ? 9 : parseInt(key, 10) - 1;
        if (n < this._slides.length) this._go(n, 'keyboard');
      } else {
        handled = false;
      }
      if (handled) {
        e.preventDefault();
        this._flashOverlay();
      }
    }
    _go(i, reason = 'api') {
      if (!this._slides.length) return;
      const clamped = Math.max(0, Math.min(this._slides.length - 1, i));
      if (clamped === this._index) {
        this._flashOverlay();
        return;
      }
      this._index = clamped;
      this._applyIndex({
        showOverlay: true,
        broadcast: true,
        reason
      });
    }

    /** Step forward/back skipping any slide marked data-deck-skip. Falls
     *  back to _go's clamp-at-ends behaviour (flash overlay) when there's
     *  nothing further in that direction. */
    _advance(dir, reason) {
      if (!this._slides.length) return;
      let i = this._index + dir;
      while (i >= 0 && i < this._slides.length && this._slides[i].hasAttribute('data-deck-skip')) {
        i += dir;
      }
      if (i < 0 || i >= this._slides.length) {
        this._flashOverlay();
        return;
      }
      this._go(i, reason);
    }

    // ── Thumbnail rail ────────────────────────────────────────────────────
    //
    // Thumbs are keyed by slide element and reused across _renderRail()
    // calls, so a reorder/delete is an O(changed) DOM shuffle instead of an
    // O(N) teardown-and-re-clone. Each thumb starts as a lightweight shell
    // (num + empty frame); the clone is materialized lazily by an
    // IntersectionObserver when the frame scrolls into (or near) view, so
    // only visible-ish slides pay the clone + image-decode cost.

    _renderRail() {
      if (!this._rail || !this._railEnabled) {
        this._thumbs = [];
        return;
      }
      // FLIP: record each *materialized* thumb's top before the reconcile.
      // Off-screen (non-materialized) thumbs don't need the animation and
      // skipping their getBoundingClientRect saves a forced layout per
      // off-screen thumb on large decks.
      const prevTops = new Map();
      (this._thumbs || []).forEach(({
        thumb,
        slide,
        host
      }) => {
        if (host) prevTops.set(slide, thumb.getBoundingClientRect().top);
      });
      const st = this._rail.scrollTop;

      // Reconcile: reuse thumbs that already exist for a slide, create
      // shells for new slides, drop thumbs for removed slides.
      const bySlide = new Map();
      (this._thumbs || []).forEach(t => bySlide.set(t.slide, t));
      const next = [];
      this._slides.forEach(slide => {
        let t = bySlide.get(slide);
        if (t) bySlide.delete(slide);else t = this._makeThumb(slide);
        next.push(t);
      });
      // Orphans — slides removed since last render.
      bySlide.forEach(t => {
        if (this._railObserver) this._railObserver.unobserve(t.frame);
        t.thumb.remove();
      });
      // Put thumbs into document order to match _slides. insertBefore on
      // an already-correctly-placed node is a no-op, so this is cheap
      // when nothing moved.
      next.forEach((t, i) => {
        const want = t.thumb;
        const at = this._rail.children[i];
        if (at !== want) this._rail.insertBefore(want, at || null);
        t.i = i;
        t.num.textContent = String(i + 1);
        if (t.slide.hasAttribute('data-deck-skip')) t.thumb.setAttribute('data-skip', '');else t.thumb.removeAttribute('data-skip');
      });
      this._thumbs = next;
      this._rail.scrollTop = st;
      if (prevTops.size) {
        const moved = [];
        this._thumbs.forEach(({
          thumb,
          slide
        }) => {
          const old = prevTops.get(slide);
          if (old == null) return;
          const dy = old - thumb.getBoundingClientRect().top;
          if (Math.abs(dy) < 1) return;
          thumb.style.transition = 'none';
          thumb.style.transform = `translateY(${dy}px)`;
          moved.push(thumb);
        });
        if (moved.length) {
          // Commit the inverted positions before flipping the transition
          // on — otherwise the browser coalesces both style writes and
          // nothing animates.
          void this._rail.offsetHeight;
          moved.forEach(t => {
            t.style.transition = 'transform 180ms cubic-bezier(.2,.7,.3,1)';
            t.style.transform = '';
          });
          setTimeout(() => moved.forEach(t => {
            t.style.transition = '';
          }), 220);
        }
      }
      requestAnimationFrame(() => this._scaleThumbs());
      this._syncRail(false);
    }

    /** Create a lightweight thumb shell for one slide. The clone is
     *  materialized later by the IntersectionObserver. Event handlers
     *  look up the thumb's *current* index (via _thumbs.indexOf) so the
     *  same element can be reused across reorders. */
    _makeThumb(slide) {
      const thumb = document.createElement('div');
      thumb.className = 'thumb';
      thumb.tabIndex = 0;
      const num = document.createElement('div');
      num.className = 'num';
      const frame = document.createElement('div');
      frame.className = 'frame';
      thumb.append(num, frame);
      const entry = {
        thumb,
        num,
        frame,
        slide,
        clone: null,
        host: null,
        i: -1
      };
      // entry.i is refreshed on every _renderRail reconcile pass, so
      // handlers read the thumb's current position without an O(N) scan.
      const idx = () => entry.i;
      thumb.addEventListener('click', () => this._go(idx(), 'click'));
      // ↑/↓ step through the rail when a thumb has focus. _go clamps at the
      // ends and _applyIndex→_syncRail scrolls the new current thumb into
      // view; we move focus to it (preventScroll — _syncRail already
      // scrolled) so a held key walks the whole list. stopPropagation keeps
      // this out of the window-level _onKey nav handler.
      thumb.addEventListener('keydown', e => {
        if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        e.preventDefault();
        e.stopPropagation();
        this._go(idx() + (e.key === 'ArrowDown' ? 1 : -1), 'keyboard');
        const cur = this._thumbs && this._thumbs[this._index];
        if (cur) cur.thumb.focus({
          preventScroll: true
        });
      });
      thumb.addEventListener('contextmenu', e => {
        e.preventDefault();
        this._openMenu(idx(), e.clientX, e.clientY);
      });
      thumb.draggable = true;
      thumb.addEventListener('dragstart', e => {
        this._dragFrom = idx();
        thumb.setAttribute('data-dragging', '');
        e.dataTransfer.effectAllowed = 'move';
        try {
          e.dataTransfer.setData('text/plain', String(this._dragFrom));
        } catch (err) {}
      });
      thumb.addEventListener('dragend', () => {
        thumb.removeAttribute('data-dragging');
        this._clearDrop();
        this._dragFrom = null;
      });
      thumb.addEventListener('dragover', e => {
        if (this._dragFrom == null) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const r = thumb.getBoundingClientRect();
        this._setDrop(idx(), e.clientY < r.top + r.height / 2 ? 'before' : 'after');
      });
      thumb.addEventListener('drop', e => {
        if (this._dragFrom == null) return;
        e.preventDefault();
        const i = idx();
        const r = thumb.getBoundingClientRect();
        let to = e.clientY >= r.top + r.height / 2 ? i + 1 : i;
        if (this._dragFrom < to) to--;
        const from = this._dragFrom;
        this._clearDrop();
        this._dragFrom = null;
        if (to !== from) this._moveSlide(from, to);
      });
      if (this._railObserver) this._railObserver.observe(frame);
      frame.__deckThumb = entry;
      return entry;
    }

    /** Lazily build the clone for a thumb that has scrolled into view. */
    _materialize(entry) {
      if (entry.host) return;
      const dw = this.designWidth,
        dh = this.designHeight;
      let clone = entry.slide.cloneNode(true);
      // Canvas bitmaps don't clone — swap each cloned canvas for an <img>
      // of the live pixels. Best-effort: tainted canvases throw (left
      // as-is); zero-size are skipped; WebGL without preserveDrawingBuffer
      // reads back blank and the thumb gets a blank img (same as before).
      const liveCanvases = entry.slide.querySelectorAll('canvas');
      const cloneCanvases = clone.querySelectorAll('canvas');
      cloneCanvases.forEach((cv, i) => {
        const live = liveCanvases[i];
        if (!live || !live.width || !live.height) return;
        try {
          const img = document.createElement('img');
          img.src = live.toDataURL();
          img.alt = '';
          img.style.cssText = cv.style.cssText;
          img.className = cv.className;
          img.width = live.width;
          img.height = live.height;
          // Author CSS that sized the <canvas> via tag selector won't match
          // the <img> — pin the live canvas's laid-out box on the snapshot.
          if (live.clientWidth) {
            img.style.width = live.clientWidth + 'px';
            img.style.height = live.clientHeight + 'px';
          }
          cv.replaceWith(img);
        } catch (e) {}
      });
      // Neuter heavy media; replace <video> with its poster so the box
      // keeps a visual. <iframe>/<audio> become empty placeholders.
      // Parity with _inertify: transient top-layer UI never belongs in a
      // static thumb.
      clone.querySelectorAll('[popover], dialog').forEach(el => el.remove());
      clone.querySelectorAll('iframe, audio, object, embed').forEach(el => {
        el.removeAttribute('src');
        el.removeAttribute('srcdoc');
        el.removeAttribute('data');
        el.innerHTML = '';
      });
      clone.querySelectorAll('video').forEach(el => {
        if (!el.poster) {
          el.removeAttribute('src');
          el.innerHTML = '';
          return;
        }
        const img = document.createElement('img');
        img.src = el.poster;
        img.alt = '';
        img.style.cssText = el.style.cssText + ';object-fit:cover;width:100%;height:100%;';
        img.className = el.className;
        el.replaceWith(img);
      });
      // Images: defer decode and let the browser pick the smallest
      // srcset candidate for the ~140px thumb. Same-URL clones reuse the
      // slide's decoded bitmap (URL-keyed cache), so the remaining cost
      // is paint/composite — lazy+async keeps that off the main thread.
      clone.querySelectorAll('img').forEach(el => {
        el.loading = 'lazy';
        el.decoding = 'async';
        if (el.srcset) el.sizes = (this._railPx || 188) + 'px';
      });
      // Custom elements inside the slide would have their
      // connectedCallback fire when the clone is appended. Replace them
      // with inert boxes (_neuter) so a component-heavy deck doesn't run
      // N copies of each component's mount logic in the rail. Children
      // are preserved so layout-wrapper elements (<my-column><h2>…</h2>)
      // still show their authored content, and a shadow tree cloned along
      // via attachShadow({clonable:true}) (e.g. <image-slot>) moves onto
      // the box so the thumb shows the component's rendered content. The
      // querySelectorAll NodeList is static, so nested custom elements in
      // the moved subtree are still visited on later iterations.
      // querySelectorAll('*') returns descendants only — a custom-element
      // slide root (<my-slide>…</my-slide>) would slip through and upgrade
      // on append. Swap the root first.
      if (clone.tagName.includes('-')) clone = this._neuter(clone);
      clone.querySelectorAll('*').forEach(el => {
        if (el.tagName.includes('-')) el.replaceWith(this._neuter(el));
      });
      // Strip ids only now: a defined custom element upgrades synchronously
      // during cloneNode and re-renders on attribute callbacks, so removing
      // 'id' any earlier resets components (e.g. <image-slot> falls back to
      // its author src). Post-neuter, only inert boxes and plain elements
      // remain, where the strip is just the usual duplicate-id hygiene.
      clone.removeAttribute('id');
      clone.removeAttribute('data-deck-active');
      clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
      clone.style.cssText += ';position:absolute;top:0;left:0;transform-origin:0 0;' + 'pointer-events:none;width:' + dw + 'px;height:' + dh + 'px;' + 'box-sizing:border-box;overflow:hidden;visibility:visible;opacity:1;';
      const host = document.createElement('div');
      host.style.cssText = 'position:absolute;inset:0;';
      this._syncThumbHostAttrs(host);
      const sr = host.attachShadow({
        mode: 'open'
      });
      if (this._adoptedSheet) sr.adoptedStyleSheets = [this._adoptedSheet];else {
        const st = document.createElement('style');
        st.textContent = this._authorCss || '';
        sr.appendChild(st);
      }
      sr.appendChild(clone);
      entry.frame.appendChild(host);
      entry.host = host;
      entry.clone = clone;
      if (this._thumbScale) clone.style.transform = 'scale(' + this._thumbScale + ')';
      // Once materialized the IO callback is a no-op early-return —
      // unobserve so scroll doesn't keep firing it.
      if (this._railObserver) this._railObserver.unobserve(entry.frame);
    }

    /** Replace a cloned custom element with an inert box (see the comment
     *  in _materialize). A shadow tree cloned along via {clonable:true}
     *  moves onto the box, so the thumb shows the component's real content
     *  with zero component logic; :host rules in the moved <style> match
     *  the box, and the preserved data-* attrs keep :host([data-…])
     *  selectors working. */
    _neuter(el) {
      // Adopt the shadow only when the cloned root carries renderable
      // content. A constructor-attach / connectedCallback-render component
      // clones into an empty (or style-only) slotless root — adopting that
      // would hide the light children the box is about to receive and drop
      // the placeholder chrome. Such components fall back to the plain box.
      let sr = el.shadowRoot;
      if (sr) {
        let renderable = false;
        for (let n = sr.firstElementChild; n; n = n.nextElementSibling) {
          const t = n.tagName;
          if (t !== 'STYLE' && t !== 'LINK') {
            renderable = true;
            break;
          }
        }
        if (!renderable) sr = null;
      }
      const box = document.createElement('div');
      box.style.cssText = (el.getAttribute('style') || '') + (sr ? '' : ';background:rgba(0,0,0,0.06);border:1px dashed rgba(0,0,0,0.15);');
      box.className = el.className;
      // Preserve theming/i18n hooks so [data-*] / :lang() / [dir]
      // descendant selectors still match the neutered root — but not
      // pointer-interaction transients (a mid-reframe/mid-drag re-clone
      // would render the interaction chrome statically in the thumb).
      for (const a of el.attributes) {
        const n = a.name;
        if (n === 'data-reframe' || n === 'data-panning' || n === 'data-over') continue;
        if (n.startsWith('data-') || n.startsWith('aria-') || n === 'lang' || n === 'dir' || n === 'role' || n === 'title') {
          box.setAttribute(n, a.value);
        }
      }
      while (el.firstChild) box.appendChild(el.firstChild);
      if (sr) this._adoptShadow(box, sr);
      return box;
    }

    /** Move a cloned shadow tree onto a neutered thumbnail box: attach an
     *  open root on the box, carry adoptedStyleSheets, move the children,
     *  then make the content inert. */
    _adoptShadow(box, sr) {
      let root;
      try {
        root = box.attachShadow({
          mode: 'open'
        });
      } catch (e) {
        return;
      }
      // Engine-cloned shadow roots never carry adoptedStyleSheets, but a
      // defined component's clone is upgrade-rebuilt (constructor runs
      // during cloneNode), so sheets it adopts there are present and
      // shared by reference — carry them.
      if (sr.adoptedStyleSheets && sr.adoptedStyleSheets.length) {
        try {
          root.adoptedStyleSheets = Array.prototype.slice.call(sr.adoptedStyleSheets);
        } catch (e) {}
      }
      // Clone rather than move: moving preserves listeners an upgraded
      // clone's constructor attached inside its shadow; cloning sheds
      // them, keeping thumbs free of component logic categorically.
      for (let n = sr.firstChild; n; n = n.nextSibling) {
        root.appendChild(n.cloneNode(true));
      }
      this._inertify(root);
    }

    /** Strip anything executable from copied shadow content and apply the
     *  same custom-element/media/img policy as the light-DOM clone.
     *  (Canvases inside copied shadow content stay blank — there is no
     *  live↔clone pairing across shadow boundaries to snapshot from.) */
    _inertify(root) {
      root.querySelectorAll('script').forEach(s => s.remove());
      // Transient top-layer UI can never belong in a static thumb. (A
      // cloned [popover] is display:none anyway — open state doesn't
      // clone — this just makes it categorical.)
      root.querySelectorAll('[popover], dialog').forEach(el => el.remove());
      // Same heavy-media policy as the light-DOM clone above.
      root.querySelectorAll('iframe, audio, object, embed').forEach(el => {
        el.removeAttribute('src');
        el.removeAttribute('srcdoc');
        el.removeAttribute('data');
        el.innerHTML = '';
      });
      root.querySelectorAll('video').forEach(el => {
        if (!el.poster) {
          el.removeAttribute('src');
          el.innerHTML = '';
          return;
        }
        const img = document.createElement('img');
        img.src = el.poster;
        img.alt = '';
        img.style.cssText = el.style.cssText + ';object-fit:cover;width:100%;height:100%;';
        img.className = el.className;
        el.replaceWith(img);
      });
      root.querySelectorAll('*').forEach(el => {
        for (let i = el.attributes.length - 1; i >= 0; i--) {
          if (/^on/i.test(el.attributes[i].name)) {
            el.removeAttribute(el.attributes[i].name);
          }
        }
      });
      root.querySelectorAll('img').forEach(el => {
        el.loading = 'lazy';
        el.decoding = 'async';
        if (el.srcset) el.sizes = (this._railPx || 188) + 'px';
      });
      // Nested custom elements inside copied shadow content would upgrade
      // on append — same treatment as the light DOM. querySelectorAll is
      // static, so boxes created mid-walk don't re-enter this loop.
      root.querySelectorAll('*').forEach(el => {
        if (el.tagName.includes('-')) el.replaceWith(this._neuter(el));
      });
    }

    /** Re-clone a single thumb (live-update path). No-op if the thumb
     *  hasn't been materialized yet — it'll pick up current content when
     *  it scrolls into view. */
    _refreshThumb(slide) {
      const entry = (this._thumbs || []).find(t => t.slide === slide);
      if (!entry || !entry.host) return;
      entry.host.remove();
      entry.host = entry.clone = null;
      this._materialize(entry);
    }
    _scaleThumbs() {
      if (!this._thumbs || !this._thumbs.length) return;
      // Every frame is the same width; if it reads 0 the rail is
      // display:none (noscale / no-rail / presenting / print) — leave the
      // clones as-is and re-run when the rail is revealed.
      const fw = this._thumbs[0].frame.offsetWidth;
      if (!fw) return;
      this._thumbScale = fw / this.designWidth;
      this._thumbs.forEach(({
        clone
      }) => {
        if (clone) clone.style.transform = 'scale(' + this._thumbScale + ')';
      });
    }
    _setDrop(i, where) {
      // dragover fires at pointer-event rate; touch only the previous
      // and new target rather than sweeping all N thumbs.
      const t = this._thumbs && this._thumbs[i];
      if (this._dropOn && this._dropOn !== t) {
        this._dropOn.thumb.removeAttribute('data-drop');
      }
      if (t) t.thumb.setAttribute('data-drop', where);
      this._dropOn = t || null;
    }
    _clearDrop() {
      if (this._dropOn) this._dropOn.thumb.removeAttribute('data-drop');
      this._dropOn = null;
    }
    _syncRail(follow) {
      if (!this._thumbs) return;
      this._thumbs.forEach(({
        thumb
      }, i) => {
        if (i === this._index) {
          thumb.setAttribute('data-current', '');
          if (follow && typeof thumb.scrollIntoView === 'function') {
            thumb.scrollIntoView({
              block: 'nearest'
            });
          }
        } else {
          thumb.removeAttribute('data-current');
        }
      });
    }
    _openMenu(i, x, y) {
      if (!this._menu) return;
      this._menuIndex = i;
      const slide = this._slides[i];
      const skip = slide && slide.hasAttribute('data-deck-skip');
      this._menu.querySelector('[data-act="skip"]').textContent = skip ? 'Unskip slide' : 'Skip slide';
      this._menu.querySelector('[data-act="up"]').disabled = i <= 0;
      this._menu.querySelector('[data-act="down"]').disabled = i >= this._slides.length - 1;
      this._menu.querySelector('[data-act="delete"]').disabled = this._slides.length <= 1;
      // Place, then clamp to viewport after it's measurable.
      this._menu.style.left = x + 'px';
      this._menu.style.top = y + 'px';
      this._menu.setAttribute('data-open', '');
      const r = this._menu.getBoundingClientRect();
      const nx = Math.min(x, window.innerWidth - r.width - 4);
      const ny = Math.min(y, window.innerHeight - r.height - 4);
      this._menu.style.left = Math.max(4, nx) + 'px';
      this._menu.style.top = Math.max(4, ny) + 'px';
    }
    _closeMenu() {
      if (this._menu) this._menu.removeAttribute('data-open');
      this._menuIndex = -1;
    }
    _openConfirm(i) {
      if (!this._confirm) return;
      this._confirmIndex = i;
      this._confirm.querySelector('.title').textContent = 'Delete slide ' + (i + 1) + '?';
      this._confirm.setAttribute('data-open', '');
      const btn = this._confirm.querySelector('.danger');
      if (btn && btn.focus) btn.focus();
    }
    _closeConfirm() {
      if (this._confirm) this._confirm.removeAttribute('data-open');
      this._confirmIndex = -1;
    }

    /** Rail mutations. When a dc-runtime is present (`window.__dcUpdate`)
     *  the host owns the light DOM — handlers emit a dc-op only and the
     *  host applies it (to the editor's model or to the source file) and
     *  re-renders via dc-runtime; slotchange catches the rail up.
     *  Structural ops lock rail input until the host acks so a rapid second
     *  click can't address a stale index; setAttr/removeAttr respect the
     *  lock but don't set it (indices unchanged; the host serializes).
     *  `newIndex` is written to location.hash so slotchange's
     *  _restoreIndex lands on the right slide.
     *
     *  With NO dc-runtime (a raw .html deck), there's no re-render path,
     *  so handlers self-mutate locally for an instant update and emit
     *  `emitOnly: false`; the host persists to disk without
     *  re-rendering over the already-mutated DOM.
     *
     *  See docs/dc-ops.md for the contract. */
    /** True when the page's DC runtime reports a live template stream for
     *  any component here (newer support.js bundles only — older bundles
     *  lack the signal and the HOST-side gate covers those decks). Rail
     *  mutations are refused for the duration: a mid-stream op addresses
     *  slide indices the stream is rewriting underneath the click. */
    _streamActive() {
      try {
        return !!window.__dcUpdate && typeof window.__dcStreaming === 'function' && window.__dcStreaming();
      } catch (e) {
        return false;
      }
    }

    /** Transient in-stage notice for a refused mid-stream rail op. */
    _showStreamNotice() {
      if (!this._root) return;
      let n = this._streamNotice;
      if (!n) {
        n = document.createElement('div');
        n.className = 'export-hidden';
        n.setAttribute('data-omelette-chrome', '');
        n.setAttribute('role', 'status');
        n.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);' + 'background:rgba(22,22,22,.94);color:#fff;' + 'font:500 13px/1.4 system-ui,sans-serif;padding:8px 14px;' + 'border-radius:8px;z-index:2147483646;pointer-events:none;' + 'opacity:0;transition:opacity .15s ease';
        this._root.append(n);
        this._streamNotice = n;
      }
      n.textContent = 'Claude is still updating this deck — try again when it finishes.';
      n.style.opacity = '1';
      if (this._streamNoticeTimer) clearTimeout(this._streamNoticeTimer);
      this._streamNoticeTimer = setTimeout(() => {
        n.style.opacity = '0';
      }, 2600);
    }
    _emitDcOp(op, slide, lock, newIndex) {
      // Mid-stream guard: refuse the gesture outright — no lock, no
      // optimistic index change, no emit, no self-mutation (returning
      // true short-circuits every caller). The host applies the same
      // gate for decks whose committed support.js predates the signal.
      if (this._streamActive()) {
        this._showStreamNotice();
        return true;
      }
      // Slide index (template/script/style filtered — same as
      // _collectSlides). deck-stage is a filtered-index dc-op emitter;
      // the host resolves against findDeckStage().slideTids. Callers
      // already pass `to` as a slide index.
      op.at = this._slides.indexOf(slide);
      op.witness = {
        childCount: this._slides.length
      };
      // dc-runtime wraps an <x-import>-mounted component in a
      // <div class="sc-host-x" data-dc-tpl="N"> host — the stamp is on the
      // WRAPPER, not this element. closest() finds it (or this element's
      // own stamp when directly templated).
      const host = this.closest('[data-dc-tpl]');
      const tid = host && host.getAttribute('data-dc-tpl');
      op.mount = {
        tid: tid !== null ? parseInt(tid, 10) : null,
        tag: 'deck-stage'
      };
      op.emitOnly = !!window.__dcUpdate;
      if (op.emitOnly) {
        if (lock) this._railLock = true;
        if (newIndex != null && newIndex !== this._index) {
          this._indexBeforeEmit = this._index;
          this._index = newIndex;
          try {
            history.replaceState(null, '', '#' + (newIndex + 1));
          } catch (e) {}
        }
      }
      this.dispatchEvent(new CustomEvent('dc-op', {
        detail: op,
        bubbles: true,
        composed: true
      }));
      return op.emitOnly;
    }
    _deleteSlide(i) {
      if (this._railLock) return;
      const slide = this._slides[i];
      if (!slide || this._slides.length <= 1) return;
      const cur = this._index;
      const ni = i < cur || i === cur && i === this._slides.length - 1 ? cur - 1 : cur;
      if (this._emitDcOp({
        op: 'remove'
      }, slide, true, ni)) return;
      this._index = ni;
      this._squelchSlotChange = true;
      slide.remove();
      this._collectSlides();
      this._applyIndex({
        showOverlay: true,
        broadcast: true,
        reason: 'mutation'
      });
    }
    _duplicateSlide(i) {
      if (this._railLock) return;
      const slide = this._slides[i];
      if (!slide) return;
      // Mint ids + copy component state BEFORE emitting, so the op can
      // carry the id map — but never mint for an op the stream gate is
      // about to refuse (_emitDcOp re-checks; this avoids orphaned keys).
      if (this._streamActive()) {
        this._showStreamNotice();
        return;
      }
      const copy = slide.cloneNode(true);
      copy.removeAttribute('id');
      const ids = this._remintDuplicateIds(copy);
      const op = {
        op: 'duplicate'
      };
      if (ids) op.ids = ids;
      if (this._emitDcOp(op, slide, true, i + 1)) return;
      this._index = i + 1;
      this._squelchSlotChange = true;
      this.insertBefore(copy, slide.nextSibling);
      this._collectSlides();
      this._applyIndex({
        showOverlay: true,
        broadcast: true,
        reason: 'mutation'
      });
    }

    /** Duplicate id policy. Plain ids are stripped — two live slides must
     *  not share one id. But a component that KEYS persistent state by id
     *  (image-slot's sidecar photo) would silently lose that state with
     *  its id. Such a component opts out of the strip by exposing a
     *  static cloneSlot(fromId, isFree) that copies its stored state
     *  under a fresh id of its choosing and returns that id. The old→new
     *  map is returned (or null) and rides the dc-op so the host writes
     *  the SAME ids into source — without that, the copy's state would
     *  revert on reload (docs/dc-ops.md). */
    _remintDuplicateIds(copy) {
      const ids = {};
      let found = false;
      const used = new Set();
      const idOk = /^[A-Za-z][\w-]{0,63}$/;
      const isFree = id => idOk.test(id) && !used.has(id) && !document.getElementById(id);
      copy.querySelectorAll('[id]').forEach(el => {
        const tag = el.tagName.toLowerCase();
        const cls = tag.indexOf('-') >= 0 && customElements.get(tag);
        let next = null;
        if (el.id && cls && typeof cls.cloneSlot === 'function') {
          try {
            next = cls.cloneSlot(el.id, isFree);
          } catch (e) {}
        }
        // Re-checked here so a misbehaving static can't smuggle a dupe
        // or an unsafe value into the document / the emitted op.
        if (typeof next === 'string' && isFree(next)) {
          ids[el.id] = next;
          used.add(next);
          el.id = next;
          found = true;
        } else {
          el.removeAttribute('id');
        }
      });
      return found ? ids : null;
    }
    _toggleSkip(i) {
      if (this._railLock) return;
      const slide = this._slides[i];
      if (!slide) return;
      const on = !slide.hasAttribute('data-deck-skip');
      if (this._emitDcOp(on ? {
        op: 'setAttr',
        attr: 'data-deck-skip',
        value: ''
      } : {
        op: 'removeAttr',
        attr: 'data-deck-skip'
      }, slide, false)) return;
      if (on) slide.setAttribute('data-deck-skip', '');else slide.removeAttribute('data-deck-skip');
    }
    _skippedIndices() {
      const out = [];
      for (let i = 0; i < this._slides.length; i++) {
        if (this._slides[i].hasAttribute('data-deck-skip')) out.push(i);
      }
      return out;
    }
    _moveSlide(i, j) {
      if (this._railLock || j < 0 || j >= this._slides.length || j === i) return;
      const cur = this._index;
      const ni = cur === i ? j : i < cur && j >= cur ? cur - 1 : i > cur && j <= cur ? cur + 1 : cur;
      const slide = this._slides[i];
      if (this._emitDcOp({
        op: 'move',
        to: j
      }, slide, true, ni)) return;
      const ref = j < i ? this._slides[j] : this._slides[j].nextSibling;
      this._index = ni;
      this._squelchSlotChange = true;
      this.insertBefore(slide, ref);
      this._collectSlides();
      this._applyIndex({
        showOverlay: false,
        broadcast: true,
        reason: 'mutation'
      });
    }

    // Public API ------------------------------------------------------------

    /** Current slide index (0-based). */
    get index() {
      return this._index;
    }
    /** Total slide count. */
    get length() {
      return this._slides.length;
    }
    /** Programmatically navigate. */
    goTo(i) {
      this._go(i, 'api');
    }
    next() {
      this._advance(1, 'api');
    }
    prev() {
      this._advance(-1, 'api');
    }
    reset() {
      this._go(0, 'api');
    }
  }
  if (!customElements.get('deck-stage')) {
    customElements.define('deck-stage', DeckStage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "deck-stage.js", error: String((e && e.message) || e) }); }

// design-canvas.jsx
try { (() => {
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// No assets, no deps.

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// ─────────────────────────────────────────────────────────────
// Main canvas — transform-based pan/zoom viewport
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DesignCanvas({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if (e.ctrlKey) {
        // trackpad pinch (or explicit ctrl+wheel)
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button starting on the
    // canvas background (not inside an artboard).
    let drag = null;
    const onPointerDown = e => {
      const onBg = e.target === vp || e.target === worldRef.current;
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px',
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Section — title + subtitle + h-stack of artboards (no wrap)
// ─────────────────────────────────────────────────────────────
function DCSection({
  title,
  subtitle,
  children,
  gap = 48
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 80,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px 36px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.3,
      marginBottom: 4
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 400,
      color: DC.subtitle
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Artboard — labeled card
// ─────────────────────────────────────────────────────────────
function DCArtboard({
  label,
  children,
  width,
  height,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '100%',
      left: 0,
      paddingBottom: 8,
      fontSize: 12,
      fontWeight: 500,
      color: DC.label,
      whiteSpace: 'nowrap'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design-canvas.jsx", error: String((e && e.message) || e) }); }

// ds/cards/Card.jsx
try { (() => {
function Card({
  dark = false,
  hover = true,
  style,
  children
}) {
  if (dark) return /*#__PURE__*/React.createElement("div", {
    className: "card-dark",
    style: style
  }, children);
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: hover ? style : {
      transition: 'none',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ds/cards/Card.jsx", error: String((e && e.message) || e) }); }

// ds/cards/RadarCard.jsx
try { (() => {
/* Mock escuro com varredura — coração da identidade. rows: [{idx,name,amount,badge,flagged}] */
function RadarCard({
  title = 'Contratos · varredura',
  live = 'Varredura ativa',
  rows = [],
  summaryLabel,
  summaryValue,
  scan = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: 'var(--azul-profundo)',
      borderRadius: 22,
      padding: 28,
      color: '#EAF6FF',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-dark)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(600px circle at 85% 15%, color-mix(in oklab, var(--ciano) 18%, transparent), transparent 60%)',
      pointerEvents: 'none'
    }
  }), scan && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '80px 0 0 0',
      background: 'linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--ciano) 22%, transparent) 48%, color-mix(in oklab, var(--ciano) 40%, transparent) 50%, transparent 100%)',
      animation: 'scan 3.6s cubic-bezier(.7,0,.3,1) infinite',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "radar-head",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 12,
      color: 'rgba(224,249,255,0.6)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      marginBottom: 20,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", null, title), /*#__PURE__*/React.createElement("span", {
    className: "live",
    style: {
      color: 'var(--ciano)'
    }
  }, live)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `radar-row${r.flagged ? ' flagged' : ''}`,
    style: {
      display: 'grid',
      gridTemplateColumns: '34px 1fr auto auto',
      gap: 14,
      alignItems: 'center',
      padding: '14px 16px',
      background: r.flagged ? 'color-mix(in oklab, var(--ciano) 8%, transparent)' : 'rgba(255,255,255,0.03)',
      border: `1px solid ${r.flagged ? 'color-mix(in oklab, var(--ciano) 55%, transparent)' : 'rgba(255,255,255,0.06)'}`,
      borderRadius: 12,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'rgba(224,249,255,0.5)'
    }
  }, r.idx), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#EAF6FF',
      fontWeight: 500
    }
  }, r.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: r.flagged ? 'var(--ciano)' : 'rgba(224,249,255,0.75)',
      fontWeight: r.flagged ? 600 : 400
    }
  }, r.amount), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '3px 8px',
      borderRadius: 99,
      fontSize: 10,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      ...(r.flagged ? {
        background: 'var(--ciano)',
        color: 'var(--azul-profundo)',
        fontWeight: 700
      } : {
        border: '1px solid rgba(255,255,255,0.1)',
        color: 'rgba(224,249,255,0.7)'
      })
    }
  }, r.badge)))), summaryValue && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      padding: '16px 18px 0',
      borderTop: '1px dashed rgba(255,255,255,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'rgba(224,249,255,0.55)'
    }
  }, summaryLabel), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28,
      fontWeight: 700,
      color: 'var(--ciano)',
      letterSpacing: '-0.02em'
    }
  }, summaryValue)));
}
Object.assign(__ds_scope, { RadarCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ds/cards/RadarCard.jsx", error: String((e && e.message) || e) }); }

// ds/core/Badge.jsx
try { (() => {
function Badge({
  kind = 'neutral',
  children
}) {
  if (kind === 'antes') return /*#__PURE__*/React.createElement("span", {
    className: "panel-tag",
    style: {
      background: 'var(--antes-tag-bg)',
      color: 'var(--antes-tag-fg)',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      padding: '5px 10px',
      borderRadius: 99
    }
  }, children);
  if (kind === 'depois') return /*#__PURE__*/React.createElement("span", {
    className: "panel-tag",
    style: {
      background: 'var(--ciano)',
      color: 'var(--azul-profundo)',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      padding: '5px 10px',
      borderRadius: 99
    }
  }, children);
  return /*#__PURE__*/React.createElement("span", {
    className: `badge ${kind}`
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ds/core/Badge.jsx", error: String((e && e.message) || e) }); }

// ds/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const WA_PATH = "M19.05 4.91A10 10 0 0 0 4.04 18.26L3 22l3.83-1.01A10 10 0 1 0 19.05 4.91zM12 20.15a8.14 8.14 0 0 1-4.15-1.13l-.3-.18-2.27.6.6-2.22-.19-.32A8.15 8.15 0 1 1 12 20.15zm4.46-6.1c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.46c-.16 0-.4.06-.62.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.57.25 1.02.4 1.37.5.57.18 1.1.16 1.51.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z";
function IconWhats({
  size = 18
}) {
  return /*#__PURE__*/React.createElement("svg", {
    className: "whats",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: WA_PATH,
    fill: "currentColor"
  }));
}
function Button({
  variant = 'primary',
  whatsapp = false,
  arrow = false,
  compact = false,
  href,
  children,
  ...rest
}) {
  const cls = `btn btn-${variant}`;
  const style = compact ? {
    padding: '10px 18px',
    fontSize: 14
  } : undefined;
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, whatsapp && /*#__PURE__*/React.createElement(IconWhats, null), /*#__PURE__*/React.createElement("span", null, children), arrow && /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 5l7 7-7 7",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
  return href ? /*#__PURE__*/React.createElement("a", _extends({
    className: cls,
    style: style,
    href: href,
    target: href.startsWith('http') ? '_blank' : undefined,
    rel: "noreferrer"
  }, rest), inner) : /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls,
    style: style
  }, rest), inner);
}
Object.assign(__ds_scope, { IconWhats, Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ds/core/Button.jsx", error: String((e && e.message) || e) }); }

// ds/core/Eyebrow.jsx
try { (() => {
function Eyebrow({
  light = false,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `eyebrow${light ? ' light' : ''}`,
    style: light ? {
      color: 'rgba(234,246,255,0.66)'
    } : undefined
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan",
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--ciano)',
      boxShadow: '0 0 0 4px color-mix(in oklab, var(--ciano) 18%, transparent)'
    }
  }), " ", children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ds/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// ds/core/LangToggle.jsx
try { (() => {
function LangToggle({
  value = 'pt',
  onChange = () => {},
  dark = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "lang-toggle",
    style: dark ? {
      background: 'transparent',
      borderColor: 'rgba(255,255,255,0.22)'
    } : undefined
  }, ['pt', 'en'].map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    type: "button",
    className: value === l ? 'on' : '',
    style: value === l && dark ? {
      background: 'var(--ciano)',
      color: 'var(--azul-profundo)'
    } : !dark || value === l ? undefined : {
      color: 'rgba(234,246,255,0.6)'
    },
    onClick: () => onChange(l)
  }, l.toUpperCase())));
}
Object.assign(__ds_scope, { LangToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ds/core/LangToggle.jsx", error: String((e && e.message) || e) }); }

// ds/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Field({
  label,
  optional = false,
  type = 'text',
  as,
  options = [],
  id,
  ...rest
}) {
  const control = as === 'textarea' ? /*#__PURE__*/React.createElement("textarea", _extends({
    id: id
  }, rest)) : as === 'select' ? /*#__PURE__*/React.createElement("select", _extends({
    id: id
  }, rest), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value ?? o,
    value: o.value ?? o
  }, o.label ?? o))) : /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    id: id
  }, rest));
  return /*#__PURE__*/React.createElement("div", {
    className: "f-field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: id
  }, label, " ", optional && /*#__PURE__*/React.createElement("span", {
    className: "opt"
  }, "(opcional)")), control);
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ds/forms/Field.jsx", error: String((e && e.message) || e) }); }

// ds/site/Footer.jsx
try { (() => {
function Footer({
  logoSrc,
  tagline = 'Gestão de contratos e cobrança com IA, de ponta a ponta, para escritórios de contabilidade.',
  columns = [],
  year = 2026
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--azul-profundo)',
      color: 'rgba(234,246,255,0.6)',
      fontSize: 14,
      padding: '80px 0 0',
      borderTop: '1px solid rgba(255,255,255,0.06)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "shell"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `1.5fr ${columns.map(() => '1fr').join(' ')}`,
      gap: 48,
      paddingBottom: 64
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 20
    }
  }, logoSrc ? /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "Kontiva.ai",
    style: {
      height: 22
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 20,
      color: '#EAF6FF',
      letterSpacing: '-0.03em'
    }
  }, "Kontiva", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ciano)'
    }
  }, ".ai")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: 320,
      lineHeight: 1.6
    }
  }, tagline)), columns.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.title,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h5", {
    style: {
      margin: '0 0 6px',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--ciano)'
    }
  }, col.title), col.links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href,
    style: {
      color: 'rgba(234,246,255,0.7)'
    }
  }, l.label))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(255,255,255,0.08)',
      padding: '22px 0 28px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap',
      fontSize: 12.5
    }
  }, /*#__PURE__*/React.createElement("div", null, "\xA9 ", year, " Kontiva.ai \xB7 Todos os direitos reservados."), /*#__PURE__*/React.createElement("a", {
    href: "https://www.bluemetrics.ai",
    target: "_blank",
    rel: "noreferrer",
    style: {
      color: 'rgba(234,246,255,0.75)',
      fontWeight: 500
    }
  }, "Kontiva \xE9 uma empresa BlueMetrics."))));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ds/site/Footer.jsx", error: String((e && e.message) || e) }); }

// ds/site/Nav.jsx
try { (() => {
function Nav({
  dark = false,
  links = [{
    label: 'Como funciona',
    href: '#como-funciona'
  }, {
    label: 'Calculadora',
    href: '#calculadora'
  }, {
    label: 'Planos',
    href: '#planos'
  }, {
    label: 'FAQ',
    href: '#faq'
  }],
  lang,
  onLang,
  ctaHref = 'https://wa.me/5551926343014',
  logoSrc
}) {
  return /*#__PURE__*/React.createElement("nav", {
    className: `nav${dark ? ' nav-dark' : ''}`,
    style: dark ? {
      background: 'rgba(10,31,63,0.94)',
      borderBottomColor: 'rgba(255,255,255,0.08)'
    } : undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: "shell nav-inner"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 56,
      minWidth: 0
    }
  }, logoSrc ? /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "Kontiva.ai",
    style: {
      height: 24,
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      letterSpacing: '-0.03em',
      fontSize: 22,
      color: dark ? '#EAF6FF' : 'var(--azul-profundo)'
    }
  }, "Kontiva", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ciano)'
    }
  }, ".ai")), /*#__PURE__*/React.createElement("div", {
    className: "nav-links",
    style: dark ? {
      color: 'rgba(234,246,255,0.72)'
    } : undefined
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.href,
    href: l.href
  }, l.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      alignItems: 'center'
    }
  }, lang && /*#__PURE__*/React.createElement(__ds_scope.LangToggle, {
    value: lang,
    onChange: onLang,
    dark: dark
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    whatsapp: true,
    compact: true,
    href: ctaHref
  }, "Falar no WhatsApp"))));
}
Object.assign(__ds_scope, { Nav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ds/site/Nav.jsx", error: String((e && e.message) || e) }); }

// logo/design-canvas.jsx
try { (() => {
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// No assets, no deps.

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// ─────────────────────────────────────────────────────────────
// Main canvas — transform-based pan/zoom viewport
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DesignCanvas({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if (e.ctrlKey) {
        // trackpad pinch (or explicit ctrl+wheel)
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button starting on the
    // canvas background (not inside an artboard).
    let drag = null;
    const onPointerDown = e => {
      const onBg = e.target === vp || e.target === worldRef.current;
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px',
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Section — title + subtitle + h-stack of artboards (no wrap)
// ─────────────────────────────────────────────────────────────
function DCSection({
  title,
  subtitle,
  children,
  gap = 48
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 80,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px 36px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.3,
      marginBottom: 4
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 400,
      color: DC.subtitle
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Artboard — labeled card
// ─────────────────────────────────────────────────────────────
function DCArtboard({
  label,
  children,
  width,
  height,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '100%',
      left: 0,
      paddingBottom: 8,
      fontSize: 12,
      fontWeight: 500,
      color: DC.label,
      whiteSpace: 'nowrap'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "logo/design-canvas.jsx", error: String((e && e.message) || e) }); }

// logo/logos.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Kontiva.ai — Logo explorations */

const C = {
  azul: '#0A1F3F',
  ciano: '#00D4FF',
  cianoMid: '#00A8CC',
  papel: '#F7F5EE',
  branco: '#FFFFFF'
};

// Shared wordmark renderer
const Wordmark = ({
  size = 40,
  color = C.azul,
  accent = C.ciano,
  family = "'Space Grotesk', sans-serif",
  weight = 700,
  tracking = '-0.04em',
  aiStyle = 'subscript'
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'inline-flex',
    alignItems: 'baseline',
    fontFamily: family,
    fontWeight: weight,
    fontSize: size,
    letterSpacing: tracking,
    color,
    lineHeight: 1
  }
}, /*#__PURE__*/React.createElement("span", null, "kontiva"), aiStyle === 'subscript' && /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: size * 0.32,
    color: accent,
    fontWeight: 500,
    marginLeft: size * 0.08,
    transform: `translateY(${size * 0.1}px)`,
    letterSpacing: '0.02em'
  }
}, ".ai"), aiStyle === 'dot-accent' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
  style: {
    color: accent
  }
}, "."), /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: size * 0.4,
    fontWeight: 500,
    marginLeft: 2
  }
}, "ai")), aiStyle === 'tiny-mono' && /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: size * 0.22,
    color: accent,
    marginLeft: size * 0.1,
    letterSpacing: '0.06em',
    alignSelf: 'center',
    transform: `translateY(${size * 0.15}px)`
  }
}, ".ai"));

// ─── 01. Aperture K — K built from a focusing mira/lens ──────────
const LogoAperture = ({
  size = 120,
  onDark = false
}) => {
  const fg = onDark ? C.branco : C.azul;
  const ac = C.ciano;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 120",
    width: size,
    height: size,
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "60",
    r: "52",
    stroke: fg,
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M42 30 V90",
    stroke: fg,
    strokeWidth: "10",
    strokeLinecap: "square"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M42 60 L78 30",
    stroke: fg,
    strokeWidth: "10",
    strokeLinecap: "square"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M42 60 L78 90",
    stroke: fg,
    strokeWidth: "10",
    strokeLinecap: "square"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "42",
    cy: "60",
    r: "5",
    fill: ac
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "42",
    cy: "60",
    r: "10",
    stroke: ac,
    strokeWidth: "1.5",
    opacity: "0.5"
  }));
};

// ─── 02. Scan K — the K is half-drawn, being revealed by a scan line ──
const LogoScan = ({
  size = 120,
  onDark = false
}) => {
  const fg = onDark ? C.branco : C.azul;
  const ac = C.ciano;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 120",
    width: size,
    height: size,
    fill: "none"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "30",
    y1: "20",
    x2: "30",
    y2: "100",
    stroke: fg,
    strokeWidth: "11",
    strokeLinecap: "square"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "30",
    y1: "60",
    x2: "90",
    y2: "20",
    stroke: fg,
    strokeWidth: "11",
    strokeLinecap: "square"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "30",
    y1: "60",
    x2: "90",
    y2: "100",
    stroke: fg,
    strokeWidth: "11",
    strokeLinecap: "square"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "55",
    y: "10",
    width: "4",
    height: "100",
    fill: ac
  }), /*#__PURE__*/React.createElement("rect", {
    x: "55",
    y: "10",
    width: "18",
    height: "100",
    fill: `url(#scan-grad)`,
    opacity: "0.6"
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "scan-grad",
    x1: "0",
    x2: "1",
    y1: "0",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: ac,
    stopOpacity: "0.8"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: ac,
    stopOpacity: "0"
  }))));
};

// ─── 03. Clause K — contract with highlighted clause forms the K arms ──
const LogoClause = ({
  size = 120,
  onDark = false
}) => {
  const fg = onDark ? C.branco : C.azul;
  const ac = C.ciano;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 120",
    width: size,
    height: size,
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "22",
    y: "14",
    width: "64",
    height: "92",
    rx: "4",
    stroke: fg,
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "32",
    y: "28",
    width: "38",
    height: "3",
    fill: fg,
    opacity: "0.25"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "32",
    y: "38",
    width: "28",
    height: "3",
    fill: fg,
    opacity: "0.25"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "32",
    y: "50",
    width: "44",
    height: "8",
    fill: ac
  }), /*#__PURE__*/React.createElement("rect", {
    x: "32",
    y: "62",
    width: "44",
    height: "8",
    fill: ac
  }), /*#__PURE__*/React.createElement("rect", {
    x: "32",
    y: "74",
    width: "30",
    height: "3",
    fill: fg,
    opacity: "0.25"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "32",
    y: "84",
    width: "34",
    height: "3",
    fill: fg,
    opacity: "0.25"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "32",
    y: "94",
    width: "22",
    height: "3",
    fill: fg,
    opacity: "0.25"
  }), /*#__PURE__*/React.createElement("g", {
    transform: "translate(78,10)"
  }, /*#__PURE__*/React.createElement("circle", {
    r: "14",
    cx: "14",
    cy: "14",
    fill: ac
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 6 V22 M9 14 L19 6 M9 14 L19 22",
    stroke: C.azul,
    strokeWidth: "2.4",
    strokeLinecap: "square"
  })));
};

// ─── 04. Radar K — concentric rings + K as the sweep target ─────────
const LogoRadar = ({
  size = 120,
  onDark = false
}) => {
  const fg = onDark ? C.branco : C.azul;
  const ac = C.ciano;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 120",
    width: size,
    height: size,
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "60",
    r: "50",
    stroke: fg,
    strokeWidth: "1.5",
    opacity: "0.3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "60",
    r: "34",
    stroke: fg,
    strokeWidth: "1.5",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "60",
    r: "18",
    stroke: fg,
    strokeWidth: "1.5",
    opacity: "0.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 60 L110 35 A55 55 0 0 0 100 20 Z",
    fill: ac,
    opacity: "0.22"
  }), /*#__PURE__*/React.createElement("g", {
    transform: "translate(42, 36)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 0 V48",
    stroke: fg,
    strokeWidth: "7",
    strokeLinecap: "square"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 24 L28 0",
    stroke: fg,
    strokeWidth: "7",
    strokeLinecap: "square"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 24 L28 48",
    stroke: fg,
    strokeWidth: "7",
    strokeLinecap: "square"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "0",
    cy: "24",
    r: "4.5",
    fill: ac
  })));
};

// ─── 05. Geometric K — pure type, a single construction ────────────
const LogoGeometric = ({
  size = 120,
  onDark = false
}) => {
  const fg = onDark ? C.branco : C.azul;
  const ac = C.ciano;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 120",
    width: size,
    height: size,
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 18 H42 V54 L74 18 H98 L64 56 L100 102 H76 L48 66 L42 72 V102 H22 Z",
    fill: fg
  }), /*#__PURE__*/React.createElement("path", {
    d: "M42 56 L48 62 L42 68 Z",
    fill: ac
  }));
};

// ─── 06. Vision K — eye/pupil + K as iris structure ────────────────
const LogoVision = ({
  size = 120,
  onDark = false
}) => {
  const fg = onDark ? C.branco : C.azul;
  const ac = C.ciano;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 120",
    width: size,
    height: size,
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 60 Q60 10 112 60 Q60 110 8 60 Z",
    stroke: fg,
    strokeWidth: "3",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "60",
    r: "26",
    fill: fg
  }), /*#__PURE__*/React.createElement("g", {
    transform: "translate(45, 44)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 0 V32",
    stroke: C.papel,
    strokeWidth: "5",
    strokeLinecap: "square"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 16 L18 0",
    stroke: C.papel,
    strokeWidth: "5",
    strokeLinecap: "square"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 16 L18 32",
    stroke: C.papel,
    strokeWidth: "5",
    strokeLinecap: "square"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "72",
    cy: "52",
    r: "5",
    fill: ac
  }));
};

// ─── Artboard helpers ──────────────────────────────────────────────

const Board = ({
  children,
  onDark = false,
  pad = 32,
  w = 280,
  h = 200
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    width: w,
    height: h,
    background: onDark ? C.azul : C.papel,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: pad
  }
}, children);
const LockupBoard = ({
  Logo,
  wordSize = 44,
  onDark = false,
  family,
  aiStyle = 'subscript',
  w = 360,
  h = 140
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    width: w,
    height: h,
    background: onDark ? C.azul : C.papel,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  }
}, /*#__PURE__*/React.createElement(Logo, {
  size: 64,
  onDark: onDark
}), /*#__PURE__*/React.createElement(Wordmark, {
  size: wordSize,
  family: family,
  color: onDark ? C.branco : C.azul,
  accent: C.ciano,
  aiStyle: aiStyle
}));
const FaviconBoard = ({
  Logo,
  onDark = false
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    width: 120,
    height: 120,
    background: onDark ? C.azul : C.papel,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: 48,
    height: 48,
    background: onDark ? '#122A52' : C.branco,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: onDark ? 'inset 0 0 0 1px rgba(255,255,255,0.08)' : 'inset 0 0 0 1px rgba(10,31,63,0.08)'
  }
}, /*#__PURE__*/React.createElement(Logo, {
  size: 32,
  onDark: onDark
})));

// ─── Option row — logo mark + lockups + favicon ────────────────────

const Option = ({
  n,
  title,
  blurb,
  Logo,
  family,
  aiStyle
}) => /*#__PURE__*/React.createElement(DCSection, {
  title: `0${n} — ${title}`,
  subtitle: blurb
}, /*#__PURE__*/React.createElement(DCArtboard, {
  label: "S\xEDmbolo \xB7 claro",
  width: 280,
  height: 200
}, /*#__PURE__*/React.createElement(Board, null, /*#__PURE__*/React.createElement(Logo, {
  size: 120
}))), /*#__PURE__*/React.createElement(DCArtboard, {
  label: "S\xEDmbolo \xB7 escuro",
  width: 280,
  height: 200
}, /*#__PURE__*/React.createElement(Board, {
  onDark: true
}, /*#__PURE__*/React.createElement(Logo, {
  size: 120,
  onDark: true
}))), /*#__PURE__*/React.createElement(DCArtboard, {
  label: "Lockup horizontal",
  width: 360,
  height: 140
}, /*#__PURE__*/React.createElement(LockupBoard, {
  Logo: Logo,
  family: family,
  aiStyle: aiStyle
})), /*#__PURE__*/React.createElement(DCArtboard, {
  label: "Lockup escuro",
  width: 360,
  height: 140
}, /*#__PURE__*/React.createElement(LockupBoard, {
  Logo: Logo,
  family: family,
  aiStyle: aiStyle,
  onDark: true
})), /*#__PURE__*/React.createElement(DCArtboard, {
  label: "App icon",
  width: 120,
  height: 120
}, /*#__PURE__*/React.createElement(FaviconBoard, {
  Logo: Logo
})), /*#__PURE__*/React.createElement(DCArtboard, {
  label: "App icon \xB7 escuro",
  width: 120,
  height: 120
}, /*#__PURE__*/React.createElement(FaviconBoard, {
  Logo: Logo,
  onDark: true
})));

// ─── Root app ──────────────────────────────────────────────────────

const App = () => {
  const options = [{
    n: 1,
    title: 'Aperture',
    blurb: 'K dentro de uma lente/mira. Precisão + foco. "Gestão sem ponto cego" literal.',
    Logo: LogoAperture,
    family: "'Space Grotesk', sans-serif",
    aiStyle: 'subscript'
  }, {
    n: 2,
    title: 'Scan',
    blurb: 'K sendo varrido pelo feixe ciano. Radar + revelação em um gesto só.',
    Logo: LogoScan,
    family: "'Space Grotesk', sans-serif",
    aiStyle: 'tiny-mono'
  }, {
    n: 3,
    title: 'Clause',
    blurb: 'Contrato com a cláusula destacada. K monograma acompanha o documento.',
    Logo: LogoClause,
    family: "'Inter', sans-serif",
    aiStyle: 'dot-accent'
  }, {
    n: 4,
    title: 'Radar',
    blurb: 'Anéis concêntricos + setor de varredura. K no centro, sólido.',
    Logo: LogoRadar,
    family: "'Space Grotesk', sans-serif",
    aiStyle: 'subscript'
  }, {
    n: 5,
    title: 'Geometric',
    blurb: 'Tipografia pura. K chanfrado, só uma faísca ciano onde as diagonais se encontram.',
    Logo: LogoGeometric,
    family: "'Space Grotesk', sans-serif",
    aiStyle: 'subscript'
  }, {
    n: 6,
    title: 'Vision',
    blurb: 'Olho/íris com K dentro. Mais humano, mais "consultor que enxerga".',
    Logo: LogoVision,
    family: "'Sora', sans-serif",
    aiStyle: 'tiny-mono'
  }];
  return /*#__PURE__*/React.createElement(DesignCanvas, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: 'rgba(40,30,20,0.9)',
      letterSpacing: -0.4
    }
  }, "Kontiva.ai \u2014 Propostas de logo"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'rgba(60,50,40,0.65)',
      marginTop: 6,
      maxWidth: 680
    }
  }, "Seis dire\xE7\xF5es. K geom\xE9trico como espinha dorsal, atravessado por conceitos diferentes \u2014 mira, radar, contrato, olho, tipografia pura. Paleta: azul profundo + ciano el\xE9trico. .ai sempre em tom menor, nunca dominante.")), options.map(o => /*#__PURE__*/React.createElement(Option, _extends({
    key: o.n
  }, o))), /*#__PURE__*/React.createElement(DCPostIt, {
    top: 40,
    right: 60,
    rotate: 3,
    width: 220
  }, "Role lateralmente em cada linha para ver todas as aplica\xE7\xF5es. Me diga qual (ou quais) querem que eu desenvolva mais."));
};
ReactDOM.createRoot(document.getElementById('app')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "logo/logos.jsx", error: String((e && e.message) || e) }); }

// v2/kontiva-app.jsx
try { (() => {
// Kontiva v2 — App: composição + idioma + tweaks
// (hooks useState/useEffect vêm de kontiva-base.jsx — escopo global compartilhado)

const App = () => {
  const [tweaks, setTweaks] = useState(window.__TWEAKS);
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem('kontiva_lang') === 'en' ? 'en' : 'pt';
    } catch (e) {
      return 'pt';
    }
  });
  const setLang = l => {
    setLangState(l);
    try {
      localStorage.setItem('kontiva_lang', l);
    } catch (e) {}
  };
  useEffect(() => {
    window.__setTweaks = patch => setTweaks(t => ({
      ...t,
      ...patch
    }));
  }, []);
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-boost', tweaks.accentBoost);
  }, [tweaks.accentBoost]);
  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
  }, [lang]);
  useEffect(() => {
    const root = document.documentElement.style;
    const sets = {
      inter: {
        display: "'Inter', sans-serif",
        body: "'Inter', sans-serif"
      },
      space: {
        display: "'Space Grotesk', sans-serif",
        body: "'Inter', sans-serif"
      },
      sora: {
        display: "'Sora', sans-serif",
        body: "'Sora', sans-serif"
      },
      geist: {
        display: "'Geist', sans-serif",
        body: "'Geist', sans-serif"
      },
      mono: {
        display: "'JetBrains Mono', monospace",
        body: "'Inter', sans-serif"
      }
    };
    const s = sets[tweaks.fontSet] || sets.sora;
    root.setProperty('--font-display', s.display);
    root.setProperty('--font-body', s.body);
  }, [tweaks.fontSet]);
  const ctx = {
    lang,
    setLang,
    t: window.KONTIVA_STR[lang]
  };
  return /*#__PURE__*/React.createElement(LangContext.Provider, {
    value: ctx
  }, /*#__PURE__*/React.createElement(Nav, {
    navStyle: tweaks.navStyle || 'light'
  }), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Problem, null), /*#__PURE__*/React.createElement(Flow, null), /*#__PURE__*/React.createElement(ChatSection, null), /*#__PURE__*/React.createElement(Agents, null), /*#__PURE__*/React.createElement(Results, null), /*#__PURE__*/React.createElement(Calculator, null), /*#__PURE__*/React.createElement(Pricing, null), /*#__PURE__*/React.createElement(Faq, null), /*#__PURE__*/React.createElement(FinalCTA, null), /*#__PURE__*/React.createElement(Footer, null));
};
ReactDOM.createRoot(document.getElementById('app')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "v2/kontiva-app.jsx", error: String((e && e.message) || e) }); }

// v2/kontiva-base.jsx
try { (() => {
// Kontiva v2 — base: ícones, marca, hooks compartilhados
const {
  useState,
  useEffect,
  useRef
} = React;

// ---------- Icons ----------
const IconWhats = () => /*#__PURE__*/React.createElement("svg", {
  className: "whats",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M19.05 4.91A10 10 0 0 0 4.04 18.26L3 22l3.83-1.01A10 10 0 1 0 19.05 4.91zM12 20.15a8.14 8.14 0 0 1-4.15-1.13l-.3-.18-2.27.6.6-2.22-.19-.32A8.15 8.15 0 1 1 12 20.15zm4.46-6.1c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.46c-.16 0-.4.06-.62.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.57.25 1.02.4 1.37.5.57.18 1.1.16 1.51.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z",
  fill: "currentColor"
}));
const IconArrow = () => /*#__PURE__*/React.createElement("svg", {
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M5 12h14M13 5l7 7-7 7",
  stroke: "currentColor",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const IconTick = () => /*#__PURE__*/React.createElement("svg", {
  width: "10",
  height: "10",
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M5 12l5 5L20 7",
  stroke: "currentColor",
  strokeWidth: "3",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const IconRadar = () => /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "9",
  stroke: "currentColor",
  strokeWidth: "1.6"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "5",
  stroke: "currentColor",
  strokeWidth: "1.6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 12 L19 6",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round"
}));
const IconDoc = () => /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M6 3h8l4 4v14H6z",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinejoin: "round"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9 13h6M9 16h6M9 10h3",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round"
}));
const IconBolt = () => /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M13 3 4 14h7l-1 7 9-11h-7z",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinejoin: "round"
}));
const IconPlug = () => /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M9 7V3M15 7V3",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round"
}), /*#__PURE__*/React.createElement("path", {
  d: "M6 7h12v4a6 6 0 0 1-12 0V7z",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinejoin: "round"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 17v4",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round"
}));
const IconChev = () => /*#__PURE__*/React.createElement("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M6 9l6 6 6-6",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const IconLinkedIn = () => /*#__PURE__*/React.createElement("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, /*#__PURE__*/React.createElement("path", {
  d: "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-7.9c0-1.88-.04-4.3-2.62-4.3-2.63 0-3.03 2.05-3.03 4.17V23H8V8z"
}));
const IconInstagram = () => /*#__PURE__*/React.createElement("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("rect", {
  x: "2.5",
  y: "2.5",
  width: "19",
  height: "19",
  rx: "5",
  stroke: "currentColor",
  strokeWidth: "1.8"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "4.2",
  stroke: "currentColor",
  strokeWidth: "1.8"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "17.4",
  cy: "6.6",
  r: "1.3",
  fill: "currentColor"
}));
const IconYouTube = () => /*#__PURE__*/React.createElement("svg", {
  width: "17",
  height: "17",
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("rect", {
  x: "2",
  y: "5",
  width: "20",
  height: "14",
  rx: "4",
  stroke: "currentColor",
  strokeWidth: "1.8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M10 9.5v5l4.5-2.5L10 9.5z",
  fill: "currentColor"
}));
const IconClock = () => /*#__PURE__*/React.createElement("svg", {
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "9",
  stroke: "currentColor",
  strokeWidth: "1.7"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 7v5l3.5 2",
  stroke: "currentColor",
  strokeWidth: "1.7",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const IconCoins = () => /*#__PURE__*/React.createElement("svg", {
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("rect", {
  x: "2.5",
  y: "6",
  width: "19",
  height: "12",
  rx: "2",
  stroke: "currentColor",
  strokeWidth: "1.7"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "2.6",
  stroke: "currentColor",
  strokeWidth: "1.7"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5.5 9.5v5M18.5 9.5v5",
  stroke: "currentColor",
  strokeWidth: "1.7",
  strokeLinecap: "round"
}));
const IconShield = () => /*#__PURE__*/React.createElement("svg", {
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 3l7 2.8v5.4c0 4.4-2.9 7.4-7 9-4.1-1.6-7-4.6-7-9V5.8L12 3z",
  stroke: "currentColor",
  strokeWidth: "1.7",
  strokeLinejoin: "round"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9 12l2 2 4-4",
  stroke: "currentColor",
  strokeWidth: "1.7",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const Brand = () => /*#__PURE__*/React.createElement("div", {
  className: "brand-lockup"
}, /*#__PURE__*/React.createElement("span", {
  className: "k"
}, "Kontiva"), /*#__PURE__*/React.createElement("span", {
  className: "dot"
}, "."), /*#__PURE__*/React.createElement("span", {
  className: "ai"
}, "ai"));

// ---------- Reveal hook ----------
function useReveal(rootRef) {
  useEffect(() => {
    if (!rootRef.current) return;
    const items = rootRef.current.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, {
      threshold: 0.12
    });
    items.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}
const brl = n => n.toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0
});

// ---------- i18n ----------
const LangContext = React.createContext({
  lang: 'pt',
  setLang: () => {},
  t: window.KONTIVA_STR.pt
});
function useLangCtx() {
  return React.useContext(LangContext);
}
const LangToggle = ({
  dark
}) => {
  const {
    lang,
    setLang
  } = useLangCtx();
  return /*#__PURE__*/React.createElement("div", {
    className: 'lang-toggle' + (dark ? ' dark' : '')
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: lang === 'pt' ? 'on' : '',
    onClick: () => setLang('pt')
  }, "PT"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: lang === 'en' ? 'on' : '',
    onClick: () => setLang('en')
  }, "EN"));
};
Object.assign(window, {
  IconWhats,
  IconArrow,
  IconTick,
  IconRadar,
  IconDoc,
  IconBolt,
  IconPlug,
  IconChev,
  IconLinkedIn,
  IconInstagram,
  IconYouTube,
  IconClock,
  IconCoins,
  IconShield,
  Brand,
  useReveal,
  brl,
  LangContext,
  useLangCtx,
  LangToggle
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "v2/kontiva-base.jsx", error: String((e && e.message) || e) }); }

// v2/kontiva-i18n.js
try { (() => {
// Kontiva v2 — dicionário i18n PT/EN
window.KONTIVA_STR = {
  pt: {
    nav: {
      how: 'Como funciona',
      chat: 'Chat & MCP',
      calc: 'Calculadora',
      plans: 'Planos',
      faq: 'FAQ',
      whats: 'Falar no WhatsApp',
      whatsMsg: 'Olá, gostaria de conhecer a Kontiva.ai'
    },
    hero: {
      eyebrow: 'Contratos e cobrança com IA, de ponta a ponta',
      h1a: 'Seu contrato sabe',
      h1b: 'quanto cobrar.',
      h1c: 'A Kontiva ',
      h1serif: 'executa',
      sub: 'A Kontiva.ai lê seus contratos, calcula fixo, excedentes e reajustes, gera os boletos e concilia os pagamentos. Tudo automático — e você no controle do que aprova.',
      ctaWhats: 'Falar no WhatsApp',
      ctaWhatsMsg: 'Olá, quero conhecer a Kontiva.ai',
      ctaCalc: 'Ver quanto você perde',
      meta1: 'Conecta ao seu ERP e à sua plataforma de cobrança',
      meta2: 'Você aprova antes de cobrar',
      radarHead: 'Cobranças · Junho/2026',
      radarLive: 'Geração automática',
      radarSummary: 'Excedentes + reajustes neste ciclo',
      badges: {
        paid: 'Boleto pago',
        inpc: 'Reajuste INPC +5,2%',
        emp: '+2 funcionários',
        irpf: '+ IRPF dos sócios',
        sent: 'Boleto enviado',
        wait: 'Aguardando aprovação'
      }
    },
    problem: {
      eyebrow: 'O ponto cego',
      h2: 'Planilha não é sistema.',
      lead: 'O controle de contratos vive numa aba de Excel. Reajuste de janeiro, funcionário a mais na folha, serviço avulso de março — quem lembra de cobrar tudo? A Kontiva lembra.',
      file: 'contratos_2026.xlsx',
      before: 'Antes',
      after: 'Depois',
      panelTitle: 'Kontiva · Painel de contratos',
      cols: ['Cliente', 'Mensalidade', 'Último reajuste'],
      cap1: '3 campos em branco',
      cap2: '2 reajustes vencidos',
      cap3: 'última edição: há 47 dias',
      k1t: 'Construtora Horizonte',
      k1s: 'Reajuste IPCA aplicado na renovação de jan/26',
      k2t: 'Studio M Arquitetura',
      k2s: 'Serviço avulso de dez/25 incluído na fatura',
      k3t: 'Restaurante Pátio 22',
      k3s: '+3 funcionários na folha detectados via ERP',
      kTotal: 'Recuperado neste ciclo'
    },
    flow: {
      eyebrow: 'Como funciona',
      h2a: 'Do contrato',
      h2b: 'ao boleto pago.',
      step: 'PASSO',
      steps: [{
        title: 'Envie seus contratos',
        body: 'PDF, DOC, foto — qualquer formato. A IA extrai partes, objeto, valores fixos, variáveis e excedentes, datas de renovação e índices de reajuste. Tudo vira dado estruturado, consultável a qualquer momento.',
        chips: ['PDF', 'DOC', 'imagem']
      }, {
        title: 'Conecte o ERP — ou envie relatórios',
        body: 'A Kontiva extrai do seu sistema o volume de serviços prestados em cada período: funcionários na folha, filiais, faturamento, regime fiscal, serviços avulsos. É isso que define o excedente de cada contrato. Sem integração? Envie os relatórios em qualquer formato, que a gente processa.',
        chips: ['Domínio', 'Thomson Reuters', 'Totvs', 'SAP']
      }, {
        title: 'Cobrança calculada, detalhada, enviada',
        body: 'Fixo + excedentes + reajuste pelo índice do contrato (INPC, IGP-M), aplicado automaticamente na renovação. A fatura sai detalhada linha a linha — seu cliente vê exatamente o que está pagando. Você revisa antes e ajusta o que quiser: um desconto negociado, um valor diferente do calculado.',
        chips: ['Nibo', 'Asaas', 'Stripe', 'CNAB400 → qualquer banco']
      }, {
        title: 'Pagamento identificado. Ciclo fechado.',
        body: 'O cliente pagou, a Kontiva reconhece e registra. Sem caçar comprovante, sem bater extrato na mão. O próximo ciclo já começa sozinho.',
        chips: []
      }],
      illus: {
        docTag: 'PDF·DOC·IMG',
        fields: [['partes', 'Construtora Horizonte × Escritório'], ['valor fixo', 'R$ 3.820,00 / mês'], ['excedente', 'R$ 38 por funcionário > 20'], ['renovação', '12 meses · auto'], ['reajuste', 'INPC na renovação']],
        erpNodes: ['Folha · 23 funcionários', 'Filiais · 3', 'Faturamento · R$ 412 mil', 'Serviços avulsos · 4'],
        erpCenter: 'seu ERP',
        erpNote: 'ou envie os relatórios — a gente processa',
        invTitle: 'Fatura · Construtora Horizonte',
        invLines: [['Honorários (contrato)', 'R$ 3.820,00', false], ['Reajuste INPC +5,2%', 'R$ 198,00', true], ['+3 funcionários × R$ 38', 'R$ 114,00', true], ['Alteração contratual', 'R$ 350,00', true]],
        invTotal: 'Total',
        paidLabel: 'Pagamento conciliado',
        paidSub: 'boleto #8841 · R$ 4.482,00 · 12/jun'
      }
    },
    chat: {
      eyebrow: 'Chat & MCP',
      h2a: 'Tudo isso,',
      h2b: 'também por chat.',
      lead: 'Qualquer coisa que a interface faz, o chat também faz. Pergunte sobre a carteira, dê instruções, ajuste cobranças — em português, como você falaria com alguém da equipe.',
      mcpT: 'Prefere o seu chat de IA?',
      mcpS: 'Conecte o Claude ou o ChatGPT ao servidor MCP da Kontiva e opere tudo sem sair da sua IA preferida.',
      head: 'Kontiva · Chat',
      status: 'conectado',
      u1: 'Quantos contratos vencem no mês que vem?',
      b1a: '7 contratos',
      b1b: ' vencem em julho. 5 renovam automaticamente com reajuste INPC; 2 estão marcados para renegociação. Quer a lista?',
      u2: 'Dê R$ 500 de desconto na próxima fatura da Clínica Vitta — a multa foi nossa responsabilidade.',
      b2a: 'Feito. ',
      b2b: 'Desconto de R$ 500',
      b2c: ' aplicado à fatura de julho da Clínica Vitta, com a justificativa registrada no histórico.',
      u3: 'Quanto cobrei no mês passado de fixo e de adicionais?',
      b3a: 'Em maio: ',
      b3b: 'R$ 86.420',
      b3c: ' de honorários fixos e ',
      b3d: 'R$ 7.310',
      b3e: ' em excedentes e reajustes — 7,8% da receita veio de adicionais.'
    },
    agents: {
      eyebrow: 'Agentes de IA',
      h2a: 'Agentes de olho na carteira,',
      h2b: '24 horas por dia.',
      lead: 'Crie agentes de IA dentro da Kontiva que varrem sua carteira continuamente e agem sozinhos: avisam sobre renovações, disparam cobranças, rodam auditorias — e pedem sua aprovação quando precisam.',
      items: [{
        t: 'Avisos onde você trabalha',
        s: 'Renovações chegando, cobranças enviadas, divergências encontradas — direto no e-mail, Slack ou Teams.'
      }, {
        t: 'Aprovação a um clique',
        s: 'O agente pergunta antes de agir quando você quiser: aprovar reajuste, confirmar cobrança, autorizar desconto.'
      }, {
        t: 'Relatórios automáticos',
        s: 'Resumos periódicos da carteira para você — e relatórios de serviços prestados para os seus clientes.'
      }],
      feedHead: 'Atividade dos agentes',
      feedLive: 'Hoje',
      notes: [{
        ch: 'Slack',
        who: 'Agente · Renovações',
        body: 'Contrato da Padaria São Jorge renova em 15 dias. Aplicar reajuste INPC +4,8%?',
        a1: 'Aprovar',
        a2: 'Revisar'
      }, {
        ch: 'E-mail',
        who: 'Agente · Cobranças',
        body: '42 boletos de junho gerados e enviados ao Asaas. 38 já pagos.'
      }, {
        ch: 'Teams',
        who: 'Agente · Auditoria',
        body: 'Varredura concluída: 2 contratos com excedente não cobrado em maio.',
        a1: 'Ver detalhes'
      }, {
        ch: 'E-mail',
        who: 'Agente · Relatórios',
        body: 'Relatório mensal da carteira enviado para você e para 12 clientes.'
      }]
    },
    results: {
      eyebrow: 'Resultados',
      h2: 'O que muda no fim do mês',
      items: [{
        title: 'Centenas de horas de volta',
        body: 'Conferir contrato, calcular excedente, emitir boleto, bater pagamento — tudo isso deixa de ser trabalho manual da sua equipe.'
      }, {
        title: 'Zero dinheiro na mesa',
        body: 'Nenhum reajuste esquecido, nenhum serviço avulso sem fatura, nenhum excedente que passa batido. Se está no contrato, é cobrado.'
      }, {
        title: 'Zero erros, total transparência',
        body: 'A fatura sai detalhada linha a linha. Seu cliente vê exatamente o que paga — e o seu escritório ganha em profissionalismo.'
      }]
    },
    calc: {
      eyebrow: 'Calculadora',
      h2a: 'Quanto seu escritório',
      h2b: 'está deixando na mesa?',
      lead: 'Ajuste os valores do seu escritório. Não é chute — é a média que encontramos em carteiras parecidas com a sua.',
      note: 'Estimativa baseada em reajustes não aplicados, serviços extras não faturados e contratos vencidos. O valor real costuma ser maior. Economia de horas: 1,5 h/mês por cliente, a R$ 40/h de custo de analista contábil.',
      f1: 'Clientes ativos na carteira',
      f2: 'Ticket médio mensal',
      f3: 'Receita potencialmente perdida',
      f3note: 'Fixamos em 2% — o piso conservador do que encontramos em carteiras reais.',
      r1: 'Estimativa mensal',
      r3: 'por ano',
      r4: 'em economia de horas da sua equipe'
    },
    pricing: {
      eyebrow: 'Planos',
      h2a: 'Simples: um fixo',
      h2b: '+ um valor por cliente.',
      tag: 'Mais popular',
      perMonth: '/mês',
      perClient: 'por cliente gerenciado',
      limits: ['Até 10 clientes', 'Até 100 clientes', 'Clientes ilimitados'],
      cta: 'Começar com',
      ctaMsg: p => `Olá, tenho interesse no plano ${p} da Kontiva.ai`,
      note: 'Todos os planos incluem tudo: leitura de contratos, integração com ERP, cálculo de excedentes e reajustes, emissão e conciliação de cobranças, chat e servidor MCP. A diferença é só o tamanho da carteira.'
    },
    faq: {
      eyebrow: 'FAQ',
      h2: 'Perguntas frequentes',
      items: [{
        q: 'Em que formato envio meus contratos?',
        a: 'Qualquer um: PDF, DOC, imagem — até foto de contrato assinado em papel. A IA extrai partes, objeto, valores fixos e variáveis, excedentes, datas de renovação e índices de reajuste. Tudo vira dado estruturado, consultável a qualquer momento.'
      }, {
        q: 'Preciso integrar com meu ERP?',
        a: 'Não. A integração (Domínio, Thomson Reuters, Totvs, SAP e outros) automatiza a leitura do volume de serviços prestados, mas você também pode simplesmente enviar os relatórios em qualquer formato, que a Kontiva processa.'
      }, {
        q: 'Posso revisar as cobranças antes de enviar?',
        a: 'Sim. Você define o que sai automático e o que passa por aprovação. Negociou um desconto ou um valor diferente do calculado? Ajusta na hora — pela interface ou pelo chat.'
      }, {
        q: 'Como os boletos são emitidos e conciliados?',
        a: 'A Kontiva envia as cobranças para a sua plataforma (Nibo, Asaas, Stripe e outras) ou gera arquivo CNAB400 para qualquer banco. Quando o cliente paga, o pagamento é identificado e registrado automaticamente.'
      }, {
        q: 'E os reajustes de contrato?',
        a: 'Se o contrato renova com reajuste por índice (INPC, IGP-M etc.), o novo valor é calculado e incluído na cobrança automaticamente — com o reajuste detalhado na fatura, para total transparência com o seu cliente.'
      }, {
        q: 'Posso operar a Kontiva pelo Claude ou ChatGPT?',
        a: 'Sim. Conecte sua IA preferida ao servidor MCP da Kontiva e pergunte, instrua e ajuste cobranças sem sair do chat que você já usa.'
      }, {
        q: 'Como funciona a avaliação gratuita?',
        a: 'Você envia 5 contratos e os relatórios de execução do período, conta quanto cobrou de cada cliente — e devolvemos o cálculo do que deixou de ser cobrado. Sem custo e sem compromisso.'
      }]
    },
    cta: {
      eyebrow: 'Avaliação gratuita',
      h2a: 'Quanto você',
      h2b: 'deixou de cobrar?',
      h2hl: 'A gente calcula.',
      sub: 'Fazemos uma avaliação sem custo da sua carteira — e devolvemos um raio-X do que ficou na mesa.',
      steps: ['Envie 5 contratos de clientes', 'Junte os relatórios de execução do período', 'Diga quanto cobrou de cada um', 'Receba o cálculo do que deixou de cobrar'],
      whats: 'Chamar no WhatsApp',
      whatsMsg: 'Olá, quero a avaliação gratuita da minha carteira',
      formT: 'Peça sua avaliação gratuita',
      formS: 'Sem custo, sem compromisso. A gente te diz quanto você deixou de cobrar.',
      fName: 'Nome',
      fNamePh: 'Seu nome',
      fWhats: 'WhatsApp',
      fWhatsPh: '(11) 99999-9999',
      fEmail: 'E-mail',
      fEmailPh: 'voce@escritorio.com.br',
      fClients: 'Clientes na carteira',
      fClientsPh: '120',
      fMsg: 'Mensagem (opcional)',
      fMsgPh: 'Conte um pouco sobre o seu escritório',
      submit: 'Pedir avaliação gratuita',
      okT: 'Recebemos seu contato ✓',
      okS: 'Nossa equipe responde em até 1 dia útil com as instruções para enviar os contratos da avaliação.'
    },
    footer: {
      tagline: 'Gestão de contratos e cobrança com IA, de ponta a ponta, para escritórios de contabilidade.',
      whats: 'Chame agora no WhatsApp',
      whatsMsg: 'Olá, vim pelo site da Kontiva.ai',
      colProduct: 'Produto',
      colCompany: 'Empresa',
      colContact: 'Contato',
      lHow: 'Como funciona',
      lChat: 'Chat & MCP',
      lAgents: 'Agentes de IA',
      lCalc: 'Calculadora',
      lPlans: 'Planos',
      lFaq: 'FAQ',
      lEval: 'Avaliação gratuita',
      lEmail: 'contato@kontiva.ai',
      copyright: '© 2026 Kontiva.ai · Todos os direitos reservados.',
      bm: 'Kontiva é uma empresa BlueMetrics.',
      privacy: 'Política de Privacidade',
      terms: 'Termos de Uso'
    }
  },
  en: {
    nav: {
      how: 'How it works',
      chat: 'Chat & MCP',
      calc: 'Calculator',
      plans: 'Pricing',
      faq: 'FAQ',
      whats: 'Chat on WhatsApp',
      whatsMsg: 'Hi, I would like to learn more about Kontiva.ai'
    },
    hero: {
      eyebrow: 'AI-powered contracts & billing, end to end',
      h1a: 'Your contract knows',
      h1b: 'what to bill.',
      h1c: 'Kontiva ',
      h1serif: 'executes',
      sub: 'Kontiva.ai reads your contracts, calculates fixed fees, overages and index adjustments, issues the invoices and reconciles payments. Fully automated — with you in control of what gets approved.',
      ctaWhats: 'Chat on WhatsApp',
      ctaWhatsMsg: 'Hi, I want to learn more about Kontiva.ai',
      ctaCalc: 'See what you are losing',
      meta1: 'Connects to your ERP and billing platform',
      meta2: 'You approve before anything is billed',
      radarHead: 'Billing run · June 2026',
      radarLive: 'Auto-generating',
      radarSummary: 'Overages + adjustments this cycle',
      badges: {
        paid: 'Invoice paid',
        inpc: 'INPC adjustment +5.2%',
        emp: '+2 employees',
        irpf: "+ partners' tax returns",
        sent: 'Invoice sent',
        wait: 'Awaiting approval'
      }
    },
    problem: {
      eyebrow: 'The blind spot',
      h2: 'A spreadsheet is not a system.',
      lead: "Contract control lives in an Excel tab. January's adjustment, an extra employee on payroll, a one-off service in March — who remembers to bill it all? Kontiva does.",
      file: 'contracts_2026.xlsx',
      before: 'Before',
      after: 'After',
      panelTitle: 'Kontiva · Contracts dashboard',
      cols: ['Client', 'Monthly fee', 'Last adjustment'],
      cap1: '3 blank fields',
      cap2: '2 overdue adjustments',
      cap3: 'last edited: 47 days ago',
      k1t: 'Construtora Horizonte',
      k1s: 'IPCA adjustment applied on the Jan/26 renewal',
      k2t: 'Studio M Arquitetura',
      k2s: 'Dec/25 one-off service added to the invoice',
      k3t: 'Restaurante Pátio 22',
      k3s: '+3 payroll employees detected via ERP',
      kTotal: 'Recovered this cycle'
    },
    flow: {
      eyebrow: 'How it works',
      h2a: 'From contract',
      h2b: 'to paid invoice.',
      step: 'STEP',
      steps: [{
        title: 'Send us your contracts',
        body: 'PDF, DOC, photo — any format. The AI extracts parties, scope, fixed and variable fees, overage rules, renewal dates and adjustment indexes. Everything becomes structured data you can query anytime.',
        chips: ['PDF', 'DOC', 'image']
      }, {
        title: 'Connect your ERP — or send reports',
        body: "Kontiva pulls from your system the volume of services delivered in each period: payroll headcount, branches, revenue, tax regime, one-off services. That's what defines each contract's overages. No integration? Send the reports in any format and we'll process them.",
        chips: ['Domínio', 'Thomson Reuters', 'Totvs', 'SAP']
      }, {
        title: 'Billing calculated, itemized, delivered',
        body: "Fixed fee + overages + the contract's index adjustment (INPC, IGP-M), applied automatically on renewal. Invoices go out itemized line by line — your client sees exactly what they're paying for. You review first and adjust anything: a negotiated discount, a different amount.",
        chips: ['Nibo', 'Asaas', 'Stripe', 'CNAB400 → any bank']
      }, {
        title: 'Payment identified. Loop closed.',
        body: 'Your client pays, Kontiva recognizes and records it. No chasing receipts, no manual bank reconciliation. The next cycle starts on its own.',
        chips: []
      }],
      illus: {
        docTag: 'PDF·DOC·IMG',
        fields: [['parties', 'Construtora Horizonte × Firm'], ['fixed fee', 'R$ 3,820.00 / mo'], ['overage', 'R$ 38 per employee > 20'], ['renewal', '12 months · auto'], ['adjustment', 'INPC on renewal']],
        erpNodes: ['Payroll · 23 employees', 'Branches · 3', 'Revenue · R$ 412k', 'One-off services · 4'],
        erpCenter: 'your ERP',
        erpNote: "or send the reports — we'll process them",
        invTitle: 'Invoice · Construtora Horizonte',
        invLines: [['Retainer (contract)', 'R$ 3,820.00', false], ['INPC adjustment +5.2%', 'R$ 198.00', true], ['+3 employees × R$ 38', 'R$ 114.00', true], ['Contract amendment', 'R$ 350.00', true]],
        invTotal: 'Total',
        paidLabel: 'Payment reconciled',
        paidSub: 'invoice #8841 · R$ 4,482.00 · Jun 12'
      }
    },
    chat: {
      eyebrow: 'Chat & MCP',
      h2a: 'All of it,',
      h2b: 'by chat too.',
      lead: "Anything the interface does, the chat does too. Ask about your portfolio, give instructions, adjust invoices — in plain language, like you'd talk to someone on your team.",
      mcpT: 'Prefer your own AI chat?',
      mcpS: "Connect Claude or ChatGPT to Kontiva's MCP server and run everything without leaving your favorite AI.",
      head: 'Kontiva · Chat',
      status: 'connected',
      u1: 'How many contracts expire next month?',
      b1a: '7 contracts',
      b1b: ' expire in July. 5 renew automatically with INPC adjustment; 2 are flagged for renegotiation. Want the list?',
      u2: 'Give Clínica Vitta a R$ 500 discount on the next invoice — the fine was our responsibility.',
      b2a: 'Done. ',
      b2b: 'R$ 500 discount',
      b2c: " applied to Clínica Vitta's July invoice, with the justification logged in the history.",
      u3: 'How much did I bill last month, fixed vs. extras?',
      b3a: 'In May: ',
      b3b: 'R$ 86,420',
      b3c: ' in fixed retainers and ',
      b3d: 'R$ 7,310',
      b3e: ' in overages and adjustments — 7.8% of revenue came from extras.'
    },
    agents: {
      eyebrow: 'AI agents',
      h2a: 'Agents watching your portfolio,',
      h2b: 'around the clock.',
      lead: 'Create AI agents inside Kontiva that continuously sweep your portfolio and act on their own: they flag renewals, dispatch billing, run audits — and ask for your approval when needed.',
      items: [{
        t: 'Alerts where you work',
        s: 'Upcoming renewals, invoices sent, discrepancies found — straight to email, Slack or Teams.'
      }, {
        t: 'One-click approvals',
        s: 'The agent asks before acting whenever you want: approve an adjustment, confirm a charge, authorize a discount.'
      }, {
        t: 'Automatic reports',
        s: 'Periodic portfolio summaries for you — and service reports for your clients.'
      }],
      feedHead: 'Agent activity',
      feedLive: 'Today',
      notes: [{
        ch: 'Slack',
        who: 'Agent · Renewals',
        body: "Padaria São Jorge's contract renews in 15 days. Apply INPC adjustment +4.8%?",
        a1: 'Approve',
        a2: 'Review'
      }, {
        ch: 'Email',
        who: 'Agent · Billing',
        body: '42 June invoices generated and sent to Asaas. 38 already paid.'
      }, {
        ch: 'Teams',
        who: 'Agent · Audit',
        body: 'Sweep complete: 2 contracts with unbilled overages in May.',
        a1: 'View details'
      }, {
        ch: 'Email',
        who: 'Agent · Reports',
        body: 'Monthly portfolio report sent to you and 12 clients.'
      }]
    },
    results: {
      eyebrow: 'Outcomes',
      h2: 'What changes at month-end',
      items: [{
        title: 'Hundreds of hours back',
        body: "Checking contracts, calculating overages, issuing invoices, matching payments — none of it is your team's manual work anymore."
      }, {
        title: 'Zero money on the table',
        body: "No forgotten adjustment, no unbilled one-off service, no overage slipping through. If it's in the contract, it gets billed."
      }, {
        title: 'Zero errors, full transparency',
        body: 'Invoices go out itemized line by line. Your clients see exactly what they pay for — and your firm looks sharper for it.'
      }]
    },
    calc: {
      eyebrow: 'Calculator',
      h2a: 'How much is your firm',
      h2b: 'leaving on the table?',
      lead: "Adjust the numbers for your firm. It's not a guess — it's the average we find in portfolios like yours.",
      note: 'Estimate based on unapplied adjustments, unbilled extra services and expired contracts. The real number is usually higher. Hour savings assume 1.5 h/month per client at a R$ 40/h accounting analyst cost.',
      f1: 'Active clients in your portfolio',
      f2: 'Average monthly fee',
      f3: 'Revenue potentially lost',
      f3note: 'Fixed at 2% — the conservative floor of what we find in real portfolios.',
      r1: 'Monthly estimate',
      r3: 'per year',
      r4: 'in team hours saved'
    },
    pricing: {
      eyebrow: 'Pricing',
      h2a: 'Simple: a base fee',
      h2b: '+ a per-client rate.',
      tag: 'Most popular',
      perMonth: '/mo',
      perClient: 'per managed client',
      limits: ['Up to 10 clients', 'Up to 100 clients', 'Unlimited clients'],
      cta: 'Start with',
      ctaMsg: p => `Hi, I'm interested in Kontiva.ai's ${p} plan`,
      note: 'Every plan includes everything: contract reading, ERP integration, overage and adjustment calculation, invoicing and reconciliation, chat and MCP server. The only difference is portfolio size.'
    },
    faq: {
      eyebrow: 'FAQ',
      h2: 'Frequently asked questions',
      items: [{
        q: 'What format should my contracts be in?',
        a: 'Any format: PDF, DOC, image — even a photo of a paper contract. The AI extracts parties, scope, fixed and variable fees, overage rules, renewal dates and adjustment indexes. Everything becomes structured, queryable data.'
      }, {
        q: 'Do I need to integrate with my ERP?',
        a: 'No. The integration (Domínio, Thomson Reuters, Totvs, SAP and others) automates reading the volume of services delivered, but you can also simply send the reports in any format and Kontiva will process them.'
      }, {
        q: 'Can I review invoices before they go out?',
        a: 'Yes. You decide what goes out automatically and what requires approval. Negotiated a discount or a different amount? Adjust it on the spot — through the interface or the chat.'
      }, {
        q: 'How are invoices issued and reconciled?',
        a: 'Kontiva sends charges to your billing platform (Nibo, Asaas, Stripe and others) or generates a CNAB400 file for any bank. When your client pays, the payment is identified and recorded automatically.'
      }, {
        q: 'What about contract adjustments?',
        a: 'If the contract renews with an index adjustment (INPC, IGP-M, etc.), the new amount is calculated and included in the billing automatically — with the adjustment itemized on the invoice, for full transparency with your client.'
      }, {
        q: 'Can I run Kontiva from Claude or ChatGPT?',
        a: "Yes. Connect your favorite AI to Kontiva's MCP server and ask questions, give instructions and adjust invoices without leaving the chat you already use."
      }, {
        q: 'How does the free assessment work?',
        a: "Send us 5 contracts and the period's service reports, tell us what you billed each client — and we'll send back the math on what went unbilled. Free, no strings attached."
      }]
    },
    cta: {
      eyebrow: 'Free assessment',
      h2a: 'How much did you',
      h2b: 'leave unbilled?',
      h2hl: "We'll do the math.",
      sub: "We'll run a free assessment of your portfolio — and send back an X-ray of what was left on the table.",
      steps: ["Send 5 client contracts", "Gather the period's service reports", 'Tell us what you billed each one', 'Get the math on what went unbilled'],
      whats: 'Chat on WhatsApp',
      whatsMsg: 'Hi, I want the free assessment of my portfolio',
      formT: 'Request your free assessment',
      formS: "Free, no strings attached. We'll tell you how much went unbilled.",
      fName: 'Name',
      fNamePh: 'Your name',
      fWhats: 'WhatsApp',
      fWhatsPh: '+55 (11) 99999-9999',
      fEmail: 'Email',
      fEmailPh: 'you@yourfirm.com',
      fClients: 'Clients in portfolio',
      fClientsPh: '120',
      fMsg: 'Message (optional)',
      fMsgPh: 'Tell us a bit about your firm',
      submit: 'Request free assessment',
      okT: 'We got your message ✓',
      okS: 'Our team replies within 1 business day with instructions for sending the assessment contracts.'
    },
    footer: {
      tagline: 'AI-powered contract and billing management, end to end, for accounting firms.',
      whats: 'Chat with us on WhatsApp',
      whatsMsg: 'Hi, I came from the Kontiva.ai website',
      colProduct: 'Product',
      colCompany: 'Company',
      colContact: 'Contact',
      lHow: 'How it works',
      lChat: 'Chat & MCP',
      lAgents: 'AI agents',
      lCalc: 'Calculator',
      lPlans: 'Pricing',
      lFaq: 'FAQ',
      lEval: 'Free assessment',
      lEmail: 'contato@kontiva.ai',
      copyright: '© 2026 Kontiva.ai · All rights reserved.',
      bm: 'Kontiva is a BlueMetrics company.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use'
    }
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "v2/kontiva-i18n.js", error: String((e && e.message) || e) }); }

// v2/kontiva-sections-a.jsx
try { (() => {
// Kontiva v2 — seções A: Nav, Hero, Problema, Fluxo (como funciona)
// (hooks useState/useEffect/useRef vêm de kontiva-base.jsx — escopo global compartilhado)

const wa = msg => `https://wa.me/5511999999999?text=${encodeURIComponent(msg)}`;

// ---------- Nav ----------
const Nav = ({
  navStyle
}) => {
  const {
    t
  } = useLangCtx();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const dark = navStyle === 'dark' && !scrolled;
  return /*#__PURE__*/React.createElement("nav", {
    className: 'nav' + (dark ? ' nav-dark' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "shell nav-inner"
  }, /*#__PURE__*/React.createElement(Brand, null), /*#__PURE__*/React.createElement("div", {
    className: "nav-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#como-funciona"
  }, t.nav.how), /*#__PURE__*/React.createElement("a", {
    href: "#chat"
  }, t.nav.chat), /*#__PURE__*/React.createElement("a", {
    href: "#calculadora"
  }, t.nav.calc), /*#__PURE__*/React.createElement("a", {
    href: "#planos"
  }, t.nav.plans), /*#__PURE__*/React.createElement("a", {
    href: "#faq"
  }, t.nav.faq)), /*#__PURE__*/React.createElement(LangToggle, null), /*#__PURE__*/React.createElement("a", {
    href: wa(t.nav.whatsMsg),
    target: "_blank",
    rel: "noreferrer",
    className: "btn btn-primary",
    style: {
      padding: '10px 18px',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement(IconWhats, null), " ", t.nav.whats))));
};

// ---------- Hero ----------
const radarRows = t => [{
  idx: '001',
  name: 'Padaria São Jorge ME',
  amount: 'R$ 1.240,00',
  flagged: false,
  badge: t.hero.badges.paid
}, {
  idx: '002',
  name: 'Construtora Horizonte Ltda.',
  amount: 'R$ 4.018,00',
  flagged: true,
  badge: t.hero.badges.inpc
}, {
  idx: '003',
  name: 'Clínica Vitta Serviços',
  amount: 'R$ 2.450,00',
  flagged: true,
  badge: t.hero.badges.emp
}, {
  idx: '004',
  name: 'Mercado Bom Preço',
  amount: 'R$ 980,00',
  flagged: false,
  badge: t.hero.badges.paid
}, {
  idx: '005',
  name: 'Studio M Arquitetura',
  amount: 'R$ 2.140,00',
  flagged: true,
  badge: t.hero.badges.irpf
}, {
  idx: '006',
  name: 'Transportes Aurora S.A.',
  amount: 'R$ 4.500,00',
  flagged: false,
  badge: t.hero.badges.sent
}, {
  idx: '007',
  name: 'Restaurante Pátio 22',
  amount: 'R$ 757,00',
  flagged: false,
  badge: t.hero.badges.wait
}];
const RadarCard = () => {
  const {
    t
  } = useLangCtx();
  return /*#__PURE__*/React.createElement("div", {
    className: "radar-card reveal delay-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "radar-head"
  }, /*#__PURE__*/React.createElement("span", null, t.hero.radarHead), /*#__PURE__*/React.createElement("span", {
    className: "live"
  }, t.hero.radarLive)), /*#__PURE__*/React.createElement("div", {
    className: "radar-list"
  }, radarRows(t).map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "radar-row" + (r.flagged ? " flagged" : "")
  }, /*#__PURE__*/React.createElement("span", {
    className: "idx"
  }, "#", r.idx), /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, r.name), /*#__PURE__*/React.createElement("span", {
    className: "amount"
  }, r.amount), /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, r.badge)))), /*#__PURE__*/React.createElement("div", {
    className: "radar-summary"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, t.hero.radarSummary)), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, "+R$ 3.245", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      opacity: 0.6
    }
  }, ",00"))));
};
const Hero = () => {
  const {
    t
  } = useLangCtx();
  const ref = useRef(null);
  useReveal(ref);
  return /*#__PURE__*/React.createElement("section", {
    className: "hero",
    ref: ref,
    id: "hero",
    "data-screen-label": "Hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shell hero-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow reveal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " ", t.hero.eyebrow), /*#__PURE__*/React.createElement("h1", {
    className: "reveal delay-1",
    style: {
      marginTop: 24
    }
  }, t.hero.h1a, /*#__PURE__*/React.createElement("br", null), t.hero.h1b, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, t.hero.h1c, /*#__PURE__*/React.createElement("em", {
    className: "serif-accent"
  }, t.hero.h1serif), /*#__PURE__*/React.createElement("span", {
    className: "ai-dot"
  }, "."))), /*#__PURE__*/React.createElement("p", {
    className: "lead hero-sub reveal delay-2"
  }, t.hero.sub), /*#__PURE__*/React.createElement("div", {
    className: "hero-cta-row reveal delay-3"
  }, /*#__PURE__*/React.createElement("a", {
    href: wa(t.hero.ctaWhatsMsg),
    target: "_blank",
    rel: "noreferrer",
    className: "btn btn-primary"
  }, /*#__PURE__*/React.createElement(IconWhats, null), " ", t.hero.ctaWhats), /*#__PURE__*/React.createElement("a", {
    href: "#calculadora",
    className: "btn btn-ghost"
  }, t.hero.ctaCalc, " ", /*#__PURE__*/React.createElement(IconArrow, null))), /*#__PURE__*/React.createElement("div", {
    className: "hero-meta reveal delay-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "tick"
  }, /*#__PURE__*/React.createElement(IconTick, null)), " ", t.hero.meta1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "tick"
  }, /*#__PURE__*/React.createElement(IconTick, null)), " ", t.hero.meta2))), /*#__PURE__*/React.createElement(RadarCard, null)));
};

// ---------- Problem ----------
const Problem = () => {
  const {
    t
  } = useLangCtx();
  const p = t.problem;
  const ref = useRef(null);
  useReveal(ref);
  return /*#__PURE__*/React.createElement("section", {
    className: "problem",
    id: "problema",
    ref: ref,
    "data-screen-label": "O problema"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " ", p.eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 20
    }
  }, p.h2, /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      marginTop: 20
    }
  }, p.lead)), /*#__PURE__*/React.createElement("div", {
    className: "split"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel before reveal delay-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, p.file), /*#__PURE__*/React.createElement("div", {
    className: "panel-tag"
  }, p.before)), /*#__PURE__*/React.createElement("div", {
    className: "sheet"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet-row head"
  }, /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null, p.cols[0]), /*#__PURE__*/React.createElement("div", null, p.cols[1]), /*#__PURE__*/React.createElement("div", null, p.cols[2])), /*#__PURE__*/React.createElement("div", {
    className: "sheet-row"
  }, /*#__PURE__*/React.createElement("div", null, "1"), /*#__PURE__*/React.createElement("div", null, "Construtora Horizonte"), /*#__PURE__*/React.createElement("div", null, "3.820,00"), /*#__PURE__*/React.createElement("div", {
    className: "err"
  }, "?")), /*#__PURE__*/React.createElement("div", {
    className: "sheet-row"
  }, /*#__PURE__*/React.createElement("div", null, "2"), /*#__PURE__*/React.createElement("div", null, "Studio M Arquitetura"), /*#__PURE__*/React.createElement("div", null, "1.640,00"), /*#__PURE__*/React.createElement("div", {
    className: "err"
  }, "nov/2024")), /*#__PURE__*/React.createElement("div", {
    className: "sheet-row"
  }, /*#__PURE__*/React.createElement("div", null, "3"), /*#__PURE__*/React.createElement("div", null, "Padaria S\xE3o Jorge"), /*#__PURE__*/React.createElement("div", null, "1.240,00"), /*#__PURE__*/React.createElement("div", null, "jan/2026")), /*#__PURE__*/React.createElement("div", {
    className: "sheet-row"
  }, /*#__PURE__*/React.createElement("div", null, "4"), /*#__PURE__*/React.createElement("div", null, "Restaurante P\xE1tio 22"), /*#__PURE__*/React.createElement("div", null, "720,00"), /*#__PURE__*/React.createElement("div", {
    className: "err"
  }, "\u2014")), /*#__PURE__*/React.createElement("div", {
    className: "sheet-row"
  }, /*#__PURE__*/React.createElement("div", null, "5"), /*#__PURE__*/React.createElement("div", {
    className: "faded"
  }, "Mercado Bom Pre\xE7o"), /*#__PURE__*/React.createElement("div", {
    className: "faded"
  }, "980,00"), /*#__PURE__*/React.createElement("div", {
    className: "faded"
  }, "jan/2026")), /*#__PURE__*/React.createElement("div", {
    className: "sheet-row"
  }, /*#__PURE__*/React.createElement("div", null, "6"), /*#__PURE__*/React.createElement("div", {
    className: "blank"
  }, "\xA0"), /*#__PURE__*/React.createElement("div", {
    className: "blank"
  }, "\xA0"), /*#__PURE__*/React.createElement("div", {
    className: "blank"
  }, "\xA0"))), /*#__PURE__*/React.createElement("div", {
    className: "sheet-caption"
  }, /*#__PURE__*/React.createElement("span", null, p.cap1), /*#__PURE__*/React.createElement("span", null, p.cap2), /*#__PURE__*/React.createElement("span", {
    className: "muted"
  }, p.cap3))), /*#__PURE__*/React.createElement("div", {
    className: "panel after reveal delay-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, p.panelTitle), /*#__PURE__*/React.createElement("div", {
    className: "panel-tag"
  }, p.after)), /*#__PURE__*/React.createElement("div", {
    className: "k-stack"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-ico"
  }, /*#__PURE__*/React.createElement(IconRadar, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "k-title"
  }, p.k1t), /*#__PURE__*/React.createElement("div", {
    className: "k-sub"
  }, p.k1s))), /*#__PURE__*/React.createElement("div", {
    className: "k-val"
  }, "+R$ 318")), /*#__PURE__*/React.createElement("div", {
    className: "k-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-ico"
  }, /*#__PURE__*/React.createElement(IconDoc, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "k-title"
  }, p.k2t), /*#__PURE__*/React.createElement("div", {
    className: "k-sub"
  }, p.k2s))), /*#__PURE__*/React.createElement("div", {
    className: "k-val"
  }, "+R$ 1.240")), /*#__PURE__*/React.createElement("div", {
    className: "k-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-ico"
  }, /*#__PURE__*/React.createElement(IconBolt, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "k-title"
  }, p.k3t), /*#__PURE__*/React.createElement("div", {
    className: "k-sub"
  }, p.k3s))), /*#__PURE__*/React.createElement("div", {
    className: "k-val"
  }, "+R$ 86")), /*#__PURE__*/React.createElement("div", {
    className: "k-card",
    style: {
      background: 'color-mix(in oklab, var(--ciano) calc(14% * var(--accent-boost)), transparent)',
      borderColor: 'color-mix(in oklab, var(--ciano) 40%, transparent)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-left"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'rgba(234,246,255,0.7)'
    }
  }, p.kTotal)), /*#__PURE__*/React.createElement("div", {
    className: "k-val",
    style: {
      fontSize: 22
    }
  }, "R$ 3.245,00")))))));
};

// ---------- Flow (como funciona) ----------
const FlowIllusExtract = ({
  il
}) => /*#__PURE__*/React.createElement("div", {
  className: "flow-illus"
}, /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    inset: 0,
    background: 'repeating-linear-gradient(135deg, transparent 0 12px, rgba(0,212,255,0.05) 12px 13px)'
  }
}), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    left: 28,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 88,
    height: 116,
    borderRadius: 10,
    background: 'linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.02))',
    border: '1px solid rgba(0,212,255,0.3)',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: '16px 12px',
    boxShadow: '0 0 30px rgba(0,212,255,0.15)'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    height: 3,
    background: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    width: '80%'
  }
}), /*#__PURE__*/React.createElement("div", {
  style: {
    height: 3,
    background: 'rgba(255,255,255,0.12)',
    borderRadius: 2,
    width: '60%'
  }
}), /*#__PURE__*/React.createElement("div", {
  style: {
    height: 3,
    background: 'rgba(255,255,255,0.12)',
    borderRadius: 2,
    width: '70%'
  }
}), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 'auto',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 9,
    color: 'var(--ciano)',
    letterSpacing: '0.1em'
  }
}, il.docTag)), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    left: 132,
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--ciano)',
    fontSize: 18,
    opacity: 0.8
  }
}, "\u2192"), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    left: 160,
    right: 24,
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: 7
  }
}, il.fields.map((f, i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  style: {
    display: 'flex',
    gap: 10,
    alignItems: 'baseline',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 10,
    padding: '6px 10px',
    borderRadius: 6,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--ciano)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    flexShrink: 0
  }
}, f[0]), /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'rgba(234,246,255,0.75)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
}, f[1])))));
const FlowIllusERP = ({
  il
}) => /*#__PURE__*/React.createElement("div", {
  className: "flow-illus"
}, /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(300px circle at 50% 50%, rgba(0,212,255,0.1), transparent 65%)'
  }
}), [{
  x: '8%',
  y: 22
}, {
  x: '60%',
  y: 16
}, {
  x: '12%',
  y: 158
}, {
  x: '58%',
  y: 164
}].map((n, i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  style: {
    position: 'absolute',
    left: n.x,
    top: n.y,
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 10,
    padding: '6px 11px',
    borderRadius: 99,
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(0,212,255,0.25)',
    color: 'rgba(234,246,255,0.8)',
    whiteSpace: 'nowrap'
  }
}, il.erpNodes[i])), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    padding: '12px 20px',
    borderRadius: 12,
    background: 'var(--ciano)',
    color: 'var(--azul-profundo)',
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: '-0.01em',
    boxShadow: '0 0 40px rgba(0,212,255,0.4)'
  }
}, il.erpCenter), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 9,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(234,246,255,0.45)',
    fontFamily: 'JetBrains Mono, monospace'
  }
}, il.erpNote));
const FlowIllusInvoice = ({
  il
}) => /*#__PURE__*/React.createElement("div", {
  className: "flow-illus"
}, /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    width: 'min(320px, 84%)',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: '16px 18px',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 11
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 9,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(234,246,255,0.5)',
    marginBottom: 10
  }
}, il.invTitle), il.invLines.map((l, i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 12,
    padding: '6px 0',
    borderBottom: '1px dashed rgba(255,255,255,0.08)',
    color: l[2] ? 'var(--ciano)' : 'rgba(234,246,255,0.75)'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
}, l[0]), /*#__PURE__*/React.createElement("span", {
  style: {
    flexShrink: 0
  }
}, l[1]))), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 10,
    fontWeight: 700,
    color: '#EAF6FF'
  }
}, /*#__PURE__*/React.createElement("span", null, il.invTotal), /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--ciano)'
  }
}, "R$ 4.482,00"))));
const FlowIllusPaid = ({
  il
}) => /*#__PURE__*/React.createElement("div", {
  className: "flow-illus"
}, /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(360px circle at 50% 100%, rgba(0,212,255,0.14), transparent 60%)'
  }
}), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 14,
    width: '100%'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: 'color-mix(in oklab, var(--ciano) 22%, transparent)',
    border: '1px solid var(--ciano)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--ciano)',
    boxShadow: '0 0 40px rgba(0,212,255,0.3)'
  }
}, /*#__PURE__*/React.createElement("svg", {
  width: "26",
  height: "26",
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M5 12l5 5L20 7",
  stroke: "currentColor",
  strokeWidth: "2.4",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}))), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 12,
    color: 'var(--ciano)',
    letterSpacing: '0.12em',
    textTransform: 'uppercase'
  }
}, il.paidLabel), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 11,
    color: 'rgba(234,246,255,0.55)',
    fontFamily: 'JetBrains Mono, monospace'
  }
}, il.paidSub)));
const flowIllusComponents = [FlowIllusExtract, FlowIllusERP, FlowIllusInvoice, FlowIllusPaid];
const Flow = () => {
  const {
    t
  } = useLangCtx();
  const ref = useRef(null);
  useReveal(ref);
  return /*#__PURE__*/React.createElement("section", {
    className: "flow",
    id: "como-funciona",
    ref: ref,
    "data-screen-label": "Como funciona"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " ", t.flow.eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 20
    }
  }, t.flow.h2a, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--cinza-texto)'
    }
  }, t.flow.h2b))), /*#__PURE__*/React.createElement("div", {
    className: "flow-list"
  }, t.flow.steps.map((s, i) => {
    const Illus = flowIllusComponents[i];
    return /*#__PURE__*/React.createElement("div", {
      className: `flow-step reveal delay-${Math.min(i, 2)}`,
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      className: "flow-num"
    }, t.flow.step, " 0", i + 1), /*#__PURE__*/React.createElement("div", {
      className: "flow-body"
    }, /*#__PURE__*/React.createElement("h3", null, s.title), /*#__PURE__*/React.createElement("p", null, s.body), s.chips.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "flow-chips"
    }, s.chips.map((c, j) => /*#__PURE__*/React.createElement("span", {
      className: "flow-chip",
      key: j
    }, c)))), /*#__PURE__*/React.createElement(Illus, {
      il: t.flow.illus
    }));
  }))));
};
Object.assign(window, {
  Nav,
  Hero,
  Problem,
  Flow,
  wa
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "v2/kontiva-sections-a.jsx", error: String((e && e.message) || e) }); }

// v2/kontiva-sections-b.jsx
try { (() => {
// Kontiva v2 — seções B: Chat+MCP, Resultados, Calculadora, Planos
// (hooks useState/useEffect/useRef vêm de kontiva-base.jsx — escopo global compartilhado)

// ---------- Chat + MCP ----------
const ChatSection = () => {
  const {
    t
  } = useLangCtx();
  const c = t.chat;
  const ref = useRef(null);
  useReveal(ref);
  return /*#__PURE__*/React.createElement("section", {
    className: "chat-section",
    id: "chat",
    ref: ref,
    "data-screen-label": "Chat e MCP"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shell chat-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow reveal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " ", c.eyebrow), /*#__PURE__*/React.createElement("h2", {
    className: "reveal delay-1",
    style: {
      marginTop: 20
    }
  }, c.h2a, /*#__PURE__*/React.createElement("br", null), c.h2b), /*#__PURE__*/React.createElement("p", {
    className: "lead reveal delay-2",
    style: {
      marginTop: 24,
      maxWidth: 480
    }
  }, c.lead), /*#__PURE__*/React.createElement("div", {
    className: "mcp-card reveal delay-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-ico"
  }, /*#__PURE__*/React.createElement(IconPlug, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, c.mcpT), /*#__PURE__*/React.createElement("div", {
    className: "s"
  }, c.mcpS)))), /*#__PURE__*/React.createElement("div", {
    className: "chat-window reveal delay-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chat-head"
  }, /*#__PURE__*/React.createElement("span", null, c.head), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ciano)'
    }
  }, c.status)), /*#__PURE__*/React.createElement("div", {
    className: "bubble user"
  }, c.u1), /*#__PURE__*/React.createElement("div", {
    className: "bubble bot"
  }, /*#__PURE__*/React.createElement("b", null, c.b1a), c.b1b), /*#__PURE__*/React.createElement("div", {
    className: "bubble user"
  }, c.u2), /*#__PURE__*/React.createElement("div", {
    className: "bubble bot"
  }, c.b2a, /*#__PURE__*/React.createElement("b", null, c.b2b), c.b2c), /*#__PURE__*/React.createElement("div", {
    className: "bubble user"
  }, c.u3), /*#__PURE__*/React.createElement("div", {
    className: "bubble bot"
  }, c.b3a, /*#__PURE__*/React.createElement("b", null, c.b3b), c.b3c, /*#__PURE__*/React.createElement("b", null, c.b3d), c.b3e))));
};

// ---------- Agentes de IA ----------
const Agents = () => {
  const {
    t
  } = useLangCtx();
  const a = t.agents;
  const icons = [/*#__PURE__*/React.createElement(IconRadar, null), /*#__PURE__*/React.createElement(IconTick, null), /*#__PURE__*/React.createElement(IconDoc, null)];
  const ref = useRef(null);
  useReveal(ref);
  return /*#__PURE__*/React.createElement("section", {
    className: "agents",
    id: "agentes",
    ref: ref,
    "data-screen-label": "Agentes de IA"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shell agents-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow reveal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " ", a.eyebrow), /*#__PURE__*/React.createElement("h2", {
    className: "reveal delay-1",
    style: {
      marginTop: 20
    }
  }, a.h2a, /*#__PURE__*/React.createElement("br", null), a.h2b), /*#__PURE__*/React.createElement("p", {
    className: "lead reveal delay-2",
    style: {
      marginTop: 24,
      maxWidth: 500
    }
  }, a.lead), /*#__PURE__*/React.createElement("div", {
    className: "agent-points reveal delay-3"
  }, a.items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    className: "agent-point",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-ico-light"
  }, icons[i]), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, it.t), /*#__PURE__*/React.createElement("div", {
    className: "s"
  }, it.s)))))), /*#__PURE__*/React.createElement("div", {
    className: "agent-feed reveal delay-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feed-head"
  }, /*#__PURE__*/React.createElement("span", null, a.feedHead), /*#__PURE__*/React.createElement("span", {
    className: "live"
  }, a.feedLive)), a.notes.map((n, i) => /*#__PURE__*/React.createElement("div", {
    className: "agent-note",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "row1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "who"
  }, n.who), /*#__PURE__*/React.createElement("span", {
    className: "ch"
  }, n.ch)), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, n.body), (n.a1 || n.a2) && /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, n.a1 && /*#__PURE__*/React.createElement("span", {
    className: "a1"
  }, n.a1), n.a2 && /*#__PURE__*/React.createElement("span", {
    className: "a2"
  }, n.a2)))))));
};

// ---------- Resultados ----------
const Results = () => {
  const {
    t
  } = useLangCtx();
  const resIcons = [/*#__PURE__*/React.createElement(IconClock, null), /*#__PURE__*/React.createElement(IconCoins, null), /*#__PURE__*/React.createElement(IconShield, null)];
  const ref = useRef(null);
  useReveal(ref);
  return /*#__PURE__*/React.createElement("section", {
    className: "results",
    id: "resultados",
    ref: ref,
    "data-screen-label": "Resultados"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " ", t.results.eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 20
    }
  }, t.results.h2)), /*#__PURE__*/React.createElement("div", {
    className: "res-grid"
  }, t.results.items.map((r, i) => /*#__PURE__*/React.createElement("div", {
    className: `res-item reveal delay-${i + 1}`,
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "res-ico"
  }, resIcons[i]), /*#__PURE__*/React.createElement("h3", null, r.title), /*#__PURE__*/React.createElement("p", null, r.body))))));
};

// ---------- Calculadora ----------
const Calculator = () => {
  const {
    t,
    lang
  } = useLangCtx();
  const c = t.calc;
  const [clientes, setClientes] = useState(180);
  const [ticket, setTicket] = useState(850);
  const perc = 2; // fixo — piso conservador
  const HORAS_POR_CLIENTE = 1.5; // h/mês de trabalho manual por cliente
  const CUSTO_HORA = 40; // R$/h de analista contábil
  const ref = useRef(null);
  useReveal(ref);
  const perdaMes = Math.round(clientes * ticket * (perc / 100));
  const perdaAno = perdaMes * 12;
  const economiaMes = Math.round(clientes * HORAS_POR_CLIENTE * CUSTO_HORA);
  const fill = (val, min, max) => `${((val - min) / (max - min) * 100).toFixed(1)}%`;
  return /*#__PURE__*/React.createElement("section", {
    className: "calc",
    id: "calculadora",
    ref: ref,
    "data-screen-label": "Calculadora"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shell calc-wrap"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow reveal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " ", c.eyebrow), /*#__PURE__*/React.createElement("h2", {
    className: "reveal delay-1",
    style: {
      marginTop: 20
    }
  }, c.h2a, /*#__PURE__*/React.createElement("br", null), c.h2b), /*#__PURE__*/React.createElement("p", {
    className: "lead reveal delay-2",
    style: {
      marginTop: 24,
      maxWidth: 480
    }
  }, c.lead), /*#__PURE__*/React.createElement("p", {
    className: "reveal delay-3",
    style: {
      marginTop: 28,
      fontSize: 13,
      color: 'var(--cinza-texto)',
      maxWidth: 460
    }
  }, c.note)), /*#__PURE__*/React.createElement("div", {
    className: "calc-card reveal delay-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "calc-field"
  }, /*#__PURE__*/React.createElement("label", null, c.f1, " ", /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, clientes)), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "100",
    max: "600",
    step: "10",
    value: clientes,
    onChange: e => setClientes(+e.target.value),
    style: {
      '--fill': fill(clientes, 100, 600)
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "calc-field"
  }, /*#__PURE__*/React.createElement("label", null, c.f2, " ", /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, brl(ticket))), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "300",
    max: "3000",
    step: "50",
    value: ticket,
    onChange: e => setTicket(+e.target.value),
    style: {
      '--fill': fill(ticket, 300, 3000)
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "calc-field calc-fixed"
  }, /*#__PURE__*/React.createElement("label", null, c.f3, " ", /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, perc, "%")), /*#__PURE__*/React.createElement("p", {
    className: "calc-fixed-note"
  }, c.f3note)), /*#__PURE__*/React.createElement("div", {
    className: "calc-result"
  }, /*#__PURE__*/React.createElement("div", {
    className: "l1"
  }, c.r1), /*#__PURE__*/React.createElement("div", {
    className: "l2"
  }, brl(perdaMes)), /*#__PURE__*/React.createElement("div", {
    className: "l3"
  }, "\u2248 ", brl(perdaAno), " ", c.r3), /*#__PURE__*/React.createElement("div", {
    className: "l4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "plus"
  }, "+ ", brl(economiaMes)), " ", c.r4)))));
};

// ---------- Planos ----------
const planData = [{
  name: 'Starter',
  fixo: 99,
  porCliente: 10,
  featured: false
}, {
  name: 'Pro',
  fixo: 499,
  porCliente: 8,
  featured: true
}, {
  name: 'Max',
  fixo: 999,
  porCliente: 6,
  featured: false
}];
const Pricing = () => {
  const {
    t
  } = useLangCtx();
  const pr = t.pricing;
  const ref = useRef(null);
  useReveal(ref);
  return /*#__PURE__*/React.createElement("section", {
    className: "pricing",
    id: "planos",
    ref: ref,
    "data-screen-label": "Planos"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " ", pr.eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 20
    }
  }, pr.h2a, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--cinza-texto)'
    }
  }, pr.h2b))), /*#__PURE__*/React.createElement("div", {
    className: "plans"
  }, planData.map((p, i) => /*#__PURE__*/React.createElement("div", {
    className: `plan reveal delay-${i + 1}` + (p.featured ? ' featured' : ''),
    key: p.name
  }, p.featured && /*#__PURE__*/React.createElement("div", {
    className: "plan-tag"
  }, pr.tag), /*#__PURE__*/React.createElement("div", {
    className: "plan-name"
  }, p.name), /*#__PURE__*/React.createElement("div", {
    className: "plan-price"
  }, "R$ ", p.fixo, /*#__PURE__*/React.createElement("span", {
    className: "per-month"
  }, " ", pr.perMonth)), /*#__PURE__*/React.createElement("div", {
    className: "plan-variable"
  }, "+ ", /*#__PURE__*/React.createElement("b", null, "R$ ", p.porCliente), " ", pr.perClient), /*#__PURE__*/React.createElement("div", {
    className: "plan-limit"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tick"
  }, /*#__PURE__*/React.createElement(IconTick, null)), " ", pr.limits[i]), /*#__PURE__*/React.createElement("a", {
    href: wa(pr.ctaMsg(p.name)),
    target: "_blank",
    rel: "noreferrer",
    className: 'btn ' + (p.featured ? 'btn-primary' : 'btn-ghost')
  }, pr.cta, " ", p.name)))), /*#__PURE__*/React.createElement("p", {
    className: "plans-note reveal delay-3"
  }, pr.note)));
};
Object.assign(window, {
  ChatSection,
  Agents,
  Results,
  Calculator,
  Pricing
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "v2/kontiva-sections-b.jsx", error: String((e && e.message) || e) }); }

// v2/kontiva-sections-c.jsx
try { (() => {
// Kontiva v2 — seções C: FAQ, CTA final + formulário, Footer
// (hooks useState/useEffect/useRef vêm de kontiva-base.jsx — escopo global compartilhado)

// ---------- FAQ ----------
const Faq = () => {
  const {
    t
  } = useLangCtx();
  const ref = useRef(null);
  useReveal(ref);
  return /*#__PURE__*/React.createElement("section", {
    className: "faq",
    id: "faq",
    ref: ref,
    "data-screen-label": "FAQ"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head reveal",
    style: {
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " ", t.faq.eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 20
    }
  }, t.faq.h2)), /*#__PURE__*/React.createElement("div", {
    className: "faq-list reveal delay-1"
  }, t.faq.items.map((f, i) => /*#__PURE__*/React.createElement("details", {
    className: "faq-item",
    key: i
  }, /*#__PURE__*/React.createElement("summary", null, /*#__PURE__*/React.createElement("span", null, f.q), /*#__PURE__*/React.createElement("span", {
    className: "faq-chev"
  }, /*#__PURE__*/React.createElement(IconChev, null))), /*#__PURE__*/React.createElement("p", {
    className: "faq-a"
  }, f.a))))));
};

// ---------- CTA final + formulário ----------
const ContactForm = () => {
  const {
    t
  } = useLangCtx();
  const c = t.cta;
  const [sent, setSent] = useState(false);
  if (sent) {
    return /*#__PURE__*/React.createElement("div", {
      className: "form-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-success"
    }, /*#__PURE__*/React.createElement("div", {
      className: "t"
    }, c.okT), /*#__PURE__*/React.createElement("div", {
      className: "s"
    }, c.okS)));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "form-card"
  }, /*#__PURE__*/React.createElement("h3", null, c.formT), /*#__PURE__*/React.createElement("p", {
    className: "form-sub"
  }, c.formS), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "f-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "f-field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "f-nome"
  }, c.fName), /*#__PURE__*/React.createElement("input", {
    id: "f-nome",
    type: "text",
    required: true,
    placeholder: c.fNamePh
  })), /*#__PURE__*/React.createElement("div", {
    className: "f-field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "f-whats"
  }, c.fWhats), /*#__PURE__*/React.createElement("input", {
    id: "f-whats",
    type: "tel",
    required: true,
    placeholder: c.fWhatsPh
  }))), /*#__PURE__*/React.createElement("div", {
    className: "f-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "f-field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "f-email"
  }, c.fEmail), /*#__PURE__*/React.createElement("input", {
    id: "f-email",
    type: "email",
    required: true,
    placeholder: c.fEmailPh
  })), /*#__PURE__*/React.createElement("div", {
    className: "f-field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "f-clientes"
  }, c.fClients), /*#__PURE__*/React.createElement("input", {
    id: "f-clientes",
    type: "number",
    min: "1",
    placeholder: c.fClientsPh
  }))), /*#__PURE__*/React.createElement("div", {
    className: "f-field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "f-msg"
  }, c.fMsg), /*#__PURE__*/React.createElement("textarea", {
    id: "f-msg",
    placeholder: c.fMsgPh
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-dark",
    style: {
      width: '100%'
    }
  }, c.submit)));
};
const FinalCTA = () => {
  const {
    t
  } = useLangCtx();
  const c = t.cta;
  const ref = useRef(null);
  useReveal(ref);
  return /*#__PURE__*/React.createElement("section", {
    className: "final-cta",
    id: "avaliacao",
    ref: ref,
    "data-screen-label": "Avalia\xE7\xE3o gratuita"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shell cta-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow reveal",
    style: {
      color: 'rgba(234,246,255,0.5)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-cyan"
  }), " ", c.eyebrow), /*#__PURE__*/React.createElement("h2", {
    className: "reveal delay-1",
    style: {
      marginTop: 20
    }
  }, c.h2a, /*#__PURE__*/React.createElement("br", null), c.h2b, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "hl"
  }, c.h2hl)), /*#__PURE__*/React.createElement("p", {
    className: "sub reveal delay-2"
  }, c.sub), /*#__PURE__*/React.createElement("ol", {
    className: "cta-steps reveal delay-2"
  }, c.steps.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "n"
  }, "0", i + 1), " ", s))), /*#__PURE__*/React.createElement("div", {
    className: "reveal delay-3",
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: wa(c.whatsMsg),
    target: "_blank",
    rel: "noreferrer",
    className: "btn btn-primary",
    style: {
      padding: '16px 26px',
      fontSize: 16
    }
  }, /*#__PURE__*/React.createElement(IconWhats, null), " ", c.whats))), /*#__PURE__*/React.createElement("div", {
    className: "reveal delay-2"
  }, /*#__PURE__*/React.createElement(ContactForm, null))));
};

// ---------- Footer ----------
const Footer = () => {
  const {
    t
  } = useLangCtx();
  const f = t.footer;
  return /*#__PURE__*/React.createElement("footer", {
    "data-screen-label": "Footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-brand"
  }, /*#__PURE__*/React.createElement(Brand, null), /*#__PURE__*/React.createElement("p", {
    className: "footer-tagline"
  }, f.tagline), /*#__PURE__*/React.createElement("a", {
    href: wa(f.whatsMsg),
    target: "_blank",
    rel: "noreferrer",
    className: "btn btn-primary",
    style: {
      padding: '11px 18px',
      fontSize: 14,
      alignSelf: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(IconWhats, null), " ", f.whats), /*#__PURE__*/React.createElement("div", {
    className: "social-row"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.linkedin.com/company/bluemetrics/",
    target: "_blank",
    rel: "noreferrer",
    "aria-label": "LinkedIn"
  }, /*#__PURE__*/React.createElement(IconLinkedIn, null)), /*#__PURE__*/React.createElement("a", {
    href: "https://www.instagram.com/bluemetrics.ai/",
    target: "_blank",
    rel: "noreferrer",
    "aria-label": "Instagram"
  }, /*#__PURE__*/React.createElement(IconInstagram, null)), /*#__PURE__*/React.createElement("a", {
    href: "https://www.youtube.com/@bluemetrics",
    target: "_blank",
    rel: "noreferrer",
    "aria-label": "YouTube"
  }, /*#__PURE__*/React.createElement(IconYouTube, null)))), /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("h5", null, f.colProduct), /*#__PURE__*/React.createElement("a", {
    href: "#como-funciona"
  }, f.lHow), /*#__PURE__*/React.createElement("a", {
    href: "#chat"
  }, f.lChat), /*#__PURE__*/React.createElement("a", {
    href: "#agentes"
  }, f.lAgents), /*#__PURE__*/React.createElement("a", {
    href: "#calculadora"
  }, f.lCalc), /*#__PURE__*/React.createElement("a", {
    href: "#planos"
  }, f.lPlans)), /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("h5", null, f.colCompany), /*#__PURE__*/React.createElement("a", {
    href: "#faq"
  }, f.lFaq), /*#__PURE__*/React.createElement("a", {
    href: "#avaliacao"
  }, f.lEval)), /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("h5", null, f.colContact), /*#__PURE__*/React.createElement("a", {
    href: wa(f.whatsMsg),
    target: "_blank",
    rel: "noreferrer"
  }, "WhatsApp"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:contato@kontiva.ai"
  }, f.lEmail))), /*#__PURE__*/React.createElement("div", {
    className: "footer-legal"
  }, /*#__PURE__*/React.createElement("div", null, f.copyright), /*#__PURE__*/React.createElement("div", {
    className: "footer-bm"
  }, f.bm), /*#__PURE__*/React.createElement("div", {
    className: "footer-legal-links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, f.privacy), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\xB7"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, f.terms)))));
};
Object.assign(window, {
  Faq,
  FinalCTA,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "v2/kontiva-sections-c.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Card = __ds_scope.Card;

__ds_ns.RadarCard = __ds_scope.RadarCard;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.IconWhats = __ds_scope.IconWhats;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.LangToggle = __ds_scope.LangToggle;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Nav = __ds_scope.Nav;

})();
