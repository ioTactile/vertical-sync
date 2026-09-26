/**
 * Erreurs métier applicatives (use-cases).
 * Les adapters HTTP mappent DomainError → status code.
 */
export class DomainError extends Error {
  constructor(
    message: string,
    readonly code:
      | "NOT_FOUND"
      | "VALIDATION"
      | "CONFLICT"
      | "FORBIDDEN" = "VALIDATION"
  ) {
    super(message);
    this.name = "DomainError";
  }
}

export function isDomainError(error: unknown): error is DomainError {
  return error instanceof DomainError;
}
