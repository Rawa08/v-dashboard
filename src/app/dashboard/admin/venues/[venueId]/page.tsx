'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { VenueManagerList, AddVenueManagerForm } from '@/components/venues';
import PlaylistContent from '@/components/venues/PlaylistContent';
import LoadingAnimation from '@/components/LoadingAnimation';
import fetchWithAuth from '@/lib/fetchWithAuth';
import { showError } from '@/lib/toast';
import type { Venue } from '@/types/venue';
import { MapPin, Phone, User, Calendar, Clock, Monitor } from 'lucide-react';

const VenueDetailsPage = () => {
  const params = useParams();
  const venueId = params?.venueId as string;
  const [loading, setLoading] = useState(true);
  const [venue, setVenue] = useState<Venue | null>(null);

  const fetchVenue = useCallback(() => {
    setLoading(true);
    fetchWithAuth(`/api/venue/getVenue/${venueId}`)
      .then(async (res) => {
        if (res.ok) {
          const { data } = await res.json();
          setVenue(data);
        } else {
          setVenue(null);
          throw res;
        }
      }).catch(() => {
        setVenue(null);
        showError('Failed to retrive Venue');
      })
      .finally(() => setLoading(false));

  }, [venueId]);

  useEffect(() => {
    if (venueId) {
      fetchVenue();
    }
  }, [venueId, fetchVenue]);

  const formatDate = (iso?: Date | string): string => {
    if (iso) {
      return new Date(iso).toLocaleDateString('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }
    return '–';
  };

  const handleManagerSubmit = () => fetchVenue();

  const managerIds = useMemo<string[]>(() => {
    if (!venue) {
      return [];
    }

    return venue.venuePlaylistManagers.map(({ user }) => (user.id));
  }, [venue]);


  if (loading) {
    return <LoadingAnimation overlay centered avoidFixed />;
  }

  if (!venue) {
    return <p className="text-gray-700">Venue not found</p>;
  }


  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">{venue.name}</h1>
      <div className="bg-white p-4 rounded shadow space-y-2">
        <p className="text-sm text-gray-600 flex items-center">
          <MapPin className="w-4 h-4 mr-1" /> Address: {`${venue.postalAddress} – ${venue.city}`}
        </p>
        <p className="text-sm text-gray-600 flex items-center">
          <Phone className="w-4 h-4 mr-1" /> Phone: {venue.phone ?? '–'}
        </p>
        <p className="text-sm text-gray-600 flex items-center">
          <User className="w-4 h-4 mr-1" /> Account Manager: {venue.contactPersonId ?? '–'}
        </p>
        <p className="text-sm text-gray-600 flex items-center">
          <Calendar className="w-4 h-4 mr-1" /> Start date: {formatDate(venue.startDate)}
        </p>
        <p className="text-sm text-gray-600 flex items-center">
          <Clock className="w-4 h-4 mr-1" />Last updated: {formatDate(venue.updatedAt)}
        </p>
        <p className="text-sm text-gray-600 flex items-center">
          <Monitor className="w-4 h-4 mr-1" />Devices {venue._count.devices}
        </p>
      </div>

      <h2 className="text-xl font-semibold">Venue Managers</h2>
      <VenueManagerList managers={venue.venuePlaylistManagers} />

      <AddVenueManagerForm venueId={venueId} onSubmit={handleManagerSubmit} existingManagers={managerIds} />

      <h2 className="text-xl font-semibold">Venue Managers</h2>
      {venue.playlists.map((pl) => (
        <div key={pl.id}>
          <p>{pl.category}</p>
          <PlaylistContent playlist={pl} onUploadComplete={() => null} />
        </div>
      ))}
    </div>
  );
};

export default VenueDetailsPage;
