import { climbingSpotService } from "@/modules/core/service/climbing-spot.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    await climbingSpotService.createClimbingSpotComment(body);

    return NextResponse.json(
      { message: "Commentaire créé avec succès" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
