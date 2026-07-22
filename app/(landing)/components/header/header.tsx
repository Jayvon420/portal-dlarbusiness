import Link from "next/link";

import { Button } from "@/components/ui/button";

import Container from "../ui/container";
import Logo from "../ui/logo";

import DesktopNav from "./desktop-nav";
import MobileNav from "./mobile-nav";
import { COMPANY } from "../../constants";

export default function Header() {
  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-slate-200/80
        bg-white/80
        backdrop-blur-xl
      "
    >
      <Container className="flex h-20 items-center justify-between">
        <Logo />

        <DesktopNav />

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            asChild
            variant="outline"
            className="
              border-[#068F41]
              text-[#068F41]
              hover:bg-[#068F41]
              hover:text-white
            "
          >
            <a
              href={COMPANY.messenger}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message Admin
            </a>
          </Button>

          <Button className="bg-[#004AAD] hover:bg-[#003E91]">
            <Link href="/login">Login</Link>
          </Button>
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}
