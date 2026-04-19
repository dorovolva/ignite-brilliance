import React, { useState } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function PasswordManager() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMsg({ text: '', type: '' });

    if (newPassword.length < 8) {
      setMsg({ text: 'New password must be at least 8 characters long.', type: 'error' });
      return;
    }
    if (!/\d/.test(newPassword)) {
      setMsg({ text: 'New password must contain at least one number.', type: 'error' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMsg({ text: 'New passwords do not match.', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      await api.changePassword({ currentPassword, newPassword });
      setMsg({ text: 'Password updated successfully! Logging out...', type: 'success' });
      
      setTimeout(() => {
        sessionStorage.removeItem('adminToken');
        navigate('/admin');
      }, 2000);
    } catch (err) {
      setMsg({ text: 'Failed to update password. Current password might be incorrect.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">Change Password</h1>
      
      <div className="admin-card" style={{ maxWidth: '500px' }}>
        <form onSubmit={handleUpdate}>
          <div className="admin-form-group">
            <label className="admin-label">Current Password</label>
            <input 
              type="password" 
              className="admin-input" 
              required 
              value={currentPassword} 
              onChange={e => setCurrentPassword(e.target.value)} 
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">New Password</label>
            <input 
              type="password" 
              className="admin-input" 
              required 
              value={newPassword} 
              onChange={e => setNewPassword(e.target.value)} 
            />
            <small style={{ color: '#6b6b6b', marginTop: '4px', display: 'block' }}>Must be at least 8 chars & contain a number.</small>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Confirm New Password</label>
            <input 
              type="password" 
              className="admin-input" 
              required 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)} 
            />
          </div>

          {msg.text && (
            <div style={{ padding: '12px', borderRadius: '8px', marginBottom: '20px', 
                          background: msg.type === 'error' ? '#fff0f2' : '#e2efda',
                          color: msg.type === 'error' ? '#C0001A' : '#2e7d32',
                          border: `1px solid ${msg.type === 'error' ? '#ffccd5' : '#c3e6cb'}`,
                          fontSize: '0.9rem' }}>
              {msg.text}
            </div>
          )}

          <button type="submit" className="admin-btn" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
