import React from "react";

const Card_Detalle_Ejemplo = ({ item }) => {
  return (
    <div style={{ padding: "10px" }}>
      <h2>Detalle de {item.nombre}</h2>
      <p>ID: {item.id}</p>
      {/* Agrega más detalles de la fila aquí */}
    </div>
  );
};

export default Card_Detalle_Ejemplo;
