'use client';

import { createContext, Dispatch, FC, ReactNode, useReducer } from 'react';
import http from '@/lib/http';
import User from '@/types/user';
import { LoginBodyType } from '@/schema-validations/auth.schema';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
}

type AuthAction =
  | { type: 'LOGIN_PENDING' }
  | { type: 'LOGIN_FULFILLED'; payload: User }
  | { type: 'LOGIN_REJECT' }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isError: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_PENDING': {
      return { ...state, user: null, isLoading: true, isError: false };
    }
    case 'LOGIN_FULFILLED': {
      return { ...state, user: action.payload, isLoading: false, isError: false };
    }
    case 'LOGIN_REJECT': {
      return {
        ...state,
        user: null,
        isLoading: false,
        isError: true,
      };
    }
    case 'LOGOUT': {
      return initialState;
    }
    default:
      return state;
  }
};

interface AuthContextProps extends AuthState {
  dispatch: Dispatch<AuthAction>;
  login: (credentials: LoginBodyType) => Promise<void>;
  loginByOthers: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: FC<Readonly<AuthProviderProps>> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async ({ email, password }: LoginBodyType) => {
    dispatch({ type: 'LOGIN_PENDING' });
    try {
      const response = await http.post('https://dummyjson.com/auth/login', { username: email, password });
      const token = response.payload.token;
      localStorage.setItem('token', token);
      http.post('/api/token', { token: token }, { baseUrl: '' });
      dispatch({ type: 'LOGIN_FULFILLED', payload: response.payload });
    } catch (error: any) {
      dispatch({ type: 'LOGIN_REJECT' });
    }
  };

  const loginByOthers = async (data: any) => {};

  const logout = async () => {};

  return (
    <AuthContext.Provider value={{ ...state, dispatch, login, logout, loginByOthers }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
