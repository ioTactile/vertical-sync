import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractCoords(coords: string) {
  // coords "POINT(-0.5777859 44.8630197)"
  const [longitude, latitude] = coords
    .replace("POINT(", "")
    .replace(")", "")
    .split(" ")
    .map(Number);
  return { longitude, latitude };
}
