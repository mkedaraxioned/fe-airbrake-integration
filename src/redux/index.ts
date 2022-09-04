import storage from 'redux-persist/lib/storage';
import type { TypedUseSelectorHook } from 'react-redux';
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
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
import {
  userReducer,
  allUserReducer,
  projectsReducer,
  clientsReducer,
  timeCardReducer,
} from './reducers';

import { baseSlice } from './apis';
import { dashboard } from './apis/dashboard';
import { user } from './apis/user';
import persistCombineReducers from 'redux-persist/es/persistCombineReducers';

const rootReducer = {
  user: userReducer,
  allUsers: allUserReducer,
  allProjects: projectsReducer,
  allClients: clientsReducer,
  timeCard: timeCardReducer,
};

const persistConfig: PersistConfig = {
  key: 'root',
  storage,
};

// persisting user data on localstorage
const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    rootSlices: persistedReducer,
    [baseSlice.reducerPath]: baseSlice.reducer,
    [dashboard.reducerPath]: dashboard.reducer,
    [user.reducerPath]: user.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([baseSlice.middleware, dashboard.middleware, user.middleware]),
});

// listener for rtk query stored data
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch: () => AppDispatch = useReduxDispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export const persistor = persistStore(store);
