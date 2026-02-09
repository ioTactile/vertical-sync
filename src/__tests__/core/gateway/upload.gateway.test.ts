import { describe, it, expect, vi, beforeEach } from "vitest";
import { uploadGateway } from "@/modules/core/gateway-infra/api.upload-gateway";
import { axiosInstance } from "@/lib/globals";

vi.mock("@/lib/globals", () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("UploadGateway", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("devrait uploader plusieurs fichiers et retourner les URLs", async () => {
    const file1 = new File(["content"], "file1.png", { type: "image/png" });
    const file2 = new File(["content"], "file2.png", { type: "image/png" });

    vi.mocked(axiosInstance.post)
      .mockResolvedValueOnce({ data: { url: "url1" } })
      .mockResolvedValueOnce({ data: { url: "url2" } });

    const result = await uploadGateway.uploadFiles([file1, file2]);

    expect(result).toEqual(["url1", "url2"]);
    expect(axiosInstance.post).toHaveBeenCalledTimes(2);
  });

  it("devrait supprimer plusieurs fichiers et retourner un message", async () => {
    vi.mocked(axiosInstance.post).mockResolvedValue({ data: {} });

    const urls = ["url1", "url2"];
    const result = await uploadGateway.deleteFiles(urls);

    expect(axiosInstance.post).toHaveBeenCalledTimes(2);
    expect(result).toEqual({ message: "Image(s) supprimée(s)" });
  });
});

