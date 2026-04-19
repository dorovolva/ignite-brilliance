import React, { useEffect, useState, useCallback } from 'react';
import { api } from '../../services/api';
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SettingsManager() {
  const [settings, setSettings] = useState(null);
  const [originalSettings, setOriginalSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, type: '', message: '' });

  const fetchSettings = useCallback(async () => {
    try {
      const data = await api.getSettings();
      const safe = data || {};
      setSettings(safe);
      setOriginalSettings(JSON.stringify(safe));
    } catch (e) {
      console.error(e);
      setSettings({});
      setOriginalSettings('{}');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Track unsaved changes
  const hasUnsavedChanges = settings && JSON.stringify(settings) !== originalSettings;

  // Warn before leaving with unsaved changes  
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: '', message: '' }), 4000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    setSettings(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.updateSettings(settings);
      setSettings(res);
      setOriginalSettings(JSON.stringify(res));
      showToast('success', '✓ Details saved successfully! Changes are now live on the website.');
    } catch (err) {
      console.error('Save error:', err);
      showToast('error', '✕ Failed to save: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-loading">Loading settings...</div>;
  if (!settings) return <div className="admin-error">Error loading settings.</div>;

  const inputStyle = { width: '100%' };
  const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Contact Details & Announcements</h1>
        {hasUnsavedChanges && (
          <span style={{ background: '#fff3cd', color: '#856404', padding: '6px 14px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertCircle size={14} /> Unsaved changes
          </span>
        )}
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div style={{
          position: 'fixed', top: '80px', right: '24px', zIndex: 9999,
          background: toast.type === 'success' ? '#d4edda' : '#f8d7da',
          color: toast.type === 'success' ? '#155724' : '#721c24',
          padding: '14px 20px', borderRadius: '12px', fontWeight: 600,
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', gap: '8px',
          animation: 'slideInRight 0.3s ease-out', maxWidth: '400px', fontSize: '0.9rem'
        }}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {toast.message}
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}} />
      
      <form onSubmit={handleSave}>
        {/* ── SECTION 1: Contact Information ── */}
        <div className="admin-card">
          <h2 className="admin-section-title">📞 Contact Information</h2>
          <p style={{ color: '#6b6b6b', fontSize: '0.85rem', marginBottom: '20px' }}>
            These details appear in the Footer, Contact page, and WhatsApp buttons site-wide.
          </p>
          <div style={gridStyle}>
            <div className="admin-form-group">
              <label className="admin-label">Primary Phone</label>
              <input name="contactPhone1" className="admin-input" style={inputStyle}
                placeholder="+91 98765 43210"
                value={settings.contactPhone1 || ''} onChange={handleChange} />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Phone 2 (Optional)</label>
              <input name="contactPhone2" className="admin-input" style={inputStyle}
                placeholder="+91 ..."
                value={settings.contactPhone2 || ''} onChange={handleChange} />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Phone 3 (Optional)</label>
              <input name="contactPhone3" className="admin-input" style={inputStyle}
                placeholder="+91 ..."
                value={settings.contactPhone3 || ''} onChange={handleChange} />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Email Address</label>
              <input name="contactEmail" type="email" className="admin-input" style={inputStyle}
                placeholder="hello@ignitebrilliance.com"
                value={settings.contactEmail || ''} onChange={handleChange} />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">WhatsApp Number</label>
              <input name="whatsapp" className="admin-input" style={inputStyle}
                placeholder="+919876543210 (no spaces)"
                value={settings.whatsapp || ''} onChange={handleChange} />
              <small style={{ color: '#999', marginTop: '4px', display: 'block' }}>Used for WhatsApp chat button on the website.</small>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Google Maps URL</label>
              <input name="mapsUrl" className="admin-input" style={inputStyle}
                placeholder="https://maps.google.com/?q=..."
                value={settings.mapsUrl || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="admin-form-group" style={{ marginTop: '12px' }}>
            <label className="admin-label">Full Address</label>
            <textarea name="address" className="admin-textarea" style={{ minHeight: '70px', width: '100%' }}
              placeholder="Near Govt Hospital, Payyavoor, Kannur, Kerala 670633"
              value={settings.address || ''} onChange={handleChange} />
          </div>
        </div>

        {/* ── SECTION 2: Banner ── */}
        <div className="admin-card">
          <h2 className="admin-section-title">📢 Announcement Banner</h2>
          <p style={{ color: '#6b6b6b', fontSize: '0.85rem', marginBottom: '20px' }}>
            A solid colored strip shown at the top of the website. Visitors can dismiss it. Update the text to un-dismiss it for everyone.
          </p>
          <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <input name="bannerActive" type="checkbox" id="bannerActive"
              checked={settings.bannerActive || false} onChange={handleChange}
              style={{ width: '18px', height: '18px', accentColor: '#C0001A' }} />
            <label htmlFor="bannerActive" style={{ fontWeight: 600, cursor: 'pointer' }}>
              Show Announcement Banner on Website
            </label>
          </div>
          
          {settings.bannerActive && (
            <div className="admin-form-group">
              <label className="admin-label">Banner Text</label>
              <input name="bannerText" className="admin-input" style={inputStyle}
                placeholder="KEAM 2026 registration now open — Contact us for guidance!"
                value={settings.bannerText || ''} onChange={handleChange} />
            </div>
          )}
        </div>

        {/* ── SAVE BUTTON ── */}
        <div style={{
          position: 'sticky', bottom: '0', background: 'white',
          padding: '20px 0', borderTop: '1px solid #e8e8e8', zIndex: 10,
          display: 'flex', alignItems: 'center', gap: '16px'
        }}>
          <button type="submit" className="admin-btn" disabled={saving || !hasUnsavedChanges}
            style={{
              opacity: hasUnsavedChanges ? 1 : 0.5,
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '12px 28px', fontSize: '0.95rem'
            }}>
            <Save size={16} />
            {saving ? 'Saving...' : hasUnsavedChanges ? 'Save Changes' : 'All Saved'}
          </button>
          {!hasUnsavedChanges && !saving && (
            <span style={{ color: '#2e7d32', fontSize: '0.85rem', fontWeight: 500 }}>
              ✓ Everything is up to date
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
