import Link from "next/link";

import { Button } from "@/components/ui/button";

import ContactAdmin from "../ui/contact-admin";
import { COMPANY } from "../../constants";

export default function HeroActions() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <Button
        asChild
        size="lg"
        className="
          bg-[#004AAD]
          px-8
          hover:bg-[#003E91]
        "
      >
        <Link href="/login">Login to Portal</Link>
      </Button>

      <Button
        asChild
        variant="outline"
        className="
        px-8
                border-[#068F41]
                text-[#068F41]
                hover:bg-[#068F41]
                hover:text-white
              "
      >
        <a href={COMPANY.messenger} target="_blank" rel="noopener noreferrer">
          Contact Admin
        </a>
      </Button>
    </div>
  );
}
