# Sehatica - Health Guide Platform

Sehatica is a comprehensive health guide platform with a powerful admin dashboard for managing content, users, and analytics. This README provides an overview of the project structure, setup instructions, and detailed explanations of key components.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Setup Instructions](#setup-instructions)
5. [Key Features](#key-features)
6. [Contributing](#contributing)
7. [License](#license)

## Project Overview

Sehatica is a platform designed to provide health guides, articles, and resources to users. It includes:

- Public-facing website with health guides and blog posts
- User authentication system
- Admin dashboard for content management
- User analytics tracking system
- Blog post CRUD functionality

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## Project Structure

The project is organized into two main directories:

- **Front-End**: Contains all client-side components, pages, and hooks
- **Back-End**: Contains server-side code, API routes, and database migrations

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account and project

### Environment Variables

Create a `.env.local` file with the following variables:

