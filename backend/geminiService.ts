import { GoogleGenAI } from "@google/genai";
import * as dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

interface InstagramMetadata {
  followers: number;
  following: number;
  posts: number;
  bio: string;
  captions: string[];
}

interface AnalysisResult {
  flag: 'red' | 'green';
  reasoning: string;
  messageOpener: string;
  redFlags: string[];
  greenFlags: string[];
}

// Update the API key initialization
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY is not set in environment variables');
  process.exit(1); // Exit the process if the API key is not available
}

const ai = new GoogleGenAI({ apiKey: apiKey });

async function analyzeRedFlags(profileData: InstagramMetadata): Promise<{ flag: 'red' | 'green'; reasoning: string; redFlags: string[]; greenFlags: string[] }> {
  const prompt = `
    Analyze this Instagram profile for red and green flags.
    Provide a balanced assessment based on these specific criteria:

    Profile Data:
    Followers: ${profileData.followers}
    Following: ${profileData.following}
    Posts: ${profileData.posts}
    Bio: ${profileData.bio}

    Assessment Criteria:
    RED FLAG indicators (multiple needed to mark as RED):
    - Extremely disproportionate follower ratios (e.g., 100:1)
    - Suspicious or misleading bio content
    - Very low post count with high followers
    - Signs of automated/bot behavior
    - Explicit content or scam indicators

    GREEN FLAG indicators:
    - Balanced follower-to-following ratio
    - Consistent posting history
    - Clear, authentic bio
    - Normal engagement patterns

    Respond in the following format only:
    Flag: [RED/GREEN]

    Key Points:
    - Point 1
    - Point 2
    - Point 3

    Red Flags:
    - [List specific red flags, or "No significant red flags detected" if none]

    Green Flags:
    - [List specific green flags, or "No significant green flags detected" if none]

    Note: Mark as RED only if multiple clear red flags are present. Default to GREEN unless there are strong reasons not to.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  const text = response.text;
  if (!text) throw new Error('Empty response from AI');
  
  const lines = text.split('\n').map(line => line.trim());
  const flag = lines.find(line => line.toLowerCase().includes('flag:'))?.toLowerCase().includes('red') ? 'red' : 'green';
  
  // Extract key points
  const keyPoints = lines
    .filter(line => line.startsWith('-'))
    .map(line => line.substring(1).trim());

  // Separate red and green flags
  let inRedFlags = false;
  let inGreenFlags = false;
  const redFlags: string[] = [];
  const greenFlags: string[] = [];
  
  for (const line of lines) {
    if (line.toLowerCase().includes('red flags:')) {
      inRedFlags = true;
      inGreenFlags = false;
      continue;
    }
    if (line.toLowerCase().includes('green flags:')) {
      inRedFlags = false;
      inGreenFlags = true;
      continue;
    }
    if (line.startsWith('-')) {
      if (inRedFlags) {
        redFlags.push(line.substring(1).trim());
      } else if (inGreenFlags) {
        greenFlags.push(line.substring(1).trim());
      }
    }
  }

  // If no flags were found, add default messages
  if (redFlags.length === 0) {
    redFlags.push('No red flags detected');
  }
  if (greenFlags.length === 0) {
    greenFlags.push('No green flags detected');
  }

  return {
    flag,
    reasoning: keyPoints.join('\n'),
    redFlags,
    greenFlags
  };
}

export async function analyzeProfile(profileData: InstagramMetadata): Promise<AnalysisResult> {
  try {
    const [flagAnalysis, opener] = await Promise.all([
      analyzeRedFlags(profileData),
      generateMessageOpener(profileData)
    ]);

    return {
      flag: flagAnalysis.flag,
      reasoning: flagAnalysis.reasoning,
      messageOpener: opener,
      redFlags: flagAnalysis.redFlags,
      greenFlags: flagAnalysis.greenFlags
    };
  } catch (error) {
    console.error("Error analyzing profile with Gemini:", error);
    throw new Error('Failed to analyze profile with AI');
  }
}

async function generateMessageOpener(profileData: InstagramMetadata): Promise<string> {
  const prompt = `
    Create an engaging message opener based on this Instagram profile:
    
    Followers: ${profileData.followers}
    Following: ${profileData.following}
    Posts: ${profileData.posts}
    Bio: ${profileData.bio}
    
    Generate a single, natural conversation starter that:
    1. Is friendly and casual
    2. References something specific from their profile
    3. Encourages a response
    4. Is 1-2 sentences maximum
    
    Respond with ONLY the message opener, no additional text or formatting.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return response.text?.trim() || '';
}
