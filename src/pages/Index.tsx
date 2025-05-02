
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { InstagramInput } from "@/components/ui/instagram-input";
import { FeatureCard } from "@/components/ui/feature-card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Flag, Search, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  
  const handleSubmit = (username: string) => {
    setUsername(username);
    // Use navigate instead of window.location
    navigate(`/redflag?username=${encodeURIComponent(username)}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-instagram-gradient">
                Instagram Profile Analysis
              </span>{" "}
              Powered by AI
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Analyze Instagram profiles for red flags and get AI-generated 
              conversation starters to make better connections.
            </p>

            <div className="flex flex-col items-center mb-12">
              <InstagramInput onSubmit={handleSubmit} />
              <p className="text-gray-500 mt-3 text-sm">
                Enter any Instagram username to get started
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button className="bg-redflag text-white hover:bg-redflag/90" asChild>
              <Link to="/redflag">Red Flag Detector</Link>
            </Button>
            <Button className="bg-greenflag text-white hover:bg-greenflag/90" asChild>
              <Link to="/message">Message Generator</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600">
              Our AI-powered tools analyze Instagram profiles to help you make better connections
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <FeatureCard
                icon={<Search />}
                title="Profile Analysis"
                description="Enter any Instagram username to analyze their profile data including bio, posts, and follower count."
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FeatureCard
                icon={<Flag />}
                title="Red Flag Detection"
                description="Our AI analyzes profiles to identify potential red flags and compatibility issues."
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FeatureCard
                icon={<MessageCircle />}
                title="Smart Message Openers"
                description="Get AI-generated conversation starters tailored to the specific profile."
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-8">
              Try our Instagram profile analyzer now and get personalized insights.
            </p>
            <Button className="bg-instagram-gradient text-white hover:opacity-90 px-8 py-6 text-lg" asChild>
              <Link to="/redflag">Analyze a Profile</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
