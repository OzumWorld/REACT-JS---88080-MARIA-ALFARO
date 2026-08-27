const formEndpoint = (import.meta.env.VITE_CONTACT_FORM_ENDPOINT || "").trim();

export const CONTACT_CONFIG = Object.freeze({
  recipientEmail: "arcillasargentinas@gmail.com",
  formEndpoint,
  provider: "Formspree",
  whatsapp: "5491155634825",
});

export const isContactFormConfigured = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(formEndpoint);
