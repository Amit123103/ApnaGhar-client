import React, { useState } from 'react';
import { Search as SearchIcon, Filter, X } from 'lucide-react';
import propertiesData from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';

const Search = () => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProperties = propertiesData.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.city.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: '24px', paddingBottom: '90px', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px' }}>Search</h2>
      
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', backgroundColor: 'var(--surface)',
          padding: '12px 16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)'
        }}>
          <SearchIcon size={20} color="var(--text-secondary)" style={{ marginRight: '12px' }} />
          <input 
            type="text" 
            placeholder="Search by city, area, or name..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '15px', color: 'var(--text-primary)' }}
          />
          {query && <X size={20} color="var(--text-secondary)" style={{ cursor: 'pointer' }} onClick={() => setQuery('')} />}
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          style={{
            backgroundColor: showFilters ? 'var(--primary)' : 'var(--surface)',
            color: showFilters ? 'white' : 'var(--text-primary)',
            border: `1px solid ${showFilters ? 'var(--primary)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-lg)', padding: '0 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <Filter size={20} />
        </button>
      </div>

      {showFilters && (
        <div className="animate-slide-up" style={{
          backgroundColor: 'var(--surface)', padding: '16px', borderRadius: 'var(--radius-lg)',
          marginBottom: '24px', border: '1px solid var(--border)'
        }}>
          <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>Filters</h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['Boys PG', 'Girls PG', 'Family', 'AC', 'Food', 'WiFi', '< ₹10000'].map(f => (
              <span key={f} style={{
                padding: '6px 12px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)',
                fontSize: '13px', color: 'var(--text-secondary)'
              }}>
                {f}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          {filteredProperties.length} results found
        </p>
        <div className="properties-grid">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
