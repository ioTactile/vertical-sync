import { describe, it, expect, vi, beforeEach } from "vitest";
import { climbingSpotGateway } from "@/modules/core/gateway-infra/api.climbing-spot-gateway";
import { axiosInstance } from "@/lib/globals";

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

    const spotDto = { id: "spot_1" } as any;

    await climbingSpotGateway.createClimbingSpot(spotDto);
    await climbingSpotGateway.updateClimbingSpot(spotDto);
    await climbingSpotGateway.deleteClimbingSpot("spot_1");

    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/api/climbing-spot",
      spotDto,
    );
    expect(axiosInstance.patch).toHaveBeenCalledWith(
      "/api/climbing-spot/spot_1",
      spotDto,
    );
    expect(axiosInstance.delete).toHaveBeenCalledWith(
      "/api/climbing-spot/spot_1",
      {
        data: { id: "spot_1" },
      },
    );
  });

  it("devrait créer un commentaire pour un spot", async () => {
    vi.mocked(axiosInstance.post).mockResolvedValueOnce({ data: undefined });

    const commentDto = {
      climbingSpotId: "spot_1",
    } as any;

    await climbingSpotGateway.createClimbingSpotComment(commentDto);

    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/api/climbing-spot/spot_1/comments",
      commentDto,
    );
  });
});
