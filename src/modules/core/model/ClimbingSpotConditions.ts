import { Author } from '@/modules/core/model/User';

export type RockState = 'DRY' | 'DAMP' | 'WET';
export type CrowdLevel = 'EMPTY' | 'FEW_PEOPLE' | 'BUSY' | 'PACKED';

export type ClimbingSpotConditionReport = {
  id: string;
  climbingSpotId: string;
  authorId: string;
  rockState: RockState;
  crowdLevel: CrowdLevel;
  comment: string | null;
  createdAt: Date;
};

export type GetClimbingSpotConditionReportResponse = ClimbingSpotConditionReport & {
  author: Author;
};

export type GetClimbingSpotConditionsResponse = GetClimbingSpotConditionReportResponse[];

export type CreateClimbingSpotConditionReportDto = {
  climbingSpotId: string;
  authorId: string;
  rockState: RockState;
  crowdLevel: CrowdLevel;
  comment?: string | null;
};
