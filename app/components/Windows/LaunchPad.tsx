import Image from "next/image";
import { launchpadApps } from "@/Constants/constants";
import Link from "next/link";

export default function LaunchPad() {
    return (
        <div
            className="grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-2 gap-y-5 p-3"
        >
            {launchpadApps.map((app) => (
                <Link 
                    href={app.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title={`Check out my ${app.title}`} 
                    className="relative cursor-pointer w-full h-full aspect-square group" 
                    key={app.id}
                >
                    <Image
                        src={app.src}
                        alt={app.alt}
                        height={100}
                        priority
                        placeholder="blur"
                        blurDataURL={app.src}
                        width={100}
                        draggable={false}
                        className="object-contain aspect-square h-full w-full group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-active:scale-95 transition-all duration-300"
                    />
                    <p className="text-center text-xs -mt-1 group-hover:opacity-50 transition-opacity duration-300">{app.title}</p>
                </Link>
            ))}
        </div>
    )
}
