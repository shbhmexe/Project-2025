# Coupon Distribution Backend

Backend service for the Coupon Distribution System.

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   MONGODB_DB_NAME=coupon_distribution
   COUPON_CLAIM_COOLDOWN_HOURS=0.00278
   MAX_COUPONS_PER_SESSION=10
   CORS_ORIGIN=http://localhost:5173
   LOG_LEVEL=debug
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Deployment on Render

### Manual Deployment

1. Create a new Web Service on Render
2. Connect your GitHub/GitLab repository
3. Use the following settings:
   - **Name**: coupon-distribution-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add the following environment variables:
   - `NODE_ENV`: production
   - `PORT`: 10000 (Render will automatically use this)
   - `MONGODB_URI`: your_mongodb_connection_string
   - `MONGODB_DB_NAME`: coupon_distribution
   - `COUPON_CLAIM_COOLDOWN_HOURS`: 0.00278
   - `MAX_COUPONS_PER_SESSION`: 10
   - `CORS_ORIGIN`: your_frontend_url
   - `LOG_LEVEL`: info

### Blueprint Deployment

Alternatively, you can use the `render.yaml` file in this repository to deploy using Render Blueprints:

1. Fork this repository
2. Go to the Render Dashboard
3. Click on "Blueprints" in the navigation
4. Click "New Blueprint Instance"
5. Connect your forked repository
6. Configure the required environment variables
7. Deploy

## API Endpoints

- `GET /api/coupons`: Get all available coupons
- `POST /api/coupons/claim`: Claim a coupon
- `GET /api/claims`: Get all claimed coupons 