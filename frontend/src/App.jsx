import React, { useState, useEffect } from 'react';
import DocenteRegister from './components/DocenteRegister';
import ClassesTable from './components/ClassesTable';
import IncidenceForm from './components/IncidenceForm';
import AdminReport from './components/AdminReport';
import { getClasesHoy } from './services/api';

import './styles/dashboard.css';

export default function App() {
  const [docenteId, setDocenteId] = useState('');
  const [clasesHoy, setClasesHoy] = useState([]);

  useEffect(() => {
    if (!docenteId) {
      setClasesHoy([]);
      return;
    }

    getClasesHoy(docenteId)
      .then(data => {
        console.log("CLASES HOY:", data);
        setClasesHoy(data);
      })
      .catch(err => {
        console.error("Error cargando clases:", err);
        setClasesHoy([]);
      });
  }, [docenteId]);

  return (
    <div className="dashboard-container">
      <h1>📚 Sistema de Registro de Clases y Asistencias</h1>

      <div className="box">
        <DocenteRegister />
      </div>

      <div className="box">
        <h2>Ingresar cédula del docente para ver clases</h2>
        <input
          placeholder="Cédula del docente"
          value={docenteId}
          onChange={e => setDocenteId(e.target.value)}
        />
      </div>

      {docenteId && (
        <>
          <ClassesTable idDocente={docenteId} />

          {/* 🔥 ENVÍO DE CLASES AL FORMULARIO */}
          <IncidenceForm idDocente={docenteId} clases={clasesHoy} />
        </>
      )}

      <div className="box">
        <AdminReport />
      </div>
    </div>
  );
}
