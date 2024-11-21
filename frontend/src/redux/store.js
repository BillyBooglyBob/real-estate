import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

// Combine all reducers into a single reducer function
const rootReducer = combineReducers({ user: userReducer });

// Persist the root reducer
// This will store the state in the browser's local storage
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// Create a persisted reducer
// This will ensures the state is saved to and loaded from storage automatically
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  // Set up the Redux middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create a persistor object
// Loads the saved state from storage when the app starts
// Saves the state to storage whenever the state changes
export const persistor = persistStore(store);
