import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

// UserDropdown component provides a dropdown menu for user actions
const UserDropdown = () => {
  const navigate = useNavigate();

  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/login"); // Navigate to login page
  };

  return (
    // Dropdown component from NextUI
    <Dropdown>
      {/* Trigger for the dropdown menu */}
      <DropdownTrigger>
        <Avatar
          isBordered
          src="https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833560.jpg?w=740&t=st=1722840952~exp=1722841552~hmac=b442c0e3c47212fecf821a9653e27925624f043d8ef038c15774057e0faa9233"
          className="cursor-pointer" // Makes the avatar a clickable cursor
          size="md" // Medium size for the avatar
        />
      </DropdownTrigger>
      {/* Dropdown menu for user actions */}
      <DropdownMenu aria-label="User Actions" variant="flat">
        {/* Dropdown item for logout action */}
        <DropdownItem
          key="logout"
          className="text-danger" // Apply danger text color
          color="danger" // Apply danger color to the item
          onClick={handleLogout} // Trigger handleLogout function on click
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
