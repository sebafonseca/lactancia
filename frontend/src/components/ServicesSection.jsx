import React from "react";
import { Link } from "react-router-dom";
import { getBookingHrefOrWhatsapp, isExternalBookingHref } from "../config/booking.js";

const SERVICE_ITEMS = [
  {
    id: "presencial",
    badge: "Más elegida",
    meta: "Solo Melo, Cerro Largo",
    title: "Consulta presencial",
    description:
      "Presencial a domicilio solo para Melo, Cerro Largo. Evaluamos la lactancia con tiempo y calma y armamos una guía clara, hecha para tu familia. Si vivís en otra zona, la consulta online es la opción adecuada.",
    cta: {
      label: "Reservar esta consulta",
      hrefType: "booking",
      bookingKind: "presencial"
    }
  },
  {
    id: "online",
    meta: "Por videollamada",
    title: "Consulta online",
    description:
      "Sesión por videollamada con plan de acción y seguimiento, para cuando necesitás apoyo sin moverte de casa.",
    cta: {
      label: "Coordinar sesión",
      hrefType: "booking",
      bookingKind: "online"
    }
  },
  {
    id: "talleres",
    meta: "Ideal para prepararte antes del nacimiento",
    title: "Talleres de preparación para el nacimiento",
    description:
      "Encuentros personalizados con información clara y herramientas a tu medida, para llegar al nacimiento con más serenidad.",
    cta: {
      label: "Ver detalles",
      hrefType: "contact"
    }
  },
  {
    id: "cuidados",
    meta: "Apoyo en puerperio y cuidados",
    title: "Cuidados del recién nacido y puerperio",
    description:
      "Orientación práctica sobre el cuidado del bebé y tu bienestar en el puerperio, con una mirada integral y respetuosa.",
    cta: {
      label: "Consultar esta opción",
      hrefType: "contact"
    }
  }
];

function bookingHrefOrContact(cta) {
  if (cta.hrefType === "booking" && cta.bookingKind) {
    return getBookingHrefOrWhatsapp(cta.bookingKind) || "/contacto";
  }
  return "/contacto";
}

function ServiceLink({ cta }) {
  const href = bookingHrefOrContact(cta);

  if (isExternalBookingHref(href)) {
    return (
      <a className="text-link mt-5 inline-flex" href={href} target="_blank" rel="noreferrer">
        {cta.label}
      </a>
    );
  }

  return (
    <Link className="text-link mt-5 inline-flex" to={href}>
      {cta.label}
    </Link>
  );
}

export default function ServicesSection() {
  return (
    <div>
      <p className="eyebrow">Modalidades</p>
      <h2 className="heading mt-3">Te acompaño en cada etapa</h2>
      <p className="body-copy mt-4">
        Elegí la modalidad que mejor encaje con tu familia. La consulta presencial a domicilio es
        solo en Melo, Cerro Largo; para otras ubicaciones podés reservar la sesión online.
      </p>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {SERVICE_ITEMS.map((service) => (
          <article key={service.id} className="py-8 sm:py-10">
            <p className="text-sm font-semibold text-sage">
              {service.badge ? `${service.badge} · ${service.meta}` : service.meta}
            </p>
            <h3 className="mt-2 font-serif text-2xl font-medium leading-snug text-ink sm:text-[1.7rem]">
              {service.title}
            </h3>
            <p className="body-copy mt-3">{service.description}</p>
            <ServiceLink cta={service.cta} />
          </article>
        ))}
      </div>
    </div>
  );
}
