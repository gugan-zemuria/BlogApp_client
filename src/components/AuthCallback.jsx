import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthService from '../services/AuthService';

function AuthCallback() {
  const navigate = useNavigate();
  const { setAuthData } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('AuthCallback: Processing OAuth callback...');
        console.log('AuthCallback: Current URL:', window.location.href);
        
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        
        console.log('AuthCallback: All URL params:', Object.fromEntries(urlParams));
        console.log('AuthCallback: Token from URL:', token);
        
        if (token && token.trim()) {
          console.log('AuthCallback: Valid token found, getting user data...');
          
          // Validate token format
          if (AuthService.isTokenValid(token)) {
            // Set token first so the interceptor can use it
            localStorage.setItem('authToken', token);
            const userData = await AuthService.getCurrentUser();
            console.log('AuthCallback: User data:', userData);
            setAuthData(token, userData);
            console.log('AuthCallback: Auth data set, redirecting to dashboard...');
            navigate('/dashboard', { replace: true });
          } else {
            console.log('AuthCallback: Invalid token format');
            navigate('/login?error=oauth_failed', { replace: true });
          }
        } else {
          console.log('AuthCallback: No valid token found in URL');
          navigate('/login?error=oauth_failed', { replace: true });
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        navigate('/login?error=oauth_failed', { replace: true });
      }
    };

    // Add a small delay to ensure the URL is fully loaded
    const timer = setTimeout(handleCallback, 100);
    return () => clearTimeout(timer);
  }, [navigate, setAuthData]);

  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Completing authentication...</p>
      </div>
    </div>
  );
}

export default AuthCallback;