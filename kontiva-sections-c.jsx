// Kontiva v2 — seções C: FAQ, CTA final + formulário, Footer
// (hooks useState/useEffect/useRef vêm de kontiva-base.jsx — escopo global compartilhado)

// ---------- FAQ ----------
const Faq = () => {
  const { t } = useLangCtx();
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section className="faq" id="faq" ref={ref} data-screen-label="FAQ">
      <div className="shell">
        <div className="section-head reveal" style={{ marginBottom: 48 }}>
          <div className="eyebrow"><span className="dot-cyan" /> {t.faq.eyebrow}</div>
          <h2 style={{ marginTop: 20 }}>{t.faq.h2}</h2>
        </div>
        <div className="faq-list reveal delay-1">
          {t.faq.items.map((f, i) =>
            <details className="faq-item" key={i}>
              <summary>
                <span>{f.q}</span>
                <span className="faq-chev"><IconChev /></span>
              </summary>
              <p className="faq-a">{f.a}</p>
            </details>
          )}
        </div>
      </div>
    </section>);
};

// ---------- CTA final + formulário ----------
const ContactForm = () => {
  const { t } = useLangCtx();
  const c = t.cta;
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div className="form-card">
        <div className="form-success">
          <div className="t">{c.okT}</div>
          <div className="s">{c.okS}</div>
        </div>
      </div>);
  }
  return (
    <div className="form-card">
      <h3>{c.formT}</h3>
      <p className="form-sub">{c.formS}</p>
      <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        <div className="f-row">
          <div className="f-field">
            <label htmlFor="f-nome">{c.fName}</label>
            <input id="f-nome" type="text" required placeholder={c.fNamePh} />
          </div>
          <div className="f-field">
            <label htmlFor="f-whats">{c.fWhats}</label>
            <input id="f-whats" type="tel" required placeholder={c.fWhatsPh} />
          </div>
        </div>
        <div className="f-row">
          <div className="f-field">
            <label htmlFor="f-email">{c.fEmail}</label>
            <input id="f-email" type="email" required placeholder={c.fEmailPh} />
          </div>
          <div className="f-field">
            <label htmlFor="f-clientes">{c.fClients}</label>
            <input id="f-clientes" type="number" min="1" placeholder={c.fClientsPh} />
          </div>
        </div>
        <div className="f-field">
          <label htmlFor="f-msg">{c.fMsg}</label>
          <textarea id="f-msg" placeholder={c.fMsgPh}></textarea>
        </div>
        <button type="submit" className="btn btn-dark" style={{ width: '100%' }}>
          {c.submit}
        </button>
      </form>
    </div>);
};

const FinalCTA = () => {
  const { t } = useLangCtx();
  const c = t.cta;
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section className="final-cta" id="avaliacao" ref={ref} data-screen-label="Avaliação gratuita">
      <div className="shell cta-grid">
        <div>
          <div className="eyebrow reveal" style={{ color: 'rgba(234,246,255,0.5)' }}>
            <span className="dot-cyan" /> {c.eyebrow}
          </div>
          <h2 className="reveal delay-1" style={{ marginTop: 20 }}>
            {c.h2a}<br />{c.h2b}<br />
            <span className="hl">{c.h2hl}</span>
          </h2>
          <p className="sub reveal delay-2">{c.sub}</p>
          <ol className="cta-steps reveal delay-2">
            {c.steps.map((s, i) =>
              <li key={i}><span className="n">0{i + 1}</span> {s}</li>
            )}
          </ol>
          <div className="reveal delay-3" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href={wa(c.whatsMsg)}
              target="_blank" rel="noreferrer" className="btn btn-primary"
              style={{ padding: '16px 26px', fontSize: 16 }}>
              <IconWhats /> {c.whats}
            </a>
          </div>
        </div>
        <div className="reveal delay-2">
          <ContactForm />
        </div>
      </div>
    </section>);
};

// ---------- Footer ----------
const Footer = () => {
  const { t } = useLangCtx();
  const f = t.footer;
  return (
    <footer data-screen-label="Footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p className="footer-tagline">{f.tagline}</p>
            <a href={wa(f.whatsMsg)} target="_blank" rel="noreferrer"
              className="btn btn-primary" style={{ padding: '11px 18px', fontSize: 14, alignSelf: 'flex-start' }}>
              <IconWhats /> {f.whats}
            </a>
            <div className="social-row">
              <a href="https://www.linkedin.com/company/bluemetrics/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><IconLinkedIn /></a>
              <a href="https://www.instagram.com/bluemetrics.ai/" target="_blank" rel="noreferrer" aria-label="Instagram"><IconInstagram /></a>
              <a href="https://www.youtube.com/@bluemetrics" target="_blank" rel="noreferrer" aria-label="YouTube"><IconYouTube /></a>
            </div>
          </div>
          <div className="footer-col">
            <h5>{f.colProduct}</h5>
            <a href="#como-funciona">{f.lHow}</a>
            <a href="#chat">{f.lChat}</a>
            <a href="#agentes">{f.lAgents}</a>
            <a href="#calculadora">{f.lCalc}</a>
            <a href="#planos">{f.lPlans}</a>
          </div>
          <div className="footer-col">
            <h5>{f.colCompany}</h5>
            <a href="#faq">{f.lFaq}</a>
            <a href="#avaliacao">{f.lEval}</a>
          </div>
          <div className="footer-col">
            <h5>{f.colContact}</h5>
            <a href={wa(f.whatsMsg)} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="mailto:contato@kontiva.ai">{f.lEmail}</a>
          </div>
        </div>
        <div className="footer-legal">
          <div>{f.copyright}</div>
          <div className="footer-bm">{f.bm}</div>
          <div className="footer-legal-links">
            <a href="#">{f.privacy}</a>
            <span aria-hidden="true">·</span>
            <a href="#">{f.terms}</a>
          </div>
        </div>
      </div>
    </footer>);
};

Object.assign(window, { Faq, FinalCTA, Footer });
