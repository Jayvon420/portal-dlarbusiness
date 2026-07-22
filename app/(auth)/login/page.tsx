// import { GalleryVerticalEnd } from "lucide-react";
// import LoginClient from "./login-client";

// export default function LoginPage() {
//   return (
//     <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
//       <div className="flex w-full max-w-sm flex-col gap-6">
//         {/* BRAND */}
//         <a href="/" className="flex items-center gap-2 self-center font-medium">
//           <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
//             <GalleryVerticalEnd className="size-4" />
//           </div>
//           DLAR System
//         </a>

//         {/* LOGIN FORM */}
//         <LoginClient />
//       </div>
//     </div>
//   );
// }

import { GalleryVerticalEnd } from "lucide-react";
import LoginClient from "./login-client";

export default function LoginPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] px-4 py-10 md:flex md:items-center md:justify-center">
      <div className="mx-auto w-full max-w-md">
        <LoginClient />
      </div>
    </main>
  );
}
