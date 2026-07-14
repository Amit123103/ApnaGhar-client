import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, MessageCircle, Home as HomeIcon, Star, CheckCircle2 } from 'lucide-react';
import propertiesData from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';
import { AuthContext } from '../context/AuthContext';
import Logo from '../components/Logo';

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Hero Section */}
      <div style={{
        position: 'relative',
        height: '80vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5%',
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%), url(https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white'
      }}>
        <div className="animate-slide-up" style={{ maxWidth: '600px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <span style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '6px 12px', borderRadius: 'var(--radius-full)', fontSize: '14px', fontWeight: '600', letterSpacing: '1px' }}>
              NO BROKERAGE
            </span>
          </div>
          <h1 style={{ fontSize: '56px', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-1px' }}>
            Find Your Perfect Stay. <span style={{ color: 'var(--primary)' }}>Zero Hassle.</span>
          </h1>
          <p style={{ fontSize: '20px', opacity: 0.9, marginBottom: '40px', lineHeight: '1.6' }}>
            Discover verified PGs, Hostels, and Premium Apartments in your city. Connect directly with owners via WhatsApp and save on brokerage.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button onClick={() => navigate(isAuthenticated ? '/explore' : '/login')} style={{
              backgroundColor: 'var(--primary)', color: 'white', padding: '16px 32px',
              borderRadius: 'var(--radius-lg)', fontSize: '18px', fontWeight: '700',
              border: 'none', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 8px 24px rgba(0,166,153,0.4)'
            }}>
              {isAuthenticated ? 'Go to Dashboard' : 'Login / Sign Up'}
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '80px 5%', backgroundColor: 'var(--surface)' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px', color: 'var(--text-primary)' }}>Why Choose ApnaGhar?</h2>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            We're revolutionizing how you find accommodations. No hidden fees, no fake photos, just genuine homes.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {[
            { icon: ShieldCheck, title: 'Verified Properties', desc: 'Every property is physically verified by our team ensuring 100% authentic photos and details.' },
            { icon: MessageCircle, title: 'Direct WhatsApp Contact', desc: 'No middlemen. Chat directly with the property owner and finalize your deal instantly.' },
            { icon: HomeIcon, title: 'Premium Stays', desc: 'From budget-friendly PGs to luxury apartments, find stays that match your exact lifestyle.' }
          ].map((feat, i) => (
            <div key={i} style={{ padding: '32px', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '40px', backgroundColor: 'rgba(0,166,153,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <feat.icon size={40} color="var(--primary)" />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>{feat.title}</h3>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Properties Section */}
      <div style={{ padding: '80px 5%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>Featured Stays</h2>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>Handpicked properties just for you</p>
          </div>
          <button onClick={() => navigate('/explore')} style={{ color: 'var(--primary)', fontSize: '16px', fontWeight: '700', background: 'none', border: 'none', cursor: 'pointer' }}>
            View All →
          </button>
        </div>
        
        <div className="properties-grid">
          {propertiesData.slice(0, 3).map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>

      {/* Trust Section */}
      <div style={{ padding: '80px 5%', backgroundColor: 'var(--primary)', color: 'white', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '24px' }}>Trusted by 10,000+ Students & Professionals</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '20px', fontWeight: '600' }}><CheckCircle2 size={28} /> 500+ Properties</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '20px', fontWeight: '600' }}><Star size={28} /> 4.8/5 Avg Rating</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '20px', fontWeight: '600' }}><ShieldCheck size={28} /> ₹0 Brokerage</div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1A1A1A', color: 'white', padding: '60px 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
            <Logo size={40} />
            <span style={{ fontSize: '28px', fontWeight: '800', marginLeft: '12px' }}>ApnaGhar</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>© 2026 ApnaGhar. All rights reserved.</p>
        </div>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '24px' }}>
          <span style={{ color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: '500' }}>Privacy Policy</span>
          <span style={{ color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: '500' }}>Terms of Service</span>
          <span style={{ color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: '500' }}>Contact Us</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
