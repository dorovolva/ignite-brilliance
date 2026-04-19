import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Loader2, Calendar, Tag, ChevronLeft, Share2 } from 'lucide-react';
import Button from '../components/ui/Button';
import './NewsPage.css';

const NewsPage = () => {
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get('id');
  
  const [news, setNews] = useState([]);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await api.getNews();
        // Filter published and sort (pinned first, then date)
        const published = data.filter(item => item.status === 'Published')
          .sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return new Date(b.date) - new Date(a.date);
          });
        
        setNews(published);

        if (articleId) {
          const found = published.find(n => n.id === articleId);
          setArticle(found);
        }
      } catch (err) {
        console.error('Failed to fetch news', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [articleId]);

  // Extract unique categories
  const categories = ['All', ...new Set(news.map(n => n.category))];

  const filteredNews = category === 'All' 
    ? news 
    : news.filter(n => n.category === category);

  const handleShare = () => {
    if (!article) return;
    const url = window.location.href;
    const text = `Check out this update from Ignite Brilliance: ${article.title}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="news-loading">
        <Loader2 className="animate-spin" size={48} />
        <p>Loading updates...</p>
      </div>
    );
  }

  // SINGLE ARTICLE VIEW
  if (articleId && article) {
    return (
      <div className="news-detail-page">
        <div className="container">
          <Link to="/news" className="back-link">
            <ChevronLeft size={20} /> Back to All News
          </Link>
          
          <article className="article-container">
            <div className="article-header">
              <span className="article-badge">{article.category}</span>
              <h1>{article.title}</h1>
              <div className="article-meta">
                <span><Calendar size={16} /> {new Date(article.date).toLocaleDateString()}</span>
                <button onClick={handleShare} className="share-btn">
                  <Share2 size={16} /> Share on WhatsApp
                </button>
              </div>
            </div>

            {article.thumbnailUrl && (
              <div className="article-hero">
                <img src={article.thumbnailUrl} alt={article.title} />
              </div>
            )}

            <div 
              className="article-body rich-text" 
              dangerouslySetInnerHTML={{ __html: article.body }} 
            />
            
            <div className="article-footer">
              <Button to="/news" variant="outline-red">View More News</Button>
              <Button to="/contact" variant="primary">Talk to an Expert &rarr;</Button>
            </div>
          </article>
        </div>
      </div>
    );
  }

  // LISTING VIEW
  return (
    <div className="news-listing-page">
      <section className="news-hero">
        <div className="container">
          <h1>News & Updates</h1>
          <p>The latest educational news, scholarship updates, and centre announcements.</p>
        </div>
      </section>

      <section className="news-content">
        <div className="container">
          {/* CATEGORY FILTER */}
          <div className="category-tabs">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`category-tab ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredNews.length === 0 ? (
            <div className="no-news">
              <h3>No updates found in this category.</h3>
              <p>Check back later or explore other categories.</p>
            </div>
          ) : (
            <div className="news-grid">
              {filteredNews.map(item => (
                <Link to={`/news?id=${item.id}`} key={item.id} className="news-card">
                  {item.thumbnailUrl && (
                    <div className="news-card-img">
                      <img src={item.thumbnailUrl} alt={item.title} />
                    </div>
                  )}
                  <div className="news-card-content">
                    <div className="news-card-header">
                      <span className="news-card-badge">{item.category}</span>
                      <span className="news-card-date">{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                    <span className="read-more">Read Full Update &rarr;</span>
                  </div>
                  {item.pinned && <div className="pinned-badge">Pinned</div>}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
