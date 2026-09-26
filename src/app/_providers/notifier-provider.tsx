"use client";

import { useEffect } from "react";
import { toast } from "@/app/_hooks/use-toast";
import { setNotifier } from "@/modules/core/ports/notifier";

/**
 * Branche le port Notifier du core sur le toast UI (adapter présentation).
 */
export default function NotifierProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    setNotifier({
      notify: (payload) => {
        toast({
          title: payload.title,
          description: payload.description,
          variant: payload.variant,
        });
      },
    });
  }, []);

  return children;
}
