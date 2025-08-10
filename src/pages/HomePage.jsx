import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { logout } = useAuth();
  return (
    <div>
      <h1>Bienvenue !</h1>
      <button onClick={logout}>Se déconnecter</button>
    </div>
  );
}
