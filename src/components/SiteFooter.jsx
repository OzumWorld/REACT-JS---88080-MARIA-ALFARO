import Brand from "./Brand.jsx";
import ContactSection from "./ContactSection.jsx";

export default function SiteFooter() {
  return (
    <footer>
      <ContactSection />
      <div className="site-footer">
        <div className="container site-footer__inner">
          <Brand compact />
          <p>Distribuidores de Arcillas Chilavert</p>
          <p>© {new Date().getFullYear()} Arcillas Argentinas</p>
        </div>
      </div>
    </footer>
  );
}
