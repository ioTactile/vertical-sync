'use client';

import { Bell } from 'lucide-react';
import { Button } from '@/app/_components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu';
import { ScrollArea } from '@/app/_components/ui/scroll-area';
import useUserNotifications from '@/modules/core/hooks/use-user-notifications';
import { useMarkNotificationAsRead } from '@/modules/core/mutations/useMarkNotificationAsRead';
import type { GetNotificationResponse } from '@/modules/core/model/Notification';
import { getTimeBetweenDateAndNow } from '@/modules/core/utils/date';
import Link from 'next/link';
import * as React from 'react';

interface NotificationDropdownProps {
  userId: string | undefined;
}

const NotificationDropdown = ({ userId }: NotificationDropdownProps) => {
  const [open, setOpen] = React.useState(false);
  const { data: notifications, isLoading } = useUserNotifications(userId, !!userId && open);
  const markAsRead = useMarkNotificationAsRead();

  const unreadCount = notifications?.filter((n: GetNotificationResponse) => !n.isRead).length ?? 0;

  const handleItemClick = (n: GetNotificationResponse) => {
    if (!n.isRead) {
      markAsRead.mutate(n.id);
    }
    setOpen(false);
  };

  if (!userId) return null;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[320px] sm:w-[380px]">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        {isLoading ? (
          <div className="py-4 text-center text-sm text-muted-foreground">Chargement…</div>
        ) : !notifications?.length ? (
          <div className="py-4 text-center text-sm text-muted-foreground">Aucune notification</div>
        ) : (
          <ScrollArea className="max-h-[300px]">
            <div className="flex flex-col">
              {notifications.map((n) => (
                <DropdownMenuItem
                  key={n.id}
                  asChild
                  className="flex flex-col items-start gap-0.5 py-3"
                >
                  <Link
                    href="/spots"
                    onClick={() => handleItemClick(n)}
                    className="w-full cursor-pointer"
                  >
                    <span className={!n.isRead ? 'font-medium' : 'text-muted-foreground'}>
                      {n.title}
                    </span>
                    <span className="text-xs text-muted-foreground line-clamp-2">{n.message}</span>
                    <span className="text-xs text-muted-foreground">
                      il y a {getTimeBetweenDateAndNow(n.createdAt)}
                    </span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </div>
          </ScrollArea>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
