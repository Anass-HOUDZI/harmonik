
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // Ne pas scroller si on a un hash (ancre)
    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Scroll immédiat pour un meilleur UX
      });
    }
  }, [pathname, search, hash]);

  return null;
}
