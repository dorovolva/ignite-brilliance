import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Loader2, Maximize2 } from 'lucide-react';
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';
import './GalleryPage.css';

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const data = await api.getGallery();
        // Sort by displayOrder if available
        const sorted = data.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setImages(sorted);
      } catch (err) {
        console.error('Failed to fetch gallery', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
      });
      return () => lightbox.destroy();
    }
  }, [images, filter]);

  const categories = ['All', ...new Set(images.map(img => img.category))];

  const filteredImages = filter === 'All' 
    ? images 
    : images.filter(img => img.category === filter);

  if (loading) {
    return (
      <div className="gallery-loading">
        <Loader2 className="animate-spin" size={48} />
        <p>Opening the gallery...</p>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      <section className="gallery-hero">
        <div className="container">
          <h1>Our Gallery</h1>
          <p>A glimpse into our centre, events, and the bright futures we help build.</p>
        </div>
      </section>

      <section className="gallery-content">
        <div className="container">
          {/* CATEGORY FILTER */}
          <div className="gallery-filters">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredImages.length === 0 ? (
            <div className="no-images">
              <p>No images found in this category.</p>
            </div>
          ) : (
            <div className="gallery-grid">
              {filteredImages.map((img, index) => (
                <div key={img.id || index} className="gallery-item">
                  <a href={img.url} className="glightbox" data-gallery="main-gallery" data-title={img.caption} data-description={img.category}>
                    <img src={img.url} alt={img.caption} loading="lazy" />
                    <div className="gallery-overlay">
                      <div className="overlay-content">
                        <Maximize2 size={24} />
                        <p>{img.caption}</p>
                        <span>{img.category}</span>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
