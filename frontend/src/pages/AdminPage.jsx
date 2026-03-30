import React from "react";

const appointments = [
  { id: 1, modality: "online", date: "2026-02-10", status: "PENDING_APPROVAL" },
  { id: 2, modality: "presencial", date: "2026-02-12", status: "CONFIRMED" }
];

const successCases = [
  { id: 1, title: "Lactancia sin dolor", published: true }
];

const faqs = [
  { id: 1, question: "Se puede reprogramar?", published: true }
];

export default function AdminPage() {
  return (
    <div className="container section">
      <h1>Panel de la asesora</h1>

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        <div className="card">
          <h3>Disponibilidad</h3>
          <p>Online: Lunes y Miercoles 09:00-13:00</p>
          <p>Presencial: Martes 14:00-18:00</p>
          <button className="btn">Editar disponibilidad</button>
        </div>
        <div className="card">
          <h3>Solicitudes</h3>
          <div className="list">
            {appointments.map((item) => (
              <div key={item.id}>
                <strong>{item.modality}</strong> - {item.date}
                <div className="badge">{item.status}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>Casos activos</h3>
          <p>5 casos en seguimiento</p>
          <button className="btn">Ver casos</button>
        </div>
        <div className="card">
          <h3>Contenido</h3>
          <p>Casos de exito: {successCases.length}</p>
          <p>FAQs: {faqs.length}</p>
          <button className="btn">Gestionar contenido</button>
        </div>
      </div>
    </div>
  );
}
