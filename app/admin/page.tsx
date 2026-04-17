"use client";

import { useState, useEffect } from "react";
import { Wine } from "@/data/wines";
import { SiteContent } from "@/data/content";

interface AdminData {
  wines: Wine[];
  content: SiteContent;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const login = async () => {
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) { setError("Invalid password"); return; }
      const { token: t } = await res.json();
      setToken(t);
      localStorage.setItem("admin-token", t);
    } catch { setError("Login failed"); }
  };

  useEffect(() => {
    const saved = localStorage.getItem("admin-token");
    if (saved) setToken(saved);
  }, []);

  useEffect(() => {
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };
    async function loadData() {
      try {
        const [winesRes, contentRes] = await Promise.all([
          fetch("/api/admin/data?type=wines", { headers }),
          fetch("/api/admin/data?type=content", { headers }),
        ]);
        if (!winesRes.ok || !contentRes.ok) {
          setToken("");
          localStorage.removeItem("admin-token");
          return;
        }
        const wines = await winesRes.json();
        const content = await contentRes.json();
        setData({ wines, content });
      } catch {
        setToken("");
        localStorage.removeItem("admin-token");
      }
    }
    loadData();
  }, [token]);

  const saveAdminData = async (type: string, payload: unknown) => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ type, data: payload }),
      });
      if (res.ok) setMessage(`${type} saved successfully`);
      else setMessage("Save failed");
    } catch { setMessage("Save failed"); }
    setSaving(false);
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="max-w-sm w-full p-8">
          <h1 className="font-playfair text-2xl text-ink mb-6 text-center">Admin</h1>
          {error && <p className="text-wine text-sm mb-4 text-center">{error}</p>}
          <label htmlFor="admin-password" className="sr-only">Password</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-ink/15 px-4 py-3 text-sm bg-transparent mb-4"
            onKeyDown={(e) => e.key === "Enter" && login()}
          />
          <button onClick={login} className="btn-mustard w-full text-center">Login</button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="text-warmgray">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-playfair text-2xl text-ink">Admin — La Grocerie</h1>
          <button
            onClick={() => { setToken(""); localStorage.removeItem("admin-token"); }}
            className="text-xs text-warmgray hover:text-wine"
          >
            Logout
          </button>
        </div>

        {message && <p className="text-olive text-sm mb-4">{message}</p>}

        <div className="space-y-8">
          {/* Wines — read-only (managed from Vins Fins admin) */}
          <div className="bg-white/50 p-6 border border-ink/5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-playfair text-lg text-ink">Wines ({data.wines.length})</h2>
              <span className="text-[10px] uppercase tracking-wider text-warmgray">
                Read-only · Edit from Vins Fins admin
              </span>
            </div>
            <p className="text-xs text-warmgray/70 mb-3">
              The wine catalog is shared with Vins Fins and is authoritative there. Edits here are blocked server-side (403) to prevent divergence and stock races.
            </p>
            <textarea
              readOnly
              className="w-full h-64 border border-ink/10 p-4 text-xs font-mono bg-transparent opacity-60"
              value={JSON.stringify(data.wines, null, 2)}
            />
          </div>

          {/* Content */}
          <div className="bg-white/50 p-6 border border-ink/5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-playfair text-lg text-ink">Site Content</h2>
              <button
                onClick={() => saveAdminData("content", data.content)}
                disabled={saving}
                className="btn-mustard text-[9px]"
              >
                {saving ? "Saving..." : "Save Content"}
              </button>
            </div>
            <textarea
              className="w-full h-64 border border-ink/10 p-4 text-xs font-mono bg-transparent"
              value={JSON.stringify(data.content, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  setData({ ...data, content: parsed });
                } catch { /* invalid JSON, ignore */ }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
