# AI-Powered CRM Data Analyzer

An intelligent CRM data analysis platform that leverages AI to automatically score leads, sync data from multiple CRM providers, and provide actionable insights through beautiful visualizations.

## ✨ Features

### 🤖 AI-Powered Lead Scoring
- Automatic lead scoring using OpenAI GPT-4o-mini
- Intelligent analysis based on company size, industry, deal value, and engagement
- Confidence scores and priority predictions (high/medium/low)
- Personalized recommendations for each lead
- Fallback rule-based scoring system

### 📊 Advanced Analytics Dashboard
- Real-time lead statistics and conversion metrics
- Interactive charts for lead sources, score distribution, and activity trends
- Responsive data visualizations using Recharts
- Comprehensive analytics including conversion rates and average scores

### 🔄 Multi-CRM Integration
- Support for multiple CRM providers:
  - Salesforce
  - HubSpot
  - Pipedrive
  - Zoho CRM
- Real-time sync status monitoring
- Webhook support for automatic updates
- Batch operations for efficient data processing

### 📋 Lead Management
- Comprehensive lead table with filtering and sorting
- Lead status tracking (new, contacted, qualified, converted, lost)
- Bulk lead scoring capabilities
- Contact history and engagement tracking

### 🎨 Modern UI/UX
- Clean, responsive design with dark/light mode support
- Built with Radix UI components and Tailwind CSS
- Smooth animations and transitions
- Mobile-friendly interface

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16.0 (App Router)
- **UI Library**: React 19.2
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI, shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

### Backend
- **Runtime**: Node.js 20
- **AI Integration**: Vercel AI SDK with OpenAI
- **API**: Next.js API Routes
- **Data Management**: Mock data system (easily replaceable with real database)

### DevOps
- **Containerization**: Docker & Docker Compose
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Analytics**: Vercel Analytics

## 📋 Prerequisites

- Node.js 20 or higher
- pnpm (recommended) or npm
- Docker and Docker Compose (for containerized deployment)
- OpenAI API key (for AI-powered lead scoring)

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/johaankjis/AI-Powered-CRM-Data-Analyzer.git
cd AI-Powered-CRM-Data-Analyzer
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Add your CRM provider API keys
# SALESFORCE_API_KEY=your_key
# HUBSPOT_API_KEY=your_key
# PIPEDRIVE_API_KEY=your_key
# ZOHO_API_KEY=your_key
```

4. **Run the development server**
```bash
pnpm dev
# or
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Docker Deployment

1. **Build and run with Docker Compose**
```bash
docker-compose up --build
```

2. **Access the application**
Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

## 📁 Project Structure

```
AI-Powered-CRM-Data-Analyzer/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── analytics/        # Analytics endpoints
│   │   ├── crm/              # CRM sync endpoints
│   │   └── leads/            # Lead management endpoints
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/               # React components
│   ├── ui/                   # Reusable UI components
│   ├── analytics-charts.tsx  # Charts component
│   ├── crm-sync-panel.tsx    # CRM integration panel
│   ├── dashboard-header.tsx  # Dashboard header
│   ├── leads-table.tsx       # Leads table component
│   ├── stats-cards.tsx       # Statistics cards
│   └── theme-provider.tsx    # Theme management
├── lib/                      # Utility libraries
│   ├── mock-data.ts          # Mock data for development
│   ├── types.ts              # TypeScript type definitions
│   └── utils.ts              # Helper functions
├── hooks/                    # Custom React hooks
├── public/                   # Static assets
├── styles/                   # Additional styles
├── Dockerfile                # Docker configuration
├── docker-compose.yml        # Docker Compose configuration
├── next.config.mjs           # Next.js configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## 🔌 API Endpoints

### Leads
- `GET /api/leads` - Get all leads
- `POST /api/leads/score` - Score a single lead using AI
- `POST /api/leads/batch-score` - Score multiple leads in batch

### Analytics
- `GET /api/analytics` - Get analytics data and metrics

### CRM Sync
- `GET /api/crm/providers` - List available CRM providers
- `POST /api/crm/sync` - Trigger CRM sync
- `GET /api/crm/sync/:id` - Get sync status
- `POST /api/crm/webhook` - Handle CRM webhooks

## 🤖 AI Lead Scoring

The application uses OpenAI's GPT-4o-mini model to intelligently score leads based on:

1. **Company Size**: Employee count and organization scale
2. **Industry Fit**: Industry alignment and market potential
3. **Deal Value**: Potential revenue and deal size
4. **Lead Source**: Quality of lead source (referral, conference, etc.)
5. **Engagement Status**: Current status and interaction history

Each scored lead receives:
- Score (0-100)
- Confidence level (0-1)
- Priority prediction (high/medium/low)
- Detailed factor breakdown
- Actionable recommendations

## 🔧 Configuration

### Next.js Configuration
The application uses standalone output for optimized Docker deployments. Key configurations in `next.config.mjs`:
- Standalone output mode
- ESLint and TypeScript build warnings disabled for flexibility
- Server Actions with 2MB body size limit
- Unoptimized images for better compatibility

### Environment Variables
Required variables:
- `OPENAI_API_KEY`: Your OpenAI API key for AI-powered features

Optional variables:
- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default: 3000)
- CRM provider API keys (as needed)

## 🎨 Theming

The application supports both light and dark themes:
- Automatic theme detection based on system preferences
- Manual theme toggle
- Consistent theming across all components using CSS variables

## 🧪 Development

### Available Scripts
```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Consistent component structure with React best practices
- Modular and reusable component design

## 🐳 Docker Support

### Dockerfile
Multi-stage build optimized for production:
1. **deps**: Install dependencies
2. **builder**: Build the application
3. **runner**: Lightweight production image

### Docker Compose
Includes:
- Application service with health checks
- Port mapping (3000:3000)
- Automatic restart policy
- Optional Redis service (commented out)

## 📊 Mock Data

The application includes mock data for development and testing purposes. Located in `lib/mock-data.ts`, it provides:
- Sample leads with various statuses
- Analytics data
- CRM sync information

Replace with real database integration for production use.

## 🔒 Security

- Environment variables for sensitive data
- API key management
- HTTPS support (configure reverse proxy)
- Input validation with Zod schemas
- TypeScript for type safety

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy automatically

### Docker
Use the provided Dockerfile and docker-compose.yml for containerized deployment to any cloud provider.

### Other Platforms
The application can be deployed to:
- AWS (ECS, Elastic Beanstalk)
- Google Cloud Platform (Cloud Run, App Engine)
- Azure (App Service)
- DigitalOcean (App Platform)
- Any Node.js hosting platform

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available for use.

## 👤 Author

**johaankjis**
- GitHub: [@johaankjis](https://github.com/johaankjis)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI integration
- [OpenAI](https://openai.com/) - AI models
- [Radix UI](https://www.radix-ui.com/) - UI components
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Recharts](https://recharts.org/) - Chart library
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework

## 📧 Support

For support, please open an issue in the GitHub repository.

---

Built with ❤️ using Next.js and AI
