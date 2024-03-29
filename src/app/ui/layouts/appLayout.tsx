'use client'

import AuthProvider from "@/app/context/authContext";
import AppSidebar from "./appSidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="flex h-screen w-screen">
        <div className="h-full">
          <AppSidebar></AppSidebar>
        </div>
        <div className="h-full mr-auto max-w-7xl">
          {children}
        </div>
      </div>
    </AuthProvider>
  );
}

