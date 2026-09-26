import { NextResponse } from 'next/server';
import { articleService } from '@/modules/core/di/container';
import { toErrorResponse } from '@/modules/core/http/to-error-response';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const identifier = (await params).id;
  const withRelations = request.url.includes('withRelations=true');

  try {
    const article = await articleService.getArticleByIdentifier(identifier, withRelations);

    if (!article) {
      return NextResponse.json({ error: 'Article non trouvé' }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    await articleService.updateArticle(data);

    return NextResponse.json(
      {
        message: 'Article mis à jour',
      },
      { status: 200 },
    );
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await articleService.deleteArticle(id);

    return NextResponse.json({ message: 'Article supprimé' }, { status: 200 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
