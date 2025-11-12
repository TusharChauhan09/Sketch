# Sketch Application Workflow & Usage Guide

## Application Workflow

The Sketch application is a collaborative drawing platform with authentication and real-time features. Here’s how the core workflow operates:

1. **User Authentication**
   - Users can sign up or sign in using the authentication pages (`/signin`, `/signup`).
   - Authentication is handled via the HTTP backend, which issues tokens for session management.

2. **Room Creation & Joining**
   - After logging in, users can create or join drawing rooms.
   - Each room has a unique `roomId` (slug) and is managed by the backend.

3. **Collaborative Drawing**
   - Inside a room, users interact with a shared canvas (`/canvas/[roomId]`).
   - Drawing actions are synchronized in real-time using the WebSocket backend.

4. **Chat & Collaboration**
   - Users can chat and share measurements or annotations within the room.
   - All actions are stored and managed via the backend and database.

5. **Session Management**
   - Users can leave rooms, and their sessions are managed securely.

## How to Use the Application

1. **Install Dependencies**
   - Run `pnpm install` at the root of the project to install all dependencies for apps and packages.

2. **Set Up the Database**
   - Configure your database connection string in the `.env` file (see `DATABASE_URL`).
   - Run `npx prisma generate` and `npx prisma migrate dev` in `packages/db` to set up the database schema.

3. **Start the Backends**
   - HTTP Backend: `pnpm --filter http-backend dev`
   - WebSocket Backend: `pnpm --filter ws-backend dev`

4. **Start the Frontend**
   - Client App: `pnpm --filter client dev`
   - Access the app in your browser (usually at `http://localhost:3000`).

5. **Sign Up / Sign In**
   - Use the UI to create an account or log in.

6. **Create or Join a Room**
   - After authentication, create a new room or join an existing one by entering its ID.

7. **Draw and Collaborate**
   - Use the canvas to draw, annotate, and chat with others in real time.

8. **End Session**
   - Log out or leave the room when finished.

---

For more details, see the `README.md` or explore the codebase in the `apps/` and `packages/` directories.
