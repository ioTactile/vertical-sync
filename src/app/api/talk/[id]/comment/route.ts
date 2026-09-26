import { NextResponse } from "next/server";
import { talkService } from "@/modules/core/di/container";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const talkComments = await talkService.getTalkComments(id);

    return NextResponse.json(talkComments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await talkService.createTalkComment(data);

    return NextResponse.json(
      { message: "Réponse au commentaire créée" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
