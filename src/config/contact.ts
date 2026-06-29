export const WHATSAPP_NUMBER = (
  import.meta.env.VITE_WHATSAPP_NUMBER || "50581818130"
).replace(/\D/g, "");

export const WHATSAPP_MESSAGE =
  "Hola, me gustar\u00eda recibir informaci\u00f3n sobre SoulFit.";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

export function openWhatsApp() {
  window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
}