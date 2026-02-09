import { describe, it, expect, vi, beforeEach } from "vitest";
import { climbingSpotGateway } from "@/modules/core/gateway-infra/api.climbing-spot-gateway";
import { axiosInstance } from "@/lib/globals";
import type {
  CreateClimbingSpotCommentDto,
  CreateClimbingSpotDto,
  UpdateClimbingSpotDto,
} from "@/modules/core/model/ClimbingSpot";
import type { CreateClimbingSpotConditionReportDto } from "@/modules/core/model/ClimbingSpotConditions";
import type { CreateClimbingSpotAlertDto } from "@/modules/core/model/ClimbingSpotAlert";

vi.mock("@/lib/globals", () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("ClimbingSpotGateway", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("devrait récupérer un spot par son id", async () => {
    const mockSpot = { id: "spot_1" };
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: mockSpot,
    });

    const result = await climbingSpotGateway.getClimbingSpot("spot_1");
    expect(result).toEqual(mockSpot);
    expect(axiosInstance.get).toHaveBeenCalledWith("/api/climbing-spot/spot_1");
  });

  it("devrait récupérer les spots publics", async () => {
    const mockSpots = [{ id: "spot_1" }];
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: mockSpots,
    });

    const result = await climbingSpotGateway.getPublicClimbingSpots();
    expect(result).toEqual(mockSpots);
    expect(axiosInstance.get).toHaveBeenCalledWith("/api/climbing-spot");
  });

  it("devrait récupérer les spots admin", async () => {
    const mockSpots = [{ id: "spot_1" }];
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: mockSpots,
    });

    const result = await climbingSpotGateway.getAdminClimbingSpots();
    expect(result).toEqual(mockSpots);
    expect(axiosInstance.get).toHaveBeenCalledWith("/api/admin/climbing-spot");
  });

  it("devrait récupérer les spots par radius et coords", async () => {
    const mockSpots = [{ id: "spot_1" }];
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: mockSpots,
    });

    const coords: [number, number] = [1, 2];
    const result = await climbingSpotGateway.getClimbingSpotsByRadiusAndCoords(
      10,
      coords,
    );

    expect(result).toEqual(mockSpots);
    expect(axiosInstance.get).toHaveBeenCalledWith(
      `/api/climbing-spot?radius=10&coords=${JSON.stringify(coords)}`,
    );
  });

  it("devrait récupérer les spots par recherche", async () => {
    const mockSpots = [{ id: "spot_1" }];
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: mockSpots,
    });

    const result = await climbingSpotGateway.getClimbingSpotsSearch("paris");

    expect(result).toEqual(mockSpots);
    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/api/climbing-spot?search=paris",
    );
  });

  it("devrait récupérer les commentaires d'un spot", async () => {
    const mockComments = [{ id: "comment_1" }];
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: mockComments,
    });

    const result = await climbingSpotGateway.getClimbingSpotComments("spot_1");

    expect(result).toEqual(mockComments);
    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/api/climbing-spot/spot_1/comments",
    );
  });

  it("devrait créer, mettre à jour et supprimer un spot", async () => {
    vi.mocked(axiosInstance.post).mockResolvedValueOnce({ data: undefined });
    vi.mocked(axiosInstance.patch).mockResolvedValueOnce({ data: undefined });
    vi.mocked(axiosInstance.delete).mockResolvedValueOnce({ data: undefined });

    const createSpotDto = {
      authorId: "user_1",
      coords: { type: "Point", coordinates: [1, 2] },
    } as CreateClimbingSpotDto;
    const updateSpotDto = { id: "spot_1" } as UpdateClimbingSpotDto;

    await climbingSpotGateway.createClimbingSpot(createSpotDto);
    await climbingSpotGateway.updateClimbingSpot(updateSpotDto);
    await climbingSpotGateway.deleteClimbingSpot("spot_1");

    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/api/climbing-spot",
      createSpotDto,
    );
    expect(axiosInstance.patch).toHaveBeenCalledWith(
      "/api/climbing-spot/spot_1",
      updateSpotDto,
    );
    expect(axiosInstance.delete).toHaveBeenCalledWith(
      "/api/climbing-spot/spot_1",
      { data: { id: "spot_1" } },
    );
  });

  it("devrait créer un commentaire pour un spot", async () => {
    vi.mocked(axiosInstance.post).mockResolvedValueOnce({ data: undefined });

    const commentDto = {
      climbingSpotId: "spot_1",
    } as CreateClimbingSpotCommentDto;

    await climbingSpotGateway.createClimbingSpotComment(commentDto);

    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/api/climbing-spot/spot_1/comments",
      commentDto,
    );
  });

  it("devrait récupérer les conditions d'un spot", async () => {
    const mockConditions = [{ id: "cond_1", rockState: "DRY" }];
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: mockConditions,
    });

    const result =
      await climbingSpotGateway.getClimbingSpotConditions("spot_1");

    expect(result).toEqual(mockConditions);
    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/api/climbing-spot/spot_1/conditions",
    );
  });

  it("devrait créer un report de conditions pour un spot", async () => {
    vi.mocked(axiosInstance.post).mockResolvedValueOnce({ data: undefined });

    const reportDto = {
      climbingSpotId: "spot_1",
      authorId: "user_1",
      rockState: "DRY",
      crowdLevel: "FEW_PEOPLE",
    } as CreateClimbingSpotConditionReportDto;

    await climbingSpotGateway.createClimbingSpotConditionReport(reportDto);

    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/api/climbing-spot/spot_1/conditions",
      reportDto,
    );
  });

  it("devrait récupérer les alertes d'un utilisateur", async () => {
    const mockAlerts = [{ id: "alert_1", climbingSpotId: "spot_1" }];
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: mockAlerts,
    });

    const result = await climbingSpotGateway.getClimbingSpotAlerts("user_1");

    expect(result).toEqual(mockAlerts);
    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/api/climbing-spot/alerts",
      { params: { userId: "user_1" } },
    );
  });

  it("devrait créer une alerte pour un spot", async () => {
    vi.mocked(axiosInstance.post).mockResolvedValueOnce({ data: undefined });

    const alertDto = {
      climbingSpotId: "spot_1",
      userId: "user_1",
      minTempC: 5,
      maxTempC: 25,
    } as CreateClimbingSpotAlertDto;

    await climbingSpotGateway.createClimbingSpotAlert("spot_1", alertDto);

    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/api/climbing-spot/spot_1/alerts",
      alertDto,
    );
  });

  it("devrait mettre à jour une alerte", async () => {
    vi.mocked(axiosInstance.patch).mockResolvedValueOnce({ data: undefined });

    await climbingSpotGateway.updateClimbingSpotAlert("alert_1", {
      id: "alert_1",
      isActive: false,
    });

    expect(axiosInstance.patch).toHaveBeenCalledWith(
      "/api/climbing-spot/alerts/alert_1",
      { id: "alert_1", isActive: false },
    );
  });

  it("devrait supprimer une alerte", async () => {
    vi.mocked(axiosInstance.delete).mockResolvedValueOnce({ data: undefined });

    await climbingSpotGateway.deleteClimbingSpotAlert("alert_1");

    expect(axiosInstance.delete).toHaveBeenCalledWith(
      "/api/climbing-spot/alerts/alert_1",
    );
  });
});
