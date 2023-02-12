import React, { useContext } from "react";
import { GlobalContext } from "../context";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

function Layout({ children }) {
  const { sidebarOpen, setSidebarOpen } = useContext(GlobalContext);
  return (
    <div className={`${"App"} ${"open"}`}>
      <Sidebar />
      <div className="container">
        <Navbar />
        <div
          className={`${"backdrop"} ${sidebarOpen && "backdrop__open"}`}
          onClick={() => setSidebarOpen(false)}
        ></div>
        <main role="main">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
