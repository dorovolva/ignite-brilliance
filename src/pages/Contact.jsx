import React, { useEffect, useState } from 'react';
import { MessageCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SEO from '../components/SEO';
import { api } from '../services/api';
import './Contact.css';

const Contact = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await api.getSettings();
        setSettings(data);
      } catch (err) {
        // Fallback to hardcoded string visually if loading fails
      }
    };
    fetchSettings();
  }, []);

  const waLink = settings?.whatsapp 
    ? `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}` 
    : "https://wa.me/919456241625";

  return (
    <div className="contact-page">
      <SEO 
        title="Contact Ignite Brilliance – Career Counsellor in Payyavoor, Kannur"
        description="Reach us at our Payyavoor centre. Call +91 9456 241 625 or email ignitebrilliance26@gmail.com. Book a free consultation."
        keywords="career counsellor in Payyavoor, best education consultant in Kannur district, student service centre Payyavoor, admission consultant Kannur"
      />
      {/* HERO */}
      <section className="contact-hero hero-section text-center">
        <div className="container hero-container" style={{gridTemplateColumns: '1fr', paddingBottom: '40px'}}>
          <div className="hero-content fade-in-up" style={{alignItems: 'center'}}>
            <Badge variant="primary">Let's Talk</Badge>
            <h1>Get in Touch</h1>
            <p className="hero-subline" style={{textAlign: 'center'}}>
              Visit us directly or reach out online. Our team responds within hours.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="section contact-cards-section alt-bg">
        <div className="container">
          <div className="contact-grid">
            {/* WhatsApp Card */}
            <a href={waLink} target="_blank" rel="noreferrer" className="contact-card hover-shadow fade-in-up" style={{borderTop: '4px solid #25D366', textDecoration: 'none'}}>
              <div className="contact-icon" style={{backgroundColor: '#dcf8c6', color: '#25D366'}}>
                <MessageCircle size={32} />
              </div>
              <h3 className="mb-4">Chat on WhatsApp</h3>
              <p className="contact-detail">{settings?.contactPhone1 || '+91 9456 241 625'}</p>
              <span className="contact-action-link" style={{color: '#25D366'}}>Open WhatsApp &rarr;</span>
            </a>

            {/* Call Card */}
            <a href={`tel:${settings?.contactPhone1 || '+919456241625'}`} className="contact-card hover-shadow fade-in-up" style={{borderTop: '4px solid var(--primary-dark)', textDecoration: 'none'}}>
              <div className="contact-icon" style={{backgroundColor: 'var(--surface-light)', color: 'var(--primary-dark)'}}>
                <Phone size={32} />
              </div>
              <h3 className="mb-4">Call us directly</h3>
              <div className="contact-phones">
                <p className="contact-detail">{settings?.contactPhone1 || '+91 9456 241 625'}</p>
                {settings?.contactPhone2 && <p className="contact-detail">{settings.contactPhone2}</p>}
                {settings?.contactPhone3 && <p className="contact-detail">{settings.contactPhone3}</p>}
                {!settings && (
                    <>
                      <p className="contact-detail">+91 7306 241 625</p>
                      <p className="contact-detail">+91 8281 326 726</p>
                    </>
                )}
              </div>
              <span className="contact-action-link">Call Now &rarr;</span>
            </a>

            {/* Email Card */}
            <a href={`mailto:${settings?.contactEmail || 'ignitebrilliance26@gmail.com'}`} className="contact-card hover-shadow fade-in-up" style={{borderTop: '4px solid var(--accent-orange)', textDecoration: 'none'}}>
              <div className="contact-icon" style={{backgroundColor: 'rgba(232, 93, 36, 0.1)', color: 'var(--accent-orange)'}}>
                <Mail size={32} />
              </div>
              <h3 className="mb-4">Send us an email</h3>
              <p className="contact-detail" style={{wordBreak: 'break-all'}}>{settings?.contactEmail || 'ignitebrilliance26@gmail.com'}</p>
              <span className="contact-action-link" style={{color: 'var(--accent-orange)'}}>Send Email &rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* MAP + ADDRESS */}
      <section className="section split-section">
        <div className="container split-container">
          
          {/* Location & Map */}
          <div className="location-wrapper fade-in-up">
            <h2>Visit Our Centre</h2>
            <p className="text-secondary">Walk in directly — no appointment needed for most services.</p>
            
            <div className="map-container">
              <iframe 
                title="Ignite Brilliance Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15610.155556209593!2d75.559385!3d12.006836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4391f6d328c0d%3A0xe542ecdf95eef91!2sPayyavoor%2C%20Kerala!5e0!3m2!1sen!2sin!4v1714080123456!5m2!1sen!2sin" 
                width="100%" 
                height="320" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="address-block">
              <div className="address-detail">
                <MapPin size={24} color="var(--primary-red)" className="mt-1" />
                <div>
                  <h4>Ignite Brilliance Ekajalaka Kendra</h4>
                  <p>{settings?.address || 'Payyavoor Angadi Complex , Block D , Third Floor, Payyavoor-Sreekandapuram Road, 670633'}</p>
                </div>
              </div>
              
              <div className="address-detail">
                <Clock size={24} color="var(--primary-red)" className="mt-1" />
                <div>
                  <h4>Operating Hours</h4>
                  <p>Monday – Saturday, 9:00 AM – 6:00 PM</p>
                </div>
              </div>

              <a href={settings?.mapsUrl || "https://maps.google.com/?q=Payyavoor,Kannur"} target="_blank" rel="noreferrer" className="directions-btn">
                Get Directions &rarr;
              </a>
            </div>
          </div>

          {/* Quick Reach column */}
          <div className="quick-reach-wrapper fade-in-up">
            <h2>Reach Us Instantly</h2>
            <p className="text-secondary">We are available on WhatsApp from 9 AM – 8 PM, six days a week. For admissions and career queries, WhatsApp is the fastest.</p>

            <div className="reach-actions">
              <a href={waLink} target="_blank" rel="noreferrer" className="big-reach-btn wa-reach">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                  <path d="M12.01 2.01A10.02 10.02 0 0 0 2.02 12.02c0 1.63.4 3.2 1.15 4.61L2.01 22.01l5.51-1.14a9.98 9.98 0 0 0 4.49 1.07h.01a10.02 10.02 0 0 0 10.01-10.01A10.03 10.03 0 0 0 22.02 2.01h-10.01z"/>
                </svg>
                WhatsApp Us Now
              </a>
              <a href={`tel:${settings?.contactPhone1 || '+919456241625'}`} className="big-reach-btn call-reach">
                <Phone size={24} />
                Call Us: {settings?.contactPhone1 || '+91 9456 241 625'}
              </a>
            </div>

            <div className="hours-detail">
              <strong>Walk-ins Welcome!</strong><br/>
              No appointment needed for most enquiries. Our counsellors are available Monday through Saturday.
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
