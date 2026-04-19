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
      
      // Safety Hide: Set initial hidden state just before animation starts
      // If JS fails, CSS keeps them visible. If JS runs, this hides them instantly for reveal.
      gsap.set(targets, { opacity: 0, y: 40 });

      // Premium "Professional Glide" Reveal
      gsap.to(targets, 
        {
          opacity: 1, 
          y: 0,
          duration: 1.2,
          ease: 'power4.out', 
          stagger: 0.15, 
          scrollTrigger: {
            trigger: targets,
            start: 'top 85%', 
            toggleActions: 'play none none none', 
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
