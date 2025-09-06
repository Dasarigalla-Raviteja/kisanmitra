# Hariyali Mitra - Farm Assistant Application

## Project Overview
Hariyali Mitra is a comprehensive farming assistance application built with React, TypeScript, and Vite. It provides farmers with:
- Plant disease diagnosis through AI-powered image analysis
- Agricultural marketplace for buying/selling produce
- Community features and expert guidance
- Localized content and multi-language support

## Technology Stack
- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.19
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **Routing**: React Router DOM 6.30.1
- **State Management**: TanStack React Query
- **Mobile**: Capacitor for hybrid app development
- **Styling**: Tailwind CSS with custom animations

## Current Setup
**Status**: ✅ Successfully configured for Replit environment
**Development Server**: Running on port 5000
**Last Updated**: September 5, 2025

### Development Configuration
- Vite dev server configured for Replit (host: 0.0.0.0, port: 5000)
- All hosts allowed for proper iframe rendering in Replit
- Hot module replacement enabled for development

### Deployment Configuration
- **Target**: Autoscale (static site deployment)
- **Build Command**: `npm run build`
- **Preview Command**: `npm run preview`
- **Build Output**: Static files in `dist/` directory

## Project Structure
```
src/
├── components/     # Reusable UI components (shadcn/ui)
├── pages/         # Application pages/routes
├── hooks/         # Custom React hooks
├── lib/           # Utilities and configurations
└── assets/        # Images and static assets
```

## Key Features Implemented
1. **Landing & Onboarding**: Multi-step user introduction
2. **Authentication**: Login/signup system
3. **Plant Diagnosis**: Camera capture and AI analysis
4. **Marketplace**: Shopping cart and checkout flow
5. **Profile Management**: User profile editing
6. **Community Features**: Guides and treatments

## Development Workflow
- **Start Development**: Workflow "Frontend Server" is configured
- **Build for Production**: `npm run build`
- **Preview Production**: `npm run preview`

## Recent Changes
- September 5, 2025: Initial Replit environment setup completed
- Migrated from GitHub import to functional Replit project
- Configured Vite for proper host handling in Replit environment
- Set up deployment configuration for autoscale deployment