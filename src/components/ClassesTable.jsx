import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { getClasesByDocente, marcarAsistencia } from '../services/api';

export default function ClassesTable({ idDocente }) {
  const [clases, setClases] = useState([]);
=======
import { getClasesByDocente } from '../services/api';

export default function ClassesTable({ idDocente }) {
  const [clases, setClases] = useState([]);
  const [mensaje, setMensaje] = useState("");
>>>>>>> b371dffd2409ed1cdb51a83d345f8efdd30bbd47

  useEffect(() => {
    if (idDocente) {
      getClasesByDocente(idDocente).then(setClases);
    }
  }, [idDocente]);

<<<<<<< HEAD
  async function handleAsistencia(idClase) {
    await marcarAsistencia(idClase);
    setClases(prev =>
      prev.map(c =>
        c.idClase === idClase
          ? { ...c, asistenciaRegistrada: true }
          : c
      )
    );
=======
  // 🔥 Función que registra la asistencia en MongoDB
  async function handleAsistencia(clase) {
    try {
      const payload = {
        estudiante: "SIN_ESTUDIANTE",
        clase: clase.materia,
        docente: clase.idDocente,
        horaInicio: clase.horaInicio,
        horaFin: clase.horaFin,
        fecha: new Date().toISOString(),
        presente: true
      };

      const response = await fetch("http://localhost:4000/api/asistencias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Error al registrar asistencia");

      // Actualiza visualmente en la tabla
      setClases(prev =>
        prev.map(c =>
          c.idClase === clase.idClase
            ? { ...c, asistenciaRegistrada: true }
            : c
        )
      );

      setMensaje("Asistencia registrada 👌");
      setTimeout(() => setMensaje(""), 2500);

    } catch (e) {
      console.error(e);
      setMensaje("Error al registrar asistencia");
    }
>>>>>>> b371dffd2409ed1cdb51a83d345f8efdd30bbd47
  }

  return (
    <div className="box">
      <h2>Clases</h2>

<<<<<<< HEAD
=======
      {mensaje && (
        <p style={{ background: "#4f8cff", color: "white", padding: "6px", borderRadius: "5px" }}>
          {mensaje}
        </p>
      )}

>>>>>>> b371dffd2409ed1cdb51a83d345f8efdd30bbd47
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
<<<<<<< HEAD
                  : <button onClick={() => handleAsistencia(c.idClase)}>Registrar</button>}
=======
                  : <button onClick={() => handleAsistencia(c)}>
                      Registrar
                    </button>}
>>>>>>> b371dffd2409ed1cdb51a83d345f8efdd30bbd47
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
