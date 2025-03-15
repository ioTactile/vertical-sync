import { climbingSpotService } from "@/modules/core/service/climbing-spot.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "L'id du spot est requis" },
      { status: 400 }
    );
  }

  try {
    const comments = await climbingSpotService.getClimbingSpotComments(id);

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
