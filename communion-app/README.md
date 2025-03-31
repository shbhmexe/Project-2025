# Communion - Building Bridges Through Shared Experiences

![image](https://github.com/user-attachments/assets/ba8acf22-f9bf-4f4a-a490-d6d982fa001a)

Communion is a modern web application designed to connect communities across different faiths and backgrounds. The platform enables users to discover events, join communities, and build meaningful relationships with people from diverse backgrounds.

## 🌟 Features

- **Multi-theme Support**: Light, Dark, and Purple themes to suit user preferences
- **Responsive Design**: Fully responsive interface that works on mobile, tablet, and desktop
- **Event Management**: Browse, filter, and create community events
- **Interactive Maps**: Location-based event discovery with interactive maps
- **User Authentication**: Secure login and registration system
- **Community Groups**: Join and participate in various community groups
- **Blog Section**: Read and engage with community-focused content
- **Contact System**: Easy communication with community organizers

## 🚀 Live Demo

Check out the live demo: [Communion App](https://communion-liard.vercel.app/)

## 🛠️ Technologies Used

- **Frontend Framework**: React.js
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Heroicons & React Icons
- **Maps**: Leaflet.js
- **State Management**: React Context API
- **Storage**: Local Storage for persistent data
- **Authentication**: Firebase Authentication with Google and GitHub OAuth

## 📋 Pages

- **Home**: Introduction to the platform with featured events
- **Events**: Browse and filter community events
- **Event Detail**: Comprehensive information about specific events
- **Community**: Explore different community groups
- **About**: Learn about the mission and values of Communion
- **Blog**: Articles and stories from the community
- **Contact**: Get in touch with the Communion team
- **Authentication**: Login and registration pages
- **FAQ**: Frequently asked questions
- **Legal Pages**: Privacy Policy, Terms of Service, and Cookies Policy

## 🎨 Theme System

Communion features a robust theme system with three options:
- **Light Theme**: Clean, bright interface for daytime use
- **Dark Theme**: Reduced eye strain for nighttime browsing
- **Purple Theme**: Vibrant, distinctive alternative option

Users can switch between themes using the theme toggle in the header.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (< 640px)
- Tablets (640px - 1024px)
- Desktops (> 1024px)

## 🔧 Installation and Setup

### Prerequisites
- Node.js (v14.0.0 or later)
- npm or yarn

### Installation Steps

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/communion-app.git
   cd communion-app
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Copy the example environment file and update with your credentials
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file with your actual Firebase and OAuth credentials.

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## 📂 Project Structure

```
communion-app/
├── public/                 # Static assets
│   ├── images/             # Image assets
│   └── favicon.ico         # Favicon
├── src/                    # Source code
│   ├── components/         # Reusable components
│   ├── context/            # React Context providers
│   ├── data/               # Sample data and constants
│   ├── pages/              # Page components
│   ├── App.jsx             # Main application component
│   └── index.jsx           # Entry point
├── scripts/                # Utility scripts
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies
├── .env.example            # Example environment variables
├── .env                    # Environment variables (not committed to Git)
└── README.md               # Project documentation
```

## 🧩 Components

### Core Components
- **Header**: Navigation and theme toggle
- **Footer**: Site links and social media
- **EventCard**: Display event information
- **EventFilter**: Filter events by category
- **EventForm**: Create new events
- **Hero**: Homepage hero section
- **InteractiveMap**: Display event locations
- **ThemeToggle**: Switch between themes

## 🔄 State Management

The application uses React Context API for state management:
- **ThemeContext**: Manages the current theme
- **EventContext**: Handles event data and operations
- **AuthContext**: Manages user authentication state

## 🌐 API Integration

The application is designed to work with a backend API, but currently uses local storage for demonstration purposes. The data structure is ready for API integration.

## 🔒 Authentication

The authentication system includes:
- User registration
- Login functionality
- Password recovery (UI only)
- Social login options (Google and GitHub)

### Setting Up Authentication

To enable authentication features, you need to:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Set up Authentication in your Firebase project and enable Google and GitHub providers
3. Create OAuth credentials for Google at [Google Cloud Console](https://console.cloud.google.com/)
4. Create OAuth credentials for GitHub at [GitHub Developer Settings](https://github.com/settings/developers)
5. Add your authorized domains in the Firebase project settings
6. Update your `.env` file with the credentials (following the structure in `.env.example`)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Developer

- **Shubham Shukla** - [GitHub](https://github.com/shbhmexe) | [LinkedIn](https://www.linkedin.com/in/shubham-shukla-62095032a/)

## 🔗 Related Projects

Check out my other project:
- [MDU IITM Learn](https://mduiitmlearn.vercel.app/) - Comprehensive learning resources for MDU and IITM BTech students

## 📞 Contact

If you have any questions or feedback, please reach out:
- Email: shubhushukla586@gmail.com
- LinkedIn: [Shubham Shukla](https://www.linkedin.com/in/shubham-shukla-62095032a/)

---

Made with ❤️ by Shubham Shukla
