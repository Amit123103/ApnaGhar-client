import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [locationGranted, setLocationGranted] = useState(
    localStorage.getItem('locationGranted') === 'true'
  );
  const [currentLocation, setCurrentLocation] = useState('New Delhi, India');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const grantLocation = () => {
    setLocationGranted(true);
    localStorage.setItem('locationGranted', 'true');
    // Simulate fetching precise location
    setCurrentLocation('Connaught Place, Delhi');
  };

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      locationGranted, grantLocation,
      currentLocation
    }}>
      {children}
    </AppContext.Provider>
  );
};
