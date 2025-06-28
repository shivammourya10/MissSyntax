# MissSyntax - AI Coding Assistant Chat Application 💻💕

A beautiful, modern chat application featuring Miss Syntax, your AI girlfriend who helps with coding and emotional support. Built with React frontend and Express backend, powered by Google's Gemini AI.

![MissSyntax Demo](https://via.placeholder.com/800x400/667eea/ffffff?text=MissSyntax+Chat+Interface)

## 🌟 Features

- **Beautiful UI/UX** - Glassmorphism design with colorful gradients
- **Real-time Chat** - Smooth typing animations and loading states
- **Code Highlighting** - Syntax highlighting with copy-to-clipboard functionality
- **Responsive Design** - Works perfectly on all devices
- **AI-Powered** - Powered by Google's Gemini AI model
- **Emotional Support** - Combines coding help with relationship advice

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest version with modern hooks
- **Material-UI (MUI)** - Component library for consistent design
- **Vite** - Fast build tool and dev server
- **React Syntax Highlighter** - Code syntax highlighting
- **Emotion** - CSS-in-JS styling solution

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **Google Generative AI** - AI model integration
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Development Tools
- **ESLint** - Code linting and formatting
- **Git** - Version control
- **npm** - Package management

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Google Generative AI API Key** - [Get it here](https://aistudio.google.com/app/apikey)
- **Git** - [Download here](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/MissSyntax.git
cd MissSyntax
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create .env file
touch .env
```

**Create `.env` file in Backend directory:**
```env
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key_here
PORT=3000
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd Frontend

# Install dependencies
npm install

# Create .env file
touch .env
```

**Create `.env` file in Frontend directory:**
```env
VITE_API_ASK_URL=http://localhost:3000/api/ask
```

## 🔑 Environment Variables

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `GOOGLE_GENAI_API_KEY` | Your Google Gemini AI API key | `AIzaSyC...` |
| `PORT` | Backend server port | `3000` |

### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_ASK_URL` | Backend API endpoint | `http://localhost:3000/api/ask` |

## 🏃‍♂️ Running the Project

### Step 1: Start the Backend Server

```bash
# From Backend directory
cd Backend
npm start
```

You should see:
```
Server running at http://localhost:3000 💕
```

### Step 2: Start the Frontend Development Server

```bash
# Open new terminal and navigate to Frontend directory
cd Frontend
npm run dev
```

You should see:
```
  VITE v7.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Step 3: Open Your Browser

Navigate to `http://localhost:5173` to see the application running!

## 📁 Project Structure

```
MissSyntax/
├── Backend/
│   ├── .env                     # Environment variables
│   ├── package.json            # Backend dependencies
│   └── controller/
│       └── miss_heart.js       # Main server file
├── Frontend/
│   ├── .env                    # Environment variables
│   ├── package.json           # Frontend dependencies
│   ├── index.html             # HTML template
│   ├── vite.config.js         # Vite configuration
│   └── src/
│       ├── App.jsx            # Main App component
│       ├── main.jsx           # React entry point
│       ├── components/
│       │   ├── Chat.jsx       # Main chat interface
│       │   ├── Message.jsx    # Message component
│       │   └── InputBox.jsx   # Input component
│       ├── assets/
│       │   ├── girl_dp.png    # Avatar image
│       │   └── Miss_Syntax_icon.png
│       └── styles/
│           ├── App.css
│           └── index.css
└── README.md
```

## 🎨 Features in Detail

### 1. **Modern UI Design**
- Glassmorphism effects with backdrop blur
- Colorful gradient backgrounds
- Smooth animations and transitions
- Custom scrollbars and hover effects

### 2. **Smart Chat Interface**
- WhatsApp-like header with avatar
- Typing indicators during API calls
- Message bubbles with different colors for user/bot
- Auto-scroll to latest messages

### 3. **Code Support**
- Syntax highlighting for multiple languages
- Copy-to-clipboard functionality
- Proper code formatting and display
- Inline code highlighting

### 4. **AI Integration**
- Google Gemini AI model
- Contextual responses for coding and relationships
- Error handling and fallback messages
- Customizable system instructions

## 🔧 Development Scripts

### Backend
```bash
npm start          # Start production server
```

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🚀 Production Deployment

### Backend Deployment (Railway/Heroku/DigitalOcean)

1. **Environment Variables:**
   ```env
   GOOGLE_GENAI_API_KEY=your_api_key
   PORT=3000
   ```

2. **Build Command:** `npm install`
3. **Start Command:** `npm start`

### Frontend Deployment (Vercel/Netlify)

1. **Environment Variables:**
   ```env
   VITE_API_ASK_URL=https://your-backend-domain.com/api/ask
   ```

2. **Build Command:** `npm run build`
3. **Output Directory:** `dist`

## 🐛 Common Issues & Solutions

### Issue: "process is not defined"
**Solution:** Make sure you're using `import.meta.env.VITE_*` instead of `process.env.*` in Vite

### Issue: CORS errors
**Solution:** Backend already includes CORS middleware. Ensure backend is running on correct port.

### Issue: Environment variables not loading
**Solution:** 
- Restart dev server after creating .env files
- Ensure variables start with `VITE_` in frontend
- Check file is named exactly `.env` (not `.env.txt`)

### Issue: API not connecting
**Solution:** 
- Verify backend is running on port 3000
- Check network tab in browser dev tools
- Ensure API URL in frontend .env matches backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google for the Gemini AI API
- Material-UI team for the beautiful components
- React and Vite teams for the amazing developer experience
- The open-source community for the incredible tools

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Common Issues](#-common-issues--solutions) section
2. Open an issue on GitHub
3. Check the browser console for error messages
4. Ensure all environment variables are set correctly

---

**Made with ❤️ by [Shivam Mourya]**

## IN Action
![alt text](Action1.png) ![alt text](Action2.png)
*Miss Syntax is here to help with your coding journey and emotional well