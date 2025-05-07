"use client";

import { useState } from "react";
import Icon from "./Icon";
import { IconProps, icons, permanentIcons } from "@/Constants/constants";
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
    horizontalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createPortal } from "react-dom";

// Create a sortable version of your Icon component
const SortableIcon = ({ id, ...props }: IconProps & { id: string }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id,
        transition: {
            duration: 150, // Faster transition
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)', // Custom easing for smoother feel
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.3 : 1, // More transparent when dragging
        cursor: "grab",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Icon {...props} id={id} />
        </div>
    );
};

export default function TaskBar() {
    // State to track the order of icons
    const [taskbarIcons, setTaskbarIcons] = useState(
        icons.map((icon) => ({ ...icon, id: icon.id }))
    );

    // State to track the currently active (dragging) item
    const [activeId, setActiveId] = useState<string | null>(null);

    // Set up sensors for drag detection
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
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
            setTaskbarIcons((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    // Get the active icon if there is one
    const activeIcon = activeId
        ? taskbarIcons.find(icon => icon.id === activeId)
        : null;

    // Custom drop animation configuration
    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
        duration: 150, // Shorter duration for faster animation
        easing: 'cubic-bezier(0.2, 1, 0.1, 1)', // Smoother easing
    };

    return (
        <div className="fixed bottom-2 p-2 left-1/2 z-[999] -translate-x-1/2 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-sm">
            <div className="flex items-stretch gap-2">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={taskbarIcons.map((icon) => icon.id)}
                        strategy={horizontalListSortingStrategy}
                    >
                        <div className="flex items-center gap-1">
                            {taskbarIcons.map((icon) => (
                                <SortableIcon key={icon.id} {...icon} />
                            ))}
                        </div>
                    </SortableContext>
                    {typeof window !== 'undefined' && createPortal(
                        <DragOverlay dropAnimation={dropAnimation}>
                            {activeId && activeIcon ? (
                                <div className="opacity-95 scale-105">
                                    <Icon {...activeIcon} />
                                </div>
                            ) : null}
                        </DragOverlay>,
                        document.body
                    )}
                </DndContext>
                <div
                    className="w-[1px] mx-2 bg-white/20"
                />
                <div className="flex items-center gap-2">
                    {permanentIcons.map((icon) => (
                        <Icon key={icon.id} {...icon} />
                    ))}
                </div>
            </div>
        </div>
    );
}