import { reportService } from "@/modules/core/di/container";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await reportService.createReport(data);

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
