"use client";
import Image from "next/image";
import { useState } from "react";
import { Trash, trash } from "@/Constants/trash";
import { downloadHandler } from "@/util";
import toast from "react-hot-toast";
import useSoundEffect from "@useverse/usesoundeffect";
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
import { ContextMenu, ContextMenuItem, useContextMenu } from "./components/ContextMenu";
import { XIcon } from "lucide-react";

// Icons for context menu (you can replace these with your preferred icon library)
const DownloadIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const InfoIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 16v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const DuplicateIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2"/>
    </svg>
);

const TrashIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="10" y1="11" x2="10" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="14" y1="11" x2="14" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

// Create a sortable version of your trash item component
const SortableTrashItem = ({ item, onDelete, onDuplicate, onShowInfo }: { 
    item: Trash; 
    onDelete: (item: Trash) => void;
    onDuplicate: (item: Trash) => void;
    onShowInfo: (item: Trash) => void;
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: item.id,
        transition: {
            duration: 150,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        },
    });

    const { contextMenu, showContextMenu, hideContextMenu } = useContextMenu();

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
            // remove the extension from the file name
            fileName: item.name.replace(/\.[^/.]+$/, "")
        });

        toast.promise(promise, {
            loading: "Downloading...",
            success: () => {
                downloadSound.play();
                return "Downloaded successfully";
            },
            error: "Failed to download"
        });
    };

    const handleDownload = async () => {
        if (!item.downloadable) {
            toast.error("This item is not downloadable");
            return;
        }
        await handleDoubleClick(item);
    };

    // Context menu items
    const contextMenuItems: ContextMenuItem[] = [
        {
            id: "download",
            label: "Download",
            icon: <DownloadIcon />,
            action: handleDownload,
            disabled: !item.downloadable,
        },
        {
            id: "separator1",
            label: "",
            action: () => {},
            separator: true,
        },
        {
            id: "duplicate",
            label: "Duplicate",
            icon: <DuplicateIcon />,
            action: () => onDuplicate(item),
        },
        {
            id: "info",
            label: "Get Info",
            icon: <InfoIcon />,
            action: () => onShowInfo(item),
        },
        {
            id: "separator2",
            label: "",
            action: () => {},
            separator: true,
        },
        {
            id: "delete",
            label: "Move to Trash",
            icon: <TrashIcon />,
            action: () => onDelete(item),
            destructive: true,
        },
    ];

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <>
            <button
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                onDoubleClick={() => handleDoubleClick(item)}
                onContextMenu={showContextMenu}
                title="Double click to download | Right click for options | Drag to reorder"
                onClick={() => clickSound.play()}
                className="flex flex-col gap-2 cursor-grab active:cursor-grabbing items-center group p-1 rounded-lg touch-none"
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
                        className="object-contain w-full h-full pointer-events-none"
                    />
                </div>
                <p className="text-center text-sm opacity-75 group-hover:opacity-100 group-focus:bg-blue-600 group-focus:text-white w-fit mx-auto px-1 rounded group-focus:opacity-100 transition-all duration-300 pointer-events-none">
                    {item.name}
                </p>
            </button>
            
            <ContextMenu
                items={contextMenuItems}
                position={contextMenu.position}
                visible={contextMenu.visible}
                onClose={hideContextMenu}
            />
        </>
    );
};

export default function Bin() {
    // State to track the order of trash items
    const [trashItems, setTrashItems] = useState(
        trash.map((item) => ({ ...item, id: item.id }))
    );

    const swipeSound = useSoundEffect("/audio/swipe.mp3", {
        volume: 0.25,
    });

    // State to track the currently active (dragging) item
    const [activeId, setActiveId] = useState<string | null>(null);

    // Set up sensors for drag detection
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Slightly lower distance for better responsiveness
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
            setTrashItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    // Context menu actions
    const handleDelete = (item: Trash) => {
        setTrashItems(items => items.filter(i => i.id !== item.id));
        toast.success(`${item.name} moved to trash`);
    };

    const handleDuplicate = (item: Trash) => {
        const duplicatedItem = {
            ...item,
            id: `${item.id}-copy-${Date.now()}`,
            name: `${item.name} copy`,
        };
        setTrashItems(items => [...items, duplicatedItem]);
        toast.success(`${item.name} duplicated`);
    };

    const handleShowInfo = (item: Trash) => {
        const fileType = item.downloadURL?.split(".").pop();
        const downloadUrlWithOutHost = item.downloadURL?.replace("https://pickholder.sirv.com", "");
        toast.custom((t) => (
            <div className="bg-white p-4 rounded-lg shadow-lg border max-w-sm">
                <h3 className="font-semibold text-gray-900 mb-2 text-xl">{item.name}</h3>
                <div className="text-sm opacity-80 text-gray-600 space-y-1">
                    <p><strong>Type:</strong> {fileType || "File"}</p>
                    <p><strong>Downloadable:</strong> {item.downloadable ? "Yes" : "No"}</p>
                    {item.downloadURL && (
                        <p><strong>URL:</strong> <span className="text-blue-600 truncate">{downloadUrlWithOutHost}</span></p>
                    )}
                </div>
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="mt-3 text-sm text-red-600 hover:text-red-800 cursor-pointer flex items-center gap-1"
                >
                    <XIcon className="w-4 h-4" /> Close
                </button>
            </div>
        ), { duration: 5000 });
    };

    // Get the active item if there is one
    const activeItem = activeId
        ? trashItems.find(item => item.id === activeId)
        : null;

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
        <div className="p-2">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={trashItems.map((item) => item.id)}
                    strategy={rectSortingStrategy} // This strategy works better for grid layouts
                >
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3">
                        {trashItems.map((item) => (
                            <SortableTrashItem 
                                key={item.id} 
                                item={item} 
                                onDelete={handleDelete}
                                onDuplicate={handleDuplicate}
                                onShowInfo={handleShowInfo}
                            />
                        ))}
                    </div>
                </SortableContext>
                {typeof window !== 'undefined' && createPortal(
                    <DragOverlay dropAnimation={dropAnimation}>
                        {activeId && activeItem ? (
                            <div className="opacity-90 scale-105 rotate-3 shadow-lg">
                                <div className="flex flex-col gap-2 items-center p-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                                    <div className="p-1 rounded-lg w-[100px]">
                                        <Image
                                            src={activeItem.icon}
                                            alt={activeItem.name}
                                            width={250}
                                            height={250}
                                            draggable={false}
                                            className="object-contain w-full h-full"
                                        />
                                    </div>
                                    <p className="text-center text-sm opacity-90 px-1 rounded">
                                        {activeItem.name}
                                    </p>
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