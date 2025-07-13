import { useMemo } from 'react';
import type { Venue } from '@/types/venue';

const VenueCard = ({ venue }: { venue: Venue }) => {
  const venueManagers = useMemo(() => {
    const list = venue.venuePlaylistManagers
      ? venue.venuePlaylistManagers.map((m) => (m.user.email))
      : [];

    return list.join(', ');
  }, [venue]);

  return (
    <li className="bg-white rounded shadow p-4 border border-gray-200 cursor-pointer hover:bg-gray-50 transition m-1 list-none">
      <h2 className="text-lg font-semibold">{venue.name}</h2>
      <p className="text-sm text-gray-600">
        {venue.city && <>📍 {venue.city}, </>}
        {venue.postalAddress && <>{venue.postalAddress}</>}
      </p>
      {venue.phone && <p className="text-sm text-gray-600">📞 {venue.phone}</p>}
      <p className="text-sm text-gray-600">👤 Venue manager: {venueManagers}</p>
    </li>
  );
};

export default VenueCard;
