import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import "./TodoListDetailsPage.css";

import "./TodoListDetailsPage.css";

export default function TodoListDetailsPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [list, setList] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");

  const [editingTitle, setEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState("");

  const [newMemberEmail, setNewMemberEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listData = await api.get(`/todolists/${id}`, token);
        setList(listData);
        setTitleValue(listData.title);

        const tasksData = await api.get(`/tasks?listId=${id}`, token);
        setTasks(tasksData);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };
    fetchData();
  }, [id, token]);

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;
    try {
      const task = await api.post(
        "/tasks",
        {
          listId: parseInt(id),
          title: newTaskTitle,
          description: newTaskDesc,
        },
        token
      );
      setTasks([...tasks, task]);
      setNewTaskTitle("");
      setNewTaskDesc("");
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.del(`/tasks/${taskId}`, token);
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleToggleCompleted = async (task) => {
    try {
      const updated = await api.put(
        `/tasks/${task.id}`,
        {
          title: task.title,
          description: task.description,
          completed: !task.completed,
        },
        token
      );
      setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleSaveTitle = async () => {
    try {
      const updated = await api.put(
        `/todolists/${id}/title`,
        { title: titleValue },
        token
      );
      setList(updated);
      setEditingTitle(false);
    } catch (err) {
      console.error("Error updating title:", err);
    }
  };

  const handleAddMember = async () => {
    if (!newMemberEmail.trim()) return;
    try {
      const updated = await api.post(
        `/todolists/${id}/members`,
        { memberEmail: newMemberEmail },
        token
      );
      setList(updated);
      setNewMemberEmail("");
    } catch (err) {
      console.error("Error adding member:", err);
    }
  };

  const handleRemoveMember = async (memberEmail) => {
    if (!window.confirm(`Remove ${memberEmail} from this list?`)) return;
    try {
      const updatedList = await api.del(
        `/todolists/${listId}/members/${memberEmail}`,
        token
      );
      setTodoList(updatedList);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        alert("🚫 You are not authorized to remove this member.");
      } else {
        console.error("Error removing member:", err);
        alert("An error occurred while removing the member.");
      }
    }
  };

  if (!list) return <div>Loading...</div>;

  return (
    <div className="list-details-container">
      <header className="list-details-header">
        <button onClick={() => navigate("/todolists")}>&larr; Back</button>
        {editingTitle ? (
          <>
            <input
              type="text"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
            />
            <button onClick={handleSaveTitle}>💾 Save</button>
            <button onClick={() => setEditingTitle(false)}>❌ Cancel</button>
          </>
        ) : (
          <>
            <h1>{list.title}</h1>
            <button onClick={() => setEditingTitle(true)}>✏️ Edit</button>
          </>
        )}
      </header>

      <section className="members-section">
        <h2>Members</h2>
        <ul className="members-list">
          {list.members?.map((m) => (
            <li key={m.id}>
              {m.username} ({m.email})
              <button
                className="remove-member"
                onClick={() => handleRemoveMember(m.email)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
        <div className="add-member">
          <input
            type="email"
            placeholder="Member email"
            value={newMemberEmail}
            onChange={(e) => setNewMemberEmail(e.target.value)}
          />
          <button onClick={handleAddMember}>➕ Add Member</button>
        </div>
      </section>

      <div className="add-task">
        <input
          type="text"
          placeholder="Task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task description (optional)"
          value={newTaskDesc}
          onChange={(e) => setNewTaskDesc(e.target.value)}
        />
        <button onClick={handleAddTask}>➕ Add Task</button>
      </div>

      <main className="tasks-grid">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task-card ${task.completed ? "completed" : ""}`}
          >
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            <div className="task-actions">
              <button onClick={() => handleToggleCompleted(task)}>
                {task.completed ? "✅ Done" : "⬜ Mark Done"}
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteTask(task.id)}
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
