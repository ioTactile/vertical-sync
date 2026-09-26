import { climbingSpotAlertService } from "@/modules/core/di/container";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const climbingSpotId = (await params).id;

  if (!climbingSpotId) {
    return NextResponse.json(
      { error: "L'id du spot est requis" },
      { status: 400 },
    );
  }

  try {
    const body = await request.json();
    const { userId, ...criteria } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "Le champ userId est requis" },
        { status: 400 },
      );
    }

    await climbingSpotAlertService.createAlert({
      climbingSpotId,
      userId,
      minTempC: criteria.minTempC ?? null,
      maxTempC: criteria.maxTempC ?? null,
      maxWindKmh: criteria.maxWindKmh ?? null,
      onlyWeekends: criteria.onlyWeekends ?? false,
      avoidRain: criteria.avoidRain ?? true,
    });

    return NextResponse.json(
      { message: "Alerte créée avec succès" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 },
    );
  }
}
