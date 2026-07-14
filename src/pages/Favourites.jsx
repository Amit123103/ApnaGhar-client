import React, { useContext } from 'react';
import { Heart } from 'lucide-react';
import { FavouritesContext } from '../context/FavouritesContext';
import propertiesData from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';

const Favourites = () => {
  const { favourites } = useContext(FavouritesContext);
  
  const savedProperties = propertiesData.filter(p => favourites.includes(p.id));

  return (
    <div style={{ padding: '24px', paddingBottom: '90px', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px' }}>Saved Properties</h2>
      
      {savedProperties.length > 0 ? (
        <div className="properties-grid">
          {savedProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div style={{ 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
          height: '60vh', textAlign: 'center' 
        }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '40px', backgroundColor: 'rgba(255,90,95,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px'
          }}>
            <Heart size={40} color="var(--secondary)" />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>No Saved Properties</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            Tap the heart icon on any property to save it here for later.
          </p>
        </div>
      )}
    </div>
  );
};

export default Favourites;
