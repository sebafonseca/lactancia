import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth.jsx";

export default function LoginPage() {
  const { login, roles } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role, redirectTo) => {
    login(role);
    navigate(redirectTo);
  };

  return (
    <div className="container section">
      <h1>Ingresar</h1>
      <p>Simulacion de OAuth para el MVP.</p>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        <div className="card">
          <h3>Clienta</h3>
          <button className="btn" onClick={() => handleLogin(roles.ROLE_CLIENT, "/dashboard")}>
            Entrar como clienta
          </button>
        </div>
        <div className="card">
          <h3>Asesora</h3>
          <button className="btn" onClick={() => handleLogin(roles.ROLE_ADMIN, "/admin")}>
            Entrar como asesora
          </button>
        </div>
        <div className="card">
          <h3>Dev Admin</h3>
          <button className="btn" onClick={() => handleLogin(roles.ROLE_DEV_ADMIN, "/dev-admin")}>
            Entrar como dev admin
          </button>
        </div>
      </div>
    </div>
  );
}
