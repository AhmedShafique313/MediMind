# AWS Bedrock Setup Guide

This application now uses **AWS Bedrock** to access Anthropic Claude for medical report analysis.

## Why AWS Bedrock?

- **Cost-effective**: Generally cheaper than direct API access
- **Scalable**: Enterprise-grade infrastructure
- **Secure**: AWS IAM-based access control
- **Compliant**: HIPAA-eligible service
- **Integrated**: Part of AWS ecosystem

---

## Prerequisites

1. AWS Account (create at [aws.amazon.com](https://aws.amazon.com))
2. Access to AWS Bedrock in your region
3. Model access enabled for Claude Sonnet 4.5

---

## Step-by-Step Setup

### Step 1: Create AWS Account

If you don't have an AWS account:
1. Go to [aws.amazon.com](https://aws.amazon.com)
2. Click "Create an AWS Account"
3. Follow the registration process
4. Add payment method (required)

### Step 2: Enable Bedrock Model Access

1. Sign in to [AWS Console](https://console.aws.amazon.com)
2. Navigate to **Amazon Bedrock** service
3. Select your region (e.g., `us-east-1`)
4. Go to **Model access** in the left sidebar
5. Click **Manage model access** or **Enable specific models**
6. Find **Anthropic Claude Sonnet 4.5**
7. Check the box next to it
8. Click **Request model access** or **Save changes**
9. Wait for approval (usually instant for Claude models)

**Supported Regions:**
- us-east-1 (N. Virginia) ✅ Recommended
- us-west-2 (Oregon)
- eu-west-1 (Ireland)
- ap-southeast-1 (Singapore)

### Step 3: Create IAM User for API Access

1. Go to **IAM Console**: [console.aws.amazon.com/iam](https://console.aws.amazon.com/iam)
2. Click **Users** → **Add users**
3. Enter username: `medical-ai-service`
4. Select **Access key - Programmatic access**
5. Click **Next: Permissions**

### Step 4: Attach Bedrock Permissions

**Option A: Use Existing Policy**
1. Click **Attach existing policies directly**
2. Search for `AmazonBedrockFullAccess`
3. Check the box
4. Click **Next: Tags** → **Next: Review** → **Create user**

**Option B: Create Custom Policy (More Secure)**
1. Click **Create policy**
2. Select **JSON** tab
3. Paste this policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream"
      ],
      "Resource": [
        "arn:aws:bedrock:us-east-1::foundation-model/us.anthropic.claude-sonnet-4-5-v1:0"
      ]
    }
  ]
}
```

4. Click **Review policy**
5. Name it: `BedrockClaudeInvokeOnly`
6. Click **Create policy**
7. Go back to user creation and attach this policy

### Step 5: Get Access Keys

1. After user creation, you'll see **Access key ID** and **Secret access key**
2. **IMPORTANT**: Download the CSV or copy both values
3. You **cannot** retrieve the secret key again!

Example:
```
Access Key ID: AKIAIOSFODNN7EXAMPLE
Secret Access Key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

### Step 6: Configure Application

Open `.env.local` file and add your credentials:

```env
# AI Provider
AI_PROVIDER=anthropic

# AWS Bedrock Configuration
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1

# Application
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Replace with your actual values!**

### Step 7: Test the Setup

```bash
npm run dev
```

Upload a test PDF and verify the analysis works.

---

## Cost Information

### AWS Bedrock Pricing (Claude Sonnet 4.5)

**On-Demand Pricing (us-east-1):**
- Input: $0.003 per 1K tokens
- Output: $0.015 per 1K tokens

**Typical Medical Report:**
- Input: ~2,000 tokens (extracted text)
- Output: ~1,000 tokens (analysis)
- **Cost per report: ~$0.006-0.015** (~$0.01)

**Monthly Estimates:**

| Reports/Month | Estimated Cost |
|---------------|----------------|
| 100 | $0.60-1.50 |
| 500 | $3-7.50 |
| 1,000 | $6-15 |
| 5,000 | $30-75 |
| 10,000 | $60-150 |

**Free Tier:**
- New AWS accounts: 2 months free trial for Bedrock
- Includes limited free usage of models

---

## Security Best Practices

### 1. Never Commit Credentials
- `.env.local` is in `.gitignore`
- Never push credentials to GitHub/GitLab
- Use environment variables in production

### 2. Use IAM Roles (Production)
For AWS deployments (EC2, ECS, Lambda):
- Attach IAM role to instance
- No need for access keys
- Automatic credential rotation

### 3. Rotate Access Keys
- Rotate keys every 90 days
- Create new key before deleting old one
- Update all environments

### 4. Enable CloudTrail
- Log all Bedrock API calls
- Monitor for unauthorized access
- Set up alerts for anomalies

### 5. Set Budgets & Alerts
1. Go to **AWS Billing Console**
2. Create budget for Bedrock usage
3. Set alerts at 50%, 80%, 100% threshold

---

## Troubleshooting

### Error: "Access Denied"
- **Cause**: IAM user lacks permissions
- **Solution**: Attach `AmazonBedrockFullAccess` policy to IAM user

### Error: "Model access denied"
- **Cause**: Model not enabled in Bedrock console
- **Solution**: Enable Claude Sonnet 4.5 in Model access settings

### Error: "Invalid region"
- **Cause**: Bedrock not available in selected region
- **Solution**: Use `us-east-1` or check available regions

### Error: "Invalid credentials"
- **Cause**: Wrong access key or secret key
- **Solution**: Verify keys are correct, regenerate if needed

### Error: "Rate limit exceeded"
- **Cause**: Too many concurrent requests
- **Solution**: Implement request queuing or increase limits

### Error: "Model not found"
- **Cause**: Model ID incorrect or not available
- **Solution**: Check model availability in your region

---

## Available Models on Bedrock

### Anthropic Claude Models

| Model | ID | Best For |
|-------|-----|----------|
| Claude Sonnet 4.5 | `us.anthropic.claude-sonnet-4-5-v1:0` | ✅ Current (Medical Analysis) |
| Claude Sonnet 3.5 | `anthropic.claude-3-5-sonnet-20240620-v1:0` | General tasks |
| Claude Opus 3 | `anthropic.claude-3-opus-20240229-v1:0` | Complex reasoning |
| Claude Haiku 3 | `anthropic.claude-3-haiku-20240307-v1:0` | Fast, cost-effective |

To change models, edit `lib/ai-service.ts`:
```typescript
const modelId = 'us.anthropic.claude-sonnet-4-5-v1:0'; // Change this
```

---

## Monitoring Usage

### AWS Cost Explorer
1. Go to [AWS Cost Explorer](https://console.aws.amazon.com/cost-management/)
2. Filter by service: "Bedrock"
3. View daily/monthly costs
4. Set up cost anomaly detection

### CloudWatch Metrics
1. Go to [CloudWatch Console](https://console.aws.amazon.com/cloudwatch/)
2. Check Bedrock metrics:
   - Invocations
   - Input tokens
   - Output tokens
   - Latency

---

## Production Deployment

### Option 1: Using IAM Roles (Recommended)

**For EC2/ECS:**
```bash
# No credentials needed in .env
# Just set region
AWS_REGION=us-east-1
AI_PROVIDER=anthropic
```

Create IAM role with Bedrock permissions and attach to instance.

### Option 2: AWS Secrets Manager

Store credentials securely:
```bash
aws secretsmanager create-secret \
  --name medical-ai/bedrock-creds \
  --secret-string '{"AWS_ACCESS_KEY_ID":"xxx","AWS_SECRET_ACCESS_KEY":"yyy"}'
```

Retrieve in application:
```typescript
// Add this to your startup code
const secrets = await getSecretValue('medical-ai/bedrock-creds');
process.env.AWS_ACCESS_KEY_ID = secrets.AWS_ACCESS_KEY_ID;
```

### Option 3: Environment Variables

Set in deployment platform (Vercel, Netlify, etc.):
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `AI_PROVIDER=anthropic`

---

## Regional Deployment

### Best Practices

1. **Choose closest region** to your users for lower latency
2. **Check model availability** in target region
3. **Consider compliance** (GDPR in EU regions)
4. **Set up multi-region** for high availability

### Example: EU Deployment

```env
AWS_REGION=eu-west-1
```

Update model ID if needed:
```typescript
const modelId = 'eu.anthropic.claude-sonnet-4-5-v1:0';
```

---

## Comparison: Bedrock vs Direct API

| Feature | AWS Bedrock | Direct Anthropic API |
|---------|-------------|---------------------|
| Cost | ~$0.01/report | ~$0.015/report |
| Setup | More complex | Simpler |
| Scalability | Excellent | Good |
| Integration | AWS ecosystem | Standalone |
| Security | IAM-based | API key |
| Compliance | HIPAA-eligible | Standard |
| Best For | Production/Enterprise | Development/Small scale |

---

## Migration from Direct API

Already using Anthropic API directly? Easy migration:

1. Install AWS SDK (already done)
2. Update `.env.local` with AWS credentials
3. Change `AI_PROVIDER` to `anthropic`
4. Code automatically uses Bedrock!

No code changes needed - the app detects AWS credentials and uses Bedrock automatically.

---

## Support Resources

- **AWS Bedrock Docs**: [docs.aws.amazon.com/bedrock](https://docs.aws.amazon.com/bedrock)
- **Pricing**: [aws.amazon.com/bedrock/pricing](https://aws.amazon.com/bedrock/pricing/)
- **IAM Guide**: [docs.aws.amazon.com/IAM](https://docs.aws.amazon.com/IAM)
- **Model Access**: Check Bedrock console for latest models

---

## Quick Reference

### Environment Variables
```env
AI_PROVIDER=anthropic
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
```

### IAM Policy (Minimal)
```json
{
  "Effect": "Allow",
  "Action": "bedrock:InvokeModel",
  "Resource": "arn:aws:bedrock:*::foundation-model/*"
}
```

### Test Command
```bash
npm run dev
# Upload a PDF and check for analysis
```

---

## Next Steps

1. ✅ Complete AWS setup
2. ✅ Test with sample report
3. ✅ Monitor costs for first week
4. ✅ Set up billing alerts
5. ✅ Configure production environment
6. ✅ Enable CloudTrail logging
7. ✅ Deploy to production

**Ready to analyze medical reports with AWS Bedrock! 🚀**
