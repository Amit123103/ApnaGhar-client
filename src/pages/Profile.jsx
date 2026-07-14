import React, { useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase';
import { updateProfile } from 'firebase/auth';
import { Moon, Sun, Settings, Bell, CircleHelp, Shield, LogOut, ChevronRight, ChevronLeft, Camera, User as UserIcon } from 'lucide-react';

const Profile = () => {
  const { theme, toggleTheme } = useContext(AppContext);
  const { currentUser, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [activeScreen, setActiveScreen] = useState('main'); // main, edit, account, notifications, help, privacy
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Edit Profile States
  const [editName, setEditName] = useState(currentUser?.displayName || '');
  const [editPhoto, setEditPhoto] = useState(currentUser?.photoURL || '');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = async () => {
    setIsLoading(true);
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: editName,
          photoURL: editPhoto
        });
        // Force refresh by reloading window or context (for simplicity, we'll just go back and rely on auth state)
        window.location.reload(); 
      }
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile. " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderHeader = (title) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
      <button onClick={() => setActiveScreen('main')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', marginRight: '8px' }}>
        <ChevronLeft size={24} color="var(--text-primary)" />
      </button>
      <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>{title}</h2>
    </div>
  );

  // --- Sub Screens ---

  if (activeScreen === 'edit' || activeScreen === 'account') {
    return (
      <div style={{ padding: '24px', paddingBottom: '90px', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
        {renderHeader('Edit Profile & Account')}
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ position: 'relative', width: '100px', height: '100px', marginBottom: '16px' }}>
            {editPhoto ? (
              <img src={editPhoto} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50px', objectFit: 'cover', border: '2px solid var(--primary)' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', borderRadius: '50px', backgroundColor: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--primary)' }}>
                <UserIcon size={40} color="var(--text-secondary)" />
              </div>
            )}
            <button 
              onClick={() => fileInputRef.current.click()}
              style={{ position: 'absolute', bottom: 0, right: 0, width: '32px', height: '32px', borderRadius: '16px', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--background)', cursor: 'pointer' }}
            >
              <Camera size={16} />
            </button>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} />
          </div>
          <button onClick={() => setEditPhoto('')} style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Remove Image</button>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px' }}>Display Name</label>
          <input 
            type="text" 
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            style={{ width: '100%', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-primary)', fontSize: '16px' }} 
          />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px' }}>Email Address</label>
          <input 
            type="email" 
            value={currentUser?.email || ''}
            disabled
            style={{ width: '100%', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-secondary)', fontSize: '16px', opacity: 0.7 }} 
          />
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>Email cannot be changed.</p>
        </div>

        <button onClick={saveProfile} disabled={isLoading} style={{ width: '100%', padding: '16px', backgroundColor: 'var(--primary)', color: 'white', borderRadius: 'var(--radius-md)', fontSize: '16px', fontWeight: '700', border: 'none', cursor: 'pointer' }}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    );
  }

  if (activeScreen === 'notifications') {
    return (
      <div style={{ padding: '24px', paddingBottom: '90px', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
        {renderHeader('Notifications')}
        <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>Email Alerts</h4>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Receive property updates via email.</p>
            </div>
            <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>Push Notifications</h4>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Receive alerts on your device.</p>
            </div>
            <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px' }} />
          </div>
        </div>
      </div>
    );
  }

  if (activeScreen === 'help') {
    return (
      <div style={{ padding: '24px', paddingBottom: '90px', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
        {renderHeader('Help & Support')}
        <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: '20px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '16px', color: 'var(--primary)' }}>Frequently Asked Questions</h3>
          <h4 style={{ marginBottom: '4px' }}>How do I contact an owner?</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>Click the WhatsApp or Call button on any property detail page.</p>
          
          <h4 style={{ marginBottom: '4px' }}>Are there really no brokerages?</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>Yes! We connect you directly with owners.</p>

          <button style={{ width: '100%', padding: '14px', backgroundColor: 'var(--primary)', color: 'white', borderRadius: 'var(--radius-md)', border: 'none', fontWeight: 'bold' }}>Contact Support</button>
        </div>
      </div>
    );
  }

  if (activeScreen === 'privacy') {
    return (
      <div style={{ padding: '24px', paddingBottom: '90px', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
        {renderHeader('Privacy Policy')}
        <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
          <p><strong>1. Data Collection:</strong> We collect your name, email, and location data solely to provide you with the best property matches.</p>
          <p><strong>2. Security:</strong> Your data is secured using industry-standard Firebase Authentication.</p>
          <p><strong>3. Third Parties:</strong> We do not sell your personal data to any third-party brokers.</p>
        </div>
      </div>
    );
  }


  // --- Main Profile Screen ---

  const menuItems = [
    { icon: Settings, label: 'Account Settings', action: () => setActiveScreen('account') },
    { icon: Bell, label: 'Notifications', action: () => setActiveScreen('notifications') },
    { icon: CircleHelp, label: 'Help & Support', action: () => setActiveScreen('help') },
    { icon: Shield, label: 'Privacy Policy', action: () => setActiveScreen('privacy') },
  ];

  return (
    <div style={{ padding: '24px', paddingBottom: '90px', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '24px' }}>Profile</h2>
      
      {/* Profile Header */}
      <div 
        onClick={() => setActiveScreen('edit')}
        style={{ 
          display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', 
          backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)', 
          border: '1px solid var(--border)', marginBottom: '32px', cursor: 'pointer',
          position: 'relative'
        }}
      >
        {currentUser?.photoURL ? (
          <img 
            src={currentUser.photoURL} 
            alt="Profile" 
            style={{ width: '70px', height: '70px', borderRadius: '35px', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ width: '70px', height: '70px', borderRadius: '35px', backgroundColor: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserIcon size={32} color="var(--text-secondary)" />
          </div>
        )}
        
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
            {currentUser?.displayName || 'ApnaGhar User'}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            {currentUser?.email || 'Not logged in'}
          </p>
        </div>
        <ChevronRight size={20} color="var(--text-secondary)" />
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
              position: 'relative', transition: 'background-color 0.3s', border: 'none', cursor: 'pointer'
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
            onClick={item.action}
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
      {isAuthenticated && (
        <button onClick={handleLogout} style={{ 
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
          padding: '16px', backgroundColor: 'rgba(255, 90, 95, 0.1)', color: 'var(--secondary)',
          borderRadius: 'var(--radius-lg)', fontSize: '16px', fontWeight: '600', border: 'none', cursor: 'pointer'
        }}>
          <LogOut size={20} /> Logout
        </button>
      )}

      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: 'var(--text-secondary)' }}>
        App Version 1.0.0
      </p>
    </div>
  );
};

export default Profile;
