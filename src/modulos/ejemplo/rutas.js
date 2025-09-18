// Rutas para módulo ejemplo (adaptado de rutas.py)
import { Route } from "react-router-dom";
import EjemploPagina from "./paginas/EjemploPagina";

export const EjemploRutas = () => (
  <Route path="/ejemplo" element={<EjemploPagina />} />
);
