"use client";
import React, { useCallback, useState } from 'react';
import {
  DndContext,
  useDraggable,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from '@dnd-kit/core';
import useAppWindows, { AppWindow } from '@/store/useAppWindows';
import { BOX_HEIGHT, BOX_WIDTH } from '@/constants';
import { LucideMaximize2, LucideMinus, LucideX } from 'lucide-react';
import Spotify from '../Windows/Spotify';
import LaunchPad from '../Windows/LaunchPad';
import { motion } from 'framer-motion';
import Terminal from '../Windows/Terminal';
import clsx from 'clsx';
import Mail from '../Windows/Mail';
import Setting from '../Windows/Setting';
import Projects from '../Windows/Projects';


const EDGE_PADDING = 0;
const EDGE_THRESHOLD = 20;
const TOP_OFFSET = 45; // Updated offset

const getEdgePosition = (
  x: number,
  y: number,
  screenWidth: number,
  screenHeight: number
): string => {
  const atLeft = x <= EDGE_THRESHOLD;
  const atRight = x >= screenWidth - BOX_WIDTH - EDGE_THRESHOLD;
  const atTop = y <= TOP_OFFSET + EDGE_THRESHOLD; // Adjusted to count offset
  const atBottom = y >= screenHeight - BOX_HEIGHT - EDGE_THRESHOLD;

  if (atTop && atLeft) return 'top left';
  if (atTop && atRight) return 'top right';
  if (atBottom && atLeft) return 'bottom left';
  if (atBottom && atRight) return 'bottom right';
  if (atTop) return 'top';
  if (atBottom) return 'bottom';
  if (atLeft) return 'left';
  if (atRight) return 'right';

  return 'center';
};

const DraggableBox = ({
  position,
  windowProps,
}: {
  position: { x: number; y: number };
  windowProps: AppWindow;
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: 'box',
  });

  const { reorderToTop, removeWindow, minimizeWindow } = useAppWindows();

  const appliedX = position.x + (transform?.x || 0);
  const appliedY = position.y + (transform?.y || 0);

  const style: React.CSSProperties = {
    transform: `translate3d(${appliedX}px, ${appliedY}px, 0)`,
    transition: isDragging ? 'none' : 'transform 0.3s ease',
  };

  const handleClose = () => {
    removeWindow(windowProps.id);
  }

  const handleMinimize = () => {
    minimizeWindow(windowProps.id, position);
  }

  const WindowToRender = useCallback(() => {
    switch (windowProps.windowType) {
      case 'spotify':
        return <Spotify />;
      case 'launchpad':
        return <LaunchPad />;
      case 'terminal':
        return <Terminal />;
      case 'mail':
        return <Mail />;
      case 'settings':
        return <Setting />;
      case 'downloads':
        return <Projects />;
      default:
        return <div>Window not found</div>;
    }
  }, [windowProps.windowType]);

  const canMinimize = windowProps.windowType !== 'terminal';
  const canMaximize = windowProps.windowType !== 'terminal';



  return (
    <div
      ref={setNodeRef}
      className="fixed z-50 w-[550px] h-[400px] bg-background/80 backdrop-blur-md shadow-xl border border-foreground/30 rounded-2xl overflow-hidden flex flex-col"
      style={style}
      onClick={() => reorderToTop(windowProps.id)}
    >
      <div
        className="handle cursor-move p-2 font-semibold rounded-t-lg relative border-b border-foreground/30 w-full z-10 bg-background/20"
      >
        <div className='flex items-center gap-1 absolute top-1/2 -translate-y-1/2 left-3 group'>
          <div
            title='Close window'
            onClick={handleClose}
            className='cursor-pointer h-4 w-4 rounded-full grid place-items-center bg-red-400'
          ><LucideX size={10} className='text-black group-hover:opacity-100 opacity-0 transition-opacity duration-300' /></div>
          <div
            title='Minimize window'
            onClick={canMinimize ? handleMinimize : undefined}
            className={clsx(
                'h-4 w-4 rounded-full grid place-items-center bg-yellow-400',
                canMinimize ? 'cursor-pointer grayscale-0' : 'grayscale brightness-50 hidden'
            )}
          ><LucideMinus size={10} className={clsx(
            'text-black transition-opacity duration-300',
            canMinimize ? 'group-hover:opacity-100 opacity-0' : 'opacity-0'
          )} /></div>
          <div
            title='Maximize window'
            onClick={canMaximize ? () => {} : undefined}
            className={clsx(
                'h-4 w-4 rounded-full grid place-items-center bg-green-400',
                canMaximize ? 'cursor-pointer grayscale-0 opacity-100' : 'grayscale brightness-50 opacity-0 hidden'
            )}
          ><LucideMaximize2 size={10} className={clsx(
            'text-black transition-opacity duration-300',
            canMaximize ? 'group-hover:opacity-100 opacity-0' : 'opacity-0'
          )} /></div>
        </div>
        <div
          {...listeners}
          {...attributes}
          className='text-center select-none'
        >
          <span className='pointer-events-none'>{windowProps.title}</span>
        </div>
      </div>
      {windowProps.windowType !== 'terminal' ? <motion.div
            initial={{ opacity: 0, scale: 2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15, delay: 0.05, ease: "easeOut" }}
            className='p-2 max-h-full overflow-y-auto launchpad-container pb-4 flex-1'
        >
        <WindowToRender />
      </motion.div> : <><WindowToRender /></>}
    </div>
  );
};

const DraggableContainer = ({ windowProps }: { windowProps: AppWindow }) => {
  const [position, setPosition] = useState({ x: windowProps.position.x, y: windowProps.position.y < TOP_OFFSET ? TOP_OFFSET : windowProps.position.y });

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { delta } = event;
    const { innerWidth, innerHeight } = window;

    const newX = Math.min(
      Math.max(EDGE_PADDING, position.x + delta.x),
      innerWidth - BOX_WIDTH - EDGE_PADDING
    );

    const newY = Math.min(
      Math.max(TOP_OFFSET, position.y + delta.y), // uses TOP_OFFSET as minimum
      innerHeight - BOX_HEIGHT - EDGE_PADDING
    );

    setPosition({ x: newX, y: newY });

    const edge = getEdgePosition(newX, newY, innerWidth, innerHeight);
    if (edge !== 'center') {
      console.log(`Box touched the ${edge} edge`);
    }
  };

  const variants = {
    hidden: {
      scale: 0.9,
      opacity: 0,
      y: 30,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
      },
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
      },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      y: 30,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.15, ease: "easeOut" }}
      variants={variants}
    >
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <DraggableBox position={position} windowProps={windowProps} />
      </DndContext>
    </motion.div>
  );
};

export default DraggableContainer;