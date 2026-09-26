import {
  WeatherConditionCode,
  WeatherData,
  WeatherForecastEntry,
  WeatherSnapshot,
} from "@/modules/core/model/Weather";

export interface IWeatherRepository {
  getByCoords(lat: number, lng: number): Promise<WeatherData>;
}

/**
 * Map Open-Meteo WMO weather codes to our WeatherConditionCode.
 * @see https://open-meteo.com/en/docs#api-documentation (WMO codes table)
 */
function wmoCodeToCondition(wmo: number): WeatherConditionCode {
  if (wmo === 0) return "CLEAR";
  if (wmo === 1 || wmo === 2) return "FEW_CLOUDS";
  if (wmo === 3) return "CLOUDS";
  if (wmo === 45 || wmo === 48) return "MIST";
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(wmo))
    return "RAIN";
  if ([71, 73, 75, 77, 85, 86].includes(wmo)) return "SNOW";
  if ([95, 96, 99].includes(wmo)) return "THUNDERSTORM";
  return "CLEAR";
}

const OPEN_METEO_BASE = "https://api.open-meteo.com/v1/forecast";

type OpenMeteoResponse = {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_gusts_10m?: number;
  };
  hourly?: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    apparent_temperature: number[];
    precipitation: number[];
    weather_code: number[];
    wind_speed_10m: number[];
    is_day: number[];
  };
  daily?: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    wind_speed_10m_max: number[];
  };
};

export class OpenMeteoRepository implements IWeatherRepository {
  async getByCoords(lat: number, lng: number): Promise<WeatherData> {
    const url = new URL(OPEN_METEO_BASE);
    url.searchParams.set("latitude", lat.toString());
    url.searchParams.set("longitude", lng.toString());
    url.searchParams.set("timezone", "auto");
    url.searchParams.set("temperature_unit", "celsius");
    url.searchParams.set("wind_speed_unit", "kmh");
    url.searchParams.set("precipitation_unit", "mm");
    url.searchParams.set(
      "current",
      "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_gusts_10m",
    );
    url.searchParams.set(
      "daily",
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max",
    );
    url.searchParams.set(
      "hourly",
      "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,is_day",
    );
    url.searchParams.set("forecast_days", "7");

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(
        `Erreur lors de l'appel à l'API météo Open-Meteo: ${response.statusText}`,
      );
    }

    const data = (await response.json()) as OpenMeteoResponse;

    const current: WeatherSnapshot = {
      at: new Date(data.current.time),
      temperatureC: data.current.temperature_2m,
      feelsLikeC: data.current.apparent_temperature,
      windSpeedKmh: data.current.wind_speed_10m,
      humidity: data.current.relative_humidity_2m,
      condition: wmoCodeToCondition(data.current.weather_code),
      precipitationMm:
        data.current.precipitation > 0 ? data.current.precipitation : undefined,
    };

    const nextHours: WeatherForecastEntry[] = [];
    if (data.hourly?.time?.length) {
      const limit = Math.min(24, data.hourly.time.length);
      for (let i = 0; i < limit; i++) {
        nextHours.push({
          at: new Date(data.hourly.time[i]),
          temperatureC: data.hourly.temperature_2m[i],
          feelsLikeC: data.hourly.apparent_temperature[i],
          windSpeedKmh: data.hourly.wind_speed_10m[i],
          humidity: data.hourly.relative_humidity_2m[i],
          condition: wmoCodeToCondition(data.hourly.weather_code[i]),
          precipitationMm:
            data.hourly.precipitation[i] > 0
              ? data.hourly.precipitation[i]
              : undefined,
          isDaytime: data.hourly.is_day[i] === 1,
        });
      }
    }

    const nextDays: WeatherForecastEntry[] = [];
    if (data.daily?.time?.length) {
      for (let i = 0; i < data.daily.time.length; i++) {
        const dayNoon = new Date(data.daily.time[i]);
        dayNoon.setHours(12, 0, 0, 0);
        const tempMax = data.daily.temperature_2m_max[i];
        const tempMin = data.daily.temperature_2m_min[i];
        nextDays.push({
          at: dayNoon,
          temperatureC: tempMax,
          feelsLikeC: (tempMax + tempMin) / 2,
          windSpeedKmh: data.daily.wind_speed_10m_max[i],
          humidity: 0,
          condition: wmoCodeToCondition(data.daily.weather_code[i]),
          precipitationMm:
            data.daily.precipitation_sum[i] > 0
              ? data.daily.precipitation_sum[i]
              : undefined,
          isDaytime: true,
        });
      }
    }

    return {
      current,
      nextHours,
      nextDays,
    };
  }
}

