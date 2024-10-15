'use client';

import { AuthContext } from '@/contexts/auth-provider';
import IBrand from '@/types/brand';
import IInfluencer from '@/types/influencer';
import { Session } from 'next-auth';
import { useContext } from 'react';
import { KeyedMutator } from 'swr';

interface AuthSession<T> {
  session: Session | null;
  update: (data?: any) => Promise<Session | null>;
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
