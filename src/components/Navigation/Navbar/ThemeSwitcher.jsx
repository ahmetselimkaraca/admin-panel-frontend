import React, { useContext } from "react";
import { Switch } from "@nextui-org/react";
import { ThemeContext } from "../../../ThemeProvider";
import MoonIcon from "../../icons/MoonIcon";
import SunIcon from "../../icons/SunIcon";

// ThemeSwitcher component to toggle between light and dark themes
export function ThemeSwitcher() {
  // Use the ThemeContext to access the current theme and toggleTheme function
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Handle click event to toggle the theme
  const handleClick = () => {
    toggleTheme();
  };

  return (
    // Switch component from NextUI to toggle the theme
    <Switch
      defaultSelected={theme !== "dark"} // Set the default selection based on the current theme
      size="lg" // Large size for the switch
      color="primary" // Primary color for the switch
      startContent={<SunIcon />} // Sun icon for the light theme
      endContent={<MoonIcon />} // Moon icon for the dark theme
      onChange={handleClick} // Toggle the theme on change
    ></Switch>
  );
}
