import React, { useEffect, useState } from "react";
import "./TaskFilter.css";

const TaskFilter = ({
  storageKey = "tasks",
  onFilterChange,
  initialFilter = "all",
}) => {
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  useEffect(() => {
    const loadTasks = () => {
      try {
        const storedTasks = localStorage.getItem(storageKey);
        const parsedTasks = storedTasks
          ? JSON.parse(storedTasks)
          : [];

        setTasks(Array.isArray(parsedTasks) ? parsedTasks : []);
      } catch (error) {
        console.error(
          "Error al cargar las tareas desde localStorage:",
          error
        );

        setTasks([]);
      }
    };

    loadTasks();

    // Permite actualizar el componente cuando cambian
    // las tareas desde otra parte de la aplicación.
    window.addEventListener("storage", loadTasks);
    window.addEventListener("tasksUpdated", loadTasks);

    return () => {
      window.removeEventListener("storage", loadTasks);
      window.removeEventListener("tasksUpdated", loadTasks);
    };
  }, [storageKey]);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed === true
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);

    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  return (
    <section className="task-filter">
      <div className="task-filter__header">
        <h2>Mis tareas</h2>
        <p>Consulta y filtra el estado de tus tareas</p>
      </div>

      {/* Estadísticas */}
      <div className="task-filter__stats">
        <div className="task-stat task-stat--total">
          <span className="task-stat__label">
            Total
          </span>

          <span className="task-stat__number">
            {totalTasks}
          </span>
        </div>

        <div className="task-stat task-stat--pending">
          <span className="task-stat__label">
            Pendientes
          </span>

          <span className="task-stat__number">
            {pendingTasks}
          </span>
        </div>

        <div className="task-stat task-stat--completed">
          <span className="task-stat__label">
            Completadas
          </span>

          <span className="task-stat__number">
            {completedTasks}
          </span>
        </div>
      </div>

      {/* Filtros */}
      <div className="task-filter__controls">
        <span className="task-filter__title">
          Mostrar:
        </span>

        <div className="task-filter__buttons">
          <button
            type="button"
            className={
              activeFilter === "all"
                ? "task-filter__button active"
                : "task-filter__button"
            }
            onClick={() => handleFilterChange("all")}
          >
            Todas
          </button>

          <button
            type="button"
            className={
              activeFilter === "pending"
                ? "task-filter__button active"
                : "task-filter__button"
            }
            onClick={() => handleFilterChange("pending")}
          >
            Pendientes
          </button>

          <button
            type="button"
            className={
              activeFilter === "completed"
                ? "task-filter__button active"
                : "task-filter__button"
            }
            onClick={() => handleFilterChange("completed")}
          >
            Completadas
          </button>
        </div>
      </div>
    </section>
  );
};

export default TaskFilter;
