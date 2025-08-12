import React from "react";
import { Home, LayoutDashboard, Settings, Box, PlusCircle } from "lucide-react";

const Sidebar = ({ setActivePage }) => {
  return (
    <div className="sidebar bg-white shadow-sm" style={{ minHeight: "100vh", width: "250px" }}>
      <div className="sidebar-header p-3 fw-bold fs-4 text-primary">
        sneat
      </div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <button className="nav-link btn btn-link text-start w-100" onClick={() => setActivePage("dashboard")}>
            <Home size={18} className="me-2" /> Dashboard
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link btn btn-link text-start w-100" onClick={() => setActivePage("layouts")}>
            <LayoutDashboard size={18} className="me-2" /> Layouts
          </button>
        </li>

        <li className="nav-item mt-2 small text-muted px-3">MANAGE</li>

        {/* Product */}
        <li className="nav-item">
          <button className="nav-link btn btn-link text-start w-100" onClick={() => setActivePage("product")}>
            <Settings size={18} className="me-2" /> Product
          </button>
        </li>
        {/* Add Product */}
        <li className="nav-item ps-4">
          <button
            className="nav-link btn btn-link text-start w-100 text-success"
            onClick={() => setActivePage("addProduct")}
          >
            <PlusCircle size={16} className="me-2" /> Add Product
          </button>
        </li>

        {/* Category */}
        <li className="nav-item">
          <button className="nav-link btn btn-link text-start w-100" onClick={() => setActivePage("category")}>
            <Box size={18} className="me-2" /> Category
          </button>
        </li>
        {/* Add Category */}
        <li className="nav-item ps-4">
          <button
            className="nav-link btn btn-link text-start w-100 text-success"
            onClick={() => setActivePage("addCategory")}
          >
            <PlusCircle size={16} className="me-2" /> Add Category
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
