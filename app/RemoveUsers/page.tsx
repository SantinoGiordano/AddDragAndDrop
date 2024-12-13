"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { motion, useAnimation } from "framer-motion";

interface Users {
  id: number;
  age: number;
  name: string;
}

export default function RemoveUsers() {
  const [users, setUsers] = useState<Users[]>([]);

  // Fetch users
  async function getUsers() {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      const json = await response.json();
      setUsers(json.users || []);
    } catch (error) {
      console.error(error);
      setUsers([]);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  // Handle drag end event to delete user when dropped into trash
  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (over?.id === "trash") {
      // Remove the dragged user from the list
      const newUsers = users.filter((user) => user.id !== parseInt(active.id));
      setUsers(newUsers);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex justify-between space-x-10 min-h-screen bg-gray-100">
        {/* Draggable users */}
        <ul className="space-y-3 w-2/3">
          {users.map((user) => (
            <li key={user.id}>
              <DraggableItem user={user} />
            </li>
          ))}
        </ul>

        {/* Droppable trash area */}
        <DroppableTrash />
      </div>
    </DndContext>
  );
}

// Draggable item component with animation
function DraggableItem({ user }: { user: Users }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    transform,
    transition,
  } = useDraggable({
    id: user.id.toString(),
  });

  // Animation for the draggable element
  const controls = useAnimation();

  // When dragging starts, animate the position
  const handleDragStart = () => {
    controls.start({ scale: 1.1, opacity: 0.8 });
  };

  // When dragging ends, return to normal state
  const handleDragEnd = () => {
    controls.start({ scale: 1, opacity: 1 });
  };

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-4 m-5 bg-sky-600 text-white max-w-[33%] rounded-md shadow-lg cursor-pointer ${
        isDragging ? "opacity-50" : ""
      }`}
      style={{
        x: transform?.x || 0,
        y: transform?.y || 0,
        transition: transition || "all 0.2s ease-out",
      }}
      animate={controls}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {user.name} (Age: {user.age})
    </motion.div>
  );
}

// Droppable trash area component
function DroppableTrash() {
  const { setNodeRef } = useDroppable({
    id: "trash",
  });

  return (
    <div className="pr-10">
      <div
        ref={setNodeRef}
        className="p-10 mt-5 bg-red-500 text-white text-center rounded-md shadow-lg w-44  max-h-28 mx-auto"
      >
        Drop here to delete
      </div>
    </div>
  );
}