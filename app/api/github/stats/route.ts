import { NextResponse } from 'next/server';

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'yourusername';

export async function GET() {
  try {
    // Fetch user profile
    const userResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!userResponse.ok) {
      throw new Error('Failed to fetch GitHub user data');
    }

    const userData = await userResponse.json();

    // Fetch user repositories to calculate stats
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    let reposData: any[] = [];
    if (reposResponse.ok) {
      reposData = await reposResponse.json();
    }

    // Calculate total stars
    const totalStars = reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);

    // Calculate languages used
    const languageMap = new Map<string, number>();
    for (const repo of reposData.slice(0, 10)) { // Check top 10 repos
      if (repo.language) {
        languageMap.set(repo.language, (languageMap.get(repo.language) || 0) + 1);
      }
    }
    const topLanguages = Array.from(languageMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([lang]) => lang);

    return NextResponse.json({
      username: userData.login,
      name: userData.name,
      bio: userData.bio,
      avatar: userData.avatar_url,
      followers: userData.followers,
      following: userData.following,
      publicRepos: userData.public_repos,
      totalStars,
      topLanguages,
      profileUrl: userData.html_url,
    });
  } catch (error: any) {
    console.error('Error fetching GitHub data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data', message: error.message },
      { status: 500 }
    );
  }
}

