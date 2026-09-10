import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './core/print/print.css';
import './pwa';
import { AuthProvider } from './context/AuthContext';
import { OSProvider } from './context/OSContext';
import { RoleProvider } from './context/RoleContext';
import { ThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <OSProvider>
          <RoleProvider>
            <App />
          </RoleProvider>
        </OSProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
