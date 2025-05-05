"use client";

import AppWindow from "./AppWindow";
import { AppViewerProvider } from ".";
import useAppWindows from "@/store/useAppWindows";
import { AnimatePresence } from 'framer-motion';

export default function AppWindows() {
    const { windows } = useAppWindows();
    return (
        <AppViewerProvider>
            <AnimatePresence>
                {windows.map((window) => (
                    window.isMinimized ? null : <AppWindow key={window.id} windowProps={window} />
                ))}
            </AnimatePresence>
        </AppViewerProvider>
    )
}
