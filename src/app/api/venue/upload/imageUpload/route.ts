import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export const POST = async (req: NextRequest) => {

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  try {
    const form = await req.formData();

    const proxyRes = await fetch(`${baseUrl}/api/dashboard/images/imageUploads`, {
      method: 'POST',
      headers: { authorization: authHeader },
      body: form,
    });

    if (!proxyRes.ok) {
      const errorText = await proxyRes.text();
      console.error('Backend error:', errorText);
      return NextResponse.json(
        { success: false, error: 'Upload failed on backend' },
        { status: proxyRes.status }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error('Proxy upload exception:', e);
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
};
