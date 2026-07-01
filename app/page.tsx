import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EventSection from "@/components/EventSection";
import ConsultSection from "@/components/ConsultSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <EventSection />
        <ConsultSection />
      </main>
      <Footer />
    </>
  );
}
