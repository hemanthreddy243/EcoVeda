import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.75rem',
};

const center = {
  lat: 17.385044, // Center between Bangalore and Hyderabad
  lng: 78.486671,
};

const bangalore = { lat: 12.9716, lng: 77.5946 };
const hyderabad = { lat: 17.385044, lng: 78.486671 };

export default function CustomGoogleMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  const [userLocation, setUserLocation] = useState<null | { lat: number; lng: number }>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setUserLocation(null);
        }
      );
    }
  }, []);

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-[400px]">Loading map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6}
      options={{
        disableDefaultUI: false,
        clickableIcons: true,
      }}
    >
      <Marker position={bangalore} label="Bangalore" />
      <Marker position={hyderabad} label="Hyderabad" />
      {userLocation && <Marker position={userLocation} label="You" icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }} />}
    </GoogleMap>
  );
} 