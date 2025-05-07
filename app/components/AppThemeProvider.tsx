"use client";

import useAppStore from "@/store";
import { Toaster } from "react-hot-toast";
import clsx from "clsx";
import { useLocalStorage } from "@/store/useLocalStorage";
import { useEffect } from "react";
import MobileViewNotice from "./MobileViewNotice";
import { useWindowSize } from "react-use";
import { motion } from "framer-motion";

export default function AppThemeProvider({ children, className }: { children: React.ReactNode, className?: string }) {
    const { theme, allowCookies, timeFormat, setTheme, setAllowCookies, setTimeFormat } = useAppStore();
    const [storedAppSettings, setStoredAppSettings] = useLocalStorage("app-settings", {
        theme: "dark",
        timeFormat: "24",
        allowCookies: false,
        isDefault: false
    });

    const { width } = useWindowSize();


    useEffect(() => {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

        if (storedAppSettings.allowCookies) {
            setTheme(storedAppSettings.theme as "dark" | "light");
            setAllowCookies(storedAppSettings.allowCookies);
            setTimeFormat(storedAppSettings.timeFormat as "24" | "12");
            return;
        }
        setTheme(systemTheme);
    }, [storedAppSettings]);

    useEffect(() => {
        if (!allowCookies) return;
        setStoredAppSettings({ theme, allowCookies, timeFormat, isDefault: false });
    }, [theme, allowCookies, timeFormat]);

    return (
        <body className={clsx(theme === "dark" ? "app-dark" : "app-light", className)}>
            <Toaster position="top-right" reverseOrder={false} toastOptions={{
                style: {
                    background: 'rgba(0, 0, 0, 0.75)',
                    color: '#fff',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                }
            }} />
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.05, delay: 0.05 }}
            className="">{width > 767 ? children : <MobileViewNotice />}</motion.div>
        </body>
    )
}
