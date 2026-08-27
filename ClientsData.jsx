// Kontiva MVP — Clients mock data
// Perspectiva: carteira do escritório "Santos & Contadores". Cada cliente pode
// ter 1+ contratos ativos (CNPJs diferentes do mesmo grupo, filiais, ou
// serviços distintos). Ordem de urgência: clientes com alerta primeiro.
//
// Cada contrato carrega seu próprio status de cobrança e alerta — o status
// do cliente na listagem é o mais crítico entre seus contratos.

const CLIENTS = [
  {
    id: "horizonte",
    name: "Construtora Horizonte Ltda.",
    cnpj: "12.345.678/0001-90",
    segment: "Construção civil",
    portfolioSince: "Mar/2024",
    owner: "Marcos Guedes",
    contacts: { name: "Ricardo Almeida", email: "ricardo@horizonte.com.br" },
    monthlyTotal: 4544.47,
    billingStatus: "to_calculate",
    billingLabel: "Calcular cobrança de maio",
    alert: {
      level: "loss",
      text: "Subfaturamento recorrente — R$ 364 deixados de cobrar em 3 meses",
    },
    contracts: [
      {
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
        lastBilling: { reference: "Abr/2025", amount: 4004.47 },
        status: "active",
        billingStatus: "to_calculate",
        alert: {
          level: "loss",
          text: "3 meses sem aplicar o reajuste correto — perda acumulada de R$ 364",
        },
      },
    ],
    isDemo: true,
  },
  {
    id: "lumen",
    name: "Lumen Energia Renovável S.A.",
    cnpj: "23.987.112/0001-45",
    segment: "Energia / infraestrutura",
    portfolioSince: "Jul/2023",
    owner: "Paula Tavares",
    contacts: { name: "Fernanda Kist", email: "financeiro@lumen.energia" },
    monthlyTotal: 12850.00,
    billingStatus: "under_review",
    billingLabel: "Auditoria em andamento",
    alert: {
      level: "risk",
      text: "Cobrou R$ 2.100 acima do contrato em abr — revisar antes do cliente",
    },
    contracts: [
      {
        id: "LMN-01", label: "Holding", scope: "Contábil + societário",
        monthly: 7200.00, index: "IPCA",
        anniversary: "Julho", startedAt: "01/07/2023",
        nextAnniversary: "01/07/2026", end: "01/07/2028",
        lastAdjustedPercent: 4.62, lastAdjustedAt: "Jul/2025",
        lastBilling: { reference: "Abr/2025", amount: 9300.00 },
        status: "active", billingStatus: "under_review",
        alert: { level: "risk", text: "R$ 2.100 cobrados acima do contrato em abr/2025" },
      },
      {
        id: "LMN-02", label: "Usina Minas Gerais", scope: "Contábil + folha (45 colab.)",
        monthly: 3650.00, index: "IGP-M",
        anniversary: "Setembro", startedAt: "01/09/2024",
        nextAnniversary: "01/09/2026", end: "01/09/2026",
        lastAdjustedPercent: 3.94, lastAdjustedAt: "Set/2025",
        lastBilling: { reference: "Abr/2025", amount: 3650.00 },
        status: "active", billingStatus: "issued",
        alert: { level: "info", text: "Contrato vence em 4 meses — renegociar" },
      },
      {
        id: "LMN-03", label: "Usina Piauí", scope: "Contábil + folha (22 colab.)",
        monthly: 2000.00, index: "IPCA",
        anniversary: "Janeiro", startedAt: "01/01/2024",
        nextAnniversary: "01/01/2027", end: "01/01/2027",
        lastAdjustedPercent: 4.50, lastAdjustedAt: "Jan/2025",
        lastBilling: { reference: "Abr/2025", amount: 2000.00 },
        status: "active", billingStatus: "issued",
        alert: { level: "none" },
      },
      {
        id: "LMN-00-OLD", label: "Escritório SP (descontinuado)", scope: "Contábil",
        monthly: 1450.00, index: "IPCA",
        anniversary: "Março", startedAt: "01/03/2020",
        nextAnniversary: "—", end: "01/03/2023",
        lastAdjustedPercent: 8.75, lastAdjustedAt: "Mar/2022",
        lastBilling: { reference: "Fev/2023", amount: 1450.00 },
        status: "ended",
      },
    ],
  },
  {
    id: "casacor",
    name: "Casa & Cor Interiores ME",
    cnpj: "44.102.667/0001-03",
    segment: "Varejo / design",
    portfolioSince: "Fev/2025",
    owner: "Juliana Nunes",
    contacts: { name: "Bruna Salles", email: "contato@casacor.com.br" },
    monthlyTotal: 1890.00,
    billingStatus: "issued",
    billingLabel: "Boleto emitido — venc. 10/05",
    alert: { level: "none" },
    contracts: [
      {
        id: "CAC-01", label: "Simples Nacional", scope: "Contábil + apuração simples",
        monthly: 1890.00, index: "IPCA",
        anniversary: "Fevereiro", startedAt: "01/02/2025",
        nextAnniversary: "01/02/2027", end: "01/02/2027",
        lastAdjustedPercent: 4.50, lastAdjustedAt: "Fev/2026",
        lastBilling: { reference: "Abr/2025", amount: 1890.00 },
        status: "active", billingStatus: "issued",
        alert: { level: "none" },
      },
    ],
  },
  {
    id: "nordeste-agri",
    name: "Nordeste Agropecuária S.A.",
    cnpj: "09.554.001/0001-22",
    segment: "Agronegócio",
    portfolioSince: "Ago/2021",
    owner: "Marcos Guedes",
    contacts: { name: "Dr. Paulo Correia", email: "paulo.correia@nordesteagro.com.br" },
    monthlyTotal: 8420.00,
    billingStatus: "overdue",
    billingLabel: "Cobrança de abril em atraso",
    alert: {
      level: "info",
      text: "Aniversário em 45 dias — reajuste IPCA precisa entrar no próximo boleto",
    },
    contracts: [
      {
        id: "NAG-01", label: "Matriz · Petrolina", scope: "Contábil + folha + apuração rural",
        monthly: 5200.00, index: "IPCA",
        anniversary: "Junho", startedAt: "01/06/2021",
        nextAnniversary: "01/06/2026", end: "01/06/2027",
        lastAdjustedPercent: 4.83, lastAdjustedAt: "Jun/2025",
        lastBilling: { reference: "Abr/2025", amount: 5200.00 },
        status: "active", billingStatus: "overdue",
        alert: { level: "info", text: "Aniversário em 45 dias — IPCA no próximo boleto" },
      },
      {
        id: "NAG-02", label: "Filial · Juazeiro", scope: "Contábil + folha",
        monthly: 3220.00, index: "IPCA",
        anniversary: "Junho", startedAt: "01/06/2022",
        nextAnniversary: "01/06/2026", end: "01/06/2027",
        lastAdjustedPercent: 4.83, lastAdjustedAt: "Jun/2025",
        lastBilling: { reference: "Abr/2025", amount: 3220.00 },
        status: "active", billingStatus: "overdue",
        alert: { level: "none" },
      },
    ],
  },
  {
    id: "vox-clinicas",
    name: "Vox Clínicas Odontológicas",
    cnpj: "31.778.904/0001-71",
    segment: "Saúde / franquia",
    portfolioSince: "Out/2024",
    owner: "Paula Tavares",
    contacts: { name: "Camila Abreu", email: "cfo@voxclinicas.com" },
    monthlyTotal: 6740.00,
    billingStatus: "to_calculate",
    billingLabel: "Calcular cobrança de maio",
    alert: { level: "none" },
    contracts: [
      {
        id: "VOX-01", label: "Unidade Pinheiros", scope: "Contábil + folha (12 colab.)",
        monthly: 2380.00, index: "IPCA",
        anniversary: "Outubro", startedAt: "01/10/2024",
        nextAnniversary: "01/10/2026", end: "01/10/2026",
        lastAdjustedPercent: 4.50, lastAdjustedAt: "Out/2025",
        lastBilling: { reference: "Abr/2025", amount: 2380.00 },
        status: "active", billingStatus: "to_calculate", alert: { level: "none" },
      },
      {
        id: "VOX-02", label: "Unidade Tatuapé", scope: "Contábil + folha (9 colab.)",
        monthly: 2180.00, index: "IPCA",
        anniversary: "Outubro", startedAt: "01/10/2024",
        nextAnniversary: "01/10/2026", end: "01/10/2026",
        lastAdjustedPercent: 4.50, lastAdjustedAt: "Out/2025",
        lastBilling: { reference: "Abr/2025", amount: 2180.00 },
        status: "active", billingStatus: "to_calculate", alert: { level: "none" },
      },
      {
        id: "VOX-03", label: "Unidade Alphaville", scope: "Contábil + folha (8 colab.)",
        monthly: 2180.00, index: "IPCA",
        anniversary: "Dezembro", startedAt: "01/12/2024",
        nextAnniversary: "01/12/2026", end: "01/12/2026",
        lastAdjustedPercent: 4.50, lastAdjustedAt: "Dez/2025",
        lastBilling: { reference: "Abr/2025", amount: 2180.00 },
        status: "active", billingStatus: "to_calculate", alert: { level: "none" },
      },
    ],
  },
  {
    id: "praia-viva",
    name: "Praia Viva Hotelaria Ltda.",
    cnpj: "17.334.558/0001-18",
    segment: "Hotelaria",
    portfolioSince: "Jan/2026",
    owner: "Juliana Nunes",
    contacts: { name: "Tiago Henrique", email: "tiago@praiaviva.com" },
    monthlyTotal: 3200.00,
    billingStatus: "to_calculate",
    billingLabel: "Primeira cobrança — calcular",
    alert: {
      level: "info",
      text: "Cliente novo — primeira cobrança ainda não foi emitida",
    },
    contracts: [
      {
        id: "PRV-01", label: "Contrato principal", scope: "Contábil + folha + tributos",
        monthly: 3200.00, index: "IPCA",
        anniversary: "Janeiro", startedAt: "01/01/2026",
        nextAnniversary: "01/01/2027", end: "01/01/2028",
        lastAdjustedPercent: null, lastAdjustedAt: null,
        lastBilling: null,
        status: "active", billingStatus: "to_calculate",
        alert: { level: "info", text: "Primeira cobrança — ainda não foi emitida" },
      },
    ],
  },
  {
    id: "pinheiro-adv",
    name: "Pinheiro & Associados Advocacia",
    cnpj: "26.801.445/0001-60",
    segment: "Serviços jurídicos",
    portfolioSince: "Mai/2022",
    owner: "Marcos Guedes",
    contacts: { name: "Dra. Helena Pinheiro", email: "helena@pinheiroadv.com.br" },
    monthlyTotal: 5600.00,
    billingStatus: "issued",
    billingLabel: "Boleto emitido — venc. 10/05",
    alert: { level: "none" },
    contracts: [
      {
        id: "PIN-01", label: "Contrato contábil", scope: "Contábil + tributos",
        monthly: 4200.00, index: "IPCA",
        anniversary: "Maio", startedAt: "01/05/2022",
        nextAnniversary: "01/05/2026", end: "01/05/2027",
        lastAdjustedPercent: 4.83, lastAdjustedAt: "Mai/2025",
        lastBilling: { reference: "Abr/2025", amount: 4200.00 },
        status: "active", billingStatus: "issued", alert: { level: "none" },
      },
      {
        id: "PIN-02", label: "Folha de pagamento", scope: "Folha (18 advogados + admins)",
        monthly: 1400.00, index: "IPCA",
        anniversary: "Maio", startedAt: "01/05/2022",
        nextAnniversary: "01/05/2026", end: "01/05/2027",
        lastAdjustedPercent: 4.83, lastAdjustedAt: "Mai/2025",
        lastBilling: { reference: "Abr/2025", amount: 1400.00 },
        status: "active", billingStatus: "issued", alert: { level: "none" },
      },
    ],
  },
  {
    id: "artemis-moda",
    name: "Artemis Moda Feminina",
    cnpj: "52.006.888/0001-04",
    segment: "Varejo / moda",
    portfolioSince: "Set/2023",
    owner: "Paula Tavares",
    contacts: { name: "Rita Borges", email: "rita@artemismoda.com.br" },
    monthlyTotal: 2960.00,
    billingStatus: "under_review",
    billingLabel: "Auditoria pendente",
    alert: {
      level: "loss",
      text: "IPCA não foi aplicado no aniversário — R$ 180 por mês",
    },
    contracts: [
      {
        id: "ART-01", label: "Matriz", scope: "Contábil + apuração Simples",
        monthly: 2140.00, index: "IPCA",
        anniversary: "Setembro", startedAt: "01/09/2023",
        nextAnniversary: "01/09/2026", end: "01/09/2027",
        lastAdjustedPercent: 0, lastAdjustedAt: "não aplicado",
        lastBilling: { reference: "Abr/2025", amount: 1960.00 },
        status: "active", billingStatus: "under_review",
        alert: { level: "loss", text: "IPCA não foi aplicado no aniversário — R$ 180/mês" },
      },
      {
        id: "ART-02", label: "E-commerce CNPJ secundário", scope: "Contábil",
        monthly: 820.00, index: "IPCA",
        anniversary: "Março", startedAt: "01/03/2024",
        nextAnniversary: "01/03/2027", end: "01/03/2027",
        lastAdjustedPercent: 4.83, lastAdjustedAt: "Mar/2025",
        lastBilling: { reference: "Abr/2025", amount: 820.00 },
        status: "active", billingStatus: "issued", alert: { level: "none" },
      },
    ],
  },
];

const CLIENT_ALERT_META = {
  loss: { label: "Perda de receita", dotClass: "loss" },
  risk: { label: "Risco de imagem", dotClass: "risk" },
  info: { label: "Aviso",            dotClass: "info" },
  none: null,
};

const BILLING_STATUS_META = {
  to_calculate: { label: "A calcular",         className: "to_calculate" },
  issued:       { label: "Emitido",            className: "issued" },
  under_review: { label: "Em auditoria",       className: "under_review" },
  overdue:      { label: "Em atraso",          className: "overdue" },
};

const CLIENTS_SUMMARY = {
  total: CLIENTS.length,
  activeContracts: CLIENTS.reduce((acc, c) => acc + c.contracts.filter(ct => ct.status === "active").length, 0),
  monthlyTotal: CLIENTS.reduce((acc, c) => acc + c.monthlyTotal, 0),
  withAlerts: CLIENTS.filter(c => c.alert && c.alert.level !== "none").length,
  toBillNow: CLIENTS.filter(c => c.billingStatus === "to_calculate" || c.billingStatus === "overdue").length,
};

const findClient = (id) => CLIENTS.find((c) => c.id === id);
const findContract = (contractId) => {
  for (const c of CLIENTS) {
    const ct = c.contracts.find((x) => x.id === contractId);
    if (ct) return { client: c, contract: ct };
  }
  return null;
};

Object.assign(window, {
  CLIENTS, CLIENT_ALERT_META, BILLING_STATUS_META, CLIENTS_SUMMARY,
  findClient, findContract,
});
