import React from "react";
import AppNavbar from "./Navigation/Navbar/AppNavbar";
import Sidebar from "./Navigation/Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <AppNavbar />
        <main
          className="p-10 flex-1"
          style={{
            backgroundImage: "url(/background.svg)",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
