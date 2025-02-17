import { describe, it, expect, vi } from "vitest";
import { talkGateway } from "@/modules/core/gateway-infra/api.talk-gateway";
import { axiosInstance } from "@/lib/globals";
import {
  mockTalk,
  mockCreateTalkCommentDto,
  mockTalkDto,
  mockTalks,
  mockUpdateTalkDto,
  mockDeleteTalkCommentDto,
  mockTalkWithComments,
} from "@/__tests__/fixtures/talk.fixture";
import { beforeEach } from "node:test";

vi.mock("@/lib/globals", () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("TalkGateway", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("devrait récupérer la liste des discussions", async () => {
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: mockTalks,
    });

    const result = await talkGateway.getTalks();
    expect(result).toEqual(mockTalks);
    expect(axiosInstance.get).toHaveBeenCalledWith("/api/talk");
  });

  it("devrait récupérer une discussion par son id", async () => {
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: mockTalkWithComments,
    });

    const result = await talkGateway.getTalkWithComments(
      mockTalkWithComments.id
    );
    expect(result).toEqual(mockTalkWithComments);
    expect(axiosInstance.get).toHaveBeenCalledWith(
      `/api/talk/${mockTalkWithComments.id}`
    );
  });

  it("devrait créer une nouvelle discussion", async () => {
    const mockResponse = {
      message: "Discussion créée",
    };

    vi.mocked(axiosInstance.post).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await talkGateway.createTalk(mockTalkDto);
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.post).toHaveBeenCalledWith("/api/talk", mockTalkDto);
  });

  it("devrait mettre à jour une discussion", async () => {
    const mockResponse = {
      message: "Discussion mise à jour",
    };

    vi.mocked(axiosInstance.patch).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await talkGateway.updateTalk(mockUpdateTalkDto);
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.patch).toHaveBeenCalledWith(
      `/api/talk/${mockTalk.id}`,
      mockUpdateTalkDto
    );
  });

  it("devrait supprimer une discussion", async () => {
    const mockResponse = { message: "Discussion supprimée" };

    vi.mocked(axiosInstance.delete).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await talkGateway.deleteTalk(mockTalk.id);
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.delete).toHaveBeenCalledWith(
      `/api/talk/${mockTalk.id}`,
      {
        data: {
          id: mockTalk.id,
        },
      }
    );
  });

  it("devrait créer un nouveau commentaire pour une discussion", async () => {
    const mockResponse = {
      message: "Commentaire créé",
    };

    vi.mocked(axiosInstance.post).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await talkGateway.createTalkComment(
      mockCreateTalkCommentDto
    );
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.post).toHaveBeenCalledWith(
      `/api/talk/${mockCreateTalkCommentDto.talkId}/comment`,
      mockCreateTalkCommentDto
    );
  });

  it("devrait supprimer un commentaire de discussion", async () => {
    const mockResponse = { message: "Commentaire supprimé" };

    vi.mocked(axiosInstance.delete).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await talkGateway.deleteTalkComment(
      mockDeleteTalkCommentDto.talkId,
      mockDeleteTalkCommentDto.talkCommentId
    );
    expect(result).toEqual(mockResponse);

    expect(axiosInstance.delete).toHaveBeenCalledWith(
      `/api/talk/${mockDeleteTalkCommentDto.talkId}/comment/${mockDeleteTalkCommentDto.talkCommentId}`,
      {
        data: {
          talkId: mockDeleteTalkCommentDto.talkId,
          talkCommentId: mockDeleteTalkCommentDto.talkCommentId,
        },
      }
    );
  });
});
