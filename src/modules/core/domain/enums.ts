/**
 * Domain enums — independent of Prisma.
 * Prisma adapters map to these values (structurally identical).
 */

export const ClimbingSpotType = {
  ALL: 'ALL',
  OUTDOOR: 'OUTDOOR',
  INDOOR: 'INDOOR',
  OUTDOOR_BOULDER: 'OUTDOOR_BOULDER',
  OUTDOOR_LEAD: 'OUTDOOR_LEAD',
  INDOOR_BOULDER: 'INDOOR_BOULDER',
  INDOOR_LEAD: 'INDOOR_LEAD',
  INDOOR_SPEED: 'INDOOR_SPEED',
  PSICOBLOC: 'PSICOBLOC',
} as const;
export type ClimbingSpotType = (typeof ClimbingSpotType)[keyof typeof ClimbingSpotType];
export const CLIMBING_SPOT_TYPE_VALUES = Object.values(ClimbingSpotType) as [
  ClimbingSpotType,
  ...ClimbingSpotType[],
];

export const ClimbingSpotDifficulty = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
  EXPERT: 'EXPERT',
  ELITE: 'ELITE',
  GRADE_4A: 'GRADE_4A',
  GRADE_4B: 'GRADE_4B',
  GRADE_4C: 'GRADE_4C',
  GRADE_5A: 'GRADE_5A',
  GRADE_5B: 'GRADE_5B',
  GRADE_5C: 'GRADE_5C',
  GRADE_6A: 'GRADE_6A',
  GRADE_6B: 'GRADE_6B',
  GRADE_6C: 'GRADE_6C',
  GRADE_7A: 'GRADE_7A',
  GRADE_7B: 'GRADE_7B',
  GRADE_7C: 'GRADE_7C',
  GRADE_8A: 'GRADE_8A',
  GRADE_8B: 'GRADE_8B',
  GRADE_8C: 'GRADE_8C',
  GRADE_9A: 'GRADE_9A',
  GRADE_9A_PLUS: 'GRADE_9A_PLUS',
  GRADE_9B: 'GRADE_9B',
  GRADE_9B_PLUS: 'GRADE_9B_PLUS',
} as const;
export type ClimbingSpotDifficulty =
  (typeof ClimbingSpotDifficulty)[keyof typeof ClimbingSpotDifficulty];
export const CLIMBING_SPOT_DIFFICULTY_VALUES = Object.values(ClimbingSpotDifficulty) as [
  ClimbingSpotDifficulty,
  ...ClimbingSpotDifficulty[],
];

export const ClimbingSpotStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;
export type ClimbingSpotStatus = (typeof ClimbingSpotStatus)[keyof typeof ClimbingSpotStatus];
export const CLIMBING_SPOT_STATUS_VALUES = Object.values(ClimbingSpotStatus) as [
  ClimbingSpotStatus,
  ...ClimbingSpotStatus[],
];

export const ReportStatus = {
  PENDING: 'PENDING',
  RESOLVED: 'RESOLVED',
  REJECTED: 'REJECTED',
} as const;
export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus];
export const REPORT_STATUS_VALUES = Object.values(ReportStatus) as [
  ReportStatus,
  ...ReportStatus[],
];

export const ReportEntityType = {
  TALK: 'TALK',
  TALK_COMMENT: 'TALK_COMMENT',
  ARTICLE: 'ARTICLE',
  ARTICLE_COMMENT: 'ARTICLE_COMMENT',
  CLIMBING_SPOT: 'CLIMBING_SPOT',
  CLIMBING_SPOT_COMMENT: 'CLIMBING_SPOT_COMMENT',
} as const;
export type ReportEntityType = (typeof ReportEntityType)[keyof typeof ReportEntityType];
export const REPORT_ENTITY_TYPE_VALUES = Object.values(ReportEntityType) as [
  ReportEntityType,
  ...ReportEntityType[],
];

export const RockState = {
  DRY: 'DRY',
  DAMP: 'DAMP',
  WET: 'WET',
} as const;
export type RockState = (typeof RockState)[keyof typeof RockState];

export const CrowdLevel = {
  EMPTY: 'EMPTY',
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
} as const;
export type CrowdLevel = (typeof CrowdLevel)[keyof typeof CrowdLevel];

export const CLIMBING_SPOT_TYPE_LABELS: Record<ClimbingSpotType, string> = {
  ALL: 'Tous les types',
  OUTDOOR: 'Extérieur',
  INDOOR: 'Intérieur',
  OUTDOOR_BOULDER: 'Bloc extérieur',
  OUTDOOR_LEAD: 'Voie extérieure',
  INDOOR_BOULDER: 'Bloc intérieur',
  INDOOR_LEAD: 'Voie intérieure',
  INDOOR_SPEED: 'Vitesse intérieure',
  PSICOBLOC: 'Psicobloc',
};

export const CLIMBING_SPOT_DIFFICULTY_LABELS: Record<ClimbingSpotDifficulty, string> = {
  BEGINNER: 'Débutant (4a - 5b)',
  INTERMEDIATE: 'Intermédiaire (5c - 6b)',
  ADVANCED: 'Avancé (6c - 7b)',
  EXPERT: 'Expert (7c - 8b)',
  ELITE: 'Elite (8c et plus)',
  GRADE_4A: '4a',
  GRADE_4B: '4b',
  GRADE_4C: '4c',
  GRADE_5A: '5a',
  GRADE_5B: '5b',
  GRADE_5C: '5c',
  GRADE_6A: '6a',
  GRADE_6B: '6b',
  GRADE_6C: '6c',
  GRADE_7A: '7a',
  GRADE_7B: '7b',
  GRADE_7C: '7c',
  GRADE_8A: '8a',
  GRADE_8B: '8b',
  GRADE_8C: '8c',
  GRADE_9A: '9a',
  GRADE_9A_PLUS: '9a+',
  GRADE_9B: '9b',
  GRADE_9B_PLUS: '9b+',
};

export const CLIMBING_SPOT_STATUS_LABELS: Record<ClimbingSpotStatus, string> = {
  PENDING: 'En attente',
  APPROVED: 'Approuvé',
  REJECTED: 'Rejeté',
};
