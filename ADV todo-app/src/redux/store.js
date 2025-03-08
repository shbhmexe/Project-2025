import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // ✅ Import default export

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
