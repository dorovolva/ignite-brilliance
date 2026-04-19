import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';

export default function NewsManager() {
  const [newsList, setNewsList] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Exam News');
  const [summary, setSummary] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [sourceLink, setSourceLink] = useState('');
  const [status, setStatus] = useState('Published');
  const [pinned, setPinned] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, type: '', msg: '' });

  const showToast = (type, msg) => {
    setToast({ show: true, type, msg });
    setTimeout(() => setToast({ show: false, type: '', msg: '' }), 4000);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoadingUpload(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        try {
          const res = await api.uploadImage(base64String, file.name, 'news');
          setThumbnailUrl(res.url);
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

  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false })
    ],
    content: '',
  });

  const fetchNews = async () => {
    setLoading(true);
    try {
      const data = await api.getNews();
      // sort pinned first, then by date
      data.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return new Date(b.date) - new Date(a.date);
      });
      setNewsList(data);
    } catch (e) {
      console.error('Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleAddNew = () => {
    setEditingArticle({ id: null });
    setTitle('');
    setCategory('Exam News');
    setSummary('');
    setThumbnailUrl('');
    setSourceLink('');
    setStatus('Published');
    setPinned(false);
    if (editor) editor.commands.setContent('');
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setTitle(article.title);
    setCategory(article.category || 'Exam News');
    setSummary(article.summary || '');
    setThumbnailUrl(article.thumbnailUrl || '');
    setSourceLink(article.sourceLink || '');
    setStatus(article.status || 'Draft');
    setPinned(article.pinned || false);
    if (editor) editor.commands.setContent(article.body || '');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      await api.deleteNews(id);
      fetchNews();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim()) { showToast('error', 'Title is required.'); return; }
    if (!summary.trim()) { showToast('error', 'Summary is required.'); return; }
    setSaving(true);
    try {
      const data = {
        title,
        category,
        summary,
        body: editor.getHTML(),
        thumbnailUrl,
        sourceLink,
        status,
        pinned
      };

      if (editingArticle.id) {
        await api.updateNews({ ...data, id: editingArticle.id });
        showToast('success', '✓ Article updated successfully!');
      } else {
        await api.addNews(data);
        showToast('success', '✓ Article published!');
      }

      setEditingArticle(null);
      fetchNews();
    } catch (err) {
      showToast('error', 'Failed to save: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading news...</div>;

  return (
    <div>
      {/* Toast */}
      {toast.show && (
        <div style={{
          position: 'fixed', top: '80px', right: '24px', zIndex: 9999,
          background: toast.type === 'success' ? '#d4edda' : '#f8d7da',
          color: toast.type === 'success' ? '#155724' : '#721c24',
          padding: '14px 20px', borderRadius: '12px', fontWeight: 600,
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)', maxWidth: '380px', fontSize: '0.9rem',
          animation: 'slideInRight 0.3s ease-out'
        }}>
          {toast.msg}
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `@keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>News & Updates Manager</h1>
        {!editingArticle && (
          <button className="admin-btn" onClick={handleAddNew}>+ Add New Article</button>
        )}
      </div>

      {editingArticle ? (
        <div className="admin-card">
          <h2 className="admin-section-title">{editingArticle.id ? 'Edit Article' : 'Add New Article'}</h2>
          <form onSubmit={handleSave}>
            <div className="admin-form-group">
              <label className="admin-label">Title *</label>
              <input className="admin-input" required value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            
            <div style={{ display: 'flex', gap: '20px' }}>
              <div className="admin-form-group" style={{ flex: 1 }}>
                <label className="admin-label">Category</label>
                <select className="admin-select" value={category} onChange={e => setCategory(e.target.value)}>
                  <option>Exam News</option>
                  <option>Admission Updates</option>
                  <option>Scholarship</option>
                  <option>Kerala Education</option>
                  <option>Career Tips</option>
                  <option>General</option>
                </select>
              </div>
              <div className="admin-form-group" style={{ flex: 1 }}>
                <label className="admin-label">Status</label>
                <select className="admin-select" value={status} onChange={e => setStatus(e.target.value)}>
                  <option>Published</option>
                  <option>Draft</option>
                </select>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Short Summary (Max 200 chars)</label>
              <textarea className="admin-textarea" maxLength={200} value={summary} onChange={e => setSummary(e.target.value)} />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Full Article Body</label>
              {/* Simple rich text toolbar */}
              {editor && (
                 <div style={{ border: '1px solid #e8e8e8', borderBottom: 'none', padding: '8px', display: 'flex', gap: '8px', background: '#f5f5f5', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
                   <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} style={{ fontWeight: 'bold' }}>B</button>
                   <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} style={{ fontStyle: 'italic' }}>I</button>
                   <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>Bullets</button>
                 </div>
              )}
              <div style={{ border: '1px solid #e8e8e8', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', padding: '10px', minHeight: '150px' }}>
                <EditorContent editor={editor} />
              </div>
              <style dangerouslySetInnerHTML={{__html:`
                .tiptap { outline: none; }
                .tiptap p { margin-top: 0; }
              `}} />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Featured Image (Direct Import)</label>
              <div 
                 style={{
                    border: '2px dashed #e8e8e8',
                    borderRadius: '8px',
                    padding: '20px',
                    textAlign: 'center',
                    background: '#f9f9f9',
                    cursor: 'pointer',
                    position: 'relative'
                 }}
                 onClick={() => document.getElementById('news-file-input').click()}
              >
                 {loadingUpload ? (
                    <div style={{ color: '#C0001A', fontWeight: 600 }}>Uploading...</div>
                 ) : thumbnailUrl ? (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img src={thumbnailUrl} alt="Preview" style={{ height: '100px', borderRadius: '4px', border: '1px solid #ddd' }} />
                      <div style={{ position: 'absolute', bottom: '-20px', left: 0, right: 0, fontSize: '0.7rem', color: '#666' }}>Click to change</div>
                    </div>
                 ) : (
                    <div style={{ color: '#666' }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>🖼️</div>
                      <div>Click to Upload Image</div>
                    </div>
                 )}
                 <input 
                    id="news-file-input"
                    type="file" 
                    hidden 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                    disabled={loadingUpload} 
                 />
              </div>
              <div style={{ marginTop: '10px', fontSize: '0.75rem', color: '#999', display: 'flex', justifyContent: 'space-between' }}>
                <span>* Automatically saved to Google Drive bridge</span>
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={(e) => {
                  e.stopPropagation();
                  const url = prompt("Enter Image URL manually:", thumbnailUrl);
                  if (url !== null) setThumbnailUrl(url);
                }}>Manual URL</span>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Source Link (Optional)</label>
              <input className="admin-input" type="url" placeholder="https://..." value={sourceLink} onChange={e => setSourceLink(e.target.value)} />
            </div>

            <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" id="pinned" checked={pinned} onChange={e => setPinned(e.target.checked)} />
              <label htmlFor="pinned" style={{ fontWeight: 500 }}>Pin to top</label>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
              <button type="submit" className="admin-btn" disabled={saving}>
                {saving ? 'Saving...' : editingArticle.id ? 'Update Article' : 'Publish Article'}
              </button>
              <button type="button" className="admin-btn secondary" onClick={() => setEditingArticle(null)}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5', textAlign: 'left', borderBottom: '1px solid #e8e8e8' }}>
                <th style={{ padding: '16px', fontSize: '0.875rem', color: '#6b6b6b' }}>Title</th>
                <th style={{ padding: '16px', fontSize: '0.875rem', color: '#6b6b6b' }}>Category</th>
                <th style={{ padding: '16px', fontSize: '0.875rem', color: '#6b6b6b' }}>Status</th>
                <th style={{ padding: '16px', fontSize: '0.875rem', color: '#6b6b6b' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsList.length === 0 && (
                <tr><td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#6b6b6b' }}>No articles found.</td></tr>
              )}
              {newsList.map(article => (
                <tr key={article.id} style={{ borderBottom: '1px solid #e8e8e8' }}>
                  <td style={{ padding: '16px', fontWeight: 500, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {article.pinned && <span style={{ color: '#C0001A', marginRight: '6px' }}>📌</span>}
                    {article.title}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ fontSize: '0.75rem', background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px' }}>{article.category}</span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ fontSize: '0.75rem', background: article.status === 'Published' ? '#e2efda' : '#fff2cc', padding: '4px 8px', borderRadius: '4px', color: article.status === 'Published' ? '#2e7d32' : '#b28900' }}>
                      {article.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="admin-btn secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => handleEdit(article)}>Edit</button>
                      <button className="admin-btn danger" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => handleDelete(article.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
