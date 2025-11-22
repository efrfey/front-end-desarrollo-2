import React, { useState, useEffect } from 'react';
import { getClasesByDocente, postIncidencia } from '../services/api';


export default function IncidenceForm({ idDocente }) {
  const [clases, setClases] = useState([]);
  const [form, setForm] = useState({ idClase: '', descripcion: '' });

  useEffect(() => {
    if (idDocente) {
      getClasesByDocente(idDocente).then(setClases);
    }
  }, [idDocente]);

  async function handleSubmit(e) {
    e.preventDefault();

    await postIncidencia({
      ...form,
      idDocente,
    });

    alert('⚠️ Incidencia registrada correctamente');

    setForm({ idClase: '', descripcion: '' });
  }

  return (
    <div className="box">
      <h2>Incidencia del registrador</h2>

      <form onSubmit={handleSubmit} className="incidencia-form">

        <select
          value={form.idClase}
          onChange={(e) => setForm({ ...form, idClase: e.target.value })}
          required
        >
          <option value="">Selecciona una clase</option>
          {clases.map((c) => (
            <option key={c.idClase} value={c.idClase}>
              {c.materia} — {new Date(c.fecha).toLocaleDateString()}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Describe el problema..."
          value={form.descripcion}
          onChange={(e) =>
            setForm({ ...form, descripcion: e.target.value })
          }
          required
        />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
