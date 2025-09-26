import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import App from "./App";
import "./index.css";
import UserProvider from "./usuario_sesion/UserContext";
import "./estilos/style.scss";
import { InteractionStatus } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";

// Configuración de MSAL (ajusta con tus valores reales de config.env)
const msalConfig = {
  auth: {
    clientId: "46d9fcd7-fd32-4d6d-99b9-353bffe6c976",
    authority: `https://login.microsoftonline.com/326e43ac-c8b6-4d59-b0eb-314b79dd9c13`,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};

const pca = new PublicClientApplication(msalConfig);

// Función asíncrona para inicializar y renderizar
async function initializeAndRender() {
  try {
    console.log("Iniciando inicialización de MSAL...");
    await pca.initialize();
    console.log("MSAL inicializado.");

    console.log("Manejando redirect promise...");
    await pca.handleRedirectPromise();
    console.log("Redirect promise manejado.");

    const allAccounts = pca.getAllAccounts();
    if (allAccounts.length > 0) {
      pca.setActiveAccount(allAccounts[0]);
      console.log("Cuenta activa seteada.");
    }

    // Delay simple para dar tiempo a MSAL en lugar de loop
    console.log("Esperando 500ms para MSAL ready...");
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Delay completado, procediendo a render.");
  } catch (error) {
    console.error("Error en inicialización:", error);
  } finally {
    // Render siempre, con fallback si no hay instancia
    console.log("Renderizando app siempre...");
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <React.StrictMode>
        <MsalProvider instance={pca}>
          <UserProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </UserProvider>
        </MsalProvider>
      </React.StrictMode>
    );
    console.log("App renderizada.");
  }
}

// Ejecuta la inicialización
initializeAndRender();
