import { z } from "zod";

export const createClimbingSpotAlertSchema = z
  .object({
    minTempC: z
      .number()
      .min(-30, "Min -30°C")
      .max(50, "Max 50°C")
      .optional()
      .nullable(),
    maxTempC: z
      .number()
      .min(-30, "Min -30°C")
      .max(50, "Max 50°C")
      .optional()
      .nullable(),
    maxWindKmh: z
      .number()
      .min(0, "Min 0 km/h")
      .max(150, "Max 150 km/h")
      .optional()
      .nullable(),
    onlyWeekends: z.boolean().default(false),
    avoidRain: z.boolean().default(true),
  })
  .refine(
    (data) => {
      if (data.minTempC != null && data.maxTempC != null) {
        return data.minTempC <= data.maxTempC;
      }
      return true;
    },
    { message: "La temp min doit être ≤ temp max", path: ["maxTempC"] },
  );

export type CreateClimbingSpotAlertInputs = z.infer<
  typeof createClimbingSpotAlertSchema
>;
