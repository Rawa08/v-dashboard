'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import LoadingAnimation from '@/components/LoadingAnimation';
import fetchWithAuth from '@/lib/fetchWithAuth';
import { usePathname } from 'next/navigation';
import { VenueCard } from '@/components/venues';
import type { Venue } from '@/types/venue';


const VenuesDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { push } = useRouter();

  const [venues, setVenues] = useState<Venue[] | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const basePath = usePathname();

  const fetchVenue = useCallback(() => {
    if (!user) {
      return;
    }
    setIsLoading(true);
    fetchWithAuth(`/api/users/${user.uid}/venues`)
      .then(async (res) => {
        if (res.ok) {
          const { data } = await res.json();
          setVenues(data);
        } else {
          setVenues(null);
        }
      }).catch(() => {
        setError(true);
      })
      .finally(() => setIsLoading(false));

  }, [user]);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        push('/signIn');
        return;
      } else {
        fetchVenue();
      }
    }

  }, [authLoading, user, push, fetchVenue]);

  if (authLoading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return <p className="text-red-600">Some error occured</p>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pb-20">
        <div className="mt-24 flex justify-center">
          <LoadingAnimation
            overlay={false}
            avoidFixed={true}
            centered={true}
            size={80}
          />
        </div>
      </div>
    );
  }


  if (!venues) {
    return (<p className="text-gray-700">No venues assigned to your account.</p>);
  }

  return (
    <div className="min-h-screen pb-20">
      <ul className="space-y-2">
        {venues?.map((venue) => (
          <Link key={venue.id} href={`${basePath}/${venue.id}`}>
            <VenueCard venue={venue} />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default VenuesDashboard;
