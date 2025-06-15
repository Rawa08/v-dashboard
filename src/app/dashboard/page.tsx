'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAdmin) {
      router.replace('/dashboard/admin');
    } else {
      router.replace('/dashboard/venue');
    }
  }, [isAdmin, router]);

  return null;
}
