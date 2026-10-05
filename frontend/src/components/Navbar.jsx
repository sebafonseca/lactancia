import React, { useState } from "react";
import { Link } from "react-router-dom";

const links = [
  { to: "/#servicios", label: "Modalidades" },
  { to: "/#como", label: "Acompañamiento" },
  { to: "/#faq", label: "Preguntas" },
  { to: "/contacto", label: "Contacto" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-cream">
      <div className="wrap flex items-center justify-between gap-4 py-4">
        <Link to="/" onClick={close} className="min-w-0">
          <p className="text-sm leading-none text-muted">Asesoría de lactancia</p>
          <p className="mt-1 font-serif text-xl font-medium leading-tight text-ink">
            Ana Cecilia Acosta
          </p>
        </Link>
        <nav className="hidden items-center gap-7 text-base text-ink md:flex" aria-label="Principal">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="transition-colors hover:text-sage">
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="shrink-0 rounded-full px-1 py-2 text-base font-semibold text-ink md:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Cerrar" : "Menú"}
        </button>
      </div>
      {open ? (
        <nav id="menu-movil" className="border-t border-line md:hidden" aria-label="Móvil">
          <div className="wrap flex flex-col py-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={close}
                className="border-b border-line py-4 text-lg text-ink last:border-b-0"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
