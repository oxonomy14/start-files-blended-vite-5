import { configureStore } from '@reduxjs/toolkit';
import { locationReducer } from './location/slice';
import { currencyReducer } from './currency/slice';
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
import storage from 'redux-persist/lib/storage';

const baseCurrencyPersistConfig = {
  key: 'baseCurrency',
  storage,
  whitelist: ['baseСurrency'],
};

export const store = configureStore({
  reducer: {
    location: locationReducer,
    baseCurrency: persistReducer(baseCurrencyPersistConfig, currencyReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
