import React, { useContext } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, User, MapPin, LogIn, UserPlus } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { AuthContext } from '../context/AuthContext';
import Logo from './Logo';

const TopNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentLocation, setIsSearchOpen } = useContext(AppContext);
  const { isAuthenticated } = useContext(AuthContext);


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


  return (
    <nav className={`top-nav ${location.pathname === '/' ? 'force-mobile' : ''}`}>
      {/* Left: Logo & Location */}
      <div className="top-nav-left">
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate(isAuthenticated ? '/explore' : '/')}>
          <Logo size={28} />
          <span className="logo-text">ApnaGhar</span>
        </div>
        
        {isAuthenticated && (
          <div className="location-display">
            <MapPin size={16} />
            <span className="line-clamp-1">{currentLocation}</span>
          </div>
        )}
      </div>

      {/* Center: Anchor Links */}
      <div className="top-nav-center">
        {!isAuthenticated && location.pathname === '/' && (
          <>
            <a href="#features" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }}>Features</a>
            <a href="#properties" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }}>Properties</a>
          </>
        )}
      </div>

      {/* Right: Actions / Auth */}
      <div className="top-nav-right">
        {isAuthenticated ? (
          <>
            <NavLink to="/explore" style={linkStyle}>
              <Search size={20} />
              <span>Explore</span>
            </NavLink>
            <button onClick={() => setIsSearchOpen(true)} style={{ ...linkStyle({ isActive: false }), border: 'none', background: 'none', cursor: 'pointer' }}>
              <Search size={20} />
              <span>Search</span>
            </button>
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
            <NavLink to="/login" className="auth-btn auth-btn-outline">
              <LogIn size={16} className="auth-btn-icon" />
              <span>Log In</span>
            </NavLink>
            <NavLink to="/signup" className="auth-btn auth-btn-primary">
              <UserPlus size={16} className="auth-btn-icon" />
              <span>Sign Up</span>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default TopNavigation;
