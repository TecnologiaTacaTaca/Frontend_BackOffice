import React from "react";
import { Routes, Route } from "react-router-dom";
import Plantilla from "./modulos/principal/Plantilla";
import GestionFraude from "./modulos/fraude/GestoriaFraude/GestionFraude";
import Inicio from "./modulos/principal/paginas/Inicio";
import Transacciones from "./modulos/reportes/paginas/Transacciones";
import Movimientos from "./modulos/reportes/paginas/Movimientos";
import Auditoria from "./modulos/fraude/Auditoria/Auditoria";
import ListaNegra from "./modulos/fraude/ListaNegra/ListaNegra";
import Comercios from "./modulos/comercios/Comercios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Agrega más imports para otras páginas

function App() {
  return (
    <>
      <ToastContainer position="bottom-center" />
      {/* Rutas */}
      <Routes>
        <Route
          path="/"
          element={
            <Plantilla>
              <Inicio />
            </Plantilla>
          }
        />
        <Route
          path="/fraude/gestion"
          element={
            <Plantilla>
              <GestionFraude />
            </Plantilla>
          }
        />
        <Route
          path="/fraude/auditoria"
          element={
            <Plantilla>
              <Auditoria />
            </Plantilla>
          }
        />
        <Route
          path="/fraude/lista-negra"
          element={
            <Plantilla>
              <ListaNegra />
            </Plantilla>
          }
        />
        <Route
          path="/reportes/transacciones"
          element={
            <Plantilla>
              <Transacciones />
            </Plantilla>
          }
        />
        <Route
          path="/reportes/movimientos"
          element={
            <Plantilla>
              <Movimientos />
            </Plantilla>
          }
        />
        <Route
          path="/comercios"
          element={
            <Plantilla>
              <Comercios />
            </Plantilla>
          }
        />
      </Routes>
    </>
  );
}

export default App;
