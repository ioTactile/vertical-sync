import getUserNotifications from "@/modules/core/queries/get-user-notifications";
import { useQuery } from "@tanstack/react-query";

const useUserNotifications = (userId: string | undefined, enabled: boolean) => {
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => getUserNotifications(userId!),
    enabled: enabled && !!userId,
  });
};

export default useUserNotifications;
