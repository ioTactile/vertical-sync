import { NextResponse } from "next/server";
import { tagService } from "@/modules/core/service/tag.service";

export async function GET() {
  try {
    const tags = await tagService.getTags();

    return NextResponse.json(tags, { status: 200 });
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
    const tag = await tagService.createTag(data);

    return NextResponse.json({ message: "Tag créé", tag }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
