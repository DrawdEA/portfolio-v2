import { NextResponse } from 'next/server';

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

async function getAccessToken() {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    throw new Error('Spotify credentials not configured');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      ).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to refresh token');
  }

  return response.json();
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken();

    // Try to get currently playing track
    const response = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (response.status === 204 || response.status > 400) {
      // No track currently playing, try recently played
      const recentResponse = await fetch(
        'https://api.spotify.com/v1/me/player/recently-played?limit=1',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (recentResponse.ok) {
        const data = await recentResponse.json();
        const track = data.items[0]?.track;
        
        if (!track) {
          return NextResponse.json({ isPlaying: false });
        }

        return NextResponse.json({
          isPlaying: false,
          title: track.name,
          artist: track.artists.map((a: any) => a.name).join(', '),
          album: track.album.name,
          albumImage: track.album.images[0]?.url,
          songUrl: track.external_urls.spotify,
        });
      }

      return NextResponse.json({ isPlaying: false });
    }

    const data = await response.json();
    const track = data.item;

    if (!track) {
      return NextResponse.json({ isPlaying: false });
    }

    return NextResponse.json({
      isPlaying: true,
      title: track.name,
      artist: track.artists.map((a: any) => a.name).join(', '),
      album: track.album.name,
      albumImage: track.album.images[0]?.url,
      songUrl: track.external_urls.spotify,
      progress: data.progress_ms,
      duration: track.duration_ms,
    });
  } catch (error: any) {
    console.error('Error fetching Spotify data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Spotify data', message: error.message },
      { status: 500 }
    );
  }
}

