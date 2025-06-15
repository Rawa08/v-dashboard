
type Props = {
  venueId: string;
};

const VenueManagerList = ({ venueId }: Props) => {
  // TODO: Fetch real manager list from API
  const dummyManagers = [
    { email: 'manager1@example.com' },
    { email: 'manager2@example.com' },
  ];

  return (
    <ul className="space-y-2">
      {dummyManagers.map((manager, index) => (
        <li key={index} className="bg-gray-100 rounded px-4 py-2">
          {manager.email}
        </li>
      ))}
    </ul>
  );
}

export default VenueManagerList;
