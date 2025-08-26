import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ManageProduct from "../components/ManageProduct";
import ManageCategory from "../components/ManageCategory";
import AddProduct from "../components/AddProduct";
import AddCategory from "../components/AddCategory";
import AdminOrders from "../components/AdminOrders";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "product":
        return <ManageProduct />;
      case "category":
        return <ManageCategory />;
      case "addProduct":
        return <AddProduct />;
      case "order":
        return <AdminOrders />;
      default:
        return <h2>Selamat datang di Dashboard</h2>;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div
        style={{
          width: "250px",
          background: "#fff",
          borderRight: "1px solid #ddd",
        }}
      >
        <Sidebar setActivePage={setActivePage} />
      </div>
      <div style={{ flex: 1, padding: "20px" }}>{renderContent()}</div>
    </div>
  );
}
