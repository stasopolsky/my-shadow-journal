// src/components/Sidebar.tsx
import { cn } from "../lib/utils";
import { Home, BarChart, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Entries", icon: Home },
  { to: "/insights", label: "Insights", icon: BarChart },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-white shadow-md fixed top-0 left-0">
      <div className="p-4 font-bold text-xl border-b">Shadow Journal</div>
      <nav className="flex flex-col gap-2 p-4">
        {links.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-100 transition",
              location.pathname === to ? "bg-gray-100 font-medium" : ""
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
