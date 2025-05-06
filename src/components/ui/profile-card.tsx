
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface ProfileCardProps {
  username: string;
  name?: string;
  bio?: string;
  followers?: number;
  following?: number;
  profilePicUrlHD?: string;
  posts?: number;
}

export function ProfileCard({ username, followers, following, bio, posts, profilePicUrlHD }: ProfileCardProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 1; // Number of retries before falling back

  useEffect(() => {
    // Reset retry count when profilePicUrlHD changes
    setRetryCount(0);
    
    if (profilePicUrlHD) {
      setImgSrc(profilePicUrlHD);
    }
  }, [profilePicUrlHD]);

  const handleImageError = () => {
    if (retryCount < maxRetries) {
      // Increment retry count
      setRetryCount(retryCount + 1);
      
      // Try one more time with the same URL
      // This helps with temporary network issues
      const timestamp = new Date().getTime();
      setImgSrc(`${profilePicUrlHD}?retry=${timestamp}`);
    } else {
      // After retry, use the UI Avatars fallback
      setImgSrc(`https://ui-avatars.com/api/?name=${username}&size=200`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <div className="text-center mb-4">
        {imgSrc ? (
          <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-gray-200">
            <img 
              src={imgSrc} 
              alt={`${username}'s profile`} 
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>
        ) : (
          <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-2xl border-2 border-gray-200">
            {username.charAt(0).toUpperCase()}
          </div>
        )}
        <h2 className="text-xl font-semibold">@{username}</h2>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center mb-4">
        <div>
          <div className="font-semibold">{followers !== undefined && followers >= 0 ? followers.toLocaleString() : 'N/A'}</div>
          <div className="text-sm text-gray-600">Followers</div>
        </div>
        <div>
          <div className="font-semibold">{following !== undefined && following >= 0 ? following.toLocaleString() : 'N/A'}</div>
          <div className="text-sm text-gray-600">Following</div>
        </div>
        <div>
          <div className="font-semibold">{posts !== undefined && posts >= 0 ? posts.toLocaleString() : 'N/A'}</div>
          <div className="text-sm text-gray-600">Posts</div>
        </div>
      </div>
      
      {bio && (
        <div className="text-sm text-gray-700 text-center">
          {bio}
        </div>
      )}
    </div>
  );
}
