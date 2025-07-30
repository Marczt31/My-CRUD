import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header";

const Layout = () => (
  <div className="flex min-h-screen">
    <Header />
    <main className="bg-slate-900 flex-1 p-6 overflow-auto">
      <Outlet />
    </main>
  </div>
);

export default Layout;