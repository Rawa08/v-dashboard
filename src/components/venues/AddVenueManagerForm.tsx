'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import LoadingAnimation from '@components/LoadingAnimation';
import fetchWithAuth from '@/lib/fetchWithAuth';
import ComboBox from '@/components/ui/Combobox';
import { showError, showSuccess } from '@/lib/toast';
import type { User } from '@/types/venue';

type Props = {
  venueId: string;
  onSubmit: () => void;
  existingManagers: string[];
};

const AddVenueManagerForm = ({ venueId, onSubmit, existingManagers = [] }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState<User[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchAllUsers = useCallback(() => {
    setIsLoading(true);
    fetchWithAuth('/api/admin/getAllUsers')
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          throw res;
        }
      })
      .catch((_error) => console.log(_error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (users.length === 0) {
      fetchAllUsers();
    }
  }, []);

  const handleSubmit = () => {
    if (!selectedUser || !venueId) {
      showError('Failed to add Venue Manager');
      return;
    }
    setIsSubmitting(true);
    fetchWithAuth('/api/admin/addVenueManager', {
      method: 'POST',
      body: JSON.stringify({
        venueId,
        userId: selectedUser.id,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          showSuccess(`Added ${selectedUser.email} to Venue`);
        } else {
          throw res;
        }
      })
      .catch((_error) => console.log(_error))
      .finally(() => {
        setIsSubmitting(false);
        setSelectedUser(null);
        onSubmit();
      });
  };

  const userOptins = useMemo<User[]>(() => {
    if (!users) {
      return [];
    }

    if (existingManagers.length > 0) {
      return users.filter((u) => (!existingManagers.includes(u.id)));
    }

    return users;
  }, [users, existingManagers]);

  if (isLoading) {
    return (<LoadingAnimation />);
  }
  return (
    <div className="mt-4">
      <h3 className="font-medium mb-2">Add Manager</h3>
      <div className="flex items-start gap-2">
        <ComboBox
          options={userOptins}
          searchKey="email"
          placeholder="Välj manager…"
          onOptionSelect={(u) => setSelectedUser(u)}
          className="flex-1 min-w-0"
        />

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? 'Adding...' : 'Add'}
        </button>
      </div>
    </div>
  );
};

export default AddVenueManagerForm;
