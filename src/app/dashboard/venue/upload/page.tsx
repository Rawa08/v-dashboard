'use client';

import UploadForm from '@/components/uploads/UploadForm';
import Gallery from '@/components/Gallery';
import { useAuth } from '@/context/AuthContext';
import { showSuccess } from '@/lib/toast';

export default function VenueUploadPage() {
  //const { user } = useAuth();

  // TODO: Fetch venueId from user profile or session
  const venueId = 'mock-venue-id';

  const onUploadComplete = () => showSuccess('Succefully uploaded image');


  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Upload Media to My Venue</h1>
      <UploadForm venueId={venueId} onUploadComplete={onUploadComplete} />
      <Gallery venueId={venueId} />
    </div>
  );
}
