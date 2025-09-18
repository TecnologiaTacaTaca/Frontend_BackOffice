import React from "react";
import { Box, Card, Typography, Divider } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import ConstructionIcon from "@mui/icons-material/Construction";
import BlockIcon from "@mui/icons-material/Block";
import ListIcon from "@mui/icons-material/List";

const ListaNegra = () => {
  return (
    <Box className="w-full h-full flex items-center justify-center">
      <Card
        className="p-8 shadow-lg border-2 border-red-500"
        sx={{ minWidth: 400 }}
      >
        <Box className="flex items-center justify-center gap-4 mb-4">
          <WarningIcon className="text-red-500" sx={{ fontSize: "3rem" }} />
          <Typography className="text-4xl font-bold text-red-500">
            PRÓXIMAMENTE
          </Typography>
          <ConstructionIcon
            className="text-red-500"
            sx={{ fontSize: "3rem" }}
          />
        </Box>
        <Divider className="bg-red-500 opacity-30 my-4" />
        <Box className="flex items-center justify-center gap-2">
          <BlockIcon className="text-red-400" sx={{ fontSize: "1.5rem" }} />
          <Typography className="text-2xl font-semibold text-red-600">
            Gestión de Lista Negra
          </Typography>
          <ListIcon className="text-red-400" sx={{ fontSize: "1.5rem" }} />
        </Box>
        <Typography className="text-gray-600 text-center mt-4">
          Esta funcionalidad estará disponible en una próxima actualización.
        </Typography>
      </Card>
    </Box>
  );
};

export default ListaNegra;
