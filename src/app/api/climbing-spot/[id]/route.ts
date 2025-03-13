import { climbingSpotService } from "@/modules/core/service/climbing-spot.service";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    await climbingSpotService.updateClimbingSpot(data);

    return NextResponse.json(
      {
        message: "Spot mis à jour",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await climbingSpotService.deleteClimbingSpot(id);

    return NextResponse.json({ message: "Spot supprimé" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
