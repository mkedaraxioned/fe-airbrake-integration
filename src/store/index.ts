import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import userReducer from '../feature/userSlice';
import projectsReducer from '../feature/projectsSlice';
import clientsReducer from '../feature/clientsSlice';
import usersReducer from '../feature/allUserSlice';
import persistReducer from 'redux-persist/es/persistReducer';
import {
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { PersistConfig } from '../interfaces/storeInterface';
import { useDispatch } from 'react-redux';

const reducers = combineReducers({
  user: userReducer,
  allUsers: usersReducer,
  allProjects: projectsReducer,
  allClients: clientsReducer,
});

const persistConfig: PersistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const persistor = persistStore(store);
