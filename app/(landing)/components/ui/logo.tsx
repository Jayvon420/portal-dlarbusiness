import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

export default function Logo({ className, variant = "dark" }: LogoProps) {
  const titleColor = variant === "light" ? "text-white" : "text-slate-900";

  const subtitleColor =
    variant === "light" ? "text-slate-400" : "text-slate-500";

  return (
    <Link href="/" className={`flex items-center gap-3 ${className ?? ""}`}>
      <Image
        src="/dlar-logo.png"
        alt="DLAR Business HUB"
        width={52}
        height={52}
        priority
        className="h-12 w-12 object-contain"
      />

      <div className="leading-tight">
        <h1 className={`text-lg font-bold ${titleColor}`}>DLAR Business HUB</h1>

        <p className={`text-xs ${subtitleColor}`}>
          Business Management and Compliance Platform
        </p>
        <span className="text-xs text-blue-600 italic">Powered by DLAR PH</span>
      </div>
    </Link>
  );
}
