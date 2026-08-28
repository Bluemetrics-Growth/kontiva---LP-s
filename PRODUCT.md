# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dono ou socio de escritorio contabil de medio porte (cerca de 30 a 300 CNPJs recorrentes), a autoridade de aprovacao do escritorio. Chega por busca organica, indicacao, anuncio ou prospeccao. Estado mental: sobrecarregado de informacao sobre a reforma, sensivel ao "terror" que o mercado prega, cetico com "mais uma IA", em geral cauteloso e sem habito de uso de IA. Traz dois medos ao mesmo tempo: errar a resposta sobre a reforma para o cliente, e perder o cliente para outro escritorio mais preparado (a reforma e a maior janela de troca de contador em decadas).

## Product Purpose

Landing page autonoma de conversao em `lp.kontiva.ai`, desvinculada de qualquer evento ou campanha de e-mail. Destino de trafego organico, anuncios, links em bio e prospeccao. Metrica unica de sucesso: numero de formularios de agendamento de demo enviados (lead qualificado). O Kontiva e o Hub de agentes de IA para escritorios contabeis: reune gestao de clientes, regras de contrato, relatorios periodicos, calculo de cobranca e simulacao tributaria da reforma, e opera a rotina tributaria continua.

## Positioning

"ERP simula, agente opera." Simular regime, sozinho, ja virou commodity gratuita dentro de Dominio e Alterdata, entao a LP nao abre conversa por ai. A posicao defensavel esta um degrau acima: operar a rotina tributaria que comeca em 2027 e nao acaba em 2033, com creditos condicionados a adimplencia do fornecedor, fluxo de caixa do split payment, repricing e analise de compras. O Agente Tributario e o carro-chefe e a porta de entrada; o Agente de Honorarios (excedentes e reajustes) e o segundo agente, ofertado com qualificacao. Diferenciais que um vizinho nao copia de forma verdadeira: simulacao da carteira inteira em massa e ranqueada, multi-sistema, white-label, e operacao continua com observabilidade e aprovacao humana.

## Operating Context

O contador opera pela interface do Kontiva; a emissao real de boleto ou PIX acontece somente ali, apos revisao humana. Ciclo de cobranca: `aberto` para `revisado` ou `pronto_para_revisao`, depois `enviado`, depois `pago`. Simulacao tributaria IBS/CBS/ICMS/ISS em dois eixos: entre regimes (mesmo ano, Lucro Real x Presumido x Simples) e ao longo dos anos (2026, 2029, 2033). Precisao fiscal: o ano define as aliquotas vigentes (cronograma da LC 214/2025), classificacao por NCM (bens) e NBS (servicos), ICMS/ISS pela UF do fornecedor, DIFAL no interestadual; transferencia intragrupo nao e fato gerador. Fila priorizada de pendencias (Acoes de IA). Operacao tambem por chat, ou conectando a propria IA (Claude, ChatGPT) ao servidor MCP com superficie controlada por permissoes.

## Capabilities and Constraints

Capacidades: multi-sistema (le Dominio, Alterdata, Questor e planilhas, sem troca de ERP); simulacao da carteira inteira ranqueada por impacto; monitoramento de fornecedores e credito de IBS/CBS; projecao do caixa do split payment; gestao de excedentes e reajustes; observabilidade nativa (memoria de calculo e aliquota vigente lida do sistema, nao estimada); aprovacao humana em tudo que executa (fica registrado quem aprovou o que). O recurso de simulacao esta em fase de testes assistida.

Constraints da LP (fechadas): somente portugues; sem preco nem tabela de precos na pagina; sem urgencia por data nem contagem regressiva (a urgencia vem do fato da reforma); um unico CTA, sempre o mesmo destino (a ancora `#agendar`); zero travessao longo em qualquer texto; zero emoji decorativo; nenhuma promessa de economia tributaria especifica (todo numero tributario leva selo de simulacao e disclaimer); nenhum logo ou case de cliente real sem autorizacao. Formulario de cinco campos (Nome, WhatsApp, E-mail, Carteira, Sistema recomendado); termina no formulario, sem login nem area logada.

Indefinicoes (produto/deploy, nao inventar): destino do lead a definir pelo time (`LEAD_ENDPOINT` hoje vazio; fallback documentado e o WhatsApp); numero de WhatsApp ainda placeholder (`5511999999999`); paginas legais `/privacidade` e `/termos` a criar.

## Brand Commitments

Nome e lockup: Kontiva.ai (Kontiva em navy, `.ai` em ciano). Selo: "Kontiva e uma empresa BlueMetrics". Voz (fonte: `kontiva-brand-voice.md`): o engenheiro que entende de contabilidade e fala como gente; mostra o numero, explica o mecanismo, deixa o resultado convencer. Cinco principios: numero antes de adjetivo; anti-hype com elegancia (proibido "revolucionario", "disruptivo", "magico"); o contador e o heroi, o Kontiva e a ferramenta (nunca "a IA substitui"); honestidade estrutural (beta e dito como beta); portugues de gente, precisao de engenheiro (frases curtas, voz ativa, "voce" sempre). Lexico a usar: "Hub de agentes de IA", "agente", "carteira", "CNPJ ativo", "excedente", "reajuste", "creditos de impostos", "voce aprova antes", "setup sem custo", "memoria de calculo", "observabilidade". `DESIGN.md` e a fonte da verdade visual e e binding (metafora dominante radar/varredura; navy `#0A1F3F` + ciano `#00D4FF` escasso; Inter, Instrument Serif italica, JetBrains Mono).

## Evidence on Hand

Numeros exibidos nos frames sao ilustrativos, dados de demonstracao de um unico escritorio-exemplo ficticio (fonte unica em `src/data/showcase.ts`), sempre com selo "Exemplo ilustrativo" e, quando tributarios, disclaimer de simulacao. Provas reais e autorizadas (engenharia BlueMetrics): 10+ anos de IA aplicada, 200+ projetos entregues, AWS Advanced Partner, arquitetura multi-sistema, aprovacao humana. Dados de mercado citaveis: 32,7% das empresas nem comecaram a adaptacao; split payment em 2027 debita o imposto na venda; credito condicionado a extincao do debito do fornecedor (LC 214/2025); simplificacao plena so em 2033. Nao ha testemunhos, cases nominais, logos de clientes, benchmarks proprios nem precos publicos: futuras versoes nao devem fabricar nenhum deles.

## Product Principles

1. ERP simula, agente opera: liderar pela operacao da reforma, nunca por simulacao isolada nem por honorarios.
2. Voce aprova antes: aprovacao humana e observabilidade sao o antidoto ao medo de IA que inventa, e o principal argumento de confianca.
3. Um unico caminho: toda a pagina serve a um clique, agendar a demo com os dados do escritorio.
4. Honestidade estrutural: numero antes de adjetivo, beta dito como beta, sem promessa de economia especifica.
5. Sem atrito de adocao: multi-sistema, o escritorio nao troca de ERP nem muda a rotina para experimentar.

## Accessibility & Inclusion

Contraste minimo AA em todos os pares (atencao a texto sobre navy e sobre o gradiente ciano do CTA; ciano nunca como texto sobre fundo claro). Ordem de foco logica (header, hero CTA, secoes, formulario, footer); campos com label associado e `aria-describedby` para erros; nome acessivel claro em botoes e links; chrome puramente visual das telas recriadas marcado `aria-hidden`, com a mensagem de cada passo no texto. Respeitar `prefers-reduced-motion`. A pagina le e converte sem JavaScript. Publico cauteloso e sem habito de IA: o valor deve aparecer como relatorio de operacao tributaria, nao como interface de robo.
