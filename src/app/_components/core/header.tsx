"use client";

import { cn } from "@/lib/utils";
import { Bell, Library, Map, Menu, MessageSquareText, Settings } from "lucide-react";
import AppLogo from "@/app/_components/core/app-logo";
import NotificationDropdown from "@/app/_components/core/notification-dropdown";
import { UserButton } from "@clerk/nextjs";
import { ThemeSwitcherDropdown } from "@/app/_components/core/theme-switcher-dropdown";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/app/_components/ui/navigation-menu";
import { Separator } from "@/app/_components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Button } from "@/app/_components/ui/button";
import { NavigationItem } from "@/types/navigation-item";
import * as React from "react";
import { useUserStore } from "@/modules/core/store/store";

const mainMenuItems: NavigationItem<string>[] = [
  { title: "Discussions", url: "/talks", icon: MessageSquareText },
  { title: "Blog", url: "/blog?page=1", icon: Library },
  { title: "Spots", url: "/spots", icon: Map },
];

const Header = () => {
  const { isAdmin } = useUserStore();
  const { user } = useUserStore();

  const menuItems = isAdmin
    ? [...mainMenuItems, { title: "Admin", url: "/admin", icon: Settings }]
    : mainMenuItems;

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 sm:px-0">
        <div className="flex items-center gap-8">
          <AppLogo />

          {/* Main Navigation */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="space-x-2">
              {menuItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <Link href={item.url} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "rounded-full"
                      )}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* User Navigation */}
        <div className="hidden items-center space-x-2 md:flex">
          <ThemeSwitcherDropdown />
          {user && <NotificationDropdown userId={user.id} />}
          <div className="flex">
            {user ? (
              <UserButton
                userProfileMode="navigation"
                userProfileUrl="/user-profile"
              />
            ) : (
              <Button variant="outline" asChild className="rounded-full">
                <Link href="/auth/sign-in">Connexion</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="z-2000 w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="text-left">Vertical Sync</SheetTitle>
              <SheetDescription>
                Le hub des escaladeurs de France
              </SheetDescription>
            </SheetHeader>
            <nav className="mt-6 flex flex-col space-y-4">
              <div>
                <h2 className="mb-2 text-sm font-semibold text-muted-foreground">
                  Menu
                </h2>
                {menuItems.map((item, index) => (
                  <SheetClose asChild key={index}>
                    <Link
                      href={item.url}
                      className="flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.icon && <item.icon className="mr-3 h-5 w-5" />}

                      {item.title}
                    </Link>
                  </SheetClose>
                ))}
              </div>

              {user && (
                <div>
                  <h2 className="mb-2 text-sm font-semibold text-muted-foreground">
                    Compte
                  </h2>
                  <SheetClose asChild>
                    <Link
                      href="/spots"
                      className="flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <Bell className="mr-3 h-5 w-5" />
                      Notifications
                    </Link>
                  </SheetClose>
                </div>
              )}

              <Separator />

              <div className="px-4 py-2">
                {user ? (
                  <SheetClose asChild>
                    <UserButton
                      userProfileMode="navigation"
                      userProfileUrl="/user-profile"
                      showName={true}
                      appearance={{
                        elements: {
                          userButtonBox: "flex-row-reverse",
                          userButtonAvatarBox: "h-5 w-5",
                          userButtonOuterIdentifier: "text-foreground",
                        },
                      }}
                    />
                  </SheetClose>
                ) : (
                  <SheetClose asChild>
                    <Button variant="outline" asChild className="rounded-full">
                      <Link href="/auth/sign-in">Connexion</Link>
                    </Button>
                  </SheetClose>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
