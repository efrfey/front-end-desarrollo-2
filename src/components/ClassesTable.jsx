import React, { useEffect, useState } from 'react';
import { getClasesByDocente, marcarAsistencia } from '../services/api';

export default function ClassesTable({ idDocente }) {
  const [clases, setClases] = useState([]);

  useEffect(() => {
    if (idDocente) {
      getClasesByDocente(idDocente).then(setClases);
    }
  }, [idDocente]);

  async function handleAsistencia(idClase) {
    await marcarAsistencia(idClase);
    setClases(prev =>
      prev.map(c =>
        c.idClase === idClase
          ? { ...c, asistenciaRegistrada: true }
          : c
      )
    );
  }

  return (
    <div className="box">
      <h2>Clases</h2>

      <table>
        <thead>
          <tr>
            <th>Materia</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {clases.map(c => (
            <tr key={c.idClase}>
              <td>{c.materia}</td>
              <td>{new Date(c.fecha).toLocaleDateString()}</td>
              <td>{c.horaInicio} - {c.horaFin}</td>
              <td>
                {c.asistenciaRegistrada
                  ? <span style={{ color: "#4f8cff" }}>✔ Registrada</span>
                  : <button onClick={() => handleAsistencia(c.idClase)}>Registrar</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
