export const MOTION = {
  easeOut: [0.16, 1, 0.3, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
  duration: {
    fast: 0.18,
    base: 0.24,
    slow: 0.45,
  },
  offset: {
    sm: 8,
    md: 12,
    lg: 16,
  },
  stagger: {
    base: 0.06,
    tight: 0.045,
    loose: 0.075,
  },
} as const;
