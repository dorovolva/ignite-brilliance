import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';
import { MessageSquare, Calendar, ChevronRight } from 'lucide-react';
import './LatestUpdates.css';

export default function LatestUpdates() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const data = await api.getNews();
        let pub = data.filter(a => a.status === 'Published');
        pub.sort((a, b) => {
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return new Date(b.date) - new Date(a.date);
        });
        setArticles(pub.slice(0, 4)); // Show top 4
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  if (loading || articles.length === 0) return null;

  return (
    <section className="latest-updates-section">
      <div className="container">
        <div className="section-header-wrap">
          <div className="chat-header-accent">
            <MessageSquare size={20} />
            <span>Education Updates Feed</span>
          </div>
          <h2 className="section-title">What's Happening?</h2>
          <p className="section-subtitle">Real-time educational news and scholarship alerts delivered as they happen.</p>
        </div>

        <div className="chat-feed-container">
          {articles.map((article, i) => (
            <div key={article.id} className="chat-bubble-wrapper fade-in-up">
              <div className="chat-bubble">
                <div className="bubble-header">
                  <span className="bubble-category">{article.category}</span>
                  <span className="bubble-time">{new Date(article.date).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                </div>
                
                <h3 className="bubble-title">{article.title}</h3>
                <p className="bubble-summary">{article.summary}</p>
                
                {article.thumbnailUrl && (
                  <div className="bubble-media">
                    <img src={article.thumbnailUrl} alt="Update" />
                  </div>
                )}
                
                <Link to={`/news?id=${article.id}`} className="bubble-action">
                  Read Full Update <ChevronRight size={16} />
                </Link>

                <div className="bubble-tail"></div>
              </div>
            </div>
          ))}

          <div className="chat-cta">
            <Link to="/news" className="btn-chat-all">
              View All Archive <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
