import { NextResponse } from "next/server";
import { climbingSpotService } from "@/modules/core/di/container";

export async function GET() {
  try {
    const spots = await climbingSpotService.getAdminClimbingSpots();

    return NextResponse.json(spots, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
