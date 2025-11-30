# CFCI Project Intake Chatbot

An AI-powered chatbot interface for the Christensen Family Center for Innovation (CFCI) at Duke University. This tool helps potential clients create and submit Product Brief proposals to CFCI's Product Lab.

## Features

- **AI-Powered Chat Interface**: Conversational assistant that guides users through the project intake process
- **User Authentication**: Register and login to save conversation history
- **Persistent Conversations**: Logged-in users have their conversations saved to a database

## Tech Stack

### Frontend
- **React** with Vite
- **React Router** for navigation

### Backend
- **FastAPI** (Python)
- **SQLAlchemy** ORM with SQLite database
- **OpenAI GPT-4o** for AI responses
- **JWT** authentication

## Project Structure

```
cfci-innovation-intake/
├── public/                     # Static assets (images, icons)
├── src/                        # Frontend React application
│   ├── components/             # React components + CSS
│   ├── contexts/               # React context (Auth)
│   ├── services/               # API service layer
│   └── main.jsx                # Entry point
├── server/                     # Backend FastAPI application
│   └── app/
│       ├── api/                # API endpoints (auth, chat)
│       ├── core/               # Config, security, JWT
│       ├── db/                 # Database models
│       ├── prompts/            # LLM prompt templates
│       ├── schemas/            # Pydantic schemas
│       ├── services/           # OpenAI service
│       └── main.py             # FastAPI entry point
├── index.html                  # HTML entry point
├── package.json                # Frontend dependencies
├── vite.config.js              # Vite configuration
└── README.md
```

## Prerequisites

- **Node.js** (v18+)
- **Python** (3.10+)
- **OpenAI API Key**

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd cfci-innovation-intake
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a file `server/.env.development.local`:

```env
OPENAI_KEY=your-openai-api-key-here
JWT_SECRET_KEY=your-secret-key-for-jwt
POSTGRES_URL=sqlite:///./cfci.db
```

### 5. Initialize the database

```bash
cd server
python -c "from app.db.database import create_tables; create_tables()"
```

## Running the Application

### Start the backend server

```bash
cd server
uvicorn app.main:app --reload --port 8000
```

### Start the frontend (in a new terminal)

```bash
npm run dev
```

After running `npm run dev`, the terminal will display the local URL where the frontend is running (e.g., `http://localhost:5173`). If that port is in use, Vite will automatically select the next available port.

**Default URLs:**
- **Frontend**: http://localhost:5173 (check terminal output for actual port)
- **Backend API**: http://localhost:8000

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create a new user account |
| POST | `/api/auth/login` | Login and get JWT token |

### Chat
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/chat/greeting` | No | Get initial greeting message |
| POST | `/api/chat/simple` | No | Send message (guest mode) |
| POST | `/api/chat/initiate` | Yes | Start a new conversation |
| POST | `/api/chat/advance` | Yes | Continue a conversation |

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |

## Usage

### As a Guest
1. Open http://localhost:5173
2. Start typing your project idea
3. Chat with the AI assistant (conversation stored in memory only)

### As a Registered User
1. Click "Sign up" to create an account
2. Login with your credentials
3. Your conversations are saved to the database
4. Come back later to continue where you left off

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_KEY` | OpenAI API key for GPT-4o | Yes |
| `JWT_SECRET_KEY` | Secret key for JWT token signing | Yes |
| `POSTGRES_URL` | Database connection string (SQLite or PostgreSQL) | Yes |

## Development

### Frontend development
```bash
npm run dev
```

### Backend development
```bash
cd server
uvicorn app.main:app --reload --port 8000
```

## License

This project is part of Duke University's Christensen Family Center for Innovation.
