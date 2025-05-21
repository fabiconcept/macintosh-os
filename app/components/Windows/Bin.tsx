"use client";
import Image from "next/image";
import { Trash, trash } from "@/Constants/trash";
import { downloadHandler } from "@/util";
import toast from "react-hot-toast";
import useSoundEffect from "@useverse/usesoundeffect";

export default function Bin() {
    const clickSound = useSoundEffect("/audio/mouse-click.mp3", {
        volume: 0.1,
    });
    const downloadSound = useSoundEffect("/audio/email-sent.mp3", {
        volume: 0.1,
    });

    const handleDoubleClick = async (item: Trash) => {
        if (!item.downloadable) return;

        const promise = downloadHandler({
            fileUrl: item.downloadURL!,
            fileName: item.name
        });

        toast.promise(promise, {
            loading: "Downloading...",
            success: () => {
                downloadSound.play();
                return "Downloaded successfully";
            },
            error: "Failed to download"
        })
    }
    return (
        <div className="p-2 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3">
            {trash.map((item) => (
                <button 
                    onDoubleClick={() => handleDoubleClick(item)} 
                    title="Double click to download" 
                    key={item.id} 
                    onClick={() => clickSound.play()}
                    draggable
                    className="flex flex-col gap-2 cursor-pointer items-center group p-1 rounded-lg"
                >
                    <div className="p-1 rounded-lg group-focus:bg-foreground/5 group-hover:bg-foreground/2 w-[100px]">
                        <Image
                            src={item.icon}
                            alt={item.name}
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
                            blurDataURL={item.icon}
                            className="object-contain w-full h-full"
                        />
                    </div>
                    <p className="text-center text-sm opacity-75 group-hover:opacity-100 group-focus:bg-blue-600 group-focus:text-white w-fit mx-auto px-1 rounded group-focus:opacity-100 transition-all duration-300">{item.name}</p>
                </button>
            ))}
        </div>
    )
}