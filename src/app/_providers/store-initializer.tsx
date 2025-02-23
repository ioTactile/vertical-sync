"use client";

import { useUserStore } from "@/modules/core/store/store";
import { useUser } from "@clerk/nextjs";
import * as React from "react";

const StoreInitializer = () => {
  const { user, isLoaded } = useUser();
  const setUser = useUserStore((state) => state.setUser);
  const setIsLoaded = useUserStore((state) => state.setIsLoaded);

  React.useEffect(() => {
    if (user) {
      setUser(user);
    }
    setIsLoaded(isLoaded);
  }, [user, setUser, isLoaded, setIsLoaded]);

  return null;
};

export default StoreInitializer;
