import React from "react";
import "./TaskItem.css";

const TaskItem = ({ task }) => {
  return (
    <div className="task-item">
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>

        {task.description && (
          <p className="task-description">
            {task.description}
          </p>
        )}

        <span
          className={`task-status ${
            task.completed ? "completed" : "pending"
          }`}
        >
          {task.completed ? "Completada" : "Pendiente"}
        </span>
      </div>
    </div>
  );
};

export default TaskItem;