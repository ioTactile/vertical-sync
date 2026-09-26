import { NextResponse } from 'next/server';
import { talkService } from '@/modules/core/di/container';

export async function GET() {
  try {
    const talks = await talkService.getTalks();
    return NextResponse.json(talks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur interne du serveur: ' + error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await talkService.createTalk(data);

    return NextResponse.json({ message: 'Discussion créée' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur interne du serveur: ' + error }, { status: 500 });
  }
}
