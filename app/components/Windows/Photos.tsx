import { Globe, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cssArt, graphicDesign } from "@/Constants/art";
import clsx from "clsx";

export default function Photos() {
    return (
        <div className="grid gap-2">
            <div className="grid gap-2 p-2">
                <p>My Recent Graphic Design</p>
                <div className="grid graphic-design-grid gap-3 mt-2">
                    {graphicDesign.map((design) => (
                        <div key={design.id} className={clsx(design.id, "flex flex-col")}>
                            <div className="bg-purple-500/20 rounded-xl overflow-hidden flex-1 group relative">
                                <Image
                                    src={design.src}
                                    alt={design.alt}
                                    width={250}
                                    height={250}
                                    draggable={false}
                                    priority
                                    onContextMenu={(e) => {
                                        e.preventDefault();  
                                    }}
                                    onContextMenuCapture={(e) => {
                                        e.preventDefault();
                                    }}
                                    placeholder="blur"
                                    blurDataURL={design.src}
                                    className="object-cover w-full h-full"
                                />
                                <Link href={design.url} target="_blank" rel="noopener noreferrer" className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.5)] to-[rgba(0,0,0)] grid place-items-center group-hover:translate-y-2 transition-all duration-300 cursor-pointer translate-y-full">
                                    <div className="flex items-center gap-1 p-5 text-white">
                                        <Instagram size={50} />
                                    </div>
                                </Link>
                            </div>
                            <p className="my-2 text-sm">{design.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div
                className="h-[1px] bg-foreground/10 mx-2"
            />
            <div className="grid gap-2 p-2">
                <p>Art Made with CSS</p>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 mt-2">
                    {cssArt.map((art) => (
                        <div key={art.id}>
                            <div className="aspect-square rounded-xl overflow-hidden relative group active:scale-95 active:opacity-75 transition-all duration-300 border border-purple-500/20 hover:border-purple-500">
                                <Image
                                    src={art.src}
                                    alt={art.alt}
                                    width={250}
                                    height={250}
                                    draggable={false}
                                    priority
                                    onContextMenu={(e) => {
                                        e.preventDefault();  
                                    }}
                                    onContextMenuCapture={(e) => {
                                        e.preventDefault();
                                    }}
                                    placeholder="blur"
                                    blurDataURL={art.src}
                                    className="object-cover w-full h-full"
                                />
                                <Link href={art.url} target="_blank" rel="noopener noreferrer" className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.5)] to-[rgba(0,0,0)] grid place-items-center group-hover:translate-y-2 transition-all duration-300 cursor-pointer translate-y-full">
                                    <div className="flex items-center gap-1 p-5 text-white">
                                        <Globe size={50} />
                                    </div>
                                </Link>
                            </div>
                            <p className="my-2 text-sm">{art.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}