import React, { useContext, useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, MapPin } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import propertiesData from '../data/properties.json';
import PropertyCard from './PropertyCard';

const SearchOverlay = () => {
  const { isSearchOpen, setIsSearchOpen, currentLocation } = useContext(AppContext);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProperties = query.trim() !== '' 
    ? propertiesData.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.city.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleClose = () => {
    setIsSearchOpen(false);
    setQuery('');
  };

  const handlePropertyClick = (id) => {
    setIsSearchOpen(false);
    navigate(`/property/${id}`);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'var(--background)', zIndex: 9999, overflowY: 'auto'
    }}>
      {/* Search Header */}
      <div style={{
        position: 'sticky', top: 0, backgroundColor: 'var(--surface)', padding: '16px',
        borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px',
        zIndex: 10
      }}>
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', backgroundColor: 'var(--background)',
          padding: '12px 16px', borderRadius: 'var(--radius-full)', border: '1px solid var(--primary)'
        }}>
          <SearchIcon size={20} color="var(--primary)" style={{ marginRight: '12px' }} />
          <input 
            ref={inputRef}
            type="text" 
            placeholder={`Search "PG in ${currentLocation.split(',')[0] || 'New Delhi'}"`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '15px', color: 'var(--text-primary)' }}
          />
          {query && <X size={20} color="var(--text-secondary)" style={{ cursor: 'pointer' }} onClick={() => setQuery('')} />}
        </div>
        <button 
          onClick={handleClose}
          style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}
        >
          Cancel
        </button>
      </div>

      {/* Search Results */}
      <div style={{ padding: '24px' }}>
        {query.trim() === '' ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '40px' }}>
            <SearchIcon size={48} opacity={0.2} style={{ marginBottom: '16px' }} />
            <p>Start typing to search for properties, PGs, or areas...</p>
          </div>
        ) : filteredProperties.length > 0 ? (
          <div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              {filteredProperties.length} results found
            </p>
            <div className="properties-grid">
              {filteredProperties.map(property => (
                <div key={property.id} onClick={() => handlePropertyClick(property.id)}>
                   {/* Wrapping PropertyCard inside a click handler to close modal on select */}
                   <div style={{ pointerEvents: 'none' }}>
                     <PropertyCard property={property} />
                   </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '40px' }}>
            <MapPin size={48} opacity={0.2} style={{ marginBottom: '16px' }} />
            <p>No properties found matching "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
