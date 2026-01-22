"use client"
import Image from "next/image";
import { projects } from "@/Constants/projects";
import { motion, AnimatePresence } from 'framer-motion';
import Link from "next/link";
import { useState } from "react";
import { Project } from "@/Constants/projects";
import ProjectDetail from "./components/ProjectDetail";
import useSoundEffect from "@useverse/usesoundeffect";

const springTransition = {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
    mass: 0.8
};

const slideVariants = {
    // Grid view animations
    gridInitial: { x: 0 },
    gridExitToLeft: { x: '-100%' },
    gridEnterFromLeft: { x: '-100%' },
    gridCenter: { x: 0 },

    // Detail view animations
    detailEnterFromRight: { x: '100%' },
    detailCenter: { x: 0 },
    detailExitToRight: { x: '100%' }
};

export default function Projects() {
    const clickSound = useSoundEffect("/audio/mouse-click.mp3", {
        volume: 0.1,
    });
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleProjectClick = (project: Project) => {
        clickSound.play();
        setSelectedProject(project);
    };

    const handleBack = () => {
        setSelectedProject(null);
    };

    const handleVisitProject = () => {
        if (!selectedProject) return;
        clickSound.play();
        window.open(selectedProject.url, '_blank', 'noopener,noreferrer');
    };
    return (
        <div className="relative w-full min-h-screen h-full">
            <AnimatePresence>
                {!selectedProject ? (
                    <motion.div
                        key="grid"
                        initial={slideVariants.gridEnterFromLeft}
                        animate={slideVariants.gridCenter}
                        exit={slideVariants.gridExitToLeft}
                        transition={springTransition}
                        className="absolute inset-0"
                    >
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3 mx-auto">
                            {projects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    onClick={() => handleProjectClick(project)}
                                    className="grid group place-items-center w-full aspect-video group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden relative cursor-pointer select-none border border-white/10 shadow-[0px_10px_40px_rgba(0,0,0,0.3)]"
                                    whileHover={{
                                        scale: 1.02,
                                        y: -4,
                                        boxShadow: "0px 20px 60px rgba(0,0,0,0.4)"
                                    }}
                                    whileTap={{
                                        scale: 0.98,
                                        transition: { duration: 0.1 }
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <img
                                        src={project.src}
                                        alt={project.alt}
                                        className="object-cover w-full min-h-full transition-transform duration-700 group-hover:scale-110"
                                        onContextMenu={(e) => e.preventDefault()}
                                    />
                                    <div className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out w-full h-full bg-gradient-to-b from-transparent/20 via-black/60 to-black/90 grid place-items-center">
                                        <div className="flex flex-col gap-3 text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                            <h3 className="text-2xl font-bold px-10">{project.name}</h3>
                                            <p className="text-sm opacity-90 px-5 font-medium text-blue-300">{project.type}</p>
                                            <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                                                <span className="text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm group-hover:bg-blue-500">
                                                    Click to explore
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <ProjectDetail
                        selectedProject={selectedProject}
                        handleBack={handleBack}
                        handleVisitProject={handleVisitProject}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
