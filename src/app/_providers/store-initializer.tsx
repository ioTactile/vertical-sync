"use client";

import { useUserStore } from "@/modules/core/store/store";
import { useUser } from "@clerk/nextjs";
import * as React from "react";

const StoreInitializer = () => {
  const { user, isLoaded } = useUser();
  const setUser = useUserStore((state) => state.setUser);
  const setIsLoaded = useUserStore((state) => state.setIsLoaded);
  const resetUser = useUserStore((state) => state.resetUser);

  React.useEffect(() => {
    if (isLoaded) {
      if (user) {
        setUser(user);
      } else {
        resetUser();
      }
    }
    setIsLoaded(isLoaded);
  }, [user, setUser, isLoaded, setIsLoaded, resetUser]);

  return null;
};

export default StoreInitializer;
