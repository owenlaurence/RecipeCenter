'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Session, User } from 'better-auth';

export type BASession = { session: Session; user: User };

interface AuthContextType {
  session: BASession | null;
  setSession: (session: BASession | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
  initialSession: BASession | null;
}

export function AuthProvider({ children, initialSession }: AuthProviderProps) {
  const [session, setSession] = useState<BASession | null>(initialSession);
  
  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};