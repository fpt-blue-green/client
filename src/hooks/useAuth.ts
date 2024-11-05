'use client';

import { AuthContext } from '@/contexts/auth-provider';
import IBrand from '@/types/brand';
import IInfluencer from '@/types/influencer';
import { Session } from 'next-auth';
import { useContext } from 'react';
import { KeyedMutator } from 'swr';

interface AuthSessionUser {
  session: Session | null;
  update: (data?: any) => Promise<Session | null>;
}

interface AuthSession<T> extends AuthSessionUser {
  isLoading: boolean;
  profile?: T | null;
  refreshProfile: KeyedMutator<T | null>;
}

export const useAuthInfluencer = (): AuthSession<IInfluencer> => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return {
    session: context.session,
    update: context.update,
    profile: context.influencer,
    refreshProfile: context.refreshInfluencer,
    isLoading: context.isLoading,
  };
};

export const useAuthBrand = (): AuthSession<IBrand> => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return {
    session: context.session,
    update: context.update,
    profile: context.brand,
    refreshProfile: context.refreshBrand,
    isLoading: context.isLoading,
  };
};

export const useAuthUser = (): AuthSessionUser => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return {
    session: context.session,
    update: context.update,
  };
};
