import React from "react";
import { Box, Typography } from "@mui/material";
import { useMsal } from "@azure/msal-react";
import { UserContext } from "../../../usuario_sesion/UserContext";

const Inicio = () => {
  const { user, isLoading } = React.useContext(UserContext);

  if (isLoading || !user) {
    return (
      <Box className="flex justify-center items-center h-screen">
        Loading...
      </Box>
    );
  }

  return (
    <Box className="flex flex-col items-center w-full mt-24 mb-8">
      <Typography
        variant="h3"
        className="text-[#005F5A]! dark:text-[#35B6B4]! font-bold text-4xl"
      >
        ¡Hola, {user.name}!
      </Typography>
      {user.id_usuario === "root-dev" && (
        <>
          <Typography className="text-[#FF6B35] dark:text-[#FF8C42] font-bold text-lg mt-4">
            MODO DESARROLLO
          </Typography>
          <Typography className="text-[#252525] dark:text-[#FFFFFF] text-sm">
            Usuario Root con todos los permisos - Graph API deshabilitado
          </Typography>
        </>
      )}
      {user.metodos?.length === 0 && (
        <Typography className="text-[#252525] dark:text-[#FFFFFF] text-lg text-center mt-4">
          No tenés permisos para acceder a ningún módulo. Si creés que esto es
          un error, por favor, cerrá sesión y volvé a iniciar sesión con tu
          cuenta de Microsoft.
        </Typography>
      )}
    </Box>
  );
};

export default Inicio;
