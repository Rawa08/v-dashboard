'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@context/AuthContext';
import LoadingAnimation from './LoadingAnimation';

type AuthGuardProps = {
  children: ReactNode;
  requireAdmin?: boolean;
};

const AuthGuard = ({ children, requireAdmin = false }: AuthGuardProps) => {
  const { user, loading, isInitialized, isAdmin } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (!isInitialized) return;

    if (!user) {
      push('/signIn');
    } else if (requireAdmin && !isAdmin) {
      push('/unauthorized');
    }
  }, [user, isInitialized, requireAdmin, isAdmin, push]);

  if (loading || !isInitialized || (requireAdmin && !isAdmin && user)) {
    return <LoadingAnimation />;
  }

  return <>{children}</>;
};

export default AuthGuard;
