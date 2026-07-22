import {
  ShieldCheck,
  BadgeCheck,
  Clock3,
  BriefcaseBusiness,
} from "lucide-react";

export default function HeroStats() {
  return (
    <div className="mt-12 flex flex-wrap gap-8">
      <div className="flex items-center gap-2">
        <BriefcaseBusiness className="h-5 w-5 text-[#068F41]" />

        <span className="text-sm font-medium text-slate-700">Professional</span>
      </div>

      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-[#068F41]" />

        <span className="text-sm font-medium text-slate-700">Secure</span>
      </div>

      <div className="flex items-center gap-2">
        <BadgeCheck className="h-5 w-5 text-[#068F41]" />

        <span className="text-sm font-medium text-slate-700">Reliable</span>
      </div>
    </div>
  );
}
