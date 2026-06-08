import { create } from 'zustand'

interface AppState {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentPage: 'dashboard',
  setCurrentPage: (page: string) => set({ currentPage: page }),
}))