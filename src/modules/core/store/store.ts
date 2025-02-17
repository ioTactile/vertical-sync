import { create } from "zustand";
import type { UserResource } from "@clerk/types";

interface UserState {
  user: UserResource | null;
  isLoaded: boolean;
  isAdmin: boolean;
  setUser: (user: UserResource) => void;
  setIsLoaded: (isLoaded: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoaded: false,
  isAdmin: false,
  setUser: (user) =>
    set({
      user,
      isAdmin: user?.publicMetadata?.role === "admin",
    }),
  setIsLoaded: (isLoaded) => set({ isLoaded }),
}));

interface PaginationState {
  page: number;
  setPage: (page: number) => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
  page: 1,
  setPage: (page) => set({ page }),
}));
