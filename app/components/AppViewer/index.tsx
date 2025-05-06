// AppViewerContext.tsx
"use client";
import useAppWindows from "@/store/useAppWindows";
import clsx from "clsx";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface AppViewerContextValues {
  containerDimensions: { width: number; height: number };
}

const AppViewerContext = createContext<AppViewerContextValues | null>(null);

export const useAppViewer = () => {
  const context = useContext(AppViewerContext);
  if (!context) throw new Error("useAppViewer must be used within AppViewerProvider");
  return context;
};

export const AppViewerProvider = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { windows } = useAppWindows();
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      setContainerDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);

  return (
    <AppViewerContext.Provider value={{ containerDimensions }}>
      <div className={clsx(
          "fixed top-0 left-0 h-screen w-screen",
          windows.filter((window) => !window.isMinimized).length > 0 ? "" : "pointer-events-none"
        )}>
        <div className="relative h-full w-full" ref={containerRef}>
          {children}
        </div>
      </div>
    </AppViewerContext.Provider>
  );
};
