
import Layout from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-4">
              Last updated: May 1, 2025
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy describes how InstaSus ("we", "us", or "our") collects, uses, 
              and shares your information when you use our website and services.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">2. Information We Collect</h2>
            <p>
              When you use our service, we may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Instagram usernames you submit for analysis</li>
              <li>Public information from Instagram profiles you analyze</li>
              <li>Log data and usage statistics</li>
              <li>Device and browser information</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">3. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide and improve our services</li>
              <li>Generate analysis results and message openers</li>
              <li>Monitor and analyze usage and trends</li>
              <li>Protect the security of our users and services</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">4. Data Retention</h2>
            <p>
              We do not permanently store the Instagram profile data you analyze. 
              This data is processed temporarily to generate results and is then deleted.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">5. Third-Party Services</h2>
            <p>
              Our service integrates with third-party APIs and services, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Gemini AI for analysis and content generation</li>
              <li>Analytics providers to understand user behavior</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">6. Security</h2>
            <p>
              We implement reasonable security measures to protect your information. 
              However, no internet transmission is completely secure.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. 
              We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              privacy@InstaSus.example.com
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
