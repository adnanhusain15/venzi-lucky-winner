import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const tokenResponse = await axios.post(
      'https://api.typeform.com/oauth/token',
      {
        grant_type: 'authorization_code',
        code,
        client_id: process.env.TYPEFORM_CLIENT_ID,
        client_secret: process.env.TYPEFORM_CLIENT_SECRET,
        redirect_uri: process.env.TYPEFORM_REDIRECT_URI,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, refresh_token } = tokenResponse.data;

    // Here, you should securely store the access_token and refresh_token
    // For this example, we'll just return them to the client
    return NextResponse.json({ access_token, refresh_token });
  } catch (error) {
    console.error('Error exchanging code for token:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to exchange code for token' }, { status: 500 });
  }
}