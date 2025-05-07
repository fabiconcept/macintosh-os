"use client";
import Image from "next/image";
import { Righteous } from "next/font/google";
import clsx from "clsx";
import { AnnoyedIcon, Github, Mail, Star } from "lucide-react";
import Link from "next/link";
import { languages } from "@/Constants/languages";
import useAppWindows from "@/store/useAppWindows";
import { BOX_HEIGHT, BOX_WIDTH, icons } from "@/Constants/constants";

const righteous = Righteous({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-righteous",
});

export default function Finder() {
    const { windows, addWindow, restoreWindow } = useAppWindows();

    const mailWindow = windows.find((window) => window.id === "mail");
    const isMailOpen = !!mailWindow;

    const mailConstant = icons.find((icon) => (icon.tooltip).toLocaleLowerCase() === "mail")!;

    const handleOpenContact = () => {
        if (isMailOpen) {
            if (mailWindow?.isMinimized) {
                restoreWindow("mail");
            }
            return;
        }

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
            id: mailConstant.id,
            title: mailConstant.tooltip,
            position: { x: randomX, y: randomY },
            fixedLocation: "right",
            windowType: mailConstant.windowType,
            isMinimized: false,
        });
    };

    return (
        <div className="p-2">
            <div className="flex items-center gap-2">
                <div className="h-24 w-24 rounded-full shrink-0 overflow-hidden border border-foreground/20">
                    <Image
                        src="/images/assets/70838932.jpeg"
                        alt="spotify"
                        width={500}
                        height={500}
                        priority
                        draggable={false}
                        className="select-none"
                    />
                </div>
                <div className="grid gap-1">
                    <h3 className={clsx(righteous.className, "text-2xl font-medium")}>Favour Tochukwu Ajokubi</h3>
                    <p className="text-sm opacity-80">
                        Developer of Joyful Web Realms, Breaker of Bugs, Explorer of Web3 Kingdoms, and Wielder of React Native&mdash;crafting magic, one line of code at a time.
                    </p>
                </div>

            </div>
            <div className="flex items-center gap-1 my-5">
                <Link title="Drop me a message anonymously" href="https://secret-room-orpin.vercel.app/ginvite/global-98cd99b7-bd7b-4942-a6b0-c16feff7f39b" target="_blank" rel="noopener noreferrer" className="bg-background flex items-center gap-1 justify-center flex-2 shadow-[0px_5px_25px_rgba(0,0,0,0.05)] px-5 py-3 text-sm rounded-full w-fit cursor-pointer hover:border-foreground/20 border border-foreground/5 active:scale-95 transition-all duration-300 active:opacity-75">
                    <AnnoyedIcon size={20} />
                    Anonymous Feedback
                </Link>
                <button onClick={handleOpenContact} title="Contact me" className="bg-background flex-1 flex items-center gap-1 justify-center shadow-[0px_5px_25px_rgba(0,0,0,0.05)] px-5 py-3 text-sm rounded-full w-fit cursor-pointer hover:border-foreground/20 border border-foreground/5 active:scale-95 transition-all duration-300 active:opacity-75">
                    <Mail size={20} />
                    Contact me
                </button>
                <Link href="https://github.com/fabiconcept/macintosh-os" target="_blank" rel="noopener noreferrer" title="Star this repo" className="bg-background shadow-[0px_5px_25px_rgba(0,0,0,0.05)] flex items-center justify-center px-5 py-3 text-sm rounded-full w-fit cursor-pointer hover:border-foreground/20 border border-foreground/5 active:scale-95 transition-all duration-300 active:opacity-75">
                    <Github size={20} />
                    <Star size={15} className="text-yellow-400 -ml-3" fill="oklch(85.2% 0.199 91.936)" />
                </Link>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-wrap gap-2 ">
                    {languages.map((language) => (
                        <div key={language.id} className="flex items-center justify-center gap-1 px-3 py-2 rounded-3xl bg-transparent hover:bg-background/30 transition-all duration-300 cursor-auto active:scale-95 active:opacity-75">
                            <Image
                                src={language.icon}
                                alt={language.name}
                                width={100}
                                height={100}
                                priority
                                placeholder="blur"
                                blurDataURL={language.icon}
                                className="h-6 w-auto object-contain drop-shadow-[0px_0px_2.5px_rgba(255,255,255,0.25)]"
                            />
                            <p className="text-sm">{language.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}