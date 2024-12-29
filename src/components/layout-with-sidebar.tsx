"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar";

export function LayoutWithSidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/";

  return (
    <div className="flex h-screen">
      {showSidebar && <Sidebar />}
      <main
        className={`overflow-y-auto p-6 ${showSidebar ? "flex-1" : "w-full"}`}
      >
        {children}
      </main>
    </div>
  );
}
