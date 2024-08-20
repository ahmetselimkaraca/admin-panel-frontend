import React from "react";
import { Link, useLocation } from "react-router-dom";

// SidebarItem component representing an individual item in the sidebar
const SidebarItem = ({ icon, title, href }) => {
  // Get the current location from react-router
  const location = useLocation();
  // Determine if the current location matches the href of the SidebarItem
  const isActive = location.pathname === href;

  return (
    // Link to the specified href with conditional styling based on whether the item is active
    <Link
      to={href}
      className={`flex items-center gap-4 px-8 py-2 rounded-md text-foreground  transition duration-300 ${
        isActive ? " bg-primary-100" : "hover:bg-foreground-100"
      }`}
    >
      {/* Icon with conditional styling based on whether the item is active */}
      <span className={`text-xl ${isActive ? "" : "text-foreground-400"}`}>
        {icon}
      </span>
      {/* Title of the sidebar item */}
      <span className="text-base">{title}</span>
    </Link>
  );
};

export default SidebarItem;
