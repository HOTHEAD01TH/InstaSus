
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileCardProps {
  username: string;
  name?: string;
  bio?: string;
  followers?: number;
  following?: number;
  imageUrl?: string;
  posts?: number;
}

export function ProfileCard({ username, followers, following, bio, posts, imageUrl }: ProfileCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <div className="text-center mb-4">
        {imageUrl ? (
          <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-gray-200">
            <img 
              src={imageUrl} 
              alt={`${username}'s profile`} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${username}&size=200`;
              }}
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
          <div className="font-semibold">{followers > 0 ? followers.toLocaleString() : 'N/A'}</div>
          <div className="text-sm text-gray-600">Followers</div>
        </div>
        <div>
          <div className="font-semibold">{following > 0 ? following.toLocaleString() : 'N/A'}</div>
          <div className="text-sm text-gray-600">Following</div>
        </div>
        <div>
          <div className="font-semibold">{posts > 0 ? posts.toLocaleString() : 'N/A'}</div>
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
