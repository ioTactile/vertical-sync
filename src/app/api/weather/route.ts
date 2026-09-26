import { NextResponse } from 'next/server';
import { weatherService } from '@/modules/core/di/container';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const latParam = searchParams.get('lat');
    const lngParam = searchParams.get('lng');

    if (!latParam || !lngParam) {
      return NextResponse.json(
        { error: "Les paramètres 'lat' et 'lng' sont requis." },
        { status: 400 },
      );
    }

    const lat = parseFloat(latParam);
    const lng = parseFloat(lngParam);

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return NextResponse.json(
        { error: "Les paramètres 'lat' et 'lng' doivent être des nombres valides." },
        { status: 400 },
      );
    }

    const weather = await weatherService.getWeatherForCoords(lat, lng);

    return NextResponse.json(weather, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur interne du serveur: ' + error }, { status: 500 });
  }
}
