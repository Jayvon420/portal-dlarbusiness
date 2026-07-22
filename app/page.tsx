// export default function Home() {
//   return null;
// }

import Header from "./(landing)/components/header/header";
import Hero from "./(landing)/components/hero/hero";
import Footer from "./(landing)/components/footer/footer";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
      </main>

      <Footer />
    </>
  );
}
