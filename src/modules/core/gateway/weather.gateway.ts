import { WeatherData } from "@/modules/core/model/Weather";

export interface IWeatherGateway {
  getWeatherByCoords(lat: number, lng: number): Promise<WeatherData>;
}

