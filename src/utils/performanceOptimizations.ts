// Performance optimizations pour l'application

// Code splitting automatique
export const enableCodeSplitting = () => {
  // Preload des routes critiques
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      import('../pages/tools/BudgetCalculator');
      import('../pages/tools/FamilyCalendar');
      import('../pages/tools/ChoresManager');
    });
  }
};

// Préchargement intelligent des ressources
export const preloadCriticalResources = () => {
  const criticalImages = [
    '/harmonik-logo.svg',
    '/favicon.svg'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Optimisation du DOM
export const optimizeDOM = () => {
  // Suppression des nodes invisibles
  const hiddenElements = document.querySelectorAll('[style*="display: none"]');
  hiddenElements.forEach(el => {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  });
};

// Nettoyage des listeners
export const cleanupEventListeners = () => {
  const throttledEvents = ['scroll', 'resize', 'mousemove'];
  
  throttledEvents.forEach(eventType => {
    const existingListeners = document.querySelectorAll(`[data-throttled-${eventType}]`);
    existingListeners.forEach(el => {
      el.removeAttribute(`data-throttled-${eventType}`);
    });
  });
};

// Optimisation des images
export const optimizeImages = () => {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // Lazy loading natif
    if (!img.getAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Compression si nécessaire
    if (img.naturalWidth > 1920) {
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
    }
  });
};

// Service Worker pour le cache
export const enableServiceWorkerCache = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered:', registration);
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  }
};

// Performance monitoring
export const initPerformanceMonitoring = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
      
      if (import.meta.env.DEV) {
        console.log(`Page load time: ${loadTime}ms`);
        console.log(`DOM content loaded: ${perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart}ms`);
      }
    });
  }
};

// Initialisation de toutes les optimisations
export const initAllOptimizations = () => {
  enableCodeSplitting();
  preloadCriticalResources();
  enableServiceWorkerCache();
  initPerformanceMonitoring();
  
  // Optimisations différées
  setTimeout(() => {
    optimizeImages();
    optimizeDOM();
  }, 1000);
};