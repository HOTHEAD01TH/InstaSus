import * as dotenv from 'dotenv';
// Load environment variables before any other imports
dotenv.config();

import express from 'express';
import cors from 'cors';
import { analyzeProfile } from './geminiService.js';
import { fetchInstagramData } from './instagramService.js';

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS to allow requests from frontend
app.use(cors({
  origin: ['http://localhost:8080', 'https://redflagdetector.vercel.app','https://instasus.vercel.app'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Instagram profile analysis endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const profileData = await fetchInstagramData(username);
    const analysis = await analyzeProfile(profileData);
    
    // Include the profile data in the response
    res.json({
      ...analysis,
      followers: profileData.followers,
      following: profileData.following,
      posts: profileData.posts,
      bio: profileData.bio,
      imageUrl: profileData.imageUrl
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze profile' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});