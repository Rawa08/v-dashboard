'use client';

import { useState } from 'react';
import { VenueCard } from '@/components/venues';

type Venue = {
    id: string;
    name: string;
    city?: string;
    address?: string;
    phone?: string;
    managerEmail?: string;
};

 const VenuesPage = () => {
    const [venues, setVenues] = useState<Venue[]>([
        {
            id: '1',
            name: 'Venue One',
            city: 'Stockholm',
            address: 'Gatan 1',
            phone: '0701234567',
            managerEmail: 'admin1@venue.se',
        },
        {
            id: '2',
            name: 'Venue Two',
            city: 'Göteborg',
            address: 'Gatan 2',
            phone: '0707654321',
            managerEmail: 'admin2@venue.se',
        },
    ]);

    const [form, setForm] = useState({ name: '', city: '', address: '', phone: '' });
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!form.name.trim()) return;

        setIsLoading(true);

        const newVenue: Venue = {
            id: crypto.randomUUID(),
            ...form,
            managerEmail: 'admin@venue.se', // Mocked manager
        };

        // Simulate API delay
        setTimeout(() => {
            setVenues([...venues, newVenue]);
            setForm({ name: '', city: '', address: '', phone: '' });
            setIsLoading(false);
            setShowForm(false);
        }, 800);
    };

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold">Venues</h1>

            <button
                onClick={() => setShowForm((prev) => !prev)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
            >
                {showForm ? 'Cancel' : 'Add new venue'}
            </button>

            {showForm && (
                <div className="space-y-4 bg-white p-4 rounded shadow">
                    <div>
                        <label className="block text-sm font-medium">Name *</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">City</label>
                        <input
                            type="text"
                            value={form.city}
                            onChange={(e) => setForm({ ...form, city: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Address</label>
                        <input
                            type="text"
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Phone</label>
                        <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 cursor-pointer"
                    >
                        {isLoading ? 'Creating...' : 'Create Venue'}
                    </button>
                </div>
            )}

            <ul className="space-y-2">
                {venues.map((venue) => (
                    <VenueCard key={venue.id} venue={venue} />
                ))}
            </ul>
        </div>
    );
}

export default VenuesPage;
