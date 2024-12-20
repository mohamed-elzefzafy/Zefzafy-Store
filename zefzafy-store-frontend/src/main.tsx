import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store.ts';
import router from './Routes.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';
import './components/i18Language/i18n.ts';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}/>
      </PersistGate>

    </Provider>


    <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  toastOptions={{
    // Define default options
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },
    // Default options for specific types
    success: {
      duration: 3000,
      style: {
        backgroundColor: 'white',
        color: 'black',
      },
    },
    error: {
      duration: 3000,
      style: {
        backgroundColor: 'white',
        color: 'black',
      },
    },
  }}
/>
  </StrictMode>,
)
