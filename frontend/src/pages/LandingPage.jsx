import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getBookingHrefOrWhatsapp } from "../config/booking.js";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ServicesSection from "../components/ServicesSection.jsx";

const steps = [
  {
    label: "Te escucho",
    description: "Te acompaño con empatía para entender tu situación y necesidades reales."
  },
  {
    label: "Evalúo tu caso",
    description: "Reviso tu situación y tus objetivos para saber cómo ayudarte mejor."
  },
  {
    label: "Elegimos la mejor modalidad",
    description: "Te aconsejo si es mejor coordinar una sesión presencial u online."
  },
  {
    label: "Coordino la sesión",
    description: "Busco un horario que se adapte a vos y a tu bebé."
  },
  {
    label: "Acompañamiento continuo",
    description: "Te acompaño con seguimiento real para que nunca te sientas sola en el proceso."
  }
];

const testimonials = [
  {
    name: "Lucía M.",
    text: "Llegué muy angustiada con mi bebé recién nacido. Cecilia me dio calma desde la primera llamada y en pocos días la lactancia dejó de doler. Sentí que alguien realmente me escuchaba."
  },
  {
    name: "Carolina R.",
    text: "Pensé que iba a tener que abandonar la lactancia por completo. Cecilia encontró el problema en minutos y me acompañó hasta que todo se acomodó. Pasé de llorar a disfrutar nuevamente a mi bebé."
  },
  {
    name: "Mariana T.",
    text: "Lo que más valoro es el seguimiento. Cecilia está siempre ahí, incluso para mis dudas más chicas. Me dio seguridad en un momento donde no sabía qué era normal y qué no."
  },
  {
    name: "Sofía L.",
    text: "Volver a trabajar me daba pánico porque temía perder la lactancia. Cecilia me ayudó a organizarme, entender mis tiempos y armar un plan con extracción. Fue un alivio enorme."
  },
  {
    name: "Julia P.",
    text: "Estaba agotada y sentía que no podía con todo. Cecilia me acompañó sin juzgarme y me enseñó a hacer pequeños ajustes que cambiaron todo. Hoy estoy mucho más tranquila."
  },
  {
    name: "Verónica G.",
    text: "Soy mamá primeriza y cada cosa me generaba dudas. Cecilia me dio herramientas prácticas y mucha humanidad. Sentí que recuperé mi confianza como mamá."
  }
];

const faqs = [
  {
    question: "¿Cuánto dura la consulta?",
    answer:
      "Online 60 minutos, presencial 90 minutos. La consulta presencial a domicilio es solo en Melo, Cerro Largo."
  },
  {
    question: "¿Qué incluye el seguimiento?",
    answer: "Plan de objetivos, tareas y sesiones de control."
  },
  {
    question: "¿Puedo reprogramar la sesión?",
    answer: "Sí, con 24 horas de anticipación."
  }
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(-1);
  const whatsappMessage =
    "Hola Ceci, necesito apoyo con la lactancia y me gustaria agendar una consulta contigo.";
  const whatsappLink = `https://wa.me/59899049093?text=${encodeURIComponent(whatsappMessage)}`;
  const bookingUrl = getBookingHrefOrWhatsapp("presencial");

  return (
    <div className="text-ink">
      <Navbar />

      <main>
        <section className="wrap pb-16 pt-12 sm:pb-24 sm:pt-20">
          <h1 className="display">Asesoría de lactancia en Uruguay</h1>
          <p className="mt-6 text-xl leading-relaxed text-ink">
            Acompañamiento profesional por Ana Cecilia Acosta, asesora de lactancia.
          </p>
          <p className="body-copy mt-3">
            Presencial en Melo, Cerro Largo. Online desde cualquier lugar.
          </p>
          <div className="mt-8">
            <a className="btn" href={bookingUrl} target="_blank" rel="noreferrer">
              Reservar consulta
            </a>
            <p className="mt-5 text-lg">
              <a className="text-link" href={whatsappLink} target="_blank" rel="noreferrer">
                Escribir por WhatsApp
              </a>
            </p>
          </div>
        </section>

        <section className="bg-blush" id="sobre">
          <div className="wrap scroll-mt-24 py-16 sm:py-24">
            <p className="eyebrow">La profesional</p>
            <h2 className="heading mt-3">Ana Cecilia Acosta</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink">
              Asesora de lactancia. Te ofrezco un acompañamiento personalizado y cercano para que
              vivas esta etapa con seguridad y confianza.
            </p>
            <dl className="mt-10 space-y-6">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
                  Formación
                </dt>
                <dd className="mt-2 text-lg leading-relaxed text-ink">
                  Asesoría en lactancia en el IULAM (Instituto Uruguayo de Lactancia Materna).
                  Salud mental y lactancia en el Instituto Europeo de Salud Mental Perinatal.
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
                  Experiencia
                </dt>
                <dd className="mt-2 text-lg leading-relaxed text-ink">
                  Durante diez años acompañé a familias en lactancia y maternidad en el Hospital
                  Británico.
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
                  Dónde atiende
                </dt>
                <dd className="mt-2 text-lg leading-relaxed text-ink">
                  Presencial a domicilio en Melo, Cerro Largo. Online desde cualquier lugar.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="servicios" className="scroll-mt-24">
          <div className="wrap py-16 sm:py-24">
            <ServicesSection />
          </div>
        </section>

        <section id="como" className="scroll-mt-24 border-t border-line">
          <div className="wrap py-16 sm:py-24">
            <p className="eyebrow">Cómo funciona</p>
            <h2 className="heading mt-3">Un proceso simple y humano</h2>
            <ol className="mt-10 space-y-8">
              {steps.map((step, index) => (
                <li key={step.label} className="grid grid-cols-[2.5rem_1fr] gap-3 sm:grid-cols-[3.5rem_1fr]">
                  <span className="font-serif text-lg font-medium text-sage">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-medium text-ink">{step.label}</h3>
                    <p className="body-copy mt-2">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contacto" className="scroll-mt-24 bg-blush">
          <div className="wrap py-16 sm:py-24">
            <p className="eyebrow">Contacto</p>
            <h2 className="heading mt-3">Hablemos cuando lo necesites</h2>
            <p className="body-copy mt-4">
              Escribime por el canal que te quede más práctico. Te respondo siempre con calidez.
            </p>
            <div className="mt-8">
              <a className="btn" href={bookingUrl} target="_blank" rel="noreferrer">
                Reservar consulta
              </a>
              <p className="mt-5 text-lg">
                <a className="text-link" href={whatsappLink} target="_blank" rel="noreferrer">
                  Escribir por WhatsApp
                </a>
              </p>
              <p className="mt-3 text-lg">
                <Link className="text-link" to="/contacto">
                  Usar el formulario
                </Link>
              </p>
            </div>
            <p className="mt-12 text-base text-muted">
              También en{" "}
              <a
                className="underline decoration-line underline-offset-4 hover:text-ink"
                href="https://www.instagram.com/lactancia_uy/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              .
            </p>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24">
          <div className="wrap py-16 sm:py-24">
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2 className="heading mt-3">Te respondo con claridad</h2>
            <div className="mt-10 divide-y divide-line border-y border-line">
              {faqs.map((faq, faqIndex) => {
                const isOpen = faqIndex === openFaq;
                return (
                  <div key={faq.question} className="py-5">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? -1 : faqIndex)}
                      className="flex w-full items-start justify-between gap-6 text-left text-lg font-semibold text-ink"
                    >
                      {faq.question}
                      <span className="mt-0.5 text-muted" aria-hidden="true">
                        {isOpen ? "–" : "+"}
                      </span>
                    </button>
                    {isOpen ? <p className="body-copy mt-3 max-w-prose">{faq.answer}</p> : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-line" aria-label="Historias">
          <div className="wrap py-16 sm:py-24">
            <p className="eyebrow">Historias</p>
            <h2 className="heading mt-3">Palabras de quienes consultaron</h2>
            <ul className="mt-10 space-y-10">
              {testimonials.map((item) => (
                <li key={item.name}>
                  <blockquote className="font-serif text-xl font-medium leading-snug text-ink sm:text-2xl">
                    “{item.text}”
                  </blockquote>
                  <p className="mt-3 text-base text-muted">{item.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
