import { useEffect, useState } from "react";
import Login from "./pages/login"; // 
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [auth, setAuth] = useState(null);

  // Load auth from localStorage on page refresh
  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      setAuth(JSON.parse(savedAuth));
    }
  }, []);

  const handleLogin = (data) => {
    localStorage.setItem("auth", JSON.stringify(data));
    setAuth(data);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
  };

  if (!auth) return <Login onLogin={handleLogin} />;

  return auth.user.role === "admin" ? (
    <AdminDashboard token={auth.token} onLogout={handleLogout} />
  ) : (
    <EmployeeDashboard token={auth.token} onLogout={handleLogout} />
  );
}

export default App;
