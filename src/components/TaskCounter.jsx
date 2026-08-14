import React, { useEffect, useState } from "react";
import "./TaskCounter.css";

const TaskCounter = ({ storageKey = "tasks", onFilterChange }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // Cargar tareas desde localStorage
  useEffect(() => {
    const loadTasks = () => {
      try {
        const storedTasks = localStorage.getItem(storageKey);
        const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];

        setTasks(Array.isArray(parsedTasks) ? parsedTasks : []);
      } catch (error) {
        console.error("Error al leer las tareas:", error);
        setTasks([]);
      }
    };

    loadTasks();

    // Permite actualizar el contador si otra parte de la aplicación
    // modifica localStorage y dispara el evento "tasksUpdated".
    window.addEventListener("storage", loadTasks);
    window.addEventListener("tasksUpdated", loadTasks);

    return () => {
      window.removeEventListener("storage", loadTasks);
      window.removeEventListener("tasksUpdated", loadTasks);
    };
  }, [storageKey]);

  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);

    if (onFilterChange) {
      onFilterChange(newFilter);
    }
  };

  return (
    <section className="task-counter">
      <div className="task-counter__header">
        <h2>Estadísticas de tareas</h2>
        <p>Resumen de tus actividades</p>
      </div>

      <div className="task-counter__stats">
        <div className="stat-card stat-card--total">
          <span className="stat-card__label">Total</span>
          <strong className="stat-card__number">{tasks.length}</strong>
        </div>

        <div className="stat-card stat-card--pending">
          <span className="stat-card__label">Pendientes</span>
          <strong className="stat-card__number">
            {pendingTasks.length}
          </strong>
        </div>

        <div className="stat-card stat-card--completed">
          <span className="stat-card__label">Completadas</span>
          <strong className="stat-card__number">
            {completedTasks.length}
          </strong>
        </div>
      </div>

      <div className="task-counter__filters">
        <span className="task-counter__filter-title">
          Filtrar tareas:
        </span>

        <div className="filter-buttons">
          <button
            type="button"
            className={`filter-button ${
              filter === "all" ? "filter-button--active" : ""
            }`}
            onClick={() => handleFilterChange("all")}
          >
            Todas
          </button>

          <button
            type="button"
            className={`filter-button ${
              filter === "pending" ? "filter-button--active" : ""
            }`}
            onClick={() => handleFilterChange("pending")}
          >
            Pendientes
          </button>

          <button
            type="button"
            className={`filter-button ${
              filter === "completed" ? "filter-button--active" : ""
            }`}
            onClick={() => handleFilterChange("completed")}
          >
            Completadas
          </button>
        </div>
      </div>
    </section>
  );
};

export default TaskCounter;
