/**
 * Dashboard Component
 * @description Main dashboard component that provides navigation and layout for the posts management application
 * @author AI-Assisted Development
 * @version 1.0.0
 * @since 2024
 */
import { Link, Outlet } from 'react-router-dom';

/**
 * Dashboard Component
 * @description Main dashboard component with navigation and content area
 * @returns {JSX.Element} The dashboard component with navigation and outlet for child routes
 */
function Dashboard() {
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <h1>Posts Dashboard</h1>
        <div className="nav-links">
          <Link to="/add-post" className="nav-link">
            Add New Post
          </Link>
          <Link to="/all-posts" className="nav-link">
            All Posts
          </Link>
        </div>
      </nav>
      
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;