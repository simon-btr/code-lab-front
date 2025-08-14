import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const isHome = location.pathname === "/home";

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: "1rem",
        borderBottom: "1px solid #ccc",
        marginBottom: "1rem",
      }}
    >
      <div>
        {!isHome && (
          <button
            onClick={() => navigate("/home")}
            style={{
              padding: "0.4rem 0.8rem",
              backgroundColor: "#ccc",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "0.5rem",
            }}
          >
            ⬅ Back to Home
          </button>
        )}
        <strong>To-Do Lists Together !</strong>
      </div>

      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        style={{
          padding: "0.4rem 0.8rem",
          backgroundColor: "#DC143C",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </header>
  );
}
