"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ListedItem {
  id: number;
  name: string;
  category: string;
  condition: string;
  status: "available" | "borrowed";
  borrowedBy: string | null;
  borrowedDate: string | null;
  image: string;
  views: number;
  requests: number;
  description: string;
  availability: string;
  imageUrl: string;
  dateCreated: string;
}

interface ListedItemsContextType {
  listedItems: ListedItem[];
  addItem: (item: Omit<ListedItem, "id" | "views" | "requests" | "status" | "borrowedBy" | "borrowedDate" | "dateCreated">) => void;
}

const ListedItemsContext = createContext<ListedItemsContextType | undefined>(undefined);

export function ListedItemsProvider({ children }: { children: ReactNode }) {
  const [listedItems, setListedItems] = useState<ListedItem[]>([
    {
      id: 1,
      name: "Electric Lawn Mower",
      category: "Garden",
      condition: "Excellent",
      status: "available",
      borrowedBy: null,
      borrowedDate: null,
      image: "🌱",
      views: 24,
      requests: 3,
      description: "High-quality electric lawn mower, perfect for small to medium yards.",
      availability: "Available Immediately",
      imageUrl: "https://example.com/mower.jpg",
      dateCreated: "2024-07-15",
    },
    {
      id: 2,
      name: "Board Game Collection",
      category: "Games",
      condition: "Good",
      status: "borrowed",
      borrowedBy: "Emma Davis",
      borrowedDate: "2024-07-18",
      image: "🎲",
      views: 18,
      requests: 2,
      description: "Collection of popular board games including Monopoly, Scrabble, and Settlers of Catan.",
      availability: "Weekends Only",
      imageUrl: "https://example.com/games.jpg",
      dateCreated: "2024-07-10",
    },
    {
      id: 3,
      name: "DSLR Camera",
      category: "Electronics",
      condition: "Excellent",
      status: "available",
      borrowedBy: null,
      borrowedDate: null,
      image: "📷",
      views: 45,
      requests: 7,
      description: "Professional DSLR camera with multiple lenses. Perfect for photography enthusiasts.",
      availability: "Flexible Schedule",
      imageUrl: "https://example.com/camera.jpg",
      dateCreated: "2024-07-12",
    },
  ]);

  const addItem = (newItem: Omit<ListedItem, "id" | "views" | "requests" | "status" | "borrowedBy" | "borrowedDate" | "dateCreated">) => {
    const item: ListedItem = {
      ...newItem,
      id: Date.now(), // Simple ID generation
      views: 0,
      requests: 0,
      status: "available",
      borrowedBy: null,
      borrowedDate: null,
      dateCreated: new Date().toISOString().split('T')[0],
    };
    setListedItems(prev => [item, ...prev]);
  };

  return (
    <ListedItemsContext.Provider value={{ listedItems, addItem }}>
      {children}
    </ListedItemsContext.Provider>
  );
}

export function useListedItems() {
  const context = useContext(ListedItemsContext);
  if (context === undefined) {
    throw new Error('useListedItems must be used within a ListedItemsProvider');
  }
  return context;
}