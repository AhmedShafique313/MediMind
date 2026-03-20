# Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites
- GitHub/GitLab account
- Vercel account

### Steps

1. **Push to Git**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Configure environment variables:
     - `AI_PROVIDER`: `openai` or `anthropic`
     - `OPENAI_API_KEY`: Your OpenAI key
     - OR `ANTHROPIC_API_KEY`: Your Anthropic key
   - Click "Deploy"

3. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Configure DNS as instructed

### Vercel Environment Variables

```
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...
NODE_ENV=production
```

## Docker Deployment

### Dockerfile

Already included in the project. To build and run:

```bash
# Build image
docker build -t medical-report-ai .

# Run container
docker run -p 3000:3000 \
  -e AI_PROVIDER=openai \
  -e OPENAI_API_KEY=your_key \
  medical-report-ai
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - AI_PROVIDER=openai
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - NODE_ENV=production
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

## AWS Deployment

### AWS Amplify

1. Connect your GitHub repository
2. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
3. Add environment variables in Amplify console
4. Deploy

### AWS EC2

1. Launch Ubuntu EC2 instance
2. Install Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. Clone and setup:
```bash
git clone <repo-url>
cd medical
npm install
npm run build
```

4. Use PM2 for process management:
```bash
sudo npm install -g pm2
pm2 start npm --name "medical-ai" -- start
pm2 save
pm2 startup
```

5. Configure Nginx as reverse proxy:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `AI_PROVIDER` | Yes | AI service to use | `openai` or `anthropic` |
| `OPENAI_API_KEY` | If using OpenAI | OpenAI API key | `sk-proj-...` |
| `ANTHROPIC_API_KEY` | If using Anthropic | Anthropic API key | `sk-ant-...` |
| `NODE_ENV` | Yes | Environment | `production` |
| `NEXT_PUBLIC_APP_URL` | No | Application URL | `https://app.com` |

## Performance Optimization

### 1. Enable Compression
Add to `next.config.js`:
```javascript
compress: true,
```

### 2. Configure Caching
Add cache headers in API routes:
```typescript
return NextResponse.json(data, {
  headers: {
    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
  },
});
```

### 3. Image Optimization
Already configured in Next.js.

### 4. Database Connection Pooling
When adding PostgreSQL, use connection pooling:
```typescript
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

## Monitoring & Logging

### Vercel Analytics
Enable in Vercel dashboard automatically.

### Custom Monitoring

1. **Sentry** for error tracking:
```bash
npm install @sentry/nextjs
```

2. **LogRocket** for session replay:
```bash
npm install logrocket
```

3. **Google Analytics** for usage tracking

## SSL Certificate

### Let's Encrypt (Free)
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Automatic Renewal
```bash
sudo certbot renew --dry-run
```

## Backup Strategy

1. **Database Backups**: Daily automated backups
2. **File Storage**: Replicate to S3 or similar
3. **Configuration**: Store in version control

## Security Checklist

- [ ] HTTPS enabled
- [ ] API keys in environment variables (not code)
- [ ] Rate limiting configured
- [ ] CORS policies set
- [ ] File upload validation
- [ ] Input sanitization
- [ ] Security headers configured
- [ ] Regular dependency updates
- [ ] Logging and monitoring enabled
- [ ] Firewall rules configured

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (AWS ALB, Nginx)
- Deploy multiple instances
- Session management with Redis

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Implement caching layer

### Database
- Move from in-memory to PostgreSQL/MongoDB
- Set up read replicas
- Implement connection pooling

## Cost Estimation

### OpenAI API Costs
- GPT-4 Turbo: ~$0.01-0.03 per report
- 1,000 reports/month: ~$10-30
- 10,000 reports/month: ~$100-300

### Anthropic API Costs
- Claude Sonnet: ~$0.003-0.015 per report
- Generally more cost-effective for high volume

### Hosting
- Vercel: Free tier → $20/month (Pro)
- AWS: ~$20-50/month (t3.small)
- Digital Ocean: ~$12-24/month

## Support & Maintenance

### Regular Tasks
- Update dependencies monthly
- Monitor API usage and costs
- Review error logs weekly
- Backup data daily
- Test with sample reports

### Emergency Procedures
1. Monitor uptime (UptimeRobot, Pingdom)
2. Set up alerts for failures
3. Keep backup deployment ready
4. Document rollback procedures

## Production URLs

After deployment, update these:
- API endpoint URLs
- OAuth redirect URIs (if added)
- Webhook URLs (if added)
- CORS allowed origins

## Rollback Procedure

### Vercel
Click "Rollback" in deployment dashboard

### Docker
```bash
docker pull medical-report-ai:previous
docker stop current-container
docker run previous-image
```

### Manual
```bash
git revert HEAD
npm run build
pm2 restart medical-ai
```
