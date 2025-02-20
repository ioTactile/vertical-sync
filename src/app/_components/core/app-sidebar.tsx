import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import { NavigationItem } from "@/types/navigation-item";
import { AlertTriangle, Library, MessageSquareText, Tag } from "lucide-react";
import Link from "next/link";

const adminAsideMenuItems: NavigationItem<string>[] = [
  { title: "Discussions", url: "/admin/talks", icon: MessageSquareText },
  { title: "Articles", url: "/admin/articles", icon: Library },
  { title: "Tags", url: "/admin/tags", icon: Tag },
  { title: "Signalements", url: "/admin/reports", icon: AlertTriangle },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminAsideMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
