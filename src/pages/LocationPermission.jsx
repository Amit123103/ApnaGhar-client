import React, { useContext } from 'react';
import { MapPin } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const LocationPermission = () => {
  const { grantLocation } = useContext(AppContext);

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      padding: '24px',
      backgroundColor: 'var(--surface)'
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50px',
          backgroundColor: 'rgba(0,166,153,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '32px'
        }}>
          <MapPin size={48} color="var(--primary)" />
        </div>
        
        <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px' }}>
          Allow Location Access
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '40px' }}>
          We need your location to show you the best properties, PGs, and hotels nearby.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '24px' }}>
        <button 
          onClick={grantLocation}
          style={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            padding: '16px',
            borderRadius: 'var(--radius-lg)',
            fontSize: '16px',
            fontWeight: '600',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          Allow Location
        </button>
        <button 
          onClick={grantLocation}
          style={{
            backgroundColor: 'transparent',
            color: 'var(--text-secondary)',
            padding: '16px',
            borderRadius: 'var(--radius-lg)',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default LocationPermission;
