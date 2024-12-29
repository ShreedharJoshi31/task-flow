"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  BookOpen,
  BarChart2,
  Users,
  LogOut,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Claims", href: "/claims", icon: FileText },
  { name: "Scheduler", href: "/scheduler", icon: Calendar },
  { name: "Knowledge Base", href: "/knowledge-base", icon: BookOpen },
  { name: "Call Analytics", href: "/call-analytics", icon: BarChart2 },
  { name: "User Management", href: "/user-management", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-background border-r">
      <div className="flex h-16 items-center justify-center border-b">
        <h1 className="text-xl font-bold text-foreground">TaskFlow </h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-secondary text-secondary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
            )}
          >
            <item.icon className="mr-3 h-6 w-6" />
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="border-t p-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => console.log("Logout")}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
