import { useMsal } from "@azure/msal-react";

export const loginAzure = async (instance) => {
  await instance.loginRedirect({
    scopes: ["User.Read", "GroupMember.Read.All"],
  });
};

// Otras funciones adaptadas
