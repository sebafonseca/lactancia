import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { getBookingHrefOrWhatsapp } from "../config/booking.js";

const WHATSAPP = "https://wa.me/59899049093";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

function WhatsappIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.52 3.48A11.9 11.9 0 0 0 12 .5C5.8.5.78 5.52.78 11.72c0 2.07.54 4.09 1.57 5.88L.5 23.5l6.06-1.8a11.92 11.92 0 0 0 5.44 1.4h.01c6.2 0 11.22-5.02 11.22-11.22 0-2.99-1.17-5.8-3.71-8.4ZM12 21.06h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.6 1.07 1.01-3.51-.22-.36a9.4 9.4 0 0 1-1.47-5.03c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.88.98 6.64 2.75a9.3 9.3 0 0 1 2.81 6.69c0 5.2-4.24 9.44-9.48 9.44Zm5.48-7.1c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.77-1.65-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5s1.06 2.9 1.21 3.1c.15.2 2.1 3.21 5.08 4.5.71.3 1.26.48 1.69.61.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

const PAGES = {
  melo: {
    eyebrow: "Solo Melo, Cerro Largo",
    h1: "Asesoría de lactancia a domicilio en Melo",
    lead:
      "Si vivís en Melo, la consulta presencial es en tu casa. Dura 90 minutos. Evaluamos la lactancia con tiempo y calma y armamos una guía clara, hecha para tu familia.",
    bookingKind: "presencial",
    bookingLabel: "Reservar consulta",
    sections: [
      {
        title: "Cómo es la visita",
        points: [
          "Voy a tu domicilio. No tengo un consultorio donde recibir gente: la visita es solo en Melo, Cerro Largo.",
          "Son 90 minutos. El tiempo alcanza para mirar la toma con calma y dejarte una guía para tu familia.",
          "Si después hace falta seguimiento, incluye plan de objetivos, tareas y sesiones de control. Se puede reprogramar con 24 horas de anticipación."
        ]
      },
      {
        title: "Quién te acompaña",
        points: [
          "Soy Ana Cecilia Acosta. Durante diez años acompañé a familias en lactancia y maternidad en el Hospital Británico.",
          "Me formé en asesoría en lactancia en el IULAM (Instituto Uruguayo de Lactancia Materna) y en salud mental y lactancia en el Instituto Europeo de Salud Mental Perinatal."
        ]
      }
    ],
    bookingNote:
      "El botón abre el mismo calendario de la consulta presencial. Elegís el horario ahí. Si preferís escribirme antes, el WhatsApp es el del sitio.",
    other: {
      href: "/asesoria-lactancia-online-uruguay",
      text: "Si no estás en Melo, esta visita no llega. La consulta online es por videollamada."
    }
  },
  online: {
    eyebrow: "Por videollamada",
    h1: "Asesoría de lactancia online para Uruguay",
    lead:
      "Esta consulta no es una visita. Nos vemos por videollamada, 60 minutos, con un plan de acción y seguimiento. Sirve si estás en Uruguay y no en Melo, o si preferís no recibir a nadie en casa.",
    bookingKind: "online",
    bookingLabel: "Coordinar sesión",
    sections: [
      {
        title: "Cómo es la sesión",
        points: [
          "Es virtual. Yo no voy a tu domicilio: la visita a domicilio sigue siendo solo para Melo, Cerro Largo.",
          "Dura 60 minutos. De ahí sale un plan de acción para tu familia.",
          "El seguimiento, cuando hace falta, incluye plan de objetivos, tareas y sesiones de control. Se puede reprogramar con 24 horas de anticipación."
        ]
      },
      {
        title: "Quién te acompaña",
        points: [
          "Soy Ana Cecilia Acosta, la misma asesora de la consulta presencial en Melo.",
          "Durante diez años acompañé a familias en lactancia y maternidad en el Hospital Británico. Me formé en el IULAM (Instituto Uruguayo de Lactancia Materna) y en el Instituto Europeo de Salud Mental Perinatal."
        ]
      }
    ],
    bookingNote:
      "El botón abre el calendario de la consulta online. Elegís día y hora, y el encuentro es por videollamada. Si preferís escribirme antes, el WhatsApp es el del sitio.",
    other: {
      href: "/asesoria-lactancia-melo",
      text: "Si estás en Melo y querés que vaya a tu casa, la consulta es la visita a domicilio."
    }
  }
};

export default function ServiceLandingPage({ variant }) {
  const page = PAGES[variant];
  const bookingHref = getBookingHrefOrWhatsapp(page.bookingKind);

  return (
    <div className="text-violetDeep">
      <Navbar />
      <main>
        <motion.section
          className="mx-auto w-full max-w-6xl px-6 pb-8 pt-10"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <p className="w-fit rounded-full bg-mint px-4 py-2 text-xs font-semibold uppercase tracking-wide text-violetDeep">
            {page.eyebrow}
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">{page.h1}</h1>
          <p className="mt-4 max-w-2xl text-base text-violetDeep/80 md:text-lg">{page.lead}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <motion.a
              href={bookingHref}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04, opacity: 0.9 }}
              className="inline-flex items-center justify-center rounded-full bg-violetDeep px-6 py-3 text-sm font-semibold text-white shadow-soft"
            >
              {page.bookingLabel}
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04, opacity: 0.9 }}
              className="flex items-center justify-center gap-2 rounded-full border border-violetDeep/20 bg-white/70 px-6 py-3 text-sm font-semibold leading-none text-violetDeep shadow-soft"
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsappIcon />
              Contactar por WhatsApp
            </motion.a>
          </div>
        </motion.section>

        {page.sections.map((section) => (
          <section key={section.title} className="mx-auto w-full max-w-6xl px-6 py-12">
            <h2 className="text-3xl font-semibold">{section.title}</h2>
            <div className="mt-6 space-y-4">
              {section.points.map((point) => (
                <div
                  key={point}
                  className="rounded-3xl bg-white/80 p-5 text-sm text-violetDeep/80 shadow-soft backdrop-blur"
                >
                  {point}
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="mx-auto w-full max-w-6xl px-6 py-12">
          <h2 className="text-3xl font-semibold">Cómo reservar</h2>
          <p className="mt-4 max-w-2xl text-base text-violetDeep/80">{page.bookingNote}</p>
          <p className="mt-4 max-w-2xl text-base text-violetDeep/80">
            {page.other.text}{" "}
            <Link className="font-semibold text-violetDeep underline decoration-violetDeep/30 underline-offset-4" to={page.other.href}>
              Ver esa consulta
            </Link>
            .
          </p>
          <div className="mt-6 space-y-1 text-sm font-medium text-violetDeep/90">
            <Link className="block" to="/">
              Inicio
            </Link>
            <Link className="block" to="/contacto">
              Contacto
            </Link>
            <Link className="block" to={page.other.href}>
              {variant === "melo" ? "Asesoría online" : "Asesoría en Melo"}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
