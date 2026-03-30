import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../services/auth.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-violetSoft shadow-soft" />
        <div>
          <p className="text-sm text-violetDeep/80">Asesoria de lactancia</p>
          <p className="text-lg font-semibold text-violetDeep">Lactancia</p>
        </div>
      </div>
      <nav className="hidden items-center gap-6 text-sm font-medium text-violetDeep/90 md:flex">
        <Link to="/">Inicio</Link>
        <Link to="/#servicios">Servicios</Link>
        <Link to="/#como">Como funciona</Link>
        <Link to="/#faq">FAQ</Link>
        <Link to="/contacto">Contacto</Link>
      </nav>
      <div className="flex items-center gap-3">
        {user ? (
          <button
            className="rounded-full bg-violetDeep px-5 py-2 text-sm font-semibold text-white shadow-soft"
            onClick={logout}
          >
            Salir
          </button>
        ) : (
          <Link
            className="rounded-full bg-violetDeep px-5 py-2 text-sm font-semibold text-white shadow-soft"
            to="/login"
          >
            Ingresar
          </Link>
        )}
      </div>
    </header>
  );
}
