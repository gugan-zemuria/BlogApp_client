import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthService from '../services/AuthService';

function AddPost() {
  const [newPost, setNewPost] = useState({
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { user } = useAuth();

  const createPost = async (e) => {
    e.preventDefault();

    // Client-side validation to match server requirements
    if (!newPost.title.trim()) {
      setError('Title is required');
      return;
    }

    if (newPost.title.trim().length < 3) {
      setError('Title must be at least 3 characters long');
      return;
    }

    if (!newPost.content.trim()) {
      setError('Content is required');
      return;
    }

    if (newPost.content.trim().length < 12) {
      setError('Content must be at least 12 characters long');
      return;
    }

    try {
      setLoading(true);
      setError('');

      console.log('AddPost: Creating post with data:', { title: newPost.title, content: newPost.content });
      const response = await AuthService.api.post('/posts', {
        title: newPost.title,
        content: newPost.content
      });
      console.log('AddPost: Post created successfully:', response.data);

      setNewPost({ title: '', content: '' });
      setSuccess('Post created successfully!');
      setTimeout(() => {
        setSuccess('')
      }, 2000);

      // Trigger a custom event to refresh posts
      console.log('AddPost: Dispatching postCreated event');
      window.dispatchEvent(new CustomEvent('postCreated'));
    } catch (error) {
      console.error('AddPost: Error creating post:', error);
      console.error('AddPost: Error response:', error.response?.data);

      // Handle validation errors more specifically
      if (error.response?.data?.details) {
        const validationErrors = error.response.data.details.map(err => err.message).join(', ');
        setError(`Validation error: ${validationErrors}`);
      } else {
        setError(error.response?.data?.error || 'Failed to create post');
      }

      setTimeout(() => {
        setError('')
      }, 5000); // Increased timeout for longer error messages
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
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            placeholder="Enter post title (minimum 3 characters)"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            minLength={3}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            placeholder="Enter post content (minimum 12 characters)"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            rows="6"
            minLength={12}
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