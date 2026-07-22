import Container from "../ui/container";

import FooterBrand from "./footer-brand";
import FooterLinks from "./footer-links";
import FooterContact from "./footer-contact";
import FooterBottom from "./footer-bottom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <Container>
        <div className="grid gap-14 py-16 md:grid-cols-3">
          <FooterBrand />
          <FooterLinks />
          <FooterContact />
        </div>

        <FooterBottom />
      </Container>
    </footer>
  );
}
