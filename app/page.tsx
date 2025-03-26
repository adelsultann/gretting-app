import LogoCarousel from "@/components/partner-section";
import Footer from "@/components/Footer";
import Hero from "@/components/hero-section";
import Navbar from "@/components/Navbar";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <main className="bg-[#2B2B2B] text-white">
      <Navbar />
      <Hero />
      <Testimonial />
      <LogoCarousel />
      <Footer />
    </main>
  )
}
