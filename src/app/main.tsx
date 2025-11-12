import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';

import { persistor, store } from './store/store';
import App from './App';

import './global.css';

createRoot(document.getElementById('root')!, {}).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
