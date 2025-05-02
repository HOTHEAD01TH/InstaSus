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
    const response = await fetch(`https://www.instagram.com/${username}/`);
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
      followers: parseCount(followerMatch?.[1]),
      following: parseCount(followingMatch?.[1]),
      posts: parseCount(postsMatch?.[1]),
      bio: bioMatch?.[1]?.trim().replace(/&#\d+;/g, '') || '',
      captions: [],
      imageUrl: data.match(/<meta property="og:image" content="([^"]*)"/)?.[1]
    };
    
    console.log('Parsed Instagram data:', result);
    return result;
  } catch (error) {
    console.error('Error fetching Instagram data:', error);
    throw new Error('Failed to fetch Instagram data');
  }
}