import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './App.css';

import Header from './components/header/index';
import AppRoutes from './routes/routes';
import Footer from './components/footer';


export default function App() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="806327805056-qgm85redbtegq9opghg3lrtumhsqs4f0.apps.googleusercontent.com">
        <BrowserRouter>

          <Header />
          <AppRoutes />
          <Footer />

        </BrowserRouter>
      </GoogleOAuthProvider>
    </AuthProvider>
  )
}