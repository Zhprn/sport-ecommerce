import React from "react";
import { Home, LayoutDashboard, Settings, Box, PlusCircle, ClipboardList } from "lucide-react";

const Sidebar = ({ setActivePage }) => {
  return (
    <div
      className="sidebar bg-white shadow p-3"
      style={{
        minHeight: "100vh",
        width: "250px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {/* Header */}
      <div className="sidebar-header fw-bold fs-4 text-primary mb-3">
        Sneat
      </div>

      {/* Main Navigation */}
      <ul className="nav flex-column">
        <li className="nav-item mb-1">
          <button
            className="nav-link btn btn-light text-start w-100 d-flex align-items-center gap-2"
            onClick={() => setActivePage("dashboard")}
            style={{ borderRadius: "8px" }}
          >
            <Home size={18} /> Dashboard
          </button>
        </li>
        <li className="nav-item mb-1">
          <button
            className="nav-link btn btn-light text-start w-100 d-flex align-items-center gap-2"
            onClick={() => setActivePage("layouts")}
            style={{ borderRadius: "8px" }}
          >
            <LayoutDashboard size={18} /> Layouts
          </button>
        </li>

        {/* Manage Product */}
        <li className="nav-item mt-3 small text-muted px-3">MANAGE PRODUCT</li>
        <li className="nav-item mb-1">
          <button
            className="nav-link btn btn-light text-start w-100 d-flex align-items-center gap-2"
            onClick={() => setActivePage("product")}
            style={{ borderRadius: "8px" }}
          >
            <Settings size={18} /> Product
          </button>
        </li>
        <li className="nav-item ps-4 mb-1">
          <button
            className="nav-link btn btn-light text-start w-100 text-success d-flex align-items-center gap-2"
            onClick={() => setActivePage("addProduct")}
            style={{ borderRadius: "8px" }}
          >
            <PlusCircle size={16} /> Add Product
          </button>
        </li>
        <li className="nav-item mb-1">
          <button
            className="nav-link btn btn-light text-start w-100 d-flex align-items-center gap-2"
            onClick={() => setActivePage("category")}
            style={{ borderRadius: "8px" }}
          >
            <Box size={18} /> Category
          </button>
        </li>

        {/* Orders */}
        <li className="nav-item mt-3 small text-muted px-3">ORDERS</li>
        <li className="nav-item mb-1">
          <button
            className="nav-link btn btn-light text-start w-100 d-flex align-items-center gap-2"
            onClick={() => setActivePage("order")}
            style={{ borderRadius: "8px" }}
          >
            <ClipboardList size={18} /> Orders
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
