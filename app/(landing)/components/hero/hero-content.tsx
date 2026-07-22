import HeroActions from "./hero-actions";
import HeroStats from "./hero-stats";

export default function HeroContent() {
  return (
    <div className="max-w-xl">
      {/* Badge */}
      <div
        className="
          inline-flex
          items-center
          rounded-full
          border
          border-[#068F41]/20
          bg-[#068F41]/10
          px-4
          py-2
          text-sm
          font-medium
          text-[#068F41]
        "
      >
        Secure Business Document Processing Portal
      </div>

      {/* Heading */}
      <h1
        className="
          mt-8
          text-5xl
          font-extrabold
          leading-tight
          tracking-tight
          text-slate-900
          lg:text-6xl
        "
      >
        Manage Your Business
        <span className="block text-[#004AAD]">Documents in One Place</span>
      </h1>

      {/* Description */}
      <p
        className="
          mt-8
          text-lg
          leading-8
          text-slate-600
        "
      >
        DLAR Portal is a secure online platform that helps businesses submit,
        monitor, and organize important documents with ease. Access your
        dashboard anytime to track requests, receive updates, download files,
        and communicate directly with our team from a single, centralized
        workspace.
      </p>

      <HeroActions />

      <HeroStats />
    </div>
  );
}
