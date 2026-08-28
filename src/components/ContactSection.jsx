import { useState } from "react";
import { CATALOGO } from "../data/catalogo.js";
import { CONTACT_CONFIG, isContactFormConfigured } from "../config/contact.js";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "Consulta general",
  message: "",
  consent: false,
  company: "",
};

export default function ContactSection() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);

  const update = (field) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!isContactFormConfigured) {
      setStatus({ type: "info", message: "El formulario quedará habilitado al confirmar el email receptor." });
      return;
    }

    setSending(true);
    setStatus({ type: "", message: "" });
    try {
      const response = await fetch(CONTACT_CONFIG.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("No pudimos enviar la consulta.");
      setForm(initialForm);
      setStatus({ type: "success", message: "Gracias. Recibimos tu consulta y te responderemos a la brevedad." });
    } catch {
      setStatus({ type: "error", message: "No pudimos enviar la consulta. Podés escribirnos por WhatsApp." });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contact" id="contacto" aria-labelledby="contact-title">
      <div className="container contact__layout">
        <div className="contact__intro">
          <p className="eyebrow">Estamos para acompañarte</p>
          <h2 id="contact-title">¿Tenés una consulta?</h2>
          <p>Contanos qué material estás buscando o qué necesitás saber sobre tu pedido.</p>
          <a className="text-link text-link--light" href={`https://wa.me/${CONTACT_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer">
            Consultar por WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </div>

        <form className="contact-form" onSubmit={submit} aria-describedby="contact-note">
          <div className="form-grid">
            <label>
              Nombre <span aria-hidden="true">*</span>
              <input name="name" autoComplete="name" required value={form.name} onChange={update("name")} />
            </label>
            <label>
              Email <span aria-hidden="true">*</span>
              <input name="email" type="email" autoComplete="email" required value={form.email} onChange={update("email")} />
            </label>
            <label>
              Teléfono <span className="label-optional">(opcional)</span>
              <input name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={update("phone")} />
            </label>
            <label>
              Asunto o producto <span aria-hidden="true">*</span>
              <select name="subject" required value={form.subject} onChange={update("subject")}>
                <option>Consulta general</option>
                <option>Pedido y retiro</option>
                {CATALOGO.map((product) => <option key={product.id}>{product.nombre}</option>)}
              </select>
            </label>
          </div>
          <label>
            Mensaje <span aria-hidden="true">*</span>
            <textarea name="message" rows="5" required value={form.message} onChange={update("message")} />
          </label>
          <label className="honeypot" aria-hidden="true">
            Empresa
            <input name="company" tabIndex="-1" autoComplete="off" value={form.company} onChange={update("company")} />
          </label>
          <label className="consent">
            <input name="consent" type="checkbox" required checked={form.consent} onChange={update("consent")} />
            <span>Acepto que mis datos se utilicen únicamente para responder esta consulta.</span>
          </label>
          <div className="contact-form__actions">
            <button className="btn btn--clay" type="submit" disabled={sending}>
              {sending ? "Enviando…" : "Enviar consulta"}
            </button>
            <p id="contact-note" className="form-note">
              {!isContactFormConfigured ? "Configuración de recepción pendiente; no se almacenan datos desde esta vista previa." : "Tus datos se envían de forma segura al servicio de recepción configurado."}
            </p>
          </div>
          {status.message && <p className={`form-status form-status--${status.type}`} role="status">{status.message}</p>}
        </form>
      </div>
    </section>
  );
}
