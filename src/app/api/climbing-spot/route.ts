import { climbingSpotService } from "@/modules/core/service/climbing-spot.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const climbingSpots = await climbingSpotService.getClimbingSpots();
    return NextResponse.json(climbingSpots, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await climbingSpotService.createClimbingSpot(data);

    return NextResponse.json({ message: "Spot créé" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
