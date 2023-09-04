import React, { useRef } from "react";
import { Icon } from "@iconify/react";
import { DONE, TODO, todoDataType } from "@/model";
import { colorDetective } from "@/utils/helpers";
import Checkbox from "../checkbox/Checkbox";
import useTodos from "@/hooks/useTodos";

export interface TodoItemProps {
  item: todoDataType;
}

export const TodoItem = ({ item }: TodoItemProps) => {
  // Determine if the todo item is marked as done
  const isDone = item.status === DONE;

  // Retrieve the color theme based on the todo status
  const colors = colorDetective[item.status];

  // Access the updateTodo and removeTodo functions from the custom hook
  const { updateTodo, removeTodo, createMultiTodo } = useTodos();

  // Reference to the textarea element for updating its value
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Handle checkbox change event
  const handleCheckboxChange = (isChecked: boolean) => {
    // Update the todo item's status based on checkbox state
    updateTodo({ ...item, status: isChecked ? DONE : TODO });
  };

  // Handle textarea change event
  const handleTextareaChange = (text: string) => {
    // Update the todo item's body text based on textarea input
    updateTodo({ ...item, body: text });
  };

  // Handle remove button click event
  const handleRemoveClick = () => {
    // Remove the todo item from the list
    removeTodo(item.id);
  };

  // Handle clipboard paste event
  const handleClipboardPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const clipboardData = e.clipboardData;
    const pastedText = clipboardData.getData("Text");
    const linesOfPastedText = pastedText.split("\n");

    // Filter out lines with only whitespace characters
    const clearedPastedTextOfWhiteSpace = linesOfPastedText.filter((line) => /\S/.test(line));

    if (clearedPastedTextOfWhiteSpace.length > 1) {
      // Create multiple todos for each line
      const newTodos = clearedPastedTextOfWhiteSpace.map((newItem, index) => ({
        body: newItem,
        order: item.order + index, // You should define 'item' appropriately
        status: item.status, // You should define 'item' appropriately
      }));

      createMultiTodo(newTodos); // Assuming 'createMultiTodo' is your function
      handleRemoveClick(); // Call your remove function here
    } else {
      // Handle single line pasted text
      handleTextareaChange(pastedText); // Assuming 'handleTextareaChange' is your function
    }
  };

  return (
    <div
      className={`py-3 px-[10px] h-fit group bg-white rounded-[4px] text-xs border-opacity-50 hover:border-opacity-100 transition-all border border-${colors.info}`}
    >
      <div className="flex gap-4 items-center h-fit">
        <div className="w-fit">
          <Checkbox isChecked={isDone} onChange={handleCheckboxChange} />
        </div>
        {isDone ? (
          // Display strikethrough text for completed items
          <s className="flex-1">{item.body}</s>
        ) : (
          <textarea
            onPaste={handleClipboardPaste}
            ref={textareaRef}
            onChange={(e) => handleTextareaChange(e.target.value)}
            rows={item.body.length / 24}
            className="resize-none break-words flex-1 min-h-min overflow-hidden"
            value={item.body}
          />
        )}
        <div className="w-6">
          <button
            onClick={handleRemoveClick}
            className={`text-${colors.action} hidden group-hover:block`}
          >
            <Icon icon={"mdi:close"} fontSize={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
