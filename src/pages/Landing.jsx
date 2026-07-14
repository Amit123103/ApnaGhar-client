import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, MessageCircle, Home as HomeIcon, Star, CheckCircle2, Search, Key, Quote, ArrowRight } from 'lucide-react';
import propertiesData from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';
import { AuthContext } from '../context/AuthContext';
import Logo from '../components/Logo';

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  
  // Custom Styles for Organic Redesign
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .organic-card {
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
        border-radius: 32px;
      }
      .organic-card:hover {
        transform: translateY(-8px) rotate(-1deg);
        box-shadow: 0 20px 40px rgba(0, 166, 153, 0.15);
      }
      .city-card {
        transition: transform 0.5s ease, border-radius 0.5s ease;
        border-radius: 24px;
      }
      .city-card:hover {
        transform: translateY(-10px);
        border-radius: 40px 16px 40px 16px;
      }
      .blob {
        position: absolute;
        filter: blur(80px);
        z-index: 0;
        opacity: 0.5;
        border-radius: 50%;
        pointer-events: none;
      }
      .speech-bubble {
        border-radius: 32px 32px 32px 8px;
        transition: transform 0.3s ease;
      }
      .speech-bubble:hover {
        transform: scale(1.02);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', overflow: 'hidden', position: 'relative' }}>
      
      {/* Background Organic Blobs */}
      <div className="blob" style={{ top: '-10%', left: '-5%', width: '600px', height: '600px', backgroundColor: 'rgba(0,166,153,0.1)' }}></div>
      <div className="blob" style={{ top: '30%', right: '-10%', width: '500px', height: '500px', backgroundColor: 'rgba(255,184,0,0.08)' }}></div>
      <div className="blob" style={{ bottom: '10%', left: '10%', width: '700px', height: '700px', backgroundColor: 'rgba(0,166,153,0.08)' }}></div>

      {/* Hero Section - Split Layout */}
      <div style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        padding: '100px 5% 40px',
        zIndex: 1
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '40px', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* Left: Text */}
          <div className="animate-slide-up" style={{ flex: '1 1 500px', maxWidth: '650px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', backgroundColor: 'rgba(0,166,153,0.1)', padding: '6px 16px', borderRadius: '40px', color: 'var(--primary)', fontWeight: '700', fontSize: '14px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'inline-block' }}></span>
              100% Zero Brokerage
            </div>
            <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: '800', lineHeight: '1.1', marginBottom: '20px', letterSpacing: '-1px', color: '#111' }}>
              Find Your <br/>Perfect Stay. <br/>
              <span style={{ color: 'var(--primary)', position: 'relative' }}>
                Zero Hassle.
                <svg style={{ position: 'absolute', bottom: '-8px', left: 0, width: '100%', height: '12px', color: 'rgba(0,166,153,0.3)' }} viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0,10 Q50,20 100,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
              </span>
            </h1>
            <p style={{ fontSize: '18px', color: '#555', marginBottom: '40px', lineHeight: '1.6', maxWidth: '500px' }}>
              Discover verified PGs, Hostels, and Premium Apartments. Connect directly with owners via WhatsApp and keep your money where it belongs.
            </p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <button onClick={() => navigate(isAuthenticated ? '/explore' : '/login')} style={{
                backgroundColor: 'var(--primary)', color: 'white', padding: '18px 40px',
                borderRadius: '40px', fontSize: '18px', fontWeight: '700',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 12px 32px rgba(0,166,153,0.3)',
                display: 'flex', alignItems: 'center', gap: '12px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                {isAuthenticated ? 'Go to Dashboard' : 'Explore Rooms'}
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Right: Floating Organic Image */}
          <div style={{ flex: '1 1 500px', position: 'relative' }}>
            <div style={{
              width: '100%',
              paddingBottom: '100%',
              position: 'relative',
              borderRadius: '60px 200px 60px 200px',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
              transform: 'rotate(2deg)',
              transition: 'transform 0.5s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg) translateY(-10px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(2deg) translateY(0)'}>
              <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&q=80" alt="Beautiful apartment" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.05)' }} />
            </div>
            
            {/* Floating Trust Card */}
            <div style={{
              position: 'absolute', bottom: '40px', left: '-40px', backgroundColor: 'white', padding: '24px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '16px', zIndex: 2
            }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '30px', backgroundColor: '#e6f6f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h4 style={{ fontSize: '24px', fontWeight: '800', margin: 0, color: '#111' }}>10k+</h4>
                <p style={{ margin: 0, color: '#666', fontWeight: '500' }}>Happy Tenants</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Features Section */}
      <div id="features" style={{ padding: '80px 5%', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px', color: '#111', letterSpacing: '-1px' }}>Why Choose ApnaGhar?</h2>
          <p style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            We're revolutionizing how you find accommodations with a platform built entirely around your needs.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', maxWidth: '1400px', margin: '0 auto' }}>
          {[
            { icon: ShieldCheck, title: 'Verified Properties', desc: 'Every property is physically verified by our team ensuring 100% authentic photos and details.', color: 'rgba(0,166,153,0.1)' },
            { icon: MessageCircle, title: 'Direct WhatsApp Contact', desc: 'No middlemen. Chat directly with the property owner and finalize your deal instantly.', color: 'rgba(255,184,0,0.1)' },
            { icon: HomeIcon, title: 'Premium Stays', desc: 'From budget-friendly PGs to luxury apartments, find stays that match your exact lifestyle.', color: 'rgba(99,102,241,0.1)' }
          ].map((feat, i) => (
            <div key={i} className="organic-card" style={{ padding: '40px 24px', backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.03)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', backgroundColor: feat.color, zIndex: 0, opacity: 0.5 }}></div>
              <div style={{ width: '72px', height: '72px', borderRadius: '36px', backgroundColor: feat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', position: 'relative', zIndex: 1 }}>
                <feat.icon size={36} color="#111" />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px', color: '#111', position: 'relative', zIndex: 1 }}>{feat.title}</h3>
              <p style={{ fontSize: '16px', color: '#666', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div style={{ padding: '80px 5%', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px', color: '#111', letterSpacing: '-1px' }}>How It Works</h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { step: '1', icon: Search, title: 'Search & Filter', desc: 'Browse verified listings to find your match.' },
            { step: '2', icon: MessageCircle, title: 'Contact Directly', desc: 'Chat with the owner via WhatsApp.' },
            { step: '3', icon: Key, title: 'Move In', desc: 'Finalize and move in with zero brokerage.' }
          ].map((item, i) => (
            <div key={i} style={{ flex: '1 1 250px', textAlign: 'center', position: 'relative' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '40px 40px 40px 12px', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '32px', fontWeight: '800', boxShadow: '0 16px 32px rgba(0,166,153,0.2)' }}>
                {item.step}
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px', color: '#111' }}>{item.title}</h3>
              <p style={{ fontSize: '16px', color: '#666', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Cities */}
      <div style={{ padding: '80px 5%', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px', color: '#111', letterSpacing: '-1px' }}>Explore Popular Cities</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', maxWidth: '1400px', margin: '0 auto' }}>
          {[
            { name: 'New Delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80', count: '120+ Stays' },
            { name: 'Mumbai', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80', count: '150+ Stays' },
            { name: 'Bangalore', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80', count: '200+ Stays' },
            { name: 'Pune', image: 'https://images.unsplash.com/photo-1605553198889-1052692233ce?w=800&q=80', count: '90+ Stays' }
          ].map((city, i) => (
            <div key={i} onClick={() => navigate('/explore')} className="city-card" style={{ cursor: 'pointer', position: 'relative', height: '300px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
              <img src={city.image} alt={city.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 60%)' }} />
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', color: 'white' }}>
                <h3 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '4px' }}>{city.name}</h3>
                <p style={{ fontSize: '15px', opacity: 0.9, fontWeight: '500' }}>{city.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Properties Section */}
      <div id="properties" style={{ padding: '60px 5%', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '8px', color: '#111', letterSpacing: '-1px' }}>Featured Stays</h2>
              <p style={{ fontSize: '18px', color: '#666' }}>Handpicked properties just for you</p>
            </div>
            <button onClick={() => navigate('/explore')} style={{ color: 'var(--primary)', fontSize: '16px', fontWeight: '800', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              View All <ArrowRight size={16}/>
            </button>
          </div>
          
          <div className="properties-grid">
            {propertiesData.slice(0, 3).map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ padding: '80px 5%', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px', color: '#111', letterSpacing: '-1px' }}>What Our Users Say</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', maxWidth: '1400px', margin: '0 auto' }}>
          {[
            { name: 'Aarav Sharma', role: 'Software Engineer', text: 'I saved over ₹25,000 on brokerage fees! The direct WhatsApp feature made it so easy to negotiate with the owner.' },
            { name: 'Priya Desai', role: 'Student at DU', text: 'Finding a safe PG near my college was a nightmare until I used ApnaGhar. The verified photos gave me complete peace of mind.' },
            { name: 'Rohan Gupta', role: 'Marketing Executive', text: 'The user interface is incredibly smooth. I found a premium apartment in just two days. Highly recommended!' }
          ].map((testimonial, i) => (
            <div key={i} className="speech-bubble" style={{ padding: '32px', backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 20px 40px rgba(0,0,0,0.04)', position: 'relative' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', color: '#FFB800' }}>
                {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="currentColor" />)}
              </div>
              <p style={{ fontSize: '16px', color: '#333', lineHeight: 1.7, marginBottom: '24px', fontWeight: '500' }}>
                "{testimonial.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '24px', backgroundColor: 'rgba(0,166,153,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '18px' }}>
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#111', marginBottom: '2px' }}>{testimonial.name}</h4>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ padding: '60px 5% 100px', position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px', color: '#111', letterSpacing: '-1px' }}>Frequently Asked Questions</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { q: 'Is ApnaGhar really 100% free of brokerage?', a: 'Yes! We connect you directly with property owners, completely eliminating any middlemen or broker fees.' },
            { q: 'How do I know the property listings are genuine?', a: 'Our team physically visits and verifies properties. Look for the "Verified" badge on listings for complete peace of mind.' },
            { q: 'Can I chat with the owner before visiting?', a: 'Absolutely. We provide a direct WhatsApp link on every property page so you can clear your doubts instantly.' },
            { q: 'Are there any hidden charges?', a: 'No hidden charges at all. The platform is completely free to use for all tenants.' }
          ].map((faq, i) => (
            <details key={i} style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.03)', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
              <summary style={{ fontSize: '18px', fontWeight: '700', color: '#111', display: 'flex', justifyContent: 'space-between', alignItems: 'center', outline: 'none' }}>
                {faq.q}
              </summary>
              <p style={{ marginTop: '16px', fontSize: '16px', color: '#666', lineHeight: 1.6 }}>
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#111', color: 'white', padding: '60px 5% 40px', borderTopLeftRadius: '60px', borderTopRightRadius: '60px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
            <Logo size={40} />
            <span style={{ fontSize: '28px', fontWeight: '800', marginLeft: '12px' }}>ApnaGhar</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', maxWidth: '400px', lineHeight: 1.6, marginBottom: '40px' }}>
            Revolutionizing the way you find your perfect stay across India. Zero brokerage, 100% verified.
          </p>
          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
            <span style={{ color: 'rgba(255,255,255,0.8)', cursor: 'pointer', fontWeight: '600', fontSize: '16px' }}>Privacy Policy</span>
            <span style={{ color: 'rgba(255,255,255,0.8)', cursor: 'pointer', fontWeight: '600', fontSize: '16px' }}>Terms of Service</span>
            <span style={{ color: 'rgba(255,255,255,0.8)', cursor: 'pointer', fontWeight: '600', fontSize: '16px' }}>Contact Us</span>
          </div>
          <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: '32px' }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: 0 }}>© 2026 ApnaGhar. All rights reserved.</p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', margin: 0 }}>
              Developed by <a href="https://amit123103.github.io/SmartPortfolio/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>Amit</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
