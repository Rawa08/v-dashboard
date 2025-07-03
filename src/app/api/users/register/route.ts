import { NextResponse } from 'next/server';


export const POST = async (
    req: Request,
) => {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

    try {
        const authHeader = req.headers.get('authorization');
        const { firebaseUid, firstName, lastName, phoneNumber, email } = await req.json();

        if (!authHeader) {
            // Admin alert here (provide firebase uid)
            return NextResponse.json({ success: true }, { status: 200 });
        }

        const response = await fetch(`${baseUrl}/api/dashboard/admin/user/register`, {
            method: 'POST',
            headers: {
                authorization: authHeader,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firebaseUid, firstName, lastName, phoneNumber, email }),
        });
        if (!response.ok) {
            // Admin alert here (provide firebase uid)
        }
    } catch (err: any) {
        // Admin alert here (provide firebase uid)
    }

    return NextResponse.json({ success: true }, { status: 200 });
};

