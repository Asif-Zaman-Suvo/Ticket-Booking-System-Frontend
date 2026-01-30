import Navbar from './components/LandingPage/Navbar';
import HeroSection from './components/LandingPage/HeroSection';
import FeaturedRoutes from './components/LandingPage/FeaturedRoutes';
import Benefits from './components/LandingPage/Benefits';
import Testimonials from './components/LandingPage/Testimonials';
import Footer from './components/LandingPage/Footer';

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

