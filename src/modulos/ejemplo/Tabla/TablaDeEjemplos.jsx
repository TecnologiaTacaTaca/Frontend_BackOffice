import React, { useState } from "react";
import Card_Detalle_Ejemplo from "../Detalle/Card_Detalle_Ejemplo";

const datos = [{ id: 1, nombre: "Ejemplo 1" }]; // Datos de ejemplo

const TablaDeEjemplos = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState(null);

  const abrirModal = (item) => {
    setItemSeleccionado(item);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setItemSeleccionado(null);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>
                <button onClick={() => abrirModal(item)}>Ver detalle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalAbierto && itemSeleccionado && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            border: "1px solid black",
          }}
        >
          <Card_Detalle_Ejemplo item={itemSeleccionado} />
          <button onClick={cerrarModal}>Cerrar</button>
        </div>
      )}
    </>
  );
};

export default TablaDeEjemplos;
