"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { wines as defaultWines, Wine } from "@/data/wines";

interface DataContextType {
  wines: Wine[];
  loading: boolean;
}

const DataContext = createContext<DataContextType>({
  wines: defaultWines,
  loading: true,
});

export function DataProvider({
  children,
  initialWines,
}: {
  children: ReactNode;
  initialWines?: Wine[];
}) {
  // Seed from the shared KV catalogue resolved server-side in app/layout.tsx so
  // the SSR/first paint (and crawlers / no-JS clients) see the live catalogue,
  // not the static fallback. Fall back to the bundled list only if KV is empty.
  const seed = initialWines && initialWines.length ? initialWines : defaultWines;
  const [wines, setWines] = useState<Wine[]>(seed);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/public/wines");
        if (res.ok) setWines(await res.json());
      } catch {
        // Keep the server-seeded catalogue
      }
    }
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ wines, loading }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
