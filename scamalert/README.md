# ScamAlert Backend API

A comprehensive Next.js 13+ backend API for detecting scam messages and malicious URLs using advanced NLP techniques and external security services.

## 🚀 Features

- **Text Analysis**: Scans messages for scam-related keywords and patterns
- **URL Detection**: Identifies suspicious URLs and domains
- **Contact Pattern Analysis**: Detects suspicious phone numbers and emails
- **Modular Architecture**: Easy to extend with external APIs
- **Rate Limiting Ready**: Built-in support for rate limiting
- **Comprehensive Logging**: Detailed error handling and logging
- **Debug Mode**: Optional debug information for development

## 📁 Project Structure

```
app/
├── api/
│   └── scan/
│       ├── route.js          # Main API endpoint
│       └── integrations.js   # External API utilities
└── scan/                     # Frontend (your existing UI)
.env.local                    # Environment configuration
```

## 🔧 Installation 6 Setup

1. **Clone or navigate to your project directory**
```bash
cd scamalert
```

2. **Install dependencies** (if not already done)
```bash
npm install
```

3. **Configure environment variables**
Copy the `.env.local` file and update the API keys as needed:

```env
# Basic Configuration
NODE_ENV=development
RATE_LIMIT_RPM=60
MAX_TEXT_LENGTH=10000

# External API Keys (optional - add when ready to integrate)
# VIRUSTOTAL_API_KEY=your_key_here
# OPENAI_API_KEY=your_key_here
# URLVOID_API_KEY=your_key_here
# PHISHTANK_API_KEY=your_key_here
```

4. **Start the development server**
```bash
npm run dev
```

## 🔌 API Endpoints

### POST `/api/scan`

Analyzes text for scam indicators and returns a detailed assessment.

**Request Body:**
```json
{
  "text": "Your message or URL to analyze",
  "options": {
    "debug": false
  }
}
```

**Response:**
```json
{
  "result": "Safe | Potential Scam | Scam Detected",
  "threatLevel": "Low | Medium | High",
  "explanation": "Detailed explanation of the assessment",
  "score": 5,
  "details": {
    "keywordsFound": ["urgent", "otp", "verify"],
    "suspiciousUrls": ["http://bit.ly/suspicious"],
    "contactInfo": {
      "hasPhones": true,
      "hasEmails": false
    }
  },
  "timestamp": "2024-01-25T10:30:00Z",
  "version": "1.0.0"
}
```

### GET `/api/scan`

Returns API information and usage instructions.

## 🧠 How It Works

### 1. Keyword Analysis
- Scans for 50+ scam-related keywords across multiple categories:
  - **Urgency**: "urgent", "expires today", "act now"
  - **Prizes**: "win", "lottery", "jackpot", "free money"
  - **Authentication**: "otp", "verify", "password", "cvv"
  - **Emotional**: "emergency", "help", "stranded"
  - **Authority**: "irs", "police", "government"

### 2. URL Analysis
- Detects URLs using advanced regex patterns
- Checks against suspicious domains and URL shorteners
- Identifies spoofed domains (e.g., "paypaI.com" instead of "paypal.com")
- Flags common phishing patterns

### 3. Contact Pattern Detection
- Identifies phone numbers and email addresses
- Flags suspicious email domains (temporary email services)
- Detects multiple contact methods (suspicious pattern)

### 4. Threat Assessment
- Calculates weighted scores based on risk levels
- **High-risk keywords** (OTP, CVV, SSN): +3 points
- **Medium-risk keywords** (urgent, expires): +2 points
- **Standard keywords**: +1 point
- **Suspicious URLs**: +1-2 points each
- **Contact patterns**: +1-2 points

## 🔗 External API Integration

The backend is designed to easily integrate with external security services:

### 1. VirusTotal API
```javascript
// Add to .env.local
VIRUSTOTAL_API_KEY=your_virustotal_api_key

// The integration will automatically scan URLs for malicious content
```

### 2. OpenAI API
```javascript
// Add to .env.local
OPENAI_API_KEY=your_openai_api_key

// Uses GPT-3.5-turbo for advanced text analysis
```

### 3. URLVoid API
```javascript
// Add to .env.local
URLVOID_API_KEY=your_urlvoid_api_key

// Checks URL reputation across multiple security engines
```

### 4. PhishTank API
```javascript
// Add to .env.local
PHISHTANK_API_KEY=your_phishtank_api_key

// Checks against known phishing URL database
```

## 🔑 Getting API Keys

### VirusTotal (Free)
1. Visit: https://www.virustotal.com/gui/join-us
2. Sign up for a free account
3. Get your API key from the user menu
4. **Free tier**: 1,000 requests/day

### OpenAI (Paid)
1. Visit: https://platform.openai.com/api-keys
2. Create an account and add billing information
3. Create a new API key
4. **Cost**: ~$0.001-0.002 per request

### URLVoid (Paid)
1. Visit: https://www.urlvoid.com/api/
2. Choose a pay-as-you-go plan
3. Get your API key after payment
4. **Cost**: $0.10 per 100 queries

### PhishTank (Free)
1. Visit: https://www.phishtank.com/api_register.php
2. Register for a free API key
3. **Free tier**: 10,000 requests/day

## 🧪 Testing

### Example Test Requests

**Safe Message:**
```bash
curl -X POST http://localhost:3000/api/scan \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello, how are you doing today?"}'
```

**Suspicious Message:**
```bash
curl -X POST http://localhost:3000/api/scan \
  -H "Content-Type: application/json" \
  -d '{"text": "URGENT! You won $1,000,000! Click here to claim: http://bit.ly/claim-prize. Enter your SSN and PIN."}'
```

**With Debug Info:**
```bash
curl -X POST http://localhost:3000/api/scan \
  -H "Content-Type: application/json" \
  -d '{"text": "Your message here", "options": {"debug": true}}'
```

## 🔒 Security Features

- **Input Validation**: Validates all inputs and limits text length
- **Rate Limiting Ready**: Environment configuration for rate limits
- **Error Handling**: Comprehensive error handling and logging
- **CORS Configuration**: Configurable allowed origins
- **API Key Security**: Environment-based API key management

## 📊 Response Codes

- **200**: Success - Analysis completed
- **400**: Bad Request - Invalid input or text too long
- **429**: Too Many Requests - Rate limit exceeded (when implemented)
- **500**: Internal Server Error - Server-side error

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
ALLOWED_ORIGINS=https://yourdomain.com
RATE_LIMIT_RPM=30
LOG_LEVEL=warn
ENABLE_REQUEST_LOGGING=false
```

### Next.js Deployment
The API routes will automatically deploy with your Next.js application on platforms like:
- Vercel
- Netlify
- Railway
- Digital Ocean App Platform

## 🤝 Contributing

The backend is designed to be modular and extensible. To add new features:

1. **New Analysis Functions**: Add to the main `route.js` file
2. **External Integrations**: Add to `integrations.js`
3. **New Keywords/Patterns**: Update the constant arrays
4. **Custom Scoring**: Modify the `assessThreat()` function

## 📝 License

MIT License - feel free to use and modify for your projects.

## 🆘 Support

For questions or issues:
1. Check the console logs for detailed error messages
2. Verify API keys are correctly set in `.env.local`
3. Test with simple messages first before complex ones
4. Use debug mode for detailed analysis information

---

**Built with Next.js 13+ App Router | Ready for production use**
