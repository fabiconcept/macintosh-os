"use client";

import clsx from "clsx";
import Image from "next/image";
import useAppStore from "@/store";
import { BOX_HEIGHT, BOX_WIDTH, IconProps } from "@/constants";
import useAppWindows from "@/store/useAppWindows";

export default function Icon({
    src,
    alt,
    tooltip,
    id,
    windowType,
}: IconProps) {
    const { theme } = useAppStore();

    const { windows, addWindow, restoreWindow } = useAppWindows();

    const thisWindow = windows.find((window) => window.id === id);

    const isWindowOpen = !!thisWindow;

    const handleOpenWindow = () => {
        if (thisWindow?.isMinimized) {
            restoreWindow(id, );
            return;
        }
        if (isWindowOpen) return;

        const { innerWidth, innerHeight } = window;
        const screenWidth = innerWidth;
        const screenHeight = innerHeight;

        // Safe "mid" boundaries (e.g. 5% to 95% of screen)
        const minX = screenWidth * 0.05;
        const maxX = screenWidth * 0.95 - BOX_WIDTH;
        const minY = screenHeight * 0.05;
        const maxY = screenHeight * 0.95 - BOX_HEIGHT;

        const randomX = Math.floor(Math.random() * (maxX - minX) + minX);
        const randomY = Math.floor(Math.random() * (maxY - minY) + minY);

        addWindow({
            id,
            title: tooltip,
            position: { x: randomX, y: randomY },
            fixedLocation: "right",
            windowType,
            isMinimized: false,
        });

    };

    return (
        <div 
            onClick={handleOpenWindow}
            className="relative group cursor-pointer"
        >
            <Image 
                src={src} 
                alt={alt} 
                width={64} 
                height={64} 
                draggable={false}
                className={clsx(
                    "-mt-1 transition-all duration-300",
                    !isWindowOpen ? "group-hover:scale-110 group-active:scale-100 active:rotate-3 group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.25)]" : ""
                )}
            />

            <div
                className={clsx(
                    "absolute -top-[3.25rem] pointer-events-none left-1/2 -translate-x-1/2 border rounded-md px-3 py-0.5 inset-shadow-[0_0_0_0.5px] inset-shadow-foreground/30 group-hover:opacity-100 group-active:opacity-0 opacity-0 transition-all duration-300",
                    theme === "dark" && "border-background/80 bg-[#252525]",
                    theme === "light" && "border-foreground/30 bg-[#d8d8d8]"
                )}
            >
                <div
                    className={clsx(
                        "absolute left-1/2 -bottom-[0.36rem] -translate-x-1/2 w-3 h-3 rotate-45 inset-shadow-[0_0_0_0.5px] inset-shadow-foreground/30",
                        theme === "dark" && "border-b border-r border-background/80 bg-[#252525]",
                        theme === "light" && "border-b border-r border-foreground/30 bg-[#d8d8d8]"
                    )}
                    style={{
                        clipPath: "polygon(37% 37%, 100% 0, 100% 100%, 0% 100%)",
                    }}
                />
                <span className="text-sm capitalize">{tooltip}</span>
            </div>

            {isWindowOpen && <div
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-white/70"
            />}
        </div>
    )
}
