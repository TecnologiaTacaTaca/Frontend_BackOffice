import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import App from "./App";
import "./index.css";
import UserProvider from "./usuario_sesion/UserContext";
import "./estilos/style.scss";

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
    await pca.initialize(); // Inicializa MSAL asíncronamente

    // Manejar cualquier redirección pendiente de MSAL (importante para loginRedirect o popups)
    await pca.handleRedirectPromise();

    // Establecer cuenta activa si hay cuentas disponibles después del redirect
    const allAccounts = pca.getAllAccounts();
    if (allAccounts.length > 0) {
      pca.setActiveAccount(allAccounts[0]);
    }

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
