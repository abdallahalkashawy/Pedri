
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import authSlice from './authSlice';
import { combineReducers } from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__;

const persistConfig = {
    key: "root",
    storage,
}

const reducers = combineReducers({
    current: userSlice,
    auth : authSlice,
});

const persistedReducer = persistReducer(persistConfig,reducers);

// const store = createStore(userReducer,enhancer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
      immutableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
  devTools: true,
//   enhancers: [immer()],
});

export default store;