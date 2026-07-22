import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

import ContactAdmin from "../ui/contact-admin";

import { COMPANY } from "../../constants";

export default function FooterContact() {
  return (
    <div>
      <h3 className="text-lg font-semibold">Contact</h3>

      <div className="mt-6 space-y-5">
        <div className="flex items-start gap-3">
          <Mail className="mt-0.5 h-5 w-5 text-[#068F41]" />

          <span className="text-sm text-slate-400">{COMPANY.email}</span>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="mt-0.5 h-5 w-5 text-[#068F41]" />

          <span className="text-sm text-slate-400">{COMPANY.phone}</span>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5 text-[#068F41]" />

          <span className="text-sm text-slate-400">{COMPANY.address}</span>
        </div>

        {/* <div className="pt-2">
          <ContactAdmin />
        </div> */}
      </div>
    </div>
  );
}
