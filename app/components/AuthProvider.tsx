'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Session, User } from 'better-auth';
import { AuthenticationResponse, getAuthenticatedUser } from '../actions';


interface AuthContextType {
  session: Session | undefined
  setSession: (session: Session) => void

  user: User | undefined
  setUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
  initialSession: AuthenticationResponse | undefined;
}

export function AuthProvider({ children, initialSession }: AuthProviderProps) {
  const [session, setSession] = useState<Session | undefined>(initialSession?.session);
  const [user, setUser] = useState<User | undefined>(initialSession?.user);


  return (
    <AuthContext.Provider value={{
      session: session,
      setSession: setSession,
      user: user,
      setUser: setUser
    }}>
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