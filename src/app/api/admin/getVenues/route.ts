import { NextResponse } from 'next/server';


export const GET = async (req: Request) => {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

    try {
        const authHeader = req.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json(
                { error: 'Missing authorization header' },
                { status: 401 }
            );
        }

        const response = await fetch(`${baseUrl}/api/dashboard/admin/venues/getAllVenues`, {
            headers: {
                authorization: authHeader
            }
        });

        if (!response.ok) {
            const text = await response.text();
            return NextResponse.json(
                { error: 'Could not fetch venues', details: text },
                { status: response.status }
            );
        }

        const payload = await response.json();
        return NextResponse.json(payload);
    } catch (err: any) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
};

