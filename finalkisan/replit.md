# KisanMitra - Agricultural Support Application

## Overview
KisanMitra is a comprehensive mobile-first agricultural support application designed for farmers in India. The name "KisanMitra" translates to "Farmer's Friend" and serves as an AI-powered digital assistant for modern farming needs. The application provides plant disease diagnosis through computer vision, marketplace functionality for buying/selling agricultural products, weather monitoring, soil health analysis, and personalized farming guidance. Built as a progressive web app with native mobile capabilities through Capacitor, it targets rural and semi-urban farmers with localized content and multi-language support.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18.3.1 with TypeScript for type safety and modern development practices
- **Build System**: Vite 5.4.19 configured for mobile-first development with hot module replacement
- **UI Framework**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for consistent styling
- **Routing**: React Router DOM 6.30.1 for client-side navigation
- **State Management**: TanStack React Query 5.83.0 for server state and caching

### Mobile Development Strategy
- **Hybrid Approach**: Capacitor 7.4.3 for cross-platform mobile deployment (iOS/Android)
- **Progressive Web App**: Offline-first design with service workers for rural connectivity
- **Native Integration**: Camera access, GPS, push notifications, and device-specific optimizations
- **Responsive Design**: Mobile-first CSS with safe area handling for various device sizes

### Component Architecture
- **Atomic Design**: Reusable UI components in `/src/components/ui/` following design system principles
- **Page Components**: Route-specific components in `/src/pages/` with clear separation of concerns
- **Custom Hooks**: React hooks in `/src/hooks/` for shared stateful logic
- **Utility Functions**: Helper functions in `/src/lib/` for common operations

### Data Management
- **Authentication System**: Complete signup/login flow with automatic authentication after registration
- **User Data Storage**: Comprehensive user profiles stored in localStorage with persistent login state
- **Local Storage**: Browser localStorage for offline data persistence, user preferences, and notifications
- **Cart Management**: Custom cart service (`/src/lib/cart.ts`) with reactive state updates
- **Weather Integration**: Custom weather service (`/src/lib/weather.ts`) with real OpenWeatherMap API integration
- **Notification System**: Persistent notification management with clear/mark-all-read functionality

### Styling and Theming
- **CSS Framework**: Tailwind CSS with custom agricultural color palette and mobile-optimized spacing
- **Component Styling**: CSS variables for consistent theming across light/dark modes
- **Typography**: Inter font family with optimized font weights for mobile readability

## External Dependencies

### Core Development Stack
- **React Ecosystem**: React 18.3.1, React Router DOM 6.30.1, React Hook Form with Zod validation
- **UI Component Library**: Radix UI primitives (@radix-ui/*) for accessible, headless components
- **Build Tooling**: Vite 5.4.19 with TypeScript support and ESLint configuration
- **Styling**: Tailwind CSS with PostCSS for utility-first styling approach

### Mobile and Native Capabilities
- **Capacitor Core**: @capacitor/core 7.4.3 for hybrid app functionality
- **Platform Plugins**: @capacitor/android, @capacitor/ios for platform-specific builds
- **Device APIs**: Camera, geolocation, push notifications, status bar, splash screen management

### State Management and Data Fetching
- **TanStack React Query**: Server state management, caching, and synchronization
- **Form Management**: React Hook Form with Hookform Resolvers for validation
- **Data Validation**: Zod schema validation for type-safe form handling

### Third-Party Integrations
- **Weather API**: OpenWeatherMap API integration for real-time weather data
- **Image Processing**: Browser-native Canvas API for image capture and manipulation
- **Geolocation**: Browser Geolocation API with Capacitor native fallbacks
- **Storage**: Browser localStorage with potential for future cloud storage integration

### Development and Deployment
- **Development Server**: Vite dev server configured for Replit environment (port 5000, all hosts allowed)
- **TypeScript**: Full TypeScript support with relaxed linting for rapid prototyping
- **Linting**: ESLint with TypeScript rules and React-specific configurations
- **Build Output**: Static site generation optimized for CDN deployment and mobile performance
- **Production Deployment**: Configured for autoscale deployment with build optimization
- **Android Deployment**: Capacitor-ready configuration for Play Store publication

### Future Scalability Considerations
- **API Ready**: Architecture supports easy migration to REST/GraphQL APIs
- **Database Integration**: Structured for future Drizzle ORM integration with PostgreSQL
- **Authentication**: Prepared for OAuth or JWT-based authentication systems
- **Internationalization**: Multi-language support framework already implemented