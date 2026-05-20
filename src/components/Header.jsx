"use client";
import { useAuth } from "@/context/AuthContext";
import { Terminal, LogOut } from "lucide-react";

export default function Header() {
  const { logout, user } = useAuth();
  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-800 bg-[#05070f]/80 px-6 py-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <Terminal className="h-5 w-5 text-indigo-500" />
        <span className="font-mono text-sm font-black tracking-widest">
          RAYAN <span className="text-indigo-500">CONSOLE</span> v1.37
        </span>
      </div>
      <button 
        onClick={logout} 
        className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-[#161b2e] px-3 py-1.5 font-mono text-xs font-bold text-red-400 hover:bg-red-950/20 transition-all"
      >
        <LogOut className="h-3.5 w-3.5" /> KELUAR
      </button>
    </header>
  );
}
