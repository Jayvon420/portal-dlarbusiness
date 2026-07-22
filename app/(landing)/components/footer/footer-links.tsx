import Link from "next/link";

import { navigation } from "../../navigation";

export default function FooterLinks() {
  return (
    <div>
      <h3 className="text-lg font-semibold">Quick Links</h3>

      <nav className="mt-6 flex flex-col gap-4">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm text-slate-400 transition-colors hover:text-white"
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
