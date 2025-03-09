# Environment Variables Configuration

This document provides detailed information about the environment variables required for the Sehatica application.

## Required Environment Variables

These environment variables are essential for the application to function properly:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | The URL of your Supabase project | `https://abcdefghijklm.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | The anonymous key for your Supabase project | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `NEXT_PUBLIC_APP_URL` | The URL where your application is hosted | `http://localhost:3000` or `https://your-app.vercel.app` |

## Optional Environment Variables

These environment variables are optional but recommended for production environments:

| Variable | Description | Example |
|----------|-------------|---------|
| `SUPABASE_SERVICE_ROLE_KEY` | The service role key for your Supabase project (for admin operations) | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `NODE_ENV` | The environment in which the application is running | `development` or `production` |

## Environment Setup

### Development Environment

Create a `.env.local` file in the root directory of your project with the following content:

