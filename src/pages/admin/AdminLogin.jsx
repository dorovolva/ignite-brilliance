import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FlameParticles from '../../components/FlameParticles';
import { api } from '../../services/api';
import './AdminLogin.css';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [lockoutTimer, setLockoutTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('adminToken')) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  useEffect(() => {
    let interval;
    if (lockoutTimer > 0) {
      interval = setInterval(() => {
        setLockoutTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [lockoutTimer]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (lockoutTimer > 0) return;

    setLoading(true);
    setError('');

    try {
      const res = await api.login(password);
      sessionStorage.setItem('adminToken', res.token);
      
      // Reset attempts logic (in a real app, this should be server-side)
      localStorage.removeItem('adminFailedAttempts');
      
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Incorrect password. Try again.');
      
      let attempts = parseInt(localStorage.getItem('adminFailedAttempts') || '0', 10);
      attempts += 1;
      localStorage.setItem('adminFailedAttempts', attempts.toString());
      
      if (attempts >= 5) {
        setLockoutTimer(15 * 60); // 15 minutes
        localStorage.setItem('adminFailedAttempts', '0'); // reset for after timer
      }
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-bg">
        <FlameParticles />
      </div>
      
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h2>Ignite Brilliance</h2>
          <p>Admin Portal</p>
        </div>

        {lockoutTimer > 0 ? (
          <div className="admin-lockout-msg">
            Too many failed attempts. Try again in {formatTime(lockoutTimer)}.
          </div>
        ) : (
          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-form-group">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input"
                required
              />
            </div>
            
            {error && <div className="admin-login-error">{error}</div>}
            
            <button type="submit" className="admin-btn login-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login \u2192'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
