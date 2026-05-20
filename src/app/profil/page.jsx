"use client";
import { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import { ref, set, onValue } from "firebase/database";
import { Key, Check } from "lucide-react";

export default function ProfilPage() {
  const [pin, setPin] = useState("");
  const [savedPin, setSavedPin] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const pinRef = ref(db, "system/enrollment_pin");
    return onValue(pinRef, (snapshot) => {
      if (snapshot.exists()) setSavedPin(snapshot.val());
    });
  }, []);

  const handleUpdatePin = async (e) => {
    e.preventDefault();
    if (pin.length !== 6 || isNaN(pin)) {
      setStatus("PIN harus berupa 6 digit angka.");
      return;
    }
    try {
      await set(ref(db, "system/enrollment_pin"), pin);
      setStatus("PIN pendaftaran berhasil diperbarui.");
      setPin("");
    } catch (err) {
      setStatus("Gagal memperbarui konfigurasi.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="mb-4">
        <h1 className="font-mono text-lg font-bold">GATEWAY CONFIGURATION</h1>
      </div>
      <div className="rounded-xl border border-slate-800 bg-[#161b2e] p-6 space-y-4">
        <div className="flex justify-between items-center rounded-lg bg-[#05070f] p-3 text-sm font-mono">
          <span className="text-slate-400">PIN Aktif:</span>
          <span className="font-bold text-indigo-400">{savedPin || "------"}</span>
        </div>
        <form onSubmit={handleUpdatePin} className="space-y-3">
          <div>
            <label className="block font-mono text-xs text-slate-400 mb-1">Set PIN Registrasi Baru (6 Digit)</label>
            <div className="relative">
              <Key className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input type="text" maxLength={6} value={pin} onChange={(e) => setPin(e.target.value)} required className="w-full rounded-xl border border-slate-800 bg-[#05070f] py-2 pl-10 pr-4 font-mono text-sm tracking-wider text-white focus:outline-none"/>
            </div>
          </div>
          {status && <p className="font-mono text-[10px] text-indigo-400 text-center">{status}</p>}
          <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 font-mono text-xs font-bold uppercase text-white hover:bg-indigo-700">
            <Check className="h-4 w-4" /> SIMPAN PIN
          </button>
        </form>
      </div>
    </div>
  );
}
