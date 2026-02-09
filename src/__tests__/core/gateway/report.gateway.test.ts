import { describe, it, expect, vi, beforeEach } from "vitest";
import { reportGateway } from "@/modules/core/gateway-infra/api.report-gateway";
import { axiosInstance } from "@/lib/globals";
import { CreateReportDto } from "@/modules/core/model/Report";

vi.mock("@/lib/globals", () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("ReportGateway", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("devrait créer un report", async () => {
    const dto = {
      reason: "spam",
      targetId: "talk_1",
      targetType: "talk",
    } as unknown as CreateReportDto;

    const mockResponse = { message: "Report créé" };

    vi.mocked(axiosInstance.post).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await reportGateway.createReport(dto);

    expect(result).toEqual(mockResponse);
    expect(axiosInstance.post).toHaveBeenCalledWith("/api/report", dto);
  });
});

