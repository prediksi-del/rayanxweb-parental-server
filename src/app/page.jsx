"use client";
import { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { ref, onValue } from "firebase/database";
import Link from "next/link";
import ShimmerLoader from "@/components/ShimmerLoader";
import { Monitor, Cpu } from "lucide-react";

export default function DashboardPage() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const devicesRef = ref(db, "devices");
    const unsubscribe = onValue(devicesRef, (snapshot) => {
      const data = snapshot.val();
      setDevices(data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : []);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <ShimmerLoader />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="font-mono text-lg font-bold tracking-wide">RAYAN REGISTERED NODES</h1>
        <p className="font-mono text-xs text-slate-500">{devices.length} Perangkat terdaftar sistem</p>
      </div>

      {devices.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-800 p-12 text-center bg-[#161b2e]/30">
          <p className="font-mono text-sm text-slate-500">Tidak ada perangkat yang aktif.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {devices.map((device) => (
            <Link key={device.id} href={`/device/${device.id}`} className="block group">
              <div className="rounded-xl border border-slate-800 bg-[#161b2e] p-5 hover:border-indigo-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[#05070f] p-2 text-indigo-400 border border-slate-800">
                    <Monitor className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-mono text-sm font-bold text-white">{device.model}</h3>
                    <p className="font-mono text-[10px] text-slate-500">ID: {device.id.substring(0, 8)}...</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
