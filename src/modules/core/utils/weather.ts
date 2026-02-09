import type { WeatherConditionCode } from "@/modules/core/model/Weather";

export const WEATHER_CONDITION_LABELS_FR: Record<WeatherConditionCode, string> = {
  CLEAR: "Ciel dégagé",
  FEW_CLOUDS: "Peu nuageux",
  CLOUDS: "Nuageux",
  RAIN: "Pluie",
  THUNDERSTORM: "Orage",
  SNOW: "Neige",
  MIST: "Brouillard",
};

/**
 * Traduit un code condition météo en libellé français.
 */
export function getWeatherConditionLabelFr(
  condition: WeatherConditionCode,
): string {
  return WEATHER_CONDITION_LABELS_FR[condition] ?? condition;
}
