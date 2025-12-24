import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.STRAVA_CLIENT_ID;
  const redirectUri = process.env.NODE_ENV === 'production' 
    ? 'https://diesta.dev/api/strava/callback'
    : 'http://127.0.0.1:3000/api/strava/callback';

  if (!clientId) {
    return NextResponse.json(
      { error: 'STRAVA_CLIENT_ID not configured' },
      { status: 500 }
    );
  }

  // Generate authorization URL with activity:read scope
  const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=activity:read&approval_prompt=force`;

  return NextResponse.json({
    authorization_url: authUrl,
    message: 'Visit the authorization_url above to re-authorize with activity:read permissions. After authorization, copy the refresh_token from the callback response.',
    instructions: [
      '1. Open the authorization_url in your browser',
      '2. Authorize the app with activity:read permissions',
      '3. You will be redirected to the callback URL',
      '4. Copy the refresh_token from the response',
      '5. Update STRAVA_REFRESH_TOKEN in your .env.local file',
    ],
  });
}

