import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EventSection from "@/components/EventSection";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <EventSection />
        <Location />
      </main>
      <Footer />
    </>
  );
}
