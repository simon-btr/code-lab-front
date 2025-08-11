import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const projects = [
    {
      title: "Live Weather Dashboard",
      description: "Get real-time weather updates.",
      path: "/weather",
    },
    {
      title: "More Projects Coming Soon",
      description: "Stay tuned!",
      path: "#",
    },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome to your Dashboard!</h1>
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </header>

      <main className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            {project.path !== "#" && (
              <button onClick={() => navigate(project.path)}>Open</button>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
