"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, Settings } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  if (!user) return null;

  const navItems = [
    { name: "Terminal", path: "/", icon: LayoutDashboard },
    { name: "Konfigurasi", path: "/profil", icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-[#161b2e]/90 px-6 py-2 backdrop-blur-lg">
      <div className="mx-auto flex max-w-md justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} href={item.path} className="flex flex-col items-center gap-1">
              <div className={`rounded-xl p-2 transition-all ${isActive ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className={`font-mono text-[10px] uppercase tracking-wider ${isActive ? "font-bold text-indigo-400" : "text-slate-500"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
