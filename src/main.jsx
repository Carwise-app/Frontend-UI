import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SnackbarProvider } from './context/SnackbarContext';

import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  
    <GoogleOAuthProvider clientId="40797891532-2k0e6ravu7nift0bdjp7amc5bv6chrc1.apps.googleusercontent.com">
      <BrowserRouter>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
);
