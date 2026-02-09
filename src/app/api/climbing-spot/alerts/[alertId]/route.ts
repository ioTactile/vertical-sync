import { climbingSpotAlertService } from "@/modules/core/service/climbing-spot-alert.service";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ alertId: string }> },
) {
  const alertId = (await params).alertId;

  if (!alertId) {
    return NextResponse.json(
      { error: "L'id de l'alerte est requis" },
      { status: 400 },
    );
  }

  try {
    const body = await request.json();

    await climbingSpotAlertService.updateAlert({
      id: alertId,
      isActive: body.isActive,
    });

    return NextResponse.json(
      { message: "Alerte mise à jour" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ alertId: string }> },
) {
  const alertId = (await params).alertId;

  if (!alertId) {
    return NextResponse.json(
      { error: "L'id de l'alerte est requis" },
      { status: 400 },
    );
  }

  try {
    await climbingSpotAlertService.deleteAlert(alertId);
    return NextResponse.json(
      { message: "Alerte supprimée" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 },
    );
  }
}
