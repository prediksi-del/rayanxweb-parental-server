"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Terminal, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      setError("Kredensial administrasi salah.");
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#161b2e] p-8 shadow-xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-950/50 border border-indigo-500/30">
            <Terminal className="h-5 w-5 text-indigo-400" />
          </div>
          <h2 className="font-mono text-base font-bold tracking-wider">RAYAN LOGIN INTERFACE</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-slate-400 mb-1">Identity</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-xl border border-slate-800 bg-[#05070f] py-2.5 pl-10 pr-4 font-mono text-sm focus:border-indigo-500 focus:outline-none"/>
            </div>
          </div>
          <div>
            <label className="block font-mono text-xs text-slate-400 mb-1">Access Key</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full rounded-xl border border-slate-800 bg-[#05070f] py-2.5 pl-10 pr-4 font-mono text-sm focus:border-indigo-500 focus:outline-none"/>
            </div>
          </div>
          {error && <p className="font-mono text-xs text-red-400 text-center">{error}</p>}
          <button type="submit" disabled={submitting} className="w-full rounded-xl bg-indigo-600 py-3 font-mono text-xs font-bold uppercase tracking-wider hover:bg-indigo-700 disabled:bg-slate-800">
            {submitting ? "MEMVERIFIKASI..." : "OTENTIKASI MASUK"}
          </button>
        </form>
      </div>
    </div>
  );
}
