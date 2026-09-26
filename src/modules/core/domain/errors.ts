/**
 * Application domain errors (use-cases).
 * HTTP adapters map DomainError → status code.
 */
export class DomainError extends Error {
  constructor(
    message: string,
    readonly code: 'NOT_FOUND' | 'VALIDATION' | 'CONFLICT' | 'FORBIDDEN' = 'VALIDATION',
  ) {
    super(message);
    this.name = 'DomainError';
  }
}

export function isDomainError(error: unknown): error is DomainError {
  return error instanceof DomainError;
}
