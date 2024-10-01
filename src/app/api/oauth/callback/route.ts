import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect('/error?message=No_code_provided');
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

    const { access_token } = tokenResponse.data;

    // Redirect back to the home page with the access token
    return NextResponse.redirect(`/?access_token=${access_token}`);
  } catch (error) {
    console.error('Error exchanging code for token:', error.response?.data || error.message);
    return NextResponse.redirect('/error?message=Failed_to_exchange_code_for_token');
  }
}