import React, { useMemo, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Listbox, Transition } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
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

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
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
        nextErrors.email = "El email no parece valido.";
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
    <div className="text-violetDeep">
      <Navbar />
      <motion.section
        className="mx-auto w-full max-w-6xl px-6 pb-8 pt-10"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <div className="rounded-3xl bg-white/80 px-8 py-10 shadow-soft backdrop-blur">
          <button
            type="button"
            onClick={handleBack}
            className="mb-4 text-left text-sm font-medium text-[#6A5FDB] hover:text-[#5a4fcf] hover:underline"
          >
            ← Volver
          </button>
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold text-violetDeep/70">Contacto</p>
            <h1 className="text-3xl font-semibold">¿Necesitás ayuda o querés consultarme?</h1>
            <p className="mt-2 text-sm text-violetDeep/70">
              Podés escribirme con total confianza. Te respondo personalmente en menos de 24 horas.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold">
                Nombre
                <input
                  className="w-full rounded-2xl border border-violetSoft/40 bg-white/80 px-4 py-3 text-sm font-normal outline-none transition focus:border-violetDeep/50 focus:ring-2 focus:ring-violetSoft/40"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                />
                {errors.name && <p className="text-xs text-rose-500">{errors.name}</p>}
              </label>
              <label className="space-y-2 text-sm font-semibold">
                Email
                <input
                  className="w-full rounded-2xl border border-violetSoft/40 bg-white/80 px-4 py-3 text-sm font-normal outline-none transition focus:border-violetDeep/50 focus:ring-2 focus:ring-violetSoft/40"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                />
                {errors.email && <p className="text-xs text-rose-500">{errors.email}</p>}
              </label>
            </div>
            <div className="space-y-2 text-sm font-semibold">
              <span>Motivo de consulta (opcional)</span>
              <Listbox
                value={form.reason}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, reason: value }))
                }
              >
                <div className="relative">
                  <Listbox.Button className="flex w-full items-center justify-between rounded-2xl border border-violetSoft/40 bg-white/80 px-4 py-3 text-sm font-normal text-violetDeep/80 outline-none transition focus:border-violetDeep/50 focus:ring-2 focus:ring-violetSoft/40">
                    <span>{form.reason || "Seleccionar"}</span>
                    <span className="text-xs text-violetDeep/60">▼</span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    enter="transition ease-out duration-150"
                    enterFrom="opacity-0 -translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-2xl border border-violetSoft/40 bg-white/90 p-2 text-sm shadow-soft backdrop-blur">
                      <Listbox.Option
                        value=""
                        className={({ active }) =>
                          `cursor-pointer rounded-xl px-3 py-2 ${
                            active ? "bg-violetSoft/40" : ""
                          }`
                        }
                      >
                        Seleccionar
                      </Listbox.Option>
                      {reasons.map((reason) => (
                        <Listbox.Option
                          key={reason}
                          value={reason}
                          className={({ active }) =>
                            `cursor-pointer rounded-xl px-3 py-2 ${
                              active ? "bg-violetSoft/40" : ""
                            }`
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
            <label className="space-y-2 text-sm font-semibold">
              Mensaje
              <textarea
                className="min-h-[160px] w-full resize-none rounded-2xl border border-violetSoft/40 bg-white/80 px-4 py-3 text-sm font-normal outline-none transition focus:border-violetDeep/50 focus:ring-2 focus:ring-violetSoft/40"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Contame un poco sobre tu situacion..."
              />
              {errors.message && (
                <p className="text-xs text-rose-500">{errors.message}</p>
              )}
            </label>
            <label className="flex items-center gap-3 text-sm font-semibold">
              <input
                type="checkbox"
                name="preferWhatsapp"
                checked={form.preferWhatsapp}
                onChange={handleChange}
                className="h-4 w-4 rounded border-violetSoft/60 text-violetDeep focus:ring-violetSoft/40"
              />
              Prefiero que me respondan por WhatsApp
            </label>
            <motion.button
              whileHover={{ scale: 1.04, opacity: 0.9 }}
              className="w-full rounded-full bg-violetDeep px-6 py-3 text-sm font-semibold text-white shadow-soft"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Enviando..." : "Enviar mensaje"}
            </motion.button>
          </form>
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="mt-6 rounded-2xl bg-mint/70 px-5 py-4 text-sm font-semibold text-violetDeep"
              >
                Mensaje enviado con exito. Te responderemos pronto.
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="mt-6 rounded-2xl bg-rosePastel/80 px-5 py-4 text-sm font-semibold text-violetDeep"
              >
                No pudimos enviar el mensaje. Intenta nuevamente.
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {status === "success" && whatsappLink && (
              <motion.a
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                whileHover={{ scale: 1.03 }}
                className="mt-4 flex items-center justify-center rounded-full bg-mint/80 px-6 py-3 text-sm font-semibold text-violetDeep shadow-soft"
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
              >
                Continuar en WhatsApp
              </motion.a>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
}
