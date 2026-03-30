import React from "react";

const users = [
  { id: 1, email: "cliente@example.com", role: "CLIENT" },
  { id: 2, email: "asesora@example.com", role: "ADMIN" }
];

export default function DevAdminPage() {
  return (
    <div className="container section">
      <h1>Dev Admin</h1>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        <div className="card">
          <h3>Usuarios</h3>
          <div className="list">
            {users.map((user) => (
              <div key={user.id}>
                <strong>{user.email}</strong>
                <span className="badge">{user.role}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>Roles</h3>
          <p>Promover o revocar ADMIN.</p>
          <button className="btn">Gestionar roles</button>
        </div>
        <div className="card">
          <h3>Health</h3>
          <p>Version: 0.1.0</p>
          <p>Env: development</p>
        </div>
        <div className="card">
          <h3>Configuracion</h3>
          <p>Flags de UI y textos.</p>
          <button className="btn">Editar configuracion</button>
        </div>
      </div>
    </div>
  );
}
