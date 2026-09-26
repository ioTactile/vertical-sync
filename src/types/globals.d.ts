export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role: 'admin' | 'user' | 'redactor';
    };
  }
}

declare module '*.css';
