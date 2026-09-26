import { DEFAULT_LOCATION, DEFAULT_RADIUS } from '@/app/_constants/app';
import { climbingSpotService } from '@/modules/core/di/container';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const radius = parseInt(searchParams.get('radius') as string) ?? DEFAULT_RADIUS;
    const coords = JSON.parse(searchParams.get('coords') as string) ?? DEFAULT_LOCATION;
    const searchQuery = searchParams.get('search') as string;

    if (radius && coords) {
      const climbingSpots = await climbingSpotService.getClimbingSpotsByRadiusAndCoords(
        radius,
        coords,
      );
      return NextResponse.json(climbingSpots, { status: 200 });
    }

    if (searchQuery) {
      const climbingSpots = await climbingSpotService.getClimbingSpotsSearch(searchQuery);
      return NextResponse.json(climbingSpots, { status: 200 });
    }

    const climbingSpots = await climbingSpotService.getPublicClimbingSpots();
    return NextResponse.json(climbingSpots, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur interne du serveur: ' + error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await climbingSpotService.createClimbingSpot(data);

    return NextResponse.json({ message: 'Spot créé' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur interne du serveur: ' + error }, { status: 500 });
  }
}
