import { useId } from "react";
import { Link } from "react-router-dom";

const VESSEL_PATH = "M31 22h34c0 7 5 11 9 18 8 14 6 30-5 43-6 7-36 7-42 0-11-13-13-29-5-43 4-7 9-11 9-18Z";

export function BrandSymbol({ decorative = false, monochrome = false }) {
  const clipId = useId();

  return (
    <svg
      className={`brand-symbol${monochrome ? " brand-symbol--mono" : ""}`}
      viewBox="0 0 96 96"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? "true" : undefined}
      aria-label={decorative ? undefined : "Vasija formada por estratos de tierra, símbolo de Arcillas Argentinas"}
    >
      <defs><clipPath id={clipId}><path d={VESSEL_PATH} /></clipPath></defs>
      {monochrome ? (
        <>
          <defs>
            <mask id={`${clipId}-mono`}>
              <rect width="96" height="96" fill="white" />
              <path d="M23 50c18-6 34 6 51-1M21 66c18-5 38 6 56-2" fill="none" stroke="black" strokeWidth="3.5" />
            </mask>
          </defs>
          <path d={`M29 12h38v10H29z${VESSEL_PATH}`} fill="currentColor" mask={`url(#${clipId}-mono)`} />
        </>
      ) : (
        <>
          <g clipPath={`url(#${clipId})`}>
            <rect x="14" y="18" width="68" height="76" fill="var(--brand-sand)" />
            <path d="M14 39c17-5 31 5 48 2 8-1 14-4 20-6v22H14Z" fill="var(--brand-gold)" />
            <path d="M14 55c19-7 34 7 51 3 6-1 12-4 17-6v21H14Z" fill="var(--brand-clay)" />
            <path d="M14 72c20-5 37 6 51 3 7-1 12-4 17-6v25H14Z" fill="var(--brand-ink)" />
          </g>
          <path d={VESSEL_PATH} fill="none" stroke="var(--brand-ink-dark)" strokeWidth="3" strokeLinejoin="round" />
          <path d="M29 12h38v10H29z" fill="var(--brand-clay)" stroke="var(--brand-ink-dark)" strokeWidth="3" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}

export function BrandWordmark({ tone = "on-light" }) {
  return (
    <span className={`brand__wordmark brand__wordmark--${tone}`} aria-hidden="true">
      <span>Arcillas</span>
      <strong>Argentinas</strong>
    </span>
  );
}

export default function Brand({ compact = false, tone = "on-dark" }) {
  return (
    <Link className={`brand brand--${tone}${compact ? " brand--compact" : ""}`} to="/" aria-label="Arcillas Argentinas, ir al inicio">
      <BrandSymbol decorative />
      <BrandWordmark tone={tone} />
    </Link>
  );
}
