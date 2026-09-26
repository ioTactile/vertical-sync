import { notificationService } from "@/modules/core/di/container";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "Le paramètre userId est requis" },
      { status: 400 },
    );
  }

  try {
    const notifications = await notificationService.getByUserId(userId);
    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 },
    );
  }
}
