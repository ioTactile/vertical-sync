import { describe, it, expect } from "vitest";
import { findFirstGoodDay } from "@/modules/core/service/alert-evaluation.service";
import type {
  WeatherConditionCode,
  WeatherData,
  WeatherForecastEntry,
} from "@/modules/core/model/Weather";

function makeWeather(nextDays: WeatherForecastEntry[]): WeatherData {
  return {
    current: {
      at: new Date(),
      temperatureC: 15,
      feelsLikeC: 14,
      windSpeedKmh: 10,
      humidity: 50,
      condition: "CLEAR",
      precipitationMm: 0,
    },
    nextHours: [],
    nextDays,
  };
}

function makeEntry(
  at: Date,
  temperatureC: number,
  windSpeedKmh: number,
  condition: string,
  precipitationMm = 0,
): WeatherForecastEntry {
  return {
    at,
    temperatureC,
    feelsLikeC: temperatureC,
    windSpeedKmh,
    humidity: 50,
    condition: condition as WeatherConditionCode,
    precipitationMm,
    isDaytime: true,
  };
}

describe("alert-evaluation.service", () => {
  describe("findFirstGoodDay", () => {
    it("devrait retourner null si pas de nextDays", () => {
      const weather = makeWeather([]);
      const result = findFirstGoodDay(
        { minTempC: 10, maxTempC: 30, maxWindKmh: 50, onlyWeekends: false, avoidRain: true },
        weather,
      );
      expect(result).toBeNull();
    });

    it("devrait retourner le premier jour qui respecte temp min/max et vent", () => {
      const d1 = new Date("2025-02-10T12:00:00Z");
      const d2 = new Date("2025-02-11T12:00:00Z");
      const weather = makeWeather([
        makeEntry(d1, 5, 10, "CLEAR"), // trop froid (min 10)
        makeEntry(d2, 18, 15, "CLEAR"), // ok
      ]);
      const result = findFirstGoodDay(
        { minTempC: 10, maxTempC: 25, maxWindKmh: 20, onlyWeekends: false, avoidRain: false },
        weather,
      );
      expect(result).not.toBeNull();
      expect(result!.date.toISOString().slice(0, 10)).toBe("2025-02-11");
      expect(result!.entry.temperatureC).toBe(18);
    });

    it("devrait ignorer un jour avec pluie si avoidRain", () => {
      const d1 = new Date("2025-02-10T12:00:00Z");
      const d2 = new Date("2025-02-11T12:00:00Z");
      const weather = makeWeather([
        makeEntry(d1, 18, 10, "RAIN", 2),
        makeEntry(d2, 18, 10, "CLEAR", 0),
      ]);
      const result = findFirstGoodDay(
        { minTempC: null, maxTempC: null, maxWindKmh: null, onlyWeekends: false, avoidRain: true },
        weather,
      );
      expect(result).not.toBeNull();
      expect(result!.date.toISOString().slice(0, 10)).toBe("2025-02-11");
    });

    it("devrait filtrer par week-end si onlyWeekends", () => {
      // 2025-02-10 = lundi, 2025-02-15 = samedi
      const monday = new Date("2025-02-10T12:00:00Z");
      const saturday = new Date("2025-02-15T12:00:00Z");
      const weather = makeWeather([
        makeEntry(monday, 18, 10, "CLEAR"),
        makeEntry(saturday, 18, 10, "CLEAR"),
      ]);
      const result = findFirstGoodDay(
        { minTempC: null, maxTempC: null, maxWindKmh: null, onlyWeekends: true, avoidRain: false },
        weather,
      );
      expect(result).not.toBeNull();
      expect(result!.date.toISOString().slice(0, 10)).toBe("2025-02-15");
    });

    it("devrait retourner null si aucun jour ne convient", () => {
      const d1 = new Date("2025-02-10T12:00:00Z");
      const weather = makeWeather([
        makeEntry(d1, 35, 10, "CLEAR"), // trop chaud
      ]);
      const result = findFirstGoodDay(
        { minTempC: 10, maxTempC: 25, maxWindKmh: 50, onlyWeekends: false, avoidRain: false },
        weather,
      );
      expect(result).toBeNull();
    });
  });
});
