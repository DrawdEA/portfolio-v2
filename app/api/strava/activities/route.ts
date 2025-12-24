import { NextResponse } from 'next/server';

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const STRAVA_REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;

async function getAccessToken() {
  if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
    throw new Error('Strava credentials not configured');
  }

  // First, try to refresh the token
  const response = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      refresh_token: STRAVA_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to refresh token');
  }

  return response.json();
}

function formatDistance(distance: number, unit: 'metric' | 'imperial' = 'metric'): string {
  if (unit === 'imperial') {
    const miles = distance / 1609.34;
    return `${miles.toFixed(1)} mi`;
  }
  const km = distance / 1000;
  return `${km.toFixed(1)} km`;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

function formatPace(seconds: number, distance: number, unit: 'metric' | 'imperial' = 'metric'): string {
  if (distance === 0) return '--';
  
  if (unit === 'imperial') {
    const paceSecondsPerMile = (seconds / distance) * 1609.34;
    const minutes = Math.floor(paceSecondsPerMile / 60);
    const secs = Math.floor(paceSecondsPerMile % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')} /mi`;
  }
  
  const paceSecondsPerKm = (seconds / distance) * 1000;
  const minutes = Math.floor(paceSecondsPerKm / 60);
  const secs = Math.floor(paceSecondsPerKm % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')} /km`;
}

export async function GET() {
  try {
    console.log('Strava API: Starting request...');
    console.log('Strava API: Client ID exists:', !!STRAVA_CLIENT_ID);
    console.log('Strava API: Client Secret exists:', !!STRAVA_CLIENT_SECRET);
    console.log('Strava API: Refresh Token exists:', !!STRAVA_REFRESH_TOKEN);

    const { access_token } = await getAccessToken();
    console.log('Strava API: Got access token:', !!access_token);

    // Get recent activities
    const response = await fetch(
      'https://www.strava.com/api/v3/athlete/activities?per_page=1',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log('Strava API: Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Strava API: Error response:', errorText);
      throw new Error(`Failed to fetch activities: ${response.status} ${errorText}`);
    }

    const activities = await response.json();
    console.log('Strava API: Activities received:', activities?.length || 0);
    console.log('Strava API: Activities data:', JSON.stringify(activities, null, 2));

    if (!activities || activities.length === 0) {
      console.log('Strava API: No activities found');
      return NextResponse.json({ 
        hasActivity: false,
        message: 'No recent activities',
        debug: { activitiesCount: 0 }
      });
    }

    const activity = activities[0];
    console.log('Strava API: Processing activity:', activity.id, activity.name, activity.type);
    
    const activityType = activity.type?.toLowerCase() || 'activity';
    
    // Get activity type emoji/icon
    const typeIcons: Record<string, string> = {
      run: '🏃',
      ride: '🚴',
      walk: '🚶',
      hike: '🥾',
      swim: '🏊',
      workout: '💪',
    };
    const typeIcon = typeIcons[activityType] || '🏃';

    const result = {
      hasActivity: true,
      id: activity.id,
      name: activity.name,
      type: activity.type,
      typeIcon,
      distance: activity.distance,
      distanceFormatted: formatDistance(activity.distance),
      movingTime: activity.moving_time,
      durationFormatted: formatDuration(activity.moving_time),
      paceFormatted: formatPace(activity.moving_time, activity.distance),
      elevationGain: activity.total_elevation_gain,
      elevationFormatted: activity.total_elevation_gain 
        ? `${(activity.total_elevation_gain / 1000).toFixed(1)} km` 
        : null,
      startDate: activity.start_date,
      startDateLocal: activity.start_date_local,
      map: activity.map,
      activityUrl: `https://www.strava.com/activities/${activity.id}`,
    };

    console.log('Strava API: Returning result:', JSON.stringify(result, null, 2));
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Strava API: Error caught:', error);
    console.error('Strava API: Error message:', error.message);
    console.error('Strava API: Error stack:', error.stack);
    return NextResponse.json(
      { 
        error: 'Failed to fetch Strava data', 
        message: error.message,
        debug: {
          hasClientId: !!STRAVA_CLIENT_ID,
          hasClientSecret: !!STRAVA_CLIENT_SECRET,
          hasRefreshToken: !!STRAVA_REFRESH_TOKEN,
        }
      },
      { status: 500 }
    );
  }
}

