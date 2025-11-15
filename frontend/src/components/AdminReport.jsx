import React from 'react';
import { getReporteAsistencias } from '../services/api';

export default function AdminReport() {
  return (
    <div className="box">
      <h2>Reporte de Asistencias</h2>
      <button onClick={getReporteAsistencias}>Descargar Excel</button>
    </div>
  );
}
