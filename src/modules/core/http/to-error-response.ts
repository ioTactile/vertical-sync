import { NextResponse } from "next/server";
import { isDomainError } from "@/modules/core/domain/errors";

const STATUS_BY_CODE = {
  NOT_FOUND: 404,
  VALIDATION: 400,
  CONFLICT: 409,
  FORBIDDEN: 403,
} as const;

/** Mappe DomainError → réponse HTTP ; sinon 500. */
export function toErrorResponse(error: unknown): NextResponse {
  if (isDomainError(error)) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: STATUS_BY_CODE[error.code] }
    );
  }
  return NextResponse.json(
    { error: "Erreur interne du serveur: " + error },
    { status: 500 }
  );
}
