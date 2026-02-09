export type ClimbingSpotAlert = {
  id: string;
  userId: string;
  climbingSpotId: string;
  minTempC: number | null;
  maxTempC: number | null;
  maxWindKmh: number | null;
  onlyWeekends: boolean;
  avoidRain: boolean;
  isActive: boolean;
  createdAt: Date;
};

export type GetClimbingSpotAlertResponse = ClimbingSpotAlert & {
  climbingSpot: { id: string; name: string };
};

export type GetClimbingSpotAlertsResponse = GetClimbingSpotAlertResponse[];

export type CreateClimbingSpotAlertDto = {
  climbingSpotId: string;
  userId: string;
  minTempC?: number | null;
  maxTempC?: number | null;
  maxWindKmh?: number | null;
  onlyWeekends?: boolean;
  avoidRain?: boolean;
};

export type UpdateClimbingSpotAlertDto = {
  id: string;
  isActive?: boolean;
};
