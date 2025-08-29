'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Category = string | null;

interface FilterStore {
  searchQuery: string;
  selectedCategory: Category;
  setSearchQuery: (query: string) => void;
  clearSearchQuery: () => void;
  setSelectedCategory: (category: Category) => void;
  clearSelectedCategory: () => void;
}

const useFilterStore = create<FilterStore>()(
  devtools((set) => ({
    searchQuery: '',
    selectedCategory: null,
    setSearchQuery: (query) => set({ searchQuery: query }),
    clearSearchQuery: () => set({ searchQuery: '' }),
    setSelectedCategory: (category) => set({ selectedCategory: category }),
    clearSelectedCategory: () => set({ selectedCategory: null }),
  })),
);

export default useFilterStore;
