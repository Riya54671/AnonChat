AnonChat — Controlled Anonymity Chat Platform

AnonChat is a full-stack web application that enables safe, anonymous 1-to-1 conversations using a concept called Controlled Anonymity.
Users remain anonymous, but AI verification, device fingerprinting, and rate limits prevent misuse and abuse.
This project was built as a hackathon MVP, focusing on system design, safety, and real-time matching logic rather than visual polish.

Problem Statement
Existing anonymous chat applications suffer from one of two problems:

Too intrusive → require phone numbers, emails, or identity proofs

Too unsafe → allow unrestricted anonymity, leading to harassment, spam, and catfishing

AnonChat solves this by balancing:

- Privacy → no personal data collected

- Safety → controlled access using AI + device-level controls

- Solution: Controlled Anonymity

No emails or phone numbers

No profile pictures

No chat history stored

AI-based gender verification (live camera only)

Device-based identity using secure browser APIs

Automatic abuse detection and banning

Core Features
1️) Anonymous Onboarding & AI Verification
No PII required
Device ID generated and stored locally
Live camera selfie required (gallery uploads disabled)
AI classifies gender (Male / Female)
Privacy rule: Image is deleted immediately after verification

2️)Pseudonymous Profiles
Nickname + short bio only
No profile pictures shown in chat
Minimal context to start conversations

3️) Intelligent Matching & Queues
Preference-based matching (Male / Female / Any)
Separate Redis queues for each preference
Real-time matching
Spam prevention using cooldowns

4️) Ephemeral 1-to-1 Chat
WebSocket-based real-time chat (Socket.IO)
No chat history stored
Chat ends permanently when session ends
Actions:
Leave chat
Next chat
Report user

5️) Abuse Prevention & Fair Usage
Anonymous reporting system
Auto-ban after 5 reports
30-second cooldown before re-matching
Daily usage limits enforced via device ID

 System Architecture Overview
Frontend (React)
   ↓ HTTP / WebSocket
Backend (Node.js + Express)
   ↓
Redis (In-Memory Store)
 ├── Matching Queues
 ├── Active Chat Rooms
 ├── Cooldowns
 ├── Report Counters
 └── Ban Flags

AI Service (FastAPI + TensorFlow)
   ↑
Live Camera Image (temporary)

 Tech Stack
Frontend
React
Tailwind CSS
Axios
Socket.IO Client
Web Crypto API (Device ID)

Backend
Node.js
Express.js
Socket.IO
Redis (via Memurai)
AI Service

Python
FastAPI
TensorFlow / Keras
OpenCV

🗂️ Project Structure
AnonChat/
├── frontend/
│   ├── LandingPage
│   ├── VerificationScreen
│   ├── ProfileCreationScreen
│   ├── MatchingScreen
│   └── ChatRoom
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── sockets/
│   ├── redisClient.js
│   └── server.js
│
├── ai-service/
│   ├── gender_model.py
│   └── main.py
│
└── README.md

 Privacy & Data Handling

No personal identifiers stored
Chat messages are never saved
Images used for verification are deleted immediately
Redis data uses TTL (auto-expiry)
Device ID is generated client-side and never linked to real identity

How to Run Locally
1️)Start Redis (Memurai)
Ensure Memurai is running on port 6379.

2️) Backend
cd backend
npm install
node server.js

3️) AI Service
cd ai-service
pip install -r requirements.txt
uvicorn main:app --reload

4️) Frontend
cd frontend
npm install
npm start
