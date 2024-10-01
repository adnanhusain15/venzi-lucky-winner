import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.TYPEFORM_CLIENT_ID;
  const redirectUri = process.env.TYPEFORM_REDIRECT_URI;
  const scope = 'forms:read responses:read';

  const authorizeUrl = `https://api.typeform.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

  return NextResponse.redirect(authorizeUrl);
}