import React, { lazy, Suspense } from 'react'; // 1. ИСПРАВЛЕНИЕ: Добавляем Suspense в импорт
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { OfferProvider } from './context/OfferContext';

import './index.css';
import 'leaflet/dist/leaflet.css';

// Импортируем компоненты, которые не будут "ленивыми"
import Layout from './Layout.jsx';
import OrganizationRoute from './components/OrganizationRoute.jsx'; 
import Loading from './components/Loading/Loading.jsx';

// Ленивая загрузка для всех страниц
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const MapPage = lazy(() => import('./pages/MapPage.jsx'));
const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'));
const OfferDetailsPage = lazy(() => import('./pages/OfferDetailsPage.jsx'));
const ProfilePage = lazy(() => import('./pages/ProfilePage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));
const NewOfferPage = lazy(() => import('./pages/NewOfferPage.jsx')); 
const EditOfferPage = lazy(() => import('./pages/EditOfferPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx')); 
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'));

// Импортируем наш новый скелет
import DashboardSkeleton from './pages/DashboardSkeleton.jsx'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'map', element: <MapPage /> },
      { path: 'offer/:offerId', element: <OfferDetailsPage /> },
      { path: 'profile/:userId', element: <ProfilePage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'blog/:id', element: <BlogPost /> },
      
      {
        path: 'dashboard',
        element: <OrganizationRoute><DashboardPage /></OrganizationRoute>,
      },
      {
       path: 'new-offer',
        element: <OrganizationRoute><NewOfferPage /></OrganizationRoute>,
      },
      {
        path: 'edit-offer/:offerId',
        element: <OrganizationRoute><EditOfferPage /></OrganizationRoute>,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <OfferProvider>
          {/*
            Обертка Suspense здесь больше не нужна, так как мы ее перенесли 
            в Layout.jsx (для общих страниц) и в роутер (для Dashboard).
            Но мы оставим RouterProvider внутри, чтобы все работало.
          */}
          <RouterProvider router={router} />
        </OfferProvider>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);