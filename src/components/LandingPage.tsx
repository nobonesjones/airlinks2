import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

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
            <Link to="/signup" className="bg-[#FF5A5F] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#FF7E82] transition duration-300">
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
            <Link to="/signup" className="inline-flex items-center bg-[#FF5A5F] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#FF7E82] transition duration-300">
              Get Started <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white" ref={(el) => (sectionsRef.current[0] = el)}>
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Nobody reads your welcome PDF</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">Full Interactive Guide</h3>
                <p className="text-gray-600">Engage guests with an interactive, easy-to-navigate guide to your property</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">AI-Powered Chat Support</h3>
                <p className="text-gray-600">Instant answers to guest questions, available 24/7</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">Emergency AI Call Support</h3>
                <p className="text-gray-600">Round-the-clock assistance for urgent situations</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-gray-50" ref={(el) => (sectionsRef.current[1] = el)}>
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Level Up Your Hosting Game</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-center mb-8">
                Make the experience 10x better, get more 5* reviews, and rise to the top of the super hosts!
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Enhance guest satisfaction with personalized, instant support
                </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Reduce time spent on repetitive guest inquiries
                </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Improve your property's ratings and visibility on Airbnb
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#FF5A5F] text-white" ref={(el) => (sectionsRef.current[2] = el)}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Hosting Experience?</h2>
            <Link to="/signup" className="inline-flex items-center bg-white text-[#FF5A5F] px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300">
              Get Started Now <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-semibold">AirLinks</span>
            </div>
            <nav className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300">Terms of Service</a>
              <a href="#" className="hover:text-gray-300">Contact</a>
            </nav>
          </div>
          <div className="mt-8 text-center text-gray-400">
            &copy; {new Date().getFullYear()} AirLinks. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;