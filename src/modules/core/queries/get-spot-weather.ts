import { WeatherData } from '@/modules/core/model/Weather';
import { weatherGateway } from '@/modules/core/gateway-infra/api.weather-gateway';

type GetSpotWeatherParams = {
  latitude: number;
  longitude: number;
};

const getSpotWeather = async ({
  latitude,
  longitude,
}: GetSpotWeatherParams): Promise<WeatherData> => {
  return await weatherGateway.getWeatherByCoords(latitude, longitude);
};

export default getSpotWeather;
