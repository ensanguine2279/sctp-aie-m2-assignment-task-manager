import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useTask } from "../contexts/TaskContextInstance";

import PropTypes from "prop-types";

import styles from "./TaskRow.module.css";

function TaskRow({ task, index, statusLabel, priorityLabel, onDelete }) {
  const { tasks, reorderTasks } = useTask();
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Ref to track the depth of nested drag enter/leave events to prevent flickering of hover state
  const dragDepthRef = useRef(0);

  // Handle the drag start event to initiate dragging of a task
  const handleDragStart = (e) => {
    // console.log(`Dragging task: ${task.title} (ID: ${task.id})`);
    // Set the dragged task's id in the dataTransfer object to identify it during the drop event
    e.dataTransfer.setData("text/plain", task.id);
  };

  // Handle the drag over event to allow dropping on a task
  const handleDragOver = (e) => {
    //console.log(`Dragging over task: ${task.title} (ID: ${task.id})`);
    e.preventDefault(); // Necessary to allow dropping
  };

  // Track nested enter/leave events so hover state does not flicker across row children
  const handleDragEnter = (e) => {
    console.log(
      `Entering task: ${task.title} (ID: ${task.id}) (Depth: ${dragDepthRef.current})`,
    );
    e.preventDefault();
    // Increment the drag depth counter when entering a task row
    dragDepthRef.current += 1;
    // Set the dragging state to true only when entering the first level of the task row
    if (dragDepthRef.current === 1) {
      setIsDraggingOver(true);
    }
  };

  // Handle the drag leave event to reset the dragging state when leaving a task row
  const handleDragLeave = () => {
    console.log(
      `Leaving task: ${task.title} (ID: ${task.id}) (Depth: ${dragDepthRef.current})`,
    );
    // Decrement the drag depth counter when leaving a task row
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
    // Reset the dragging state only when leaving the last level of the task row
    if (dragDepthRef.current === 0) {
      setIsDraggingOver(false);
    }
  };

  // Handle the drop event to reorder tasks
  const handleDrop = (e) => {
    // console.log(`Dropped on task: ${task.title} (ID: ${task.id})`);
    // Prevent default behavior to allow drop
    e.preventDefault();
    dragDepthRef.current = 0;
    setIsDraggingOver(false);

    // Get the id of the dragged task from the dataTransfer object
    const draggedId =
      Number(e.dataTransfer.getData("text/plain")) ||
      e.dataTransfer.getData("text/plain");
    // If the dragged task is dropped on itself, do nothing
    if (draggedId === task.id) return;

    // Find the index of the dragged task in the tasks array
    const draggedIndex = tasks.findIndex((t) => t.id === draggedId);
    // If the dragged task is not found, do nothing
    if (draggedIndex === -1) return;

    const updatedTasks = [...tasks];
    // Remove the dragged task from its original position and insert it at the new index
    const [movedTask] = updatedTasks.splice(draggedIndex, 1);
    // Insert the dragged task at the index of the task it was dropped on
    updatedTasks.splice(index, 0, movedTask);

    reorderTasks(updatedTasks);
  };

  const handleDragEnd = () => {
    dragDepthRef.current = 0;
    setIsDraggingOver(false);
  };

  return (
    // Use a table row to represent each task, making it draggable for reordering
    <tr
      draggable
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
      className={`${styles.taskRow} ${isDraggingOver ? styles.dragOver : ""}`}
    >
      <td className={styles.titleCell}>
        <Link to={`/tasks/${task.id}`} className={styles.titleLink}>
          {task.title}
        </Link>
      </td>
      <td>
        <span
          className={`${styles.badge} ${styles[`priority-${task.priority}`] ?? ""}`}
        >
          {priorityLabel}
        </span>
      </td>
      <td>
        <span
          className={`${styles.badge} ${styles[`status-${task.status}`] ?? ""}`}
        >
          {statusLabel}
        </span>
      </td>
      <td className={styles.actionCell}>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => onDelete(task.id)}
          aria-label={`Delete task: ${task.title}`}
          title="Delete task"
        >
          <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <path
              d="M9 3h6m-9 4h12m-1 0-0.7 11.2a2 2 0 0 1-2 1.8H9.7a2 2 0 0 1-2-1.8L7 7m3 4v6m4-6v6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
}

// PropTypes validation for TaskRow component
TaskRow.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  statusLabel: PropTypes.string.isRequired,
  priorityLabel: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskRow;
