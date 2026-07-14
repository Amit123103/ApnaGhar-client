import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Heart, User } from 'lucide-react';

const BottomNavigation = () => {
  const navStyle = {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '70px',
    backgroundColor: 'var(--surface)',
    borderTop: '1px solid var(--border)',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 1000,
    boxShadow: 'var(--shadow-lg)'
  };

  const itemStyle = (isActive) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
    fontWeight: isActive ? '600' : '400',
    fontSize: '12px',
    gap: '4px',
    transition: 'color 0.2s'
  });

  return (
    <nav className="bottom-nav" style={navStyle}>
      <NavLink to="/explore" style={({ isActive }) => itemStyle(isActive)}>
        {({ isActive }) => (
          <>
            <Home size={24} color={isActive ? 'var(--primary)' : 'var(--text-secondary)'} />
            <span>Home</span>
          </>
        )}
      </NavLink>
      <NavLink to="/search" style={({ isActive }) => itemStyle(isActive)}>
        {({ isActive }) => (
          <>
            <Search size={24} color={isActive ? 'var(--primary)' : 'var(--text-secondary)'} />
            <span>Search</span>
          </>
        )}
      </NavLink>
      <NavLink to="/favourites" style={({ isActive }) => itemStyle(isActive)}>
        {({ isActive }) => (
          <>
            <Heart size={24} color={isActive ? 'var(--primary)' : 'var(--text-secondary)'} />
            <span>Saved</span>
          </>
        )}
      </NavLink>
      <NavLink to="/profile" style={({ isActive }) => itemStyle(isActive)}>
        {({ isActive }) => (
          <>
            <User size={24} color={isActive ? 'var(--primary)' : 'var(--text-secondary)'} />
            <span>Profile</span>
          </>
        )}
      </NavLink>
    </nav>
  );
};

export default BottomNavigation;
