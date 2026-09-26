import { notificationService } from "@/modules/core/di/container";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;

  if (!id) {
    return NextResponse.json(
      { error: "L'id de la notification est requis" },
      { status: 400 },
    );
  }

  try {
    await notificationService.markAsRead(id);
    return NextResponse.json(
      { message: "Notification marquée comme lue" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 },
    );
  }
}
