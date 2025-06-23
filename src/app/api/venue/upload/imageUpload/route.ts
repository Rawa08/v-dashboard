import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const form = await req.formData();
  const baseUrl = process.env.NEXT_PUBLIC_SERVICES_BASE_URL;
  const proxy = await fetch(`${baseUrl}/venue/imageUpload`, {
    method: 'POST',
    body: form,
  });
  if (!proxy.ok) return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  const result = await proxy.json();
  return NextResponse.json(result);
}
