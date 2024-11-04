import { useSortable } from "@dnd-kit/sortable";
import type { Column, Id } from "../types";
import { CSS } from "@dnd-kit/utilities";
import Trash from "./icons/Trash";
import { useState } from "react";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
}

export function ColumnContainer(props: Props) {
  const { column, deleteColumn, updateColumn } = props;
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] 
        rounded-md border-2 opacity-40 border-rose-500 flex flex-col"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] 
      rounded-md flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="bg-mainBackgroundColor text-md h-[60px]
       cursor-grab rounded-md rounded-b-none p-3 font-bold 
       border-columnBackgroundColor border-4 flex items-center justify-between"
      >
        <div className="flex ga-2">
          <div className="flex items-center justify-center px-2 py-1 text-sm rounded-full bg-columnBackgroundColor">
            0
          </div>
          {column.title}
          {!editMode && column.title}
          {editMode && (
            <input
              className="px-2 bg-black border rounded outline-none focus:border-rose-500"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="px-1 py-2 rounded stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor"
        >
          <Trash />
        </button>
      </div>
      <div className="flex flex-grow">Content</div>
      <div>Footer</div>
    </div>
  );
}
