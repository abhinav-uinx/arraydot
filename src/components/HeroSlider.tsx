'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// We dynamically import the Map to avoid SSR issues with amCharts
const MapChart = dynamic(() => import('./MapChart'), { ssr: false });

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;
  const autoSlideInterval = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    resetInterval();
  };

  const startInterval = () => {
    if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);
    autoSlideInterval.current = setInterval(nextSlide, 5000);
  };

  const resetInterval = () => {
    startInterval();
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);
    };
  }, []);

  return (
    <section
      className="hero"
      onMouseEnter={() => {
        if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);
      }}
      onMouseLeave={startInterval}
    >
      <div className="slider-container" id="hero-slider">
        {/* Slide 1 */}
        <div className={`slide ${currentSlide === 0 ? 'active' : ''}`}>
          <div
            className="slide-bg"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2000&auto=format&fit=crop')",
            }}
          ></div>
          <div className="slide-content" style={{ zIndex: 1 }}>
            <h2 className="slide-subtitle">MASSIVE ENTERPRISE INVENTORY</h2>
            <h1 className="slide-title">500,000+ Parts Ready to Ship</h1>
            <p className="slide-desc">
              Servers, Storage, Networking & Components â€” Delivering worldwide from Saudi Arabia.
            </p>
            <div className="slide-actions">
              <button className="btn btn-primary">Browse Catalog</button>
              <button className="btn btn-outline">Request a Quote</button>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className={`slide ${currentSlide === 1 ? 'active' : ''}`} style={{ background: '#0B1120' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.65 }}>
            {currentSlide === 1 && <MapChart />}
          </div>
          <div className="slide-content" style={{ zIndex: 1 }}>
            <h2 className="slide-subtitle">SHIPPING ACROSS MENA, AFRICA & BEYOND</h2>
            <h1 className="slide-title">Worldwide Delivery</h1>
            <p className="slide-desc">Dispatch on In-Stock Items via DHL, FedEx & UPS globally.</p>
            <div className="slide-actions">
              <button className="btn btn-primary">Browse Catalog</button>
              <button className="btn btn-outline">Request a Quote</button>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className={`slide ${currentSlide === 2 ? 'active' : ''}`}>
          <div
            className="slide-bg"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop')",
            }}
          ></div>

          <div className="slide-content" style={{ zIndex: 2 }}>
            <h2 className="slide-subtitle">ENTERPRISE COMPUTING</h2>
            <h1 className="slide-title">Premium IT Hardware</h1>
            <p className="slide-desc">Top quality motherboards, processors, and storage solutions for data centers.</p>
            <div className="slide-actions">
              <button className="btn btn-primary">Browse Catalog</button>
              <button className="btn btn-outline">Request a Quote</button>
            </div>
          </div>
        </div>
      </div>

      <div className="slider-dots" id="slider-dots">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </section>
  );
}


