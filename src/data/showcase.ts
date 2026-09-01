/**
 * Dataset da carteira-vitrine (PRD secao 7.1).
 * Um unico escritorio ficticio, historia coerente em toda a LP.
 * Numeros ilustrativos, dados de demonstracao. Trocar aqui muda em todos os frames.
 */

export const showcase = {
  competencia: '08/2026',

  // carteira
  carteiraTotal: 180, // CNPJs ativos
  contratosAtivos: '21 ativos de 44 contratos',
  impactoAlto: 34, // clientes com impacto alto na reforma (de 180)

  // tributario (cliente destaque)
  clienteDestaque: 'Construtora Horizonte Ltda.',
  creditosRecuperaveis: 'R$ 214.700', // creditos de impostos recuperaveis (60 meses)
  economiaAnualDestaque: 'R$ 63.960', // economia anual estimada, um cliente
  buracoCaixaPico: 'R$ 48.200', // buraco de caixa do split no mes de pico (2027)

  // fornecedores
  fornecedoresTotal: 42,
  fornecedoresSemCredito: 7, // risco de credito perdido

  // honorarios
  excedentesIdentificados: 'R$ 92.480', // excedentes e reajustes no periodo
  recuperadoCiclo: 'R$ 3.245', // recuperado neste ciclo

  // chat / migracao
  ganhamRealMigracao: '9 clientes',
  ganhamRealValor: 'R$ 191 mil/ano somados',

  // clientes ficticios recorrentes (nunca misturar personas entre secoes)
  clientes: [
    { nome: 'Construtora Horizonte Ltda.', cnpj: '10.001.001/0001-01' },
    { nome: 'Brasa Sul Indústria de Alimentos Ltda.', cnpj: '10.002.002/0001-02' },
    { nome: 'Clínica Horizonte Saúde Ltda.', cnpj: '10.003.003/0001-03' },
    { nome: 'Vértice Distribuidora Atacadista Ltda.', cnpj: '10.004.004/0001-04' },
    { nome: 'MobiTech Soluções Digitais Ltda.', cnpj: '10.005.005/0001-05' },
  ],
} as const;

// Selos e disclaimers reutilizados nos frames
export const seloExemplo = 'Exemplo ilustrativo · dados de demonstração';
export const disclaimerTributario =
  'Simulação com base nos dados fornecidos. Não substitui parecer profissional.';
export const avisoFaseTestes =
  'Recurso em fase de testes. Valores finais das alíquotas e datas da reforma ainda podem sofrer mudanças.';

// CTA padrao (PRD secao 2)
export const CTA_PRIMARIO = 'Agende a demo com os dados do seu escritório';
export const CTA_ANCORA = '#agendar';

// WhatsApp (fallback / flutuante). Numero placeholder ate o time definir.
export const WHATSAPP_NUM = '5511999999999';
export const WHATSAPP_MSG =
  'Olá, quero agendar a demo da Kontiva com os dados do meu escritório.';
export const whatsappHref = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

// Redes sociais (PRD Alt.6). URLs placeholder ate o time confirmar.
export const INSTAGRAM_URL = 'https://instagram.com/kontiva.ai';
export const LINKEDIN_URL = 'https://linkedin.com/company/kontiva';
export const BLUEMETRICS_URL = 'https://bluemetrics.ai';

// Navegacao do rodape (ancoras das secoes)
export const FOOTER_NAV = [
  { label: 'A urgência', href: '#urgencia' },
  { label: 'O que o agente faz', href: '#como-funciona' },
  { label: 'Segundo agente', href: '#segundo-agente' },
  { label: 'Por que confiar', href: '#por-que-confiar' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Agendar demo', href: '#agendar' },
];
