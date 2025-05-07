"use client";

import useAppStore from "@/store";
import clsx from "clsx";
import { LucideMail } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
    const { timeFormat } = useAppStore();
    
    const [time, setTime] = useState(() => {
        if (timeFormat === "12") {
            return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        } else {
            return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        }
    });

    useEffect(() => {
        if (timeFormat === "12") {
            setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
        } else {
            setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
        }
    }, [timeFormat]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (timeFormat === "12") {
                setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
            } else {
                setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [timeFormat]);

    return (
        <div 
            className={clsx(
                "fixed top-0 left-0 z-[999] w-[100dvw] py-2 px-10 backdrop-blur-lg",
                "bg-background/50 border-b border-foreground/30"
            )}
        >
            <div className="w-full flex items-center justify-between">
                <Link 
                    href="https://fabiconcept.online" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Go to my main website" 
                    className="flex items-center gap-2 group"
                >
                    <div className="h-7 w-7 rounded-full grid place-items-center shadow-[0px_0px_5px] shadow-foreground/25 text-white bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700">
                        <span className="drop-shadow-md inset-shadow text-sm font-semibold">FA</span>
                    </div>
                    <p className={clsx(
                        "text-base font-medium relative",
                        "after:absolute after:-bottom-0.5 after:h-[1.5px] after:w-3 after:bg-foreground after:left-0",
                        "group-hover:after:w-full after:transition-all after:duration-300 group-hover:after:opacity-50"
                    )}>Favour Tochukwu Ajokubi</p>
                </Link>
                <div className="flex items-center gap-5">
                    <Link href="mailto:fabiconceptdev@gmail.com" target="_blank" rel="noopener noreferrer" className="text-sm group relative">
                        <p className={clsx(
                            "flex items-center gap-1",
                            "after:absolute after:-bottom-0.5 after:h-[1.5px] after:w-[0.925rem] after:bg-foreground after:left-0",
                            "group-hover:after:w-full after:transition-all after:duration-300 group-hover:after:opacity-50"
                        )}>
                            <LucideMail 
                                size={15} 
                                className="text-foreground opacity-100 group-hover:opacity-80"
                            />
                            <span className="opacity-80 group-hover:opacity-100 font-medium">fabiconceptdev@gmail.com</span>
                        </p>
                    </Link>
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'long' })}</p>
                        <div className="w-[1px] h-4 bg-foreground/30"></div>
                        <p className="font-medium text-sm">{time}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
