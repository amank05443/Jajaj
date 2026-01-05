// Purpose: Redux slice for JWT authentication state management
// This slice manages auth state in memory (NOT persisted for security)
// Tokens are stored in httpOnly cookies (handled by browser, not JS)
// Added by: Authentication System Enhancement

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../Authentication/axiosSetup';

// Base URL for API calls
const API_BASE_URL = 'http://localhost:8000';

// =====================================================
// ASYNC THUNKS FOR AUTH OPERATIONS
// =====================================================

/**
 * Login thunk - authenticates user and receives httpOnly cookie tokens
 */
export const jwtLogin = createAsyncThunk(
  'auth/jwtLogin',
  async ({ pno, login_pwd }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/jwt/login/`,
        { pno, login_pwd },
        { withCredentials: true }
      );

      if (response.data.success) {
        return response.data.user;
      } else {
        return rejectWithValue(response.data.message || 'Login failed');
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

/**
 * Logout thunk - clears httpOnly cookie tokens
 */
export const jwtLogout = createAsyncThunk(
  'auth/jwtLogout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/auth/jwt/logout/`,
        {},
        { withCredentials: true }
      );
      return true;
    } catch (error) {
      // Even if logout API fails, we still want to clear local state
      console.error('Logout API error:', error);
      return true;
    }
  }
);

/**
 * Refresh token thunk - gets new access token using refresh token from cookie
 */
export const jwtRefresh = createAsyncThunk(
  'auth/jwtRefresh',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/jwt/refresh/`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        return true;
      } else {
        return rejectWithValue(response.data.message || 'Token refresh failed');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Token refresh failed');
    }
  }
);

/**
 * Get current user thunk - fetches user info using token from cookie
 */
export const jwtGetUser = createAsyncThunk(
  'auth/jwtGetUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/auth/jwt/me/`,
        { withCredentials: true }
      );

      if (response.data.success) {
        return response.data.user;
      } else {
        return rejectWithValue(response.data.message || 'Failed to get user');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get user');
    }
  }
);

/**
 * Verify token thunk - checks if current token is valid
 */
export const jwtVerify = createAsyncThunk(
  'auth/jwtVerify',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/auth/jwt/verify/`,
        { withCredentials: true }
      );

      if (response.data.valid) {
        return { valid: true, userId: response.data.user_id };
      } else {
        return { valid: false };
      }
    } catch (error) {
      return { valid: false };
    }
  }
);

/**
 * Check auth and load user thunk - verifies token and loads user data
 */
export const checkAuthAndLoadUser = createAsyncThunk(
  'auth/checkAuthAndLoadUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // First verify the token
      const verifyResult = await dispatch(jwtVerify()).unwrap();

      if (verifyResult.valid) {
        // Token is valid, get user data
        const user = await dispatch(jwtGetUser()).unwrap();
        return user;
      } else {
        // Try to refresh the token
        try {
          await dispatch(jwtRefresh()).unwrap();
          // Refresh successful, get user data
          const user = await dispatch(jwtGetUser()).unwrap();
          return user;
        } catch (refreshError) {
          // Refresh failed, user is not authenticated
          return rejectWithValue('Not authenticated');
        }
      }
    } catch (error) {
      return rejectWithValue('Authentication check failed');
    }
  }
);


// =====================================================
// AUTH SLICE
// =====================================================

const initialState = {
  // User data (NOT persisted - re-fetched on load)
  user: null,
  isAuthenticated: false,

  // Loading states
  loading: false,
  authChecked: false,

  // Error state
  error: null,

  // Token refresh state
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Clear error
    clearAuthError: (state) => {
      state.error = null;
    },

    // Reset auth state (used for logout)
    resetAuthState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.isRefreshing = false;
    },

    // Update user data (for local updates without API call)
    updateUserData: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    // Set auth checked flag
    setAuthChecked: (state, action) => {
      state.authChecked = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ================== JWT LOGIN ==================
    builder
      .addCase(jwtLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(jwtLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.authChecked = true;
        state.error = null;
      })
      .addCase(jwtLogin.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
        state.authChecked = true;
      });

    // ================== JWT LOGOUT ==================
    builder
      .addCase(jwtLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(jwtLogout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(jwtLogout.rejected, (state) => {
        // Even on reject, clear auth state
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });

    // ================== JWT REFRESH ==================
    builder
      .addCase(jwtRefresh.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(jwtRefresh.fulfilled, (state) => {
        state.isRefreshing = false;
        // Token refreshed successfully, auth state remains
      })
      .addCase(jwtRefresh.rejected, (state, action) => {
        state.isRefreshing = false;
        // Refresh failed, user needs to re-login
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      });

    // ================== JWT GET USER ==================
    builder
      .addCase(jwtGetUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(jwtGetUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.authChecked = true;
      })
      .addCase(jwtGetUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ================== JWT VERIFY ==================
    builder
      .addCase(jwtVerify.pending, (state) => {
        // Don't set loading for verify - it's a background check
      })
      .addCase(jwtVerify.fulfilled, (state, action) => {
        if (!action.payload.valid) {
          state.isAuthenticated = false;
          state.user = null;
        }
      })
      .addCase(jwtVerify.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });

    // ================== CHECK AUTH AND LOAD USER ==================
    builder
      .addCase(checkAuthAndLoadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthAndLoadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.authChecked = true;
        state.error = null;
      })
      .addCase(checkAuthAndLoadUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.authChecked = true;
      });
  },
});

// Export actions
export const {
  clearAuthError,
  resetAuthState,
  updateUserData,
  setAuthChecked,
} = authSlice.actions;

// Export selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth?.user;
export const selectIsAuthenticated = (state) => state.auth?.isAuthenticated;
export const selectAuthLoading = (state) => state.auth?.loading;
export const selectAuthError = (state) => state.auth?.error;
export const selectAuthChecked = (state) => state.auth?.authChecked;

// Export reducer
export default authSlice.reducer;
