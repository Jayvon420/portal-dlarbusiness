import Image from "next/image";

export default function HeroPreview() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Background Glow */}
      <div className="absolute -left-12 top-10 h-64 w-64 rounded-full bg-[#004AAD]/10 blur-3xl" />

      <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-[#068F41]/10 blur-3xl" />

      {/* Browser Window */}
      <div
        className="
          relative
          w-full
          max-w-3xl
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-2xl
          transition-all
          duration-500
          hover:-translate-y-2
          hover:shadow-[0_40px_80px_rgba(0,74,173,0.18)]
        "
      >
        {/* Browser Header */}
        <div className="flex items-center justify-between border-b bg-slate-50 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
          </div>

          <div className="text-sm font-semibold text-slate-700">
            DLAR Portal Dashboard
          </div>

          <div className="w-12" />
        </div>

        {/* Screenshot */}
        <Image
          src="/dashboard2.png"
          alt="DLAR Portal Dashboard"
          width={1600}
          height={900}
          priority
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}
