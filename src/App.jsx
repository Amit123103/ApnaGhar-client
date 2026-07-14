import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppContext } from './context/AppContext';

// Pages
import Onboarding from './pages/Onboarding';
import LocationPermission from './pages/LocationPermission';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Search from './pages/Search';
import Favourites from './pages/Favourites';
import Profile from './pages/Profile';
import PropertyDetails from './pages/PropertyDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Components
import BottomNavigation from './components/BottomNavigation';
import TopNavigation from './components/TopNavigation';
import SearchOverlay from './components/SearchOverlay';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const AppContent = () => {
  const { locationGranted } = useContext(AppContext);
  const [showOnboarding, setShowOnboarding] = useState(
    localStorage.getItem('onboardingDone') !== 'true'
  );

  const location = useLocation();
  const hideBottomNavRoutes = ['/property/', '/onboarding', '/location', '/login', '/signup'];
  const shouldHideBottomNav = hideBottomNavRoutes.some(route => location.pathname.includes(route)) || location.pathname === '/';
  
  const hideTopNavRoutes = ['/onboarding', '/location', '/login', '/signup'];
  const shouldHideTopNav = hideTopNavRoutes.some(route => location.pathname.includes(route));

  if (showOnboarding) {
    return <Onboarding onComplete={() => {
      setShowOnboarding(false);
      localStorage.setItem('onboardingDone', 'true');
    }} />;
  }

  if (!locationGranted && location.pathname !== '/location') {
    return <Navigate to="/location" />;
  }

  return (
    <>
      {!shouldHideTopNav && <TopNavigation />}
      <div className={`app-container ${shouldHideTopNav ? 'no-top-nav' : ''}`} style={{ flex: 1, overflowY: 'auto' }}>
        <Routes>
          <Route path="/location" element={locationGranted ? <Navigate to="/" /> : <LocationPermission />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Landing />} />
          <Route path="/explore" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          <Route path="/favourites" element={<ProtectedRoute><Favourites /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/property/:id" element={<ProtectedRoute><PropertyDetails /></ProtectedRoute>} />
        </Routes>
      </div>
      {!shouldHideBottomNav && <BottomNavigation />}
      <SearchOverlay />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
