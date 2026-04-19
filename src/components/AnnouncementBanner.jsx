import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function AnnouncementBanner() {
  const [settings, setSettings] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await api.getSettings();
        setSettings(data);
        
        // Check if user dismissed THIS SPECIFIC banner text
        const dismissedText = localStorage.getItem('ib_banner_dismissed_text');
        if (dismissedText && dismissedText === data?.bannerText) {
          setDismissed(true);
        }
      } catch (err) {
        // gracefully fail
      }
    };
    fetchSettings();
  }, []);

  if (!settings || !settings.bannerActive || dismissed) return null;

  const handleDismiss = () => {
    // Save the specific text so if admin changes text, the banner reappears
    localStorage.setItem('ib_banner_dismissed_text', settings.bannerText);
    setDismissed(true);
  };

  return (
    <div className="announcement-bar" style={{
      background: '#C0001A', // Standard Red
      color: 'white',
      padding: '8px 24px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'sticky',
      top: '68px', /* Position below the fixed navbar */
      zIndex: 900,
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontSize: '0.85rem',
      fontWeight: 500,
      textAlign: 'center',
      transition: 'top 0.3s ease'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .announcement-bar {
            position: relative !important;
            top: 0 !important;
          }
        }
        .navbar.scrolled + .announcement-bar {
          top: 58px !important;
        }
      `}} />
      <div style={{ flex: 1, paddingRight: '20px' }}>
        <span>{settings.bannerText}</span>
      </div>
      <button 
        onClick={handleDismiss}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.8,
          position: 'absolute',
          right: '16px'
        }}
        aria-label="Dismiss banner"
      >
        ✕
      </button>
    </div>
  );
}
