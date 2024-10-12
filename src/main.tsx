import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import App from './App.tsx';
import { App } from './NewApp.tsx';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { TodoDetails } from './TodoDetails.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/todo/:todoId',
    element: <TodoDetails />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
