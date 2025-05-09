// src/components/Layout.tsx
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full min-h-screen bg-gray-50 p-6">{children}</div>
    </div>
  );
}
