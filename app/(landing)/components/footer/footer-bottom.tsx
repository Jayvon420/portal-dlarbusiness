import Link from "next/link";

export default function FooterBottom() {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-between
        gap-4
        border-t
        border-slate-800
        py-6
        text-sm
        text-slate-500
        md:flex-row
      "
    >
      <p>© {new Date().getFullYear()} DLAR Portal. All rights reserved.</p>

      <div className="flex items-center gap-6">
        <Link href="/privacy" className="transition-colors hover:text-white">
          Privacy Policy
        </Link>

        <Link href="/terms" className="transition-colors hover:text-white">
          Terms of Service
        </Link>
      </div>
    </div>
  );
}
