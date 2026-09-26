import { WeatherData } from '@/modules/core/model/Weather';
import { IWeatherRepository } from '@/modules/core/repository/weather.repository';

export class WeatherService {
  constructor(private readonly repository: IWeatherRepository) {}

  async getWeatherForCoords(lat: number, lng: number): Promise<WeatherData> {
    return this.repository.getByCoords(lat, lng);
  }
}
