import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { api } from '../services/api';
import './Footer.css';


const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
       try {
         const data = await api.getSettings();
         setSettings(data);
       } catch (e) {}
    };
    fetchSettings();
  }, []);

  return (
    <footer className="footer section">
      <div className="container footer-container">
        
        {/* Column 1 */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
             <img src={settings?.logoUrl || "/assets/logo-white.png"} alt="Ignite Brilliance" onError={(e) => {
               e.target.style.display = 'none';
               e.target.nextSibling.style.display = 'block';
             }} />
             <span style={{ display: 'none', fontWeight: 800, fontSize: '20px', color: 'var(--bg-white)', fontFamily: 'var(--font-h1)' }}>
               Ignite Brilliance
             </span>
          </div>
          <h4 className="footer-tagline">
            {settings?.footerTagline || 'Right Education for the Bright Future'}
          </h4>
          <p className="footer-desc">
            Kerala's first AI-powered single-window career and government services centre.
          </p>
          <div className="social-links">
            {settings?.instagramUrl && (
              <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="social-link">
                Instagram
              </a>
            )}
            {settings?.facebookUrl && (
              <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="social-link">
                Facebook
              </a>
            )}
          </div>
        </div>

        {/* Column 2 */}
        <div className="footer-col">
          <h4 className="footer-heading">Education Services</h4>
          <ul className="footer-links">
            <li><Link to="/career-services">AI Skill Scan</Link></li>
            <li><Link to="/career-services">Career Counselling</Link></li>
            <li><Link to="/career-services">Stream Selection</Link></li>
            <li><Link to="/career-services">College Admissions</Link></li>
            <li><Link to="/career-services">Abroad Study</Link></li>
            <li><Link to="/career-services">Open School Support</Link></li>
            <li><Link to="/career-services">Certification Courses</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-col">
          <h4 className="footer-heading">Government Services</h4>
          <ul className="footer-links">
            <li><Link to="/government-services">Passport Assistance</Link></li>
            <li><Link to="/government-services">PAN Card</Link></li>
            <li><Link to="/government-services">e-Aadhaar Updates</Link></li>
            <li><Link to="/government-services">Utility Payments</Link></li>
            <li><Link to="/government-services">Ticket Booking</Link></li>
            <li><Link to="/government-services">Other Govt. Services</Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="footer-col">
          <h4 className="footer-heading">Contact</h4>
          <ul className="footer-contact">
            <li>
              <MapPin size={18} />
              <span>{settings?.address || 'Payyavoor, Kannur – 670633'}</span>
            </li>
            <li>
              <Phone size={18} />
              <div className="phone-list">
                {settings?.contactPhone1 && <a href={`tel:${settings.contactPhone1}`}>{settings.contactPhone1}</a>}
                {settings?.contactPhone2 && <a href={`tel:${settings.contactPhone2}`}>{settings.contactPhone2}</a>}
                {settings?.contactPhone3 && <a href={`tel:${settings.contactPhone3}`}>{settings.contactPhone3}</a>}
                {!settings && <a href="tel:+919456241625">+91 9456 241 625</a>}
              </div>
            </li>
            <li>
              <Mail size={18} />
              <a href={`mailto:${settings?.contactEmail || 'ignitebrilliance26@gmail.com'}`}>
                {settings?.contactEmail || 'ignitebrilliance26@gmail.com'}
              </a>
            </li>
          </ul>
          <a href={settings?.mapsUrl || "https://maps.google.com/?q=Payyavoor,Kannur"} target="_blank" rel="noreferrer" className="footer-directions">
            Get Directions &rarr;
          </a>
        </div>

      </div>

      <div className="container">
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Ignite Brilliance Ekajalaka Kendra. All rights reserved. | A Project Under DAKHS Digital Revolution Pvt. Ltd.</p>
          <p className="footer-dev">
            Developed by{' '}
            <a href="https://dorovolva.vercel.app" target="_blank" rel="noreferrer" className="footer-dev-link">
              DOROVOLVA
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
