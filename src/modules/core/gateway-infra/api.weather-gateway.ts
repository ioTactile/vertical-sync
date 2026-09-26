import { IWeatherGateway } from '@/modules/core/gateway/weather.gateway';
import { WeatherData } from '@/modules/core/model/Weather';
import { axiosInstance } from '@/lib/globals';

export class ApiWeatherGateway implements IWeatherGateway {
  async getWeatherByCoords(lat: number, lng: number): Promise<WeatherData> {
    const response = await axiosInstance.get<WeatherData>('/api/weather', {
      params: {
        lat,
        lng,
      },
    });

    return response.data;
  }
}

export const weatherGateway = new ApiWeatherGateway();
