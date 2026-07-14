import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Moon, Sun, Settings, Bell, CircleHelp, Shield, LogOut, ChevronRight } from 'lucide-react';

const Profile = () => {
  const { theme, toggleTheme } = useContext(AppContext);

  const menuItems = [
    { icon: Settings, label: 'Account Settings' },
    { icon: Bell, label: 'Notifications' },
    { icon: CircleHelp, label: 'Help & Support' },
    { icon: Shield, label: 'Privacy Policy' },
  ];

  return (
    <div style={{ padding: '24px', paddingBottom: '90px', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '24px' }}>Profile</h2>
      
      {/* Profile Header */}
      <div style={{ 
        display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', 
        backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)', 
        border: '1px solid var(--border)', marginBottom: '32px'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80" 
          alt="Profile" 
          style={{ width: '70px', height: '70px', borderRadius: '35px', objectFit: 'cover' }}
        />
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)' }}>Rahul Sharma</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>rahul.sharma@example.com</p>
        </div>
      </div>

      {/* Settings Options */}
      <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden', marginBottom: '24px' }}>
        
        {/* Dark Mode Toggle */}
        <div style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
          padding: '16px 20px', borderBottom: '1px solid var(--border)' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {theme === 'light' ? <Sun size={22} color="var(--primary)" /> : <Moon size={22} color="var(--primary)" />}
            <span style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)' }}>Dark Mode</span>
          </div>
          <button 
            onClick={toggleTheme}
            style={{
              width: '44px', height: '24px', borderRadius: '12px',
              backgroundColor: theme === 'dark' ? 'var(--primary)' : '#e0e0e0',
              position: 'relative', transition: 'background-color 0.3s'
            }}
          >
            <div style={{
              width: '20px', height: '20px', borderRadius: '10px', backgroundColor: 'white',
              position: 'absolute', top: '2px', left: theme === 'dark' ? '22px' : '2px',
              transition: 'left 0.3s'
            }} />
          </button>
        </div>

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <div 
            key={index}
            style={{ 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
              padding: '16px 20px', borderBottom: index !== menuItems.length - 1 ? '1px solid var(--border)' : 'none',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <item.icon size={22} color="var(--text-secondary)" />
              <span style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)' }}>{item.label}</span>
            </div>
            <ChevronRight size={20} color="var(--text-secondary)" />
          </div>
        ))}
      </div>

      {/* Logout */}
      <button style={{ 
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
        padding: '16px', backgroundColor: 'rgba(255, 90, 95, 0.1)', color: 'var(--secondary)',
        borderRadius: 'var(--radius-lg)', fontSize: '16px', fontWeight: '600'
      }}>
        <LogOut size={20} /> Logout
      </button>

      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: 'var(--text-secondary)' }}>
        App Version 1.0.0
      </p>
    </div>
  );
};

export default Profile;
