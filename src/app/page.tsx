'use client';

import { useAuth } from '@context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingAnimation from '@/components/LoadingAnimation';

const Home = () => {
  const { user, loading } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        push('/dashboard');
      } else {
        push('/signIn');
      }
    }
  }, [user, loading, push]);

  if (loading) {
    return <LoadingAnimation />;
  }

  return <div>Home</div>;
};

export default Home;
