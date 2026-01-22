PrepTalks
<img width="986" height="998" alt="Screenshot 2026-01-22 113001" src="https://github.com/user-attachments/assets/1660248a-739a-4c27-a8c2-722f20fadad5" />





┌─────────────────────────────────────────────────────────────────────────┐
│                         CONNECTION ARCHITECTURE                         │
└─────────────────────────────────────────────────────────────────────────┘

                            FRONTEND (React + Vite)
                        http://localhost:5173
                    ┌─────────────────────────────┐
                    │                             │
                    │  App.jsx                    │
                    │  ├─ Pages (LoginPage, etc)  │
                    │  ├─ Components              │
                    │  └─ Hooks (useLogin, etc)   │
                    │                             │
                    └────────────┬────────────────┘
                                 │
                    Uses axiosInstance from axios.js
                    (configured base URL)
                                 │
                    ┌────────────▼────────────┐
                    │   api.js Functions      │
                    │ ├─ signup()             │
                    │ ├─ login()              │
                    │ ├─ getAuthUser()        │
                    │ ├─ getUserFriends()     │
                    │ ├─ sendFriendRequest()  │
                    │ └─ (more endpoints)     │
                    └────────────┬────────────┘
                                 │
                    HTTP Requests (with credentials)
                    CORS: origin: http://localhost:5173
                                 │
                    ┌────────────▼────────────────────────┐
                    │      BACKEND (Node.js + Express)    │
                    │     http://localhost:5001           │
                    │                                     │
                    │  CORS Middleware (accepts 5173)     │
                    │  ├─ JSON Parser                     │
                    │  ├─ Cookie Parser                   │
                    │                                     │
                    │  API Routes:                        │
                    │  ├─ /api/auth    → auth.route.js   │
                    │  ├─ /api/users   → user.route.js   │
                    │  ├─ /api/chat    → chat.route.js   │
                    │                                     │
                    │  Controllers handle business logic  │
                    │                                     │
                    │  Models (MongoDB):                  │
                    │  ├─ User                            │
                    │  └─ FriendRequest                   │
                    │                                     │
                    │  Database: MongoDB Atlas            │
                    └─────────────────────────────────────┘
                                 │
                    ┌────────────▼─────────────────┐
                    │    External Services         │
                    │ ├─ MongoDB (database)        │
                    │ └─ Stream (chat/calling)     │
                    └──────────────────────────────┘


KEY ENDPOINTS:

Auth Endpoints:
  POST   /api/auth/signup
  POST   /api/auth/login
  POST   /api/auth/logout
  GET    /api/auth/me
  POST   /api/auth/onboarding

User Endpoints:
  GET    /api/users
  GET    /api/users/friends
  GET    /api/users/outgoing-friend-requests
  POST   /api/users/friend-request/:userId

Chat Endpoints:
  /api/chat/* (various chat operations)


CORS CONFIGURATION:
✓ Frontend URL: http://localhost:5173
✓ Credentials: enabled (allows cookies to be sent)


ENVIRONMENT SETUP:
Frontend (.env):
  VITE_STREAM_API_KEY = dhf48yzy5

Backend (.env):
  PORT = 5001
  MONGODB_URI = (MongoDB connection string)
  STREAM_API_KEY = dhf48yzy2x5
  JWT_SECRET_KEY = (your secret)






preptalks folders---> working


  ┌──────────────────────────────────────────────────────────────────────┐
│                  BACKEND (Express.js + MongoDB)                      │
│                   Runs on: http://localhost:5001                     │
└──────────────────────────────────────────────────────────────────────┘

📂 backend/src/
│
├─ 📄 server.js
│  └─ MAIN ENTRY POINT
│     • Starts Express server on port 5001
│     • Initializes CORS (allows frontend on 5173)
│     • Connects all routes
│     • Loads environment variables
│     • Connects to MongoDB
│
├─ 📂 controllers/
│  ├─ auth.controller.js    → Handles user signup/login/logout logic
│  ├─ user.controller.js    → Manages friend requests, user data
│  └─ chat.controller.js    → Manages chat messages
│  
│  └─ What it does:
│     • Contains business logic
│     • Processes data from routes
│     • Connects to models & database
│     • Sends responses back
│
├─ 📂 routes/
│  ├─ auth.route.js   → /api/auth/* endpoints
│  │                      POST /signup, /login, /logout
│  │                      GET  /me (check logged-in user)
│  │
│  ├─ user.route.js   → /api/users/* endpoints
│  │                      GET  /friends, /outgoing-friend-requests
│  │                      POST /friend-request/:userId
│  │
│  └─ chat.route.js   → /api/chat/* endpoints
│
│  └─ What it does:
│     • Defines API endpoints
│     • Routes requests to controllers
│     • Applies middleware (authentication)
│
├─ 📂 middleware/
│  └─ auth.middleware.js
│     • Checks if user is logged in
│     • Validates JWT tokens from cookies
│     • Protects private routes
│
├─ 📂 models/
│  ├─ User.js
│  │  └─ Database schema for user data
│  │     • email, password, username, avatar
│  │     • isOnboarded status
│  │
│  └─ FriendRequest.js
│     └─ Database schema for friend requests
│        • sender, receiver, status
│
├─ 📂 lib/
│  ├─ db.js      → Connects to MongoDB Atlas
│  └─ stream.js  → Initialize Stream Chat SDK


┌──────────────────────────────────────────────────────────────────────┐
│                  FRONTEND (React + Vite)                             │
│                   Runs on: http://localhost:5173                     │
└──────────────────────────────────────────────────────────────────────┘

📂 frontend/src/
│
├─ 📄 main.jsx
│  └─ ENTRY POINT - Renders App.jsx into HTML
│
├─ 📄 App.jsx
│  └─ ROUTER - Main component that:
│     • Checks if user is logged in (useAuthUser hook)
│     • Defines all routes (pages)
│     • Redirects: not logged in → login page
│     • Redirects: not onboarded → onboarding page
│     • Authenticated users → home page
│
├─ 📂 pages/
│  ├─ LoginPage.jsx      → User login form
│  ├─ SignUpPage.jsx     → User registration form
│  ├─ OnboardingPage.jsx → Complete user profile
│  ├─ HomePage.jsx       → Main dashboard
│  ├─ FriendPage.jsx     → Manage friends & send requests
│  ├─ ChatPage.jsx       → Chat messages interface
│  ├─ CallPage.jsx       → Video/audio call interface
│  └─ NotificationsPage.jsx → Friend request notifications
│
│  └─ What it does:
│     • Each page is a full-screen view
│     • Displays UI for different features
│
├─ 📂 components/
│  ├─ Layout.jsx         → Wraps pages with navbar & sidebar
│  ├─ Navbar.jsx         → Top navigation bar
│  ├─ Sidebar.jsx        → Left sidebar navigation
│  ├─ FriendCard.jsx     → Shows friend in a card
│  ├─ CallButton.jsx     → Button to start video call
│  ├─ ChatLoader.jsx     → Loading animation for chat
│  ├─ PageLoader.jsx     → Loading animation for pages
│  ├─ NoFriendsFound.jsx → Message when no friends
│  ├─ NoNotificationsFound.jsx → Message when no notifications
│  └─ ThemeSelector.jsx  → Toggle dark/light theme
│
│  └─ What it does:
│     • Reusable UI elements
│     • Used across multiple pages
│
├─ 📂 hooks/
│  ├─ useAuthUser.js    → Get current logged-in user
│  ├─ useLogin.js       → Handle login logic & API call
│  ├─ useSignUp.js      → Handle signup logic & API call
│  └─ useLogout.js      → Handle logout logic & API call
│
│  └─ What it does:
│     • Custom React hooks
│     • Manage state & API calls for authentication
│
├─ 📂 lib/
│  ├─ axios.js  → Configure axios with backend URL & auth
│  ├─ api.js    → All API functions that call backend
│  │             • signup(), login(), logout()
│     │             • getUserFriends(), sendFriendRequest()
│  │             • getAuthUser()
│  │
│  └─ utils.js  → Utility functions (helpers)
│
│  └─ What it does:
│     • axios.js: Sets base URL = http://localhost:5001
│     • api.js: Makes HTTP requests to backend
│
├─ 📂 store/
│  └─ useThemeStore.js
│     └─ Zustand store to manage theme (light/dark)
│
└─ 📂 constants/
   └─ index.js → Constant values used across app


┌──────────────────────────────────────────────────────────────────────┐
│                   HOW THEY WORK TOGETHER                             │
└──────────────────────────────────────────────────────────────────────┘

FLOW EXAMPLE - User Login:
──────────────────────────

1. User types email & password on LoginPage.jsx
   │
2. Clicks "Login" button → useLogin() hook is triggered
   │
3. useLogin() calls api.login(credentials)
   │
4. api.js uses axiosInstance to POST to http://localhost:5001/api/auth/login
   │
5. Backend receives request → auth.route.js routes to auth.controller.js
   │
6. auth.controller.js:
   • Finds user in MongoDB (User.js model)
   • Verifies password
   • Creates JWT token
   • Sets cookie
   • Returns user data
   │
7. Frontend receives response → Updates state
   │
8. App.jsx detects authUser exists → Redirects to home page
   │
9. HomePage.jsx loads with user's data


KEY CONNECTION POINTS:
────────────────────

Frontend → Backend:
  • URL: http://localhost:5001
  • Method: axios (HTTP)
  • Auth: JWT token in cookies

Backend → Database:
  • MongoDB Atlas (cloud)
  • Models: User, FriendRequest

Backend → External:
  • Stream Chat SDK (for messaging)
  • Stream Video SDK (for calls)
