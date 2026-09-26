import { CreateClimbingSpotInputs } from '@/modules/core/schemas/climbing-spot/create-climbing-spot';
import { Author } from '@/modules/core/model/User';
import { UpdateClimbingSpotInputs } from '@/modules/core/schemas/climbing-spot/update-climbing-spot';
import { CreateClimbingSpotCommentInputs } from '@/modules/core/schemas/climbing-spot/create-climbing-spot-comment';
import { WeatherData } from '@/modules/core/model/Weather';
import type {
  ClimbingSpotDifficulty,
  ClimbingSpotStatus,
  ClimbingSpotType,
} from '@/modules/core/domain/enums';

export type ClimbingSpot = {
  id: string;
  name: string;
  description: string | null;
  country: string | null;
  city: string | null;
  imageUrls: string[];
  types: ClimbingSpotType[];
  difficulties: ClimbingSpotDifficulty[];
  notation: number | null;
  notationCount: number | null;
  bestPeriod: string | null;
  address: string | null;
  websiteUrl: string | null;
  phoneNumber: string | null;
  email: string | null;
  parkingAvailable: boolean | null;
  toiletsAvailable: boolean | null;
  status: ClimbingSpotStatus;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
};

export type GetClimbingSpotResponse = ClimbingSpot & {
  coords: `POINT(${number} ${number})`;
};

export type GetClimbingSpotsResponse = GetClimbingSpotResponse[];

export type ExtendedClimbingSpot = Omit<GetClimbingSpotResponse, 'coords' | 'notation'> & {
  latitude: number;
  longitude: number;
  notation: string;
};

export type ExtendedClimbingSpotWithWeather = ExtendedClimbingSpot & {
  weather?: WeatherData;
};

export type ExtendedClimbingSpots = ExtendedClimbingSpot[];

export type GetClimbingSpotSearchResponse = {
  id: string;
  name: string;
  description: string;
  country: string;
  city: string;
};

export type GetClimbingSpotsSearchResponse = GetClimbingSpotSearchResponse[];

export type CreateClimbingSpotDto = {
  authorId: string;
  coords: {
    type: 'Point';
    coordinates: [number, number];
  };
} & Omit<CreateClimbingSpotInputs, 'latitude' | 'longitude'>;

export type UpdateClimbingSpotDto = {
  id: string;
  updatedAt: Date;
  coords: {
    type: 'Point';
    coordinates: [number, number];
  };
} & Omit<UpdateClimbingSpotInputs, 'latitude' | 'longitude'>;

export type ClimbingSpotComment = {
  content: string;
  notation: number;
  createdAt: Date;
  updatedAt: Date;
  climbingSpotId: string;
  authorId: string;
};

export type GetClimbingSpotCommentResponse = ClimbingSpotComment & {
  author: Author & {
    _count: {
      climbingSpotComments: number;
    };
  };
};

export type GetClimbingSpotCommentsResponse = GetClimbingSpotCommentResponse[];

export type CreateClimbingSpotCommentDto = {
  authorId: string;
  climbingSpotId: string;
} & CreateClimbingSpotCommentInputs;
