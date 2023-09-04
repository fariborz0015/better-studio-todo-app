import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { DONE, TODO, todoDataType } from "@/model";
import { colorDetective } from "@/utils/helpers";
import Checkbox from "../checkbox/Checkbox";
import useTodos from "@/hooks/useTodos";

export interface TodoItemProps {
  item: todoDataType;
}

export const TodoItem = ({ item }: TodoItemProps) => {
  const [animation, setAnimation] = useState(false);

  // Determine if the todo item is marked as done
  const isDone = item.status === DONE;
  const rowOfInput = () => {
    if (item.body.split("\n").length > 1) {
      return item.body.split("\n").length;
    } else {
      return Math.ceil(item.body.length / 24);
    }
  };
  // Retrieve the color theme based on the todo status
  const colors = colorDetective[item.status];

  // Access the updateTodo and removeTodo functions from the custom hook
  const { updateTodo, removeTodo, createMultiTodo, todoList } = useTodos();

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
    setAnimation(true);

    //play music

    let sound = document.querySelector("#drop-audio");
    //@ts-ignore
    sound.play();

    // Remove the todo item from the list
    setTimeout(() => {
      removeTodo(item.id);
    }, 1000);
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
        order: todoList.length, // You should define 'item' appropriately
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
      className={`
      animate__animated
 
      ${animation ? "animate__rotateOutDownLeft" : "animate__jello"}
      py-3 px-[10px] !relative h-fit group bg-white rounded-[4px] text-xs border-opacity-50 hover:border-opacity-100 transition-all border border-${
        colors.info
      }`}
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
            rows={rowOfInput()}
            onChange={(e) => handleTextareaChange(e.target.value)}
            className="resize-none break-all   flex-1    "
            defaultValue={item?.body}
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
