import { http } from '@/common/services.config';
import { useRouter } from 'next/router';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';

type LoginRequest = {
  email: string;
  password: string;
};

type AuthState = {
  isLoggedIn: boolean;
  isReady: boolean;
  isLoading: boolean;
  logIn: (data: LoginRequest) => Promise<void>;
  logOut: () => void;
};

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isReady: false,
  isLoading: false,
  logIn: () => Promise.resolve(),
  logOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const logIn = async (data: LoginRequest) => {
    setIsLoading(true);
    try {
      const res = await http.post('/auth/login', data)

      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
        setIsLoading(true)
        router.push('/')
      }
    } catch (error) {
      console.log({error})
    }
    setIsLoading(false);
  }

  const logOut = () => {
    setIsLoading(false)
    localStorage.removeItem('token')
    router.push('/login')
  }

  useEffect(() => {
    const getAuthFromStorage = async () => {
      try {
        const value = localStorage.getItem('token')
        if (value !== null) {
          const auth = JSON.parse(value)
          setIsLoggedIn(auth.isLoggedIn)
        }
      } catch (error) {
        console.log('Error fetching from storage', error);
      }

      setIsReady(true);
    }

    getAuthFromStorage()
  }, [])

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      isReady,
      isLoading,
      logIn,
      logOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}