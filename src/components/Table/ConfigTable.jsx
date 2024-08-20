import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import {
  getConfigurations,
  deleteConfiguration,
  createConfiguration,
  updateConfiguration,
} from "../../services/api";
import { exportToCsv } from "../../utils/exportData";

import ConfigModal from "../Modal/ConfigModal";
import ViewConfigModal from "../Modal/ViewConfigModal";
import DeleteConfirmationPopover from "../DeleteConfirmationPopover";
import TableSkeleton from "./TableSkeleton";
import { useDisclosure } from "@nextui-org/react";

import { useAsyncList } from "@react-stately/data";

import EditIcon from "../icons/EditIcon";
import ViewIcon from "../icons/ViewIcon";
import SearchIcon from "../icons/SearchIcon";

const ConfigTable = () => {
  // State variables for loading, new configuration, search query, and view/edit modals
  const [loading, setLoading] = useState(false);
  const [newConfig, setNewConfig] = useState({
    buildingType: "",
    buildingCost: "",
    constructionTime: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewConfig, setViewConfig] = useState(null);

  // useAsyncList hook for managing configurations data
  const list = useAsyncList({
    async load() {
      setLoading(true);
      const response = await getConfigurations();
      setLoading(false);

      return {
        items: response.data,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  // Function to reload configurations when building types change
  const onBuildingTypesChanged = () => {
    list.reload(); // Reload the configurations list
  };

  // Handle adding a new configuration
  const handleAdd = async () => {
    try {
      await createConfiguration(newConfig);
      list.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // Handle updating an existing configuration
  const handleUpdate = async () => {
    try {
      await updateConfiguration(newConfig.buildingType, {
        buildingCost: newConfig.buildingCost,
        constructionTime: newConfig.constructionTime,
      });
      list.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // Handle editing an existing configuration
  const handleEdit = (config) => {
    setNewConfig(config);
    setIsEditMode(true);
    onOpen();
  };

  // Handle deleting a configuration
  const handleDelete = async (buildingType) => {
    try {
      await deleteConfiguration(buildingType);
      list.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // Handle viewing a configuration
  const handleView = (config) => {
    setViewConfig(config);
    setIsViewOpen(true);
  };

  // Handle updating from the view modal
  const handleUpdateFromView = () => {
    setNewConfig(viewConfig);
    setIsEditMode(true);
    setIsViewOpen(false);
    onOpen();
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle exporting data to CSV
  const handleExport = () => {
    exportToCsv(list.items);
  };

  // Filter configurations based on search query
  const filteredItems = list.items.filter((item) =>
    item.buildingType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render a table cell based on column key
  const renderCell = (config, columnKey) => {
    const cellValue = config[columnKey];

    switch (columnKey) {
      case "buildingType":
        return cellValue;
      case "buildingCost":
        return `${cellValue}`;
      case "constructionTime":
        return `${cellValue}`;
      case "actions":
        return (
          <div className="flex justify-center items-center gap-2">
            <span className="cursor-pointer" onClick={() => handleView(config)}>
              <ViewIcon />
            </span>
            <span
              className="cursor-pointer text-primary"
              onClick={() => handleEdit(config)}
            >
              <EditIcon />
            </span>
            <DeleteConfirmationPopover
              onConfirm={() => handleDelete(config.buildingType)}
              warningText="Delete configuration?"
            />
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-4 gap-2">
        <div className="flex gap-2 max-w-96 w-2/3">
          <Input
            startContent={<SearchIcon />}
            placeholder="Search Configurations"
            clearable
            value={searchQuery}
            onChange={handleSearch}
            className="w-2/3"
          />
          <Select placeholder="Filter" className="w-1/3">
            <SelectItem key="filter1">Filter 1</SelectItem>
            <SelectItem key="filter2">Filter 2</SelectItem>
            <SelectItem key="filter3">Filter 3</SelectItem>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button
            color="primary"
            onPress={() => {
              setIsEditMode(false);
              onOpen();
            }}
          >
            Add Configuration
          </Button>
          <Button color="secondary" onClick={handleExport}>
            Export Data
          </Button>
        </div>
      </div>
      {loading ? (
        <TableSkeleton />
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-10 text-lg">No Configurations</div>
      ) : (
        <Table
          aria-label="Configurations Table with Actions"
          sortDescriptor={list.sortDescriptor}
          onSortChange={list.sort}
          className=""
        >
          <TableHeader>
            <TableColumn key="buildingType" allowsSorting align="center">
              <span>Building Type</span>
            </TableColumn>
            <TableColumn key="buildingCost" allowsSorting align="center">
              <span>Building Cost</span>
            </TableColumn>
            <TableColumn key="constructionTime" allowsSorting align="center">
              <span>Construction Time</span>
            </TableColumn>
            <TableColumn key="actions" align="center">
              <span>Actions</span>
            </TableColumn>
          </TableHeader>
          <TableBody items={filteredItems}>
            {(item) => (
              <TableRow key={item.buildingType}>
                {[
                  "buildingType",
                  "buildingCost",
                  "constructionTime",
                  "actions",
                ].map((columnKey) => (
                  <TableCell key={columnKey} className="text-center">
                    {renderCell(item, columnKey)}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      <ConfigModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        newConfig={newConfig}
        setNewConfig={setNewConfig}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        configurations={list.items}
        isEditMode={isEditMode}
        onBuildingTypesChanged={onBuildingTypesChanged} // Pass the function to ConfigModal
      />
      {viewConfig && (
        <ViewConfigModal
          isViewOpen={isViewOpen}
          setIsViewOpen={setIsViewOpen}
          config={viewConfig}
          handleDelete={handleDelete}
          handleUpdate={handleUpdateFromView}
        />
      )}
    </div>
  );
};

export default ConfigTable;
