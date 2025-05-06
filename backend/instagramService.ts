import { ApifyClient } from 'apify-client';
import * as dotenv from 'dotenv';
import { MongoClient, Collection } from 'mongodb';

// Ensure environment variables are loaded
dotenv.config();

interface InstagramMetadata {
  followers: number;
  following: number;
  posts: number;
  bio: string;
  captions: string[];
  profilePicUrlHD?: string;
  username: string;
  timestamp?: Date;
}

// Get environment variables
const APIFY_API_KEY = process.env.APIFY_API_KEY;
const MONGODB_URI = process.env.MONGODB_URI;

// Check if environment variables are set
if (!APIFY_API_KEY) {
  console.error('APIFY_API_KEY is not set in environment variables');
  process.exit(1);
}

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set in environment variables');
  process.exit(1);
}

// Initialize the ApifyClient with API token from environment
const client = new ApifyClient({
  token: APIFY_API_KEY,
});

// MongoDB connection
let mongoClient: MongoClient | null = null;
let profileCollection: Collection | null = null;

async function connectToMongoDB() {
  if (!mongoClient) {
    mongoClient = new MongoClient(MONGODB_URI!);
    await mongoClient.connect();
    const db = mongoClient.db('instagram-profiles');
    profileCollection = db.collection('profiles');
    console.log('Connected to MongoDB');
  }
  return profileCollection;
}

// Save profile data to MongoDB asynchronously
async function saveProfileToMongoDB(profileData: InstagramMetadata) {
  // Create a copy of the data to avoid modifying the original object
  const dataToSave = { ...profileData };
  
  // Start the MongoDB save operation without awaiting it
  connectToMongoDB().then(collection => {
    // Add timestamp
    dataToSave.timestamp = new Date();
    
    // Check if profile already exists and update it, or insert new
    collection!.updateOne(
      { username: dataToSave.username },
      { $set: dataToSave },
      { upsert: true }
    ).then(() => {
      console.log(`Profile saved to MongoDB: ${dataToSave.username}`);
    }).catch(error => {
      console.error('Error saving to MongoDB:', error);
    });
  }).catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
}

export async function fetchInstagramData(username: string): Promise<InstagramMetadata> {
  try {
    console.log(`Fetching data for username: ${username}`);
    
    // Prepare Actor input
    const input = {
      "directUrls": [
        `https://www.instagram.com/${username}/`
      ],
      "resultsType": "details",
      "resultsLimit": 1,
      "searchType": "user",
      "searchLimit": 1,
      "addParentData": true
    };

    // Run the Actor and wait for it to finish
    const run = await client.actor("shu8hvrXbJbY3Eb9W").call(input);

    // Fetch Actor results from the run's dataset
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    
    if (!items || items.length === 0) {
      throw new Error('No profile data returned from Apify');
    }
    
    const profileData = items[0];
    console.log('Apify returned profile data:', profileData);
    

    // Extract captions if the profile is not private
    const captions: string[] = [];
    
    if (!profileData.private) {
      // Only fetch posts if the profile is not private
      try {
        const postsInput = {
          "directUrls": [
            `https://www.instagram.com/${username}/`
          ],
          "resultsType": "posts",
          "resultsLimit": 100, // Fetch up to 100 posts
          "searchType": "user",
          "searchLimit": 1,
          "addParentData": true
        };
        
        const postsRun = await client.actor("shu8hvrXbJbY3Eb9W").call(postsInput);
        const postsDataset = await client.dataset(postsRun.defaultDatasetId).listItems();
        
        if (postsDataset.items && postsDataset.items.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          postsDataset.items.forEach((post: any) => {
            if (post.caption) {
              captions.push(post.caption);
            }
          });
        }
      } catch (error) {
        console.warn('Error fetching posts:', error);
        // Continue with profile data even if posts fetch fails
      }
    }
    
    // Make sure we have proper values for counts, using the correct field names from the API response
    const followersCount = profileData.followersCount || 0;
    const followingCount = profileData.followsCount || 0; // API returns followsCount, not followingCount
    const postsCount = profileData.postsCount || 0;
    
    // Extract the relevant data from the Apify response
    const result: InstagramMetadata = {
      username: username,
      followers: Number(followersCount),
      following: Number(followingCount),
      posts: Number(postsCount),
      bio: String(profileData.biography || 'No bio available'),
      captions: captions.slice(0, 20), // Only top 20 captions for Gemini
      profilePicUrlHD: String(profileData.profilePicUrl || profileData.profilePicUrlHD || '')
    };
    
    // Save the profile data to MongoDB asynchronously (don't await)
    saveProfileToMongoDB({
      ...result,
      captions: captions // Save all captions to MongoDB
    });
    
    console.log('Parsed Instagram data:', result);
    return result;
  } catch (error) {
    console.error('Error fetching Instagram data:', error);
    return {
      username: username,
      followers: 0,
      following: 0,
      posts: 0,
      bio: `Profile @${username} is private or not accessible`,
      captions: [],
      profilePicUrlHD: ''
    };
  }
}