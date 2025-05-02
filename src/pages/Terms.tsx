
import Layout from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-4">
              Last updated: May 1, 2025
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">1. Agreement</h2>
            <p>
              By accessing or using InstaSus, you agree to be bound by these Terms of Service. 
              If you disagree with any part of the terms, you may not access the service.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">2. Services</h2>
            <p>
              InstaSus provides AI-powered analysis of Instagram profiles to detect potential 
              red flags and generate conversation starters. Our services are for informational 
              purposes only.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">3. Use of the Service</h2>
            <p>
              You agree to use our service responsibly and in accordance with all applicable laws. 
              Prohibited uses include:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Harassment or stalking of individuals</li>
              <li>Illegal or unauthorized data collection</li>
              <li>Attempting to compromise the security of our service</li>
              <li>Using our service to harm others</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">4. Limitations</h2>
            <p>
              Our analyses are provided for informational purposes only and should not be the 
              sole basis for making decisions about personal relationships or interactions. 
              We make no guarantees about the accuracy of our results.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">5. Intellectual Property</h2>
            <p>
              All content on this service, including text, graphics, logos, and software, 
              is the property of InstaSus or its content suppliers and is protected by 
              intellectual property laws.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">6. Termination</h2>
            <p>
              We may terminate or suspend access to our service immediately, without prior 
              notice or liability, for any reason, including without limitation if you breach 
              the Terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">7. Limitation of Liability</h2>
            <p>
              In no event shall InstaSus, nor its directors, employees, partners, agents, 
              suppliers, or affiliates, be liable for any indirect, incidental, special, 
              consequential, or punitive damages.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">8. Changes</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. By continuing 
              to access or use our service after those revisions become effective, you agree 
              to be bound by the revised terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
              terms@InstaSus.example.com
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
