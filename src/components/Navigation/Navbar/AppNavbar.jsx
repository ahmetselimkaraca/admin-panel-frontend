import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Link,
  User,
} from "@nextui-org/react";

import SearchIcon from "../../icons/SearchIcon";
import BellIcon from "../../icons/BellIcon";
import GithubIcon from "../../icons/GithubIcon";

import UserDropdown from "./UserDropdown";
import { ThemeSwitcher } from "./ThemeSwitcher";

// AppNavbar component for the application's navigation bar
const AppNavbar = () => {
  return (
    // Navbar component from NextUI, bordered and with a specified height
    <Navbar isBordered maxWidth="full">
      {/* Navbar content aligned to the start (left) */}
      <NavbarContent justify="start">
        <div className="w-full">
          {/* Navbar item containing the search input */}
          <NavbarItem>
            <Input
              startContent={<SearchIcon />} // Icon at the start of the input
              clearable
              placeholder="Search" // Placeholder text
              className="hidden sm:flex" // Hidden on small screens, flex on larger screens
            />
          </NavbarItem>
        </div>
      </NavbarContent>
      {/* Navbar content aligned to the end (right) */}
      <NavbarContent justify="end">
        {/* Navbar item containing the bell icon */}
        <NavbarItem>
          <BellIcon />
        </NavbarItem>
        {/* Navbar item containing the GitHub link */}
        <NavbarItem className="mt-[0.438rem]">
          <Link
            href="https://github.com/ahmetselimkaraca/panteon-demo-frontend"
            className="text-foreground"
          >
            <GithubIcon />
          </Link>
        </NavbarItem>
        {/* Navbar item containing the theme switcher */}
        <NavbarItem className="mt-[0.2rem]">
          <ThemeSwitcher />
        </NavbarItem>
        {/* Navbar item containing the user dropdown */}
        <NavbarItem>
          <UserDropdown />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default AppNavbar;
