/**
 * Main App Component
 * @description Root component that sets up routing for the posts management application
 * @author AI-Assisted Development
 * @version 1.0.0
 * @since 2024
 */
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AddPost from './components/AddPost';
import AllPosts from './components/AllPosts';
import Dashboard from './components/Dashboard';

/**
 * App Component
 * @description Main application component with routing configuration
 * @returns {JSX.Element} The main app component with routing
 */
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Navigate to="/add-post" replace />} />
            <Route path="add-post" element={<AddPost />} />
            <Route path="all-posts" element={<AllPosts />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;