import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
} from "@nextui-org/react";
import {
  getBuildingTypes,
  deleteBuildingType,
  createBuildingType,
} from "../../services/api";
import DeleteConfirmationPopover from "../DeleteConfirmationPopover";

const BuildingTypesModal = ({
  isOpen,
  onOpenChange,
  onBuildingTypeDeleted,
}) => {
  const [buildingTypes, setBuildingTypes] = useState([]);
  const [newBuildingType, setNewBuildingType] = useState("");

  useEffect(() => {
    if (isOpen) {
      const fetchBuildingTypes = async () => {
        try {
          const response = await getBuildingTypes();
          setBuildingTypes(response.data);
        } catch (error) {
          console.error("Failed to fetch building types:", error);
        }
      };

      fetchBuildingTypes();
    }
  }, [isOpen]);

  const handleDelete = async (type) => {
    try {
      await deleteBuildingType(type);
      setBuildingTypes(buildingTypes.filter((bt) => bt !== type));
      onBuildingTypeDeleted(); // Trigger the config table reload
    } catch (error) {
      console.error("Failed to delete building type:", error);
    }
  };

  const handleAdd = async () => {
    if (!newBuildingType.trim()) return;

    try {
      const response = await createBuildingType({ typeName: newBuildingType });
      setBuildingTypes([...buildingTypes, response.data.typeName]);
      setNewBuildingType(""); // Clear the input after adding
    } catch (error) {
      console.error("Failed to add building type:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Building Types</ModalHeader>
        <ModalBody>
          {buildingTypes.length === 0 ? (
            <div className="text-center py-10 text-lg">No Building Types</div>
          ) : (
            <Table aria-label="Building Types Table" removeWrapper>
              <TableHeader>
                <TableColumn align="center">Type</TableColumn>
                <TableColumn align="center">Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {buildingTypes.map((type) => (
                  <TableRow key={type}>
                    <TableCell className="text-center">{type}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <DeleteConfirmationPopover
                          onConfirm={() => handleDelete(type)}
                          warningText={`Are you sure you want to delete "${type}"?\nThis will delete all related configurations.`}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <div className="flex items-center mt-4 gap-2">
            <Input
              placeholder="Add new building type"
              value={newBuildingType}
              onChange={(e) => setNewBuildingType(e.target.value)}
              className="w-full"
            />
            <Button color="primary" onPress={handleAdd}>
              Add
            </Button>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="light"
            onPress={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BuildingTypesModal;
