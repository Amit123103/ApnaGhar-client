import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Loader } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const LocationPermission = () => {
  const { grantLocation } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGrantLocation = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      await grantLocation();
      navigate('/explore');
    } catch (error) {
      setErrorMsg('Failed to get location. Please allow location permissions in your browser.');
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/explore');
  };

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
          {isLoading ? (
            <Loader size={48} color="var(--primary)" className="animate-spin" />
          ) : (
            <MapPin size={48} color="var(--primary)" />
          )}
        </div>
        
        <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px' }}>
          {isLoading ? 'Finding your location...' : 'Allow Location Access'}
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '24px' }}>
          We need your location to show you the best properties, PGs, and hotels nearby.
        </p>
        
        {errorMsg && (
          <p style={{ color: 'var(--secondary)', fontSize: '14px', marginBottom: '24px', padding: '0 16px' }}>
            {errorMsg}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '24px' }}>
        <button 
          onClick={handleGrantLocation}
          disabled={isLoading}
          style={{
            backgroundColor: isLoading ? 'var(--text-secondary)' : 'var(--primary)',
            color: 'white',
            padding: '16px',
            borderRadius: 'var(--radius-lg)',
            fontSize: '16px',
            fontWeight: '600',
            boxShadow: 'var(--shadow-md)',
            border: 'none',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Detecting...' : 'Allow Location'}
        </button>
        <button 
          onClick={handleSkip}
          disabled={isLoading}
          style={{
            backgroundColor: 'transparent',
            color: 'var(--text-secondary)',
            padding: '16px',
            borderRadius: 'var(--radius-lg)',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default LocationPermission;
