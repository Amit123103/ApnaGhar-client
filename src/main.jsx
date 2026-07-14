import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppProvider } from './context/AppContext.jsx'
import { FavouritesProvider } from './context/FavouritesContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AppProvider>
        <FavouritesProvider>
          <App />
        </FavouritesProvider>
      </AppProvider>
    </AuthProvider>
  </React.StrictMode>,
)
