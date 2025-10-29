# Posts Management Client

A modern React application for managing posts with authentication, built with Vite and featuring a clean, responsive UI.

## 🚀 Features

- **User Authentication**: Login/signup with JWT tokens
- **Google OAuth**: Social login integration
- **Posts Management**: Create, view, edit, and delete posts
- **Protected Routes**: Secure navigation with route guards
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Automatic refresh on post creation
- **Form Validation**: Client-side validation with server sync

## 🛠 Tech Stack

- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Routing**: React Router DOM 7.9.4
- **HTTP Client**: Axios 1.12.2
- **Styling**: CSS3 with modern features
- **Linting**: ESLint with React plugins

## 📋 Prerequisites

- Node.js 22.x or higher
- Running Posts API Server (see server README)

## 🔧 Installation

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
Application runs on `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 📱 Application Structure

### Authentication Flow
1. **Login/Signup**: Users can register or login with email/password
2. **Google OAuth**: Alternative social login option
3. **JWT Tokens**: Secure authentication with automatic token management
4. **Protected Routes**: Dashboard access requires authentication

### Dashboard Features
- **Add Post**: Create new posts with title and content
- **All Posts**: View and manage existing posts
- **User Profile**: Display current user information
- **Logout**: Secure session termination

## 🎨 User Interface

### Login Page
- Clean, centered login form
- Email and password validation
- Google OAuth button
- Link to signup page

### Signup Page
- User registration form
- Name, email, and password fields
- Client-side validation
- Redirect to login after success

### Dashboard
- Navigation sidebar with menu options
- Main content area for components
- User information display
- Responsive layout

### Add Post
- Form with title and content fields
- Real-time validation feedback
- Success/error message display
- Automatic form reset on success

### All Posts
- List of user's posts
- Edit and delete functionality
- Responsive card layout
- Empty state handling

## 🔒 Authentication System

### AuthContext
Provides global authentication state management:
- User information
- Authentication status
- Token management
- Login/logout functions

### AuthService
Handles all API communication:
- Login/signup requests
- Token validation
- Automatic token refresh
- API request interceptors

### Protected Routes
- Route guards for authenticated pages
- Automatic redirect to login
- Persistent authentication state

## 📡 API Integration

### Configuration
```javascript
// config.js
const config = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001'
};
```

### Request Interceptors
- Automatic token attachment
- Error handling for 401 responses
- Redirect on authentication failure

### Endpoints Used
- `POST /login` - User authentication
- `POST /signup` - User registration
- `GET /profile` - User profile data
- `GET /posts` - Fetch user posts
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post
- `GET /auth/google` - Google OAuth initiation

## ✅ Validation Rules

### Login Form
- **Email**: Valid email format required
- **Password**: Minimum 6 characters

### Signup Form
- **Name**: Minimum 3 characters
- **Email**: Valid email format
- **Password**: Minimum 6 characters

### Post Creation
- **Title**: Minimum 3 characters, required
- **Content**: Minimum 12 characters, required

## 🎯 Component Architecture

```
src/
├── components/
│   ├── AddPost.jsx       # Post creation form
│   ├── AllPosts.jsx      # Posts list and management
│   ├── AuthCallback.jsx  # Google OAuth callback handler
│   ├── Dashboard.jsx     # Main dashboard layout
│   ├── Login.jsx         # Login form
│   ├── ProtectedRoute.jsx # Route protection wrapper
│   └── Signup.jsx        # Registration form
├── contexts/
│   └── AuthContext.jsx   # Global authentication state
├── services/
│   └── AuthService.js    # API communication service
├── App.jsx               # Main application component
├── App.css              # Global styles
├── config.js            # Environment configuration
└── main.jsx             # Application entry point
```

## 🚀 Deployment

### Vercel Deployment
The application is configured for Vercel deployment:

```json
// vercel.json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ]
}
```

### Build Configuration
```json
// package.json
{
  "scripts": {
    "vercel-build": "vite build"
  }
}
```

### Environment Variables
Set in deployment platform:
- `VITE_API_URL`: Backend API URL

## 📸 Screenshots

### Login Page
![Login Page](screenshot/Screenshot%202025-10-29%20at%209.14.04%20AM.png)

### Signup Page
![Signup Page](screenshot/Screenshot%202025-10-29%20at%209.14.31%20AM.png)

### Dashboard - Add Post
![Add Post](screenshot/Screenshot%202025-10-29%20at%209.14.44%20AM.png)

### Dashboard - All Posts
![All Posts](screenshot/Screenshot%202025-10-29%20at%209.14.50%20AM.png)

### Post Creation Success
![Post Success](screenshot/Screenshot%202025-10-29%20at%209.15.11%20AM.png)

### Posts List View
![Posts List](screenshot/Screenshot%202025-10-29%20at%209.15.16%20AM.png)

### Edit Post Modal
![Edit Post](screenshot/Screenshot%202025-10-29%20at%209.15.52%20AM.png)

### Post Management
![Post Management](screenshot/Screenshot%202025-10-29%20at%209.15.59%20AM.png)

### Delete Confirmation
![Delete Confirmation](screenshot/Screenshot%202025-10-29%20at%209.16.11%20AM.png)

### Updated Posts View
![Updated Posts](screenshot/Screenshot%202025-10-29%20at%209.16.38%20AM.png)

## 🔧 Development Tips

### Hot Reload
Vite provides instant hot module replacement for fast development.

### Error Handling
- Network errors are caught and displayed to users
- Form validation provides immediate feedback
- Authentication errors redirect to login

### State Management
- AuthContext provides centralized auth state
- Local component state for form data
- Custom events for cross-component communication

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the existing code style
4. Add appropriate error handling
5. Test your changes thoroughly
6. Submit a pull request

## 📄 License

This project is licensed under the terms specified in package.json.

## 🆘 Troubleshooting

### Common Issues

1. **API Connection**: Verify VITE_API_URL in .env file
2. **Authentication**: Check if server is running and accessible
3. **CORS Errors**: Ensure server CORS configuration includes client URL
4. **Build Errors**: Clear node_modules and reinstall dependencies

### Debug Mode
Enable debug logging by checking browser console for detailed error information.

### Network Issues
Use browser developer tools to inspect network requests and responses.