import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search as SearchIcon, Bell, User } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import propertiesData from '../data/properties.json';
import categoriesData from '../data/categories.json';
import PropertyCard from '../components/PropertyCard';

import * as Icons from 'lucide-react';

const Home = () => {
  const { currentLocation } = useContext(AppContext);
  const navigate = useNavigate();

  const filteredProperties = propertiesData.filter(property => {
    if (!currentLocation || currentLocation === 'Unknown Location' || currentLocation === 'Your Location') return true;
    const locLower = currentLocation.toLowerCase();
    const cityLower = property.city.toLowerCase();
    return locLower.includes(cityLower) || cityLower.includes(locLower);
  });

  const displayProperties = filteredProperties.length > 0 ? filteredProperties : propertiesData;
  const noExactMatch = filteredProperties.length === 0 && currentLocation !== 'New Delhi, India' && currentLocation !== 'Unknown Location';

  return (
    <div style={{ padding: '20px', paddingBottom: '90px' }}>
      {/* Header */}
      <header className="mobile-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary)' }}>ApnaGhar</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>
            <MapPin size={14} />
            <span className="line-clamp-1" style={{ maxWidth: '200px' }}>{currentLocation}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ 
            width: '40px', height: '40px', borderRadius: '50%', 
            border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' 
          }}>
            <Bell size={20} color="var(--text-primary)" />
          </button>
          <button onClick={() => navigate('/profile')} style={{ 
            width: '40px', height: '40px', borderRadius: '50%', 
            backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' 
          }}>
            <User size={20} color="white" />
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div 
        onClick={() => navigate('/search')}
        style={{
          display: 'flex', alignItems: 'center', backgroundColor: 'var(--surface)',
          padding: '14px 16px', borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)',
          marginBottom: '24px', cursor: 'pointer'
        }}
      >
        <SearchIcon size={20} color="var(--text-secondary)" style={{ marginRight: '12px' }} />
        <span style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Search "PG in {currentLocation.split(',')[0]}"</span>
      </div>

      {/* Banner */}
      <div style={{
        backgroundColor: 'var(--primary)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        color: 'white',
        marginBottom: '32px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', maxWidth: '70%' }}>
            Find Affordable PGs & Hostels
          </h2>
          <p style={{ opacity: 0.9, fontSize: '14px', marginBottom: '16px' }}>Zero Brokerage. Verified Properties.</p>
          <button style={{
            backgroundColor: 'white', color: 'var(--primary)',
            padding: '8px 16px', borderRadius: 'var(--radius-full)',
            fontWeight: '600', fontSize: '13px'
          }}>Explore Now</button>
        </div>
        {/* Decorative circle */}
        <div style={{
          position: 'absolute', right: '-20px', top: '-20px',
          width: '120px', height: '120px', borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.1)', zIndex: 1
        }} />
      </div>

      {/* Categories */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Categories</h3>
        <div className="hide-scrollbar" style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
          {categoriesData.map(cat => {
            const Icon = Icons[cat.icon] || Icons.Home;
            return (
              <div key={cat.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minWidth: '72px' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px',
                  backgroundColor: 'rgba(0,166,153,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(0,166,153,0.1)'
                }}>
                  <Icon size={24} color="var(--primary)" />
                </div>
                <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--text-secondary)' }}>{cat.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nearby Properties */}
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Nearby Properties</h3>
            <span style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: '600' }}>See All</span>
          </div>
          {noExactMatch && (
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              No stays found directly in your area. Showing featured properties instead.
            </span>
          )}
        </div>
        <div className="properties-grid">
          {displayProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
