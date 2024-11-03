import { useSortable } from "@dnd-kit/sortable";
import type { Column, Id } from "../types";
import { CSS } from "@dnd-kit/utilities";
import Trash from "./icons/Trash";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}

export function ColumnContainer(props: Props) {
  const { column, deleteColumn } = props;

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: column.id,
      data: {
        type: "Column",
        column,
      },
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] 
    rounded-md flex flex-col"
    >
      <div
        className="bg-mainBackgroundColor text-md h-[60px]
       cursor-grab rounded-md rounded-b-none p-3 font-bold 
       border-columnBackgroundColor border-4 flex items-center justify-between"
      >
        <div className="flex ga-2">
          <div className="flex items-center justify-center px-2 py-1 text-sm rounded-full bg-columnBackgroundColor">
            0
          </div>
          {column.title}
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
