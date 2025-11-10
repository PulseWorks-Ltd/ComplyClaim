# ComplyClaim Backend

Express + TypeScript backend API for the ComplyClaim platform.

## Features

- **Express** - Fast, unopinionated web framework
- **TypeScript** - Type-safe development
- **Zod** - Runtime validation and type inference
- **Modular Architecture** - Easy to extend and maintain
- **AWS S3** - Document storage integration
- **SendGrid** - Email notification support
- **Redis** - Caching and session management

## Development

```bash
# Install dependencies
npm install

# Run in development mode with hot reload
npm run dev

# Type check
npm run type-check

# Build for production
npm run build

# Run production build
npm start

# Lint code
npm run lint
```

## Configuration

Copy `.env.example` to `.env` and configure:

```bash
# Server
NODE_ENV=development
PORT=3001

# AWS S3 (optional - for document uploads)
AWS_REGION=ap-southeast-2
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
S3_BUCKET_NAME=complyclaim-documents

# SendGrid (optional - for emails)
SENDGRID_API_KEY=your_key
SENDGRID_FROM_EMAIL=noreply@complyclaim.com

# Redis (optional - for caching)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# CORS
CORS_ORIGIN=http://localhost:5173
```

## Module Structure

Each feature module follows the same pattern:

```
module-name/
├── module.schema.ts    # Zod schemas and types
├── module.service.ts   # Business logic
└── module.routes.ts    # API routes
```

## Adding a New Module

1. Create module directory in `src/modules/`
2. Add schema file with Zod validation
3. Add service file with business logic
4. Add routes file with Express routes
5. Register routes in `src/index.ts`

## API Response Format

All API responses follow this format:

```typescript
// Success
{
  "status": "success",
  "data": { ... }
}

// Error
{
  "status": "error",
  "message": "Error description",
  "errors": [ ... ] // Optional validation errors
}
```

## NZ-Specific Features

- GST calculation at 15% (NZ standard rate)
- Default 5% retention (as per NZ construction industry standard)
- Construction Contracts Act 2002 compliant payment claims
- H&S compliance tracking per Health & Safety at Work Act 2015
