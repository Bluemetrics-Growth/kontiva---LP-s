// Kontiva MVP — App router (Login → Upload → Process → Review → BillingUpload → BillingProcess → BillingResult)

const { useState: useStateA, useEffect: useEffectA } = React;

const USER_DISPLAY = "Marcos Guedes";
const CLIENT_NAME = "Construtora Horizonte Ltda.";

const MVPApp = ({ variant = "b", embedded = false, storageKey }) => {
  const SK = storageKey || `kontiva-mvp-${variant}-route`;
  const [route, setRoute] = useStateA(() => {
    if (typeof localStorage === "undefined") return "login";
    return localStorage.getItem(SK) || "login";
  });
  const [fileInfo, setFileInfo] = useStateA(null);
  const [billingScenario, setBillingScenario] = useStateA("calc");
  const [currentClientId, setCurrentClientId] = useStateA("horizonte");

  useEffectA(() => {
    try { localStorage.setItem(SK, route); } catch (e) {}
  }, [route, SK]);

  const goLogin = () => { setRoute("login"); setFileInfo(null); };
  const goUpload = () => setRoute("upload");
  const goProcessing = (file) => {
    setFileInfo({ name: file && file.name ? file.name : "Contrato.pdf" });
    setRoute("processing");
  };
  const goReview = () => setRoute("review");
  const goBillingUpload = () => setRoute("billing_upload");
  const goBillingProcessing = (file, scenario) => {
    setFileInfo({ name: file && file.name ? file.name : "Lançamentos.xlsx" });
    if (scenario) setBillingScenario(scenario);
    setRoute("billing_processing");
  };
  const goBillingResult = () => setRoute("billing_result");
  const goClients = () => setRoute("clients");
  const handleNavClick = (key) => {
    if (key === "clients") setRoute("clients");
    else if (key === "home") setRoute("upload");
    else if (key === "contracts") setRoute("contracts");
    else if (key === "documents") setRoute("documents");
  };
  const openClient = (c) => {
    if (c && c.id) setCurrentClientId(c.id);
    setRoute("client_detail");
  };
  const openContract = (contract) => {
    // Only the Horizonte demo has a full contract review mock; others route there too
    // as a demonstrative stub (same underlying review screen).
    setRoute("review");
  };

  const Login = variant === "b" ? LoginCentered : LoginSplit;
  const Upload = variant === "b" ? UploadWorkspace : UploadCentered;

  let body;
  if (route === "login") {
    body = <Login onSuccess={goUpload} />;
  } else if (route === "upload") {
    body = <Upload user={USER_DISPLAY} onFile={goProcessing} onLogout={goLogin} onNavClick={handleNavClick} />;
  } else if (route === "processing") {
    body = <Processing
      fileName={fileInfo && fileInfo.name}
      mode="contract"
      onDone={goReview}
      onCancel={goUpload}
    />;
  } else if (route === "review") {
    body = <Review
      user={USER_DISPLAY}
      fileName={fileInfo && fileInfo.name}
      onConfirm={goBillingUpload}
      onLogout={goLogin}
      onNavClick={handleNavClick}
    />;
  } else if (route === "billing_upload") {
    body = <BillingUpload
      user={USER_DISPLAY}
      clientName={CLIENT_NAME}
      onFile={goBillingProcessing}
      onBack={goReview}
      onLogout={goLogin}
      onNavClick={handleNavClick}
    />;
  } else if (route === "billing_processing") {
    body = <Processing
      fileName={fileInfo && fileInfo.name}
      clientName={CLIENT_NAME}
      mode="billing"
      onDone={goBillingResult}
      onCancel={goBillingUpload}
    />;
  } else if (route === "clients") {
    body = <ClientsList
      user={USER_DISPLAY}
      onLogout={goLogin}
      onOpenClient={openClient}
      onNavClick={handleNavClick}
    />;
  } else if (route === "contracts") {
    body = <ContractsList
      user={USER_DISPLAY}
      onLogout={goLogin}
      onOpenClient={openClient}
      onNavClick={handleNavClick}
    />;
  } else if (route === "documents") {
    body = <DocumentsList
      user={USER_DISPLAY}
      onLogout={goLogin}
      onNavClick={handleNavClick}
    />;
  } else if (route === "client_detail") {
    const client = (typeof findClient === "function" && findClient(currentClientId)) || CLIENTS[0];
    body = <ClientDetail
      user={USER_DISPLAY}
      client={client}
      onLogout={goLogin}
      onBack={goClients}
      onOpenContract={openContract}
      onNavClick={handleNavClick}
    />;
  } else if (route === "billing_result") {
    body = <BillingResult
      user={USER_DISPLAY}
      clientName={CLIENT_NAME}
      scenario={billingScenario}
      onBack={goBillingUpload}
      onLogout={goLogin}
      onNavClick={handleNavClick}
    />;
  }

  return (
    <div style={{
      width: "100%",
      height: embedded ? "100%" : "100vh",
      overflow: "auto",
      background: "var(--branco)",
      position: "relative",
    }}>
      {body}
    </div>
  );
};

Object.assign(window, { MVPApp });
