import type React from "react";
import Image from "next/image";
import { BellIcon } from "@heroicons/react/24/outline";
import { Sidebar } from "@/app/component/sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Ab mobile pe bhi show hoga */}
      <div className="w-64 hidden md:block lg:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col max-w-screen">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-4 md:px-6 gap-4 bg-white shadow-sm">
          {/* Bell Icon */}
          <BellIcon className="w-6 h-6 text-gray-600 hidden sm:block" />

          {/* Profile Section */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border">
              <Image 
                src="/2.jpg"  
                alt="Profile Picture"
                width={32} 
                height={32} 
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-700">Lorem Ips</p>
              <p className="text-xs text-gray-500">Manager</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6 flex-grow bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
