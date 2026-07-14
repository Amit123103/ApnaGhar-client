import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ChevronLeft, Smartphone } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import Logo from '../components/Logo';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await signup(email, password, name);
      navigate('/explore');
    } catch (err) {
      setError(err.message || 'Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    try {
      await loginWithGoogle();
      navigate('/explore');
    } catch (err) {
      setError(err.message || 'Google signup failed.');
    }
  };

  const pageStyle = {
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: 'var(--surface)'
  };

  const leftPanelStyle = {
    flex: 1,
    background: 'linear-gradient(135deg, var(--primary) 0%, #0066FF 100%)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '80px',
    position: 'relative',
    overflow: 'hidden'
  };

  const rightPanelStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    position: 'relative'
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 16px 16px 48px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border)',
    fontSize: '16px',
    backgroundColor: 'var(--background)',
    color: 'var(--text-primary)',
    marginBottom: '16px',
    outline: 'none',
    transition: 'border-color 0.2s'
  };

  const iconStyle = {
    position: 'absolute',
    left: '16px',
    top: '16px',
    color: 'var(--text-secondary)'
  };

  const socialBtnStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '14px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--surface)',
    color: 'var(--text-primary)',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  return (
    <div style={pageStyle}>
      {/* Left Branding Panel */}
      <div className="auth-brand-panel" style={leftPanelStyle}>
        <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', top: '-100px', left: '-100px' }} />
        <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', bottom: '-200px', right: '-150px' }} />
        
        <div style={{ zIndex: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px', background: 'white', padding: '12px 24px', borderRadius: 'var(--radius-full)', width: 'max-content' }}>
            <Logo size={40} />
            <span style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary)', marginLeft: '12px' }}>ApnaGhar</span>
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: '800', lineHeight: '1.2', marginBottom: '24px' }}>
            Start Your Journey<br />With Us Today.
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.9, maxWidth: '400px', lineHeight: '1.6', marginBottom: '40px' }}>
            Create an account to save your favorite properties, contact owners directly, and get personalized recommendations.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
              <span style={{ fontSize: '16px', fontWeight: '500' }}>Quick & Easy Setup</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
              <span style={{ fontSize: '16px', fontWeight: '500' }}>Save Favourite Stays</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
              <span style={{ fontSize: '16px', fontWeight: '500' }}>Exclusive Deals & Offers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div style={rightPanelStyle}>
        <div style={{ position: 'absolute', top: '40px', left: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }} onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
          <span style={{ fontWeight: '500', marginLeft: '4px' }}>Back</span>
        </div>

        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Create Account</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Sign up to unlock all features.</p>
          </div>

          {error && (
            <div style={{ padding: '12px 16px', backgroundColor: 'rgba(255, 90, 95, 0.1)', color: 'var(--secondary)', borderRadius: 'var(--radius-md)', marginBottom: '24px', fontSize: '14px', fontWeight: '500' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSignup}>
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
            <div style={{ position: 'relative', marginBottom: '24px' }}>
              <Lock size={20} style={iconStyle} />
              <input 
                type="password" 
                placeholder="Password (min 6 chars)" 
                style={inputStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <button type="submit" disabled={isLoading} style={{
              width: '100%',
              padding: '16px',
              backgroundColor: isLoading ? 'var(--text-secondary)' : 'var(--primary)',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              fontSize: '16px',
              fontWeight: '700',
              marginBottom: '24px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}>
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
            <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Or continue with</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            <button style={socialBtnStyle} onClick={handleGoogleSignup}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button style={socialBtnStyle}>
              <Smartphone size={20} />
              Apple
            </button>
          </div>

          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '15px' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
