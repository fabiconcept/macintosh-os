import { create } from "zustand";

interface AppState {
    theme: "dark" | "light";
    setTheme: (theme: "dark" | "light") => void;
    timeFormat: "12" | "24";
    setTimeFormat: (timeFormat: "12" | "24") => void;
    allowCookies: boolean;
    setAllowCookies: (allowCookies: boolean) => void;
}

const useAppStore = create<AppState>((set) => ({
    theme: "dark",
    setTheme: (theme) => {
        set({ theme });
        
    },
    timeFormat: "24",
    setTimeFormat: (timeFormat) => set({ timeFormat }),
    allowCookies: false,
    setAllowCookies: (allowCookies) => set({ allowCookies }),
}));

export default useAppStore;