import { WindowType } from "@/Constants/constants";
import { create } from "zustand";


export interface AppWindow {
    id: string;
    title: string;
    position: { x: number; y: number };
    fixedLocation: "right" | "left";
    isMinimized: boolean;
    windowType: WindowType;
}

interface AppWindowsStore {
    windows: AppWindow[];
    addWindow: (window: AppWindow) => void;
    removeWindow: (id: string) => void;
    updateWindow: (id: string, update: Partial<AppWindow>) => void;
    minimizeWindow: (id: string, position: { x: number; y: number }) => void;
    restoreWindow: (id: string) => void;
    reorderToTop: (id: string) => void;
}

const useAppWindows = create<AppWindowsStore>((set) => ({
    windows: [],
    addWindow: (window) => set((state) => ({ windows: [...state.windows, window] })),
    removeWindow: (id) => set((state) => ({ windows: state.windows.filter((window) => window.id !== id) })),
    updateWindow: (id, update) => set((state) => ({
        windows: state.windows.map((window) =>
            window.id === id ? { ...window, ...update } : window
        ),
    })),
    reorderToTop: (id) => set((state) => ({
        windows: [
            ...state.windows.filter((window) => window.id !== id),
            ...state.windows.filter((window) => window.id === id)
        ],
    })),
    minimizeWindow: (id, position) => set((state) => ({
        windows: state.windows.map((window) =>
            window.id === id ? { ...window, isMinimized: true, position } : window
        ),
    })),
    restoreWindow: (id) => set((state) => ({
        windows: state.windows.map((window) =>
            window.id === id ? { ...window, isMinimized: false } : window
        ),
    })),
}))

export default useAppWindows;