"use client";
import Image from "next/image";
import useAppStore from "@/store";
import clsx from "clsx";

export default function Bg() {
    const { theme } = useAppStore();
    return (
        <div className="fixed inset-0">
            <Image 
                src="/images/bg.jpg" 
                alt="bg" 
                fill 
                className={clsx(
                    theme === "dark" && "brightness-50 -contrast-50"
                )} 
            />
        </div>
    )
}
