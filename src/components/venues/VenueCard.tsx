import Link from 'next/link';

type Venue = {
  id: string;
  name: string;
  city?: string;
  address?: string;
  phone?: string;
  managerEmail?: string;
};

const VenueCard = ({ venue }: { venue: Venue }) => {
  return (
    <Link href={`/dashboard/admin/venues/${venue.id}`}>
      <li className="bg-white rounded shadow p-4 border border-gray-200 cursor-pointer hover:bg-gray-50 transition m-1">
        <h2 className="text-lg font-semibold">{venue.name}</h2>
        <p className="text-sm text-gray-600">
          {venue.city && <>📍 {venue.city}, </>}
          {venue.address && <>{venue.address}</>}
        </p>
        {venue.phone && <p className="text-sm text-gray-600">📞 {venue.phone}</p>}
        {venue.managerEmail && (
          <p className="text-sm text-gray-600">👤 Venue manager: {venue.managerEmail}</p>
        )}
      </li>
    </Link>
  );
}

export default VenueCard;
