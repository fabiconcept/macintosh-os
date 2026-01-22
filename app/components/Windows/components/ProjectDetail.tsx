import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/Constants/projects';
import { ArrowLeft, ExternalLink, Globe, Calendar, Code, Layers, Info } from 'lucide-react';
import useSoundEffect from "@useverse/usesoundeffect";

interface ProjectDetailProps {
    selectedProject: Project;
    handleBack: () => void;
    handleVisitProject: () => void;
}

// macOS-style spring transition
const springTransition = {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
    mass: 0.8
  };
  
  // Animation variants for the slide transitions
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

export default function ProjectDetail({
    selectedProject,
    handleBack,
    handleVisitProject
}: ProjectDetailProps) {
    const linkHoverSound = useSoundEffect("/audio/link-hover.mp3", {
        volume: 0.15,
    });

    return (
        <motion.div
            key="detail"
            initial={slideVariants.detailEnterFromRight}
            animate={slideVariants.detailCenter}
            exit={slideVariants.detailExitToRight}
            transition={springTransition}
            className="absolute inset-0"
          >
            <div className="">
              {/* Header with back button */}
              <div className="sticky top-0 left-0 pb-3 z-10 flex items-center justify-between w-full">
                <motion.button
                  onClick={handleBack}
                  className="flex items-center aspect-square gap-2 px-3 py-2.5 bg-white/8 backdrop-blur-xl rounded-full border border-white/15 text-white font-medium transition-all duration-200 cursor-pointer"
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: "rgba(255,255,255,0.12)"
                  }}
                  title="Return to Projects"
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft size={18} />
                </motion.button>
                <motion.button
                  onClick={handleVisitProject}
                  className="flex items-center aspect-square gap-2 px-3 py-2.5 bg-white/8 backdrop-blur-xl rounded-full border border-white/15 text-white font-medium transition-all duration-200 cursor-pointer"
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: "rgba(255,255,255,0.12)"
                  }}
                  title="Visit Project"
                  onMouseEnter={() => linkHoverSound.play()}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink size={18} />
                </motion.button>
              </div>

              {/* Project image */}
              <div className="relative w-full aspect-video rounded overflow-hidden mb-4 shadow-2xl bg-black/20">
                <img
                  src={selectedProject.src}
                  alt={selectedProject.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Project details */}
              <div className="flex flex-wrap gap-8 p-6">
                {/* Main content */}
                <div className="flex-1 min-w-md space-y-8">
                  <div>
                    <h1 className="text-2xl font-semibold text-white mb-1 tracking-tight">
                      {selectedProject.name}
                    </h1>
                    <p className="text-blue-300 mb-4 opacity-80 font-medium">
                      {selectedProject.type}
                    </p>
                    <p className="text-gray-300 leading-relaxed opacity-80">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <Layers size={24} className="text-blue-400" />
                      Key Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedProject.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                        >
                          <span className="text-gray-300 text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6 w-full max-w-sm">
                  {/* Project info */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
                    <h3 className="text-lg font-semibold text-white mb-3 opacity-80"><Info /> Project Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/8 rounded-lg border border-white/10 flex items-center justify-center">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 font-medium">Year</p>
                          <p className="text-white font-semibold">{selectedProject.year}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/8 rounded-lg border border-white/10 flex items-center justify-center">
                          <Globe size={18} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 font-medium">Category</p>
                          <p className="text-white font-semibold">{selectedProject.category}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
                    <h3 className="text-lg font-semibold text-white mb-3 opacity-80 flex items-center gap-2">
                      <Code size={20} className="text-green-400" />
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-white/8 rounded-lg border border-white/10 text-white text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
    )
}
