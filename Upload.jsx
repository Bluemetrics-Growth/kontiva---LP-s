// Kontiva MVP — Upload screens (first contract onboarding)

const { useState: useStateU, useRef: useRefU } = React;

// Shared drag-and-drop hook
function useDropzone(onFile) {
  const [active, setActive] = useStateU(false);
  const [fileName, setFileName] = useStateU(null);
  const inputRef = useRefU(null);

  const handleFiles = (files) => {
    if (!files || !files.length) return;
    const f = files[0];
    setFileName(f.name);
    onFile && onFile(f);
  };

  const onDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    setActive(false);
    if (e.dataTransfer && e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };
  const onDragOver = (e) => {
    e.preventDefault(); e.stopPropagation();
    setActive(true);
  };
  const onDragLeave = (e) => {
    e.preventDefault(); e.stopPropagation();
    setActive(false);
  };
  const onClick = () => { inputRef.current && inputRef.current.click(); };
  const onInputChange = (e) => handleFiles(e.target.files);

  return { active, fileName, inputRef, onDrop, onDragOver, onDragLeave, onClick, onInputChange, setFileName };
}

// ---------- Variant A: Centered onboarding (kept for reference) ----------
const UploadCentered = ({ user, onFile, onLogout }) => {
  const dz = useDropzone(onFile);
  return (
    <div className="upload-centered">
      <div className="top-strip">
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <Brand />
          <span className="breadcrumb">
            <span>Onboarding</span>
            <span className="sep">/</span>
            <span>Primeiro contrato</span>
          </span>
        </div>
        <div className="user-chip">
          <span className="avatar">MG</span>
          <span>{user}</span>
          <button onClick={onLogout} className="btn btn-ghost"
            style={{ padding: "6px 12px", fontSize: 12, marginLeft: 8 }}>Sair</button>
        </div>
      </div>
      <div className="content">
        <div className="heading">
          <div className="eyebrow"><span className="dot-cyan" /> Passo 1 de 1</div>
          <h1>
            Envie o primeiro contrato.<br />
            A gente <span className="serif-accent">começa a ler</span> no mesmo segundo<span style={{ color: "var(--ciano)" }}>.</span>
          </h1>
          <p className="sub">Qualquer PDF ou DOCX serve.</p>
        </div>
        <div
          className={"dropzone" + (dz.active ? " active" : "")}
          onDrop={dz.onDrop} onDragOver={dz.onDragOver} onDragLeave={dz.onDragLeave}
          onClick={dz.onClick} role="button" tabIndex={0}
        >
          <div className="dz-icon"><IUpload size={30} /></div>
          <div>
            <div className="dz-title">Arraste o contrato aqui</div>
            <div className="dz-sub" style={{ marginTop: 10 }}>Um contrato basta para o primeiro raio-X.</div>
          </div>
          <input ref={dz.inputRef} type="file" accept=".pdf,.docx,application/pdf"
            onChange={dz.onInputChange} style={{ display: "none" }} />
        </div>
      </div>
    </div>
  );
};

// ---------- Variant B: Workspace upload (used by the live prototype) ----------
const UploadWorkspace = ({ user, onFile, onLogout, onNavClick }) => {
  const dz = useDropzone((f) => { onFile && onFile(f); });

  return (
    <WorkspaceShell activeNav="home" counts={{ clients: 0, contracts: 0 }} onNavClick={onNavClick}>
      <div className="ws-topbar">
        <div className="crumb">
          <span>Início</span>
          <span className="sep">/</span>
          <span style={{ color: "var(--azul-profundo)" }}>Primeiro contrato</span>
        </div>
        <div className="right-actions">
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            fontSize: 13, color: "var(--cinza-escuro)", fontWeight: 500
          }}>
            <span className="avatar" style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "var(--azul-profundo)", color: "#EAF6FF",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700
            }}>MG</span>
            <span>{user}</span>
          </div>
          <button onClick={onLogout} className="btn btn-ghost"
            style={{ padding: "8px 14px", fontSize: 13 }}>Sair</button>
        </div>
      </div>

      <div className="ws-body">
        <div className="wrap">
          <div className="ws-heading">
            <div className="eyebrow">
              <span className="dot-cyan" /> Começar
            </div>
            <h1>
              Solte o primeiro <span className="serif-accent">contrato</span>.
            </h1>
            <div className="sub">
              A gente lê o documento, identifica o cliente e cria a ficha dele sozinha.
              Você não precisa cadastrar nada antes — só enviar.
            </div>
          </div>

          <div className="client-card">
            <div className="card-head">
              <h3>Upload do contrato</h3>
              <span className="step-chip">Passo único</span>
            </div>

            <div className="client-grid">
              <div
                className={"ws-dropzone" + (dz.active ? " active" : "")}
                onDrop={dz.onDrop}
                onDragOver={dz.onDragOver}
                onDragLeave={dz.onDragLeave}
                onClick={dz.onClick}
                role="button"
                tabIndex={0}
              >
                <div className="dz-icon"><IUpload size={24} /></div>
                <div>
                  <div className="dz-title">Arraste o contrato aqui</div>
                  <div className="dz-sub" style={{ marginTop: 6 }}>
                    ou <u style={{ textUnderlineOffset: 3 }}>selecione um arquivo</u> (PDF, DOCX · até 20 MB)
                  </div>
                </div>
                <input
                  ref={dz.inputRef}
                  type="file"
                  accept=".pdf,.docx,application/pdf"
                  onChange={dz.onInputChange}
                  style={{ display: "none" }}
                />
              </div>

              <div className="ws-checklist">
                <div className="cl-title">A Kontiva extrai do contrato</div>
                <div className="cl-item"><span className="mark"><ITick size={9} /></span> Nome e CNPJ do cliente</div>
                <div className="cl-item"><span className="mark"><ITick size={9} /></span> Cláusulas de reajuste e índice</div>
                <div className="cl-item"><span className="mark"><ITick size={9} /></span> Escopo e serviços extras</div>
                <div className="cl-item"><span className="mark"><ITick size={9} /></span> Vigência, renovação e aniversário do contrato</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceShell>
  );
};

Object.assign(window, { UploadCentered, UploadWorkspace });
