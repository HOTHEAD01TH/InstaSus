import fetch from 'node-fetch';

interface InstagramMetadata {
  followers: number;
  following: number;
  posts: number;
  bio: string;
  captions: string[];
  imageUrl?: string;
}

export async function fetchInstagramData(username: string): Promise<InstagramMetadata> {
  try {
    console.log(`Fetching data for username: ${username}`);
    const response = await fetch(`https://www.instagram.com/${username}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1'
      },
      redirect: 'follow',
      follow: 10
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.status}`);
    }

    const data = await response.text();
    
    // Extract metadata from meta description tag
    const metaDescriptionRegex = /<meta content="([^"]*)" name="description"/;
    const metaMatch = data.match(metaDescriptionRegex);
    const metaDescription = metaMatch?.[1] || '';
    
    console.log('Meta description:', metaDescription);
    
    // Parse counts from meta description using more flexible regex
    const followerRegex = /(\d+(?:[,.]\d+)?[KM]?)\s*Followers/i;
    const followingRegex = /(\d+(?:[,.]\d+)?[KM]?)\s*Following/i;
    const postsRegex = /(\d+(?:[,.]\d+)?[KM]?)\s*Posts/i;
    
    const followerMatch = metaDescription.match(followerRegex);
    const followingMatch = metaDescription.match(followingRegex);
    const postsMatch = metaDescription.match(postsRegex);
    
    const parseCount = (str: string | undefined) => {
      if (!str) return 0;
      str = str.replace(/,/g, '');
      if (str.endsWith('K')) return parseFloat(str) * 1000;
      if (str.endsWith('M')) return parseFloat(str) * 1000000;
      return parseInt(str);
    };

    // Extract bio more reliably
    const bioRegex = /Posts - ([^@]+)(?=(?:\s*@|\s*&#064;|$))/;
    const bioMatch = metaDescription.match(bioRegex);
    
    const result = {
      followers: parseCount(followerMatch?.[1]) || 0,
      following: parseCount(followingMatch?.[1]) || 0,
      posts: parseCount(postsMatch?.[1]) || 0,
      bio: bioMatch?.[1]?.trim().replace(/&#\d+;/g, '') || 'No bio available',
      captions: [],
      imageUrl: data.match(/<meta property="og:image" content="([^"]*)"/)?.[1] || ''
    };
    
    // Validate the data
    if (result.followers === 0 && result.following === 0 && result.posts === 0) {
      console.warn('Warning: All metrics are zero, possible scraping issue');
      throw new Error('Failed to extract profile data');
    }
    
    console.log('Parsed Instagram data:', result);
    return result;
  } catch (error) {
    console.error('Error fetching Instagram data:', error);
    return {
      followers: 0,
      following: 0,
      posts: 0,
      bio: `Profile @${username} is private or not accessible`,
      captions: [],
      imageUrl: ''
    };
  }
}