import { NextResponse } from 'next/server';


export const GET = async (
    req: Request,
    context: { params: Promise<{ userId: string }> }
) => {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
    const { userId } = await context.params;

    try {
        const authHeader = req.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json(
                { error: 'Missing authorization header' },
                { status: 401 }
            );
        }

        const response = await fetch(`${baseUrl}/api/dashboard/users/${userId}/venues`, {
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

