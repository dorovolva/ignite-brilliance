import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import FlameParticles from './components/FlameParticles';
import ScrollProgress from './components/ScrollProgress';
import AnnouncementBanner from './components/AnnouncementBanner';
import NotificationPopup from './components/NotificationPopup';
import LenisProvider from './components/LenisProvider';

import Home from './pages/Home';
import About from './pages/About';
import CareerServices from './pages/CareerServices';
import GovernmentServices from './pages/GovernmentServices';
import Contact from './pages/Contact';

// New Public Pages
import NewsPage from './pages/NewsPage';
import GalleryPage from './pages/GalleryPage';

// Admin Panel
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import NewsManager from './pages/admin/NewsManager';
import GalleryManager from './pages/admin/GalleryManager';
import SettingsManager from './pages/admin/SettingsManager';
import PasswordManager from './pages/admin/PasswordManager';

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
        <Outlet />
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
        <Routes>
          {/* Admin Routes - Standalone */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
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
