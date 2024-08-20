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

// ConfigSummaryModal component displays a confirmation modal for adding a new configuration
const ConfigSummaryModal = ({
  isConfirmationOpen, // Boolean to control if the confirmation modal is open
  setIsConfirmationOpen, // Function to toggle the confirmation modal open state
  newConfig, // The new configuration to be confirmed
  handleConfirmAdd, // Function to handle confirming the addition of the new configuration
}) => {
  // Function to handle the cancellation of the confirmation
  const handleCancel = () => {
    setIsConfirmationOpen(false); // Close the confirmation modal
  };

  return (
    // Modal component from NextUI, controlled by isConfirmationOpen
    <Modal isOpen={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            {/* Modal header displaying the title */}
            <ModalHeader className="flex flex-col gap-1">
              Confirm New Configuration
            </ModalHeader>
            {/* Modal body displaying the configuration details */}
            <ModalBody>
              <ConfigCard config={newConfig} />
            </ModalBody>
            {/* Modal footer with Go Back and Confirm buttons */}
            <ModalFooter>
              <Button color="danger" variant="light" onPress={handleCancel}>
                Go Back
              </Button>
              <Button color="primary" onPress={handleConfirmAdd}>
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfigSummaryModal;
