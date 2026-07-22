import Container from "../ui/container";

import HeroContent from "./hero-content";
import HeroPreview from "./hero-preview";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#004AAD]/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#068F41]/10 blur-3xl" />

      <Container>
        <div
          className="
    grid
    min-h-[calc(100dvh-5rem)]
    items-center
    gap-16
    py-20
    lg:grid-cols-2
    lg:py-28
  "
        >
          <HeroContent />

          <HeroPreview />
        </div>
      </Container>
    </section>
  );
}
