import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollAnimation() {
  const { pathname } = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: unobserve after animating to only animate once
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Give react time to render DOM
    const timeout = setTimeout(() => {
      const hiddenElements = document.querySelectorAll('.fade-in-up');
      hiddenElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [pathname]);
}
