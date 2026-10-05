import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 bg-violetSoft/70 px-6 py-12">
      <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-violetDeep" />
          <div>
            <Link to="/" className="block text-lg font-semibold text-violetDeep">
              Lactancia
            </Link>
            <p className="text-sm text-violetDeep/80">
              Apoyo profesional en lactancia
            </p>
          </div>
        </div>
        <div className="text-sm text-violetDeep/80">
          <p className="mb-2 font-semibold text-violetDeep">Enlaces</p>
          <div className="space-y-1">
            <Link className="block" to="/#servicios">
              Servicios
            </Link>
            <Link className="block" to="/#como">
              Como funciona
            </Link>
            <Link className="block" to="/#faq">
              Preguntas frecuentes
            </Link>
          </div>
        </div>
        <div className="text-sm text-violetDeep/80">
          <p className="mb-2 font-semibold text-violetDeep">Contacto</p>
          <a className="block" href="https://wa.me/59899049093" target="_blank" rel="noreferrer">
            WhatsApp directo
          </a>
          <a
            className="block"
            href="https://www.instagram.com/lactancia_uy/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram @lactancia_uy
          </a>
        </div>
      </div>
    </footer>
  );
}
