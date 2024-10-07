import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-[#FF5A5F]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.5 2h-21C.67 2 0 2.67 0 3.5v17c0 .83.67 1.5 1.5 1.5h21c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5zm-20 2h19v15h-19V4z"/>
            </svg>
            <span className="text-xl font-semibold ml-2">AirLinks</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-700 hover:text-gray-900">Features</a>
            <a href="#benefits" className="text-gray-700 hover:text-gray-900">Benefits</a>
            <Link to="/signup" className="bg-[#FF5A5F] hover:bg-[#FF7E82] text-white px-4 py-2 rounded-md font-semibold transition duration-300">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="text-center px-4">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Elevate Your Airbnb Experience
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-2xl mx-auto">
              Transform guest interactions with AI-powered support and personalized guides
            </p>
            <Link to="/signup" className="inline-flex items-center bg-[#FF5A5F] hover:bg-[#FF7E82] text-white px-8 py-3 rounded-md font-semibold transition duration-300">
              Get Started <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </section>

        {/* ... (rest of the component remains unchanged) ... */}

        {/* CTA Section */}
        <section className="py-20 bg-[#FF5A5F] text-white animate-on-scroll">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Hosting Experience?</h2>
            <Link to="/signup" className="inline-flex items-center bg-white text-[#FF5A5F] hover:bg-gray-100 px-8 py-3 rounded-md font-semibold transition duration-300">
              Get Started Now <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </section>
      </main>

      {/* ... (footer remains unchanged) ... */}

    </div>
  );
};

export default LandingPage;