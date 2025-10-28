# Posts Management Client

A modern React client application for posts management with a clean UI, API integration, and responsive design.

## Features

- **Modern React** with hooks and functional components
- **Responsive Design** with clean, intuitive UI
- **API Integration** with Axios for HTTP requests
- **Routing** with React Router DOM
- **Fast Development** with Vite build tool
- **Code Quality** with ESLint configuration
- **Deployment Ready** with Vercel configuration

## Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Styling**: CSS3 with modern features
- **Linting**: ESLint with React plugins
- **Development**: Hot Module Replacement (HMR)

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Running backend server (see server README)

## Installation

1. Clone the repository and navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables by creating a `.env` file:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_TITLE=Posts Management
```

## Usage

### Development Mode
```bash
npm run dev
```
This starts the development server with hot reload at `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `dist` folder.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing.

### Linting
```bash
npm run lint
```
Runs ESLint to check code quality and style.

### Vercel Deployment
```bash
npm run vercel-build
```
Builds the project specifically for Vercel deployment.

## Project Structure

```
client/
├── public/
│   └── vite.svg          # Vite logo
├── src/
│   ├── assets/           # Static assets
│   ├── components/       # Reusable React components
│   ├── contexts/         # React context providers
│   ├── services/         # API service functions
│   ├── App.jsx           # Main application component
│   ├── App.css           # Application styles
│   ├── main.jsx          # Application entry point
│   ├── index.css         # Global styles
│   └── config.js         # Configuration settings
├── dist/                 # Production build output
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── eslint.config.js      # ESLint configuration
├── vercel.json           # Vercel deployment config
└── package.json          # Dependencies and scripts
```

## Key Components

### App Component (`src/App.jsx`)
The main application component that handles routing and global state.

### Configuration (`src/config.js`)
Centralized configuration for API endpoints and application settings.

### Services (`src/services/`)
API service functions for communicating with the backend server.

### Components (`src/components/`)
Reusable UI components for the application interface.

### Contexts (`src/contexts/`)
React context providers for global state management.

## API Integration

The client communicates with the backend server through Axios HTTP requests. The base URL is configured in the environment variables.

### Example API Usage
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  withCredentials: true
});

// Get all posts
const posts = await api.get('/api/posts');

// Create a new post
const newPost = await api.post('/api/posts', {
  title: 'My Post',
  content: 'Post content'
});
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3000` |
| `VITE_APP_TITLE` | Application title | `Posts Management` |

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use ESLint for code quality
- Maintain consistent naming conventions

### Component Structure
```jsx
import React from 'react';
import './Component.css';

const Component = ({ prop1, prop2 }) => {
  // Component logic here
  
  return (
    <div className="component">
      {/* JSX content */}
    </div>
  );
};

export default Component;
```

## Deployment

### Vercel (Recommended)
The project includes a `vercel.json` configuration file for easy deployment:

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting provider

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Features

- **Vite**: Lightning-fast build tool with HMR
- **Code Splitting**: Automatic code splitting for optimal loading
- **Tree Shaking**: Removes unused code from bundles
- **Asset Optimization**: Optimized images and assets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Test the build: `npm run build`
6. Submit a pull request

## Troubleshooting

### Common Issues

**Development server won't start:**
- Check if port 5173 is available
- Ensure Node.js version is 16 or higher
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

**API requests failing:**
- Verify backend server is running
- Check VITE_API_BASE_URL in .env file
- Ensure CORS is properly configured on the backend

**Build errors:**
- Run `npm run lint` to check for code issues
- Ensure all dependencies are installed
- Check for TypeScript errors if using TypeScript

## License

ISC License