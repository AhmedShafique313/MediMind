# 🚀 Local Setup Instructions

## Quick Setup for Local Development

### Step 1: Clone the Repository

```bash
git clone https://github.com/AhmedShafique313/MediMind.git
cd MediMind
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages (500+ dependencies).

### Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Windows
type nul > .env.local

# Mac/Linux
touch .env.local
```

Add the following configuration:

```env
# Groq AI Configuration
GROQ_API_KEY=your_groq_api_key_here

# Application Configuration
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Stripe Configuration (Optional - add when ready)
# STRIPE_SECRET_KEY=your_stripe_secret_key
# STRIPE_WEBHOOK_SECRET=your_webhook_secret
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
```

### Step 4: Get Your Groq API Key

1. Visit [console.groq.com](https://console.groq.com)
2. Sign up or log in (free account available)
3. Navigate to **API Keys** section
4. Click **Create API Key**
5. Copy the key (starts with `gsk_`)
6. Paste it in `.env.local` as `GROQ_API_KEY=gsk_...`

### Step 5: Run the Development Server

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

---

## ✅ Verification

Once the server is running:

1. Open http://localhost:3000 in your browser
2. You should see the MediMind dashboard
3. Try uploading a sample PDF medical report
4. Check that analysis completes in 5-10 seconds

---

## 📁 Project Structure

```
MediMind/
├── .env.local              # Your local environment (NOT in git)
├── .env.local.example      # Template for environment variables
├── .gitignore             # Git ignore rules (.env.local is ignored)
├── app/                   # Next.js app directory
│   ├── api/              # API routes
│   ├── pricing/          # Pricing page
│   ├── page.tsx          # Main dashboard
│   └── layout.tsx        # Root layout
├── components/           # React components
├── lib/                  # Business logic
├── types/                # TypeScript definitions
└── public/               # Static assets
```

---

## 🔒 Security Note

**IMPORTANT**: The `.env.local` file contains your API keys and should NEVER be committed to Git.

✅ **Already configured**:
- `.env.local` is in `.gitignore`
- Your API keys stay local
- Safe to push code to GitHub

---

## 🛠️ Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 🧪 Testing with Sample Data

1. Create a PDF with sample lab results (see SAMPLE-REPORT.md)
2. Upload via the dashboard
3. Wait 5-10 seconds for AI analysis
4. Review detected conditions and recommendations

---

## 🚀 Deploy to Production

When ready to deploy:

1. **Vercel** (Recommended):
   - Connect your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy automatically

2. **Docker**:
   ```bash
   docker build -t medimind .
   docker run -p 3000:3000 -e GROQ_API_KEY=your_key medimind
   ```

3. **AWS/Cloud**:
   - See DEPLOYMENT.md for detailed guides

---

## ❓ Troubleshooting

### Error: "GROQ_API_KEY is not set"
- Check `.env.local` exists in root directory
- Verify the API key is correct
- Restart the development server (`npm run dev`)

### Error: "Module not found"
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then reinstall

### PDF Upload Fails
- Ensure file is a valid PDF (not image)
- File size must be under 10MB
- PDF must contain readable text

### Port 3000 Already in Use
```bash
# Use a different port
PORT=3001 npm run dev
```

---

## 📚 Documentation

- **README.md** - Main documentation
- **QUICK-START.md** - Fast setup guide
- **GROQ-SETUP.md** - Groq AI details
- **DEPLOYMENT.md** - Production deployment
- **PROJECT-STRUCTURE.md** - Architecture

---

## 💡 Tips

1. **Free Tier**: Groq offers 10,000 requests/day for free
2. **Fast Processing**: Analysis takes only 2-5 seconds
3. **Credit System**: Built-in, ready when you add Stripe
4. **Mobile Responsive**: Works on all devices
5. **Export Reports**: Download analysis as PDF

---

## 🎯 Next Steps

1. ✅ Clone repository
2. ✅ Install dependencies
3. ✅ Configure `.env.local`
4. ✅ Get Groq API key
5. ✅ Run development server
6. ✅ Test with sample report
7. 🚀 Deploy to production
8. 💰 Enable payments (optional)

---

## 🆘 Need Help?

- Check documentation files
- Review error messages in terminal
- Verify environment variables
- Open an issue on GitHub

---

**You're ready to develop and run MediMind locally!** 🎉

Visit: http://localhost:3000 after running `npm run dev`
