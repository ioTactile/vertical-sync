import { NextResponse } from 'next/server';
import { talkService } from '@/modules/core/di/container';

export async function DELETE(request: Request) {
  try {
    const { talkId, talkCommentId } = await request.json();

    await talkService.deleteTalkComment(talkId, talkCommentId);

    return NextResponse.json({ message: 'Commentaire supprimé' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur interne du serveur: ' + error }, { status: 500 });
  }
}
