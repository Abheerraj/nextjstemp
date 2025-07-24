"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface BorrowedItem {
  id: number;
  item: string;
  owner: string;
  emoji: string;
  borrowDate: string;
  duration: string;
  reason: string;
}

interface BorrowedItemsContextType {
  borrowedItems: BorrowedItem[];
  addBorrowedItem: (item: BorrowedItem) => void;
  removeBorrowedItem: (id: number) => void;
  isItemBorrowed: (id: number) => boolean;
}

const BorrowedItemsContext = createContext<BorrowedItemsContextType | undefined>(undefined);

export function BorrowedItemsProvider({ children }: { children: ReactNode }) {
  const [borrowedItems, setBorrowedItems] = useState<BorrowedItem[]>([]);

  const addBorrowedItem = (item: BorrowedItem) => {
    setBorrowedItems(prev => [...prev, item]);
  };

  const removeBorrowedItem = (id: number) => {
    setBorrowedItems(prev => prev.filter(item => item.id !== id));
  };

  const isItemBorrowed = (id: number) => {
    return borrowedItems.some(item => item.id === id);
  };

  return (
    <BorrowedItemsContext.Provider value={{
      borrowedItems,
      addBorrowedItem,
      removeBorrowedItem,
      isItemBorrowed
    }}>
      {children}
    </BorrowedItemsContext.Provider>
  );
}

export function useBorrowedItems() {
  const context = useContext(BorrowedItemsContext);
  if (context === undefined) {
    throw new Error('useBorrowedItems must be used within a BorrowedItemsProvider');
  }
  return context;
}