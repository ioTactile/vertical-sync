import { describe, it, expect, vi, beforeEach } from "vitest";
import { TagService } from "@/modules/core/service/tag.service";
import type { ITagRepository } from "@/modules/core/repository/tag.repository";
import { DomainError } from "@/modules/core/domain/errors";
import type { Tag } from "@/modules/core/model/Tag";

function createFakeTagRepository(
  overrides: Partial<ITagRepository> = {}
): ITagRepository {
  return {
    findMany: vi.fn(),
    findById: vi.fn(),
    findByName: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    ...overrides,
  };
}

describe("TagService", () => {
  let repository: ITagRepository;
  let service: TagService;

  beforeEach(() => {
    repository = createFakeTagRepository();
    service = new TagService(repository);
  });

  it("createTag rejette un nom vide", async () => {
    await expect(service.createTag({ name: "  " })).rejects.toBeInstanceOf(
      DomainError
    );
    expect(repository.create).not.toHaveBeenCalled();
  });

  it("createTag rejette un doublon", async () => {
    vi.mocked(repository.findByName).mockResolvedValue({
      id: "1",
      name: "bloc",
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Tag);

    await expect(service.createTag({ name: "bloc" })).rejects.toMatchObject({
      code: "CONFLICT",
    });
  });

  it("createTag trim et persiste", async () => {
    vi.mocked(repository.findByName).mockResolvedValue(null);
    await service.createTag({ name: "  voie  " });
    expect(repository.create).toHaveBeenCalledWith({ name: "voie" });
  });

  it("deleteTag lève NOT_FOUND si absent", async () => {
    vi.mocked(repository.findById).mockResolvedValue(null);
    await expect(service.deleteTag("missing")).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
  });
});
