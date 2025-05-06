# InstaSus - Instagram Profile Analyzer

<div align="center">
  <img src="/public/instagram.png" alt="InstaSus Logo" width="120" />
  <h3>AI-Powered Instagram Profile Analysis</h3>
</div>

## 🚀 Features

- **Red Flag Detection**: Analyze Instagram profiles for potential red flags using advanced AI
- **Message Opener Generator**: Create personalized conversation starters based on profile data
- **Profile Analysis**: Get detailed insights about follower ratios, posting patterns, and bio content
- **Real-time Processing**: Instant analysis using Google's Gemini AI technology
- **Data Persistence**: All analyzed profiles are stored in MongoDB for faster repeat analysis
- **Reliable Scraping**: Uses Apify's robust Instagram scraper to reliably fetch profile data

## 🛠️ Tech Stack

- Frontend:
  - React + TypeScript
  - Tailwind CSS
  - Shadcn UI
  - Framer Motion
  - Vite

- Backend:
  - Node.js
  - Express
  - Google Gemini AI
  - Apify Instagram Scraper
  - MongoDB

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API Key
- Apify API Key
- MongoDB Connection URI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/HOTHEAD01TH/InstaSus.git
cd InstaSus
```

2. Install dependencies for both frontend and backend:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add your API keys and MongoDB connection string:
```env
GEMINI_API_KEY=your_gemini_api_key_here
APIFY_API_KEY=your_apify_api_key_here
MONGODB_URI=your_mongodb_connection_string_here
```

4. Start the development servers:

```bash
# Start backend server (in backend directory)
npm run dev

# Start frontend server (in root directory)
npm run dev
```

## 🌟 Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Enter an Instagram username to analyze
3. View the analysis results including:
   - Red/Green flags
   - Profile insights
   - Suggested conversation starters

## 💾 Data Storage

The application stores analyzed Instagram profiles in MongoDB for:
- Faster repeat analysis of previously viewed profiles
- Preserving all post captions for comprehensive data analysis
- Reducing API calls to external services

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Made with ❤️ by [Zaid](https://github.com/HOTHEAD01TH)