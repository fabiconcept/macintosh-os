"use client";
import React, { useCallback, useState, useRef, useEffect } from 'react';
import {
  DndContext,
  useDraggable,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from '@dnd-kit/core';
import useAppWindows, { AppWindow } from '@/store/useAppWindows';
import { BOX_HEIGHT, BOX_WIDTH, launchpadApps } from '@/Constants/constants';
import { LucideMaximize2, LucideMinus, LucideX } from 'lucide-react';
import Spotify from '../Windows/Spotify';
import LaunchPad from '../Windows/LaunchPad';
import { motion } from 'framer-motion';
import Terminal from '../Windows/Terminal';
import clsx from 'clsx';
import Mail from '../Windows/Mail';
import Setting from '../Windows/Setting';
import Projects from '../Windows/Projects';
import Photos from '../Windows/Photos';
import Finder from '../Windows/Finder';
import Bin from '../Windows/Bin';
import useSoundEffect from '@useverse/usesoundeffect';
import { useFocusTrap } from '@/util/Hooks/useFocusTrap';
import Test from '../Windows/Test';
import IOSPaint from '../Windows/IOSPaint';
import useShortcuts from '@useverse/useshortcuts';

const EDGE_PADDING = 2;
const EDGE_THRESHOLD = 20;
const TOP_OFFSET = 45;
const MIN_WIDTH = 300;
const MIN_HEIGHT = 200;

const getEdgePosition = (
  x: number,
  y: number,
  width: number,
  height: number,
  screenWidth: number,
  screenHeight: number
): string => {
  const atLeft = x <= EDGE_THRESHOLD;
  const atRight = x >= screenWidth - width - EDGE_THRESHOLD;
  const atTop = y <= TOP_OFFSET + EDGE_THRESHOLD;
  const atBottom = y >= screenHeight - height - EDGE_THRESHOLD;

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
  size,
  windowProps,
  onResize,
  onMaximize,
  isMaximized,
  isFocused,
}: {
  position: { x: number; y: number };
  size: { width: number; height: number };
  windowProps: AppWindow;
  onResize: (newSize: { width: number; height: number }) => void;
  onMaximize: () => void;
  isMaximized: boolean;
  isFocused: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: 'box',
  });

  const { reorderToTop, removeWindow, minimizeWindow } = useAppWindows();
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  // Use the focus trap hook - only active when this window is focused
  const focusTrapRef = useFocusTrap(isFocused);

  const appliedX = position.x + (transform?.x || 0);
  const appliedY = position.y + (transform?.y || 0);

  const exitSound = useSoundEffect("/audio/ui-close.mp3", {
    volume: 0.2,
  });
  const minimizeSound = useSoundEffect("/audio/minimize.mp3", {
    volume: 0.1,
  });

  const style: React.CSSProperties = {
    transform: `translate3d(${appliedX}px, ${appliedY}px, 0)`,
    transition: isDragging || isResizing ? 'none' : 'transform 0.3s ease, width 0.3s ease, height 0.3s ease',
    width: size.width,
    height: size.height,
  };

  const handleClose = () => {
    exitSound.play();
    removeWindow(windowProps.id);
  };

  const handleMinimize = () => {
    minimizeSound.play();
    minimizeWindow(windowProps.id, position);
  };

  const handleMaximize = () => {
    onMaximize();
  };

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    setIsResizing(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
  };

  useShortcuts({
    shortcuts: [
      { key: 'W', ctrlKey: true, enabled: (isFocused && !isDragging && !isResizing) },
      { key: 'F', ctrlKey: true, altKey: true, platformAware: true, enabled: (isFocused && !isDragging && !isResizing) },
      { key: 'M', ctrlKey: true, altKey: true, platformAware: true, enabled: (isFocused && !isDragging && !isResizing) },
    ],
    onTrigger: (shortcut) => {
      switch (shortcut.key) {
        case 'W':
          handleClose();
          break;
        case 'F':
          handleMaximize();
          break;
        case 'F':
          handleMaximize();
          break;
      }
    }
  }, [isFocused, isResizing, isDragging, isMaximized]);

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;

    const deltaX = e.clientX - resizeStart.x;
    const deltaY = e.clientY - resizeStart.y;
    const { innerWidth, innerHeight } = window;

    let newWidth = resizeStart.width;
    let newHeight = resizeStart.height;

    // Calculate max dimensions based on current position and edge padding
    const maxWidth = innerWidth - position.x - EDGE_PADDING;
    const maxHeight = innerHeight - position.y - EDGE_PADDING;

    switch (isResizing) {
      case 'right':
        newWidth = Math.min(Math.max(MIN_WIDTH, resizeStart.width + deltaX), maxWidth);
        break;
      case 'bottom':
        newHeight = Math.min(Math.max(MIN_HEIGHT, resizeStart.height + deltaY), maxHeight);
        break;
      case 'bottom-right':
        newWidth = Math.min(Math.max(MIN_WIDTH, resizeStart.width + deltaX), maxWidth);
        newHeight = Math.min(Math.max(MIN_HEIGHT, resizeStart.height + deltaY), maxHeight);
        break;
      case 'bottom-left':
        newWidth = Math.min(Math.max(MIN_WIDTH, resizeStart.width - deltaX), maxWidth);
        newHeight = Math.min(Math.max(MIN_HEIGHT, resizeStart.height + deltaY), maxHeight);
        break;
    }

    onResize({ width: newWidth, height: newHeight });
  }, [isResizing, resizeStart, position, onResize]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(null);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      return () => {
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [isResizing, handleResizeMove, handleResizeEnd]);

  const WindowToRender = useCallback(() => {
    switch (windowProps.windowType) {
      case 'spotify':
        return <Spotify />;
      case 'launchpad':
        return <LaunchPad apps={launchpadApps} />;
      case 'terminal':
        return <Terminal />;
      case 'mail':
        return <Mail />;
      case 'settings':
        return <Setting />;
      case 'downloads':
        return <Projects />;
      case 'photos':
        return <Photos />;
      case 'finder':
        return <Finder />;
      case 'bin':
        return <Bin />;
      case 'test':
        return <Test />;
      case 'iospaint':
        return <IOSPaint />;
      default:
        return <div>Window not found</div>;
    }
  }, [windowProps.windowType]);

  const canMinimize = windowProps.windowType !== 'terminal';
  const canMaximize = windowProps.windowType !== 'terminal';

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        if (focusTrapRef.current !== node) {
          focusTrapRef.current = node;
        }
      }}
      className={clsx(
        "fixed z-50 bg-background/80 shadow-xl border border-foreground/30 rounded-2xl overflow-hidden flex flex-col",
        isResizing && "select-none",
      )}
      style={style}
      onClick={() => reorderToTop(windowProps.id)}
      tabIndex={-1} // Make container focusable but not in tab order
    >
      <div className="relative min-h-full overflow-hidden pb-10">
        <div className="absolute top-0 left-0 w-full h-full with-lg backdrop-blur-[4px] -z-10"></div>
      {/* Resize handles */}
      {!isMaximized && (
        <>
          {/* Right edge */}
          <div
            className="absolute top-0 right-0 w-1 h-full cursor-ew-resize z-20 hover:bg-blue-500/20 transition-colors"
            onMouseDown={(e) => handleResizeStart(e, 'right')}
          />
          {/* Bottom edge */}
          <div
            className="absolute bottom-0 left-0 w-full h-1 cursor-ns-resize z-20 hover:bg-blue-500/20 transition-colors"
            onMouseDown={(e) => handleResizeStart(e, 'bottom')}
          />
          {/* Bottom-right corner */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nw-resize z-30 hover:bg-blue-500/30 transition-colors"
            onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
          />
          {/* Bottom-left corner */}
          <div
            className="absolute bottom-0 left-0 w-4 h-4 cursor-ne-resize z-30 hover:bg-blue-500/30 transition-colors"
            onMouseDown={(e) => handleResizeStart(e, 'bottom-left')}
          />
        </>
      )}

      <div className="handle cursor-move font-semibold rounded-t-lg relative border-b border-foreground/30 w-full z-10 bg-background/20">
        <div className='flex items-center gap-1 absolute top-1/2 -translate-y-1/2 left-3 group'>
          <div
            title='Close window'
            onClick={handleClose}
            className='cursor-pointer h-4 w-4 rounded-full grid place-items-center bg-red-400'
          >
            <LucideX size={10} className='text-black group-hover:opacity-100 opacity-0 transition-opacity duration-300' />
          </div>
          <div
            title='Minimize window'
            onClick={canMinimize ? handleMinimize : undefined}
            className={clsx(
              'h-4 w-4 rounded-full grid place-items-center bg-yellow-400',
              canMinimize ? 'cursor-pointer grayscale-0' : 'grayscale brightness-50 hidden'
            )}
          >
            <LucideMinus size={10} className={clsx(
              'text-black transition-opacity duration-300',
              canMinimize ? 'group-hover:opacity-100 opacity-0' : 'opacity-0'
            )} />
          </div>
          <div
            title='Maximize window'
            onClick={canMaximize ? handleMaximize : undefined}
            className={clsx(
              'h-4 w-4 rounded-full grid place-items-center bg-green-400',
              canMaximize ? 'cursor-pointer grayscale-0 opacity-100' : 'grayscale brightness-50 opacity-0 hidden'
            )}
          >
            <LucideMaximize2 size={10} className={clsx(
              'text-black transition-opacity duration-300',
              canMaximize ? 'group-hover:opacity-100 opacity-0' : 'opacity-0'
            )} />
          </div>
        </div>
        <div
          {...listeners}
          {...attributes}
          className='text-center select-none outline-none p-2 focus:bg-background/70'
        >
          <span className='pointer-events-none'>{windowProps.title}</span>
        </div>
      </div>
      
      {windowProps.windowType !== 'terminal' ? (
        <motion.div
          initial={{ opacity: 0, scale: 2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15, delay: 0.05, ease: "easeOut" }}
          className={clsx(
            'max-h-full overflow-y-auto launchpad-container pb-4 flex-1',
            windowProps.windowType === 'spotify' && 'min-h-full bg-gradient-to-b from-[rgba(248,216,160)]/10 via-[rgba(248,216,160)]/5 to-background',
            (windowProps.windowType !== 'spotify') && 'p-2'
          )}
        >
          <WindowToRender />
        </motion.div>
      ) : (
        <WindowToRender />
      )}
      </div>
    </div>
  );
};

const DraggableContainer = ({ windowProps }: { windowProps: AppWindow }) => {
  const { getTopWindowId } = useAppWindows();
  const [position, setPosition] = useState({ 
    x: windowProps.position.x, 
    y: windowProps.position.y < TOP_OFFSET ? TOP_OFFSET : windowProps.position.y 
  });
  const [size, setSize] = useState({ width: BOX_WIDTH, height: BOX_HEIGHT });
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaximizeState, setPreMaximizeState] = useState({ 
    position: { x: 0, y: 0 }, 
    size: { width: BOX_WIDTH, height: BOX_HEIGHT } 
  });

  const sensors = useSensors(useSensor(PointerSensor));

  // Check if this window is the top/focused window
  const isFocused = getTopWindowId() === windowProps.id;

  const handleDragEnd = (event: DragEndEvent) => {
    if (isMaximized) return; // Don't allow dragging when maximized

    const { delta } = event;
    const { innerWidth, innerHeight } = window;

    const newX = Math.min(
      Math.max(EDGE_PADDING, position.x + delta.x),
      innerWidth - size.width - EDGE_PADDING
    );

    const newY = Math.min(
      Math.max(TOP_OFFSET, position.y + delta.y),
      innerHeight - size.height - EDGE_PADDING
    );

    setPosition({ x: newX, y: newY });

    const edge = getEdgePosition(newX, newY, size.width, size.height, innerWidth, innerHeight);
    if (edge !== 'center') {
      console.log(`Box touched the ${edge} edge`);
    }
  };

  const handleResize = (newSize: { width: number; height: number }) => {
    if (isMaximized) return; // Don't allow resizing when maximized
    setSize(newSize);
  };

  const handleMaximize = () => {
    const { innerWidth, innerHeight } = window;
    
    if (isMaximized) {
      // Restore to previous state
      setPosition(preMaximizeState.position);
      setSize(preMaximizeState.size);
      setIsMaximized(false);
    } else {
      // Save current state before maximizing
      setPreMaximizeState({ position, size });
      
      // Calculate maximum size with edge padding
      const maxWidth = innerWidth - (EDGE_PADDING * 2);
      const maxHeight = innerHeight - TOP_OFFSET - EDGE_PADDING;
      
      // Maximize from current position
      setPosition({ x: EDGE_PADDING, y: TOP_OFFSET });
      setSize({ width: maxWidth, height: maxHeight });
      setIsMaximized(true);
    }
  };

  // Adjust position and size if window is resized
  useEffect(() => {
    const handleWindowResize = () => {
      const { innerWidth, innerHeight } = window;
      
      // Ensure window stays within bounds
      const maxX = innerWidth - size.width - EDGE_PADDING;
      const maxY = innerHeight - size.height - EDGE_PADDING;
      
      setPosition(prev => ({
        x: Math.min(prev.x, maxX),
        y: Math.min(Math.max(prev.y, TOP_OFFSET), maxY)
      }));

      // If maximized, update to new screen size
      if (isMaximized) {
        const maxWidth = innerWidth - (EDGE_PADDING * 2);
        const maxHeight = innerHeight - TOP_OFFSET - EDGE_PADDING;
        setSize({ width: maxWidth, height: maxHeight });
        setPosition({ x: EDGE_PADDING, y: TOP_OFFSET });
      }
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [size, isMaximized]);

  const variants = {
    hidden: {
      scale: 0.9,
      opacity: 0,
      y: 30,
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 25,
      },
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 25,
      },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      y: 30,
      transition: {
        type: 'spring' as const,
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
        <DraggableBox 
          position={position} 
          size={size}
          windowProps={windowProps} 
          onResize={handleResize}
          onMaximize={handleMaximize}
          isMaximized={isMaximized}
          isFocused={isFocused}
        />
      </DndContext>
    </motion.div>
  );
};

export default DraggableContainer;