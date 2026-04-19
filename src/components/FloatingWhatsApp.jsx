import React, { useState, useEffect } from 'react';
import './FloatingWhatsApp.css';
import { MessageCircle } from 'lucide-react';
import { api } from '../services/api';

const FloatingWhatsApp = () => {
  const [phone, setPhone] = useState('919456241625');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await api.getSettings();
        if (settings.whatsapp) {
          // Remove non-numeric characters for wa.me URL
          const cleanPhone = settings.whatsapp.replace(/\D/g, '');
          setPhone(cleanPhone);
        }
      } catch (e) {}
    };
    fetchSettings();
  }, []);

  return (
    <>
      {/* Desktop Floating Button */}
      <a 
        href={`https://wa.me/${phone}?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services.`}
        target="_blank"
        rel="noreferrer"
        className="floating-wa"
        title="Chat with us ->"
      >
        <MessageCircle size={32} color="white" fill="white" />
      </a>

      {/* Mobile Sticky Bar */}
      <div className="mobile-sticky-bar">
        <a href={`tel:${phone}`} className="sticky-btn call-btn">
          📞 Call
        </a>
        <a href={`https://wa.me/${phone}?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services.`} className="sticky-btn wa-btn">
          💬 WhatsApp
        </a>
      </div>
    </>
  );
};

export default FloatingWhatsApp;
