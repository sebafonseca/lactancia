import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getBookingHrefOrWhatsapp,
  getDefaultAvailabilityHref,
  isExternalBookingHref
} from "../config/booking.js";

function ServiceIcon({ name, className = "h-6 w-6 shrink-0" }) {
  switch (name) {
    case "heart":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 20s-7-4.4-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 15.6 12 20 12 20z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "video":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="5" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="m17 9 4-2v10l-4-2V9z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "presentation":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="2" y="5" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M17 9l5 3-5 3V9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M7 19h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "baby":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M6.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M9.5 8L8 6M14.5 8L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

const SERVICE_ITEMS = [
  {
    id: "presencial",
    featured: true,
    badge: "Más elegida",
    meta: "Solo Melo, Cerro Largo",
    title: "Consulta presencial",
    description:
      "Presencial a domicilio solo para Melo, Cerro Largo. Evaluamos la lactancia con tiempo y calma y armamos una guía clara, hecha para tu familia. Si vivís en otra zona, la consulta online es la opción adecuada.",
    icon: "heart",
    cta: {
      variant: "primary",
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
    icon: "video",
    cta: {
      variant: "softOutline",
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
    icon: "presentation",
    cta: {
      variant: "ghost",
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
    icon: "baby",
    cta: {
      variant: "softOutline",
      label: "Consultar esta opción",
      hrefType: "contact"
    }
  }
];

const cardTransition = "transition-all duration-300 ease-out";

function bookingHrefOrContact(cta) {
  if (cta.hrefType === "booking" && cta.bookingKind) {
    return getBookingHrefOrWhatsapp(cta.bookingKind) || "/contacto";
  }
  return "/contacto";
}

function ServiceCta({ cta }) {
  const baseFocus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violetDeep";

  if (cta.variant === "primary") {
    const href = bookingHrefOrContact(cta);
    const className = `inline-flex w-fit items-center justify-center rounded-full bg-violetDeep px-6 py-3 text-sm font-semibold text-white shadow-md shadow-violetDeep/25 ${cardTransition} hover:bg-violetDeep/92 hover:shadow-lg hover:shadow-violetDeep/30 ${baseFocus}`;
    if (isExternalBookingHref(href)) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={className}
        >
          {cta.label}
        </motion.a>
      );
    }
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-fit">
        <Link to="/contacto" className={className}>
          {cta.label}
        </Link>
      </motion.div>
    );
  }

  if (cta.variant === "softOutline") {
    const href = bookingHrefOrContact(cta);
    const external = isExternalBookingHref(href);
    const className = `inline-flex w-fit items-center justify-center rounded-full border border-violetDeep/25 bg-white/60 px-5 py-2.5 text-sm font-semibold text-violetDeep ${cardTransition} hover:-translate-y-px hover:border-violetDeep/40 hover:bg-white/90 hover:shadow-md ${baseFocus}`;

    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={className}
        >
          {cta.label}
        </motion.a>
      );
    }

    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-fit">
        <Link to={href} className={className}>
          {cta.label}
        </Link>
      </motion.div>
    );
  }

  const className = `inline-flex w-fit items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold text-violetDeep/90 underline decoration-violetDeep/30 underline-offset-4 ${cardTransition} hover:bg-violetSoft/35 hover:text-violetDeep hover:decoration-violetDeep/50 ${baseFocus}`;

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-fit">
      <Link to="/contacto" className={className}>
        {cta.label}
      </Link>
    </motion.div>
  );
}

export default function ServicesSection() {
  const featured = SERVICE_ITEMS.find((s) => s.featured);
  const secondary = SERVICE_ITEMS.filter((s) => !s.featured);
  const availabilityHref = getDefaultAvailabilityHref();

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-violetDeep/70">Servicios</p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight text-violetDeep md:text-4xl">
            Te acompaño en cada etapa
          </h2>
          <p className="mt-3 text-base leading-relaxed text-violetDeep/65 md:text-lg">
            Elegí la modalidad que mejor encaje con tu familia. La consulta presencial a domicilio es
            solo en{" "}
            <span className="font-semibold text-violetDeep/80">Melo, Cerro Largo</span>; para otras
            ubicaciones podés reservar la sesión online.
          </p>
        </div>
        <motion.a
          href={availabilityHref}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.03 }}
          className={`hidden rounded-full bg-white/80 px-5 py-2.5 text-sm font-semibold text-violetDeep shadow-soft backdrop-blur md:inline-flex ${cardTransition} hover:shadow-md`}
        >
          Ver disponibilidad
        </motion.a>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        {featured && (
          <motion.article
            layout
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative md:col-span-2"
          >
            <div
              className={`group relative overflow-hidden rounded-3xl border border-violetDeep/10 bg-gradient-to-br from-white via-white to-violetSoft/45 p-7 shadow-lg shadow-violetDeep/10 ring-1 ring-white/80 backdrop-blur-sm sm:p-8 md:p-10 ${cardTransition} hover:-translate-y-1 hover:shadow-xl hover:shadow-violetDeep/15`}
            >
              <div className="absolute right-5 top-5 sm:right-8 sm:top-8">
                <span className="inline-flex items-center rounded-full bg-violetDeep/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violetDeep">
                  {featured.badge}
                </span>
              </div>

              <div className="mb-5 flex flex-col gap-5 sm:mb-6 sm:flex-row sm:items-start sm:gap-8">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/90 text-violetDeep shadow-sm ring-1 ring-violetDeep/10 sm:h-16 sm:w-16">
                  <ServiceIcon name={featured.icon} className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <div className="min-w-0 flex-1 pr-0 sm:pr-28">
                  <p className="text-xs font-semibold uppercase tracking-wider text-violetDeep/55">
                    {featured.meta}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold leading-tight text-violetDeep sm:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-violetDeep/65 sm:text-[1.05rem]">
                    {featured.description}
                  </p>
                </div>
              </div>

              <div className="mt-2 border-t border-violetDeep/[0.08] pt-6 sm:pt-7">
                <ServiceCta cta={featured.cta} />
              </div>
            </div>
          </motion.article>
        )}

        {secondary.map((service, index) => (
          <motion.article
            key={service.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
            className={`group ${
              index === secondary.length - 1 ? "md:col-span-2 md:mx-auto md:max-w-xl" : ""
            }`}
          >
            <div
              className={`flex h-full flex-col rounded-2xl border border-violetDeep/[0.07] bg-white/85 p-6 shadow-soft ring-1 ring-transparent backdrop-blur-sm ${cardTransition} hover:-translate-y-1 hover:border-violetDeep/12 hover:shadow-lg hover:shadow-violetDeep/10 hover:ring-violetSoft/30`}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violetSoft/45 text-violetDeep">
                <ServiceIcon name={service.icon} className="text-violetDeep" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-violetDeep/55">{service.meta}</p>
              <h3 className="mt-2.5 text-xl font-semibold leading-snug text-violetDeep">{service.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-violetDeep/60">{service.description}</p>
              <div className="mt-6 border-t border-violetDeep/[0.06] pt-5">
                <ServiceCta cta={service.cta} />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </>
  );
}
