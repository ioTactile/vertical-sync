export interface ClimbingSpot {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type: "BOULDER" | "LEAD" | "INDOOR";
  difficulty: string;
  description: string;
}
