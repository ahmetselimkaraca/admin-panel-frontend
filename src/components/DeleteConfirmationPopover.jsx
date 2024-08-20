import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

import DeleteIcon from "./icons/DeleteIcon";

const DeleteConfirmationPopover = ({ onConfirm, warningText }) => {
  // State to manage the visibility of the popover
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle the confirm action and close the popover
  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <Popover
      placement="left" // Position of the popover
      showArrow // Display an arrow on the popover
      isOpen={isOpen} // Control the open state of the popover
      onOpenChange={setIsOpen} // Callback to change the open state
    >
      <PopoverTrigger>
        <span
          className="text-danger cursor-pointer"
          onClick={() => setIsOpen(true)} // Open the popover when clicked
        >
          <DeleteIcon />
        </span>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-2">
          <p className="mb-2">{warningText}</p>
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="light" onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              color="danger"
              onPress={handleConfirm}
              variant="light"
              className="font-bold"
            >
              Confirm
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DeleteConfirmationPopover;
