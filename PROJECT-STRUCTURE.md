# Project Structure Overview

## Directory Layout

```
medical/
│
├── 📁 app/                          # Next.js App Router
│   ├── 📁 api/                      # Backend API Routes
│   │   ├── 📁 upload/
│   │   │   └── route.ts            # PDF upload & parsing endpoint
│   │   ├── 📁 analyze/
│   │   │   └── route.ts            # AI analysis endpoint
│   │   └── 📁 reports/
│   │       └── route.ts            # Report storage API
│   │
│   ├── layout.tsx                   # Root layout with metadata
│   ├── page.tsx                     # Main dashboard page
│   └── globals.css                  # Global styles & Tailwind
│
├── 📁 components/                   # React Components
│   ├── FileUpload.tsx              # Drag & drop file upload
│   ├── ReportCard.tsx              # Report list item card
│   ├── AnalysisDetails.tsx         # Full analysis view
│   └── StatsDashboard.tsx          # Statistics cards
│
├── 📁 lib/                          # Business Logic & Utils
│   ├── ai-service.ts               # AI integration (OpenAI/Anthropic)
│   ├── pdf-parser.ts               # PDF text extraction
│   ├── store.ts                    # Zustand state management
│   └── utils.ts                    # Utility functions
│
├── 📁 types/                        # TypeScript Definitions
│   └── index.ts                    # All type definitions
│
├── 📁 uploads/                      # Uploaded PDFs (auto-created)
│
├── 📄 Configuration Files
│   ├── package.json                # Dependencies & scripts
│   ├── tsconfig.json               # TypeScript configuration
│   ├── tailwind.config.ts          # Tailwind CSS setup
│   ├── postcss.config.js           # PostCSS configuration
│   ├── next.config.js              # Next.js configuration
│   ├── .env.local.example          # Environment template
│   ├── .eslintrc.json              # ESLint rules
│   ├── .gitignore                  # Git ignore rules
│   ├── Dockerfile                  # Docker configuration
│   └── .dockerignore               # Docker ignore rules
│
└── 📄 Documentation
    ├── README.md                   # Main documentation
    ├── SETUP.md                    # Quick setup guide
    ├── DEPLOYMENT.md               # Deployment guide
    ├── SAMPLE-REPORT.md            # Test report template
    └── PROJECT-STRUCTURE.md        # This file
```

## Component Architecture

```
┌─────────────────────────────────────────────────────┐
│                    app/page.tsx                      │
│              (Main Dashboard Layout)                 │
│                                                      │
│  ┌──────────────────┐  ┌────────────────────────┐  │
│  │  StatsDashboard  │  │                        │  │
│  │  - Total Reports │  │                        │  │
│  │  - Today's Count │  │                        │  │
│  │  - Critical Cases│  │                        │  │
│  └──────────────────┘  │                        │  │
│                        │  AnalysisDetails       │  │
│  ┌──────────────────┐  │  - Summary             │  │
│  │   FileUpload     │  │  - Detected Conditions │  │
│  │  - Drag & Drop   │  │  - Abnormal Findings   │  │
│  │  - Validation    │  │  - Recommendations     │  │
│  └──────────────────┘  │  - Export PDF          │  │
│                        │                        │  │
│  ┌──────────────────┐  └────────────────────────┘  │
│  │   ReportCard     │                              │
│  │  (List of Cards) │                              │
│  │  - File Name     │                              │
│  │  - Status        │                              │
│  │  - Risk Level    │                              │
│  └──────────────────┘                              │
└─────────────────────────────────────────────────────┘
```

## Data Flow

```
┌─────────────┐
│   Browser   │
│  (Upload)   │
└──────┬──────┘
       │ FormData (PDF)
       ▼
┌─────────────────────────────────────────────────────┐
│              API: /api/upload                        │
│  1. Validate file (type, size)                      │
│  2. Convert to buffer                               │
│  3. Parse PDF → Extract text                        │
│  4. Validate medical content                        │
│  5. Save file to disk                               │
│  6. Return: { reportId, extractedText }             │
└──────┬──────────────────────────────────────────────┘
       │ { reportId, extractedText }
       ▼
┌─────────────────────────────────────────────────────┐
│            API: /api/analyze                         │
│  1. Receive extracted text                          │
│  2. Send to AI (GPT-4/Claude)                       │
│  3. Parse AI response (JSON)                        │
│  4. Structure analysis data                         │
│  5. Return: { analysis }                            │
└──────┬──────────────────────────────────────────────┘
       │ { analysis }
       ▼
┌─────────────────────────────────────────────────────┐
│            Zustand Store (Client)                    │
│  - Add report to list                               │
│  - Update status: processing → completed            │
│  - Store analysis results                           │
│  - Trigger UI updates                               │
└──────┬──────────────────────────────────────────────┘
       │ State updates
       ▼
┌─────────────────────────────────────────────────────┐
│          React Components Re-render                  │
│  - Show analysis in AnalysisDetails                 │
│  - Update ReportCard                                │
│  - Refresh StatsDashboard                           │
└─────────────────────────────────────────────────────┘
```

## State Management (Zustand)

```typescript
ReportStore {
  reports: MedicalReport[]          // All uploaded reports
  selectedReport: MedicalReport?    // Currently viewing
  isUploading: boolean              // Upload state

  addReport()                       // Add new report
  updateReport()                    // Update existing
  deleteReport()                    // Remove report
  setSelectedReport()               // Set active view
  getStats()                        // Calculate statistics
}
```

## Type System

```typescript
MedicalReport {
  id: string
  fileName: string
  uploadDate: Date
  fileSize: number
  status: 'processing' | 'completed' | 'failed'
  extractedText?: string
  analysis?: ReportAnalysis
  error?: string
}

ReportAnalysis {
  summary: string
  detectedConditions: DetectedCondition[]
  abnormalFindings: AbnormalFinding[]
  recommendations: string[]
  riskLevel: 'low' | 'moderate' | 'high' | 'critical'
  confidence: number
  analyzedAt: Date
}

DetectedCondition {
  name: string
  category: DiseaseCategory
  status: 'detected' | 'absent' | 'inconclusive'
  confidence: number
  indicators: string[]
  severity?: 'mild' | 'moderate' | 'severe'
  description: string
}

AbnormalFinding {
  parameter: string
  value: string
  normalRange: string
  deviation: 'high' | 'low'
  significance: 'minor' | 'moderate' | 'major'
  relatedConditions: string[]
}
```

## API Endpoints

### POST /api/upload
**Request:** FormData with PDF file
**Response:**
```json
{
  "success": true,
  "reportId": "uuid",
  "fileName": "report.pdf",
  "extractedText": "...",
  "fileSize": 12345,
  "numPages": 2
}
```

### POST /api/analyze
**Request:**
```json
{
  "reportId": "uuid",
  "extractedText": "..."
}
```
**Response:**
```json
{
  "success": true,
  "analysis": { ... }
}
```

### GET /api/reports
**Response:**
```json
{
  "success": true,
  "reports": [...]
}
```

## AI Integration

```
┌───────────────────────────────────────────────────┐
│              lib/ai-service.ts                     │
├───────────────────────────────────────────────────┤
│                                                   │
│  analyzeMedicalReport(text)                       │
│    ↓                                              │
│  ┌─────────────────────────────────────┐         │
│  │  AI_PROVIDER == 'openai' ?          │         │
│  └────────┬─────────────────────┬───────┘         │
│           │                     │                 │
│    ┌──────▼─────┐      ┌───────▼──────┐         │
│    │  OpenAI    │      │  Anthropic   │         │
│    │  GPT-4     │      │  Claude      │         │
│    │  Turbo     │      │  Sonnet 4.5  │         │
│    └──────┬─────┘      └───────┬──────┘         │
│           │                     │                 │
│           └──────────┬──────────┘                 │
│                      ▼                            │
│            JSON Response                          │
│    {                                              │
│      summary,                                     │
│      detectedConditions,                          │
│      abnormalFindings,                            │
│      recommendations,                             │
│      riskLevel,                                   │
│      confidence                                   │
│    }                                              │
└───────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **React 18**: UI library
- **Next.js 14**: Full-stack framework (App Router)
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **Zustand**: State management
- **react-dropzone**: File upload
- **Lucide Icons**: Icon library
- **jsPDF**: PDF export

### Backend
- **Next.js API Routes**: Serverless functions
- **pdf-parse**: PDF text extraction
- **OpenAI SDK**: GPT-4 integration
- **Anthropic SDK**: Claude integration

### Build Tools
- **PostCSS**: CSS processing
- **ESLint**: Code linting
- **TypeScript**: Type checking

## Key Features Implementation

### 1. PDF Upload
- Drag & drop interface (react-dropzone)
- File validation (type, size)
- Progress indication

### 2. PDF Parsing
- Text extraction (pdf-parse)
- Content validation
- Error handling

### 3. AI Analysis
- Multi-provider support (OpenAI/Anthropic)
- Structured prompts
- JSON response parsing
- Confidence scoring

### 4. Disease Detection
- 20+ condition checks
- Lab value comparison
- Severity assessment
- Evidence-based indicators

### 5. Results Display
- Comprehensive analysis view
- Color-coded risk levels
- Interactive UI
- Export functionality

### 6. State Management
- Centralized store (Zustand)
- Real-time updates
- Persistent data
- Computed statistics

## Performance Characteristics

- **Upload**: ~1-3 seconds
- **PDF Parsing**: ~2-5 seconds
- **AI Analysis**: ~5-15 seconds
- **Total**: ~10-20 seconds per report

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Mobile Responsive

- Breakpoints: sm (640px), md (768px), lg (1024px)
- Mobile-first design
- Touch-optimized interactions
- Sidebar collapse on mobile

## Security Features

- File type validation
- File size limits (10MB)
- Environment variable protection
- XSS prevention (React)
- API route protection
- Input sanitization

## Extensibility Points

1. **Database Integration**: Replace in-memory storage
2. **Authentication**: Add user system
3. **More AI Providers**: Add Google AI, etc.
4. **Additional Analysis**: Add imaging, pathology
5. **Multi-language**: Add i18n support
6. **Webhooks**: Add notification system
7. **API Keys**: Add user-specific keys
8. **Batch Processing**: Handle multiple files
9. **Historical Tracking**: Compare over time
10. **Provider Portal**: For healthcare facilities
