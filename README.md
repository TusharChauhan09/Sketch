# Sketch

A real-time collaborative chat application built with Next.js, Express, WebSocket, and PostgreSQL. This monorepo project enables users to create rooms, join conversations, and chat in real-time.

## 🏗️ Architecture

This project is structured as a monorepo using Turborepo and includes:

- **Frontend**: Next.js 15 web application
- **HTTP Backend**: Express.js REST API server
- **WebSocket Backend**: Real-time WebSocket server
- **Database**: PostgreSQL with Prisma ORM
- **Shared Packages**: Common types, configurations, and utilities

## 📁 Project Structure

```
sketch/
├── apps/
│   ├── web/                    # Next.js frontend application
│   ├── http-backend/           # Express.js REST API server
│   └── ws-backend/             # WebSocket server for real-time chat
├── packages/
│   ├── backend-common/         # Shared backend utilities
│   ├── common/                 # Shared types and utilities
│   ├── db/                     # Prisma database schema and client
│   ├── eslint-config/          # Shared ESLint configurations
│   ├── typescript-config/      # Shared TypeScript configurations
│   └── ui/                     # Shared UI components
├── package.json                # Root package.json with workspace scripts
├── turbo.json                  # Turborepo configuration
└── pnpm-workspace.yaml         # PNPM workspace configuration
```

## 🚀 Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **Room Creation**: Users can create and manage chat rooms
- **Real-time Chat**: WebSocket-powered instant messaging
- **Message History**: Persistent chat history with database storage
- **Responsive UI**: Modern, responsive frontend built with Next.js
- **Type Safety**: Full TypeScript support across all packages

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety

### Backend
- **Express.js** - REST API server
- **WebSocket (ws)** - Real-time communication
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Database
- **PostgreSQL** - Primary database
- **Prisma** - ORM and database toolkit

### Development Tools
- **Turborepo** - Monorepo build system
- **PNPM** - Package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18 or higher
- PNPM 9.0.0 or higher
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TusharChauhan09/Sketch.git
   cd Sketch
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `packages/db` directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/sketch_db"
   ```

   Create `.env` files in both backend apps (`apps/http-backend` and `apps/ws-backend`):
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/sketch_db"
   JWT_SECRET="your-jwt-secret-key"
   PORT=8000  # for http-backend
   # PORT=8001  # for ws-backend
   ```

4. **Set up the database**
   ```bash
   cd packages/db
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start the development servers**
   ```bash
   # From the root directory
   pnpm dev
   ```

This will start:
- Frontend at `http://localhost:3000`
- HTTP Backend at `http://localhost:8000`
- WebSocket Backend at `http://localhost:8001`

## 📊 Database Schema

The application uses the following main entities:

- **User**: User accounts with authentication
- **Room**: Chat rooms created by users
- **Chat**: Individual messages within rooms

## 🧪 Available Scripts

From the root directory:

```bash
# Start all applications in development mode
pnpm dev

# Build all applications
pnpm build

# Run linting across all packages
pnpm lint

# Format code with Prettier
pnpm format

# Type checking across all packages
pnpm check-types
```

## 🔧 Development

### Adding New Packages

To add a new package to the workspace:

1. Create a new directory in `packages/`
2. Add a `package.json` with the workspace name format
3. Update `pnpm-workspace.yaml` if needed

### Database Changes

To modify the database schema:

1. Edit `packages/db/prisma/schema.prisma`
2. Run `npx prisma migrate dev` to create a migration
3. Run `npx prisma generate` to update the Prisma client

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- **Tushar Chauhan** - [TusharChauhan09](https://github.com/TusharChauhan09)

---

Built with ❤️ using modern web technologies