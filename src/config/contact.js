export const CONTACT_CONFIG = Object.freeze({
  recipientEmail: null,
  formEndpoint: (import.meta.env.VITE_CONTACT_FORM_ENDPOINT || "").trim(),
  provider: "Formspree",
  whatsapp: "5491155634825",
});

export const isContactFormConfigured = Boolean(CONTACT_CONFIG.formEndpoint);
