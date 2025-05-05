"use client";

import AppWindow from "./AppWindow";
import { AppViewerProvider } from ".";
import useAppWindows from "@/store/useAppWindows";

export default function AppWindows() {
    const { windows } = useAppWindows();
    return (
        <AppViewerProvider>
            {windows.map((window) => (
                <AppWindow key={window.id} windowProps={window} />
            ))}
        </AppViewerProvider>
    )
}
