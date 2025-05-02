
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { InstagramInput } from "@/components/ui/instagram-input";
import { ProfileCard } from "@/components/ui/profile-card";
import { ResultCard } from "@/components/ui/result-card";
import { useToast } from "@/hooks/use-toast";
import { Flag } from "lucide-react";

interface ProfileData {
  username: string;
  name?: string;
  bio?: string;
  followers?: number;
  following?: number;
  imageUrl?: string;
}

interface AnalysisResult {
  redFlags: string[];
  greenFlags: string[];
  summary: string;
  isRedFlag: boolean;
}

const RedFlagDetector = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialUsername = queryParams.get("username") || "";
  
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalysis = async (username: string) => {
    setLoading(true);
    setProfileData(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:3000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze profile');
      }

      const analysis = await response.json();
      
      setProfileData({
        username,
        name: username,
        bio: analysis.bio,
        followers: analysis.followers,
        following: analysis.following,
      });

      setResult({
        isRedFlag: analysis.flag === 'red',
        redFlags: analysis.redFlags || ['No red flags detected'],
        greenFlags: analysis.greenFlags || ['No green flags detected'],
        summary: analysis.reasoning
      });
      
      toast({
        title: "Analysis Complete",
        description: "Profile has been successfully analyzed",
      });
    } catch (error) {
      console.error("Error analyzing profile:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to analyze the profile. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // If a username was provided in the URL, analyze it automatically
  useState(() => {
    if (initialUsername) {
      handleAnalysis(initialUsername);  // Changed from analyzeProfile to handleAnalysis
    }
  });

  return (
    <Layout hideFooter={true}>
      <section className="bg-gradient-to-b from-red-50 to-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Instagram Red Flag Detector
            </motion.h1>
            <motion.p 
              className="text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Analyze any Instagram profile to identify potential red flags and compatibility issues.
            </motion.p>
          </div>

          <div className="flex justify-center mb-12">
            <InstagramInput 
              onSubmit={handleAnalysis}
              loading={loading}
              placeholder="Enter Instagram username to analyze..."
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
              
              <div className="md:col-span-2 flex flex-col space-y-6">
                {result && (
                  <>
                    <ResultCard
                      title="Analysis Results"
                      icon={<Flag size={18} />}
                      result={result.summary}
                      variant={result.isRedFlag ? "red" : "green"}
                    />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <ResultCard
                        title="Red Flags"
                        result={result.redFlags.map((flag, i) => (
                          <div key={i} className="mb-2 text-sm">
                            • {flag}
                          </div>
                        ))}
                        variant="red"
                      />
                      
                      <ResultCard
                        title="Green Flags"
                        result={result.greenFlags.map((flag, i) => (
                          <div key={i} className="mb-2 text-sm">
                            • {flag}
                          </div>
                        ))}
                        variant="green"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default RedFlagDetector;
