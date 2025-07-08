import { NextResponse } from 'next/server';


export const POST = async (
    req: Request,
) => {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

    try {
        const authHeader = req.headers.get('authorization');
        const data = await req.json();

        if (!authHeader) {
            // Admin alert here (provide firebase uid)
            return NextResponse.json({ success: true }, { status: 200 });
        }

        const response = await fetch(`${baseUrl}/api/dashboard/admin/venues/createVenue`, {
            method: 'POST',
            headers: {
                authorization: authHeader,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data }),
        });
        if (!response.ok) {
            throw response;
        } else {
            const data = await response.json();
            return NextResponse.json({ success: true, data }, { status: 200 });
        }
    } catch (err: any) {
        return NextResponse.json({ success: false, message: err }, { status: 500 });
    }
};

