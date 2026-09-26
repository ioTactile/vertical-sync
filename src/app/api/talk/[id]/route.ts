import { NextResponse } from 'next/server';
import { talkService } from '@/modules/core/di/container';

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  const id = (await params).id;
  const includeComments = request.url.includes('includeComments=true');

  try {
    const talk = await talkService.getTalkById(id, includeComments);

    return NextResponse.json(talk, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur interne du serveur: ' + error }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    await talkService.updateTalk(data);

    return NextResponse.json({ message: 'Discussion mise à jour' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur interne du serveur: ' + error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await talkService.deleteTalk(id);

    return NextResponse.json({ message: 'Discussion supprimée' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur interne du serveur: ' + error }, { status: 500 });
  }
}
