import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ChevronLeft, Smartphone } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // Simulate successful signup and auto login
    login();
    navigate('/explore');
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 16px 16px 48px',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--background)',
    fontSize: '15px',
    color: 'var(--text-primary)',
    outline: 'none'
  };

  const iconStyle = {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-secondary)'
  };

  const socialBtnStyle = {
    flex: 1,
    padding: '14px',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--surface)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    fontWeight: '600'
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--surface)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
      <button onClick={() => navigate(-1)} style={{ alignSelf: 'flex-start', padding: '8px 0', marginBottom: '32px' }}>
        <ChevronLeft size={28} color="var(--text-primary)" />
      </button>

      <div className="animate-slide-up" style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '400px', width: '100%', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Create Account</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Sign up to get started with ApnaGhar</p>

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <User size={20} style={iconStyle} />
            <input 
              type="text" 
              placeholder="Full Name" 
              style={inputStyle} 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Mail size={20} style={iconStyle} />
            <input 
              type="email" 
              placeholder="Email Address" 
              style={inputStyle} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div style={{ position: 'relative' }}>
            <Lock size={20} style={iconStyle} />
            <input 
              type="password" 
              placeholder="Password" 
              style={inputStyle} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            style={{
              backgroundColor: 'var(--primary)', color: 'white', padding: '16px',
              borderRadius: 'var(--radius-lg)', fontSize: '16px', fontWeight: '700',
              marginTop: '16px', boxShadow: 'var(--shadow-md)'
            }}
          >
            Sign Up
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '32px 0' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
          <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>or continue with</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button style={socialBtnStyle} onClick={handleSignup}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" style={{ width: '20px' }} />
            Google
          </button>
          <button style={socialBtnStyle} onClick={handleSignup}>
            <Smartphone size={20} />
            Apple
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'auto', paddingTop: '32px' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Already have an account? </span>
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '700' }}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
