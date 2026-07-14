import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, MapPin } from 'lucide-react';
import { FavouritesContext } from '../context/FavouritesContext';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const { isFavourite, toggleFavourite } = useContext(FavouritesContext);
  const fav = isFavourite(property.id);

  const cardStyle = {
    backgroundColor: 'var(--surface)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-sm)',
    marginBottom: '20px',
    cursor: 'pointer',
    position: 'relative',
    border: '1px solid var(--border)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  const imageStyle = {
    width: '100%',
    height: '220px',
    objectFit: 'cover'
  };

  const contentStyle = {
    padding: '16px'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '4px'
  };

  const badgeStyle = {
    position: 'absolute',
    top: '12px',
    left: '12px',
    backgroundColor: 'rgba(255,255,255,0.9)',
    color: 'var(--text-primary)',
    padding: '4px 10px',
    borderRadius: 'var(--radius-full)',
    fontSize: '12px',
    fontWeight: '600',
    backdropFilter: 'blur(4px)'
  };

  const favBtnStyle = {
    position: 'absolute',
    top: '12px',
    right: '12px',
    backgroundColor: fav ? 'var(--surface)' : 'rgba(0,0,0,0.3)',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none'
  };

  const handleFav = (e) => {
    e.stopPropagation();
    toggleFavourite(property.id);
  };

  return (
    <div style={cardStyle} onClick={() => navigate(`/property/${property.id}`)} className="animate-slide-up">
      <div style={{ position: 'relative' }}>
        <img src={property.coverImage} alt={property.name} style={imageStyle} />
        {property.verified && (
          <div style={badgeStyle}>✓ Verified {property.type}</div>
        )}
        <button style={favBtnStyle} onClick={handleFav}>
          <Heart size={20} fill={fav ? 'var(--secondary)' : 'none'} color={fav ? 'var(--secondary)' : '#fff'} />
        </button>
      </div>
      <div style={contentStyle}>
        <div style={headerStyle}>
          <div style={{ flex: 1 }}>
            <h3 style={titleStyle} className="line-clamp-1">{property.name}</h3>
            <p style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <MapPin size={14} /> {property.city} • {property.distance}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star size={16} fill="#FFB020" color="#FFB020" />
            <span style={{ fontWeight: '600', fontSize: '14px' }}>{property.rating}</span>
          </div>
        </div>
        <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>
              ₹{property.startingRent || property.dailyRent}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              {property.startingRent ? '/month' : '/day'}
            </span>
          </div>
          <div style={{ fontSize: '12px', fontWeight: '500', color: 'var(--primary)', backgroundColor: 'rgba(0,166,153,0.1)', padding: '6px 12px', borderRadius: 'var(--radius-sm)' }}>
            {property.gender}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
