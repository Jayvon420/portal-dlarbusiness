// export default function NotFound() {
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
//       <h1 className="text-6xl font-bold">404</h1>

//       <p className="mt-3 text-muted-foreground">
//         The page you’re looking for doesn’t exist.
//       </p>

//       <a
//         href="/dashboard"
//         className="mt-6 rounded-xl bg-black px-4 py-2 text-white hover:opacity-90"
//       >
//         Go back home
//       </a>
//     </div>
//   );
// }

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="mt-3 text-muted-foreground">
        The page you’re looking for doesn’t exist.
      </p>

      <a
        href="/"
        className="mt-6 rounded-xl bg-black px-4 py-2 text-white hover:opacity-90"
      >
        Go back home
      </a>
    </div>
  );
}
