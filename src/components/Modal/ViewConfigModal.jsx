import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import ConfigCard from "./ConfigCard";

// ViewConfigModal component to view, update, or delete a specific configuration
const ViewConfigModal = ({
  isViewOpen, // Boolean to control if the view modal is open
  setIsViewOpen, // Function to toggle the view modal open state
  config, // The configuration to be viewed
  handleDelete, // Function to handle the deletion of the configuration
  handleUpdate, // Function to handle the update of the configuration
}) => {
  // Function to handle the closing of the modal
  const handleClose = () => {
    setIsViewOpen(false); // Close the view modal
  };

  return (
    // Modal component from NextUI, controlled by isViewOpen
    <Modal isOpen={isViewOpen} onOpenChange={setIsViewOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            {/* Modal header displaying the title */}
            <ModalHeader className="flex flex-col gap-1">
              View Configuration
            </ModalHeader>
            {/* Modal body displaying the configuration details using ConfigCard */}
            <ModalBody>
              <ConfigCard config={config} />
            </ModalBody>
            {/* Modal footer with Delete and Update buttons */}
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  handleDelete(config.buildingType); // Call handleDelete with the building type of the configuration
                  handleClose(); // Close the modal
                }}
              >
                Delete
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  handleUpdate(); // Call handleUpdate to update the configuration
                }}
              >
                Update
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ViewConfigModal;
