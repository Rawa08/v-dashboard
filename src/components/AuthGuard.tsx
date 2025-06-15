'use client';

import { ReactNode, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@context/AuthContext';
import LoadingAnimation from './LoadingAnimation';

type AuthGuardProps = {
  children: ReactNode;
  requireAdmin?: boolean;
};

const AuthGuard = ({ children, requireAdmin = false }: AuthGuardProps) => {
  const { user, loading } = useAuth();
  const { push } = useRouter();
  const [checkClaims, setCheckClaims] = useState(requireAdmin);

  const verifyAdmin = useCallback(() => {
    if (!user) {
      return;
    }

    user
      .getIdTokenResult()
      .then((tokenResult) => {
        const isAdmin = tokenResult.claims.admin === true;
        if (!isAdmin) {
          push('/unauthorized');
        } else {
          setCheckClaims(false);
        }
      })
      .catch(() => {
        push('/error');
      });
  }, [user, push]);

  useEffect(() => {
    if (!loading && !user) {
      push('/signIn');
      return;
    }

    if (!loading && user) {
      if (!requireAdmin) {
        setCheckClaims(false);
      } else {
        verifyAdmin();
      }
    }
  }, [user, loading, requireAdmin]);

  if (loading || checkClaims) {
    return <LoadingAnimation />;
  }

  return <>{children}</>;
};

export default AuthGuard;
