import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const slides = [
  {
    title: "Find Your Perfect PG",
    description: "Discover verified PGs, hostels, and rental rooms in your preferred location.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"
  },
  {
    title: "Affordable & Premium",
    description: "From budget-friendly to luxury stays, find everything tailored to your needs.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
  },
  {
    title: "Direct Owner Contact",
    description: "Connect directly with owners via WhatsApp without any brokerage fees.",
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80"
  }
];

const Onboarding = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      onComplete();
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--surface)' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <img 
          src={slides[currentSlide].image} 
          alt="Onboarding" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to bottom, transparent 0%, var(--surface) 100%)'
        }} />
      </div>
      
      <div style={{ padding: '32px 24px', textAlign: 'center', minHeight: '35vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px' }}>
            {slides[currentSlide].title}
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {slides[currentSlide].description}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                style={{
                  width: idx === currentSlide ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: idx === currentSlide ? 'var(--primary)' : 'var(--border)',
                  transition: 'width 0.3s'
                }}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            style={{
              backgroundColor: 'var(--primary)',
              color: 'white',
              width: '56px',
              height: '56px',
              borderRadius: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-md)',
              transition: 'transform 0.1s'
            }}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
