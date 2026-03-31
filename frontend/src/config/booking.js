/**
 * URLs públicas de Cal.com por tipo de cita (event types).
 * Definilas en `.env` en la raíz de `frontend` — ver `env.sample`.
 * Reiniciá `npm run dev` después de crear o editar `.env`.
 */
const KEYS = {
  presencial: "VITE_CAL_COM_PRESENCIAL_URL",
  online: "VITE_CAL_COM_ONLINE_URL",
  talleres: "VITE_CAL_COM_TALLERES_URL",
  cuidados: "VITE_CAL_COM_CUIDADOS_URL"
};

const WHATSAPP_BOOKING = "59899049093";

const WA_FALLBACK = {
  presencial:
    "Hola, me gustaría coordinar una consulta presencial a domicilio en Melo, Cerro Largo.",
  online: "Hola, me interesa una consulta de lactancia online."
};

function whatsappHref(message) {
  return `https://wa.me/${WHATSAPP_BOOKING}?text=${encodeURIComponent(message)}`;
}

/** Solo Cal.com (vacío si no configuraste la variable). */
export function getBookingHref(kind) {
  const envKey = KEYS[kind];
  if (!envKey) return "";
  const raw = import.meta.env[envKey];
  return typeof raw === "string" && raw.trim() ? raw.trim() : "";
}

/**
 * Cal.com si hay variable; si no, WhatsApp con mensaje acorde al tipo.
 * Así “Reservar” no cae en /contacto por olvido del .env.
 */
export function getBookingHrefOrWhatsapp(kind) {
  const cal = getBookingHref(kind);
  if (cal) return cal;
  const msg = WA_FALLBACK[kind];
  return msg ? whatsappHref(msg) : "";
}

/** Primera opción para “Ver disponibilidad”: Cal presencial → Cal online → WA presencial. */
export function getDefaultAvailabilityHref() {
  return (
    getBookingHref("presencial") ||
    getBookingHref("online") ||
    whatsappHref(WA_FALLBACK.presencial)
  );
}

export function isExternalBookingHref(href) {
  return typeof href === "string" && href.startsWith("http");
}
