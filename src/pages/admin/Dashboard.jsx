import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({ newsCount: 0, galleryCount: 0, lastUpdated: null });
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [news, gallery, recentLogs] = await Promise.all([
          api.getNews(),
          api.getGallery(),
          api.getRecentLogs()
        ]);
        
        setStats({
          newsCount: news.length,
          galleryCount: gallery.length,
          lastUpdated: new Date().toLocaleString()
        });
        setLogs(recentLogs);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1 className="admin-page-title">Dashboard</h1>
      
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <div className="admin-card" style={{ marginBottom: 0 }}>
          <h3 className="admin-label">Total News Articles</h3>
          <p style={{ fontSize: '2rem', fontWeight: '700', color: '#1a1a1a', margin: '8px 0 0 0' }}>{stats.newsCount}</p>
        </div>
        <div className="admin-card" style={{ marginBottom: 0 }}>
          <h3 className="admin-label">Total Gallery Images</h3>
          <p style={{ fontSize: '2rem', fontWeight: '700', color: '#1a1a1a', margin: '8px 0 0 0' }}>{stats.galleryCount}</p>
        </div>
        <div className="admin-card" style={{ marginBottom: 0 }}>
          <h3 className="admin-label">Last Updated</h3>
          <p style={{ fontSize: '1rem', fontWeight: '600', color: '#1a1a1a', margin: '8px 0 0 0' }}>{stats.lastUpdated}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '32px' }}>
        <h2 className="admin-section-title">Quick Actions</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/admin/news" className="admin-btn">+ Add News Article</Link>
          <Link to="/admin/gallery" className="admin-btn secondary">+ Upload Image</Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="admin-card">
        <h2 className="admin-section-title" style={{ marginBottom: '20px' }}>Recent Activity</h2>
        {logs.length === 0 ? (
          <p style={{ color: '#6b6b6b' }}>No activity yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, gap: '16px', display: 'flex', flexDirection: 'column' }}>
            {logs.map((log, i) => (
              <li key={i} style={{ borderBottom: i !== logs.length - 1 ? '1px solid #e8e8e8' : 'none', paddingBottom: i !== logs.length - 1 ? '16px' : '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontWeight: '600', color: '#1a1a1a', display: 'block' }}>{log.action}</span>
                    <span style={{ color: '#6b6b6b', fontSize: '0.875rem' }}>{log.details}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#999' }}>{new Date(log.timestamp).toLocaleString()}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
