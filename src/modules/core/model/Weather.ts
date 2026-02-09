export type WeatherConditionCode =
  | "CLEAR"
  | "FEW_CLOUDS"
  | "CLOUDS"
  | "RAIN"
  | "THUNDERSTORM"
  | "SNOW"
  | "MIST";

export type WeatherSnapshot = {
  at: Date;
  temperatureC: number;
  feelsLikeC: number;
  windSpeedKmh: number;
  humidity: number;
  condition: WeatherConditionCode;
  precipitationMm?: number;
};

export type WeatherForecastEntry = WeatherSnapshot & {
  isDaytime: boolean;
};

export type WeatherData = {
  current: WeatherSnapshot;
  nextHours: WeatherForecastEntry[];
  nextDays: WeatherForecastEntry[];
};

