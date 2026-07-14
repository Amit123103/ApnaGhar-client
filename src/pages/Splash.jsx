import React from 'react';
import { Home } from 'lucide-react';

const Splash = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'var(--primary)',
      color: '#ffffff'
    }}>
      <div className="animate-slide-up" style={{ textAlign: 'center' }}>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '24px',
          padding: '20px',
          display: 'inline-block',
          marginBottom: '24px',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <Home size={64} color="var(--primary)" />
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.5px' }}>ApnaGhar</h1>
        <p style={{ fontSize: '16px', opacity: 0.9, fontWeight: '500' }}>Find Your Perfect Stay Nearby</p>
      </div>
    </div>
  );
};

export default Splash;
