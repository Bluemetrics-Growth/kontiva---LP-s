// Kontiva MVP — Source viewer drawer (PDF mock with highlight)

const { useState: useStateSV, useEffect: useEffectSV } = React;

// Each source excerpt is a mock "page" with a highlighted block.
// In production this would be real coordinates on the actual PDF.
const SOURCE_EXCERPTS = {
  "client.name": {
    page: 1, clause: "Cláusula 1ª — Das Partes",
    before: "Pelo presente instrumento particular de prestação de serviços contábeis, de um lado, na qualidade de CONTRATANTE,",
    highlight: "CONSTRUTORA HORIZONTE LTDA.",
    after: ", pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 12.345.678/0001-90, com sede na Av. Paulista, 1578 — sala 1204, São Paulo/SP, neste ato representada por seu sócio-administrador Sr. Ricardo Almeida Souza.",
  },
  "client.cnpj": {
    page: 1, clause: "Cláusula 1ª — Das Partes",
    before: "CONSTRUTORA HORIZONTE LTDA., pessoa jurídica de direito privado, inscrita no",
    highlight: "CNPJ sob o nº 12.345.678/0001-90",
    after: ", com sede na Av. Paulista, 1578 — sala 1204, São Paulo/SP.",
  },
  "client.address": {
    page: 1, clause: "Cláusula 1ª — Das Partes",
    before: "inscrita no CNPJ sob o nº 12.345.678/0001-90, com sede na",
    highlight: "Av. Paulista, 1578 — sala 1204, São Paulo/SP",
    after: ", neste ato representada por seu sócio-administrador.",
  },
  "client.representative": {
    page: 1, clause: "Cláusula 1ª — Das Partes",
    before: "neste ato representada por seu sócio-administrador",
    highlight: "Sr. Ricardo Almeida Souza",
    after: ", portador da cédula de identidade nº 22.xxx.xxx SSP/SP.",
  },
  "contract.object": {
    page: 2, clause: "Cláusula 2ª — Do Objeto",
    before: "Constitui objeto do presente contrato a",
    highlight: "prestação de serviços contábeis mensais, incluindo escrituração fiscal, folha de pagamento e apuração de tributos federais, estaduais e municipais",
    after: ", conforme especificações técnicas detalhadas no Anexo I.",
  },
  "contract.monthlyValue": {
    page: 3, clause: "Cláusula 4ª — Do Preço",
    before: "Pelos serviços contratados, a CONTRATANTE pagará à CONTRATADA o valor mensal de",
    highlight: "R$ 3.820,00 (três mil, oitocentos e vinte reais)",
    after: ", já incluídos todos os tributos e encargos incidentes.",
  },
  "contract.paymentMethod": {
    page: 3, clause: "Cláusula 4ª — Do Preço · §1º",
    before: "O pagamento será efetuado mediante",
    highlight: "boleto bancário, com vencimento todo dia 10 (dez)",
    after: "do mês subsequente ao da prestação dos serviços.",
  },
  "contract.priceConditions": {
    page: 3, clause: "Cláusula 4ª — Do Preço · §2º e §3º",
    before: "O valor mensal é fixo e será",
    highlight: "reajustado anualmente pela variação do IPCA acumulado nos 12 meses anteriores. Serviços fora do escopo descrito na Cláusula 3ª serão cobrados com acréscimo de 15% sobre o valor mensal",
    after: ", mediante aprovação prévia da CONTRATANTE.",
  },
  "adjustment.index": {
    page: 4, clause: "Cláusula 5ª — Do Reajuste",
    before: "O valor dos honorários será reajustado pela variação positiva do",
    highlight: "Índice Nacional de Preços ao Consumidor Amplo — IPCA",
    after: ", divulgado pelo IBGE, acumulado no período de doze meses.",
  },
  "adjustment.periodicity": {
    page: 4, clause: "Cláusula 5ª — Do Reajuste",
    before: "O reajuste será aplicado",
    highlight: "a cada 12 (doze) meses, contados a partir da data de assinatura",
    after: ", independentemente de aviso ou comunicação prévia.",
  },
  "adjustment.lastAdjustment": {
    page: 4, clause: "Anexo II — Histórico de Reajustes",
    before: "Último reajuste aplicado em",
    highlight: "01 de março de 2025",
    after: ", correspondente a IPCA acumulado de 4,87%.",
  },
  "adjustment.nextAdjustment": {
    page: 4, clause: "Anexo II — Histórico de Reajustes",
    before: "Próximo reajuste previsto para",
    highlight: "01 de março de 2026",
    after: ", conforme periodicidade contratual.",
  },
  "validity.start": {
    page: 5, clause: "Cláusula 7ª — Da Vigência",
    before: "O presente contrato terá vigência a partir de",
    highlight: "01 de março de 2024",
    after: ", com duração de 36 (trinta e seis) meses.",
  },
  "validity.end": {
    page: 5, clause: "Cláusula 7ª — Da Vigência",
    before: "O presente contrato terá duração de",
    highlight: "36 (trinta e seis) meses, encerrando-se em 01 de março de 2027",
    after: ", salvo hipótese de renovação automática.",
  },
  "validity.anniversary": {
    page: 5, clause: "Cláusula 7ª — Da Vigência · §2º",
    before: "Considera-se aniversário contratual o",
    highlight: "dia 1º de março de cada ano",
    after: ", data a partir da qual se computa o período para fins de reajuste.",
  },
  "validity.renewal": {
    page: 5, clause: "Cláusula 8ª — Da Renovação",
    before: "Findo o prazo inicial, o contrato",
    highlight: "renovar-se-á automaticamente por períodos iguais e sucessivos de 12 meses, salvo denúncia expressa de qualquer das partes com antecedência mínima de 60 dias",
    after: "do término do período vigente.",
  },
  "extras.outOfScope": {
    page: 6, clause: "Cláusula 3ª — §3º — Serviços Extraordinários",
    before: "Não estão incluídos no escopo deste contrato, sendo cobrados à parte:",
    highlight: "consultoria tributária especial, defesas em processos administrativos e abertura ou encerramento de filiais",
    after: ", cujos valores seguirão tabela anexa atualizada anualmente.",
  },
  "extras.extraFee": {
    page: 6, clause: "Cláusula 3ª — §4º",
    before: "Cada serviço extraordinário será cobrado com acréscimo de",
    highlight: "15% (quinze por cento) sobre o valor mensal vigente",
    after: ", por evento, mediante orçamento prévio.",
  },
  "quota.employees": {
    page: 2, clause: "Cláusula 3ª — §1º — Do Escopo Quantitativo",
    before: "O valor mensal pactuado contempla o processamento da folha de até",
    highlight: "10 (dez) funcionários. Excedentes serão cobrados à razão de R$ 45,00 por funcionário entre o 11º e o 20º; R$ 38,00 entre o 21º e o 50º; e R$ 30,00 a partir do 51º funcionário",
    after: ", proporcionalmente aos meses em que o limite for ultrapassado.",
  },
  "quota.fiscalDocs": {
    page: 2, clause: "Cláusula 3ª — §2º — Documentos Fiscais",
    before: "Estão inclusos na mensalidade a escrituração de até",
    highlight: "60 (sessenta) documentos fiscais por mês. Documentos adicionais serão cobrados a R$ 3,20 cada até o 120º, e R$ 2,40 a partir do 121º",
    after: ", apurados no fechamento mensal.",
  },
  "quota.branches": {
    page: 2, clause: "Cláusula 3ª — §3º — Filiais",
    before: "O contrato abrange 1 (uma) matriz. Cada",
    highlight: "filial ou CNPJ adicional será cobrado à razão de R$ 420,00 mensais",
    after: ", independentemente do porte ou regime tributário.",
  },
};

const SourceDrawer = ({ fieldKey, fileName, onClose }) => {
  const excerpt = SOURCE_EXCERPTS[fieldKey];

  // Close on Escape
  useEffectSV(() => {
    if (!fieldKey) return;
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [fieldKey, onClose]);

  return (
    <>
      <div
        className={"source-backdrop" + (fieldKey ? " open" : "")}
        onClick={onClose}
      />
      <aside className={"source-drawer" + (fieldKey ? " open" : "")}>
        {excerpt && (
          <>
            <div className="sd-head">
              <div>
                <div className="sd-eyebrow">
                  <IDoc size={12} /> {fileName || "Contrato.pdf"} · pág. {excerpt.page}
                </div>
                <h3>{excerpt.clause}</h3>
              </div>
              <button className="sd-close" onClick={onClose} aria-label="Fechar">
                <IClose size={18} />
              </button>
            </div>

            <div className="sd-page">
              <div className="sd-paper">
                <div className="sd-page-head">
                  <span>{fileName || "Contrato.pdf"}</span>
                  <span>pág. {excerpt.page} de 7</span>
                </div>
                <div className="sd-clause-label">{excerpt.clause}</div>
                <p className="sd-body">
                  {excerpt.before}{" "}
                  <mark className="sd-highlight">{excerpt.highlight}</mark>
                  {" "}{excerpt.after}
                </p>
                <div className="sd-ellipsis">⋯</div>
              </div>
            </div>

            <div className="sd-foot">
              <span className="sd-hint">Trecho identificado pela IA — clique em "Editar" no campo se não bater.</span>
              <button className="btn btn-ghost" onClick={onClose} style={{ fontSize: 13, padding: "8px 14px" }}>
                Fechar
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

Object.assign(window, { SourceDrawer, SOURCE_EXCERPTS });
