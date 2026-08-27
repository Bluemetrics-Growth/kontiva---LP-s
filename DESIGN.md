# Kontiva.ai — Sistema Visual

> Fonte única de verdade para **toda** geração visual da Kontiva.ai.
> Este documento reflete a Landing page oficial (`Kontiva Landing.html`) e deve ser seguido em qualquer novo artefato (landing, app, deck, email, social, prototipo, mock).
>
> Regra de ouro: **se não está aqui, olhe para a Landing antes de inventar.**

---

## 1. Posicionamento de marca

- **Produto:** Kontiva.ai — inteligência que lê contratos contábeis e recupera receita.
- **Tagline principal:** *Gestão contábil sem ponto cego.*
- **Tom de voz:** direto, confiante, sem jargão de agência. Português do Brasil. Frases curtas. Verbos no presente.
- **Metáfora visual dominante:** *radar / varredura* — a Kontiva vê o que passou despercebido.
- **Anti-personas visuais:** dashboards genéricos de SaaS, ilustrações 3D estilo Gumroad, gradientes arco-íris, glassmorphism exagerado, emojis decorativos.

---

## 2. Paleta de cores

Todas as cores vivem como CSS variables em `:root`. **Não criar novas cores sem atualizar este documento.**

| Token | Hex | Uso |
|---|---|---|
| `--azul-profundo` | `#0A1F3F` | Texto primário, fundos escuros (hero mock, CTA final, footer) |
| `--azul-profundo-2` | `#122A52` | Hover de botão escuro, elevação sutil sobre `--azul-profundo` |
| `--ciano` | `#00D4FF` | **Acento único.** CTAs primárias, highlights, flagged states, números de receita recuperada |
| `--ciano-suave` | `#E0F9FF` | Fundos de seção calma (ex.: seção calculadora) |
| `--branco` | `#FFFFFF` | Fundo padrão de página |
| `--cinza-claro` | `#F2F4F7` | Fundo de seção alternada (ex.: "problema") |
| `--cinza-texto` | `#6B7280` | Texto secundário, captions |
| `--cinza-escuro` | `#374151` | Corpo de texto sobre fundo claro |

### Regras de uso
- **Ciano é escasso.** Use para 1 coisa por dobra de tela: a CTA, o número que importa, o item "flagged". Se tudo é ciano, nada é ciano.
- **Fundos escuros** (`--azul-profundo`) são **produto / prova** (mocks, resultados, CTA final). Fundos claros são **contexto / narrativa**.
- **Nunca** use vermelho/verde semânticos chapados. Para "erro" em planilha legada use `#C23A1F` sobre `#FFF1EC`; é parte do mock "antes", não da UI Kontiva.
- **Sobre fundo escuro**, texto claro é `#EAF6FF` (não branco puro) — dá um calor sutil.

### Accent boost
O acento ciano pode ser modulado via `--accent-boost` (0.5 → 1.4). Use `color-mix(in oklab, var(--ciano) calc(X% * var(--accent-boost)), transparent)` em sombras, glows e fundos de destaque. Default: `1.05`.

---

## 3. Tipografia

```css
--font-display: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-body:    'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-serif-italic: 'Instrument Serif', Georgia, serif;
--font-mono:    'JetBrains Mono', ui-monospace, monospace;
```

Fonts carregadas via Google Fonts: **Inter** (400–800), **Space Grotesk**, **Sora**, **Geist**, **Instrument Serif** (ital), **JetBrains Mono**.

### Hierarquia

| Papel | Família | Peso | Tamanho | Tracking | Line-height |
|---|---|---|---|---|---|
| H1 (hero) | display | 700 | `clamp(48px, 7vw, 96px)` | `-0.04em` | `0.98` |
| H2 | display | 700 | `clamp(36px, 4.4vw, 64px)` | `-0.03em` | `1.02` |
| H3 | display | 700 | `clamp(22px, 2.2vw, 28px)` | `-0.03em` | `1.2` |
| Lead | body | 400 | `clamp(18px, 1.6vw, 22px)` | — | `1.5` |
| Body | body | 400 | 15–16px | — | `1.55` |
| Eyebrow | body | 600 | 12px | `0.12em` UPPERCASE | — |
| Mono / números / "códigos" | mono | 400–600 | 11–14px | `0.04em` | — |
| Acento serifa itálica | serif italic | 400 | herda | `-0.01em` | — |

### Regras
- Títulos sempre com `text-wrap: balance`. Parágrafos longos com `text-wrap: pretty`.
- Ativar `font-feature-settings: "ss01", "cv11"` no `body` (Inter stylistic sets).
- **`-webkit-font-smoothing: antialiased`** global.
- Uma palavra em **`Instrument Serif` itálica** por título "hero" para adicionar voz humana (ex.: *"A gente encontra."*). Usar com parcimônia — 1 palavra por seção, no máximo.
- **Strike-through animado** no hero: `<span class="strike">` com `::after` que escala `scaleX(0→1)` em ciano depois de 0.9s. Apenas no H1 do hero.
- Números de dinheiro em `font-variant-numeric: tabular-nums` quando aparecerem em destaque.
- **Nunca** usar `text-transform: uppercase` fora de eyebrows e labels de mono ≤ 12px.

---

## 4. Grid & espaçamento

```css
.shell { max-width: 1240px; margin: 0 auto; padding: 0 32px; }
section { padding: 120px 0; }
@media (max-width: 720px) { section { padding: 80px 0; } }
```

- Container padrão: **1240px**. Nada de container full-width sem motivo.
- Escala de espaçamento: `8 · 10 · 14 · 20 · 24 · 28 · 32 · 40 · 56 · 72 · 120`. Use esses valores; evite números aleatórios.
- Entre seções: **120px** desktop, **80px** ≤ 720px. Nunca menos.
- Dentro de painel/card: padding base **28px** (cards grandes) ou **16–18px** (linhas/rows).
- Gap entre CTAs no mesmo cluster: **14px**. Entre colunas hero: **72px**.

---

## 5. Radii, sombras, bordas

```css
/* Border-radius */
--r-xs: 6px;    /* tags mono, chips pequenos */
--r-sm: 10px;   /* botões, sheet rows */
--r-md: 12px;   /* radar rows, k-cards */
--r-lg: 16px;   /* calc-result */
--r-xl: 18-22px;/* painéis, calc-card, radar-card */
--r-pill: 99px; /* panel-tags, badges */
```

- Botões: **10px**.
- Cards de conteúdo: **18–22px**.
- Pills / badges: **99px**.

### Sombras
Sempre *tingidas*, nunca pretas puras.

```css
/* Elevação padrão sobre fundo claro */
box-shadow: 0 20px 60px -20px rgba(10,31,63,0.15);

/* Hero mock escuro (forte) */
box-shadow: 0 30px 80px -30px rgba(10,31,63,0.4), 0 0 0 1px rgba(10,31,63,0.08);

/* Glow ciano (CTA primária) */
box-shadow: 0 1px 0 rgba(0,0,0,0.04),
            0 10px 30px -10px color-mix(in oklab, var(--ciano) calc(70% * var(--accent-boost)), transparent);
```

### Bordas
- Sobre fundo claro: `1px solid rgba(10,31,63,0.06-0.14)` (nunca cinza chapado).
- Sobre fundo escuro: `1px solid rgba(255,255,255,0.06-0.1)`.
- **Zero** borda com accent color a menos que a linha esteja "flagged".

---

## 6. Componentes canônicos

### 6.1 Botão
Três variantes, nada mais.

```css
.btn { padding: 14px 22px; border-radius: 10px; font-weight: 600;
       font-size: 15px; letter-spacing: -0.01em;
       transition: transform .15s, box-shadow .2s, background .2s; }

.btn-primary { background: var(--ciano); color: var(--azul-profundo); }  /* CTA */
.btn-ghost   { background: transparent; color: var(--azul-profundo);
               border: 1px solid rgba(10,31,63,0.14); }                  /* secundária */
.btn-dark    { background: var(--azul-profundo); color: var(--branco); } /* em fundos claros fortes */
```
- Hover primária: `translateY(-1px)` + glow ciano mais forte.
- **CTA principal do produto é sempre WhatsApp.** Ícone SVG do WhatsApp (18×18) à esquerda + texto *"Falar no WhatsApp"*.
- Link URL padrão: `https://wa.me/5511999999999?text=...` (mensagem URL-encoded em pt-BR).

### 6.2 Nav
- Sticky, altura **72px**, fundo `rgba(255,255,255,0.82)` + `backdrop-filter: saturate(1.2) blur(14px)`, border-bottom `rgba(10,31,63,0.06)`.
- Logo à esquerda: lockup `Kontiva` (azul) + `.` (ciano) + `ai` (ciano).
- Links de seção à direita em **14px / 500 / `--cinza-escuro`**, CTA WhatsApp primária compacta (10×18 padding, 14px).

### 6.3 Eyebrow
Sempre abre uma seção. Padrão:
```html
<div class="eyebrow"><span class="dot-cyan"></span> NOME DA SEÇÃO</div>
```
Dot ciano de 6px com halo `box-shadow: 0 0 0 4px color-mix(...ciano 18%...)`.

### 6.4 Card escuro (produto/resultado)
Background `--azul-profundo`, texto `#EAF6FF`, padding **28px**, radius **20–22px**, **sempre** um detalhe radial sutil via `::before` com `color-mix(ciano)` e opcionalmente uma beam animada `::after` (`animation: scan 3.6s cubic-bezier(.7,0,.3,1) infinite`).

### 6.5 Card claro (contexto/narrativa)
Background `--branco`, border `1px solid rgba(10,31,63,0.08)`, radius **18–20px**. Hover: `translateY(-4px)` + borda com tint ciano.

### 6.6 "Flagged row" (linha em destaque)
O coração da identidade. Linha em mock escuro que pulsa quando algo foi detectado:
```css
.radar-row.flagged {
  border-color: color-mix(in oklab, var(--ciano) calc(55% * var(--accent-boost)), transparent);
  background:   color-mix(in oklab, var(--ciano) calc(8%  * var(--accent-boost)), transparent);
}
.radar-row.flagged .amount { color: var(--ciano); font-weight: 600; }
.radar-row.flagged .badge  { background: var(--ciano); color: var(--azul-profundo); }
```
Use para comunicar "a Kontiva viu isso". Máximo 30–40% das linhas flagged em qualquer lista — senão perde força.

### 6.7 Mock de planilha "antes"
Fonte **JetBrains Mono 12px**, células 40/1.6fr/1fr/1fr, border-bottom `rgba(10,31,63,0.06)`, header em `#F9FAFC` UPPERCASE 11px. Células `.err` em `#C23A1F`, `.faded` em `#B5BAC3`, `.blank` em `#D0D5DD`. Caption de problemas em tags `#FFF1EC / #A3401A`.

### 6.8 Tags / badges
```css
.panel-tag { font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
             text-transform: uppercase; padding: 5px 10px; border-radius: 99px; }
/* Antes */ background: #FFF1EC; color: #A3401A;
/* Depois */ background: var(--ciano); color: var(--azul-profundo);
```

### 6.9 Slider (calculadora)
Track 4px, preenchimento ciano-para-#E5E7EB via `--fill`. Thumb 20px azul profundo com borda ciano 3px.

---

## 7. Iconografia

- **Stroke-based, 1.6–2.2 weight, `currentColor`.** Linhas redondas (`stroke-linecap: round`).
- Tamanho padrão: 18×18 em conteúdo, 14×14 inline em botão, 10×10 em ticks.
- Biblioteca core: radar, documento, raio/bolt, seta, tick, WhatsApp.
- **Nunca** usar ícones coloridos, 3D ou emoji. Nada de ícones em caixa com gradiente de acento. Se precisar de um ícone que não existe, desenhe em SVG inline seguindo o estilo existente.
- **Placeholder de imagem:** retângulo com `background: repeating-linear-gradient(135deg, transparent 0 12px, rgba(0,212,255,0.06) 12px 13px)` + label mono. Não tente desenhar ilustrações.

---

## 8. Movimento

Princípio: **movimento serve a "a Kontiva está varrendo"**. Tudo mais deve ser quieto.

| Animação | Quando | Config |
|---|---|---|
| Scan beam vertical | Dentro de mock escuro (radar, cláusulas) | `translateY(-80% → 80%)`, 3.6s, `cubic-bezier(.7,0,.3,1)` infinite |
| Radar sweep circular | Ilustração "scan" (variante abstract) | `rotate(0→360)`, 3s linear infinite |
| Pulse dot | Status "Varredura ativa" | `box-shadow 0 → 10px transparent`, 1.6s ease-out infinite |
| Reveal on scroll | Seções ao entrar no viewport | `opacity 0→1` + `translateY(24px→0)`, 0.8s, delays escalonados (`.delay-1..4` = 80/160/240/320ms) |
| Strike-through hero | Uma vez, ao carregar | `scaleX(0→1)`, 1.1s, delay 0.9s, `cubic-bezier(.2,.7,.1,1)` |
| Button hover | Primária | `translateY(-1px)` + glow aumenta |

- **Reveal** via `IntersectionObserver` com `threshold: 0.12`, adicionando classe `.in`. Implementação em `useReveal(rootRef)`.
- Evite parallax, zoom em scroll, text scrambling, confete.

---

## 9. Estrutura de landing / seções

Ordem canônica (repita em materiais longos):

1. **Nav** sticky.
2. **Hero** (fundo branco): título + mock escuro com radar-list à direita.
3. **Problema** (`--cinza-claro`): split antes/depois — planilha branca × painel Kontiva escuro.
4. **Calculadora** (`--ciano-suave`): narrativa à esquerda + card branco com sliders + resultado em card escuro.
5. **Como funciona** (`--branco`): três passos em cards claros, cada um com um `step-illus` escuro de 180px.
6. **CTA final** (`--azul-profundo`): título grande, um parágrafo, dois CTAs.
7. **Footer** (`--azul-profundo`, compacto): logo + linha de copyright.

**Regra:** alterna fundos (`branco → cinza-claro → branco → ciano-suave → branco → azul-profundo`). Nunca duas seções do mesmo fundo seguidas.

---

## 10. Copywriting

- **Voz:** primeira pessoa do plural ("a gente"), curta, específica. *"A Kontiva lê seus contratos, cruza com o que foi cobrado e mostra o que passou despercebido."*
- **Números concretos, sempre em BRL pt-BR.** `R$ 6.180,00`, não `$6.180` nem `R$6k`.
- **Nunca** "revolucionário", "game-changer", "disruptivo", "sinergia", "IA de ponta". Preferir verbos: *encontra, lê, cruza, recupera, mostra*.
- **Microcópia de CTA:** *"Falar no WhatsApp"*, *"Ver quanto você perde"*, *"Mande 5 contratos"*. Sempre concreta.
- **Títulos podem quebrar linha manualmente** com `<br/>` em hero/CTA final para controle tipográfico.
- **Itálico serifa** aparece 1x por seção chave, sobre um verbo emocional: *encontra*, *recupera*, *vê*.

---

## 11. Acessibilidade

- Contraste mínimo AA em todos os pares (ciano sobre azul profundo passa; ciano sobre branco **não** passa — nunca use ciano como texto em fundo claro, use como acento/fill).
- `focus-visible` herdado do browser com ring ciano aceitável; custom só se atrapalhar.
- Todos os botões-link têm `rel="noreferrer"` quando `target="_blank"`.
- Prefira `<a>` semântico quando navega, `<button>` quando dispara ação.

---

## 12. Tokens de arquivo

Ao criar qualquer novo artefato HTML:

1. **Copiar o bloco `:root`** do `Kontiva Landing.html` linha-por-linha. Não recriar à mão.
2. **Copiar `@import` de fontes** exatamente como está.
3. **Importar React/Babel** com as versões pinadas do Landing (`react@18.3.1`, `react-dom@18.3.1`, `@babel/standalone@7.29.0`) e seus hashes de integridade.
4. Reutilizar os componentes React `Brand`, `Nav`, `Footer`, hooks `useReveal`, ícones `IconWhats/Tick/Arrow/Radar/Doc/Bolt` — não reescrever.
5. Todo artefato multi-file deve referenciar este documento no topo: `<!-- Sistema visual: ver DESIGN.md -->`.

---

## 13. Checklist antes de entregar

- [ ] Fundos alternam; nenhuma seção repete o mesmo fundo da anterior.
- [ ] Ciano aparece no máximo 1x por dobra como acento.
- [ ] Radii seguem 10 / 12 / 18–22 / 99.
- [ ] Todo mock escuro tem sombra tingida em `--azul-profundo`, não preto.
- [ ] Título hero tem exatamente 1 palavra em `Instrument Serif` itálica.
- [ ] CTA WhatsApp com ícone SVG do WhatsApp à esquerda.
- [ ] Nenhum emoji decorativo, nenhum ícone 3D, nenhum gradiente arco-íris.
- [ ] `text-wrap: balance` em todos os títulos.
- [ ] Reveal on scroll ativo para blocos longos.
- [ ] Números em `tabular-nums` quando em destaque.
- [ ] Copy em pt-BR, primeira pessoa do plural, sem jargão.

---

*Este arquivo é vivo. Atualizar aqui **antes** de introduzir qualquer novo padrão visual em qualquer arquivo do projeto.*
