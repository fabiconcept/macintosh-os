"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import useSoundEffect from "@useverse/usesoundeffect";
import { ContextMenu, useContextMenu, ContextMenuItem } from "./components/ContextMenu";
import { ExternalLink, Info, Trash2, Copy, Share, Monitor } from "lucide-react";
import useAppStore from "@/store";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragStartEvent,
    DragOverlay,
    defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createPortal } from "react-dom";
import clsx from "clsx";

// Define the app type based on your constants
type LaunchpadApp = {
    id: string;
    src: string;
    alt: string;
    title: string;
    url: string;
};

// Create a sortable version of your app item component
const SortableAppItem = ({ 
    app, 
    desktop = false, 
    isSelected = false, 
    onSelect
}: { 
    app: LaunchpadApp; 
    desktop?: boolean;
    isSelected?: boolean;
    onSelect?: (appId: string) => void;
}) => {
    const { contextMenu, showContextMenu, hideContextMenu } = useContextMenu();
    const { addToDesktop } = useAppStore();
    const clickSound = useSoundEffect("/audio/mouse-click.mp3", {
        volume: 0.5,
    });
    const linkHoverSound = useSoundEffect("/audio/link-hover.mp3", {
        volume: 0.15,
    });
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: app.id,
        transition: {
            duration: 150,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.5 : 1,
    };

    const handleDoubleClick = () => {
        if (desktop) {
            window.open(app.url, '_blank', 'noopener,noreferrer');
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        // Prevent link navigation when dragging
        if (isDragging) {
            e.preventDefault();
            return;
        }
        
        // In desktop mode, handle selection on single click
        if (desktop) {
            e.preventDefault();
            onSelect?.(app.id);
        }
    };

    const handleContextMenu = (e: React.MouseEvent) => {
        if (!desktop) {
            e.preventDefault();
            showContextMenu(e);
        }
    };

    // Define context menu items for apps (only in non-desktop mode)
    const contextMenuItems: ContextMenuItem[] = [
        {
            id: 'open',
            label: 'Open',
            icon: <ExternalLink size={16} />,
            action: () => {
                window.open(app.url, '_blank', 'noopener,noreferrer');
            }
        },
        {
            id: 'separator-1',
            label: '',
            separator: true,
            action: () => {}
        },
        {
            id: 'send-to-desktop',
            label: 'Send to Desktop',
            icon: <Monitor size={16} />,
            action: () => {
                addToDesktop(app);
                console.log(`${app.title} sent to desktop`);
            }
        },
        {
            id: 'separator-2',
            label: '',
            separator: true,
            action: () => {}
        },
        {
            id: 'copy-link',
            label: 'Copy Link',
            icon: <Copy size={16} />,
            action: () => {
                navigator.clipboard.writeText(app.url);
                console.log('Copied link for', app.title);
            }
        },
        {
            id: 'share',
            label: 'Share...',
            icon: <Share size={16} />,
            action: () => {
                if (navigator.share) {
                    navigator.share({
                        title: app.title,
                        url: app.url
                    });
                } else {
                    console.log('Share not supported');
                }
            }
        }
    ];

    return (
        <div
            ref={setNodeRef}
            style={style}
            onMouseEnter={() => linkHoverSound.play()}
            onClick={() => clickSound.play()}
            {...attributes}
            {...listeners}
            className="relative max-w-[7rem] cursor-grab active:cursor-grabbing w-full h-full aspect-square group touch-none"
            title={desktop ? `Double-click to open ${app.title}` : `Drag to reorder | Click to visit ${app.title}`}
            data-launchpad-item
        >
            {/* Selection indicator overlay */}
            {desktop && isSelected && (
                <div className="absolute scale-y-105 translate-y-1 -inset-1 inset-y-0 bg-white/10 border border-white/50 rounded-lg pointer-events-none" 
                     style={{ bottom: '-8px' }} />
            )}
            <Link 
                href={desktop ? "#" : app.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative cursor-pointer w-full h-full aspect-square group block"
                onClick={handleClick}
                onDoubleClick={handleDoubleClick}
                onContextMenu={handleContextMenu}
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
                    className={`object-contain aspect-square h-full w-full group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-300 pointer-events-none ${
                        desktop && isSelected ? '' : 'group-active:scale-95'
                    }`}
                />
                <p className="text-center text-xs -mt-1 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none">{app.title}</p>
            </Link>
            
            {/* Context Menu (only in non-desktop mode) */}
            {!desktop && (
                <ContextMenu
                    items={contextMenuItems}
                    position={contextMenu.position}
                    visible={contextMenu.visible}
                    onClose={hideContextMenu}
                />
            )}
        </div>
    );
};

export default function LaunchPad({ desktop = false, apps }: { desktop?: boolean, apps: LaunchpadApp[] }) {
    // State to track the order of apps
    const [appsState, setAppsState] = useState(
        apps.map((app) => ({ ...app, id: app.id }))
    );

    useEffect(() => {
        // Only update local state if the incoming apps list actually changed (by ids)
        setAppsState((prev) => {
            const next = apps.map((app) => ({ ...app, id: app.id }));
            const prevIds = prev.map((a) => a.id).join("|");
            const nextIds = next.map((a) => a.id).join("|");
            if (prevIds === nextIds) return prev;
            return next;
        });
    }, [apps]);

    const swipeSound = useSoundEffect("/audio/swipe.mp3", {
        volume: 0.5,
    });

    // State to track the currently active (dragging) item
    const [activeId, setActiveId] = useState<string | null>(null);
    
    // State to track selected app in desktop mode
    const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
    
    // Ref for the container to handle focus
    const containerRef = useRef<HTMLDivElement>(null);


    // Set up sensors for drag detection
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Distance threshold to distinguish between click and drag
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Handle drag start
    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    // Handle the end of a drag event
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);

        if (over && active.id !== over.id) {
            swipeSound.play();
            setAppsState((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    // Get the active app if there is one
    const activeApp = activeId
        ? apps.find(app => app.id === activeId)
        : null;

    // Handle app selection
    const handleAppSelect = (appId: string) => {
        if (desktop) {
            setSelectedAppId(appId);
            // Focus the container to enable keyboard navigation
            containerRef.current?.focus();
        }
    };

    // Handle keyboard navigation
    useEffect(() => {
        if (!desktop) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedAppId) return;

            const currentIndex = appsState.findIndex(app => app.id === selectedAppId);
            const gridCols = Math.floor((containerRef.current?.clientWidth || 0) / 112); // Approximate item width
            let newIndex = currentIndex;

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    newIndex = Math.max(0, currentIndex - 1);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    newIndex = Math.min(appsState.length - 1, currentIndex + 1);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    newIndex = Math.max(0, currentIndex - gridCols);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    newIndex = Math.min(appsState.length - 1, currentIndex + gridCols);
                    break;
                case 'Enter':
                    e.preventDefault();
                    const selectedApp = appsState.find(app => app.id === selectedAppId);
                    if (selectedApp) {
                        window.open(selectedApp.url, '_blank', 'noopener,noreferrer');
                    }
                    return;
                default:
                    return;
            }

            if (newIndex !== currentIndex && appsState[newIndex]) {
                setSelectedAppId(appsState[newIndex].id);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('keydown', handleKeyDown);
            return () => container.removeEventListener('keydown', handleKeyDown);
        }
    }, [desktop, selectedAppId, appsState]);

    // Clear selection when clicking outside in desktop mode
    useEffect(() => {
        if (!desktop) return;

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('[data-launchpad-item]') && !target.closest('.launchpad-container')) {
                setSelectedAppId(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [desktop]);


    // Custom drop animation configuration
    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.3',
                },
            },
        }),
        duration: 200,
        easing: 'cubic-bezier(0.2, 1, 0.1, 1)',
    };

    return (
        <div 
            className="p-3 launchpad-container" 
            ref={containerRef}
            tabIndex={desktop ? 0 : -1}
            style={{ outline: 'none' }}
        >
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={appsState.map((app) => app.id)}
                    strategy={rectSortingStrategy} // for grid layouts with 2D movement
                >
                    <div className={clsx(
                        !desktop && "grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-2 gap-y-5",
                        desktop && "flex flex-col flex-wrap w-fit gap-2 gap-y-5 h-full max-h-[calc(100vh-6rem)]",
                    )}>
                        {appsState.map((app) => (
                            <SortableAppItem 
                                key={app.id} 
                                app={app} 
                                desktop={desktop}
                                isSelected={desktop && selectedAppId === app.id}
                                onSelect={handleAppSelect}
                            />
                        ))}
                    </div>
                </SortableContext>
                {typeof window !== 'undefined' && createPortal(
                    <DragOverlay dropAnimation={dropAnimation}>
                        {activeId && activeApp ? (
                            <div className="opacity-90 scale-110 rotate-2 shadow-xl">
                                <div className="relative w-full h-full aspect-square bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2">
                                    <Image
                                        src={activeApp.src}
                                        alt={activeApp.alt}
                                        height={100}
                                        width={100}
                                        draggable={false}
                                        className="object-contain aspect-square h-full w-full drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                    />
                                    {!desktop && <p className="text-center text-xs -mt-1 opacity-90 absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                        {activeApp.title}
                                    </p>}
                                </div>
                            </div>
                        ) : null}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    );
}