import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import ProductDemo from "@/components/home/ProductDemo";
import AppDemo from "@/components/home/AppDemo";
import ContentGeneratorDemo from "@/components/home/ContentGeneratorDemo";
import Pricing from "@/components/home/Pricing";
import CTA from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";
import AdBanner from "@/components/AdBanner";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <AdBanner />
        <Hero />
        <Features />
        <HowItWorks />
        <ProductDemo />
        <AppDemo />
        <ContentGeneratorDemo />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
