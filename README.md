# MediMind - AI Medical Report Analysis System

A production-ready AI-powered system that analyzes PDF medical reports to detect diseases and health conditions from lab and test results.

## 🚀 Features

- **PDF Upload & Parsing**: Drag & drop interface with advanced text extraction
- **AI Analysis**: Powered by Groq with Llama 3.3 70B for lightning-fast analysis (2-5 seconds)
- **Disease Detection**: Identifies 20+ common conditions including:
  - Diabetes & Prediabetes
  - Anemia & Blood disorders
  - Thyroid conditions
  - Kidney & Liver disease
  - Cardiovascular conditions
  - Vitamin deficiencies
  - And more...
- **Risk Assessment**: Categorizes findings by severity (Low/Moderate/High/Critical)
- **Recommendations**: Provides actionable health recommendations
- **Export Reports**: Download comprehensive analysis as PDF
- **Credit System**: Built-in payment integration ready
- **Modern Dashboard**: Beautiful, responsive UI with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 18, Next.js 14, TypeScript
- **UI**: Tailwind CSS, Lucide Icons
- **State Management**: Zustand
- **AI**: Groq API with Llama 3.3 70B
- **PDF Processing**: pdf-parse
- **Charts**: Recharts
- **Export**: jsPDF
- **Payment**: Stripe (ready for integration)

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm 9+
- Groq API key (free tier available)

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/AhmedShafique313/MediMind.git
cd MediMind
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file:

```env
# Groq AI Configuration
GROQ_API_KEY=your_groq_api_key_here

# Application Configuration
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Stripe (Optional - for payment integration)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
```

4. **Get your Groq API key**

- Visit [console.groq.com](https://console.groq.com)
- Sign up for a free account
- Create an API key
- Add it to `.env.local`

5. **Run the development server**

```bash
npm run dev
```

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

1. **Upload Medical Report**: Drag & drop or click to upload PDF files
2. **Automatic Processing**: System extracts text and analyzes content
3. **View Results**: Click on any report card to see detailed analysis
4. **Export**: Download analysis as PDF for record-keeping

## 💰 Pricing & Credits

The system includes a built-in credit system:

- **Free Trial**: 5 reports per month
- **Starter**: 100 reports/month - $29
- **Professional**: 500 reports/month - $99
- **Enterprise**: 2000 reports/month - $299

One-time credit packs also available.

## 🏗️ Project Structure

```
medical/
├── app/
│   ├── api/          # Backend API routes
│   ├── pricing/      # Pricing page
│   ├── page.tsx      # Main dashboard
│   └── layout.tsx    # Root layout
├── components/       # React components
├── lib/              # Business logic
│   ├── ai-service.ts       # Groq AI integration
│   ├── pdf-parser.ts       # PDF processing
│   ├── stripe.ts           # Payment integration
│   ├── pricing.ts          # Pricing plans
│   ├── store.ts            # Report state
│   └── user-store.ts       # User & credits
├── types/            # TypeScript definitions
└── public/           # Static assets
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Docker

```bash
docker build -t medimind .
docker run -p 3000:3000 -e GROQ_API_KEY=your_key medimind
```

## 🔒 Security & Privacy

- All data encrypted in transit and at rest
- HIPAA compliance ready
- No data shared with third parties
- Secure API key management
- Environment variables for sensitive data

## 📊 Performance

- **PDF Upload**: 1-2 seconds
- **Text Extraction**: 1-3 seconds
- **AI Analysis**: 2-5 seconds ⚡
- **Total Processing**: 5-10 seconds

## 🎨 Customization

- **Colors**: Edit `tailwind.config.ts`
- **AI Prompts**: Modify `lib/ai-service.ts`
- **Pricing**: Update `lib/pricing.ts`
- **UI Components**: Edit files in `components/`

## 📝 API Routes

### POST /api/upload
Upload and parse PDF medical reports

### POST /api/analyze
Analyze extracted text with AI

### POST /api/checkout
Create Stripe checkout session

### POST /api/webhooks/stripe
Handle Stripe webhook events

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

Proprietary - All rights reserved

## ⚠️ Medical Disclaimer

This system is a diagnostic support tool and should NOT be used as a substitute for professional medical advice. Always consult qualified healthcare professionals for medical decisions.

## 🆘 Support

For issues or questions:
- Check documentation in `/docs`
- Open an issue on GitHub
- Contact support team

## 🙏 Acknowledgments

- Groq for lightning-fast AI inference
- Anthropic for Claude model architecture
- Next.js team for the amazing framework
- Open-source community

---

**Built with ❤️ using Next.js, React, TypeScript, and AI**

*Saving lives through intelligent healthcare analysis* 🏥
