'use client';

import { useState } from 'react';

type Props = {
  venueId: string;
};

const AddVenueManagerForm = ({ venueId }: Props) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;

    setIsSubmitting(true);

    try {
      // TODO: POST to /api/venues/:venueId/managers
      console.log(`Add manager ${email} to venue ${venueId}`);
      setEmail('');
    } catch (err) {
      console.error('Failed to add manager:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="font-medium mb-2">Add Manager</h3>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Manager email"
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? 'Adding...' : 'Add'}
        </button>
      </div>
    </div>
  );
}

export default AddVenueManagerForm;