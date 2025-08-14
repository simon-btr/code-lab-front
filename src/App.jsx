import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import VerifyPage from "./pages/VerifiyPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import TodoListsPage from "./pages/TodoList/TodoListsPage";
import TodoListDetailsPage from "./pages/TodoList/TodoListDetailsPage";
import Footer from "./components/footer/Footer";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/todolists"
            element={
              <PrivateRoute>
                <TodoListsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/todolists/:id"
            element={
              <PrivateRoute>
                <TodoListDetailsPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </AuthProvider>
  );
}
