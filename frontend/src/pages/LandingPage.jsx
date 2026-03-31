import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBookingHrefOrWhatsapp } from "../config/booking.js";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ServicesSection from "../components/ServicesSection.jsx";

const steps = [
  {
    label: "Te escucho",
    description: "Te acompaño con empatia para entender tu situacion y necesidades reales.",
    icon: "heart"
  },
  {
    label: "Evaluo tu caso",
    description: "Reviso tu situacion y tus objetivos para saber como ayudarte mejor.",
    icon: "chart"
  },
  {
    label: "Elegimos la mejor modalidad",
    description: "Te aconsejo si es mejor coordinar una sesion presencial u online.",
    icon: "video"
  },
  {
    label: "Coordino la sesion",
    description: "Busco un horario que se adapte a vos y a tu bebe.",
    icon: "calendar"
  },
  {
    label: "Acompañamiento continuo",
    description: "Te acompaño con seguimiento real para que nunca te sientas sola en el proceso.",
    icon: "chat"
  }
];

const testimonials = [
  {
    name: "Lucia M.",
    role: "Clienta",
    avatar: "/testimonials/testimonial_1.jpg",
    text:
      "Llegue muy angustiada con mi bebe recien nacido. Cecilia me dio calma desde la primera llamada y en pocos dias la lactancia dejo de doler. Senti que alguien realmente me escuchaba."
  },
  {
    name: "Carolina R.",
    role: "Clienta",
    avatar: "/testimonials/testimonial_2.jpg",
    text:
      "Pense que iba a tener que abandonar la lactancia por completo. Cecilia encontro el problema en minutos y me acompano hasta que todo se acomodo. Pase de llorar a disfrutar nuevamente a mi bebe."
  },
  {
    name: "Mariana T.",
    role: "Clienta",
    avatar: "/testimonials/testimonial_3.jpg",
    text:
      "Lo que mas valoro es el seguimiento. Cecilia esta siempre ahi, incluso para mis dudas mas chicas. Me dio seguridad en un momento donde no sabia que era normal y que no."
  },
  {
    name: "Sofia L.",
    role: "Clienta",
    avatar: "/testimonials/testimonial_4.jpg",
    text:
      "Volver a trabajar me daba panico porque temia perder la lactancia. Cecilia me ayudo a organizarme, entender mis tiempos y armar un plan con extraccion. Fue un alivio enorme."
  },
  {
    name: "Julia P.",
    role: "Clienta",
    avatar: "/testimonials/testimonial_5.jpg",
    text:
      "Estaba agotada y sentia que no podia con todo. Cecilia me acompano sin juzgarme y me enseño a hacer pequenos ajustes que cambiaron todo. Hoy estoy mucho mas tranquila."
  },
  {
    name: "Veronica G.",
    role: "Clienta",
    avatar: "/testimonials/testimonial_6.jpg",
    text:
      "Soy mama primeriza y cada cosa me generaba dudas. Cecilia me dio herramientas practicas y mucha humanidad. Senti que recupere mi confianza como mama."
  }
];

const faqs = [
  {
    question: "Cuanto dura la consulta?",
    answer:
      "Online 60 minutos, presencial 90 minutos. La consulta presencial a domicilio es solo en Melo, Cerro Largo."
  },
  {
    question: "Que incluye el seguimiento?",
    answer: "Plan de objetivos, tareas y sesiones de control."
  },
  {
    question: "Puedo reprogramar la sesion?",
    answer: "Si, con 24 horas de anticipacion."
  }
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

function Icon({ name, className }) {
  const common = "h-6 w-6";
  switch (name) {
    case "heart":
      return (
        <svg className={`${common} ${className}`} viewBox="0 0 24 24" fill="none">
          <path d="M12 20s-7-4.4-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 15.6 12 20 12 20z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "video":
      return (
        <svg className={`${common} ${className}`} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="5" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="m17 9 4-2v10l-4-2V9z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "calendar":
      return (
        <svg className={`${common} ${className}`} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 3v4M16 3v4M3 10h18" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "wallet":
      return (
        <svg className={`${common} ${className}`} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="6" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 12h4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "check":
      return (
        <svg className={`${common} ${className}`} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path d="m8 12 2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "chat":
      return (
        <svg className={`${common} ${className}`} viewBox="0 0 24 24" fill="none">
          <path d="M5 6h14a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H9l-4 3v-3H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "chart":
      return (
        <svg className={`${common} ${className}`} viewBox="0 0 24 24" fill="none">
          <path d="M4 20V9M10 20V5M16 20v-8M22 20H2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "presentation":
      return (
        <svg className={`${common} ${className}`} viewBox="0 0 24 24" fill="none">
          <rect x="2" y="5" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M17 9l5 3-5 3V9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M7 19h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "baby":
      return (
        <svg className={`${common} ${className}`} viewBox="0 0 24 24" fill="none">
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
    case "instagram":
      return (
        <svg className={`${common} ${className}`} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="17" cy="7" r="1" fill="currentColor" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg className={`${common} ${className}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.52 3.48A11.9 11.9 0 0 0 12 .5C5.8.5.78 5.52.78 11.72c0 2.07.54 4.09 1.57 5.88L.5 23.5l6.06-1.8a11.92 11.92 0 0 0 5.44 1.4h.01c6.2 0 11.22-5.02 11.22-11.22 0-2.99-1.17-5.8-3.71-8.4ZM12 21.06h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.6 1.07 1.01-3.51-.22-.36a9.4 9.4 0 0 1-1.47-5.03c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.88.98 6.64 2.75a9.3 9.3 0 0 1 2.81 6.69c0 5.2-4.24 9.44-9.48 9.44Zm5.48-7.1c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.77-1.65-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5s1.06 2.9 1.21 3.1c.15.2 2.1 3.21 5.08 4.5.71.3 1.26.48 1.69.61.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35Z" />
        </svg>
      );
    default:
      return null;
  }
}

function Section({ children, id }) {
  return (
    <motion.section
      id={id}
      className="mx-auto w-full max-w-6xl px-6 py-12"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.section>
  );
}

function WaveSeparator({ flip }) {
  return (
    <div className={`relative ${flip ? "rotate-180" : ""}`}>
      <motion.svg
        viewBox="0 0 1440 120"
        className="h-16 w-full text-white/40"
        preserveAspectRatio="none"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          fill="currentColor"
          d="M0,64 C240,120 480,0 720,48 C960,96 1200,120 1440,72 L1440,120 L0,120 Z"
        />
      </motion.svg>
    </div>
  );
}

function BlobBackground({ position }) {
  const base = "absolute -z-10 h-40 w-40 rounded-full opacity-60 blur-2xl";
  return (
    <div
      className={`${base} ${position} bg-gradient-to-br from-rosePastel via-cream to-babyBlue`}
    />
  );
}

function TestimonialAvatar({ name, src }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-violetSoft text-base font-semibold text-violetDeep shadow-soft">
        {name
          .split(" ")
          .map((part) => part[0])
          .join("")}
      </div>
    );
  }

  return (
    <img
      className="h-[72px] w-[72px] rounded-full object-cover shadow-soft"
      src={src}
      alt={name}
      onError={() => setHasError(true)}
    />
  );
}

function Carousel({ items }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      return undefined;
    }
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length, isPaused]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -80) {
      setIndex((prev) => (prev + 1) % items.length);
    } else if (info.offset.x > 80) {
      setIndex((prev) => (prev - 1 + items.length) % items.length);
    }
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={{ x: `-${index * 100}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {items.map((item) => (
            <div key={item.name} className="min-w-full px-2">
              <motion.div
                whileHover={{ boxShadow: "0 16px 40px rgba(90,79,207,0.22)" }}
                className="mx-auto min-h-[220px] max-w-3xl rounded-3xl bg-white/80 p-8 shadow-soft backdrop-blur"
              >
                <div className="mb-5 flex items-center gap-4">
                  <TestimonialAvatar name={item.name} src={item.avatar} />
                  <div>
                    <p className="text-base font-semibold">{item.name}</p>
                    
                  </div>
                </div>
                <p className="text-sm text-violetDeep/80">{item.text}</p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-3">
        {items.map((_, dotIndex) => (
          <button
            key={`dot-${dotIndex}`}
            className={`h-3 w-3 rounded-full transition ${
              dotIndex === index ? "bg-violetDeep" : "bg-violetSoft/70"
            }`}
            onClick={() => setIndex(dotIndex)}
            aria-label={`Ir al testimonio ${dotIndex + 1}`}
          />
        ))}
        <button
          className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#5430FF] shadow-soft"
          onClick={() => setIsPaused((prev) => !prev)}
          aria-label={isPaused ? "Reanudar animación" : "Pausar animación"}
          title={isPaused ? "Reanudar animación" : "Pausar animación"}
        >
          {isPaused ? "▶" : "||"}
        </button>
      </div>
      <button
        className="absolute left-0 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/70 p-3 text-violetDeep shadow-soft md:block"
        onClick={() => setIndex((prev) => (prev - 1 + items.length) % items.length)}
        aria-label="Anterior"
      >
        ◀
      </button>
      <button
        className="absolute right-0 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/70 p-3 text-violetDeep shadow-soft md:block"
        onClick={() => setIndex((prev) => (prev + 1) % items.length)}
        aria-label="Siguiente"
      >
        ▶
      </button>
    </div>
  );
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(-1);
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 400], [0, 30]);
  const whatsappMessage =
    "Hola Ceci, necesito apoyo con la lactancia y me gustaria agendar una consulta contigo.";
  const whatsappLink = `https://wa.me/59899049093?text=${encodeURIComponent(
    whatsappMessage
  )}`;
  const presencialBookingUrl = getBookingHrefOrWhatsapp("presencial");

  return (
    <div className="text-violetDeep">
      <Navbar />

      <section className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 pb-16 pt-8 md:grid-cols-[1.1fr_0.9fr]">
        <BlobBackground position="-left-10 top-10" />
        <BlobBackground position="right-0 top-24" />
        <div className="flex flex-col justify-center gap-6">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-fit rounded-full bg-mint px-4 py-2 text-xs font-semibold uppercase tracking-wide text-violetDeep"
          >
            Asesoria certificada - IULAM
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-semibold leading-tight md:text-5xl"
          >
            Lactancia con calma, apoyo real y orientación profesional
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base text-violetDeep/80 md:text-lg"
          >
            Soy Ana Cecilia Acosta, asesora de lactancia. Durante diez años acompañé a familias en
            lactancia y maternidad en el Hospital Británico. Me formé en salud mental y lactancia en
            el Instituto Europeo de Salud Mental Perinatal y en asesoría en lactancia en el IULAM
            (Instituto Uruguayo de Lactancia Materna). Te ofrezco un acompañamiento personalizado y
            cercano para que vivas esta etapa con seguridad y confianza.
          </motion.p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <motion.a
              href={presencialBookingUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04, opacity: 0.9 }}
              className="inline-flex items-center justify-center rounded-full bg-violetDeep px-6 py-3 text-sm font-semibold text-white shadow-soft"
            >
              Reservar consulta
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04, opacity: 0.9 }}
              className="flex items-center justify-center gap-2 rounded-full border border-violetDeep/20 bg-white/70 px-6 py-3 text-sm font-semibold leading-none text-violetDeep shadow-soft"
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="whatsapp" className="h-5 w-5 shrink-0" />
              Contactar por WhatsApp
            </motion.a>
          </div>
          <div className="text-sm text-violetDeep/70">
            Presencial solo Melo, Cerro Largo · Online desde cualquier lugar · Plan y seguimiento
          </div>
        </div>
        <motion.div
          className="relative"
          style={{ y: heroParallax }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
        >
          <div className="absolute -left-6 -top-6 h-24 w-24 rounded-3xl bg-rosePastel/80 blur-md" />
          <div className="absolute -bottom-8 right-0 h-28 w-28 rounded-3xl bg-babyBlue/80 blur-md" />
          <div className="relative overflow-hidden rounded-3xl bg-cream shadow-soft">
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80"
              alt="Madre con bebe"
            />
          </div>
        </motion.div>
      </section>

      <WaveSeparator />

      <Section id="servicios">
        <ServicesSection />
      </Section>

      <WaveSeparator flip />

      <Section id="como">
        <div className="mb-8">
          <p className="text-sm font-semibold text-violetDeep/70">Como funciona</p>
          <h2 className="text-3xl font-semibold">Un proceso simple y humano</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-5">
          {steps.map((step) => (
            <motion.div
              key={step.label}
              whileHover={{ scale: 1.03, boxShadow: "0 16px 40px rgba(90,79,207,0.2)" }}
              className="flex flex-col items-start gap-3 rounded-3xl bg-white/80 p-4 shadow-soft backdrop-blur"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violetSoft/50 text-violetDeep">
                <Icon name={step.icon} className="text-violetDeep" />
              </div>
              <p className="text-sm font-semibold text-violetDeep">{step.label}</p>
              <p className="text-xs text-violetDeep/70">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <WaveSeparator />

      <Section id="casos">
        <div className="mb-6">
          <p className="text-sm font-semibold text-violetDeep/70">Casos de exito</p>
          <h2 className="text-3xl font-semibold">Historias reales</h2>
        </div>
        <Carousel items={testimonials} />
      </Section>

      <WaveSeparator flip />

      <Section id="faq">
        <div className="mb-6">
          <p className="text-sm font-semibold text-violetDeep/70">Preguntas frecuentes</p>
          <h2 className="text-3xl font-semibold">Te respondo con claridad</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, faqIndex) => (
            <motion.div
              key={faq.question}
              whileHover={{ scale: 1.01 }}
              className="rounded-3xl bg-white/80 p-5 shadow-soft backdrop-blur"
            >
              <button
                onClick={() => setOpenFaq(faqIndex === openFaq ? -1 : faqIndex)}
                className="flex w-full items-center gap-3 text-left text-sm font-semibold text-violetDeep"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-mint text-violetDeep">
                  ?
                </span>
                {faq.question}
                <span className="ml-auto text-violetDeep/70">
                  {faqIndex === openFaq ? "-" : "+"}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {faqIndex === openFaq && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-sm text-violetDeep/80">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Section>

      <WaveSeparator />

      <Section id="contacto">
        <div className="mb-6">
          <p className="text-sm font-semibold text-violetDeep/70">Contacto directo</p>
          <h2 className="text-3xl font-semibold">Hablemos cuando lo necesites</h2>
          <p className="mt-2 text-sm text-violetDeep/70">
            Escribime por el canal que te quede mas practico. Te respondo siempre con calidez.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <motion.a
            whileHover={{ scale: 1.03, boxShadow: "0 16px 40px rgba(249,221,227,0.8)" }}
            className="flex items-center justify-between rounded-3xl bg-rosePastel/70 px-6 py-5 text-sm font-semibold shadow-soft"
            href="https://www.instagram.com/lactancia_uy/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
            <Icon name="instagram" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03, boxShadow: "0 16px 40px rgba(218,243,234,0.9)" }}
            className="flex items-center justify-between rounded-3xl bg-mint/80 px-6 py-5 text-sm font-semibold shadow-soft"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
            <Icon name="whatsapp" className="h-5 w-5 shrink-0" />
          </motion.a>
          <motion.div whileHover={{ scale: 1.03 }} className="flex">
            <Link
              className="flex w-full items-center justify-between rounded-3xl bg-white/80 px-6 py-5 text-sm font-semibold text-violetDeep shadow-soft backdrop-blur"
              to="/contacto"
            >
              Formulario de contacto
              <span className="text-lg">→</span>
            </Link>
          </motion.div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
