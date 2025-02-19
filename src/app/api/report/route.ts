import { reportService } from "@/modules/core/service/report.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { entityType, entityId, reason, reporterId } = await request.json();

    await reportService.createReport({
      entityType,
      entityId,
      reason,
      reporterId,
    });

    return NextResponse.json(
      { message: "Signalement envoyé" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
