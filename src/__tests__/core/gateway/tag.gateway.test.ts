import { describe, it, expect, vi, beforeEach } from 'vitest';
import { tagGateway } from '@/modules/core/gateway-infra/api.tag-gateway';
import { axiosInstance } from '@/lib/globals';
import { mockTag, mockTagDto, mockTags, mockUpdateTagDto } from '@/__tests__/fixtures/tag.fixture';

vi.mock('@/lib/globals', () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('TagGateway', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('devrait récupérer la liste des tags', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: mockTags,
    });

    const result = await tagGateway.getTags();
    expect(result).toEqual(mockTags);
    expect(axiosInstance.get).toHaveBeenCalledWith('/api/tag');
  });

  it('devrait récupérer un tag par son id', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: mockTag,
    });

    const result = await tagGateway.getTagById(mockTag.id);
    expect(result).toEqual(mockTag);
    expect(axiosInstance.get).toHaveBeenCalledWith(`/api/tag/${mockTag.id}`);
  });

  it('devrait créer un nouveau tag', async () => {
    const mockResponse = {
      message: 'Tag créé',
    };

    vi.mocked(axiosInstance.post).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await tagGateway.createTag(mockTagDto);
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.post).toHaveBeenCalledWith('/api/tag', mockTagDto);
  });

  it('devrait mettre à jour un tag', async () => {
    const mockResponse = {
      message: 'Tag mis à jour',
    };

    vi.mocked(axiosInstance.patch).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await tagGateway.updateTag(mockUpdateTagDto);
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.patch).toHaveBeenCalledWith(`/api/tag/${mockTag.id}`, mockUpdateTagDto);
  });

  it('devrait supprimer un tag', async () => {
    const mockResponse = { message: 'Tag supprimé' };

    vi.mocked(axiosInstance.delete).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await tagGateway.deleteTag(mockTag.id);
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.delete).toHaveBeenCalledWith(`/api/tag/${mockTag.id}`, {
      data: {
        id: mockTag.id,
      },
    });
  });
});
