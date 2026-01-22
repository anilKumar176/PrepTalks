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
  VITE_STREAM_API_KEY = dhf48yzy2xk5

Backend (.env):
  PORT = 5001
  MONGODB_URI = (MongoDB connection string)
  STREAM_API_KEY = dhf48yzy2xk5
  JWT_SECRET_KEY = (your secret)
