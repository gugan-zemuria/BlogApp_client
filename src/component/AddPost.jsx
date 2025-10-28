/**
 * AddPost Component
 * @description Component for creating new posts with form validation and API integration
 * @author AI-Assisted Development
 * @version 1.0.0
 * @since 2024
 */
import axios from 'axios';
import { useState } from 'react';
import config from '../config';

/**
 * AddPost Component
 * @description Form component for creating new posts with validation and error handling
 * @returns {JSX.Element} The add post form component
 */
function AddPost() {
  /**
   * State for the new post form data
   * @type {Object}
   * @property {string} title - Post title
   * @property {string} content - Post content
   * @property {string} user_id - User ID who created the post
   */
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    user_id: ''
  });
  
  /**
   * Loading state for form submission
   * @type {boolean}
   */
  const [loading, setLoading] = useState(false);
  
  /**
   * Error message state
   * @type {string}
   */
  const [error, setError] = useState('');
  
  /**
   * Success message state
   * @type {string}
   */
  const [success, setSuccess] = useState('');

  /**
   * Handles form submission to create a new post
   * @param {Event} e - Form submission event
   * @async
   * @returns {Promise<void>}
   */
  const createPost = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!newPost.title.trim() || !newPost.content.trim() || !newPost.user_id) {
      setError('Title, content, and user ID are required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Prepare post data with proper types
      const postData = {
        ...newPost,
        user_id: parseInt(newPost.user_id)
      };
      
      // Send POST request to API
      await axios.post(`${config.API_URL}/api/posts`, postData);
      
      // Reset form and show success message
      setNewPost({ title: '', content: '', user_id: '' });
      setSuccess('Post created Successfully!');
      
      // Clear success message after 2 seconds
      setTimeout(() => {
        setSuccess('')
      }, 2000);
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post');
      
      // Clear error message after 2 seconds
      setTimeout(() => {
        setError('')
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-post">
      <h2>Create New Post</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={createPost} className="post-form">
        <div className="form-group">
          <label htmlFor="user_id">User ID:</label>
          <input
            id="user_id"
            type="number"
            placeholder="Enter user ID"
            value={newPost.user_id}
            onChange={(e) => setNewPost({...newPost, user_id: e.target.value})}
            min="1"
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            placeholder="Enter post title"
            value={newPost.title}
            onChange={(e) => setNewPost({...newPost, title: e.target.value})}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            placeholder="Enter post content"
            value={newPost.content}
            onChange={(e) => setNewPost({...newPost, content: e.target.value})}
            rows="6"
            required
            disabled={loading}
          />
        </div>
        
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}

export default AddPost;