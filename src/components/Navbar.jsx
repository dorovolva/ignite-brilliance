import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Button from './ui/Button';
import './Navbar.css';
import { api } from '../services/api';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasNewNews, setHasNewNews] = useState(false);
  const [settings, setSettings] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check for new news and fetch settings for logo
    const fetchData = async () => {
      try {
        const lastSeenStr = localStorage.getItem('ib_news_last_seen') || new Date(0).toISOString();
        const [newsData, settingsData] = await Promise.all([
          api.getNews(),
          api.getSettings()
        ]);
        
        const hasUnseen = newsData.some(a => a.status === 'Published' && new Date(a.date) > new Date(lastSeenStr));
        setHasNewNews(hasUnseen);
        setSettings(settingsData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and mark news as seen if navigating to news page
  useEffect(() => {
    setMobileMenuOpen(false);
    if (location.pathname === '/news') {
      localStorage.setItem('ib_news_last_seen', new Date().toISOString());
      setHasNewNews(false);
    }
  }, [location.pathname]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* LOGO */}
        <Link to="/" className="nav-logo">
           <img 
             src={settings?.logoUrl || "/Ignite_Brilliance_Logo_2.png"} 
             alt="Ignite Brilliance" 
             style={{ height: '50px', objectFit: 'contain' }}
           />
        </Link>

        {/* DESKTOP MENU */}
        <div className="nav-links desktop-only">
          <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>About</NavLink>
          
          <div 
            className="nav-dropdown-wrapper" 
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <NavLink to="/career-services" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              Career & Education <ChevronDown size={14} />
            </NavLink>
            <div className={`nav-dropdown ${dropdownOpen ? 'show' : ''}`}>
              <Link to="/career-services" className="dropdown-item">AI Skill Scan</Link>
              <Link to="/career-services" className="dropdown-item">Career Counselling</Link>
              <Link to="/career-services" className="dropdown-item">Admissions</Link>
              <Link to="/career-services" className="dropdown-item">Abroad Study</Link>
              <Link to="/career-services" className="dropdown-item">Open School</Link>
              <Link to="/career-services" className="dropdown-item">Certifications</Link>
            </div>
          </div>

          <NavLink to="/government-services" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Government Services</NavLink>
          <NavLink to="/news" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            News {hasNewNews && <span className="nav-notif-dot"></span>}
          </NavLink>
          <NavLink to="/gallery" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Gallery</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Contact</NavLink>
        </div>

        {/* CTA */}
        <div className="nav-cta desktop-only">
          <Button to="/contact" variant="primary">Book a Session &rarr;</Button>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          className={`mobile-toggle mobile-only ${mobileMenuOpen ? 'is-open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
      </div>

      {/* MOBILE POPUP MENU */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-links">
          <NavLink to="/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
          <NavLink to="/about" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>About</NavLink>
          <NavLink to="/career-services" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Career & Education</NavLink>
          <NavLink to="/government-services" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Government Services</NavLink>
          <NavLink to="/news" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>News</NavLink>
          <NavLink to="/gallery" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Gallery</NavLink>
          <NavLink to="/contact" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Contact</NavLink>
          <div className="mobile-cta-wrapper">
             <Button to="/contact" variant="primary" style={{width: '100%'}} onClick={() => setMobileMenuOpen(false)}>Book a Session &rarr;</Button>
          </div>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
