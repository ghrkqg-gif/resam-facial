import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Cases from "@/components/Cases";
import Types from "@/components/Types";
import Symptoms from "@/components/Symptoms";
import Programs from "@/components/Programs";
import Pricing from "@/components/Pricing";
import WhyResam from "@/components/WhyResam";
import ColumnSection from "@/components/ColumnSection";
import ReviewSection from "@/components/ReviewSection";
import ConsultForm from "@/components/ConsultForm";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Cases />
        <Types />
        <Symptoms />
        <Programs />
        <Pricing />
        <WhyResam />
        <ColumnSection />
        <ReviewSection />
        <ConsultForm />
        <Location />
      </main>
      <Footer />
    </>
  );
}
