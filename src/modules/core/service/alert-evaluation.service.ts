import type { WeatherData, WeatherForecastEntry } from "@/modules/core/model/Weather";
import { climbingSpotAlertRepository } from "@/modules/core/repository/climbing-spot-alert.repository";
import { climbingSpotRepository } from "@/modules/core/repository/climbing-spot.repository";
import { notificationService } from "@/modules/core/service/notification.service";
import { weatherService } from "@/modules/core/service/weather.service";

const RAIN_CONDITIONS = ["RAIN", "THUNDERSTORM"] as const;
const PRECIPITATION_THRESHOLD_MM = 0.5;

function toDateOnly(d: Date): Date {
  const copy = new Date(d);
  copy.setUTCHours(0, 0, 0, 0);
  return copy;
}

function isWeekend(d: Date): boolean {
  const day = d.getUTCDay();
  return day === 0 || day === 6;
}

/**
 * Retourne le premier jour des prévisions qui respecte les critères de l'alerte.
 */
export function findFirstGoodDay(
  alert: {
    minTempC: number | null;
    maxTempC: number | null;
    maxWindKmh: number | null;
    onlyWeekends: boolean;
    avoidRain: boolean;
  },
  weather: WeatherData,
): { date: Date; entry: WeatherForecastEntry } | null {
  const days = weather.nextDays;
  if (!days?.length) return null;

  for (const entry of days) {
    const dayDate = toDateOnly(entry.at);

    if (alert.onlyWeekends && !isWeekend(dayDate)) continue;

    if (alert.minTempC != null && entry.temperatureC < alert.minTempC)
      continue;
    if (alert.maxTempC != null && entry.temperatureC > alert.maxTempC)
      continue;
    if (
      alert.maxWindKmh != null &&
      entry.windSpeedKmh > alert.maxWindKmh
    )
      continue;
    if (alert.avoidRain) {
      const precip = entry.precipitationMm ?? 0;
      if (precip > PRECIPITATION_THRESHOLD_MM) continue;
      if (RAIN_CONDITIONS.includes(entry.condition as (typeof RAIN_CONDITIONS)[number]))
        continue;
    }

    return { date: dayDate, entry };
  }
  return null;
}

export async function evaluateAlertsForAllUsers(): Promise<{
  notificationsCreated: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let notificationsCreated = 0;

  const alerts = await climbingSpotAlertRepository.findAllActive();
  const bySpot = new Map<string, typeof alerts>();
  for (const a of alerts) {
    const list = bySpot.get(a.climbingSpotId) ?? [];
    list.push(a);
    bySpot.set(a.climbingSpotId, list);
  }

  for (const [climbingSpotId, spotAlerts] of bySpot) {
    let spot: { id: string; name: string; latitude: number; longitude: number } | null = null;
    let weather: WeatherData | null = null;

    try {
      const row = await climbingSpotRepository.findById(climbingSpotId) as unknown as { latitude?: number; longitude?: number; name?: string };
      const lat = row?.latitude;
      const lng = row?.longitude;
      if (lat == null || lng == null) {
        errors.push(`Spot ${climbingSpotId}: coords manquantes`);
        continue;
      }
      spot = {
        id: climbingSpotId,
        name: row?.name ?? "Spot",
        latitude: lat,
        longitude: lng,
      };
      weather = await weatherService.getWeatherForCoords(lat, lng);
    } catch (e) {
      errors.push(
        `Spot ${climbingSpotId}: ${e instanceof Error ? e.message : String(e)}`,
      );
      continue;
    }

    const spotName = spot?.name ?? "Ce spot";
    if (!weather) continue;
    for (const alert of spotAlerts) {
      try {
        const match = findFirstGoodDay(alert, weather);
        if (!match) continue;

        const already = await notificationService.alreadyNotified(
          alert.userId,
          climbingSpotId,
          match.date,
        );
        if (already) continue;

        await notificationService.create({
          userId: alert.userId,
          climbingSpotId,
          title: "Bon jour pour grimper",
          message: `Les conditions sont favorables à ${spotName} pour le ${match.date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}.`,
          goodDayDate: match.date,
        });
        notificationsCreated++;
      } catch (e) {
        errors.push(
          `Alert ${alert.id}: ${e instanceof Error ? e.message : String(e)}`,
        );
      }
    }
  }

  return { notificationsCreated, errors };
}
