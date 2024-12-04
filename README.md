# AlgoMaster: Interactive Algorithm Learning Platform

## Overview
AlgoMaster is an interactive platform designed to help developers master algorithms and data structures through visualization, practice, and competitions.

## Features
- Interactive Algorithm Visualization
- Coding Practice Problems
- Algorithmic Competitions
- User Authentication (Google, GitHub)

## Prerequisites
- Node.js (v18+)
- npm or yarn
- Google and GitHub OAuth Credentials

## Local Development Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/algomaster.git
cd algomaster
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
- Copy `.env.example` to `.env`
- Fill in `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- Fill in `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`
- Generate a `NEXTAUTH_SECRET`

4. Initialize database
```bash
npx prisma generate
npx prisma migrate dev
```

5. Run development server
```bash
npm run dev
```

## Deployment to Vercel

1. Install Vercel CLI
```bash
npm install -g vercel
```

2. Link your project
```bash
vercel
```

3. Set environment variables in Vercel Dashboard
- `DATABASE_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

## Contributing
Contributions are welcome! Please read our contributing guidelines.

## License
MIT License
