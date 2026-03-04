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

export function DataProvider({ children }: { children: ReactNode }) {
  const [wines, setWines] = useState<Wine[]>(defaultWines);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/public/wines");
        if (res.ok) setWines(await res.json());
      } catch {
        // Keep defaults
      }
      setLoading(false);
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
