import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, Heart, User, MapPin, LogIn, UserPlus } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { AuthContext } from '../context/AuthContext';
import Logo from './Logo';

const TopNavigation = () => {
  const navigate = useNavigate();
  const { currentLocation } = useContext(AppContext);
  const { isAuthenticated } = useContext(AuthContext);

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '70px',
    backgroundColor: 'var(--surface)',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 40px',
    zIndex: 1000,
    boxShadow: 'var(--shadow-sm)'
  };

  const linkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
    fontWeight: isActive ? '600' : '500',
    fontSize: '15px',
    padding: '8px 16px',
    borderRadius: 'var(--radius-md)',
    transition: 'all 0.2s',
    backgroundColor: isActive ? 'rgba(0,166,153,0.1)' : 'transparent'
  });

  const authBtnStyle = (primary = false) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: 'var(--radius-full)',
    fontWeight: '700',
    fontSize: '15px',
    cursor: 'pointer',
    border: primary ? 'none' : '1px solid var(--border)',
    backgroundColor: primary ? 'var(--primary)' : 'transparent',
    color: primary ? 'white' : 'var(--text-primary)',
    transition: 'all 0.2s',
    textDecoration: 'none'
  });

  return (
    <nav className="top-nav" style={navStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <Logo size={32} />
          <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)', marginLeft: '12px' }}>ApnaGhar</span>
        </div>
        
        {isAuthenticated && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '14px' }}>
            <MapPin size={16} />
            <span>{currentLocation}</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {isAuthenticated ? (
          <>
            <NavLink to="/explore" style={linkStyle}>
              <Search size={20} />
              <span>Explore</span>
            </NavLink>
            <NavLink to="/search" style={linkStyle}>
              <Search size={20} />
              <span>Search</span>
            </NavLink>
            <NavLink to="/favourites" style={linkStyle}>
              <Heart size={20} />
              <span>Saved</span>
            </NavLink>
            <NavLink to="/profile" style={linkStyle}>
              <User size={20} />
              <span>Profile</span>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login" style={() => authBtnStyle(false)}>
              <LogIn size={18} />
              Log In
            </NavLink>
            <NavLink to="/signup" style={() => authBtnStyle(true)}>
              <UserPlus size={18} />
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default TopNavigation;
