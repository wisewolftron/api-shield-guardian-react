
import { ReactNode } from "react";
import { Navigation } from "@/components/Navigation";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background gradient-bg text-foreground flex">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 p-6 flex-shrink-0 border-r border-border/10">
        <Navigation />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="md:hidden mb-8">
          <Navigation />
        </div>
        {children}
      </div>
    </div>
  );
}
