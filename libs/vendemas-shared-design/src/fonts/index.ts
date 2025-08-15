// Font Configuration for Vendemás Design System
// Inter (body) and Montserrat (display) font loading and configuration

// Google Fonts URLs
export const FONT_URLS = {
  inter:
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  montserrat:
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
} as const;

// Font loading utility
export const loadFonts = (): void => {
  // Check if fonts are already loaded
  if (typeof document === 'undefined') return;

  const existingLinks = document.querySelectorAll(
    'link[href*="fonts.googleapis.com"]'
  );
  const loadedFonts = Array.from(existingLinks).map(link =>
    link.getAttribute('href')
  );

  // Load Inter font
  if (!loadedFonts.includes(FONT_URLS.inter)) {
    const interLink = document.createElement('link');
    interLink.rel = 'stylesheet';
    interLink.href = FONT_URLS.inter;
    interLink.crossOrigin = 'anonymous';
    document.head.appendChild(interLink);
  }

  // Load Montserrat font
  if (!loadedFonts.includes(FONT_URLS.montserrat)) {
    const montserratLink = document.createElement('link');
    montserratLink.rel = 'stylesheet';
    montserratLink.href = FONT_URLS.montserrat;
    montserratLink.crossOrigin = 'anonymous';
    document.head.appendChild(montserratLink);
  }
};

// Font preload utility for performance
export const preloadFonts = (): void => {
  if (typeof document === 'undefined') return;

  // Preload Inter font
  const interPreload = document.createElement('link');
  interPreload.rel = 'preload';
  interPreload.as = 'style';
  interPreload.href = FONT_URLS.inter;
  interPreload.crossOrigin = 'anonymous';
  document.head.appendChild(interPreload);

  // Preload Montserrat font
  const montserratPreload = document.createElement('link');
  montserratPreload.rel = 'preload';
  montserratPreload.as = 'style';
  montserratPreload.href = FONT_URLS.montserrat;
  montserratPreload.crossOrigin = 'anonymous';
  document.head.appendChild(montserratPreload);
};

// Font display CSS for better performance
export const fontDisplayCSS = `
  /* Font display optimization */
  @font-face {
    font-family: 'Inter';
    font-display: swap;
  }
  
  @font-face {
    font-family: 'Montserrat';
    font-display: swap;
  }
  
  /* Fallback fonts */
  .font-body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
  
  .font-display {
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
`;

// Font loading status utility
export const checkFontsLoaded = (): Promise<boolean> => {
  return new Promise(resolve => {
    if (typeof document === 'undefined') {
      resolve(false);
      return;
    }

    // Check if fonts are loaded using FontFace API
    if ('fonts' in document) {
      Promise.all([
        document.fonts.load('400 1em Inter'),
        document.fonts.load('700 1em Montserrat'),
      ])
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    } else {
      // Fallback for browsers without FontFace API
      setTimeout(() => resolve(true), 1000);
    }
  });
};

// Font optimization utility
export const optimizeFonts = (): void => {
  if (typeof document === 'undefined') return;

  // Add font-display: swap to existing font links
  const fontLinks = document.querySelectorAll(
    'link[href*="fonts.googleapis.com"]'
  );
  fontLinks.forEach(link => {
    if (!link.hasAttribute('data-optimized')) {
      link.setAttribute('data-optimized', 'true');
      link.setAttribute('media', 'print');
      link.setAttribute('onload', "this.media='all'");
    }
  });
};
