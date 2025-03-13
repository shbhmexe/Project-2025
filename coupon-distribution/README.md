# Round-Robin Coupon Distribution System

## Project Overview

This is a web application that implements a round-robin coupon distribution system with abuse prevention mechanisms. The application allows guests to claim coupons while preventing multiple claims from the same source.

## Features

- Guest access without login
- Round-robin coupon distribution
- IP-based claim tracking
- Session-based claim prevention
- Responsive and attractive UI

## Technology Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Express.js
- CORS
- Body-parser

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/coupon-distribution.git
cd coupon-distribution
```

2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

3. Install Backend Dependencies
```bash
cd ../backend
npm install
```

## Running the Application

### Start Backend Server
```bash
cd backend
npm start
```
- Backend runs on `http://localhost:5000`

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
- Frontend runs on `http://localhost:5173`

## Abuse Prevention Mechanisms

1. **IP Tracking**: 
   - Limits coupon claims to one per hour from the same IP address

2. **Session Tracking**: 
   - Prevents multiple coupon claims within the same browser session

## Deployment

- Frontend can be built using `npm run build`
- Backend can be deployed on platforms like Heroku, Vercel, or AWS

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/coupon-distribution](https://github.com/yourusername/coupon-distribution) 