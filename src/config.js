const config = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001'
};

// Debug logging
console.log('Environment:', import.meta.env.MODE);
console.log('API URL:', config.API_URL);
console.log('All env vars:', import.meta.env);

export default config;