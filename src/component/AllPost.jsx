/**
 * AllPosts Component
 * @description Component for displaying, searching, and managing all posts with pagination
 * @author AI-Assisted Development
 * @version 1.0.0
 * @since 2024
 */
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import config from '../config';

/**
 * AllPosts Component
 * @description Component that displays all posts with search, pagination, and delete functionality
 * @returns {JSX.Element} The all posts component with search and pagination
 */
function AllPosts() {
  /**
   * State for posts data
   * @type {Array<Object>}
   */
  const [posts, setPosts] = useState([]);
  
  /**
   * Loading state for data fetching
   * @type {boolean}
   */
  const [loading, setLoading] = useState(true);
  
  /**
   * Error message state
   * @type {string}
   */
  const [error, setError] = useState('');
  
  /**
   * Search term for filtering posts
   * @type {string}
   */
  const [searchTerm, setSearchTerm] = useState('');
  
  /**
   * Current page for pagination
   * @type {number}
   */
  const [currentPage, setCurrentPage] = useState(1);
  
  /**
   * Number of posts per page
   * @type {number}
   */
  const [postsPerPage] = useState(9);

  /**
   * Fetches posts from the API
   * @async
   * @returns {Promise<void>}
   */
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.API_URL}/api/posts`);
      setPosts(response.data || []);
      setError('');
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to fetch posts. API might be unavailable.');
      setPosts([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  /**
   * Filtered posts based on search term
   * @type {Array<Object>}
   */
  const filteredPosts = useMemo(() => {
    if (!searchTerm) return posts;
    
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.user_id.toString().includes(searchTerm) ||
      post.id.toString().includes(searchTerm)
    );
  }, [posts, searchTerm]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  /**
   * Deletes a post by ID
   * @param {string|number} id - Post ID to delete
   * @async
   * @returns {Promise<void>}
   */
  const deletePost = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await axios.delete(`${config.API_URL}/api/posts/${id}`);
      fetchPosts();
      const newTotalPages = Math.ceil((filteredPosts.length - 1) / postsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post. API might be unavailable.');
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  return (
    <div className="all-posts">
      <div className="posts-header">
        <h2>All Posts   (<span>{posts.length}</span>)</h2>
      </div>
      
      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search The Posts"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchTerm && (
            <button onClick={clearSearch} className="clear-search-btn">
              Ã—
            </button>
          )}
        </div>
        {searchTerm && (
          <div className="search-results-info">
            Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} 
            {searchTerm && ` matching "${searchTerm}"`}
          </div>
        )}
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Loading posts...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="no-posts">
          {searchTerm ? (
            <p>No posts found matching your search. Try a different term.</p>
          ) : (
            <p>No posts found. Create your first post!</p>
          )}
        </div>
      ) : (
        <>
          <div className="posts-grid">
            {currentPosts.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <h3>{post.title}</h3>
                  <button 
                    onClick={() => deletePost(post.id)}
                    className="delete-btn"
                    title="Delete post"
                  >
                    Ã—
                  </button>
                </div>
                <p className="post-content">{post.content}</p>
                <div className="post-meta">
                  <span>ID: {post.id}</span>
                  <span>User: {post.user_id}</span>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <div className="pagination-controls">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`pagination-btn ${currentPage === pageNumber ? 'active' : ''}`}
                  >
                    {pageNumber}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AllPosts;