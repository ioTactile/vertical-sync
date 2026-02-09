import { evaluateAlertsForAllUsers } from "@/modules/core/service/alert-evaluation.service";
import { NextRequest, NextResponse } from "next/server";

/**
 * Vérifie le secret cron (Vercel envoie Authorization: Bearer CRON_SECRET).
 */
function checkCronSecret(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  const authHeader = request.headers.get("authorization");
  const bearer = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;
  const headerSecret = request.headers.get("x-cron-secret");
  const provided = bearer ?? headerSecret;
  return provided === secret;
}

async function runEvaluation() {
  const result = await evaluateAlertsForAllUsers();
  return NextResponse.json(
    {
      message: "Évaluation terminée",
      notificationsCreated: result.notificationsCreated,
      errors: result.errors,
    },
    { status: 200 },
  );
}

/**
 * Job à appeler par un cron (1 à 2 fois par jour).
 * GET : utilisé par Vercel Cron. POST : pour appels manuels (curl).
 */
export async function GET(request: NextRequest) {
  if (!checkCronSecret(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    return await runEvaluation();
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erreur lors de l'évaluation des alertes",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  if (!checkCronSecret(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    return await runEvaluation();
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erreur lors de l'évaluation des alertes",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
