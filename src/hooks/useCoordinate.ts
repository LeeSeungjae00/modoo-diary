import { useState, useEffect } from "react";

interface locationType {
  loaded: boolean;
  coordinates?: { lx: number; ly: number };
  error?: { code: number; message: string };
}

const useCoordinate = () => {
  const [location, setLocation] = useState<locationType>({
    loaded: false,
    coordinates: { lx: 0, ly: 0 },
  });

  const onSuccess = (location: {
    coords: { latitude: number; longitude: number };
  }) => {
    setLocation({
      loaded: true,
      coordinates: {
        lx: location.coords.latitude, //위도
        ly: location.coords.longitude, //경도
      },
    });
  };

  const onError = (error: { code: number; message: string }) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};

export default useCoordinate;
