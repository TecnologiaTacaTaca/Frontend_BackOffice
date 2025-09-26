import { useMsal } from "@azure/msal-react";

export const loginAzure = async (instance) => {
  await instance.loginPopup({ scopes: ["User.Read", "GroupMember.Read.All"] });
};

// Otras funciones adaptadas
