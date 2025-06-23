import { NextResponse } from 'next/server';
import type { Venue } from '@/types/venue';
import { PlayListNameEnum } from '@/types/venue';

const mockVenue: Venue = {
    id: '1',
    name: 'Sportbar A',
    city: 'Stockholm',
    address: 'Storgatan 1',
    phone: '08-123456',
    devices: 4,
    managerEmail: ['manager1@venue.com', 'manager2@venue.com'],
    playLists: {
        [PlayListNameEnum.SPORTS]: {
            category: PlayListNameEnum.SPORTS,
            id: 'pl1',
            images: [
                {
                    id: 'img1',
                    playListId: 'pl1',
                    url: 'https://example.com/sports1.jpg',
                    venueId: '1',
                    createdAt: new Date(),
                    createdByUserId: 'manager1@venue.com',
                },
                {
                    id: 'img2',
                    playListId: 'pl1',
                    url: 'https://example.com/sports2.jpg',
                    venueId: '1',
                    createdAt: new Date(Date.now() - 3600_000),
                    createdByUserId: 'manager2@venue.com',
                },
            ],
            createdAt: new Date(),
            createdByUserId: 'manager1@venue.com',
        },
        [PlayListNameEnum.EVENTS]:
        {
            category: PlayListNameEnum.EVENTS,
            id: 'pl2',
            images: [
                {
                    id: 'img3',
                    playListId: 'pl2',
                    url: 'https://example.com/event1.jpg',
                    venueId: '1',
                    createdAt: new Date(Date.now() - 86_400_000),
                    createdByUserId: 'manager1@venue.com',
                },
            ],
            createdAt: new Date(Date.now() - 86_400_000),
            createdByUserId: 'manager1@venue.com',
        },
        [PlayListNameEnum.SPECIALS]: {
            category: PlayListNameEnum.SPECIALS,
            id: 'pl3',
            images: [
                {
                    id: 'img4',
                    playListId: 'pl3',
                    url: 'https://example.com/special1.jpg',
                    venueId: '1',
                    createdAt: new Date(Date.now() - 30 * 60_000),
                    createdByUserId: 'manager2@venue.com',
                },
            ],
            createdAt: new Date(Date.now() - 30 * 60_000),
            createdByUserId: 'manager2@venue.com',
        },
        [PlayListNameEnum.MENU]: {
            category: PlayListNameEnum.MENU,
            id: 'pl4',
            images: [
                {
                    id: 'img5',
                    playListId: 'pl4',
                    url: 'https://example.com/menu1.jpg',
                    venueId: '1',
                    createdAt: new Date(Date.now() - 5 * 60_000),
                    createdByUserId: 'manager1@venue.com',
                },
            ],
            createdAt: new Date(Date.now() - 5 * 60_000),
            createdByUserId: 'manager1@venue.com',
        },
    },
};

export const GET = () => (NextResponse.json(mockVenue));

// export const GET = async (
//     req: Request,
//     context: { params: Promise<{ userId: string }> }
// ) => {
//     const baseUrl = process.env.NEXT_PUBLIC_SERVICES_BASE_URL;
//     const { userId } = await context.params;

//     if (!baseUrl) {
//         console.error('Missing NEXT_PUBLIC_SERVICES_BASE_URL');
//         return NextResponse.json(
//             { error: 'Server configuration error' },
//             { status: 500 }
//         );
//     }

//     try {
//         const response = await fetch(`${baseUrl}/api/users/${userId}/venues`);

//         if (!response.ok) {
//             const text = await response.text();
//             console.error('Backend error:', response.status, text);
//             return NextResponse.json(
//                 { error: 'Could not fetch venues', details: text },
//                 { status: response.status }
//             );
//         }

//         const payload = await response.json();

//         return NextResponse.json(payload);
//     } catch (err: any) {
//         console.error('Fetch failed:', err);
//         return NextResponse.json(
//             { error: 'Internal server error' },
//             { status: 500 }
//         );
//     }
// };

