"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface ListedItem {
  id: number;
  name: string;
  category: string;
  image: string;
  condition: string;
  url?: string;
  pricePerDay: number;
  status: "available" | "borrowed";
}

interface ListedItemsContextType {
  listedItems: ListedItem[];
  addItem: (item: Omit<ListedItem, "id">) => void;
  removeItem: (id: number) => void;
}

const ListedItemsContext = createContext<ListedItemsContextType | undefined>(undefined);

export function ListedItemsProvider({ children }: { children: ReactNode }) {
  const [listedItems, setListedItems] = useState<ListedItem[]>([]);

  const addItem = (item: Omit<ListedItem, "id">) => {
    const newItem: ListedItem = {
      ...item,
      id: Date.now(), // Simple ID generation
    };
    setListedItems(prev => [...prev, newItem]);
  };

  const removeItem = (id: number) => {
    setListedItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <ListedItemsContext.Provider value={{ listedItems, addItem, removeItem }}>
      {children}
    </ListedItemsContext.Provider>
  );
}

export function useListedItems() {
  const context = useContext(ListedItemsContext);
  if (context === undefined) {
    throw new Error("useListedItems must be used within a ListedItemsProvider");
  }
  return context;
}