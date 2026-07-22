"use client";

import Link from "next/link";

import { Menu } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import Logo from "../ui/logo";

import { navigation } from "../../navigation";
import { COMPANY } from "../../constants";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <div className="px-4 py-6">
          <Logo />

          <div className="mt-10 flex flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-slate-100"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3">
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
              <SheetClose asChild>
                <a
                  href={COMPANY.messenger}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message Admin
                </a>
              </SheetClose>
            </Button>

            {/* <Button className="bg-[#004AAD] hover:bg-[#003E91]">Login</Button>
             */}
            <SheetClose asChild>
              <Button asChild className="bg-[#004AAD] hover:bg-[#003E91]">
                <Link href="/login">Login</Link>
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
