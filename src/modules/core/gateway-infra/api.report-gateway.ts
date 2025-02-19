import { CreateReportDto } from "@/modules/core/model/Report";
import { IReportGateway } from "@/modules/core/gateway/report.gateway";
import { axiosInstance } from "@/lib/globals";

export class ApiReportGateway implements IReportGateway {
  async createReport(report: CreateReportDto) {
    const response = await axiosInstance.post("/api/report", report);
    return response.data;
  }
}

export const reportGateway = new ApiReportGateway();
