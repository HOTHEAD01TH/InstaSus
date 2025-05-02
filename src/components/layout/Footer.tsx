
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-instagram-gradient" />
              <span className="text-lg font-bold bg-clip-text text-transparent bg-instagram-gradient">
                InstaSus
              </span>
            </div>
            <p className="text-gray-600 max-w-md">
              Make better connections on Instagram with AI-powered conversation starters 
              and profile analysis.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link to="/redflag" className="text-gray-600 hover:text-primary">Red Flag Detector</Link></li>
              <li><Link to="/message" className="text-gray-600 hover:text-primary">Message Opener</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-primary">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-primary">About</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} InstaSus. All rights reserved.</p>
          {/* Add this before the closing section tag */}
<div className="text-center text-gray-600 mt-12">
  Made with ❤️ by <a href="https://github.com/HOTHEAD01TH" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Zaid</a>
</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
