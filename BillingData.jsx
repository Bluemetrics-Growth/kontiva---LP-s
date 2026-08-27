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
  extraFeeBase: "Hora técnica a R$ 180 para serviços fora do escopo",
};

// ==========================================================================
// CENÁRIO A — Só relatório. Quanto o escritório deve cobrar no mês corrente.
// ==========================================================================
const CALC_MONTH = {
  reference: "Maio/2025",
  period: "01/05 a 31/05",
  dueDate: "10/06/2025",
  baseWithReadjustment: 4004.47, // 3820 * 1.0483
  extrasTotal: 540.00,
  totalToCharge: 4544.47,
};

// What the report recorded — hours / extra services the office actually did
const CALC_LINE_ITEMS = [
  {
    id: "base",
    kind: "base",
    label: "Honorários contábeis — mensalidade",
    clause: "Cláusula 3 + Cláusula 5",
    detail:
      "Valor base R$ 3.820,00 × reajuste IPCA de 4,83% aplicado em mar/2025.",
    expected: 4004.47,
    meta: "Valor fixo contratual",
  },
  {
    id: "cert",
    kind: "extra",
    label: "Emissão de certidões negativas",
    clause: "Cláusula 4.2 — Serviços extras",
    detail:
      "2 horas técnicas registradas por Ana Paula em 14/05. Autorização por e-mail no dia 12/05.",
    expected: 360.00,
    meta: "2 h × R$ 180 — hora técnica",
  },
  {
    id: "filial",
    kind: "extra",
    label: "Abertura de filial — Campinas",
    clause: "Cláusula 4.2 — Serviços extras",
    detail:
      "1 hora de apoio documental (Rogério, 22/05). Cliente aprovou em reunião gravada.",
    expected: 180.00,
    meta: "1 h × R$ 180 — hora técnica",
  },
];

// Observations Kontiva wants the office to notice before sending the bill
const CALC_NOTES = [
  {
    id: "aniversario",
    type: "info",
    title: "Reajuste IPCA já incorporado",
    body:
      "Este é o 3º mês cobrando o valor reajustado (R$ 4.004,47). A regra do contrato é IPCA acumulado em 12 meses no aniversário (março). Confirmado.",
  },
  {
    id: "autorizacao",
    type: "check",
    title: "Serviços extras têm autorização por escrito",
    body:
      "Tanto a emissão das certidões (R$ 360) quanto o apoio na abertura de filial (R$ 180) têm autorização registrada. Anexar os comprovantes ao boleto para evitar questionamento.",
  },
  {
    id: "vencimento",
    type: "info",
    title: "Vencimento sugerido: 10/06/2025",
    body:
      "Conforme cláusula 6, o boleto vence todo dia 10. Emitir até 05/06 dá margem confortável para o cliente pagar.",
  },
];

// ==========================================================================
// CENÁRIO B — Auditoria. Três variantes (sub, super, misto) simulando o que o
// escritório realmente cobrou. Mantemos as três e escolhemos uma como default
// do demo; a tela expõe a mais didática (mista).
// ==========================================================================
const AUDIT_MONTHS = [
  {
    month: "Março/2025",
    period: "01/03 a 31/03",
    expected: 4004.47,          // valor contratual + extras do mês
    charged: 3820.00,           // o que o escritório realmente emitiu
    status: "undercharged",
    delta: -184.47,
    items: [
      {
        label: "Honorários contábeis",
        expected: 4004.47, charged: 3820.00, delta: -184.47,
        status: "undercharged",
        note: "Reajuste IPCA de 4,83% não foi aplicado no mês de aniversário. O boleto saiu com o valor antigo.",
      },
    ],
  },
  {
    month: "Abril/2025",
    period: "01/04 a 30/04",
    expected: 4184.47,          // base + 1h extra de certidão
    charged: 4004.47,           // emitiu só a base com reajuste
    status: "undercharged",
    delta: -180.00,
    items: [
      {
        label: "Honorários contábeis",
        expected: 4004.47, charged: 4004.47, delta: 0,
        status: "ok",
      },
      {
        label: "Emissão de certidão negativa (1h)",
        expected: 180.00, charged: 0,
        delta: -180.00,
        status: "undercharged",
        note: "Serviço prestado em 18/04 com autorização, mas não entrou no boleto.",
      },
    ],
  },
  {
    month: "Maio/2025",
    period: "01/05 a 31/05",
    expected: 4544.47,          // base + 2h certidão + 1h filial
    charged: 4820.00,           // emitiu valor cheio, cobrou a mais
    status: "overcharged",
    delta: 275.53,
    items: [
      {
        label: "Honorários contábeis",
        expected: 4004.47, charged: 4004.47, delta: 0,
        status: "ok",
      },
      {
        label: "Serviços extras (3h técnicas)",
        expected: 540.00, charged: 815.53,
        delta: 275.53,
        status: "overcharged",
        note: "Foram registradas 3 horas, mas o boleto cobrou como 4h53min. Provável erro de conversão de minutos.",
      },
    ],
  },
];

// High-level findings (para o cenário de auditoria)
const AUDIT_FINDINGS = [
  {
    id: "miss_reajuste",
    severity: "loss",         // perda financeira para o escritório
    title: "Reajuste IPCA não aplicado em março",
    amount: 184.47,
    direction: "under",
    months: ["Março/2025"],
    clause: "Cláusula 5 — Reajuste anual",
    summary:
      "Em março — mês do aniversário do contrato — o boleto saiu com R$ 3.820,00, o valor antigo. O IPCA acumulado de 4,83% deveria ter levado a mensalidade para R$ 4.004,47. Você deixou R$ 184,47 na mesa só nesse mês.",
    expected: "R$ 4.004,47",
    charged: "R$ 3.820,00",
    action: "Emitir fatura complementar do reajuste retroativo, amparada na cláusula 5 e no IPCA do IBGE.",
  },
  {
    id: "miss_extra",
    severity: "loss",
    title: "Serviço extra prestado e não cobrado",
    amount: 180.00,
    direction: "under",
    months: ["Abril/2025"],
    clause: "Cláusula 4.2 — Serviços extras",
    summary:
      "Ana Paula emitiu uma certidão negativa em 18/04 (1h técnica, R$ 180). O serviço tem autorização por e-mail do cliente, mas não entrou no boleto de abril.",
    expected: "R$ 180,00",
    charged: "R$ 0,00",
    action: "Incluir na próxima fatura com referência ao serviço prestado e à autorização.",
  },
  {
    id: "over_hora",
    severity: "risk",         // risco de imagem — cobrou a mais
    title: "Horas técnicas faturadas acima do registrado",
    amount: 275.53,
    direction: "over",
    months: ["Maio/2025"],
    clause: "Cláusula 4.2 — Serviços extras",
    summary:
      "O apontamento do time registra 3 horas no mês, mas o boleto foi emitido como se fossem ~4h53min. Diferença de R$ 275,53 cobrada a mais do cliente. Vale revisar antes que ele conteste.",
    expected: "R$ 540,00",
    charged: "R$ 815,53",
    action: "Emitir nota de crédito de R$ 275,53 e comunicar o cliente — preserva a relação e evita contestação.",
  },
];

const AUDIT_SUMMARY = {
  monthsAnalyzed: 3,
  monthsWithIssues: 3,
  itemsFlagged: 3,
  totalExpected: 12733.41,   // soma do "deveria ter cobrado"
  totalCharged: 12644.47,    // soma do "efetivamente cobrou"
  undercharged: 364.47,      // perda
  overcharged: 275.53,       // cobrado a mais
  netDelta: -88.94,          // líquido: ainda perdeu R$ 88,94
  // projeção se o padrão de perda continuar por 12 meses
  annualLossProjection: 364.47 * 4, // ~R$ 1.457
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
    total: 4184.47,
  },
};

// ==========================================================================
// Legacy aliases (mantidos para não quebrar qualquer referência antiga)
// ==========================================================================
const BILLING_MONTHS = AUDIT_MONTHS;
const FINDINGS = AUDIT_FINDINGS;
const BILLING_SUMMARY = AUDIT_SUMMARY;

const fmtBRL = (n) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

const fmtBRLParts = (n) => {
  const [int, dec] = Math.abs(n).toFixed(2).split(".");
  const intFmt = new Intl.NumberFormat("pt-BR").format(parseInt(int, 10));
  return { sign: n < 0 ? "-" : "", int: intFmt, dec };
};

Object.assign(window, {
  CONTRACT_BASELINE,
  // cenário A
  CALC_MONTH, CALC_LINE_ITEMS, CALC_NOTES, CALC_SUMMARY,
  // cenário B
  AUDIT_MONTHS, AUDIT_FINDINGS, AUDIT_SUMMARY,
  // legacy
  BILLING_MONTHS, FINDINGS, BILLING_SUMMARY,
  fmtBRL, fmtBRLParts,
});
