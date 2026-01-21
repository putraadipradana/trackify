"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  IconDashboard,
  IconInnerShadowTop,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUsersGroup,
} from "@tabler/icons-react";
import NavMain from "./nav-main";
import NavUser from "./nav-user";
import NavSecondary from "./nav-secondary";
import Link from "next/link";
import { Suspense } from "react";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const navMain = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Orders",
      url: "/orders",
      icon: IconListDetails,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: IconUsersGroup,
    },
  ];

  const navSecondary = [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ];

  const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://robohash.org/shadcn",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/dashboard" />}
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <IconInnerShadowTop className="size-5! text-primary" />
              <span className="text-base font-semibold">Trackify</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <Suspense>
          <NavMain items={navMain} />
        </Suspense>
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={<div>Loading...</div>}>
          <NavUser user={user} />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}
