import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Clear any existing ScrollTriggers to prevent duplicates on route change
    ScrollTrigger.getAll().forEach(st => st.kill());

    const batchAnimation = () => {
      const targets = gsap.utils.toArray('.fade-in-up');
      
      if (targets.length === 0) return;

      // Premium "Professional Glide" Reveal
      gsap.fromTo(targets, 
        { 
          opacity: 0, 
          y: 40,
        },
        {
          opacity: 1, 
          y: 0,
          duration: 1.2,
          ease: 'power4.out', // Silky professional ease
          stagger: 0.15, // Sequential reveal
          scrollTrigger: {
            trigger: targets,
            start: 'top 85%', // Trigger when element hits 85% of viewport height
            toggleActions: 'play none none none', // Only play once
          }
        }
      );
    };

    // Small timeout to ensure DOM is ready
    const timer = setTimeout(batchAnimation, 200);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [pathname]);
}
