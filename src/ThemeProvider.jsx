// The themeprovider is used for fixing theme bugs in nextUI and adding theme switcher to the app.

import React, { createContext, useEffect, useState } from "react";

// Create a context for the theme
export const ThemeContext = createContext();

// ThemeProvider component to provide theme context to children components
export default function ThemeProvider({ children }) {
  // State to manage the theme, initialized from localStorage or default to "dark"
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") ?? "dark"
  );

  // Function to toggle the theme between "light" and "dark"
  const toggleTheme = () => {
    const newTheme =
      localStorage.getItem("theme") === "dark" ? "light" : "dark";
    document.querySelector("body")?.classList.replace(theme, newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  // useEffect to add theme-related classes to the body element when the component mounts or theme changes
  useEffect(() => {
    document
      .querySelector("body")
      ?.classList.add(theme, "text-foreground", "bg-background");
  }, [theme]); // Dependency array includes theme to re-run effect on theme change

  return (
    // Provide the theme and toggleTheme function to the context
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
