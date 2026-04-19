import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, keywords, canonical }) => {
  const location = useLocation();

  useEffect(() => {
    // Title
    if (title) {
      document.title = title;
    }

    // Meta Description
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', description || "AI-powered career guidance and government services centre in Kannur, Kerala.");
    }

    // Meta Keywords
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      keywordsMeta.setAttribute('content', keywords || "career guidance, ignite brilliance, kannur, payyavoor");
    }

    // Canonical
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonical || `https://www.ignitebrilliance.co.in${location.pathname}`);
    }

  }, [title, description, keywords, canonical, location.pathname]);

  return null;
};

export default SEO;
