import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Alerts from "./Pages/Alert";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AdminDashboard from "./Pages/AdminDashboard";
import Navbar from "./component/Navbar";
import AdminRoute from "./component/AdminRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./style.css";

function AppRoutes() {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to={isAdmin ? "/admin" : "/dashboard"} replace /> : <Signup />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to={isAdmin ? "/admin" : "/dashboard"} replace /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/alerts"
          element={isAuthenticated ? <Alerts /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;