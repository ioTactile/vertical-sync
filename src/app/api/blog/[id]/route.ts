import { NextResponse } from "next/server";
import { articleService } from "@/modules/core/service/article.service";
import {
  GetArticleResponse,
  GetArticleWithRelationsResponse,
} from "@/modules/core/model/Article";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const identifier = (await params).id;
  const withRelations = request.url.includes("withRelations=true");

  try {
    let article: GetArticleResponse | GetArticleWithRelationsResponse | null =
      null;

    // Vérifie si l'identifiant est un CUID
    if (/^c[a-z0-9]{24,27}$/i.test(identifier)) {
      article = await articleService.getArticleById(identifier, withRelations);
    }

    // Vérifie si l'identifiant est un slug (ex:article-sur-l'escalade-1739205155676)
    if (!/^c[a-z0-9]{24,27}$/i.test(identifier)) {
      article = await articleService.getArticleBySlug(
        identifier,
        withRelations
      );
    }

    if (!article) {
      return NextResponse.json(
        { error: "Article non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    await articleService.updateArticle(data);

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

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await articleService.deleteArticle(id);

    return NextResponse.json({ message: "Article supprimé" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
