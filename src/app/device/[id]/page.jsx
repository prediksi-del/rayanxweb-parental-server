"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/utils/firebase";
import { ref, onValue } from "firebase/database";
import ShimmerLoader from "@/components/ShimmerLoader";
import { Monitor, Cpu, Clock } from "lucide-react";

export default function DeviceConsolePage() {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const deviceRef = ref(db, `devices/${id}`);
    const unsubDevice = onValue(deviceRef, (snapshot) => {
      setDevice(snapshot.val());
      setLoading(false);
    });
    return () => unsubDevice();
  }, [id]);

  if (loading) return <ShimmerLoader />;
  if (!device) return <p className="p-6 text-center font-mono text-sm text-slate-500">Perangkat tidak ditemukan.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <div className="rounded-xl border border-slate-800 bg-[#161b2e] p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-[#05070f] p-3 border border-slate-800 text-indigo-400">
            <Monitor className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-mono text-base font-bold text-white">{device.model}</h2>
            <p className="font-mono text-xs text-slate-500">UID: {id}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2 bg-[#05070f] p-3 rounded-lg">
            <Cpu className="h-4 w-4 text-slate-500" />
            <span>Versi OS: {device.osVersion}</span>
          </div>
          <div className="flex items-center gap-2 bg-[#05070f] p-3 rounded-lg">
            <Clock className="h-4 w-4 text-slate-500" />
            <span>Sinkronisasi Terakhir: {new Date(device.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
