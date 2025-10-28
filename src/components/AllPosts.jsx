import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthService from '../services/AuthService';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [editingPost, setEditingPost] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', content: '' });
  const [readingPost, setReadingPost] = useState(null);

  const { user } = useAuth();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      console.log('AllPosts: Fetching posts...');
      const response = await AuthService.api.get('/posts');
      console.log('AllPosts: Response:', response.data);
      setPosts(response.data.posts || []);
      console.log('AllPosts: Posts set:', response.data.posts || []);
      setError('');
    } catch (error) {
      console.error('AllPosts: Error fetching posts:', error);
      console.error('AllPosts: Error response:', error.response?.data);
      setError('Failed to fetch posts. Please try again.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

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

  const deletePost = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await AuthService.api.delete(`/posts/${id}`);
      fetchPosts();
      const newTotalPages = Math.ceil((filteredPosts.length - 1) / postsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post. Please try again.');
    }
  };

  const startEdit = (post) => {
    setEditingPost(post.id);
    setEditForm({ title: post.title, content: post.content });
  };

  const cancelEdit = () => {
    setEditingPost(null);
    setEditForm({ title: '', content: '' });
  };

  const saveEdit = async () => {
    if (!editForm.title.trim() || !editForm.content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      await AuthService.api.put(`/posts/${editingPost}`, {
        title: editForm.title,
        content: editForm.content
      });
      fetchPosts();
      setEditingPost(null);
      setEditForm({ title: '', content: '' });
      setReadingPost(null);
      setError('');
    } catch (error) {
      console.error('Error updating post:', error);
      setError('Failed to update post. Please try again.');
    }
  };

  const openReadModal = (post) => {
    setReadingPost(post);
  };

  const closeReadModal = () => {
    setReadingPost(null);
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

    // Listen for post creation events
    const handlePostCreated = () => {
      fetchPosts();
    };

    window.addEventListener('postCreated', handlePostCreated);

    return () => {
      window.removeEventListener('postCreated', handlePostCreated);
    };
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
              ×
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
              <div
                key={post.id}
                className="post-card"
                onClick={() => openReadModal(post)}
              >
                <div className="post-header">
                  <h3>{post.title}</h3>
                  <div className="post-actions">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openReadModal(post);
                      }}
                      className="view-btn"
                      title="View full post"
                    >
                      View
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePost(post.id);
                      }}
                      className="delete-btn"
                      title="Delete post"
                    >
                      x
                    </button>
                  </div>
                </div>
                <div className="post-content">
                  <p>{post.content}</p>
                </div>
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

      {/* Read Modal */}
      {readingPost && !editingPost && (
        <div className="modal-overlay" onClick={closeReadModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{readingPost.title}</h2>
              <button onClick={closeReadModal} className="modal-close-btn">×</button>
            </div>
            <div className="modal-body">
              <p className="modal-content-text">{readingPost.content}</p>
              <div className="modal-meta">
                <div>
                  <span>Post ID: {readingPost.id}</span>
                  <span>User ID: {readingPost.user_id}</span>
                </div>
                <div className="modal-actions">
                  <button onClick={() => startEdit(readingPost)} className="modal-edit-btn">
                    Edit Post
                  </button>
                  <button onClick={closeReadModal} className="modal-close-action-btn">
                    Close
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingPost && (
        <div className="modal-overlay" onClick={cancelEdit}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Post</h2>
              <button onClick={cancelEdit} className="modal-close-btn">×</button>
            </div>
            <div className="modal-body">
              <div className="modal-edit-form">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="modal-edit-title-input"
                    placeholder="Post title"
                  />
                </div>
                <div className="form-group">
                  <label>Content</label>
                  <textarea
                    value={editForm.content}
                    onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                    className="modal-edit-content-textarea"
                    placeholder="Post content"
                    rows="8"
                  />
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button onClick={saveEdit} className="modal-save-btn">
                Save Changes
              </button>
              <button onClick={cancelEdit} className="modal-cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllPosts;