import { climbingSpotConditionService } from "@/modules/core/service/climbing-spot-condition.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;

  if (!id) {
    return NextResponse.json(
      { error: "L'id du spot est requis" },
      { status: 400 },
    );
  }

  try {
    const conditions =
      await climbingSpotConditionService.getConditions(id);

    return NextResponse.json(conditions, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    await climbingSpotConditionService.createReport(body);

    return NextResponse.json(
      { message: "Conditions signalées avec succès" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 },
    );
  }
}
