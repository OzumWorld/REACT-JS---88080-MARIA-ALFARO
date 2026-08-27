import { Link } from "react-router-dom";

export function BrandMark({ decorative = false }) {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 64 64"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? "true" : undefined}
      aria-label={decorative ? undefined : "Símbolo de Arcillas Argentinas"}
    >
      <circle cx="32" cy="32" r="29" fill="currentColor" />
      <path d="M12 35c8-8 16-11 24-9 6 1 11 5 16 10" fill="none" stroke="var(--brand-gold)" strokeWidth="3" strokeLinecap="round" />
      <path d="M13 43c10-6 20-8 29-5 4 1 7 3 10 5" fill="none" stroke="var(--brand-clay)" strokeWidth="4" strokeLinecap="round" />
      <path d="M21 20c4-4 8-6 12-6 4 0 8 2 11 6" fill="none" stroke="var(--brand-sand)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function Brand({ compact = false }) {
  return (
    <Link className={`brand${compact ? " brand--compact" : ""}`} to="/" aria-label="Arcillas Argentinas, ir al inicio">
      <BrandMark decorative />
      <span className="brand__wordmark">
        <span>Arcillas</span>
        <strong>Argentinas</strong>
      </span>
    </Link>
  );
}
