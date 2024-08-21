import React from "react";
import { Link } from "react-router-dom";

import HomeIcon from "../../icons/HomeIcon";
import DocumentationIcon from "../../icons/DocumentationIcon";
import UserManagementIcon from "../../icons/UserManagementIcon";
import GameSettingsIcon from "../../icons/GameSettingsIcon";
import ReportsIcon from "../../icons/ReportsIcon";
import FeedbackIcon from "../../icons/FeedbackIcon";
import SupportIcon from "../../icons/SupportIcon";
import ContactIcon from "../../icons/ContactIcon";
import SkIcon from "../../icons/SkIcon";

import SidebarItem from "./SidebarItem";

// Sidebar component for the admin panel
const Sidebar = () => {
  return (
    // Sticky sidebar that spans the height of the screen
    <aside className="sticky top-0 h-screen w-64 flex flex-col p-4 border-r dark:border-r-foreground-100">
      {/* Link to the homepage */}
      <Link to="/">
        <div className="flex items-center justify-center gap-4 mb-8">
          <SkIcon height={10} />
          <h2 className="text-xl font-bold text-foreground">Admin</h2>{" "}
          {/* Admin title */}
        </div>
      </Link>
      {/* Navigation items */}
      <nav className="flex flex-col gap-4">
        {/* Home page link */}
        <SidebarItem icon={<HomeIcon />} title="Home" href="/" />
        {/* Documentation page link */}
        <SidebarItem
          icon={<DocumentationIcon />}
          title="Documentation"
          href="/documentation"
        />
        {/* Additional sidebar items */}
        <SidebarItem icon={<UserManagementIcon />} title="User Manager" />
        <SidebarItem icon={<GameSettingsIcon />} title="Game Settings" />
        <SidebarItem icon={<ReportsIcon />} title="Reports" href="/reports" />
        <SidebarItem icon={<FeedbackIcon />} title="Feedback" />
        <SidebarItem icon={<SupportIcon />} title="Support" />
        <SidebarItem icon={<ContactIcon />} title="Contact" />
      </nav>
    </aside>
  );
};

export default Sidebar;
