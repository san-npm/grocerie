"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { wines as defaultWines, Wine } from "@/data/wines";
import { siteContent as defaultContent, SiteContent } from "@/data/content";

interface DataContextType {
  wines: Wine[];
  content: SiteContent;
  loading: boolean;
}

const DataContext = createContext<DataContextType>({
  wines: defaultWines,
  content: defaultContent,
  loading: true,
});

export function DataProvider({ children }: { children: ReactNode }) {
  const [wines, setWines] = useState<Wine[]>(defaultWines);
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [wRes, cRes] = await Promise.allSettled([
          fetch("/api/public/wines"),
          fetch("/api/public/content"),
        ]);
        if (wRes.status === "fulfilled" && wRes.value.ok) setWines(await wRes.value.json());
        if (cRes.status === "fulfilled" && cRes.value.ok) setContent(await cRes.value.json());
      } catch {
        // Keep defaults
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ wines, content, loading }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
