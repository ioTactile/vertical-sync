import { describe, it, expect, vi } from "vitest";
import {
  getFormatedDate,
  getTimeBetweenDateAndNow,
} from "@/modules/core/utils/date";

describe("date utils", () => {
  it("getFormatedDate doit retourner une date localisée", () => {
    const date = new Date("2024-01-15T00:00:00Z");
    const result = getFormatedDate(date);

    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("getTimeBetweenDateAndNow doit retourner une chaîne lisible", () => {
    vi.useFakeTimers();

    const now = new Date("2024-01-01T00:00:00Z");
    vi.setSystemTime(now);

    const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
    const result = getTimeBetweenDateAndNow(tenMinutesAgo);

    expect(result).toContain("minute");

    vi.useRealTimers();
  });
});

