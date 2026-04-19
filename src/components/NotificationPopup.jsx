import React, { useState, useEffect } from 'react';
import { Bell, X, Check } from 'lucide-react';
import { api } from '../services/api';
import './NotificationPopup.css';

const NotificationPopup = () => {
  const [show, setShow] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if seen before
    const hasSeen = localStorage.getItem('ib_notif_prompt_seen');
    if (!hasSeen) {
      const timer = setTimeout(() => setShow(true), 5000); // Show after 5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem('ib_notif_prompt_seen', 'true');
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.subscribe(email);
      setSubscribed(true);
      localStorage.setItem('ib_notif_prompt_seen', 'true');
      setTimeout(() => setShow(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="notif-overlay">
      <div className="notif-popup animate-pop-in">
        <button className="notif-close" onClick={handleClose}><X size={20} /></button>
        
        {!subscribed ? (
          <div className="notif-content">
            <div className="notif-icon-box">
              <Bell className="notif-icon" />
            </div>
            <h3>Stay Updated!</h3>
            <p>Get instant notifications about KEAM registration, scholarships, and exam results.</p>
            
            <form onSubmit={handleSubscribe} className="notif-form">
              <input 
                type="email" 
                required 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="notif-input"
              />
              <button type="submit" className="notif-submit" disabled={loading}>
                {loading ? 'Subscribing...' : 'Yes, Notify Me'}
              </button>
            </form>
            <button className="notif-maybe" onClick={handleClose}>Maybe Later</button>
          </div>
        ) : (
          <div className="notif-success">
            <div className="success-icon-box">
              <Check size={40} color="white" />
            </div>
            <h3>You're on the list!</h3>
            <p>We'll keep you posted with the latest educational updates.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPopup;
