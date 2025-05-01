
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { InstagramInput } from "@/components/ui/instagram-input";
import { ProfileCard } from "@/components/ui/profile-card";
import { ResultCard } from "@/components/ui/result-card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle } from "lucide-react";

interface ProfileData {
  username: string;
  name?: string;
  bio?: string;
  followers?: number;
  following?: number;
  imageUrl?: string;
}

interface MessageResult {
  messages: string[];
  explanation: string;
}

const MessageOpener = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialUsername = queryParams.get("username") || "";
  
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [messageResult, setMessageResult] = useState<MessageResult | null>(null);

  const analyzeProfile = async (username: string) => {
    setLoading(true);
    setProfileData(null);
    setMessageResult(null);

    try {
      // This is a mock implementation. In a real application, you would:
      // 1. Call an API to scrape the Instagram data
      // 2. Send that data to Gemini AI for analysis
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate profile data retrieval
      const mockProfileData: ProfileData = {
        username,
        name: username.charAt(0).toUpperCase() + username.slice(1),
        bio: "Travel enthusiast 🌍 | Food lover 🍕 | Dog parent 🐶 | Based in NYC",
        followers: Math.floor(Math.random() * 10000),
        following: Math.floor(Math.random() * 1000),
      };
      setProfileData(mockProfileData);

      // Simulate AI analysis delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate AI-generated message openers
      const mockMessages: MessageResult = {
        messages: [
          "Hey there! I noticed you're also a dog parent in NYC. Any favorite dog-friendly spots you'd recommend? My Golden Retriever is always looking for new adventures!",
          "Your travel photos are amazing! I'm planning a trip to Italy next month - I noticed you were there recently. Any hidden gems you discovered that aren't in the typical guidebooks?",
          "That pizza place you tagged in your last post looks incredible! Is it as good as it looks? Always on the hunt for great food recommendations in the city."
        ],
        explanation: "These openers are personalized based on shared interests found in the profile bio (travel, food, dogs, NYC location) and would likely lead to engaging conversations."
      };
      setMessageResult(mockMessages);
      
      toast({
        title: "Generation Complete",
        description: "Message openers have been generated successfully",
      });
    } catch (error) {
      console.error("Error generating messages:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate message openers. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Message copied to clipboard",
    });
  };

  // If a username was provided in the URL, analyze it automatically
  useState(() => {
    if (initialUsername) {
      analyzeProfile(initialUsername);
    }
  });

  return (
    <Layout>
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Instagram Message Opener Generator
            </motion.h1>
            <motion.p 
              className="text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Generate personalized conversation starters based on Instagram profiles.
            </motion.p>
          </div>

          <div className="flex justify-center mb-12">
            <InstagramInput 
              onSubmit={analyzeProfile} 
              loading={loading}
              placeholder="Enter Instagram username..."
            />
          </div>

          {loading && (
            <div className="max-w-2xl mx-auto text-center">
              <div className="animate-pulse p-6 bg-white rounded-lg border shadow-sm">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded max-w-[80%] mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded max-w-[60%] mx-auto"></div>
              </div>
            </div>
          )}

          {profileData && (
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <ProfileCard {...profileData} />
              </div>
              
              <div className="md:col-span-2">
                {messageResult && (
                  <div className="space-y-6">
                    <ResultCard
                      title="About These Openers"
                      result={messageResult.explanation}
                    />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Message Openers</h3>
                      {messageResult.messages.map((message, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          className="bg-white rounded-lg border shadow-sm p-4 flex flex-col"
                        >
                          <p className="mb-3 text-gray-800">{message}</p>
                          <div className="self-end">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => copyToClipboard(message)}
                            >
                              Copy
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default MessageOpener;
