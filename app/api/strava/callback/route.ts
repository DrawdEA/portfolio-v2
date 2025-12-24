import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: 'No authorization code' }, { status: 400 });
  }

  try {
    const clientId = process.env.STRAVA_CLIENT_ID;
    const clientSecret = process.env.STRAVA_CLIENT_SECRET;
    const redirectUri = process.env.NODE_ENV === 'production' 
      ? 'https://diesta.dev/api/strava/callback'
      : 'http://127.0.0.1:3000/api/strava/callback';

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: 'Strava credentials not configured' },
        { status: 500 }
      );
    }

    // Exchange code for tokens
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        grant_type: 'authorization_code',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to get tokens', details: data },
        { status: 400 }
      );
    }

    // Return the tokens - you'll copy the refresh_token from here
    return NextResponse.json({
      success: true,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_at,
      athlete: data.athlete,
      message: '✅ Success! Copy the refresh_token value below and add it to your .env.local file as STRAVA_REFRESH_TOKEN',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to exchange code' },
      { status: 500 }
    );
  }
}

