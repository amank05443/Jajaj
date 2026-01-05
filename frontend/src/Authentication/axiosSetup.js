//Purpose :-For customizing the axios setup so as to include headers for credentials,
//  required for api calls.
// added by:- Abhishek Singh,LAM
// Updated: Added JWT token refresh interceptor for httpOnly cookie authentication

import axios from 'axios';

// Base configuration - credentials required for httpOnly cookies
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// Base URL for API calls
const API_BASE_URL = 'http://localhost:8000';

// =====================================================
// JWT TOKEN REFRESH INTERCEPTOR
// =====================================================

// Flag to prevent multiple refresh attempts
let isRefreshing = false;

// Queue of requests waiting for token refresh
let failedQueue = [];

/**
 * Process the queue of failed requests after token refresh
 */
const processQueue = (error, success = true) => {
  failedQueue.forEach((prom) => {
    if (success) {
      prom.resolve();
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

/**
 * Response interceptor to handle 401 errors and refresh tokens
 *
 * Flow:
 * 1. Request fails with 401 (token expired)
 * 2. Try to refresh the token using refresh token from cookie
 * 3. If refresh successful, retry the original request
 * 4. If refresh fails, redirect to login
 */
axios.interceptors.response.use(
  // Success handler - pass through
  (response) => response,

  // Error handler - check for 401 and try refresh
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Don't try to refresh for auth endpoints (would cause infinite loop)
      if (
        originalRequest.url?.includes('/api/auth/jwt/login') ||
        originalRequest.url?.includes('/api/auth/jwt/refresh') ||
        originalRequest.url?.includes('/api/auth/jwt/logout')
      ) {
        return Promise.reject(error);
      }

      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // Mark that we're trying to refresh
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the token
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/api/auth/jwt/refresh/`,
          {},
          { withCredentials: true }
        );

        if (refreshResponse.data.success) {
          // Token refreshed successfully, process queued requests
          processQueue(null, true);

          // Retry the original request
          return axios(originalRequest);
        } else {
          // Refresh failed
          processQueue(new Error('Token refresh failed'), false);
          handleAuthFailure();
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // Refresh request failed
        processQueue(refreshError, false);
        handleAuthFailure();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Handle authentication failure - redirect to login
 */
const handleAuthFailure = () => {
  // Dispatch logout action if Redux store is available
  // (We'll set this up after store is created)
  if (window.__REDUX_STORE__) {
    const { jwtLogout } = require('../Store/authSlice');
    window.__REDUX_STORE__.dispatch(jwtLogout());
  }

  // Set flag for cross-tab logout sync
  localStorage.setItem('manual-logout', Date.now().toString());

  // Redirect to login page
  // Only redirect if not already on login page
  if (!window.location.pathname.includes('/login')) {
    window.location.href = '/login';
  }
};

/**
 * Set the Redux store reference for use in interceptor
 * Call this from index.js after store is created
 */
export const setAxiosStore = (store) => {
  window.__REDUX_STORE__ = store;
};

export default axios;