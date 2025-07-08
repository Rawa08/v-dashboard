import type { Venue } from '@/types/venue';

const VenueCard = ({ venue }: { venue: Venue }) => {
  return (
      <li className="bg-white rounded shadow p-4 border border-gray-200 cursor-pointer hover:bg-gray-50 transition m-1 list-none">
        <h2 className="text-lg font-semibold">{venue.name}</h2>
        <p className="text-sm text-gray-600">
          {venue.city && <>📍 {venue.city}, </>}
          {venue.postalAddress && <>{venue.postalAddress}</>}
        </p>
        {venue.phone && <p className="text-sm text-gray-600">📞 {venue.phone}</p>}
        {venue.venuePlaylistManagers && venue.venuePlaylistManagers?.length && (
          venue?.venuePlaylistManagers.map((email) => (<p className="text-sm text-gray-600" key={email}>👤 Venue manager: {email}</p>))
        )}
      </li>
  );
};

export default VenueCard;
