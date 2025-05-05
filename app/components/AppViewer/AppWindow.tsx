"use client";
import React, { useState } from 'react';
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

  const { reorderToTop, removeWindow } = useAppWindows();

  const appliedX = position.x + (transform?.x || 0);
  const appliedY = position.y + (transform?.y || 0);

  const style: React.CSSProperties = {
    transform: `translate3d(${appliedX}px, ${appliedY}px, 0)`,
    transition: isDragging ? 'none' : 'transform 0.3s ease',
  };

  const handleClose = () => {
    removeWindow(windowProps.id);
  }

  const WindowToRender = ()=> {
    switch (windowProps.windowType) {
      case 'spotify':
        return <Spotify />;
      default:
        return <div>Window not found</div>;
    }
  };

  return (
    <div
      ref={setNodeRef}
      className="fixed z-50 w-[550px] h-[400px] bg-background/70 backdrop-blur-md shadow-xl border border-foreground/30 rounded-2xl overflow-hidden"
      style={style}
      onClick={() => reorderToTop(windowProps.id)}
    >
      <div
        className="handle cursor-move p-2 font-semibold rounded-t-lg relative border-b border-foreground/30"
      >
        <div className='flex items-center gap-1 absolute top-1/2 -translate-y-1/2 left-3 group'>
          <div 
            title='Close window'
            onClick={handleClose}
            className='cursor-pointer h-4 w-4 rounded-full grid place-items-center bg-red-400'
          ><LucideX size={10} className='text-black group-hover:opacity-100 opacity-0 transition-opacity duration-300' /></div>
          <div 
            title='Minimize window'
            className='cursor-pointer h-4 w-4 rounded-full grid place-items-center bg-yellow-400'
          ><LucideMinus size={10} className='text-black group-hover:opacity-100 opacity-0 transition-opacity duration-300' /></div>
          <div 
            title='Maximize window'
            className='cursor-pointer h-4 w-4 rounded-full grid place-items-center bg-green-400'
          ><LucideMaximize2 size={10} className='text-black group-hover:opacity-100 opacity-0 transition-opacity duration-300' /></div>
        </div>
        <div 
          {...listeners}
          {...attributes}
          className='text-center select-none'
        >
          <span className='pointer-events-none'>{windowProps.title}</span>
        </div>
      </div>
      <div className='p-2'>
        <WindowToRender />
      </div>
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

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <DraggableBox position={position} windowProps={windowProps} />
    </DndContext>
  );
};

export default DraggableContainer;