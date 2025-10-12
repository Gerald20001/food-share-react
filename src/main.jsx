import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { OfferProvider } from './context/OfferContext';

import './index.css';
import 'leaflet/dist/leaflet.css';

// Импортируем наши компоненты
import Layout from './Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import MapPage from './pages/MapPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import OfferDetailsPage from './pages/OfferDetailsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import NewOfferPage from './pages/NewOfferPage.jsx'; 
import EditOfferPage from './pages/EditOfferPage.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'map', element: <MapPage /> },
      { path: 'offer/:offerId', element: <OfferDetailsPage /> },
      { path: 'profile/:userId', element: <ProfilePage /> },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
       path: 'new-offer',
        element: <ProtectedRoute><NewOfferPage /></ProtectedRoute>,
      },
      {
        path: 'edit-offer/:offerId',
        element: <ProtectedRoute><EditOfferPage /></ProtectedRoute>,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ИСПРАВЛЕННЫЙ ПОРЯДОК: */}
    <ToastProvider>
      <AuthProvider>
        <OfferProvider>
        <RouterProvider router={router} />
        </OfferProvider>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);