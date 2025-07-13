'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { VenueCard } from '@/components/venues';
import FormInput from '@/components/ui/FromInput';
import fetchWithAuth from '@/lib/fetchWithAuth';
import { showError, showSuccess } from '@/lib/toast';
import type { Venue } from '@/types/venue';


type NewVenue = {
    name: string;
    phone: string;
    postalAddress: string;
    postalCode: string;
    city: string;
    country: string;
    startDate: string;
    contactPersonId: string;
};

const VenuesPage = () => {
    const [venues, setVenues] = useState<Venue[]>([]);

    const [form, setForm] = useState<NewVenue>({ name: '', phone: '', postalAddress: '', postalCode: '', city: '', country: '', startDate: '', contactPersonId: '' });
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const basePath = usePathname();

    const getAllVenues = useCallback(() => {
        setIsLoading(true);
        fetchWithAuth('/api/admin/getVenues')
            .then(async (res) => {
                if (!res.ok) {
                    throw res;
                } else {
                    const data = await res.json();
                    setVenues(data ?? []);
                }

            }).catch((_error) => {
                // @todo log error
                showError('Failed to retrive venues');
            })
            .finally(() => setIsLoading(false));

    }, []);

    const handleSubmit = async () => {
        if (!form.name.trim()) {
            return;
        }

        setIsLoading(true);
        const payload: any = {
            name: form.name,
            phone: form.phone,
            postalAddress: form.postalAddress,
            city: form.city,
            country: form.country,
        };

        if (form.postalCode.trim() !== "") {
            payload.postalCode = Number(form.postalCode);
        }
        if (form.startDate.trim() !== "") {
            payload.startDate = form.startDate;
        }

        if (form.contactPersonId.trim() !== "") {
            payload.contactPersonId = form.contactPersonId;
        }

        fetchWithAuth('/api/admin/createVenue', {
            method: 'POST',
            body: JSON.stringify({ ...payload }),
        }).then((res) => {
            if (res.ok) {
                showSuccess('Created Venue');
                getAllVenues();
            } else {
                throw res;
            }
        }).catch((_error) => {
            showError(`Failed to create venue`);
            // Log error
        })
            .finally(() => {
                setForm({ name: '', phone: '', postalAddress: '', postalCode: '', city: '', country: '', startDate: '', contactPersonId: '' });
                setShowForm(false);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getAllVenues();
    }, [getAllVenues]);

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
                        <FormInput
                            id="name"
                            label="Venue Name *"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <FormInput
                            id="phone"
                            label="Phone *"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                    </div>
                    <div>
                        <FormInput
                            id="postalAddress"
                            label="Postal Address *"
                            value={form.postalAddress}
                            onChange={(e) => setForm({ ...form, postalAddress: e.target.value })}
                        />
                    </div>
                    <div>
                        <FormInput
                            id="postalCode"
                            label="Postal Code *"
                            value={form.postalCode}
                            onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                        />
                    </div>
                    <div>
                        <FormInput
                            id="city"
                            label="City *"
                            value={form.city}
                            onChange={(e) => setForm({ ...form, city: e.target.value })}
                        />
                    </div>
                    <div>
                        <FormInput
                            id="country"
                            label="Country *"
                            value={form.country}
                            onChange={(e) => setForm({ ...form, country: e.target.value })}
                        />
                    </div>
                    <div>
                        {/**
                         * Date
                         */}
                        <FormInput
                            id="startDate"
                            label="Start date"
                            value={form.startDate}
                            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                        />
                    </div>
                    <div>
                        {/**
                         * List of KAM
                         */}
                        <FormInput
                            id="kamContact"
                            label="KAM Contact"
                            value={form.contactPersonId}
                            onChange={(e) => setForm({ ...form, contactPersonId: e.target.value })}
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
                    <Link key={venue.id} href={`${basePath}/${venue.id}`}>
                        <VenueCard venue={venue} />
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default VenuesPage;
