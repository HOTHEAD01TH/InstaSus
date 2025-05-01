
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileCardProps {
  username: string;
  name?: string;
  bio?: string;
  followers?: number;
  following?: number;
  imageUrl?: string;
}

export function ProfileCard({ 
  username, 
  name, 
  bio, 
  followers, 
  following,
  imageUrl
}: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border border-gray-200 shadow-sm">
        <CardHeader className="pb-2 pt-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-gray-200">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={`${username}'s profile`} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400">
                  @{username.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <CardTitle className="text-xl">{name || `@${username}`}</CardTitle>
              <CardDescription className="text-sm text-gray-500">@{username}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {bio && (
            <div className="mb-4">
              <p className="text-sm text-gray-700">{bio}</p>
            </div>
          )}
          <div className="flex items-center justify-between border-t pt-3">
            <div className="text-center">
              <p className="text-sm font-medium">Followers</p>
              <p className="text-lg font-semibold">{followers?.toLocaleString() || "N/A"}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">Following</p>
              <p className="text-lg font-semibold">{following?.toLocaleString() || "N/A"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
