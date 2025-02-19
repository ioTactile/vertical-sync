import { CreateReportInputs } from "@/modules/react/sections/_schemas/create-report";

export type CreateReportDto = {
  reporterId: string;
} & CreateReportInputs;
