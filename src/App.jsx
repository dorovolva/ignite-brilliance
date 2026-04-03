import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import FlameParticles from './components/FlameParticles';
import ScrollProgress from './components/ScrollProgress';

import Home from './pages/Home';
import About from './pages/About';
import CareerServices from './pages/CareerServices';
import GovernmentServices from './pages/GovernmentServices';
import Contact from './pages/Contact';

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

function AppContent() {
  useScrollAnimation();
  
  return (
    <div className="app-wrapper">
      <ScrollProgress />
      <FlameParticles />
      <ScrollToTop />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/career-services" element={<CareerServices />} />
          <Route path="/government-services" element={<GovernmentServices />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
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
