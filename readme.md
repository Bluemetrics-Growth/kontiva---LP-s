# Kontiva.ai — Design System

Sistema visual da **Kontiva.ai**, produto da BlueMetrics: uma camada de IA ("Service-as-Software") que lê contratos de escritórios de contabilidade, cruza com o que foi cobrado e recupera receita que vazou. Tagline: *Gestão contábil sem ponto cego.* Metáfora visual dominante: **radar / varredura**.

Fontes deste sistema (neste projeto): `DESIGN.md` (guia original, fonte única de verdade), `Kontiva Landing v3.html`, `Kontiva Contato.html`, `Kontiva Apresentacao Vendas.html` (deck 16:9), `MVP/Prototype.html`.

## Índice
- `styles.css` — entry global (só `@import`s). Linke este arquivo.
- `tokens/` — `colors.css`, `typography.css`, `effects.css` (radii/sombras), `fonts.css`.
- `css/landing.css` — regras canônicas da landing (nav, hero, radar, calc, footer…). `css/components.css` — form fields, lang-toggle, badges, cards.
- `ds/` — componentes React: `core/` (Button, Eyebrow, Badge, LangToggle), `cards/` (Card, RadarCard), `forms/` (Field), `site/` (Nav, Footer).
- `guidelines/` — specimen cards (cores, tipo, espaçamento, marca).
- `slides/` — 3 tipos de slide do deck de vendas.
- `assets/` — logos (color, light). Páginas reais: Landing v3, Contato (taggeadas como cards do grupo Website).
- `SKILL.md` — para uso como Agent Skill.

## CONTENT FUNDAMENTALS
- **Voz:** primeira pessoa do plural — "a gente" (informal, nunca "nós fazemos sinergia"). Frases curtas, verbos no presente: *encontra, lê, cruza, recupera, mostra*. PT-BR sempre; páginas têm toggle PT/EN (atributos `data-pt`/`data-en`).
- **Você/seu** para o leitor ("o seu escritório"), nunca "o cliente" ao falar com ele.
- **Proibido:** "revolucionário", "game-changer", "disruptivo", "IA de ponta", emoji decorativo.
- **CTAs concretas:** "Falar no WhatsApp", "Ver quanto você perde", "Mande 5 contratos". CTA principal do produto é **sempre WhatsApp** (ícone 18×18 à esquerda).
- **Números:** BRL pt-BR completo (`R$ 6.180,00`), `tabular-nums` em destaque.
- **Títulos:** exatamente 1 palavra em Instrument Serif itálica por título-chave, sobre um verbo emocional (*encontra*, *recupera*, *vê*). Quebras de linha manuais com `<br/>` quando ajuda o ritmo.
- Exemplo canônico: *"Mande seus contratos. A gente **mostra** o que falta cobrar."*

## VISUAL FOUNDATIONS
- **Cores:** azul profundo `#0A1F3F` (texto e fundos escuros) + **ciano `#00D4FF` como acento único e escasso** — 1 uso por dobra (a CTA, o número, a linha flagged). Ciano NUNCA como texto sobre fundo claro (não passa AA); só como fill/acento. Texto sobre escuro é `#EAF6FF`, nunca branco puro. Neutros: `#F2F4F7` (seção alternada), `#6B7280` (secundário), `#374151` (corpo). "Erro" só existe no mock de planilha legada (`#C23A1F` sobre `#FFF1EC`) — não é UI Kontiva.
- **Fundos alternam** por seção: branco → cinza-claro → branco → ciano-suave → branco → azul-profundo. Nunca dois iguais seguidos. Escuro = produto/prova; claro = narrativa.
- **Tipo:** Inter (400–800) para tudo, com `font-feature-settings: "ss01","cv11"` e antialiased; Instrument Serif itálica como voz humana pontual; JetBrains Mono para números, labels, códigos e eyebrows de deck. H1 `clamp(48px,7vw,96px)/0.98/-0.04em`. `text-wrap: balance` em títulos, `pretty` em parágrafos.
- **Espaçamento:** container 1240px (`.shell`, padding 32px); seções 120px (80px mobile); escala `8·10·14·20·24·28·32·40·56·72·120`.
- **Radii:** 10px botões · 12px rows · 18–22px cards · 99px pills.
- **Sombras:** sempre tingidas de azul (`rgba(10,31,63,…)`), nunca pretas. CTA primária tem glow ciano modulado por `--accent-boost` via `color-mix`.
- **Bordas:** `rgba(10,31,63,0.06–0.14)` no claro; `rgba(255,255,255,0.06–0.1)` no escuro. Borda ciano SÓ em linha "flagged".
- **Gradientes:** apenas radiais sutis de ciano em cards escuros (`::before`). Zero gradiente arco-íris, zero glassmorphism (exceto blur do nav sticky: `rgba(255,255,255,0.82)` + `backdrop-filter: blur(14px)`).
- **Animação:** o movimento serve à ideia "a Kontiva está varrendo". Scan beam vertical (3.6s), pulse dot (1.6s), reveal-on-scroll (`opacity+translateY(24px)`, 0.8s, delays 80–320ms, IntersectionObserver threshold 0.12), strike-through do hero (1x, scaleX). Hover de card: `translateY(-4px)` + borda ciano; botão primário: `translateY(-1px)` + glow maior. Sem parallax, zoom, confete.
- **Imagens:** não há fotografia. Mocks de produto (radar list, planilha) desenhados em HTML. Placeholder = retângulo com hairlines diagonais de ciano 6% + label mono.

## ICONOGRAFIA
- SVG inline **stroke-based**, peso 1.6–2.2, `currentColor`, `stroke-linecap: round`. 18×18 em conteúdo, 14×14 em botões, 10×10 em ticks.
- Set core: radar, documento, seta, tick, WhatsApp (path fixo usado em todas as páginas), bolt. Não há icon font nem sprite — os paths vivem inline no HTML/JSX (ver `ds/core/Button.jsx` para o WhatsApp e tick).
- Nunca: ícones coloridos, 3D, emoji, unicode-como-ícone.
- Logos em `assets/`: `kontiva-logo-color.png` (fundo claro), `kontiva-logo-light.png` (fundo escuro), `kontiva-logo.png`. Alternativa em texto: lockup `Kontiva` (azul) + `.ai` (ciano).

## Componentes (ds/)
Button (primary/ghost/dark, opção WhatsApp) · Eyebrow · Badge (on/dev/neutral + panel-tag antes/depois) · LangToggle · Card (claro) · RadarCard (mock escuro com flagged rows — coração da identidade; máx. 30–40% das linhas flagged) · Field (input/select/textarea) · Nav · Footer.

## Intentional additions
- Aliases semânticos de cor (`--text-primary`, `--surface-alt`…) sobre os tokens canônicos em pt-BR — os nomes originais (`--azul-profundo` etc.) continuam sendo a API primária.

## Caveats
- Fontes via Google Fonts `@import` (sem binários locais). Se houver licença/arquivos próprios, substituir em `tokens/fonts.css`.
- E-mails e redes sociais da Kontiva ainda são placeholders (ver página Contato).
