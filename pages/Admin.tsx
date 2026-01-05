
import React, { useState } from "react";
import AdminLogin from "../components/admin/AdminLogin";
import AdminPanel from "../components/admin/AdminPanel";

const Admin: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("rawline_admin") === "true"
  );

  if (!authenticated) {
    return <AdminLogin onSuccess={() => setAuthenticated(true)} />;
  }

  return <AdminPanel />;
};

export default Admin;
