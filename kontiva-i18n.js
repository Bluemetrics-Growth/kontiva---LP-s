// Kontiva v2 — dicionário i18n PT/EN
window.KONTIVA_STR = {
  pt: {
    nav: {
      how: 'Como funciona', chat: 'Chat & MCP', calc: 'Calculadora', plans: 'Planos', faq: 'FAQ',
      whats: 'Falar no WhatsApp',
      whatsMsg: 'Olá, gostaria de conhecer a Kontiva.ai'
    },
    hero: {
      eyebrow: 'Contratos e cobrança com IA, de ponta a ponta',
      h1a: 'Seu contrato sabe', h1b: 'quanto cobrar.', h1c: 'A Kontiva ', h1serif: 'executa',
      sub: 'A Kontiva.ai lê seus contratos, calcula fixo, excedentes e reajustes, gera os boletos e concilia os pagamentos. Tudo automático — e você no controle do que aprova.',
      ctaWhats: 'Falar no WhatsApp', ctaWhatsMsg: 'Olá, quero conhecer a Kontiva.ai',
      ctaCalc: 'Ver quanto você perde',
      meta1: 'Conecta ao seu ERP e à sua plataforma de cobrança',
      meta2: 'Você aprova antes de cobrar',
      radarHead: 'Cobranças · Junho/2026', radarLive: 'Geração automática',
      radarSummary: 'Excedentes + reajustes neste ciclo',
      badges: {
        paid: 'Boleto pago', inpc: 'Reajuste INPC +5,2%', emp: '+2 funcionários',
        irpf: '+ IRPF dos sócios', sent: 'Boleto enviado', wait: 'Aguardando aprovação'
      }
    },
    problem: {
      eyebrow: 'O ponto cego', h2: 'Planilha não é sistema.',
      lead: 'O controle de contratos vive numa aba de Excel. Reajuste de janeiro, funcionário a mais na folha, serviço avulso de março — quem lembra de cobrar tudo? A Kontiva lembra.',
      file: 'contratos_2026.xlsx', before: 'Antes', after: 'Depois',
      panelTitle: 'Kontiva · Painel de contratos',
      cols: ['Cliente', 'Mensalidade', 'Último reajuste'],
      cap1: '3 campos em branco', cap2: '2 reajustes vencidos', cap3: 'última edição: há 47 dias',
      k1t: 'Construtora Horizonte', k1s: 'Reajuste IPCA aplicado na renovação de jan/26',
      k2t: 'Studio M Arquitetura', k2s: 'Serviço avulso de dez/25 incluído na fatura',
      k3t: 'Restaurante Pátio 22', k3s: '+3 funcionários na folha detectados via ERP',
      kTotal: 'Recuperado neste ciclo'
    },
    flow: {
      eyebrow: 'Como funciona', h2a: 'Do contrato', h2b: 'ao boleto pago.', step: 'PASSO',
      steps: [
        {
          title: 'Envie seus contratos',
          body: 'PDF, DOC, foto — qualquer formato. A IA extrai partes, objeto, valores fixos, variáveis e excedentes, datas de renovação e índices de reajuste. Tudo vira dado estruturado, consultável a qualquer momento.',
          chips: ['PDF', 'DOC', 'imagem']
        },
        {
          title: 'Conecte o ERP — ou envie relatórios',
          body: 'A Kontiva extrai do seu sistema o volume de serviços prestados em cada período: funcionários na folha, filiais, faturamento, regime fiscal, serviços avulsos. É isso que define o excedente de cada contrato. Sem integração? Envie os relatórios em qualquer formato, que a gente processa.',
          chips: ['Domínio', 'Thomson Reuters', 'Totvs', 'SAP']
        },
        {
          title: 'Cobrança calculada, detalhada, enviada',
          body: 'Fixo + excedentes + reajuste pelo índice do contrato (INPC, IGP-M), aplicado automaticamente na renovação. A fatura sai detalhada linha a linha — seu cliente vê exatamente o que está pagando. Você revisa antes e ajusta o que quiser: um desconto negociado, um valor diferente do calculado.',
          chips: ['Nibo', 'Asaas', 'Stripe', 'CNAB400 → qualquer banco']
        },
        {
          title: 'Pagamento identificado. Ciclo fechado.',
          body: 'O cliente pagou, a Kontiva reconhece e registra. Sem caçar comprovante, sem bater extrato na mão. O próximo ciclo já começa sozinho.',
          chips: []
        }
      ],
      illus: {
        docTag: 'PDF·DOC·IMG',
        fields: [
          ['partes', 'Construtora Horizonte × Escritório'],
          ['valor fixo', 'R$ 3.820,00 / mês'],
          ['excedente', 'R$ 38 por funcionário > 20'],
          ['renovação', '12 meses · auto'],
          ['reajuste', 'INPC na renovação']
        ],
        erpNodes: ['Folha · 23 funcionários', 'Filiais · 3', 'Faturamento · R$ 412 mil', 'Serviços avulsos · 4'],
        erpCenter: 'seu ERP', erpNote: 'ou envie os relatórios — a gente processa',
        invTitle: 'Fatura · Construtora Horizonte',
        invLines: [
          ['Honorários (contrato)', 'R$ 3.820,00', false],
          ['Reajuste INPC +5,2%', 'R$ 198,00', true],
          ['+3 funcionários × R$ 38', 'R$ 114,00', true],
          ['Alteração contratual', 'R$ 350,00', true]
        ],
        invTotal: 'Total',
        paidLabel: 'Pagamento conciliado', paidSub: 'boleto #8841 · R$ 4.482,00 · 12/jun'
      }
    },
    chat: {
      eyebrow: 'Chat & MCP', h2a: 'Tudo isso,', h2b: 'também por chat.',
      lead: 'Qualquer coisa que a interface faz, o chat também faz. Pergunte sobre a carteira, dê instruções, ajuste cobranças — em português, como você falaria com alguém da equipe.',
      mcpT: 'Prefere o seu chat de IA?',
      mcpS: 'Conecte o Claude ou o ChatGPT ao servidor MCP da Kontiva e opere tudo sem sair da sua IA preferida.',
      head: 'Kontiva · Chat', status: 'conectado',
      u1: 'Quantos contratos vencem no mês que vem?',
      b1a: '7 contratos', b1b: ' vencem em julho. 5 renovam automaticamente com reajuste INPC; 2 estão marcados para renegociação. Quer a lista?',
      u2: 'Dê R$ 500 de desconto na próxima fatura da Clínica Vitta — a multa foi nossa responsabilidade.',
      b2a: 'Feito. ', b2b: 'Desconto de R$ 500', b2c: ' aplicado à fatura de julho da Clínica Vitta, com a justificativa registrada no histórico.',
      u3: 'Quanto cobrei no mês passado de fixo e de adicionais?',
      b3a: 'Em maio: ', b3b: 'R$ 86.420', b3c: ' de honorários fixos e ', b3d: 'R$ 7.310', b3e: ' em excedentes e reajustes — 7,8% da receita veio de adicionais.'
    },
    agents: {
      eyebrow: 'Agentes de IA',
      h2a: 'Agentes de olho na carteira,', h2b: '24 horas por dia.',
      lead: 'Crie agentes de IA dentro da Kontiva que varrem sua carteira continuamente e agem sozinhos: avisam sobre renovações, disparam cobranças, rodam auditorias — e pedem sua aprovação quando precisam.',
      items: [
        { t: 'Avisos onde você trabalha', s: 'Renovações chegando, cobranças enviadas, divergências encontradas — direto no e-mail, Slack ou Teams.' },
        { t: 'Aprovação a um clique', s: 'O agente pergunta antes de agir quando você quiser: aprovar reajuste, confirmar cobrança, autorizar desconto.' },
        { t: 'Relatórios automáticos', s: 'Resumos periódicos da carteira para você — e relatórios de serviços prestados para os seus clientes.' }
      ],
      feedHead: 'Atividade dos agentes', feedLive: 'Hoje',
      notes: [
        { ch: 'Slack', who: 'Agente · Renovações', body: 'Contrato da Padaria São Jorge renova em 15 dias. Aplicar reajuste INPC +4,8%?', a1: 'Aprovar', a2: 'Revisar' },
        { ch: 'E-mail', who: 'Agente · Cobranças', body: '42 boletos de junho gerados e enviados ao Asaas. 38 já pagos.' },
        { ch: 'Teams', who: 'Agente · Auditoria', body: 'Varredura concluída: 2 contratos com excedente não cobrado em maio.', a1: 'Ver detalhes' },
        { ch: 'E-mail', who: 'Agente · Relatórios', body: 'Relatório mensal da carteira enviado para você e para 12 clientes.' }
      ]
    },
    results: {
      eyebrow: 'Resultados', h2: 'O que muda no fim do mês',
      items: [
        { title: 'Centenas de horas de volta', body: 'Conferir contrato, calcular excedente, emitir boleto, bater pagamento — tudo isso deixa de ser trabalho manual da sua equipe.' },
        { title: 'Zero dinheiro na mesa', body: 'Nenhum reajuste esquecido, nenhum serviço avulso sem fatura, nenhum excedente que passa batido. Se está no contrato, é cobrado.' },
        { title: 'Zero erros, total transparência', body: 'A fatura sai detalhada linha a linha. Seu cliente vê exatamente o que paga — e o seu escritório ganha em profissionalismo.' }
      ]
    },
    calc: {
      eyebrow: 'Calculadora', h2a: 'Quanto seu escritório', h2b: 'está deixando na mesa?',
      lead: 'Ajuste os valores do seu escritório. Não é chute — é a média que encontramos em carteiras parecidas com a sua.',
      note: 'Estimativa baseada em reajustes não aplicados, serviços extras não faturados e contratos vencidos. O valor real costuma ser maior. Economia de horas: 1,5 h/mês por cliente, a R$ 40/h de custo de analista contábil.',
      f1: 'Clientes ativos na carteira', f2: 'Ticket médio mensal', f3: 'Receita potencialmente perdida',
      f3note: 'Fixamos em 2% — o piso conservador do que encontramos em carteiras reais.',
      r1: 'Estimativa mensal', r3: 'por ano', r4: 'em economia de horas da sua equipe'
    },
    pricing: {
      eyebrow: 'Planos', h2a: 'Simples: um fixo', h2b: '+ um valor por cliente.',
      tag: 'Mais popular', perMonth: '/mês', perClient: 'por cliente gerenciado',
      limits: ['Até 10 clientes', 'Até 100 clientes', 'Clientes ilimitados'],
      cta: 'Começar com', ctaMsg: (p) => `Olá, tenho interesse no plano ${p} da Kontiva.ai`,
      note: 'Todos os planos incluem tudo: leitura de contratos, integração com ERP, cálculo de excedentes e reajustes, emissão e conciliação de cobranças, chat e servidor MCP. A diferença é só o tamanho da carteira.'
    },
    faq: {
      eyebrow: 'FAQ', h2: 'Perguntas frequentes',
      items: [
        { q: 'Em que formato envio meus contratos?', a: 'Qualquer um: PDF, DOC, imagem — até foto de contrato assinado em papel. A IA extrai partes, objeto, valores fixos e variáveis, excedentes, datas de renovação e índices de reajuste. Tudo vira dado estruturado, consultável a qualquer momento.' },
        { q: 'Preciso integrar com meu ERP?', a: 'Não. A integração (Domínio, Thomson Reuters, Totvs, SAP e outros) automatiza a leitura do volume de serviços prestados, mas você também pode simplesmente enviar os relatórios em qualquer formato, que a Kontiva processa.' },
        { q: 'Posso revisar as cobranças antes de enviar?', a: 'Sim. Você define o que sai automático e o que passa por aprovação. Negociou um desconto ou um valor diferente do calculado? Ajusta na hora — pela interface ou pelo chat.' },
        { q: 'Como os boletos são emitidos e conciliados?', a: 'A Kontiva envia as cobranças para a sua plataforma (Nibo, Asaas, Stripe e outras) ou gera arquivo CNAB400 para qualquer banco. Quando o cliente paga, o pagamento é identificado e registrado automaticamente.' },
        { q: 'E os reajustes de contrato?', a: 'Se o contrato renova com reajuste por índice (INPC, IGP-M etc.), o novo valor é calculado e incluído na cobrança automaticamente — com o reajuste detalhado na fatura, para total transparência com o seu cliente.' },
        { q: 'Posso operar a Kontiva pelo Claude ou ChatGPT?', a: 'Sim. Conecte sua IA preferida ao servidor MCP da Kontiva e pergunte, instrua e ajuste cobranças sem sair do chat que você já usa.' },
        { q: 'Como funciona a avaliação gratuita?', a: 'Você envia 5 contratos e os relatórios de execução do período, conta quanto cobrou de cada cliente — e devolvemos o cálculo do que deixou de ser cobrado. Sem custo e sem compromisso.' }
      ]
    },
    cta: {
      eyebrow: 'Avaliação gratuita',
      h2a: 'Quanto você', h2b: 'deixou de cobrar?', h2hl: 'A gente calcula.',
      sub: 'Fazemos uma avaliação sem custo da sua carteira — e devolvemos um raio-X do que ficou na mesa.',
      steps: ['Envie 5 contratos de clientes', 'Junte os relatórios de execução do período', 'Diga quanto cobrou de cada um', 'Receba o cálculo do que deixou de cobrar'],
      whats: 'Chamar no WhatsApp', whatsMsg: 'Olá, quero a avaliação gratuita da minha carteira',
      formT: 'Peça sua avaliação gratuita',
      formS: 'Sem custo, sem compromisso. A gente te diz quanto você deixou de cobrar.',
      fName: 'Nome', fNamePh: 'Seu nome',
      fWhats: 'WhatsApp', fWhatsPh: '(11) 99999-9999',
      fEmail: 'E-mail', fEmailPh: 'voce@escritorio.com.br',
      fClients: 'Clientes na carteira', fClientsPh: '120',
      fMsg: 'Mensagem (opcional)', fMsgPh: 'Conte um pouco sobre o seu escritório',
      submit: 'Pedir avaliação gratuita',
      okT: 'Recebemos seu contato ✓',
      okS: 'Nossa equipe responde em até 1 dia útil com as instruções para enviar os contratos da avaliação.'
    },
    footer: {
      tagline: 'Gestão de contratos e cobrança com IA, de ponta a ponta, para escritórios de contabilidade.',
      whats: 'Chame agora no WhatsApp', whatsMsg: 'Olá, vim pelo site da Kontiva.ai',
      colProduct: 'Produto', colCompany: 'Empresa', colContact: 'Contato',
      lHow: 'Como funciona', lChat: 'Chat & MCP', lAgents: 'Agentes de IA', lCalc: 'Calculadora', lPlans: 'Planos',
      lFaq: 'FAQ', lEval: 'Avaliação gratuita', lEmail: 'contato@kontiva.ai',
      copyright: '© 2026 Kontiva.ai · Todos os direitos reservados.',
      bm: 'Kontiva é uma empresa BlueMetrics.',
      privacy: 'Política de Privacidade', terms: 'Termos de Uso'
    }
  },

  en: {
    nav: {
      how: 'How it works', chat: 'Chat & MCP', calc: 'Calculator', plans: 'Pricing', faq: 'FAQ',
      whats: 'Chat on WhatsApp',
      whatsMsg: 'Hi, I would like to learn more about Kontiva.ai'
    },
    hero: {
      eyebrow: 'AI-powered contracts & billing, end to end',
      h1a: 'Your contract knows', h1b: 'what to bill.', h1c: 'Kontiva ', h1serif: 'executes',
      sub: 'Kontiva.ai reads your contracts, calculates fixed fees, overages and index adjustments, issues the invoices and reconciles payments. Fully automated — with you in control of what gets approved.',
      ctaWhats: 'Chat on WhatsApp', ctaWhatsMsg: 'Hi, I want to learn more about Kontiva.ai',
      ctaCalc: 'See what you are losing',
      meta1: 'Connects to your ERP and billing platform',
      meta2: 'You approve before anything is billed',
      radarHead: 'Billing run · June 2026', radarLive: 'Auto-generating',
      radarSummary: 'Overages + adjustments this cycle',
      badges: {
        paid: 'Invoice paid', inpc: 'INPC adjustment +5.2%', emp: '+2 employees',
        irpf: "+ partners' tax returns", sent: 'Invoice sent', wait: 'Awaiting approval'
      }
    },
    problem: {
      eyebrow: 'The blind spot', h2: 'A spreadsheet is not a system.',
      lead: "Contract control lives in an Excel tab. January's adjustment, an extra employee on payroll, a one-off service in March — who remembers to bill it all? Kontiva does.",
      file: 'contracts_2026.xlsx', before: 'Before', after: 'After',
      panelTitle: 'Kontiva · Contracts dashboard',
      cols: ['Client', 'Monthly fee', 'Last adjustment'],
      cap1: '3 blank fields', cap2: '2 overdue adjustments', cap3: 'last edited: 47 days ago',
      k1t: 'Construtora Horizonte', k1s: 'IPCA adjustment applied on the Jan/26 renewal',
      k2t: 'Studio M Arquitetura', k2s: 'Dec/25 one-off service added to the invoice',
      k3t: 'Restaurante Pátio 22', k3s: '+3 payroll employees detected via ERP',
      kTotal: 'Recovered this cycle'
    },
    flow: {
      eyebrow: 'How it works', h2a: 'From contract', h2b: 'to paid invoice.', step: 'STEP',
      steps: [
        {
          title: 'Send us your contracts',
          body: 'PDF, DOC, photo — any format. The AI extracts parties, scope, fixed and variable fees, overage rules, renewal dates and adjustment indexes. Everything becomes structured data you can query anytime.',
          chips: ['PDF', 'DOC', 'image']
        },
        {
          title: 'Connect your ERP — or send reports',
          body: "Kontiva pulls from your system the volume of services delivered in each period: payroll headcount, branches, revenue, tax regime, one-off services. That's what defines each contract's overages. No integration? Send the reports in any format and we'll process them.",
          chips: ['Domínio', 'Thomson Reuters', 'Totvs', 'SAP']
        },
        {
          title: 'Billing calculated, itemized, delivered',
          body: "Fixed fee + overages + the contract's index adjustment (INPC, IGP-M), applied automatically on renewal. Invoices go out itemized line by line — your client sees exactly what they're paying for. You review first and adjust anything: a negotiated discount, a different amount.",
          chips: ['Nibo', 'Asaas', 'Stripe', 'CNAB400 → any bank']
        },
        {
          title: 'Payment identified. Loop closed.',
          body: 'Your client pays, Kontiva recognizes and records it. No chasing receipts, no manual bank reconciliation. The next cycle starts on its own.',
          chips: []
        }
      ],
      illus: {
        docTag: 'PDF·DOC·IMG',
        fields: [
          ['parties', 'Construtora Horizonte × Firm'],
          ['fixed fee', 'R$ 3,820.00 / mo'],
          ['overage', 'R$ 38 per employee > 20'],
          ['renewal', '12 months · auto'],
          ['adjustment', 'INPC on renewal']
        ],
        erpNodes: ['Payroll · 23 employees', 'Branches · 3', 'Revenue · R$ 412k', 'One-off services · 4'],
        erpCenter: 'your ERP', erpNote: "or send the reports — we'll process them",
        invTitle: 'Invoice · Construtora Horizonte',
        invLines: [
          ['Retainer (contract)', 'R$ 3,820.00', false],
          ['INPC adjustment +5.2%', 'R$ 198.00', true],
          ['+3 employees × R$ 38', 'R$ 114.00', true],
          ['Contract amendment', 'R$ 350.00', true]
        ],
        invTotal: 'Total',
        paidLabel: 'Payment reconciled', paidSub: 'invoice #8841 · R$ 4,482.00 · Jun 12'
      }
    },
    chat: {
      eyebrow: 'Chat & MCP', h2a: 'All of it,', h2b: 'by chat too.',
      lead: "Anything the interface does, the chat does too. Ask about your portfolio, give instructions, adjust invoices — in plain language, like you'd talk to someone on your team.",
      mcpT: 'Prefer your own AI chat?',
      mcpS: "Connect Claude or ChatGPT to Kontiva's MCP server and run everything without leaving your favorite AI.",
      head: 'Kontiva · Chat', status: 'connected',
      u1: 'How many contracts expire next month?',
      b1a: '7 contracts', b1b: ' expire in July. 5 renew automatically with INPC adjustment; 2 are flagged for renegotiation. Want the list?',
      u2: 'Give Clínica Vitta a R$ 500 discount on the next invoice — the fine was our responsibility.',
      b2a: 'Done. ', b2b: 'R$ 500 discount', b2c: " applied to Clínica Vitta's July invoice, with the justification logged in the history.",
      u3: 'How much did I bill last month, fixed vs. extras?',
      b3a: 'In May: ', b3b: 'R$ 86,420', b3c: ' in fixed retainers and ', b3d: 'R$ 7,310', b3e: ' in overages and adjustments — 7.8% of revenue came from extras.'
    },
    agents: {
      eyebrow: 'AI agents',
      h2a: 'Agents watching your portfolio,', h2b: 'around the clock.',
      lead: 'Create AI agents inside Kontiva that continuously sweep your portfolio and act on their own: they flag renewals, dispatch billing, run audits — and ask for your approval when needed.',
      items: [
        { t: 'Alerts where you work', s: 'Upcoming renewals, invoices sent, discrepancies found — straight to email, Slack or Teams.' },
        { t: 'One-click approvals', s: 'The agent asks before acting whenever you want: approve an adjustment, confirm a charge, authorize a discount.' },
        { t: 'Automatic reports', s: 'Periodic portfolio summaries for you — and service reports for your clients.' }
      ],
      feedHead: 'Agent activity', feedLive: 'Today',
      notes: [
        { ch: 'Slack', who: 'Agent · Renewals', body: "Padaria São Jorge's contract renews in 15 days. Apply INPC adjustment +4.8%?", a1: 'Approve', a2: 'Review' },
        { ch: 'Email', who: 'Agent · Billing', body: '42 June invoices generated and sent to Asaas. 38 already paid.' },
        { ch: 'Teams', who: 'Agent · Audit', body: 'Sweep complete: 2 contracts with unbilled overages in May.', a1: 'View details' },
        { ch: 'Email', who: 'Agent · Reports', body: 'Monthly portfolio report sent to you and 12 clients.' }
      ]
    },
    results: {
      eyebrow: 'Outcomes', h2: 'What changes at month-end',
      items: [
        { title: 'Hundreds of hours back', body: "Checking contracts, calculating overages, issuing invoices, matching payments — none of it is your team's manual work anymore." },
        { title: 'Zero money on the table', body: "No forgotten adjustment, no unbilled one-off service, no overage slipping through. If it's in the contract, it gets billed." },
        { title: 'Zero errors, full transparency', body: 'Invoices go out itemized line by line. Your clients see exactly what they pay for — and your firm looks sharper for it.' }
      ]
    },
    calc: {
      eyebrow: 'Calculator', h2a: 'How much is your firm', h2b: 'leaving on the table?',
      lead: "Adjust the numbers for your firm. It's not a guess — it's the average we find in portfolios like yours.",
      note: 'Estimate based on unapplied adjustments, unbilled extra services and expired contracts. The real number is usually higher. Hour savings assume 1.5 h/month per client at a R$ 40/h accounting analyst cost.',
      f1: 'Active clients in your portfolio', f2: 'Average monthly fee', f3: 'Revenue potentially lost',
      f3note: 'Fixed at 2% — the conservative floor of what we find in real portfolios.',
      r1: 'Monthly estimate', r3: 'per year', r4: 'in team hours saved'
    },
    pricing: {
      eyebrow: 'Pricing', h2a: 'Simple: a base fee', h2b: '+ a per-client rate.',
      tag: 'Most popular', perMonth: '/mo', perClient: 'per managed client',
      limits: ['Up to 10 clients', 'Up to 100 clients', 'Unlimited clients'],
      cta: 'Start with', ctaMsg: (p) => `Hi, I'm interested in Kontiva.ai's ${p} plan`,
      note: 'Every plan includes everything: contract reading, ERP integration, overage and adjustment calculation, invoicing and reconciliation, chat and MCP server. The only difference is portfolio size.'
    },
    faq: {
      eyebrow: 'FAQ', h2: 'Frequently asked questions',
      items: [
        { q: 'What format should my contracts be in?', a: 'Any format: PDF, DOC, image — even a photo of a paper contract. The AI extracts parties, scope, fixed and variable fees, overage rules, renewal dates and adjustment indexes. Everything becomes structured, queryable data.' },
        { q: 'Do I need to integrate with my ERP?', a: 'No. The integration (Domínio, Thomson Reuters, Totvs, SAP and others) automates reading the volume of services delivered, but you can also simply send the reports in any format and Kontiva will process them.' },
        { q: 'Can I review invoices before they go out?', a: 'Yes. You decide what goes out automatically and what requires approval. Negotiated a discount or a different amount? Adjust it on the spot — through the interface or the chat.' },
        { q: 'How are invoices issued and reconciled?', a: 'Kontiva sends charges to your billing platform (Nibo, Asaas, Stripe and others) or generates a CNAB400 file for any bank. When your client pays, the payment is identified and recorded automatically.' },
        { q: 'What about contract adjustments?', a: 'If the contract renews with an index adjustment (INPC, IGP-M, etc.), the new amount is calculated and included in the billing automatically — with the adjustment itemized on the invoice, for full transparency with your client.' },
        { q: 'Can I run Kontiva from Claude or ChatGPT?', a: "Yes. Connect your favorite AI to Kontiva's MCP server and ask questions, give instructions and adjust invoices without leaving the chat you already use." },
        { q: 'How does the free assessment work?', a: "Send us 5 contracts and the period's service reports, tell us what you billed each client — and we'll send back the math on what went unbilled. Free, no strings attached." }
      ]
    },
    cta: {
      eyebrow: 'Free assessment',
      h2a: 'How much did you', h2b: 'leave unbilled?', h2hl: "We'll do the math.",
      sub: "We'll run a free assessment of your portfolio — and send back an X-ray of what was left on the table.",
      steps: ["Send 5 client contracts", "Gather the period's service reports", 'Tell us what you billed each one', 'Get the math on what went unbilled'],
      whats: 'Chat on WhatsApp', whatsMsg: 'Hi, I want the free assessment of my portfolio',
      formT: 'Request your free assessment',
      formS: "Free, no strings attached. We'll tell you how much went unbilled.",
      fName: 'Name', fNamePh: 'Your name',
      fWhats: 'WhatsApp', fWhatsPh: '+55 (11) 99999-9999',
      fEmail: 'Email', fEmailPh: 'you@yourfirm.com',
      fClients: 'Clients in portfolio', fClientsPh: '120',
      fMsg: 'Message (optional)', fMsgPh: 'Tell us a bit about your firm',
      submit: 'Request free assessment',
      okT: 'We got your message ✓',
      okS: 'Our team replies within 1 business day with instructions for sending the assessment contracts.'
    },
    footer: {
      tagline: 'AI-powered contract and billing management, end to end, for accounting firms.',
      whats: 'Chat with us on WhatsApp', whatsMsg: 'Hi, I came from the Kontiva.ai website',
      colProduct: 'Product', colCompany: 'Company', colContact: 'Contact',
      lHow: 'How it works', lChat: 'Chat & MCP', lAgents: 'AI agents', lCalc: 'Calculator', lPlans: 'Pricing',
      lFaq: 'FAQ', lEval: 'Free assessment', lEmail: 'contato@kontiva.ai',
      copyright: '© 2026 Kontiva.ai · All rights reserved.',
      bm: 'Kontiva is a BlueMetrics company.',
      privacy: 'Privacy Policy', terms: 'Terms of Use'
    }
  }
};
