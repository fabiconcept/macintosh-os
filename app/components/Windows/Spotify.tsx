import Image from "next/image";
import { Righteous } from "next/font/google";
import clsx from "clsx";
import { topArtists } from "@/constants";
import { Play } from "lucide-react";
import Link from "next/link";

const righteous = Righteous({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-righteous",
});

export default function Spotify() {
    return (
        <div className="grid gap-2 bg-gradient-to-b from-[rgba(248,216,160)]/10 via-[rgba(248,216,160)]/5 to-background">
            <div className="bg-[rgb(248,216,160)] p-4 relative flex items-center gap-3">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.5)]"></div>
                <Image
                    src="/images/assets/ab6775700000ee8506ab9e5f16d551fa2e4c59d2.jpeg"
                    alt="spotify"
                    width={100}
                    height={100}
                    className="rounded-full shadow-[0px_5px_25px_rgba(0,0,0,0.35)] relative z-10"
                />
                <div className="flex flex-col gap-2 relative z-10">
                    <span className={clsx(righteous.className, "text-3xl text-white")}>Fabiconcept</span>
                    <Link target="_blank" rel="noopener noreferrer" href="https://open.spotify.com/user/31jn27rgx5y4azikzdxv6xuhiylq?si=9912e8b0b6db4a4e" className="bg-white shadow-[0px_5px_25px_rgba(0,0,0,0.15)] px-5 py-2 text-sm rounded-full w-fit text-black cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 active:opacity-75">
                        Follow
                    </Link>
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-3 p-2">
                <span>Top Artists</span>    
                <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
                    {topArtists.map((artist) => (
                        <Link key={artist.id} target="_blank" rel="noopener noreferrer" href={artist.url} className="flex flex-col gap-2 p-3 hover:bg-background/70 rounded-lg bg-transparent transition-all duration-300 cursor-pointer">
                            <div className="relative group">
                                <Image
                                    src={artist.src}
                                    alt={artist.alt}
                                    width={100}
                                height={100}
                                className="select-none w-full aspect-square rounded-full shadow-[0px_5px_25px_rgba(0,0,0,0.35)] relative z-10"
                            />
                            <div 
                                className="absolute bottom-0 right-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-2 opacity-0 w-12 h-12 z-10 rounded-full bg-green-500 grid place-items-center group-active:scale-95 group-active:rotate-12 group-active:-translate-y-1">
                                <Play fill="black" size={20} className="text-black"/>
                            </div>
                        </div>
                        <p className="text-center text-sm">{artist.name}</p>
                    </Link>
                    ))}
                </div>            
            </div>

            <p className="text-center opacity-75 text-sm">
                Yes, I've got shit music in my playlist
            </p>
        </div>
    )
}