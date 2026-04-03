import React from 'react';
import './FloatingWhatsApp.css';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
  return (
    <>
      {/* Desktop Floating Button */}
      <a 
        href="https://wa.me/919456241625?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services."
        target="_blank"
        rel="noreferrer"
        className="floating-wa"
        title="Chat with us ->"
      >
        <MessageCircle size={32} color="white" fill="white" />
      </a>

      {/* Mobile Sticky Bar */}
      <div className="mobile-sticky-bar">
        <a href="tel:+919456241625" className="sticky-btn call-btn">
          📞 Call
        </a>
        <a href="https://wa.me/919456241625?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services." className="sticky-btn wa-btn">
          💬 WhatsApp
        </a>
      </div>
    </>
  );
};

export default FloatingWhatsApp;
