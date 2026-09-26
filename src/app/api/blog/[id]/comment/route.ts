import { NextResponse } from "next/server";
import { articleService } from "@/modules/core/di/container";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const articleComments = await articleService.getArticleComments(id);

    return NextResponse.json(articleComments, { status: 200 });
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
    await articleService.createArticleComment(data);

    return NextResponse.json({ message: "Commentaire créé" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
