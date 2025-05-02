
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const About = () => {
  return (
    <Layout hideFooter={true}>
      <section className="py-12 md:py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto"> {/* Increased max width */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-center mb-6">
                <img src="/instagram.png" alt="InstaSus" className="w-16 h-16" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-instagram-gradient">
                About InstaSus
              </h1>
              <p className="text-xl text-gray-700">
                Your AI-Powered Instagram Profile Analyzer
              </p>
            </motion.div>

            <motion.div
              className="mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4">
                    InstaSus is an innovative tool designed to help users navigate 
                    the social landscape of Instagram with confidence and clarity.
                  </p>
                  
                  <p className="mb-4">
                    Our platform utilizes advanced AI technology to analyze Instagram profiles, 
                    identifying potential compatibility issues or red flags while also generating 
                    tailored conversation starters to help you connect with others.
                  </p>
                  
                  <p>
                    Whether you're looking to vet a potential date, network with industry peers, 
                    or simply start meaningful conversations, InstaSus provides the insights 
                    you need to make informed decisions.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold mb-6">How It Works</h2>
              
              <div className="space-y-4">
                <Card className="overflow-hidden">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-2">1. Profile Analysis</h3>
                    <p className="text-gray-700">
                      Enter any Instagram username to analyze. Our system collects publicly available 
                      data from the profile including bio, follower/following ratio, post frequency, 
                      and caption content.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-2">2. AI Processing</h3>
                    <p className="text-gray-700">
                      The collected data is processed by Gemini AI, which identifies patterns 
                      and characteristics that might indicate potential red flags or positive traits.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-2">3. Personalized Results</h3>
                    <p className="text-gray-700">
                      Receive a detailed analysis including potential red/green flags, compatibility 
                      assessment, and customized conversation starters tailored to the specific profile.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is this app safe to use?</AccordionTrigger>
                  <AccordionContent>
                    Yes! InstaSus only analyzes publicly available information from Instagram 
                    profiles. We don't store any user data permanently, and all analyses are 
                    performed securely using advanced encryption.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>How accurate are the red flag detections?</AccordionTrigger>
                  <AccordionContent>
                    Our AI model has been trained on a wide range of social media patterns, but 
                    it's important to note that results should be taken as suggestions rather than 
                    definitive assessments. Always use your own judgment when interacting with 
                    others online.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can the person know I analyzed their profile?</AccordionTrigger>
                  <AccordionContent>
                    No. The analysis is completely private and the Instagram user will not be 
                    notified or aware that their profile has been analyzed through our service.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>Do I need an Instagram account to use this?</AccordionTrigger>
                  <AccordionContent>
                    No, you don't need an Instagram account to use InstaSus. You only need 
                    to know the username of the profile you want to analyze.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </div>
        </div>
        {/* Add this before the closing section tag */}
<div className="text-center text-gray-600 mt-12">
  Made with ❤️ by <a href="https://github.com/HOTHEAD01TH" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Zaid</a>
</div>
      </section>
    </Layout>
  );
};

export default About;



