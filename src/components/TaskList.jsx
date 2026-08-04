import React, { useEffect, useState } from "react";
import "./TaskList.css";

const TaskList = ({ title = "Lista de Tareas" }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();

    // Actualiza la lista si cambia el localStorage
    window.addEventListener("storage", loadTasks);

    return () => {
      window.removeEventListener("storage", loadTasks);
    };
  }, []);

  const loadTasks = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  };

  return (
    <div className="task-list-container">
      <h2>{title}</h2>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>No hay tareas registradas.</p>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div className="task-card" key={task.id}>
              <div className="task-info">
                <h3>{task.title}</h3>

                {task.description && (
                  <p className="description">{task.description}</p>
                )}

                <span
                  className={`status ${
                    task.completed ? "completed" : "pending"
                  }`}
                >
                  {task.completed ? "Completada" : "Pendiente"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;