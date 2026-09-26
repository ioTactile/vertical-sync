import * as React from 'react';

interface UseGeolocationReturn {
  userLocation: [number, number] | null;
  isLoadingLocation: boolean;
}

const useGeolocation = (): UseGeolocationReturn => {
  const [userLocation, setUserLocation] = React.useState<[number, number] | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = React.useState(
    () => typeof navigator !== 'undefined' && !!navigator.geolocation,
  );

  React.useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error('Erreur de géolocalisation:', error);
        setIsLoadingLocation(false);
      },
    );
  }, []);

  return { userLocation, isLoadingLocation };
};

export default useGeolocation;
