import * as React from 'react';

declare global {
  interface Window {
    google: typeof google;
  }
}

export const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = React.useState(
    () => typeof window !== 'undefined' && !!window.google,
  );
  const [error, setError] = React.useState<Error | null>(() => {
    if (typeof window === 'undefined') return null;
    if (window.google) return null;
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      return new Error('Google Maps API key is missing');
    }
    return null;
  });

  React.useEffect(() => {
    if (typeof window === 'undefined' || window.google) return;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.addEventListener('load', () => {
      setIsLoaded(true);
    });

    script.addEventListener('error', () => {
      setError(new Error('Failed to load Google Maps script'));
    });

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return { isLoaded, error };
};
