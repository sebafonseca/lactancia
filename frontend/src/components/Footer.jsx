import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 bg-violetSoft/70 px-6 py-12">
      <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-violetDeep" />
          <div>
            <p className="text-lg font-semibold text-violetDeep">Lactancia</p>
            <p className="text-sm text-violetDeep/80">
              Apoyo profesional en lactancia
            </p>
          </div>
        </div>
        <div className="text-sm text-violetDeep/80">
          <p className="mb-2 font-semibold text-violetDeep">Enlaces</p>
          <div className="space-y-1">
            <p>Servicios</p>
            <p>Como funciona</p>
            <p>Preguntas frecuentes</p>
          </div>
        </div>
        <div className="text-sm text-violetDeep/80">
          <p className="mb-2 font-semibold text-violetDeep">Contacto</p>
          <p>WhatsApp directo</p>
          <p>Instagram y Facebook</p>
        </div>
      </div>
    </footer>
  );
}
