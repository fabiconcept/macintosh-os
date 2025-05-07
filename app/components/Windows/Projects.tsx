import Image from "next/image";
import { projects } from "@/Constants/projects";
import Link from "next/link";

export default function Projects() {
    return (
        <div className="grid gap-4">
            {projects.map((project) => (
                <Link href={project.url} target="_blank" rel="noopener noreferrer" key={project.id} className="grid place-items-center w-full aspect-video group bg-background/60 rounded-2xl overflow-hidden relative active:opacity-75 active:scale-[0.97] transition-all duration-300 select-none border border-foreground/20 shadow-[0px_5px_25px_rgba(0,0,0,0.15)]">
                    <Image
                        src={project.src}
                        alt={project.alt}
                        width={1000}
                        priority
                        placeholder="blur"
                        onContextMenu={(e) => {
                            e.preventDefault();  
                        }}
                        onContextMenuCapture={(e) => {
                            e.preventDefault();
                        }}
                        blurDataURL={project.src}
                        height={1000}
                        className="object-cover w-full min-h-full"
                    />
                    <div className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-all duration-300 cursor-pointer w-full h-full bg-gradient-to-b from-transparent/20 via-[rgba(0,0,0,0.5)] to-[rgba(0,0,0)] grid place-items-center">
                        <div className="flex flex-col gap-2 text-center text-white">
                            <h3 className="text-2xl font-semibold px-10">{project.name}</h3>
                            <p className="text-sm opacity-80 px-5">{project.type}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
