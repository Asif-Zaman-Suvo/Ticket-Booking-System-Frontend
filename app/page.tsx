import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturedRoutes from './components/FeaturedRoutes';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedRoutes />
      <Benefits />
      <Testimonials />
      <Footer />
    </div>
  );
}

