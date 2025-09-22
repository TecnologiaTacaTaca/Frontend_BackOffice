// Rutas para módulo reportes (adaptado de rutas.py)
import { Route } from "react-router-dom";
import ReportesPagina from "./paginas/ReportesPagina";

export const ReportesRutas = () => (
  <Route path="/reportes" element={<ReportesPagina />} />
);
