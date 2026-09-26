import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/app/_components/ui/sidebar';
import { AppSidebar } from '@/app/_components/core/app-sidebar';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="p-2">
          <SidebarTrigger className="-ml-1" />
        </div>
        <div className="p-2">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
