import { useMemo } from 'react';
import Link from 'next/link';
import type { manager } from '@/types/venue';

type Props = {
  managers: manager[];
};

const VenueManagerList = ({ managers }: Props) => {
  const getManagerList = useMemo(() => {
    if (!managers || managers.length === 0) {
      return <p className="text-sm text-gray-500">No managers assigned.</p>;
    }
    return (
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {managers.map(({ user }) => (
          <Link key={user.id} href={`/dashboard/admin/users/${user.id}`}>
            <li
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between space-y-2 h-40"
            >
              <div>
                <div className="text-lg font-medium text-gray-800">
                  {user.firstName} {user.LastName}
                </div>
                <div className="text-sm text-gray-600">{user.email}</div>
              </div>
              {user.phone && (
                <div className="text-sm text-gray-600">📞 {user.phone}</div>
              )}
            </li>
          </Link>
        ))}
      </ul>
    );
  }, [managers]);

  return getManagerList;
};

export default VenueManagerList;
