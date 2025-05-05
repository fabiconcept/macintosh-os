import { WindowType } from "@/constants";
import { create } from "zustand";


export interface AppWindow {
    id: string;
    title: string;
    position: { x: number; y: number };
    fixedLocation: "right" | "left";
    windowType: WindowType;
}

interface AppWindowsStore {
    windows: AppWindow[];
    addWindow: (window: AppWindow) => void;
    removeWindow: (id: string) => void;
    updateWindow: (id: string, update: Partial<AppWindow>) => void;
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
}))

export default useAppWindows;