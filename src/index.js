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
    console.log("Iniciando inicialización de MSAL..."); // Debug
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

    // Esperar a que MSAL esté listo
    const msalReady = () =>
      new Promise((resolve) => {
        const checkReady = () => {
          if (
            pca.getConfiguration().system?.asyncPopups ||
            pca.getActiveAccount()
          ) {
            resolve();
          } else {
            setTimeout(checkReady, 100);
          }
        };
        checkReady();
      });
    await msalReady();
    console.log("MSAL listo para render.");

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
  } catch (error) {
    console.error("Error inicializando MSAL:", error);
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <div>
        Error al inicializar la autenticación. Por favor, refresca la página.
      </div>
    );
  }
}

// Ejecuta la inicialización
initializeAndRender();
