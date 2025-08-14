import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Header from "../../components/header/Header";
import "./TodoListsPage.css";

export default function TodoListsPage() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [lists, setLists] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await api.get("/todolists", token);
        setLists(data);
      } catch (err) {
        console.error("Error loading lists:", err);
      }
    };
    fetchLists();
  }, [token]);

  const handleAddList = async () => {
    if (!newTitle.trim()) return;
    try {
      const list = await api.post("/todolists", { title: newTitle }, token);
      setLists([...lists, list]);
      setNewTitle("");
    } catch (err) {
      console.error("Error creating list:", err);
    }
  };

  const handleDeleteList = async (id) => {
    if (!window.confirm("Are you sure you want to delete this list?")) return;
    try {
      await api.del(`/todolists/${id}`, token);
      setLists(lists.filter((l) => l.id !== id));
    } catch (err) {
      alert("🚫 You are not authorized to delete this list.");
    }
  };

  return (
    <div className="todolists-container">
      <Header />
      <header className="todolists-header">
        <h1>📋 My To-Do Lists</h1>
        <div className="add-list">
          <input
            type="text"
            placeholder="New list title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={handleAddList}>➕ Add</button>
        </div>
      </header>

      <main className="todolists-grid">
        {lists.map((list) => (
          <div key={list.id} className="todolist-card">
            <h2>{list.title}</h2>
            <div className="todolist-actions">
              <button onClick={() => navigate(`/todolists/${list.id}`)}>
                View
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteList(list.id)}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
