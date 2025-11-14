# University Landing (React + Node + MongoDB)

Full-stack demo: two university landing pages, lead capture form posting to backend & optional Pipedream workflow.

## 1. Backend Setup
```powershell
cd backend
Copy-Item .env.example .env   # then edit .env with your values
npm install
npm run dev    # starts on port 4000 by default
```
Edit `.env`:
```
MONGO_URI=mongodb://localhost:27017/university_landing
PORT=4000
PIPEDREAM_ENDPOINT=https://eoXXXX.m.pipedream.net
```
Seed sample universities (optional):
```powershell
node seed.js
```

## 2. Frontend Setup
```powershell
cd frontend
Copy-Item .env.example .env   # optional; set backend & pipedream URLs
npm install
npm run dev  # runs Vite dev server (default 5173)
```
Example `.env` for frontend:
```
VITE_BACKEND_URL=http://localhost:4000
VITE_PIPEDREAM_URL=https://eoXXXX.m.pipedream.net
```
Open: http://localhost:5173

## 3. API Summary
- `GET /api/health` -> `{ status, now }`
- `GET /api/universities` -> list of universities
- `GET /api/universities/:slug` -> single university detail
- `GET /api/universities/:slug/course-fees` -> fee breakdown
- `POST /api/leads` -> save lead + forward to Pipedream (if configured)

## 4. Tech Stack
- Backend: Node.js (ESM), Express, Mongoose, CORS, dotenv
- Frontend: React 18, React Router, Vite
- Database: MongoDB (local or Atlas)
- Optional automation: Pipedream endpoint for workflow triggers

## 5. Production Notes
- Deploy frontend (build output) to Netlify/Vercel/etc.
- Deploy backend to Render/Railway/Fly.io. Set env vars and connect to MongoDB Atlas.
- Replace `PIPEDREAM_ENDPOINT` and `VITE_PIPEDREAM_URL` with your live workflow URL.
- Consider adding rate limiting and validation library (e.g. `zod` or `joi`) for production.

## 6. Useful Commands
```powershell
# Backend
npm run dev          # start with nodemon
npm start            # start without nodemon

# Frontend
npm run dev          # local dev server
npm run build        # production build
npm run preview      # preview build locally
```

## 7. Folder Structure
```
backend/
  server.js
  routes/
  models/
frontend/
  src/
  vite.config.js
```

## 8. Troubleshooting
- Mongo connection errors: ensure MongoDB service running or Atlas URI correct.
- CORS issues: confirm `VITE_BACKEND_URL` matches backend origin.
- 404 on university pages: make sure `seed.js` was run and DB contains documents.

---
MIT-style usage. Adapt freely.
