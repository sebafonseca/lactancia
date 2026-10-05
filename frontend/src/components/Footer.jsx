import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-3 sm:gap-8">
        <div>
          <p className="font-serif text-xl font-medium text-ink">Ana Cecilia Acosta</p>
          <p className="mt-2 text-base leading-relaxed text-muted">
            Asesoría de lactancia en Uruguay
          </p>
        </div>
        <nav className="flex flex-col gap-3 text-base" aria-label="Pie de página">
          <Link to="/#servicios" className="text-ink hover:text-sage">
            Modalidades
          </Link>
          <Link to="/#como" className="text-ink hover:text-sage">
            Acompañamiento
          </Link>
          <Link to="/#faq" className="text-ink hover:text-sage">
            Preguntas frecuentes
          </Link>
          <Link to="/contacto" className="text-ink hover:text-sage">
            Contacto
          </Link>
        </nav>
        <div className="flex flex-col gap-3 text-base text-muted">
          <p>Presencial en Melo, Cerro Largo</p>
          <p>Online desde cualquier lugar</p>
          <a
            className="text-link w-fit"
            href="https://wa.me/59899049093"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <a
            className="w-fit text-base text-muted underline decoration-line underline-offset-4 hover:text-ink"
            href="https://www.instagram.com/lactancia_uy/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
