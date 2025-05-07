import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MobileViewNotice() {
    return (
        <div className="min-[767px]:hidden min-h-[calc(100vh)] flex flex-col">
            <div className="m-5 h-7 w-7 rounded-full grid place-items-center shadow-[0px_0px_5px] shadow-foreground/25 text-white bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700">
                <span className="drop-shadow-md inset-shadow text-sm font-semibold">FA</span>
            </div>

            <div className="m-5 mt-10 max-w-xl self-center rounded-2xl overflow-hidden shadow-[0px_5px_25px] shadow-foreground/10 border border-foreground/10">
                <Image
                    src="https://pickholder.sirv.com/Images/og-image.png"
                    alt="bg"
                    width={500}
                    height={500}
                    onContextMenu={(e) => {
                        e.preventDefault();  
                    }}
                    onContextMenuCapture={(e) => {
                        e.preventDefault();
                    }}
                    placeholder="blur"
                    blurDataURL="https://pickholder.sirv.com/Images/og-image.png"
                    draggable={false}
                    priority
                    className="object-cover w-full h-auto"
                />
            </div>

            <div className="mt-5 text-center px-10">
                <h1 className="text-2xl font-semibold leading-[1.2] mb-2">Not available on smaller screens 😓</h1>
                <p className="text-sm text-foreground/50">View full portfolio on the mobile version 👇</p>
            </div>

            <div className="px-5">
                <Link
                    href="https://fabiconcept.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 p-2 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl w-full flex items-center group shadow-[0px_5px_25px] shadow-foreground/10 hover:shadow-foreground/15 transition-all duration-300 active:scale-95 active:opacity-75"
                >
                    <div className="flex items-center gap-2">
                        <Image
                            src="/images/assets/70838932.jpeg"
                            alt="fabiconcept"
                            width={50}
                            height={50}
                            onContextMenu={(e) => {
                                e.preventDefault();  
                            }}
                            onContextMenuCapture={(e) => {
                                e.preventDefault();
                            }}
                            placeholder="blur"
                            blurDataURL="/images/assets/70838932.jpeg"
                            draggable={false}
                            priority
                            className="rounded-full"
                        />
                        <span className="text-white">fabiconcept.online</span>
                    </div>
                    <div className="h-[1px] ml-2 flex-1 bg-foreground/10 group-hover:bg-foreground/25 transition-all duration-300"></div>
                    <div className="h-7 w-7 rounded-full grid place-items-center bg-foreground/10 group-hover:bg-foreground/25 transition-all duration-300 group-hover:-rotate-12 group-active:scale-95 group-active:rotate-12">
                        <ArrowRight size={20} />
                    </div>
                </Link>
            </div>

            <div className="mt-20 flex-1 items-end p-5 justify-center">
                <p className="text-sm text-foreground/50">© {new Date().getFullYear()} Favour Ajokubi. All rights reserved.</p>
            </div>
        </div>
    )
}
