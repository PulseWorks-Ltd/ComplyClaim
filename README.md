# ComplyClaim

> Comprehensive compliance management platform for New Zealand subcontractors

ComplyClaim is a modular, modern web application designed specifically for NZ subcontractors to streamline compliance management, payment claims, variations tracking, tender management, and health & safety documentation.

## 🌟 Features

### Core Modules

1. **Payment Claim Generator** (Construction Contracts Act 2002 compliant)
   - Generate professional payment claims
   - Automatic GST and retention calculations (NZ standard 15% GST)
   - Line item management with quantities, rates, and amounts
   - Track claim status (draft, submitted, approved, paid)
   - Historical claim tracking

2. **Variation & Day Work Tracker**
   - Track project variations and scope changes
   - Record day work with labour hours and materials
   - Cost estimation and approval workflow
   - Link variations to payment claims

3. **Tender Creator & Tracker**
   - Create and manage tender submissions
   - Track tender opportunities and deadlines
   - Monitor win/loss outcomes
   - Store tender documents and requirements

4. **Health & Safety Document Manager**
   - Centralized H&S document repository
   - Document types: Site safety plans, risk assessments, method statements, incident reports
   - Version control and expiry tracking
   - S3 integration for secure document storage
   - Compliance status tracking

### Technical Architecture

- **Backend**: Node.js + Express + TypeScript
  - RESTful API design
  - Zod schema validation
  - Modular architecture for easy extension
  - Ready for future AI assistant integration

- **Frontend**: React + Vite + TypeScript + Tailwind CSS
  - Modern, responsive UI
  - Component-based architecture
  - Type-safe development
  - Fast development with Vite HMR

- **Infrastructure Support**:
  - AWS S3 for document storage
  - SendGrid for email notifications
  - Redis for caching and session management
  - Environment-based configuration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- (Optional) Redis for caching
- (Optional) AWS S3 for document storage
- (Optional) SendGrid for emails

### Installation

1. Clone the repository:
```bash
git clone https://github.com/PulseWorks-Ltd/ComplyClaim.git
cd ComplyClaim
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:

**Backend** (`backend/.env`):
```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration
```

**Frontend** (`frontend/.env`):
```bash
cp frontend/.env.example frontend/.env
# Edit frontend/.env with your API URL
```

### Development

Run both backend and frontend in development mode:

```bash
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - Backend (port 3001)
npm run dev:backend

# Terminal 2 - Frontend (port 5173)
npm run dev:frontend
```

Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- API Health: http://localhost:3001/health

### Building for Production

```bash
# Build both projects
npm run build

# Or build separately
npm run build:backend
npm run build:frontend
```

## 📁 Project Structure

```
ComplyClaim/
├── backend/                 # Express + TypeScript backend
│   ├── src/
│   │   ├── config/         # Configuration (env, S3, SendGrid, Redis)
│   │   ├── middleware/     # Express middleware (validation, errors)
│   │   ├── modules/        # Feature modules
│   │   │   ├── payment-claims/
│   │   │   ├── variations/
│   │   │   ├── tenders/
│   │   │   └── health-safety/
│   │   └── index.ts        # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── App.tsx        # Main app component
│   ├── package.json
│   └── vite.config.ts
└── package.json           # Root workspace config
```

## 🔌 API Endpoints

### Payment Claims
- `GET /api/payment-claims` - List all payment claims
- `GET /api/payment-claims/:id` - Get payment claim by ID
- `POST /api/payment-claims` - Create new payment claim
- `PATCH /api/payment-claims/:id` - Update payment claim
- `DELETE /api/payment-claims/:id` - Delete payment claim

### Variations
- `GET /api/variations` - List all variations
- `GET /api/variations/:id` - Get variation by ID
- `POST /api/variations` - Create new variation
- `PATCH /api/variations/:id` - Update variation
- `DELETE /api/variations/:id` - Delete variation

### Tenders
- `GET /api/tenders` - List all tenders
- `GET /api/tenders/:id` - Get tender by ID
- `POST /api/tenders` - Create new tender
- `PATCH /api/tenders/:id` - Update tender
- `DELETE /api/tenders/:id` - Delete tender

### Health & Safety
- `GET /api/health-safety` - List all H&S documents
- `GET /api/health-safety/:id` - Get H&S document by ID
- `POST /api/health-safety` - Create new H&S document
- `PATCH /api/health-safety/:id` - Update H&S document
- `DELETE /api/health-safety/:id` - Delete H&S document
- `POST /api/health-safety/:id/upload-url` - Get S3 upload URL
- `GET /api/health-safety/:id/download-url` - Get S3 download URL

## 🔒 Security Features

- Helmet.js for security headers
- CORS configuration
- Input validation with Zod
- Type-safe API contracts
- Environment variable validation
- Error handling middleware

## 🧪 Testing

The application follows a modular architecture that makes it easy to add tests. Test infrastructure can be added using:
- Backend: Jest or Vitest
- Frontend: Vitest + React Testing Library

## 🔮 Future Extensions

The modular architecture is designed to support:

1. **AI Compliance Assistant**
   - Automated compliance checking
   - Document generation assistance
   - Intelligent form filling
   - Compliance recommendations

2. **Database Integration**
   - Currently uses in-memory storage
   - Easy to swap with PostgreSQL, MongoDB, etc.

3. **Authentication & Authorization**
   - User management
   - Role-based access control
   - Multi-tenant support

4. **Advanced Features**
   - PDF generation for claims and documents
   - Email notifications
   - Calendar integration
   - Mobile app

## 📄 License

ISC

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🏢 About

Built by PulseWorks Ltd for the NZ construction industry.

---

**Note**: This application is designed for New Zealand subcontractors and follows NZ-specific compliance requirements including:
- Construction Contracts Act 2002
- 15% GST rate
- Standard retention practices (5% default)
- NZ Health & Safety at Work Act 2015

