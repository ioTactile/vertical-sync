import { articleService } from "@/modules/core/service/article.service";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const { id, published } = await request.json();

    await articleService.updateArticlePublishStatus(id, published);

    return NextResponse.json(
      {
        message: "Article mis à jour",
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
