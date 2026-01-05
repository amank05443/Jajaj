// Purpose: Redux store configuration with persist for non-sensitive data
// Auth state is NOT persisted (tokens in httpOnly cookies, user re-fetched on load)
// Only aircraft and params data is persisted to localStorage
// Added by: Authentication System Enhancement

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage

// Import reducers
import aircraftReducer from './aircraftSlice';
import paramReducer from './paramsSlice';
import authReducer from './authSlice';

// =====================================================
// PERSIST CONFIGURATION
// =====================================================

// Main persist config - controls what gets persisted
const persistConfig = {
  key: 'e700',
  version: 1,
  storage,
  // IMPORTANT: Only persist non-sensitive data
  // Auth is NOT persisted - tokens in httpOnly cookies, user re-fetched on load
  whitelist: ['aircraft', 'params'], // Only these slices are persisted
  // blacklist: ['auth'], // Alternative: explicitly blacklist auth (redundant with whitelist)
};

// Combine all reducers
const rootReducer = combineReducers({
  aircraft: aircraftReducer,
  params: paramReducer,
  auth: authReducer, // NOT persisted (not in whitelist)
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// =====================================================
// STORE CONFIGURATION
// =====================================================

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist action types for serializable check
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create persistor for PersistGate
export const persistor = persistStore(store);

// Export store as default for backward compatibility
export default store;