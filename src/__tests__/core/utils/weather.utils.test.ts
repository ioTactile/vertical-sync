import { describe, it, expect } from "vitest";
import { getWeatherConditionLabelFr } from "@/modules/core/utils/weather";

describe("weather utils", () => {
  it("devrait retourner le libellé français pour CLEAR", () => {
    expect(getWeatherConditionLabelFr("CLEAR")).toBe("Ciel dégagé");
  });

  it("devrait retourner le libellé français pour RAIN", () => {
    expect(getWeatherConditionLabelFr("RAIN")).toBe("Pluie");
  });

  it("devrait retourner le libellé français pour THUNDERSTORM", () => {
    expect(getWeatherConditionLabelFr("THUNDERSTORM")).toBe("Orage");
  });

  it("devrait retourner le libellé pour un code inconnu (fallback)", () => {
    expect(getWeatherConditionLabelFr("UNKNOWN" as any)).toBe("UNKNOWN");
  });
});
