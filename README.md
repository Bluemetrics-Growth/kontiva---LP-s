# LP Kontiva (lp.kontiva.ai)

Landing page autonoma de conversao do Kontiva, o Hub de agentes de IA para escritorios contabeis.
Construida em Astro (estatico), seguindo o design system do produto (ver `DESIGN.md`).

Metrica unica de sucesso: numero de formularios de agendamento de demo enviados. Um unico CTA na pagina, sempre com o mesmo destino (a ancora `#agendar`).

## Stack

- Astro 4, saida estatica (`output: 'static'`).
- CSS tokenizado do design system (sem framework), fontes via Google Fonts.
- Zero dependencia de runtime no cliente alem de JS leve para reveal, mascara de telefone, validacao e tracking.

## Rodar localmente

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # gera dist/ estatico
npm run preview  # serve o build
```

## Estrutura

```
src/
  data/showcase.ts          fonte unica dos numeros-vitrine (secao 7.1 do PRD)
  layouts/Base.astro        head, SEO/OG, JSON-LD, fontes, scripts globais (reveal, tracking)
  pages/index.astro         monta as secoes na ordem do funil
  styles/
    tokens.css              tokens do design system (cores, tipografia, radii, sombras)
    lp.css                  regras da LP e dos frames de app recriados
  components/
    Header, Hero, ProofBar, UrgencyCards, DifferentiationTable,
    HowItWorks, HonorariosAgent, ChatMcp, WhyBelieve, LeadForm, Faq,
    Footer, WhatsAppFloat, Icon
    app-frames/             telas do produto recriadas em HTML/CSS (nao sao prints)
      AppFrame               chrome comum (sidebar, topbar)
      VisaoFinanceira, SimulacaoCarteira, Fornecedores,
      FluxoCaixaSplit, GestaoExcedentes, ChatMock
public/
  favicon.svg, robots.txt, sitemap.xml, og/og.png
```

Os `Screenshot (N).png` na raiz do repo sao referencia visual de layout. As telas foram recriadas em HTML/CSS (preferencia do PRD sobre print estatico), entao os prints nao entram no build.

## Numeros da vitrine

Todos os numeros exibidos nos frames vivem em `src/data/showcase.ts` e descrevem um unico escritorio-exemplo ficticio (dados de demonstracao). Ajustar um numero ali muda em todos os lugares e mantem a coerencia. Cada tela tem o selo "Exemplo ilustrativo, dados de demonstracao" e os numeros tributarios levam o disclaimer de simulacao.

## Formulario e integracoes

O formulario (`src/components/LeadForm.astro`) valida no cliente, aplica mascara de WhatsApp, preserva UTMs e dispara eventos de conversao.

Destino do lead: definir a constante `LEAD_ENDPOINT` no script do `LeadForm.astro` com o endpoint do time (HubSpot Forms API, function serverless, etc.).

- Com `LEAD_ENDPOINT` definido: envio via `fetch` POST (JSON). Em falha, mostra o estado de erro com botao de WhatsApp e mantem os dados preenchidos.
- Sem `LEAD_ENDPOINT` (padrao): o lead e encaminhado pelo WhatsApp com a mensagem pre-preenchida (fallback documentado). O botao flutuante de WhatsApp fica sempre visivel, inclusive sem JS.

Numero de WhatsApp: ajustar `WHATSAPP_NUM` e `WHATSAPP_MSG` em `src/data/showcase.ts` (placeholder atual `5511999999999`).

## Tracking

Eventos empurrados para `window.dataLayer` (compativel com GTM):
`view_hero`, `cta_click` (com `position`: hero, s5, s6, form, header, whatsapp), `form_start`, `form_submit_success`, `whatsapp_click`. UTMs de qualquer origem sao preservadas em `sessionStorage` e anexadas ao lead.

## SEO

`title`, `meta description`, Open Graph e Twitter Card em `Base.astro`. Canonical proprio `https://lp.kontiva.ai/`. `robots.txt` e `sitemap.xml` em `public/`. H1 unico (headline do hero). OG image em `public/og/og.png` (1200x630, especifica da LP).

## Deploy

Build estatico em `dist/`. Publicar em qualquer host estatico (Netlify, Vercel, S3+CloudFront, etc.) apontando o subdominio `lp.kontiva.ai` para a saida. Ajustar `site` em `astro.config.mjs` se o dominio mudar.

## Regras de conteudo

Portugues do Brasil apenas. Sem preco na pagina. Sem urgencia por data. Um unico CTA. Zero travessao longo, zero emoji. Nenhuma promessa de economia tributaria especifica: os numeros tributarios sempre levam o selo de simulacao. Detalhes no `DESIGN.md` e no PRD.
