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
    clientId: process.env.REACT_APP_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
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
    await pca.initialize(); // ¡Esto es lo que faltaba! Inicializa MSAL asíncronamente
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
    // Opcional: Muestra un mensaje de error en la UI
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
