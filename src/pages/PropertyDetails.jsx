import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Heart, Star, MapPin, CheckCircle2, MessageCircle } from 'lucide-react';
import propertiesData from '../data/properties.json';
import { FavouritesContext } from '../context/FavouritesContext';
import * as Icons from 'lucide-react';

const iconMap = {
  WiFi: 'Wifi',
  Parking: 'Car',
  Laundry: 'WashingMachine', // Not in lucid-react by default, will fallback or use 'Waves'
  Food: 'Utensils',
  'Power Backup': 'Zap',
  CCTV: 'Video',
  Kitchen: 'ChefHat',
  Bathroom: 'Bath',
  Security: 'ShieldCheck',
  Lift: 'ChevronsUp',
  AC: 'Wind'
};

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavourite, toggleFavourite } = React.useContext(FavouritesContext);
  
  const property = propertiesData.find(p => p.id === id);
  if (!property) return <div>Property not found</div>;

  const fav = isFavourite(property.id);

  const handleWhatsApp = () => {
    const text = `Hi, I am interested in ${property.name} listed on ApnaGhar. Please share more details.`;
    window.open(`https://wa.me/91${property.owner.phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingBottom: '90px' }}>
      {/* Image Gallery Header */}
      <div style={{ position: 'relative', height: '350px', backgroundColor: '#000' }}>
        <img src={property.coverImage} alt={property.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
        
        {/* Top bar */}
        <div style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, padding: '20px', 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
        }}>
          <button onClick={() => navigate(-1)} style={{
            width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <ChevronLeft size={24} color="#000" />
          </button>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{
              width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Share2 size={20} color="#000" />
            </button>
            <button onClick={() => toggleFavourite(property.id)} style={{
              width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Heart size={20} fill={fav ? 'var(--secondary)' : 'none'} color={fav ? 'var(--secondary)' : '#000'} />
            </button>
          </div>
        </div>

        {/* Image count */}
        <div style={{
          position: 'absolute', bottom: '20px', right: '20px',
          backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', padding: '6px 12px',
          borderRadius: 'var(--radius-lg)', fontSize: '13px', fontWeight: '600', backdropFilter: 'blur(4px)'
        }}>
          1 / {property.images.length}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        backgroundColor: 'var(--surface)', borderTopLeftRadius: '24px', borderTopRightRadius: '24px',
        marginTop: '-24px', position: 'relative', padding: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div style={{ flex: 1, paddingRight: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ backgroundColor: 'rgba(0,166,153,0.1)', color: 'var(--primary)', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                {property.type}
              </span>
              {property.verified && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#00877A', fontSize: '12px', fontWeight: '600' }}>
                  <CheckCircle2 size={14} /> Verified
                </span>
              )}
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', lineHeight: 1.2, marginBottom: '8px' }}>{property.name}</h1>
            <p style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '14px' }}>
              <MapPin size={16} /> {property.address}
            </p>
          </div>
        </div>

        {/* Rating and Price Box */}
        <div style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
          padding: '16px', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-lg)',
          marginBottom: '24px', border: '1px solid var(--border)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Star size={20} fill="#FFB020" color="#FFB020" />
              <span style={{ fontWeight: '700', fontSize: '16px' }}>{property.rating}</span>
            </div>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{property.reviews} reviews</span>
          </div>
          <div style={{ width: '1px', height: '40px', backgroundColor: 'var(--border)' }} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)' }}>
              ₹{property.startingRent || property.dailyRent}
            </div>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {property.startingRent ? 'Starting rent / month' : 'Per day'}
            </span>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>About Property</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6 }}>
            {property.description}
          </p>
        </div>

        {/* Amenities */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Amenities</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {property.amenities.map((amenity, i) => {
              const IconName = iconMap[amenity] || 'CheckCircle2';
              const IconComponent = Icons[IconName] || Icons.CheckCircle2;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <IconComponent size={20} color="var(--primary)" />
                  <span style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: '500' }}>{amenity}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rules */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>Rules</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6 }}>
            {property.rules.map((rule, i) => (
              <li key={i} style={{ marginBottom: '8px' }}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Floating Contact Button */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, padding: '16px 24px',
        backgroundColor: 'var(--surface)', borderTop: '1px solid var(--border)',
        boxShadow: 'var(--shadow-lg)', zIndex: 100, display: 'flex', justifyContent: 'center'
      }}>
        <button 
          onClick={handleWhatsApp}
          style={{
            maxWidth: '1200px',
            width: '100%',
            backgroundColor: '#25D366', color: 'white',
            padding: '16px', borderRadius: 'var(--radius-lg)',
            fontSize: '16px', fontWeight: '700',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
            boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
          }}
        >
          <MessageCircle size={24} /> Contact on WhatsApp
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;
