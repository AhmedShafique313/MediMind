# Quick Setup Guide

## Step-by-Step Installation

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js, React, TypeScript
- OpenAI/Anthropic SDK
- PDF parsing libraries
- UI components and utilities

### 2. Get Your AI API Key

#### Option A: OpenAI (Recommended for production)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (starts with `sk-`)

#### Option B: Anthropic Claude

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Navigate to API Keys
4. Create a new API key
5. Copy the key (starts with `sk-ant-`)

### 3. Configure Environment

Create a `.env.local` file in the root directory:

```bash
# For OpenAI
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-key-here

# OR for Anthropic
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### 4. Run the Application

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

### 5. Test with Sample Report

1. Open the application in your browser
2. Upload a PDF medical report
3. Wait for processing (10-20 seconds)
4. View the analysis results

## Troubleshooting

### "No AI provider configured"
- Make sure you've created `.env.local` file
- Verify your API key is correct
- Restart the development server after adding environment variables

### PDF Upload Fails
- Ensure the file is a valid PDF
- Check file size is under 10MB
- Verify the PDF contains readable text (not just images)

### AI Analysis Takes Too Long
- Normal processing time: 10-20 seconds
- If timeout occurs, check your API key has credits/quota
- Check your internet connection

### Build Errors
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## Production Checklist

Before deploying to production:

- [ ] Set `NODE_ENV=production`
- [ ] Use production API keys
- [ ] Enable HTTPS
- [ ] Configure proper error logging
- [ ] Set up monitoring
- [ ] Implement rate limiting
- [ ] Add user authentication
- [ ] Review security settings
- [ ] Test with real medical reports
- [ ] Set up backup system
- [ ] Configure CDN for static assets
- [ ] Enable compression
- [ ] Set up domain and SSL certificate

## Next Steps

1. **Customize**: Modify the UI colors and branding in `tailwind.config.ts`
2. **Add Features**: Extend disease detection logic in `lib/ai-service.ts`
3. **Database**: Replace in-memory storage with PostgreSQL/MongoDB
4. **Auth**: Add authentication with NextAuth.js or similar
5. **Deploy**: Deploy to Vercel, AWS, or your preferred platform

## Common Issues

### Module not found errors
```bash
npm install
rm -rf .next
npm run dev
```

### Port already in use
```bash
# Change port in package.json or use:
PORT=3001 npm run dev
```

### TypeScript errors
```bash
npm run type-check
```

## Support

If you encounter issues:

1. Check the README.md for detailed documentation
2. Verify all environment variables are set correctly
3. Ensure your API keys are valid and have sufficient credits
4. Check the browser console for error messages
5. Review the terminal output for server-side errors

## Example .env.local

```env
# Application
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# AI Provider (choose one)
AI_PROVIDER=openai

# OpenAI Configuration
OPENAI_API_KEY=sk-proj-xxx...

# OR Anthropic Configuration
# AI_PROVIDER=anthropic
# ANTHROPIC_API_KEY=sk-ant-xxx...
```

Save this as `.env.local` in the root directory and restart the server.
