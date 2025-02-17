import * as React from "react";
import { renderHook } from "@testing-library/react";
import { useCreateTalk } from "@/modules/core/mutations/useCreateTalk";
import { talkGateway } from "@/modules/core/gateway-infra/api.talk-gateway";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, vi } from "vitest";
import { mockTalk } from "@/__tests__/fixtures/talk.fixture";

vi.mock("@/modules/core/gateway-infra/api.talk-gateway");

describe("useCreateTalk", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children
    );
  };

  it("devrait créer un talk", async () => {
    vi.mocked(talkGateway.createTalk).mockResolvedValueOnce({
      message: "Discussion créée",
    });

    const { result } = renderHook(() => useCreateTalk(), { wrapper });

    await result.current.mutateAsync(mockTalk);

    expect(talkGateway.createTalk).toHaveBeenCalledWith(mockTalk);
  });
});
