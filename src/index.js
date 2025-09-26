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

    // Esperar a que MSAL esté listo, con timeout y logs
    const msalReady = () =>
      new Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 50; // 5 segundos (100ms * 50)
        const checkReady = () => {
          console.log(`Chequeando MSAL ready (intento ${attempts + 1})...`); // Debug loop
          if (
            pca.getConfiguration().system?.asyncPopups ||
            pca.getActiveAccount()
          ) {
            console.log("Condición cumplida, MSAL listo.");
            resolve();
          } else if (attempts >= maxAttempts) {
            console.log("Timeout: MSAL no listo después de 5s.");
            reject(new Error("Timeout esperando MSAL ready"));
          } else {
            attempts++;
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
      <div style={{ color: "red", textAlign: "center" }}>
        Error al inicializar la autenticación: {error.message}. Por favor,
        refresca o contacta soporte.
      </div>
    );
  }
}

// Ejecuta la inicialización
initializeAndRender();
