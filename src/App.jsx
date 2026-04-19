import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import FlameParticles from './components/FlameParticles';
import ScrollProgress from './components/ScrollProgress';
import AnnouncementBanner from './components/AnnouncementBanner';
import NotificationPopup from './components/NotificationPopup';
import LenisProvider from './components/LenisProvider';

// Lazy load Public Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const CareerServices = lazy(() => import('./pages/CareerServices'));
const GovernmentServices = lazy(() => import('./pages/GovernmentServices'));
const Contact = lazy(() => import('./pages/Contact'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));

// Lazy load Admin Pages
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const NewsManager = lazy(() => import('./pages/admin/NewsManager'));
const GalleryManager = lazy(() => import('./pages/admin/GalleryManager'));
const SettingsManager = lazy(() => import('./pages/admin/SettingsManager'));
const PasswordManager = lazy(() => import('./pages/admin/PasswordManager'));

import { useScrollAnimation } from './hooks/useScrollAnimation';
import './App.css';

// Scroll to top on route change component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Global Loader for Lazy components
const GlobalLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', flexDirection: 'column', gap: '15px' }}>
    <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '4px solid #f3f3f3', borderTop: '4px solid #C0001A', animation: 'spin 1s linear infinite' }}></div>
    <style dangerouslySetInnerHTML={{__html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}} />
  </div>
);

// Layout for Public facing website
const PublicLayout = () => {
  return (
    <>
      <AnnouncementBanner />
      <ScrollProgress />
      <FlameParticles />
      <Navbar />
      <NotificationPopup />
      <main className="main-content">
        <Suspense fallback={<GlobalLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

function AppContent() {
  useScrollAnimation();
  
  return (
    <LenisProvider>
      <div className="app-wrapper">
        <ScrollToTop />
        <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}><GlobalLoader /></div>}>
          <Routes>
            {/* Admin Routes - Standalone */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="news" element={<NewsManager />} />
              <Route path="gallery" element={<GalleryManager />} />
              <Route path="settings" element={<SettingsManager />} />
              <Route path="password" element={<PasswordManager />} />
            </Route>

            {/* Public Routes with Navbar & Footer */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/career-services" element={<CareerServices />} />
              <Route path="/government-services" element={<GovernmentServices />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </LenisProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
