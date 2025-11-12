import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { categoryReducer } from '@/entities/category';
import { taskReducer } from '@/entities/task';
import { userReducer } from '@/entities/user';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'task', 'category']
};

const rootReducer = combineReducers({
  user: userReducer,
  task: taskReducer,
  category: categoryReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Настройка Redux store с персистентностью
 */
export const store = configureStore({
  reducer: persistedReducer,
  /**
   * Получение middleware по умолчанию
   * @param getDefaultMiddleware - функция для получения middleware по умолчанию
   */
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
