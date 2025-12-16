import { useState } from "react";
import Login from "./pages/login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [auth, setAuth] = useState(null);

  if (!auth) return <Login onLogin={setAuth} />;

  return auth.user.role === "admin" ? (
    <AdminDashboard token={auth.token} />
  ) : (
    <EmployeeDashboard token={auth.token} />
  );
}

export default App;
