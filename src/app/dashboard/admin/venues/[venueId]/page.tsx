'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { VenueManagerList, AddVenueManagerForm } from '@/components/venues';
import LoadingAnimation from '@/components/LoadingAnimation';

const VenueDetailsPage = () => {
  const params = useParams();
  const venueId = params?.venueId as string;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (venueId) {
      // TODO: Fetch venue details here
      setLoading(false);
    }
  }, [venueId]);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Venue #{venueId}</h1>

      {/* TODO: Replace with actual venue data */}
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-600">📍 City: ...</p>
        <p className="text-sm text-gray-600">📞 Phone: ...</p>
      </div>

      <h2 className="text-xl font-semibold">Venue Managers</h2>
      <VenueManagerList venueId={venueId} />

      <AddVenueManagerForm venueId={venueId} />
    </div>
  );
}

export default VenueDetailsPage;
