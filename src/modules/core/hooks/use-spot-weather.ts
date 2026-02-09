import { useQuery } from "@tanstack/react-query";
import getSpotWeather from "@/modules/core/queries/get-spot-weather";

type UseSpotWeatherParams = {
  latitude?: number;
  longitude?: number;
  enabled?: boolean;
};

const useSpotWeather = ({
  latitude,
  longitude,
  enabled = true,
}: UseSpotWeatherParams) => {
  const hasCoords =
    typeof latitude === "number" &&
    !Number.isNaN(latitude) &&
    typeof longitude === "number" &&
    !Number.isNaN(longitude);

  return useQuery({
    queryKey: ["spot-weather", latitude, longitude],
    enabled: enabled && hasCoords,
    queryFn: () =>
      getSpotWeather({
        latitude: latitude as number,
        longitude: longitude as number,
      }),
    staleTime: 10 * 60 * 1000,
  });
};

export default useSpotWeather;
