import { NextResponse } from "next/server";
import { articleService } from "@/modules/core/di/container";

export async function GET() {
  try {
    const articles = await articleService.getAdminArticles();

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
