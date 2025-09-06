# Kisan - Agricultural Support App

## Overview
Kisan is a comprehensive agricultural support application built with React, TypeScript, and Vite. The name "Kisan" means "farmer" in several South Asian languages, reflecting its purpose as a digital platform for farmers and agricultural professionals.

## Project Structure
This is a React + TypeScript application using:
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.19
- **UI Library**: Radix UI components with Tailwind CSS
- **Routing**: React Router DOM 6.30.1
- **State Management**: TanStack Query (React Query) 5.83.0
- **Mobile**: Capacitor 7.4.3 for iOS/Android builds

## Key Features
- Plant disease diagnosis with camera capture
- Weather information and forecasts  
- Market prices and agricultural advisory
- Shop for agricultural products and treatments
- Soil health monitoring
- Fertilizer guidance
- User profiles and order management
- Multi-language support

## Development Setup
- Server runs on port 5000 (configured for Replit environment)
- Vite dev server configured with `host: "0.0.0.0"` and `allowedHosts: true`
- HMR (Hot Module Reload) enabled for development

## Architecture
- **Pages**: Individual route components in `/src/pages/`
- **Components**: Reusable UI components in `/src/components/`
- **Assets**: Images and media files in `/src/assets/`
- **Utilities**: Helper functions in `/src/lib/`
- **Hooks**: Custom React hooks in `/src/hooks/`

## Current State (September 6, 2025)
- ✅ Dependencies installed successfully
- ✅ Vite development server running on port 5000
- ✅ React Router configured with comprehensive routing
- ✅ UI components from Radix UI integrated
- ✅ Deployment configured for Replit autoscale
- ✅ Project ready for development and testing

## Deployment
Configured for Replit autoscale deployment:
- Build command: `npm run build`
- Serves static files on port 5000 in production
- Optimized for stateless web application deployment