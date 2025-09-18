import { useMsal } from "@azure/msal-react";

export const adquirirTokenGraph = async (instance, accounts, scopes) => {
  for (let i = 0; i < 3; i++) {
    try {
      const response = await instance.acquireTokenSilent({
        scopes,
        account: accounts[0],
      });
      return response.accessToken;
    } catch (error) {
      console.error(`Error al adquirir token (intento ${i + 1}):`, error);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Espera 1s
    }
  }
  throw new Error("No se pudo adquirir token después de 3 intentos");
};

export const llamarGraphApi = async (endpoint, token) => {
  const response = await fetch(`https://graph.microsoft.com/v1.0${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error(
      `Error en Graph API: ${response.status} - ${await response.text()}`
    );
  }
  return await response.json();
};

export const obtenerGruposUsuarioDesdeGraph = async (token, userId) => {
  let url = `/users/${userId}/memberOf`;
  const gruposAz = ["Area-group", "Level-group"];
  let grupos = [];

  while (url) {
    const data = await llamarGraphApi(url, token);
    grupos = grupos.concat(data.value || []);
    url = data["@odata.nextLink"]
      ? url.split("v1.0")[1] + "?" + data["@odata.nextLink"].split("?")[1]
      : null;
  }

  grupos = grupos.filter(
    (g) => g.description && gruposAz.some((az) => g.description.includes(az))
  );

  return grupos.map((g) => ({
    displayName: g.displayName,
    description: g.description,
  }));
};

export const obtenerNombreUsuario = async (token, userId) => {
  for (let i = 0; i < 3; i++) {
    try {
      const data = await llamarGraphApi(`/users/${userId}`, token);
      return data.givenName || "Usuario Desconocido";
    } catch (error) {
      console.error(`Error al obtener nombre (intento ${i + 1}):`, error);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  throw new Error("Error al obtener nombre después de 3 intentos");
};

export const obtenerFotoUsuario = async (token, userId) => {
  for (let i = 0; i < 3; i++) {
    try {
      const response = await fetch(
        `https://graph.microsoft.com/v1.0/users/${userId}/photo/$value`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        console.error(`Error al obtener foto: ${response.status}`);
        return null;
      }
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error(`Error al obtener foto (intento ${i + 1}):`, error);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return null;
};

// Otras funciones adaptadas de servicio_api_graph.py
