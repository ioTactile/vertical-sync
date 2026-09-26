import { NextResponse } from "next/server";
import { tagService } from "@/modules/core/di/container";
import { toErrorResponse } from "@/modules/core/http/to-error-response";

export async function GET() {
  try {
    const tags = await tagService.getTags();
    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await tagService.createTag(data);
    return NextResponse.json({ message: "Tag créé" }, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
