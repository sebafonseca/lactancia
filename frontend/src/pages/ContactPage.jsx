import React, { useMemo, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Listbox, Transition } from "@headlessui/react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const reasons = [
  "Primera consulta",
  "Seguimiento",
  "Dolor o molestias",
  "Vuelta al trabajo",
  "Otro"
];

const initialState = {
  name: "",
  email: "",
  reason: "",
  message: "",
  preferWhatsapp: false
};

export default function ContactPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [whatsappLink, setWhatsappLink] = useState("");

  const apiUrl = useMemo(() => {
    const raw = import.meta.env.VITE_API_URL || "http://localhost:5000";
    return String(raw).replace(/\/+$/, "");
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValue = name === "email" ? value.replace(/\s+/g, "") : value;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : nextValue
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: undefined
    }));
  };

  const validate = () => {
    const nextErrors = {};
    const emailValue = form.email.trim();
    if (!form.name.trim()) {
      nextErrors.name = "El nombre es obligatorio.";
    }
    if (!emailValue) {
      nextErrors.email = "El email es obligatorio.";
    } else {
      const [localPart, domainPart] = emailValue.split("@");
      if (!localPart || !domainPart || !domainPart.includes(".")) {
        nextErrors.email = "El email no parece válido.";
      }
    }
    if (!form.message.trim()) {
      nextErrors.message = "El mensaje es obligatorio.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildWhatsappLink = () => {
    const summary = [
      `Hola Ana Cecilia, soy ${form.name}.`,
      `Email: ${form.email}.`,
      form.reason ? `Motivo: ${form.reason}.` : null,
      `Mensaje: ${form.message}`
    ]
      .filter(Boolean)
      .join(" ");
    return `https://wa.me/59899049093?text=${encodeURIComponent(summary)}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          reason: form.reason || null,
          message: form.message,
          preferWhatsapp: form.preferWhatsapp
        })
      });

      if (!response.ok) {
        throw new Error("request_failed");
      }

      if (form.preferWhatsapp) {
        setWhatsappLink(buildWhatsappLink());
      } else {
        setWhatsappLink("");
      }

      setStatus("success");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="text-ink">
      <Navbar />
      <main className="wrap pb-16 pt-10 sm:pb-24 sm:pt-16">
        <button
          type="button"
          onClick={handleBack}
          className="text-base font-semibold text-sage underline decoration-sage/30 underline-offset-4"
        >
          Volver
        </button>
        <p className="eyebrow mt-8">Contacto</p>
        <h1 className="heading mt-3">¿Necesitás ayuda o querés consultarme?</h1>
        <p className="body-copy mt-4">
          Podés escribirme con total confianza. Te respondo personalmente en menos de 24 horas.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6" noValidate>
          <div className="grid gap-6">
            <label className="block text-base font-semibold text-ink">
              Nombre
              <input
                className="field mt-2 font-normal"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                placeholder="Tu nombre"
              />
              {errors.name ? <p className="mt-2 text-base font-normal text-danger">{errors.name}</p> : null}
            </label>
            <label className="block text-base font-semibold text-ink">
              Email
              <input
                className="field mt-2 font-normal"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                placeholder="tu@email.com"
              />
              {errors.email ? <p className="mt-2 text-base font-normal text-danger">{errors.email}</p> : null}
            </label>
          </div>

          <div className="text-base font-semibold text-ink">
            <span>Motivo de consulta (opcional)</span>
            <Listbox
              value={form.reason}
              onChange={(value) => setForm((prev) => ({ ...prev, reason: value }))}
            >
              <div className="relative mt-2">
                <Listbox.Button className="field flex items-center justify-between text-left font-normal">
                  <span className={form.reason ? "text-ink" : "text-muted"}>
                    {form.reason || "Seleccionar"}
                  </span>
                  <span className="text-sm text-muted" aria-hidden="true">
                    ▼
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  enter="transition ease-out duration-150"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                >
                  <Listbox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-line bg-paper p-2 text-base font-normal shadow-none">
                    <Listbox.Option
                      value=""
                      className={({ active }) =>
                        `cursor-pointer rounded-lg px-3 py-3 ${active ? "bg-blush" : ""}`
                      }
                    >
                      Seleccionar
                    </Listbox.Option>
                    {reasons.map((reason) => (
                      <Listbox.Option
                        key={reason}
                        value={reason}
                        className={({ active }) =>
                          `cursor-pointer rounded-lg px-3 py-3 ${active ? "bg-blush" : ""}`
                        }
                      >
                        {reason}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          <label className="block text-base font-semibold text-ink">
            Mensaje
            <textarea
              className="field mt-2 min-h-[180px] resize-y font-normal"
              name="message"
              value={form.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              placeholder="Contame un poco sobre tu situación..."
            />
            {errors.message ? (
              <p className="mt-2 text-base font-normal text-danger">{errors.message}</p>
            ) : null}
          </label>

          <label className="flex items-start gap-3 text-base font-semibold text-ink">
            <input
              type="checkbox"
              name="preferWhatsapp"
              checked={form.preferWhatsapp}
              onChange={handleChange}
              className="mt-1 h-5 w-5 rounded border-line text-sage focus:ring-sage"
            />
            Prefiero que me respondan por WhatsApp
          </label>

          <button className="btn" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Enviando..." : "Enviar mensaje"}
          </button>
        </form>

        {status === "success" ? (
          <p className="mt-8 rounded-xl border border-line bg-blush px-5 py-4 text-lg text-ink" role="status">
            Mensaje enviado con éxito. Te responderemos pronto.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="mt-8 text-lg text-danger" role="alert">
            No pudimos enviar el mensaje. Intentá nuevamente.
          </p>
        ) : null}
        {status === "success" && whatsappLink ? (
          <p className="mt-4 text-lg">
            <a className="text-link" href={whatsappLink} target="_blank" rel="noreferrer">
              Continuar en WhatsApp
            </a>
          </p>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
