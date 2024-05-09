import { useEffect, useState } from "react";

function getPosition() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => resolve(position),
        (error: GeolocationPositionError) => reject(error)
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}

function useGeoLocation() {
  const [location, setLocation] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getLocation() {
      setIsLoading(true);

      try {
        const position = await getPosition();

        const { latitude, longitude } = position.coords;

        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        if (res.ok) {
          const location = await res.json();
          setLocation(location);
          setIsLoading(false);
        }
      } catch (err) {
        setError("Error fetching the current location");
      } finally {
        setIsLoading(false);
      }
    }
    getLocation();
  }, []);

  return { location, isLoading, error };
}

export default useGeoLocation;
