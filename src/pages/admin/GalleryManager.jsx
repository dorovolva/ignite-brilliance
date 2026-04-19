import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';

export default function GalleryManager() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  // Fake upload form state
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImgCaption, setNewImgCaption] = useState('');
  const [newImgCategory, setNewImgCategory] = useState('Events');
  const [loadingUpload, setLoadingUpload] = useState(false);

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // We take the first file for now as the current form is single-entry
    const file = files[0];
    setLoadingUpload(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        try {
          const res = await api.uploadImage(base64String, file.name, 'gallery');
          setNewImgUrl(res.url); // Automatically populate the URL field
        } catch (err) {
          alert('Upload failed. Check your Apps Script deployment.');
        } finally {
          setLoadingUpload(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setLoadingUpload(false);
    }
  };

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const data = await api.getGallery();
      setImages(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Remove this image?')) {
      await api.deleteImage(id);
      fetchGallery();
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!newImgUrl) return alert('Please upload or provide an image link first.');
    setUploading(true);
    try {
      await api.addImage({ url: newImgUrl, caption: newImgCaption, category: newImgCategory });
      setNewImgUrl('');
      setNewImgCaption('');
      setShowUploadForm(false);
      fetchGallery();
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="admin-loading">Loading gallery...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Gallery Manager</h1>
        {!showUploadForm && (
          <button className="admin-btn" onClick={() => setShowUploadForm(true)}>+ Import Images</button>
        )}
      </div>

      {showUploadForm && (
        <div className="admin-card">
          <h2 className="admin-section-title">Import New Image</h2>
          <form onSubmit={handleUploadSubmit}>
             <div className="admin-form-group">
                <label className="admin-label">Direct Import (Upload from Computer)</label>
                <div 
                   className="admin-upload-zone"
                   style={{
                      border: '2px dashed #e8e8e8',
                      borderRadius: '12px',
                      padding: '40px',
                      textAlign: 'center',
                      background: '#f9f9f9',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                   }}
                   onClick={() => document.getElementById('gallery-file-input').click()}
                   onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary-red)'}
                   onMouseOut={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                >
                   {loadingUpload ? (
                      <div style={{ color: '#C0001A', fontWeight: 600 }}>Uploading to Cloud...</div>
                   ) : newImgUrl ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                         <img src={newImgUrl} alt="Preview" style={{ height: '120px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                         <span style={{ color: '#2e7d32', fontSize: '0.85rem' }}>✓ Image Ready</span>
                      </div>
                   ) : (
                      <>
                        <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📁</div>
                        <div style={{ fontWeight: 600 }}>Click or Drag to Upload</div>
                        <div style={{ color: '#999', fontSize: '0.85rem' }}>Supports PNG, JPG, WEBP</div>
                      </>
                   )}
                   <input 
                      id="gallery-file-input"
                      type="file" 
                      hidden 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      disabled={loadingUpload} 
                   />
                </div>
             </div>

             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="admin-form-group">
                    <label className="admin-label">Caption (Visible on hover)</label>
                    <input className="admin-input" style={{width: '100%'}} placeholder="e.g. Students in session..." maxLength={60} value={newImgCaption} onChange={e => setNewImgCaption(e.target.value)} />
                </div>
                <div className="admin-form-group">
                    <label className="admin-label">Category</label>
                    <select className="admin-select" style={{width: '100%'}} value={newImgCategory} onChange={e => setNewImgCategory(e.target.value)}>
                      <option>Office</option>
                      <option>Counselling Sessions</option>
                      <option>Events</option>
                      <option>Student Moments</option>
                      <option>Government Services</option>
                    </select>
                </div>
             </div>

             {/* Manual URL input removed for strict upload enforcement */}

             <div style={{ display: 'flex', gap: '16px', marginTop: '32px', borderTop: '1px solid #eee', paddingTop: '24px' }}>
                <button type="submit" className="admin-btn" disabled={uploading || !newImgUrl}>{uploading ? 'Finalizing...' : 'Save to Gallery'}</button>
                <button type="button" className="admin-btn secondary" onClick={() => setShowUploadForm(false)}>Cancel</button>
             </div>
          </form>
        </div>
      )}

      {images.length === 0 ? (
        <p style={{ color: '#6b6b6b' }}>No images in gallery yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {images.map(img => (
            <div key={img.id} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f0f0f0', aspectRatio: '1/1', border: '1px solid #e8e8e8' }}>
              <img src={img.url} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button 
                onClick={() => handleDelete(img.id)}
                style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(192,0,26,0.9)', color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px' }}>
                ✕
              </button>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.7)', color: 'white', padding: '8px', fontSize: '0.75rem' }}>
                <div style={{ fontWeight: 600 }}>{img.category}</div>
                {img.caption && <div style={{ opacity: 0.8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{img.caption}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
