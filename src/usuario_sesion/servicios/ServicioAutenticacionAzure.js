import { useMsal } from "@azure/msal-react";

export const loginAzure = async (instance) => {
  await instance.loginPopup({
    scopes: ["User.Read", "GroupMember.Read.All"],
    prompt: "select_account", // Agregado para forzar selección y completar request
  });
};

// Otras funciones adaptadas
