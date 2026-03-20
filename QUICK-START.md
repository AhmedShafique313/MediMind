# 🚀 Quick Start Guide

Get your Medical Report AI system running in 3 minutes!

## ✅ Prerequisites Check

- [x] Node.js 18+ installed
- [x] npm 9+ installed
- [ ] OpenAI API key OR Anthropic API key

## 📦 Installation Complete

Dependencies are already installed! (486 packages)

## 🔑 Get Your API Key (Choose One)

### Option A: OpenAI (Recommended)

1. Visit: https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-proj-` or `sk-`)
5. Paste it in `.env.local` file

### Option B: Anthropic Claude

1. Visit: https://console.anthropic.com/
2. Sign up or log in
3. Navigate to "API Keys"
4. Create new key
5. Copy the key (starts with `sk-ant-`)
6. Paste it in `.env.local` file

## ⚙️ Configure Environment

Open the `.env.local` file and add your API key:

```env
# For OpenAI (Recommended)
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-actual-key-here

# OR for Anthropic
# AI_PROVIDER=anthropic
# ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```

**Important:** Replace `your_openai_api_key_here` with your real API key!

## 🎯 Start the Application

```bash
npm run dev
```

The app will start at: **http://localhost:3000**

## 🧪 Test the System

### Method 1: Create a Quick Test PDF

1. Open Word/Google Docs
2. Copy this content:

```
MEDICAL LABORATORY REPORT

Patient: Test Patient
Date: March 21, 2026

COMPLETE BLOOD COUNT
Hemoglobin: 11.0 g/dL (Normal: 13.5-17.5) LOW
Glucose: 145 mg/dL (Normal: 70-100) HIGH
HbA1c: 6.8% (Normal: <5.7%) HIGH

INTERPRETATION:
Possible anemia and diabetes indicated by lab values.
```

3. Save as PDF
4. Upload to the application

### Method 2: Use Sample Template

See `SAMPLE-REPORT.md` for a comprehensive test report template.

## 🎨 What You Should See

1. **Upload Section**: Drag & drop area for PDFs
2. **Report List**: Shows uploaded reports
3. **Dashboard Stats**: Total reports, detections, etc.
4. **Analysis View**: Click any report to see full analysis

## 🔍 Expected Results

The AI should detect:
- ✅ Anemia (low hemoglobin)
- ✅ Diabetes/Prediabetes (high glucose & HbA1c)
- ✅ Risk level: Moderate or High
- ✅ Recommendations for follow-up

## ❌ Troubleshooting

### "No AI provider configured"
→ Check your `.env.local` file has the API key
→ Restart the server: `Ctrl+C` then `npm run dev`

### "Invalid API key"
→ Verify the key is correct (no extra spaces)
→ Check the key has credits/quota

### Upload fails
→ Ensure file is a PDF (not image)
→ File must be under 10MB
→ PDF must contain text (not scanned image only)

### Port 3000 already in use
```bash
# Use a different port
PORT=3001 npm run dev
```

## 📊 Usage Tips

1. **Best Results**: Use clear, text-based lab reports
2. **File Format**: PDFs work best (avoid scanned images)
3. **Wait Time**: Analysis takes 10-20 seconds
4. **Export**: Click download icon to save analysis as PDF
5. **Multiple Files**: Upload multiple reports to track history

## 🎯 Next Steps

1. **Customize Branding**: Edit colors in `tailwind.config.ts`
2. **Add Database**: Replace in-memory storage (see README.md)
3. **Deploy**: Use Vercel, AWS, or Docker (see DEPLOYMENT.md)
4. **Add Auth**: Implement user authentication
5. **Scale**: Add features from PROJECT-STRUCTURE.md

## 📖 Documentation

- **README.md** - Full documentation
- **SETUP.md** - Detailed setup instructions
- **DEPLOYMENT.md** - Production deployment guide
- **PROJECT-STRUCTURE.md** - Architecture overview
- **SAMPLE-REPORT.md** - Test report templates

## 💰 Cost Considerations

### OpenAI (GPT-4 Turbo)
- ~$0.01-0.03 per report
- 100 reports = ~$1-3
- 1,000 reports = ~$10-30

### Anthropic (Claude Sonnet)
- ~$0.003-0.015 per report
- 100 reports = ~$0.30-1.50
- 1,000 reports = ~$3-15

**Start small, test with 10-20 reports first!**

## 🛡️ Medical Disclaimer

⚠️ This is a diagnostic support tool, NOT a replacement for professional medical advice. Always consult qualified healthcare professionals.

## ✅ System Check

Before considering it "done":

- [ ] Application runs at http://localhost:3000
- [ ] Can upload a PDF successfully
- [ ] AI analysis completes without errors
- [ ] Can view detailed analysis
- [ ] Can export analysis as PDF
- [ ] Dashboard shows correct statistics

## 🆘 Need Help?

1. Check error messages in browser console (F12)
2. Check terminal for server errors
3. Verify API key is valid and has credits
4. Review SETUP.md for common issues
5. Check that all dependencies installed correctly

## 🎉 You're Ready!

Your production-ready Medical Report AI system is now running!

**Default URL:** http://localhost:3000

Start uploading medical reports and see the AI magic in action! 🚀
