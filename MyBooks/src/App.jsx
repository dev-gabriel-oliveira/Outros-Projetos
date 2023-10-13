import { AuthProvider } from './contexts/auth';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/routes';
import Header from "./components/Header/index.tsx";

import './App.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />

        <AppRoutes />
      
        <footer>
          Fim por mim copiado por mim.
        </footer>
      </BrowserRouter>
    </AuthProvider>
  )
}