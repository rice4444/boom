# CryptoInvest Pro - Replit Development Guide

## Overview

CryptoInvest Pro is a modern cryptocurrency investment platform built with React and Express.js. The application provides users with multiple Bitcoin investment plans, user registration/authentication, contact forms, and an administrative dashboard for managing users and investments.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom crypto-themed color palette
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom configuration

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Database**: Supabase (PostgreSQL) for persistent storage
- **Schema Management**: Drizzle schema definitions
- **Storage**: SupabaseStorage implementation with real-time data
- **API Design**: RESTful endpoints with JSON responses

### Monorepo Structure
The application uses a monorepo structure with shared TypeScript definitions:
- `/client` - React frontend application
- `/server` - Express.js backend API
- `/shared` - Shared TypeScript schemas and types

## Key Components

### Database Schema
**Users Table**:
- id (serial primary key)
- name, email, password (user credentials)
- plan (investment plan type: starter, silver, bonus, flexible)
- amount (investment amount)
- joinDate (timestamp)

**Contact Messages Table**:
- id (serial primary key)
- name, email, subject, message (contact form data)
- createdAt (timestamp)

### Authentication System
- Simple email/password authentication
- Admin credentials: email="admin@gmail.com", password="admin1234"
- Client-side auth state management via localStorage
- Protected routes for dashboard and admin areas

### Investment Plans
Four predefined investment tiers:
- **Starter Plan**: $100-$999, 5-8% returns
- **Silver Plan**: $1,000-$4,999, 8-12% returns  
- **Bonus Plan**: $5,000-$19,999, 12-18% returns (most popular)
- **Flexible Plan**: $20,000+, 18-25% returns

### API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `POST /api/contact` - Contact form submission
- `GET /api/user/:id` - User profile retrieval
- `GET /api/admin/users` - Admin user list (admin only)
- `PATCH /api/admin/users/:id` - Update user investment (admin only)

## Data Flow

1. **User Registration**: Form validation → API call → Database storage → Auto-login
2. **Investment Selection**: Plan selection → Local storage → Registration form pre-population
3. **User Dashboard**: Authentication check → User data fetch → Investment display
4. **Admin Management**: Admin authentication → User list fetch → Investment updates

## External Dependencies

### Core Dependencies
- **Database**: Neon Database (PostgreSQL serverless)
- **UI Components**: Radix UI primitives for accessibility
- **Validation**: Zod for schema validation
- **HTTP Client**: Native fetch API with custom wrapper
- **Icons**: Font Awesome for branding, Lucide React for UI icons

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **ESBuild**: Fast production bundling for backend
- **Vite**: Development server and frontend bundling
- **Drizzle Kit**: Database migrations and schema management

## Deployment Strategy

### Development Environment
- Uses Vite development server with HMR
- Express server with middleware integration
- PostgreSQL database via environment variable `DATABASE_URL`
- Port 5000 for both frontend and backend (Vite proxy)

### Production Build
- Frontend: Vite build to `dist/public`
- Backend: ESBuild bundle to `dist/index.js`
- Single server deployment serving both static files and API
- Requires PostgreSQL database connection

### Environment Configuration
- Development: `npm run dev` (TSX for hot reloading)
- Production: `npm run build && npm run start`
- Database migrations: `npm run db:push`

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 18, 2025. Initial setup