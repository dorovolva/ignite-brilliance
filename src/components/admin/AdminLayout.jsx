import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { LayoutGrid, Newspaper, Image as ImageIcon, Settings, Lock, LogOut } from 'lucide-react';
import './AdminLayout.css';

const TABS = [
  { id: 'news', label: 'News & Updates', icon: Newspaper, path: '/admin/news' },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon, path: '/admin/gallery' },
  { id: 'settings', label: 'Contact Details', icon: Settings, path: '/admin/settings' },
  { id: 'password', label: 'Change Password', icon: Lock, path: '/admin/password' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check authentication
    const token = sessionStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    }
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <div className="admin-layout">
      {/* Top Navbar */}
      <header className="admin-header">
        <div className="admin-logo">
          <Link to="/admin/news" className="text-white font-bold text-lg decoration-none">
             Ignite Brilliance Admin
          </Link>
        </div>
        
        <div className="admin-nav-actions">
          <a href="/" target="_blank" rel="noopener noreferrer" className="view-site-link">
            View Website &rarr;
          </a>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <div className="admin-body">
        {/* Sidebar / Top Nav (Responsive) */}
        <nav className="admin-sidebar">
          <ul className="admin-tab-list">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = location.pathname.startsWith(tab.path);
              return (
                <li key={tab.id}>
                  <Link 
                    to={tab.path} 
                    className={`admin-tab-link ${isActive ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Main Content Area */}
        <main className="admin-content">
          <div className="admin-content-inner">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Mobile Bottom Bar */}
      <nav className="admin-mobile-bar">
         {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname.startsWith(tab.path);
            return (
              <Link 
                key={tab.id}
                to={tab.path} 
                className={`mobile-tab-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span className="mobile-tab-label">{tab.label.split(' ')[0]}</span>
              </Link>
            );
          })}
      </nav>
    </div>
  );
}
