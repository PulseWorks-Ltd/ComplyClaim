# ComplyClaim Frontend

Modern React frontend for the ComplyClaim platform.

## Features

- **React 19** - Latest React with concurrent features
- **Vite** - Lightning-fast development and builds
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Lucide React** - Beautiful icon library
- **date-fns** - Date formatting and manipulation

## Development

```bash
# Install dependencies
npm install

# Run development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Configuration

Copy `.env.example` to `.env`:

```bash
VITE_API_URL=http://localhost:3001/api
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Sidebar, etc.)
│   ├── payment-claims/
│   ├── variations/
│   ├── tenders/
│   └── health-safety/
├── pages/              # Page components
├── services/           # API service layer
├── store/              # State management (if needed)
├── types/              # TypeScript type definitions
├── utils/              # Helper functions
├── App.tsx             # Main app component
└── main.tsx            # Application entry point
```

## Adding a New Page

1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation item in `src/components/layout/Sidebar.tsx`

## Styling Guidelines

This project uses Tailwind CSS for styling:

- Use utility classes directly in components
- Custom colors defined in `tailwind.config.js`
- Responsive design with Tailwind breakpoints
- Dark mode ready (prefers-color-scheme)

## API Integration

API services are in `src/services/`:

```typescript
import { paymentClaimService } from '../services/paymentClaimService';

// Get all claims
const claims = await paymentClaimService.getAll();

// Create claim
const claim = await paymentClaimService.create(data);
```

## Type Safety

All API types are defined in service files and shared between frontend and backend validation schemas.
