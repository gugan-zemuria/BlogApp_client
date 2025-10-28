import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <h1>Posts Dashboard</h1>
        <div className="nav-center">
          <div className="nav-links">
            <Link to="/dashboard/add-post" className="nav-link">
              Add New Post
            </Link>
            <Link to="/dashboard/all-posts" className="nav-link">
              All Posts
            </Link>
          </div>
        </div>
        <div className="nav-user">
          {user && (
            <span className="user-info">
              Welcome, {user.name || user.email}
            </span>
          )}
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>
      
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;