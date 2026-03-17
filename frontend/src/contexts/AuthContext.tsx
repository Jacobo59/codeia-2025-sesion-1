import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Definir el tipo CredentialResponse manualmente
interface CredentialResponse {
  credential?: string;
  select_by?: 'auto' | 'user' | 'user_1tap' | 'user_2tap' | 'btn' | 'btn_confirm' | 'btn_add_session' | 'btn_confirm_add_session';
  clientId?: string;
}

// Type de usuario
export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentialResponse: CredentialResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Cargar sesión del localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      setLoading(true);

      // Decodificar el JWT de Google para obtener la información del usuario
      const decoded = JSON.parse(atob(credentialResponse.credential.split('.')[1]));

      const userData: User = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', credentialResponse.credential);
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Google OAuth Provider
export const googleOAuthClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export const GoogleAuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId={googleOAuthClientId}>
      {children}
    </GoogleOAuthProvider>
  );
};
