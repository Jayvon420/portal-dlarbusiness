import Logo from "../ui/logo";

import { COMPANY } from "../../constants";

export default function FooterBrand() {
  return (
    <div>
      <Logo variant="light" />

      <p className="mt-6 text-sm leading-7 text-slate-400">
        Helping businesses securely submit, manage, and monitor important
        business documents through one centralized online portal.
      </p>
    </div>
  );
}
