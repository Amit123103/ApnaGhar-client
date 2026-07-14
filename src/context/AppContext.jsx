import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [locationGranted, setLocationGranted] = useState(
    localStorage.getItem('locationGranted') === 'true'
  );
  const [currentLocation, setCurrentLocation] = useState(
    localStorage.getItem('currentLocation') || 'New Delhi, India'
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const grantLocation = async () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        reject(new Error("Not supported"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          try {
            // Free Reverse Geocoding using Nominatim
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            const data = await response.json();
            
            // Extract the most relevant city/town/suburb
            const city = data.address.city || data.address.town || data.address.state_district || 'Your Location';
            
            setLocationGranted(true);
            setCurrentLocation(city);
            localStorage.setItem('locationGranted', 'true');
            localStorage.setItem('currentLocation', city);
            
            resolve(city);
          } catch (error) {
            console.error("Geocoding failed", error);
            // Fallback
            setLocationGranted(true);
            localStorage.setItem('locationGranted', 'true');
            resolve('Unknown Location');
          }
        },
        (error) => {
          console.error("Location access denied or failed", error);
          reject(error);
        }
      );
    });
  };

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      locationGranted, grantLocation,
      currentLocation,
      isSearchOpen, setIsSearchOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};
